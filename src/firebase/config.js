import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAy2E07lAtqeAGmzfFe8Jqcpd4OURpDq4U",
  authDomain: "zenaida-db6ff.firebaseapp.com",
  projectId: "zenaida-db6ff",
  storageBucket: "zenaida-db6ff.appspot.com",
  messagingSenderId: "688040589997",
  appId: "1:688040589997:web:2d67ed6dec5e744a4a6424",
  measurementId: "G-RYXNW8GJ0V"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

getAnalytics(app); // opcional

// Exportamos lo necesario
export { app, auth, provider };
