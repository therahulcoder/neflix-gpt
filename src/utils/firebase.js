// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUbuiuqBM61Ri2Dmca2-68Z9UFghvEOqU",
  authDomain: "netflixgpt-e6969.firebaseapp.com",
  projectId: "netflixgpt-e6969",
  storageBucket: "netflixgpt-e6969.appspot.com",
  messagingSenderId: "869120255462",
  appId: "1:869120255462:web:df01ef4bf18124b053e227",
  measurementId: "G-7DL2ZEP1KZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();