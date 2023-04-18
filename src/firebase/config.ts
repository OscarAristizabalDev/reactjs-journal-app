// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTSMYbo7Cz134rbtT6BNrMVIahQqFp9eo",
    authDomain: "react-cursos-e480f.firebaseapp.com",
    projectId: "react-cursos-e480f",
    storageBucket: "react-cursos-e480f.appspot.com",
    messagingSenderId: "294279976667",
    appId: "1:294279976667:web:4c7b3b6bcaa541e37e9efe"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);