import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import SimpleBottomNavigation from './components/BottomNavigation';
import TopNavbar from './components/TopNavbar';
import Home from './pages/Home';
import Top from './pages/Top';
import TimeLine from './pages/TimeLine';
import Search from './pages/Search';
import GoodList from './pages/GoodList';
import Page404 from './pages/Page404';
import firebase, { db, providerTwitter } from './config';
import PulseLoader from 'react-spinners/PulseLoader';
import { makeStyles } from '@material-ui/core/styles';
import GlobalStyle from './grobalStyles';

const useStyles = makeStyles({
  sweetLoading: {
    position: 'fixed',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    zIndex: 99,
  },
  appBody: {
    marginTop: 65,
  },
});

function App() {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('is login');
        setIsLogin(true);
        setLoading(false);
        // this.getTasksData();
      } else {
        // console.log('is not login');
        setIsLogin(false);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    return () => setLoading(false);
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
        setIsLogin(false);
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

  const pushData = async (uid, token, secret) => {
    await db
      .collection('users')
      .doc(uid)
      .set({
        token: token,
        secret: secret,
      })
      .then(function () {
        // console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  return (
    <>
      <GlobalStyle />
      <div
        className={classes.sweetLoading}
        style={{ display: loading ? 'flex' : 'none' }}
      >
        <PulseLoader size={10} color={'#123abc'} loading={loading} />
      </div>
      {/* <div className={classes.root}> */}
      <TopNavbar />
      <Router>
        <div className={classes.appBody}>
          <Switch>
            <Route
              path="/"
              exact
              // component={Home}
              render={() =>
                isLogin ? <Redirect to="/top" /> : <Home login={() => login} />
              }
            />
            <Route
              path="/top"
              exact
              // component={Top}
              render={(props) => (isLogin ? <Top /> : <Redirect to="/" />)}
            />
            <Route
              path="/timeline"
              exact
              // component={TimeLine}
              render={(props) => (isLogin ? <TimeLine /> : <Redirect to="/" />)}
            />
            <Route
              path="/search"
              exact
              // component={TimeLine}
              render={(props) => (isLogin ? <Search /> : <Redirect to="/" />)}
            />
            <Route
              path="/goodlist"
              exact
              // component={GoodList}
              render={(props) => (isLogin ? <GoodList /> : <Redirect to="/" />)}
            />
            {/* 一番末尾に追加 pathの指定も、対応するLinkの追加も必要ない */}
            <Route exact component={Page404} />
          </Switch>
        </div>
        {isLogin ? <SimpleBottomNavigation /> : <Redirect to="/" />}
      </Router>
      {/* </div> */}
    </>
  );
}

export default App;
