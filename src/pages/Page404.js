import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Image404 from '../imgs/404.svg';
import Typography from '@material-ui/core/Typography';

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

const Page404 = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs>
        <img src={Image404} width="80%" alt="404" />
        <Typography variant="h2" style={{ color: 'black' }}>
          not found
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Page404;
