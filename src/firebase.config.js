import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDIqxpQAzlGVw8LI5Pk5RSwsWvlEW6IooY",
    authDomain: "twitter-clone-saylani-project.firebaseapp.com",
    projectId: "twitter-clone-saylani-project",
    storageBucket: "twitter-clone-saylani-project.appspot.com",
    messagingSenderId: "393671383447",
    appId: "1:393671383447:web:62c457018ccbb644f50cd2",
    measurementId: "G-S47VS1EPRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)