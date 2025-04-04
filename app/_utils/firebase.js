// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-9DF2FhkrrLmRvPZLZ4QFTmV2VduVjl8",
  authDomain: "bookclub-e3e0c.firebaseapp.com",
  projectId: "bookclub-e3e0c",
  storageBucket: "bookclub-e3e0c.firebasestorage.app",
  messagingSenderId: "146980589840",
  appId: "1:146980589840:web:b32f30d18fb8afd1ddd595",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
