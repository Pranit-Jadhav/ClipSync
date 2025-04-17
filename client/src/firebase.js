// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQVpbG4mQmo0LrUaTfF9IUxpMUx78oDP4",
  authDomain: "video-66f3e.firebaseapp.com",
  projectId: "video-66f3e",
  storageBucket: "video-66f3e.firebasestorage.app",
  messagingSenderId: "993865242982",
  appId: "1:993865242982:web:a5aa7198851dea92f390a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app;
