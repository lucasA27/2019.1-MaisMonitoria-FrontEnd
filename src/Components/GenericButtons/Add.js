import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../Feed/feed.css';

const styles = theme =>({
  
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  
});

function ButtonSizes(props) {
  const { classes } = props;
  return (
      <Fab size="medium" color="secondary" aria-label="Add" className={classes.margin}>
          <AddIcon />
      </Fab>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSizes);