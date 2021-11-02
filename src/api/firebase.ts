import {getAuth} from "@firebase/auth";
import {getDatabase} from "@firebase/database";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";
import {initializeApp} from "firebase/app";
import {browserLocalPersistence, setPersistence} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtLzmYYJw4DxglBKKcRPDWyl2cpEySD9I",
  authDomain: "block-site-acb64.firebaseapp.com",
  projectId: "block-site-acb64",
  storageBucket: "block-site-acb64.appspot.com",
  messagingSenderId: "450509114509",
  appId: "1:450509114509:web:0c4457c36bf5ba63c326c4",
  measurementId: "G-XHQVBMLR69",
};

// Initialize Firebase

initializeApp(firebaseConfig);

const firestore = getFirestore();
const database = getDatabase();
const storage = getStorage();
const auth = getAuth();

setPersistence(auth, browserLocalPersistence);
const initializeFirebase = () => console.log("Firebase loaded");

export {auth, firestore, database, storage};
export default initializeFirebase;
