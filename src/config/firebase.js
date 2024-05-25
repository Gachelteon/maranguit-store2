// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOAnkuwutxqBskofTVx_77E480NxN4AFE",
  authDomain: "it-sysarch32-store-maranguit.firebaseapp.com",
  projectId: "it-sysarch32-store-maranguit",
  storageBucket: "it-sysarch32-store-maranguit.appspot.com",
  messagingSenderId: "706069412927",
  appId: "1:706069412927:web:87666c407a4e746006cc8a",
  measurementId: "G-MXKJQ693L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the initialized app instance
export { db, storage };