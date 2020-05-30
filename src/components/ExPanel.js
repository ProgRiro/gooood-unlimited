import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExImage1 from '../imgs/ex1.png';
import ExImage2 from '../imgs/ex2.png';
// import ExImage3 from '../imgs/ex1.png'
import ExImage4 from '../imgs/ex4.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#3F51B5',
  },
  exImage: {
    display: 'block',
    width: 300,
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const ExPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            タイムラインを表示する
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" align="left">
            タイムラインボタンをクリックして、自分がフォローしているユーザーのツイートを閲覧できます。
            <img
              alt="TimeLine Button Image"
              src={ExImage1}
              className={classes.exImage}
            />
            カード右下にあるいいねボタンは何回でも押すことが可能です。
            <img
              alt="TimeLine Button Image"
              src={ExImage1}
              className={classes.exImage}
            />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            いいねした回数をTwitterにシェアする
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" align="left">
            シェアボタンをクリックすると、TweetCardが表示されます。
            <img
              alt="TimeLine Button Image"
              src={ExImage1}
              className={classes.exImage}
            />
            画面右下の「ツイートする」をクリックすることでTwitterに投稿可能です。
            <img
              alt="TimeLine Button Image"
              src={ExImage1}
              className={classes.exImage}
            />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            過去にいいねしたツイートを閲覧する
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" align="left">
            あなたがGood Unlimitedからいいねを行ったツイートを一覧表示します。
            <img
              alt="GoodList Button Image"
              src={ExImage2}
              className={classes.exImage}
            />
            過去、どれほどのいいねを行ったのかを確認することが可能です。
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            通信エラーが発生した場合
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" align="left">
            通信エラーが発生した場合は、以下のような画面が表示されます。
            <img
              alt="TimeLine Button Image"
              src={ExImage4}
              className={classes.exImage}
            />
            この画面が表示される原因として「リクエストの上限に達した」可能性があります。
            15分ほど時間を置いてから再度アクセスをお願いします。時間が経過しても改善されない場合は、このサービスの開発者（
            <a
              href="https://twitter.com/progriro"
              style={{ textDecoration: 'none', color: '#00acee' }}
            >
              progriro
            </a>
            ）の TwitterDM までご連絡ください。
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ExPanel;
