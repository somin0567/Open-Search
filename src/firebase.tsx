import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch((error) =>
  console.error("에러:", error),
);

const googleProvider = new GoogleAuthProvider();

export { googleProvider, signInWithPopup };
