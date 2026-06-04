import { initializeApp } from 'firebase/app';
import { 
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, 
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  browserLocalPersistence, setPersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeSU11fbjNcojjlfgKudsjq4vIv8C3oSw",
  authDomain: "polynomial-node-c2gpt.firebaseapp.com",
  projectId: "polynomial-node-c2gpt",
  storageBucket: "polynomial-node-c2gpt.firebasestorage.app",
  messagingSenderId: "397253837002",
  appId: "1:397253837002:web:7ebe7dbe248c8c72f0b433"
};

const app = initializeApp(firebaseConfig);

// Use the default database if no specific ID is required for standard deployments
// The AI Studio managed database ID is ai-studio-627e40f9-c96c-4358-a80c-b5e69d7e6312
export const db = getFirestore(app); 

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();

export { signInWithEmailAndPassword, createUserWithEmailAndPassword };

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
