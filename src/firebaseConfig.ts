import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAkDkfiBQdrEXYazyYO-NOiI_RmBW02iAg",
    authDomain: "instajunior-7e32c.firebaseapp.com",
    projectId: "instajunior-7e32c",
    storageBucket: "instajunior-7e32c.firebasestorage.app",
    messagingSenderId: "362985528543",
    appId: "1:362985528543:web:22b5bc178967261f725d6a",
    measurementId: "G-SN23ZBW315"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
