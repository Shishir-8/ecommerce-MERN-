
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecom-mern-5f99a.firebaseapp.com",
  projectId: "ecom-mern-5f99a",
  storageBucket: "ecom-mern-5f99a.firebasestorage.app",
  messagingSenderId: "34633177664",
  appId: "1:34633177664:web:d655435b6d0b47ba909da5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app)

