// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6MyxuI3kaFhXDznprg-SK5I0pKG8jpVw",
  authDomain: "netflixgpt-da125.firebaseapp.com",
  projectId: "netflixgpt-da125",
  storageBucket: "netflixgpt-da125.appspot.com",
  messagingSenderId: "213756501521",
  appId: "1:213756501521:web:ebca13aaa4952830615bb0",
  measurementId: "G-BDPYTZER8B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
