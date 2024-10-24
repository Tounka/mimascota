import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCnLC0tqcXdvg1VXP7qGt8Xk-gh6nYEb-M",
  authDomain: "gatitos-5eeac.firebaseapp.com",
  projectId: "gatitos-5eeac",
  storageBucket: "gatitos-5eeac.appspot.com",
  messagingSenderId: "1088591932760",
  appId: "1:1088591932760:web:62dcfaef5bbe4a1200092d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);