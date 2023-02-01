// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN0j83gbUxtexS46RQftP9k5tND05r4hQ",
  authDomain: "restaurant-delivery-f107e.firebaseapp.com",
  databaseURL: "https://restaurant-delivery-f107e-default-rtdb.firebaseio.com",
  projectId: "restaurant-delivery-f107e",
  storageBucket: "restaurant-delivery-f107e.appspot.com",
  messagingSenderId: "157055178272",
  appId: "1:157055178272:web:0908904d8262be89b5ce45",
  measurementId: "G-MLY9S6TJ6S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

export const db = getFirestore(app);
export const auth = getAuth(app);
