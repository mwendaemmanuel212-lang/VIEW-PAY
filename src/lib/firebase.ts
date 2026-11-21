
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC17ogEYrWXannUm07kN95pJWNK4YPBfcQ",
  authDomain: "viewpay-2a26c.firebaseapp.com",
  projectId: "viewpay-2a26c",
  storageBucket: "viewpay-2a26c.firebasestorage.app",
  messagingSenderId: "948515708328",
  appId: "1:948515708328:web:cc9b2ce8535c1dc64a119d",
  measurementId: "G-CRWQLNPSM2"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
