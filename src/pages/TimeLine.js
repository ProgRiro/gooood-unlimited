import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TweetCard from '../components/TweetCard';
import firebase from '../config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const TimeLine = () => {
  const classes = useStyles();
  var user = firebase.auth().currentUser;
  let token;
  let secret;

  if (user != null) {
    token = user.accessToken;
    secret = user.secret;
    console.log('!!!');
    console.log(user);
  } else {
    console.log('???');
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Button onClick={() => firebase.auth().signOut()}>SignOut!</Button>
      <h1>{firebase.auth().currentUser.displayName}</h1>
      <img src={firebase.auth().currentUser.photoURL}></img>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TweetCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TweetCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TweetCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TweetCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TweetCard />
      </Grid>
    </Grid>
  );
};

export default TimeLine;
