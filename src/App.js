import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SimpleBottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';
import TimeLine from './pages/TimeLine';
import GoodList from './pages/GoodList';
import Setting from './pages/Setting';
import firebase, { db, providerTwitter } from './config';
import Button from '@material-ui/core/Button';
import { TwitterLoginButton } from 'react-social-login-buttons';
import { makeStyles } from '@material-ui/core/styles';

//ページの中身用のコンポーネントを作成
const topPage = () => (
  <div>
    <h1>Top Page</h1>ここがトップページです
  </div>
);

const page404 = () => (
  <div>
    <h1>404</h1>存在しないページです
  </div>
);

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  notLoginContainer: {
    width: '100%',
  },
});

function App() {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('is login');
        setIsLogin(true);
        // this.getTasksData();
      } else {
        console.log('is not login');
      }
    });
  });

  const login = () => {
    firebase
      .auth()
      .signInWithPopup(providerTwitter)
      .then(function (result) {
        const uid = result.user.uid;
        const token = result.credential.accessToken;
        const secret = result.credential.secret;
        setIsLogin(true);
        pushData(uid, token, secret);
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  };

  const logout = () => {
    if (firebase.auth().currentUser == null) {
      return;
    }

    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        setIsLogin(false);
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const pushData = async (uid, token, secret) => {
    await db
      .collection('users')
      .doc(uid)
      .set({
        token: token,
        secret: secret,
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  const fetchData = () => {
    db.collection('users')
      .doc('lWJJm6AYuR019476RQaG')
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  };

  return (
    <div className="App">
      {isLogin ? (
        <Router>
          <Button color="secondary" onClick={logout}>
            ログアウト
          </Button>
          <Button color="primary" onClick={fetchData}>
            取得
          </Button>
          <Button color="primary" onClick={pushData}>
            登録
          </Button>
          <div className="App-header">
            <Switch>
              <Route path="/" exact component={topPage} />
              <Route path="/timeline" exact component={TimeLine} />
              <Route path="/goodlist" exact component={GoodList} />
              <Route path="/setting" exact component={Setting} />
              {/* 一番末尾に追加 pathの指定も、対応するLinkの追加も必要ない */}
              <Route exact component={page404} />
            </Switch>
          </div>
          <SimpleBottomNavigation />
        </Router>
      ) : (
        <div className={classes.notLoginContainer}>
          <TwitterLoginButton
            onClick={login}
            style={{
              width: 200,
              margin: '0 auto',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            align={'center'}
            iconSize={20}
          >
            Twitterログイン
          </TwitterLoginButton>
        </div>
      )}
    </div>
  );
}

export default App;
