import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TweetCard from '../components/TweetCard';

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

  return (
    <Grid container spacing={3} className={classes.root}>
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
