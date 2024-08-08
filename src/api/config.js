// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { config } from "dotenv";

const env = process.env.NODE_ENV || "development";
console.log(process.env.NODE_ENV);
config({ path: `.env.${env}` });
console.log(process.env.FIREBASE_API_KEY);

// TODO: move it to env
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,

  authDomain: process.env.FIREBASE_AUTHDOMAIN,

  projectId: process.env.FIREBASE_PROJECT_ID,

  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,

  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const db = firebase.getFirestore(app);
const db = firebase.firestore();
//const quiz_db = db.collection('QuizBankDb')

export { db };
