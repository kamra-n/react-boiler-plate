import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCLKApA2wO9eMMhg05TvzFqZCAUxlhJtYs",
  authDomain: "twitter-clone-saylani-task.firebaseapp.com",
  projectId: "twitter-clone-saylani-task",
  storageBucket: "twitter-clone-saylani-task.appspot.com",
  messagingSenderId: "414596930465",
  appId: "1:414596930465:web:1980d8335abd9ada6549e0",
  measurementId: "G-N5R2D39VC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
