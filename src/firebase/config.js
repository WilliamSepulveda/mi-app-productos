// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAy2E07lAtqeAGmzfFe8Jqcpd4OURpDq4U",
    authDomain: "zenaida-db6ff.firebaseapp.com",
    databaseURL: "https://zenaida-db6ff-default-rtdb.firebaseio.com",
    projectId: "zenaida-db6ff",
    storageBucket: "zenaida-db6ff.firebasestorage.app",
    messagingSenderId: "688040589997",
    appId: "1:688040589997:web:2d67ed6dec5e744a4a6424",
    measurementId: "G-RYXNW8GJ0V"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
