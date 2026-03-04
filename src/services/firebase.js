import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword as firebaseSignIn, onAuthStateChanged as firebaseOnAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { mockAuth, mockDb } from './mockServices';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock"
};

// Internal original auth
let _auth, db, storage;

if (useMocks) {
  _auth = mockAuth;
  db = mockDb;
  storage = {};
} else {
  const app = initializeApp(firebaseConfig);
  _auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

// Wrapper to prevent recursion and support manual dispatch
const listeners = new Set();

const auth = {
  // Pass-through properties
  get currentUser() { return _auth.currentUser; },
  get config() { return _auth.config; },
  // ... add other necessary props if needed, but currentUser is the main one
  
  // Custom methods
  signInWithEmailAndPassword: (email, password) => {
    if (useMocks) return mockAuth.signInWithEmailAndPassword(email, password);
    return firebaseSignIn(_auth, email, password);
  },
  
  onAuthStateChanged: (callback) => {
    listeners.add(callback);
    // Subscribe to original
    const unsubscribe = useMocks 
      ? mockAuth.onAuthStateChanged(callback)
      : firebaseOnAuth(_auth, callback);
      
    return () => {
      listeners.delete(callback);
      unsubscribe();
    };
  },
  
  signOut: async () => {
    if (useMocks) await mockAuth.signOut();
    else await _auth.signOut();
    localStorage.removeItem('mockUser');
    if (auth.dispatchAuthState) auth.dispatchAuthState(null);
  },

  dispatchAuthState: (user) => {
    listeners.forEach(cb => cb(user));
  }
};

export { auth, db, storage };
