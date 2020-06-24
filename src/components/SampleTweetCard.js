import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import $ from 'jquery';
import '../animation.css';

import devImage from '../imgs/devImage.png';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function TweetCard() {
  const classes = useStyles();
  const [goodNum, setGoodNum] = useState(1);
  const [favoriteColor, setFavoriteColor] = useState('gray');

  useEffect(() => {
    $('.heart').on('click', function () {
      let $btn = $(this);
      $btn.addClass('heartHover');
      setTimeout(function () {
        $btn.removeClass('heartHover');
      }, 1000);
    });
  }, []);

  const countUp = () => {
    setGoodNum(goodNum + 1);
    setFavoriteColor('#E0245E');
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="Icon" src={devImage} />}
        action={
          <div>
            <IconButton
              aria-label="delete-menu"
              aria-controls="menu-delete"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        }
        title="Sample Tweet"
        subheader={
          <a
            target="_blank"
            href={`https://twitter.com/progriro`}
            style={{ textDecoration: 'none', color: '#00acee' }}
            rel="noopener noreferrer"
          >
            @progriro
          </a>
        }
        align="left"
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" align="left">
          {'これは Good Unlimited のサンプルです！\n\nTwitterログインをすると...\n✅ 自分のアカウントのタイムライン表示✨\n✅ 好きなツイートに無限にいいね可能✨\n✅ ツイートを検索していいね可能✨\n✅ いいねした回数をシェアできる✨\n\n完全無料です！ぜひ使ってみてください🙌'
            .split('\n')
            .map((str, index) => (
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
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
