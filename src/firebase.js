import { initializeApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVQFBJKk45tG4lwO8QTZibpxjyxP_lQXw",
  authDomain: "fursacapital-445b7.firebaseapp.com",
  projectId: "fursacapital-445b7",
  storageBucket: "fursacapital-445b7.appspot.com",
  messagingSenderId: "754421351970",
  appId: "1:754421351970:web:df34aa82bdf2b3ad0eec7b",
  measurementId: "G-KP91KGPXE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app)
const firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export {db, firebase_app, auth, storage};