import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWpCK8BehuQYm9s6DevViYJYDK4XvE08k",
  authDomain: "membership-zensolve.firebaseapp.com",
  projectId: "membership-zensolve",
  storageBucket: "membership-zensolve.firebasestorage.app",
  messagingSenderId: "997848850399",
  appId: "1:997848850399:web:3018a0d8c00a3b53142e6a",
  measurementId: "G-JJVJ1V32MK"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
