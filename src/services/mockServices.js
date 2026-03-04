// Simulation des services Firebase
import { MOCK_PRODUCTS } from '../data/mockData';

const MOCK_USERS = {
  'admin@gmail.com': { uid: 'admin-001', email: 'admin@gmail.com', displayName: 'Aubry Admin', role: 'admin' },
  'client@gmail.com': { uid: 'client-001', email: 'client@gmail.com', displayName: 'Client Test', role: 'user' }
};

let authListener = null;

export const mockAuth = {
  get currentUser() {
    return JSON.parse(localStorage.getItem('mockUser'));
  },
  onAuthStateChanged: (callback) => {
    authListener = callback;
    const user = JSON.parse(localStorage.getItem('mockUser'));
    callback(user);
    return () => { authListener = null; };
  },
  signInWithEmailAndPassword: async (email, password) => {
    if ((email === 'admin@gmail.com' && password === 'Immo#123') || 
        (email === 'client@gmail.com' && password === 'Immo#123')) {
      const user = MOCK_USERS[email];
      localStorage.setItem('mockUser', JSON.stringify(user));
      if (authListener) authListener(user);
      return { user };
    }
    throw new Error("Identifiants de test invalides.");
  },
  signOut: async () => {
    localStorage.removeItem('mockUser');
    if (authListener) authListener(null);
    window.location.href = '/';
  }
};

export const mockDb = {
  collection: (name) => ({
    getDocs: async () => ({ docs: MOCK_PRODUCTS.map(p => ({ id: p.id, data: () => p })) }),
    addDoc: async (data) => ({ id: Math.random().toString(36).substr(2, 9) })
  })
};