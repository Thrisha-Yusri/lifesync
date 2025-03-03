// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyxQGJiZuCbLIJZ404eAqkbG9tPJAxf-0",
  authDomain: "lifesync-715ee.firebaseapp.com",
  projectId: "lifesync-715ee",
  storageBucket: "lifesync-715ee.firebasestorage.app",
  messagingSenderId: "902825071420",
  appId: "1:902825071420:web:51c687a44605e8fe534439",
  measurementId: "G-PW7KBGL12L",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db
