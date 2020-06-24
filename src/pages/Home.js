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
import SampleTweetCard from '../components/SampleTweetCard';

// for slideshow
import slideImage0 from '../imgs/ogp.png';
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
  const fadeImages = [
    slideImage0,
    slideImage1,
    slideImage2,
    slideImage3,
    slideImage4,
  ];

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
                <Typography variant="h2">
                  <span style={{ color: '#E0245E' }}>Good</span> Unlimited
                </Typography>
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
              >
                Twitterでログインする
              </TwitterLoginButton>
              {/* <Paper className={classes.paper}> */}
              <Box my={2}>
                <Typography variant="h4">
                  <br />
                  体験する
                </Typography>
                <Typography variant="caption">
                  <br />
                  サンプルツイートに無限回いいねしてみよう！
                  <br />
                </Typography>
              </Box>
              <SampleTweetCard />
              {/* </Paper> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Box my={2}>
                <Typography variant="h4">Good Unlimited とは</Typography>
                <Typography variant="caption">
                  <br />
                  「このTweetに何回もいいねしたいな...」
                  <br />
                  「この人の投稿好きだな...」
                  <br />
                  こんな風に思ったことありませんか？
                  <br />
                  <br />
                  Good Unlimited
                  なら、「何回もいいねを押す」という体験が簡単にできます。
                  <br />
                  思う存分いいねをしたら、その回数をTwitterにシェアしましょう！
                  <br />
                  きっと、たくさんいいねをもらった人は嬉しいはず。
                  <br />
                  <br />
                  Twitterをたくさんの『いいね』で溢れさせませんか？
                  <br />
                </Typography>
              </Box>
              <SlideShow images={fadeImages} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
