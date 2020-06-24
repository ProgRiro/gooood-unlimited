import React, { useState, useEffect } from 'react';
import firebase from '../config';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TweetCard from '../components/TweetCard';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
    marginBottom: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  errorBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  loaderBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px solid black',
  },
  input: {
    marginLeft: theme.spacing(1),
    width: '90%',
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const GoodList = () => {
  const classes = useStyles();
  const [uid, setUid] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [inputValue, setInputValue] = useState(
    'ツイートのURLを入力してください'
  );

  useEffect(() => {
    const getUid = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log('is login');
          setUid(user.uid);
        } else {
          // console.log('is not login');
        }
      });
    };

    getUid();
  }, []);

  const isRefreshFunc = () => {
    setIsRefresh(!isRefresh);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // alert('An essay was submitted: ' + inputValue);
    const str = inputValue;
    const tweetId = str.split(/[\/\?]/)[5];
    if (tweetId === undefined) {
      setLoading(false);
      setIsInputError(true);
    } else if (tweetId.length !== 19) {
      setLoading(false);
      setIsInputError(true);
    } else {
      await axios
        .get(
          // `http://localhost:8000/search/${uid}/${tweetId}`
          `https://gooood-unlimited-api.herokuapp.com/search/${uid}/${tweetId}`
        ) //リクエストを飛ばすpath
        .then((response) => {
          setInputValue('ツイートURLを入力してください');
          setPost(response.data);
        })
        .then(() => {
          setIsInputError(false);
          setIsError(false);
          setLoading(false);
        })
        .catch((error) => {
          // console.error(error);
          setLoading(false);
          setIsError(true);
          setIsInputError(false);
        });
    }
  };

  return (
    <>
      <div
        className={classes.loaderBox}
        style={{ display: loading ? 'flex' : 'none' }}
      >
        <PulseLoader size={10} color={'#123abc'} loading={loading} />
      </div>
      <Typography
        variant="h5"
        style={{ color: 'black', marginTop: 100 }}
        align="center"
      >
        <span role="img" aria-labelledby="emoji">
          🔍
        </span>{' '}
        ツイートのURLで検索{' '}
        <span role="img" aria-labelledby="emoji">
          🔎
        </span>
      </Typography>
      <Paper
        component="form"
        className={classes.formContainer}
        onSubmit={handleSubmit}
      >
        <InputBase
          className={classes.input}
          placeholder={inputValue}
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={handleChange}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon style={{ color: '#00acee' }} />
        </IconButton>
      </Paper>
      <Typography
        variant="body1"
        style={{ color: 'red', display: isInputError ? 'block' : 'none' }}
        align="center"
      >
        正しいURLではありません
        <br />
        ホームの使用方法を確認の上
        <br />
        再度お試しください
      </Typography>
      <Typography
        variant="body1"
        style={{ color: 'red', display: isError ? 'block' : 'none' }}
        align="center"
      >
        ツイート情報を取得できませんでした
        <br />
        時間をあけて再度お試しください
      </Typography>
      <Grid
        container
        spacing={1}
        className={classes.root}
        justify="center"
        // alignItems="center"
      >
        {post.length !== 0 && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TweetCard
              text={post.data.full_text}
              profileImageUrl={post.data['user'].profile_image_url_https}
              name={post.data['user'].name}
              screenName={post.data['user'].screen_name}
              mediaImage={
                post.data['entities']['media']
                  ? post.data['entities']['media'][0].media_url_https
                  : ''
              }
              tweetId={post.data.id_str}
              goodNum={post.goodList}
              isRefreshFunc={() => isRefreshFunc()}
            />
          </Grid>
        )}
      </Grid>
      <Typography variant="body1" style={{ color: 'black' }} align="center">
        <a
          href="https://gooood-unlimited.web.app/top#getstarted"
          style={{ textDecoration: 'none', color: '#00acee' }}
        >
          ツイートURLの取得方法
        </a>
      </Typography>
    </>
  );
};

export default GoodList;
