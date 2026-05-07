// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Use import.meta.env for Vite projects
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "al-pak.firebaseapp.com",
  projectId: "al-pak",
  storageBucket: "al-pak.firebasestorage.app",
  messagingSenderId: "919970491559",
  appId: "1:919970491559:web:896b23d432883f18ab7f82"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);