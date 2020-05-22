import React, { useState, useEffect } from 'react';
import './App.css';
// import * as firebase from 'firebase';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SimpleBottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';
import TimeLine from './pages/TimeLine';
import GoodList from './pages/GoodList';
import Setting from './pages/Setting';
import firebase from './config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';

const page404 = () => (
  <div>
    <h1>404</h1>存在しないページです
  </div>
);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/timeline',
    signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        console.log(user);
        user.getIdToken().then(function (accessToken) {
          console.log(
            accessToken
            // JSON.stringify(
            //   {
            //     displayName: displayName,
            //     email: email,
            //     emailVerified: emailVerified,
            //     phoneNumber: phoneNumber,
            //     photoURL: photoURL,
            //     uid: uid,
            //     accessToken: accessToken,
            //     providerData: providerData,
            //   },
            //   null,
            //   '  '
            // )
          );
        });
      });

    return () => unregisterAuthObserver();
  });

  return (
    <div className="App">
      {isSignedIn ? (
        <Router>
          <div className="App-header">
            {/* <Button onClick={() => firebase.auth().signOut()}>SignOut!</Button> */}
            <Switch>
              {/* <Route path="/" exact component={Home} /> */}
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
        <>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </>
      )}
    </div>
  );
}

export default App;
