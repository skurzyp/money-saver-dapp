import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_API_KEY,
  authDomain: "solana-money-saver.firebaseapp.com",
  projectId: "solana-money-saver",
  storageBucket: "solana-money-saver.firebasestorage.app",
  messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_FIREBASE_APP_ID,
  measurementId: process.env.REACT_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }