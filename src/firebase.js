// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7Wi7AhZ0stx3YkptEEFkOExRyzgcb3GE",
  authDomain: "cictwp2.firebaseapp.com",
  projectId: "cictwp2",
  storageBucket: "cictwp2.appspot.com",
  messagingSenderId: "58296487821",
  appId: "1:58296487821:web:69df8a57e2b7e5453937c4",
  measurementId: "G-X7CMZVCZKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export { authentication};

