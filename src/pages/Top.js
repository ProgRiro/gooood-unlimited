import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExPanel from '../components/ExPanel';
import SlideShow from '../components/SlideShow';

// for slideshow
import thumbsUpImage1 from '../imgs/thumbs-up1.png';
import thumbsUpImage2 from '../imgs/thumbs-up2.png';
import thumbsUpImage3 from '../imgs/thumbs-up3.png';
import thumbsUpImage4 from '../imgs/thumbs-up4.png';

// for about developer
import devImage from '../imgs/devImage.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  devImage: {
    display: 'block',
    width: 100,
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Top = () => {
  const classes = useStyles();
  const fadeImages = [
    thumbsUpImage1,
    thumbsUpImage2,
    thumbsUpImage3,
    thumbsUpImage4,
  ];

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12} md={5}>
        <Paper className={classes.paper}>
          <Typography variant="h4" style={{ color: 'black' }}>
            <span role="img" aria-labelledby="emoji">
              🎉
            </span>{' '}
            Welcome{' '}
            <span role="img" aria-labelledby="emoji">
              🎉
            </span>
          </Typography>
          <Typography variant="subtitle1">
            いいねした回数を自慢しよう
          </Typography>
          {/* <img src={ThumbsUpImage} width="100%" /> */}
          <SlideShow images={fadeImages} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={7} id="getstarted">
        <Paper className={classes.paper}>
          <Typography variant="h5" style={{ color: 'black', marginTop: 20 }}>
            <span role="img" aria-labelledby="emoji">
              🔰
            </span>{' '}
            Let's get started{' '}
            <span role="img" aria-labelledby="emoji">
              🔰
            </span>
          </Typography>
          <Typography variant="subtitle2">さぁ、はじめよう</Typography>
          <br />
          <ExPanel />
        </Paper>
        <Paper className={classes.paper} style={{ marginTop: 10 }}>
          <Typography variant="h6" style={{ color: 'black', marginTop: 20 }}>
            <span role="img" aria-labelledby="emoji">
              💻
            </span>{' '}
            About Developer{' '}
            <span role="img" aria-labelledby="emoji">
              💻
            </span>
          </Typography>
          <Typography variant="subtitle2">開発者について</Typography>
          <br />
          <Typography variant="body2" align="center">
            <a
              href="https://twitter.com/progriro"
              style={{ textDecoration: 'none', color: '#00acee', fontSize: 18 }}
            >
              progriro
            </a>
            <img
              alt="Developer Image"
              src={devImage}
              className={classes.devImage}
            />
          </Typography>
          <Typography variant="body2" align="left">
            趣味で個人開発をしている大学生です。
            <br />
            <br />
            Good Unlimited に興味を持っていただきありがとうございます。
            <br />
            このサービスは「このツイートにいいねを何回もしたいけど、1回しかできないのが惜しい...何回でもいいねできるサービスがあればいいな」という気軽な思いから開発しました。
            Good Unlimited
            を通して、Twitterにたくさんのいいねが溢れたら嬉しいです。
            {/* <br />
            <br />
            フロントからバックエンド(API設計)まで全て1人で開発しました。
            これまでに作成したものは
            <a
              href="https://portfolio.progriro.net/"
              style={{ textDecoration: 'none', color: '#00acee' }}
            >
              ポートフォリオサイト
            </a>
            にまとめています。また、更新頻度は低めですが、
            <a
              href="https://progriro.net/"
              style={{ textDecoration: 'none', color: '#00acee' }}
            >
              ブログ
            </a>
            も運営しています。 */}
            <br />
            <br />
            ご意見・ご要望・改善点など御座いましたら、
            <a
              href="https://twitter.com/progriro"
              style={{ textDecoration: 'none', color: '#00acee' }}
            >
              TwitterDM
            </a>
            までご連絡いただけると幸いです。
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Top;
