import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import firebase, { db } from '../config';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [uid, setUid] = useState([]);
  const [goodNum, setGoodNum] = useState(props.goodNum);
  const [tweetId, setTweetId] = useState(props.tweetId);
  const [favoriteColor, setFavoriteColor] = useState('gray');

  useEffect(() => {
    const getUid = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('is login');
          setUid(user.uid);
        } else {
          console.log('is not login');
        }
      });
    };

    getUid();

    return () => getUid;
  }, []);

  const pushData = async () => {
    await db
      .collection('users')
      .doc(uid)
      .collection('gooood')
      .doc(tweetId)
      .set({
        goodNum: goodNum,
        tweetId: tweetId,
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  const countUp = () => {
    setGoodNum(goodNum + 1);

    setFavoriteColor('#E0245E');

    pushData();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="Icon" src={props.profileImageUrl} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.name}
        subheader={props.screenName}
        align="left"
      />
      {props.mediaImage !== '' && (
        <CardMedia
          className={classes.media}
          image={props.mediaImage}
          title="Paella dish"
        />
      )}
      <CardContent>
        <Typography
          variant="body2"
          color="textPrimary"
          component="p"
          align="left"
        >
          {props.text}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <IconButton aria-label="add to favorites" onClick={countUp}>
          <FavoriteIcon style={{ color: favoriteColor }} />
        </IconButton>
        <Typography
          display="inline"
          variant="caption"
          style={{ marginLeft: -5, marginRight: 10, color: favoriteColor }}
        >
          {goodNum - 1}
        </Typography>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
