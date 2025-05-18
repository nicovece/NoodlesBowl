import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtBRG6QvM-b1_u2NI4KHmNGVp_G6BNghU",
  authDomain: "noodlesbowl-f7d56.firebaseapp.com",
  projectId: "noodlesbowl-f7d56",
  storageBucket: "noodlesbowl-f7d56.firebasestorage.app",
  messagingSenderId: "1042412426709",
  appId: "1:1042412426709:web:c9538c0816a18adc7b595c"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth }; 