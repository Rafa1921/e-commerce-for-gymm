
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCb9t9rGegF9pri0KPh5flis2QvNBd9gfE",
  authDomain: "reactjs-projects-f898d.firebaseapp.com",
  projectId: "reactjs-projects-f898d",
  storageBucket: "reactjs-projects-f898d.appspot.com",
  messagingSenderId: "348787789056",
  appId: "1:348787789056:web:1964f51b8f1749a6eb77e5",
  measurementId: "G-QBFYPKF31M"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)