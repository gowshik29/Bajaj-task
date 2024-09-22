// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrkEoRBf3DLt6MT_Ojwq7n26xCRngtQBs",
  authDomain: "bajaj-97347.firebaseapp.com",
  projectId: "bajaj-97347",
  storageBucket: "bajaj-97347.appspot.com",
  messagingSenderId: "640132169553",
  appId: "1:640132169553:web:b71d108c7a98605b045d70",
  measurementId: "G-ZCWLHXEYS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);