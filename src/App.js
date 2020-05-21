import React from 'react';
import './App.css';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SimpleBottomNavigation from './components/BottomNavigation';
import TimeLine from './pages/TimeLine';
import GoodList from './pages/GoodList';
import Setting from './pages/Setting';

var firebaseConfig = {
  apiKey: 'AIzaSyAv91krYQnVoACpxl4zrpdiHJ9KS5GroS4',
  authDomain: 'gooood-unlimited.firebaseapp.com',
  databaseURL: 'https://gooood-unlimited.firebaseio.com',
  projectId: 'gooood-unlimited',
  storageBucket: 'gooood-unlimited.appspot.com',
  messagingSenderId: '914335845102',
  appId: '1:914335845102:web:974de9b7bdb1cc9cf501ff',
  measurementId: 'G-ZPWD4WH7TZ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

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

function App() {
  return (
    <div className="App">
      <Router>
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
    </div>
  );
}

export default App;
