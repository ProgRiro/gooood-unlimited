import React, { useEffect, useState } from 'react';
import firebase from '../config';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TweetCard from '../components/TweetCard';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import Typography from '@material-ui/core/Typography';
import errorImage from '../imgs/error.svg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 10,
    marginBottom: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  gridItem: {
    borderRadius: 0,
    borderColor: 'gray',
    borderWidth: 1,
  },
  errorBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  loaderBox: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    backgroundColor: '#fff',
  },
  refreshBox: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    bottom: 70,
  },
  refreshButton: {
    // width: '60%',
    padding: '8px 40px',
    color: '#fff',
    backgroundColor: '#00acee',
    borderRadius: 50,
    borderWidth: 0,
    '&:focus': {
      outline: 0,
    },
  },
});

const TimeLine = () => {
  const classes = useStyles();
  const [uid, setUid] = useState([]);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  let tmpDatas = [];
  let dataLists = [];

  useEffect(() => {
    const getUid = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log('is login');
          setUid(user.uid);
        } else {
          console.log('is not login');
        }
      });
    };

    getUid();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          // `http://localhost:8000/timeline/${uid}`
          `https://gooood-unlimited-api.herokuapp.com/timeline/${uid}`
        ) //リクエストを飛ばすpath
        .then((response) => {
          // console.log(response.data);
          setPosts(response.data);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          // console.error(error);
          setLoading(false);
          setIsError(true);
        });
    };

    getData();
  }, [uid, isRefresh]);

  useEffect(() => {
    const changePosts = () => {
      tmpDatas.push(Object.assign({}, { ...posts[Object.keys(posts)[1]] }));
      tmpDatas.forEach((elm) => {
        dataLists = Object.keys(elm).map((key, i) => {
          return (
            <TweetCard
              key={i}
              text={elm[key].full_text}
              profileImageUrl={elm[key]['user'].profile_image_url_https}
              name={elm[key]['user'].name}
              screenName={elm[key]['user'].screen_name}
              mediaImage={
                elm[key]['entities']['media']
                  ? elm[key]['entities']['media'][0].media_url_https
                  : ''
              }
              tweetId={elm[key].id_str}
              goodNum={1}
            />
          );
        });
      });
      setData([...dataLists]);
    };

    changePosts();
  }, [posts]);

  const isRefreshFunc = () => {
    setIsRefresh(!isRefresh);
    setLoading(true);
  };

  return (
    <>
      <div
        className={classes.loaderBox}
        style={{ display: loading ? 'flex' : 'none' }}
      >
        <PulseLoader size={10} color={'#123abc'} loading={loading} />
      </div>
      <div
        className={classes.errorBox}
        style={{ display: isError ? 'flex' : 'none' }}
      >
        <Typography variant="h2" style={{ color: 'black' }}>
          sorry...
        </Typography>
        <img
          src={errorImage}
          width="100"
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        <Typography
          display="inline"
          variant="subtitle1"
          style={{ color: 'black' }}
          align="center"
        >
          通信エラーが発生しました
          <br />
          時間をあけて再度アクセスしてください
        </Typography>
      </div>
      <Grid container spacing={1} className={classes.root}>
        {data.map((card, i) => {
          return (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
              {card}
            </Grid>
          );
        })}
      </Grid>
      <div className={classes.refreshBox}>
        <button
          onClick={isRefreshFunc}
          className={classes.refreshButton}
          type="button"
        >
          {!loading && <Typography variant="button">再読み込み</Typography>}
        </button>
      </div>
    </>
  );
};

export default TimeLine;
