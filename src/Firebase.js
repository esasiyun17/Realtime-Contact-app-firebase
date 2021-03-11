import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBEyEd4hJ74DsTZoF-JTGa8IZdnkYWDe2k",
    authDomain: "react-realtime-app-84059.firebaseapp.com",
    databaseURL: "https://react-realtime-app-84059-default-rtdb.firebaseio.com",
    projectId: "react-realtime-app-84059",
    storageBucket: "react-realtime-app-84059.appspot.com",
    messagingSenderId: "982524197189",
    appId: "1:982524197189:web:33961825c89c4e2bb3262c"
  };
  // Initialize Firebase
var db = firebase.initializeApp(firebaseConfig);

export default db.database().ref();