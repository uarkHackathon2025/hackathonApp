// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL9WFJExmAXuPMs5_If8VKO4IiXKYB9bs",
  authDomain: "sasehack-2024-b124d.firebaseapp.com",
  projectId: "sasehack-2024-b124d",
  storageBucket: "sasehack-2024-b124d.firebasestorage.app",
  messagingSenderId: "174670824554",
  appId: "1:174670824554:web:17e0c10eeb53a9208eb613"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};