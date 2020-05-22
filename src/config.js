import firebase from 'firebase';
// import 'firebase/firestore'; //firestoreを使う場合
// import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
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

// export const providerGoogle = new firebase.auth.GoogleAuthProvider();
// export const providerFacebook = new firebase.auth.FacebookAuthProvider();
// export const providerTwitter = new firebase.auth.TwitterAuthProvider();
// export const db = firebase.firestore(); //firestroeを使う場合
export default firebase;
