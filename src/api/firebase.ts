import {initializeApp} from "firebase/app";

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
const initializeFirebase = () => initializeApp(firebaseConfig);

export default initializeFirebase;
