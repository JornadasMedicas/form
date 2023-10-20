import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// console.log( process.env.REACT_APP_TESTING );
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

const firebaseConfig2 = {
    apiKey: process.env.REACT_APP_apiKey2,
    authDomain: process.env.REACT_APP_authDomain2,
    projectId: process.env.REACT_APP_projectId2,
    storageBucket: process.env.REACT_APP_storageBucket2,
    messagingSenderId: process.env.REACT_APP_messagingSenderId2,
    appId: process.env.REACT_APP_appId2,
    measurementId: process.env.measurementId2
};


const users = firebase.initializeApp( firebaseConfig, 'users');
const counter = firebase.initializeApp( firebaseConfig2 , 'counters');


const db = users.firestore();
const db2 = counter.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    db2,
    googleAuthProvider,
    firebase
};