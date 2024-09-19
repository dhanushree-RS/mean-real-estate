// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-c5db8.firebaseapp.com",
  projectId: "mern-real-estate-c5db8",
  storageBucket: "mern-real-estate-c5db8.appspot.com",
  messagingSenderId: "976020333775",
  appId: "1:976020333775:web:0bd7c7c5acc240361d03ba",
  measurementId: "G-092D8777BL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);