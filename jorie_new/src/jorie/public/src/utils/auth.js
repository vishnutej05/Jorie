import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import app from "./firebase"; // Ensure firebase.js exports `app`
import { app } from "../utils/firebase"; // If `auth.js` is in another subdirectory


// Initialize Firebase Authentication
const auth = getAuth(app);

// Login function
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Login Error:", error.message);
        return null;
    }
}

// Signup function
async function signup(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Signup Error:", error.message);
        return null;
    }
}

// Google Sign-In function
async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        return userCredential.user;
    } catch (error) {
        console.error("Google Sign-In Error:", error.message);
        return null;
    }
}

export { login, signup, signInWithGoogle };
