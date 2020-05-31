import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TwitterLoginButton } from 'react-social-login-buttons';
import SlideShow from '../components/SlideShow';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// for slideshow
import slideImage1 from '../imgs/slide1.png';
import slideImage2 from '../imgs/slide2.png';
import slideImage3 from '../imgs/slide3.png';
import slideImage4 from '../imgs/slide4.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  notLoginContainer: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const fadeImages = [slideImage1, slideImage2, slideImage3, slideImage4];

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar>
        <Toolbar>
          <Typography variant="h6">Good Unlimited</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" /> */}
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Box my={2}>
                <Typography variant="h2">Good Unlimited</Typography>
                <Typography variant="subtitle1">
                  <br />
                  あの人の投稿に、無限回いいねしよう
                  <br />
                  <br />
                </Typography>
                <Typography variant="caption" align="left">
                  「Good
                  Unlimited」は、Twitterのタイムラインに流れる投稿に対して、無限回いいねをすることが出来ます。たくさんいいねをしたら、いいねした回数をTwitterに投稿することもできます。
                </Typography>
              </Box>
              <TwitterLoginButton
                onClick={props.login()}
                style={{
                  // width: 200,
                  // margin: '0 auto',
                  fontSize: 16,
                  fontWeight: 'bold',
                  // borderRadius: 50,
                }}
                align={'center'}
                iconSize={18}
              ></TwitterLoginButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <SlideShow images={fadeImages} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
