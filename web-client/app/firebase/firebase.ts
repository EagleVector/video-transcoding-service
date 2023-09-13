// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt61G9LQxCPFBii6TrxRy1Znn5K9WLmoE",
  authDomain: "video-transcoding-servic-b68b2.firebaseapp.com",
  projectId: "video-transcoding-servic-b68b2",
  appId: "1:98065577377:web:145265a57cef24e22847e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/**
 * Signs a user in with a Google Popup
 * @returns A promise that resolves with the user's credentials
 */

export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs the user out
 * @returns A promise that resolves with the user is signed out
 */

export function signOut() {
  return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes
 * @returns A function to unsubscribe callback
 */

export function onAuthStateChangedHandler(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}


