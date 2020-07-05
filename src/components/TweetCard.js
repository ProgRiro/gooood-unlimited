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
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import firebase, { db } from '../config';
import $ from 'jquery';
import '../animation.css';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function TweetCard(props) {
  const classes = useStyles();
  const [uid, setUid] = useState([]);
  const [goodNum, setGoodNum] = useState(props.goodNum);
  const [favoriteColor, setFavoriteColor] = useState('gray');
  const [anchorEl, setAnchorEl] = useState(null);
  const tweetId = props.tweetId;
  const open = Boolean(anchorEl);

  useEffect(() => {
    $('.heart').on('click', function () {
      let $btn = $(this);
      $btn.addClass('heartHover');
      setTimeout(function () {
        $btn.removeClass('heartHover');
      }, 1000);
    });
  }, []);

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
        // console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  const deleteData = async () => {
    await db
      .collection('users')
      .doc(uid)
      .collection('gooood')
      .doc(tweetId)
      .delete()
      .then(function () {
        props.isRefreshFunc();
        // console.log('Document successfully delete!');
      })
      .catch(function (error) {
        console.error('Error deleting document: ', error);
      });
  };

  const countUp = () => {
    setGoodNum(goodNum + 1);
    setFavoriteColor('#E0245E');
    pushData();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteData();
    handleClose();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="Icon" src={props.profileImageUrl} />}
        action={
          <div>
            <IconButton
              aria-label="delete-menu"
              aria-controls="menu-delete"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-delete"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <a
                  target="_blank"
                  href={`https://twitter.com/${props.screenName}/status/${props.tweetId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  rel="noopener noreferrer"
                >
                  このツイートをTwitterで表示する
                </a>
              </MenuItem>
              {props.goodNum > 1 && (
                <MenuItem onClick={handleDelete}>
                  このツイートを記録から削除
                </MenuItem>
              )}
              <MenuItem onClick={handleClose} style={{ color: 'red' }}>
                閉じる
              </MenuItem>
            </Menu>
          </div>
        }
        title={props.name}
        subheader={
          <a
            target="_blank"
            href={`https://twitter.com/${props.screenName}`}
            style={{ textDecoration: 'none', color: '#00acee' }}
            rel="noopener noreferrer"
          >
            @{props.screenName}
          </a>
        }
        align="left"
      />
      {props.mediaImage !== '' && (
        <CardMedia className={classes.media} image={props.mediaImage} />
      )}
      <CardContent>
        <Typography variant="body2" color="textPrimary" align="left">
          {props.text.split('\n').map((str, index) => (
            <React.Fragment key={index}>
              {str}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={countUp}
          style={{ marginRight: 10 }}
        >
          <div className="heart"></div>
        </IconButton>
        <Typography
          display="inline"
          variant="caption"
          align="left"
          style={{
            paddingLeft: 0,
            paddingRight: 10,
            color: favoriteColor,
            width: 10,
          }}
        >
          {goodNum - 1}
        </Typography>
        {goodNum > 1 && (
          <a
            target="_blank"
            href={`http://twitter.com/share?text=%23GoodUnlimited%20で%0a@${
              props.screenName
            }さんの投稿に%0a%0a🎉🎉%20${
              goodNum - 1
            }回%20🎉🎉%0a%0aいいね❤️したよ！%0a%0aGoodUnlimitedで無限にいいねして%0aいいねした回数をシェアしよう！%0ahttps://gooood-unlimited.web.app%0a%0a👇%20${
              goodNum - 1
            }回%20いいねしたツイート👇%0ahttps://twitter.com/${
              props.screenName
            }/status/${props.tweetId}`}
            style={{ textDecoration: 'none', color: '#00acee' }}
            rel="noopener noreferrer"
          >
            <IconButton aria-label="share">
              <ShareIcon style={{ color: '#00acee' }} />
            </IconButton>
          </a>
        )}
        {goodNum === 1 && (
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
