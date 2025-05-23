// src/lib/firebase/clientApp.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// LOG PER DEBUG (Rimuovi dopo il test)
console.log("Firebase Config being used:", firebaseConfig);
if (!firebaseConfig.apiKey) {
  console.error("ATTENZIONE: NEXT_PUBLIC_FIREBASE_API_KEY non è definita!");
}
if (!firebaseConfig.authDomain) {
  console.error("ATTENZIONE: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN non è definita!");
}
// Aggiungi controlli simili per le altre variabili se necessario

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log("Firebase App INIZIALIZZATA");
} else {
  app = getApps()[0];
  console.log("Firebase App GIA' ESISTENTE");
}

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  googleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
export type { FirebaseUser };
