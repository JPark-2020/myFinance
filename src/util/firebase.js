import firebase from 'firebase';
import config from './config';

var firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId
  };

  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  
  export default fire; 

// const db = firebase.firestore();
