// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFIJsqyAYCi4qQPMnq3D7ynQaYJGDH9PU",
  authDomain: "yuukimangas.firebaseapp.com",
  projectId: "yuukimangas",
  storageBucket: "yuukimangas.firebasestorage.app",
  messagingSenderId: "482534447662",
  appId: "1:482534447662:web:795e9282509a614ef1ddbf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Constante unificada para la colección de productos/mangas
export const COLECCION_PRODUCTOS = "mangas";
