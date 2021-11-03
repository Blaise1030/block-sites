import {getAuth} from "@firebase/auth";
import {getDatabase} from "@firebase/database";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";
import {initializeApp} from "firebase/app";
import {browserLocalPersistence, setPersistence} from "firebase/auth";
import {DATABASE_URL} from "./constant";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// Initialize Firebase

initializeApp(firebaseConfig as any);

const firestore = getFirestore();
const database = getDatabase(undefined, DATABASE_URL);
const storage = getStorage();
const auth = getAuth();

setPersistence(auth, browserLocalPersistence);
const initializeFirebase = () => console.log("Firebase loaded");

export {auth, firestore, database, storage};
export default initializeFirebase;
