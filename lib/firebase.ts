// lib/firebase.ts
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCN1H6dNA4oO_nG_UTwxeetMsRZcyYcZNE",
  authDomain: "my-shop-5d9cc.firebaseapp.com",
  projectId: "my-shop-5d9cc",
  storageBucket: "my-shop-5d9cc.firebasestorage.app",
  messagingSenderId: "139037565007",
  appId:  "1:139037565007:web:ff7aaba8dd3c166e0a8a3a",
}

// 🔥 Firebase শুরু করা
const app = initializeApp(firebaseConfig)

// 📦 ডাটাবেজ (Firestore)
export const db = getFirestore(app)

// 🔐 লগইন / ইউজার Authentication
export const auth = getAuth(app)




