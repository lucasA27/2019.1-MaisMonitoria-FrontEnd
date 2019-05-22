import React from 'react';
import RegisterMonitoring from '../RegisterMonitoring/RegisterMonitoring';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import firebase from 'firebase';
import { MemoryRouter as Router } from 'react-router-dom';


firebase.initializeApp({
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
});


const profile = jest.fn();


  it('Test if Course renders correctly', () =>{
    const tree = renderer.create(
      <Router><RegisterMonitoring profile={profile}/></Router>
      )
      expect(toJson(tree)).toMatchSnapshot()
  });