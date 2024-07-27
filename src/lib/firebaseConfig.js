import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq9kKd7P5uNPr9QBfkH5K4mnTT5OBL1GY",
  authDomain: "chulbuli-chat.firebaseapp.com",
  projectId: "chulbuli-chat",
  storageBucket: "chulbuli-chat.appspot.com",
  messagingSenderId: "820350659339",
  appId: "1:820350659339:web:0d4e6d3199c8046dd4900e",
  measurementId: "G-6054FMTQCN",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
