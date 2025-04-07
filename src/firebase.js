// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyxQGJiZuCbLIJZ404eAqkbG9tPJAxf-0",
  authDomain: "lifesync-715ee.firebaseapp.com",
  projectId: "lifesync-715ee",
  storageBucket: "lifesync-715ee.firebasestorage.app",
  messagingSenderId: "902825071420",
  appId: "1:902825071420:web:51c687a44605e8fe534439",
  measurementId: "G-PW7KBGL12L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app)

export { storage }