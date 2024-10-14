import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "expensetracker-533fe.firebaseapp.com",
  projectId: "expensetracker-533fe",
  storageBucket: "expensetracker-533fe.appspot.com",
  messagingSenderId: "710560692221",
  appId: "1:710560692221:web:aa35c1eac4e0dd5275cb94",
  measurementId: "G-11MZ05CRES"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);