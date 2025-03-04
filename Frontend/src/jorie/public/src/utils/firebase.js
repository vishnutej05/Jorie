// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuw7ETGadt11C6j5I4UOl_6xS5i2SWOYM",
  authDomain: "jorie-clinicalanalytics-auth.firebaseapp.com",
  projectId: "jorie-clinicalanalytics-auth",
  storageBucket: "jorie-clinicalanalytics-auth.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "1090892931852",
  appId: "1:1090892931852:web:a37e735e91097a2086df29",
  measurementId: "G-PYKLYD1LGM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
