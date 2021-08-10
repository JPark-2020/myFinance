import firebase from "firebase";
import config from "./config";

var firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const usersCollection = db.collection("users");
export const monthsCollection = db.collection("months");
export const expensesCollection = db.collection("expenses");
export const balanceCollection = db.collection("balance");
export const savingsCollection = db.collection("savings");
export default fire;

// const db = firebase.firestore();
