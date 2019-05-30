import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core' ;
import AppBarProfile from '../AppBar/AppBarProfile';
import Card from '../Feed/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


import AppBar from '../AppBar/AppBar';
import ProfileTab from '../ProfileTab/ProfileTab';
import Tab from '../Tab/Tab';

import './Profile.css';




const theme = createMuiTheme({
    palette: {
      primary: { main: '#44a1f2' },
      secondary: { main: '#ff0000' },
    },
    typography: { useNextVariants: true },
    overrides: {
        MuiButton: {
          raisedPrimary: {
            color: 'white',
          },
        },
    },

  });
  const styles = () => ({
   
  
    perfil: {
      width:120,
      height:120,
      marginLeft: 10,
      marginTop: 70,
      marginBottom: 5,
      borderRadius: 70,
    }
  
  });

class Profile extends Component {

    state = { 
        
        monitorName:'',
        monitorCourse: '',
        monitorEmail: '',
        tutoring: [],
        likes: [],
        monitorPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzaLMnex1QwV83TBQgxLTaoDAQlFswsYy62L3mO4Su-CMkk3jX',
        showWarning: false,
        
        
    }
    

    componentDidMount() {
        let userData = {};
        let token = {}
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                
                firebase.auth().currentUser.getIdToken().then(function(idToken){
                    token["access_token"] = idToken;
                    
                })
              
                axios.post(process.env.REACT_APP_GATEWAY+"/get_user/", token).then(user=>{
                    userData = user.data;
                    this.setState({monitorName:userData["name"], monitorCourse:userData["course"], tutoring:userData["monitoring"], photo:userData["photo"], likes:userData["liked_tutoring_sessions"], teste:userData["liked_tutoring_sessions.monitor.ph"]}) 
                    
                });  
            }else{
                
                this.props.history.push('/');
            }     
        })
    }

    render(){

        const { classes } = this.props;
        var photoUrl = this.state.photo

        if( photoUrl != null ){
            photoUrl = photoUrl.replace("api-monitoria","localhost")
          } else {
            photoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzaLMnex1QwV83TBQgxLTaoDAQlFswsYy62L3mO4Su-CMkk3jX"
          }
        return(
            <div style={{overflowX:'hidden'}}>
                {/* {this.state.showWarning? <SnackbarWarning warning={"Faça o login para acessar"} router={""}/>:null} */}
                <div style={{overflowX:'hidden'}} >
                    <Grid style={{position: "absolute"}} container justify="center" alignItems="stretch">
                        <AppBarProfile/>    
                    </Grid>
                </div> 
                <div>   
                    <Grid container justify={'flex-start'} direction={'row'} alignContent={'center'} spacing={24} alignItems={'center'}>
                        <Grid item>
                            <img className={classes.perfil} src={photoUrl} ></img>
                        </Grid>
                        <Grid item>
                            <Grid container justify={'flex-start'} direction={'column'} alignContent={'flex-start'} alignItems={'flex-start'} spacing={24}  style={{paddingTop:80}} alignItems={'center'}>
                                <Grid item>
                                <Typography component="h5" variant="h5">
                                    Name: {this.state.monitorName}
                                </Typography>

                                </Grid>
                                <Grid item>
                                <Typography component="h5" variant="h5">
                                    Curso: {this.state.monitorCourse}
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <MuiThemeProvider theme={theme}>
                                        <Button variant="contained" component={Link} to="/EditProfile"  color="primary">
                                            Editar perfil
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className="profileBackground">
                    <Grid container justify={'center'} alignContent={'center'} alignItems={'center'} >
                        <Grid item xs={12} style={{marginTop:10, paddingBottom:40}} className="profileBackground">
                            <ProfileTab
                                tutoring={this.state.tutoring.map(item => ({ ...item,  photoUrl}))}
                                likes={this.state.likes.map(item => ({ ...item, photoUrl}))}
                            />
                        </Grid>
                    </Grid>
                    <Tab/>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(Profile);