// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnnSFmpVscBay9MD3hCAJ-UjUJF_6c1pA",
  authDomain: "neet-support-79c15.firebaseapp.com",
  projectId: "neet-support-79c15",
  storageBucket: "neet-support-79c15.appspot.com",
  messagingSenderId: "462680371625",
  appId: "1:462680371625:web:4676a85bf09f7ee68bd4b8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
