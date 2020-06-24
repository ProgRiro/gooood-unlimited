import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExImage1_1 from '../imgs/ex1_1.png';
import ExImage1_2 from '../imgs/ex1_2.png';
import ExImage1_3 from '../imgs/ex1_3.png';
import ExImage2_1 from '../imgs/ex2_1.png';
import ExImage2_2 from '../imgs/ex2_2.png';
import ExImage3_1 from '../imgs/ex3_1.png';
import ExImage3_2 from '../imgs/ex3_2.png';
import ExImage4_1 from '../imgs/ex4_1.png';
import ExImage4_2 from '../imgs/ex4_2.png';
import ExImage4_3 from '../imgs/ex4_3.png';
import ExImage4_4 from '../imgs/ex4_4.png';
import ExImage4_5 from '../imgs/ex4_5.png';
import ExImage4_6 from '../imgs/ex4_6.png';
import ExImage5 from '../imgs/ex5.png';
import ExImage6 from '../imgs/ex6.png';
import ExImage7 from '../imgs/ex7.png';

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
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
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
          <Typography className={classes.heading} style={{ color: 'red' }}>
            Good Unlimited をホームに追加する
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" align="left">
            ①「Safari」で Good Unlimited
            を開き、画面下の共有ボタンをクリックします。
            <img
              alt="TimeLine Button"
              src={ExImage1_1}
              className={classes.exImage}
            />
            ②「ホーム画面に追加」をクリックします。
            <img
              alt="TimeLine Button"
              src={ExImage1_2}
              className={classes.exImage}
            />
            ③ 画面右上の「追加」をクリックします。
            <img
              alt="TimeLine Button"
              src={ExImage1_3}
              className={classes.exImage}
            />
            ④ ホーム画面に Good Unlimited
            が追加され、アプリのように使用することができます。
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
              alt="TimeLine Button"
              src={ExImage2_1}
              className={classes.exImage}
            />
            カード右下にあるいいねボタンは何回でも押すことが可能です。
            <img
              alt="TimeLine Button"
              src={ExImage2_2}
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
            いいね数が1以上になると、シェアボタンが活性化します。Twitterにシェアしたい場合は、シェアボタンをクリックします。
            <img
              alt="TimeLine Button"
              src={ExImage3_1}
              className={classes.exImage}
            />
            Tweet画面が表示されます。右上の「ツイートする」をクリックすることでTwitterに投稿可能です。
            <img
              alt="TimeLine Button"
              src={ExImage3_2}
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
            ツイートを検索する
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" align="left">
            ①
            検索したいツイートをTwitterで開き、赤枠のアイコンをクリックします。
            <img
              alt="TimeLine Button"
              src={ExImage4_1}
              className={classes.exImage}
            />
            ②「ツイートのリンクをコピー」をクリックして、URLをコピーします。
            <img
              alt="TimeLine Button"
              src={ExImage4_2}
              className={classes.exImage}
            />
            ③ GoodUnlimitedを開き、検索をクリックします。
            <img
              alt="TimeLine Button"
              src={ExImage4_3}
              className={classes.exImage}
            />
            ④
            TwitterからツイートからコピーしたURLを、GoodUnlimitedの検索窓にペーストして検索します。
            <img
              alt="GoodList Button"
              src={ExImage4_4}
              className={classes.exImage}
            />
            <img
              alt="GoodList Button"
              src={ExImage4_5}
              className={classes.exImage}
            />
            ⑤ 特定のツイートに対して、好きな回数いいねができます。
            <img
              alt="TimeLine Button"
              src={ExImage4_6}
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
              alt="GoodList Button"
              src={ExImage5}
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
              alt="TimeLine Button"
              src={ExImage6}
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
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>ログアウトする</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" align="left">
            ヘッダーのログアウトボタンをクリックすることで、GoodUnlimitedからログアウトできます。
            <img
              alt="TimeLine Button"
              src={ExImage7}
              className={classes.exImage}
            />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ExPanel;
