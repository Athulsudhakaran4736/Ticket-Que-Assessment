// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9v2MOp8Jo5ZKaigl4xSoIF0c1nDLEwOA",
  authDomain: "assessment-project-ffbf4.firebaseapp.com",
  projectId: "assessment-project-ffbf4",
  storageBucket: "assessment-project-ffbf4.appspot.com",
  messagingSenderId: "246171449228",
  appId: "1:246171449228:web:6b2ee28dede20a39a788a9",
  measurementId: "G-MJWV2V8TNW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
