// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDkqDGRJfn0bPzR-9TfSL461lHxx0Rwgzo",
  authDomain: "quizproject-8b8c8.firebaseapp.com",
  projectId: "quizproject-8b8c8",
  storageBucket: "quizproject-8b8c8.appspot.com",
  messagingSenderId: "1010494877447",
  appId: "1:1010494877447:web:6b1173602871fc56e9dfa2",
  measurementId: "G-XZ7VNV4EGQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//const db = firebase.getFirestore(app);
const db = firebase.firestore()
const quiz_db = db.collection('QuizBankDb')

export {quiz_db};