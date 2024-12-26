'use client';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCsmLt04QPXaZHxMKqXpbOM1pxK9ghD_1o",
  authDomain: "blog-ai-master.firebaseapp.com",
  projectId: "blog-ai-master",
  storageBucket: "blog-ai-master.firebasestorage.app",
  messagingSenderId: "690002303572",
  appId: "1:690002303572:web:c1a9a3275241fe60bd6bc1",
  measurementId: "G-2QN2YHCQD0"
};

console.log('Firebase Config:', firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

console.log('Firebase App initialized:', app);
console.log('Firestore initialized:', db); 