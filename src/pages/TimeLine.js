import React, { useEffect, useState } from 'react';
import firebase from '../config';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TweetCard from '../components/TweetCard';
import axios from 'axios';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';
import errorImage from '../error.svg';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
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
});

const TimeLine = () => {
  const classes = useStyles();
  const [uid, setUid] = useState([]);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let tmpDatas = [];
  let dataLists = [];

  useEffect(() => {
    const getUid = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('is login');
          setUid(user.uid);
          // this.getTasksData();
        } else {
          console.log('is not login');
        }
      });
    };

    getUid();

    return () => getUid;
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

    // unmount
    return () => getData;
  }, [uid]);

  useEffect(() => {
    const changePosts = () => {
      tmpDatas.push(Object.assign({}, { ...posts[Object.keys(posts)[1]] }));
      tmpDatas.forEach((elm) => {
        dataLists = Object.keys(elm).map((key, i) => {
          // console.log(`key: ${key} value: ${elm[key].text}`);
          // console.log(
          //   elm[key]['entities']['media']
          //     ? elm[key]['entities']['media'][0].media_url_https
          //     : ''
          // );
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

    return () => changePosts;
  }, [posts]);

  return (
    <>
      <div className="sweet-loading">
        <PulseLoader
          css={override}
          size={15}
          color={'#123abc'}
          loading={loading}
        />
      </div>
      <div style={{ display: isError ? 'block' : 'none' }}>
        <h1 style={{ color: 'black' }}>sorry...</h1>
        <img src={errorImage} width="100" />
        <p style={{ color: 'black', fontSize: 14 }}>
          通信エラーが発生しました
          <br />
          時間をあけて再度アクセスしてください
        </p>
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

export default TimeLine;
