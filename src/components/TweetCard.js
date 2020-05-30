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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import firebase, { db } from '../config';
import { useSpring, animated } from 'react-spring';

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

export default function TweetCard(props) {
  const classes = useStyles();
  const [uid, setUid] = useState([]);
  const [goodNum, setGoodNum] = useState(props.goodNum);
  const [isClicked, setIsClicked] = useState(true);
  const [favoriteColor, setFavoriteColor] = useState('gray');
  const [anchorEl, setAnchorEl] = useState(null);
  const tweetId = props.tweetId;
  const open = Boolean(anchorEl);

  const { x } = useSpring({
    from: { x: 0 },
    x: isClicked ? 1 : 0,
    config: { duration: 400 },
  });

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
    setIsClicked(!isClicked);
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
                >
                  このツイートをTwitterで表示する
                </a>
              </MenuItem>
              {props.goodNum > 1 && (
                <MenuItem onClick={handleDelete}>
                  このツイートをいいね記録から削除
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
          {props.text}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={countUp}
          style={{ paddingBottom: 2 }}
        >
          <animated.div
            style={{
              // opacity: x.interpolate({
              //   range: [0, 1],
              //   output: [1, 0.8, 1],
              // }),
              transform: x
                .interpolate({
                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1, 1.25, 1.4],
                  output: [1, 0.2, 0.9, 1.1, 1.4, 1.1, 1],
                })
                .interpolate((x) => `scale(${x})`),
            }}
          >
            {/* click */}
            <FavoriteIcon style={{ color: favoriteColor }} />
          </animated.div>
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
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
