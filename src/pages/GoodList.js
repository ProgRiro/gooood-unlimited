import React, { useState, useEffect } from 'react';
import firebase from '../config';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TweetCard from '../components/TweetCard';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import errorImage from '../imgs/error.svg';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
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
});

const GoodList = () => {
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
          // console.log('is not login');
        }
      });
    };

    getUid();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          // `http://localhost:8000/gooood/${uid}`
          `https://gooood-unlimited-api.herokuapp.com/gooood/${uid}`
        ) //リクエストを飛ばすpath
        .then((response) => {
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

  const isRefreshFunc = () => {
    setIsRefresh(!isRefresh);
  };

  useEffect(() => {
    const changePosts = () => {
      tmpDatas.push(Object.assign({}, { ...posts.tweet }));
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
              goodNum={posts.goodList[i] ? posts.goodList[i] + 1 : 1}
              isRefreshFunc={() => isRefreshFunc()}
            />
          );
        });
      });
      setData([...dataLists]);
    };

    changePosts();
  }, [posts]);

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
    </>
  );
};

export default GoodList;
