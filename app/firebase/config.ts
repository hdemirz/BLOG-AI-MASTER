import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase uygulamasını başlat
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Auth ve Firestore servislerini yapılandır
const auth = getAuth(app);
const db = getFirestore(app);

// E-posta doğrulama ayarlarını yapılandır
auth.useDeviceLanguage(); // Tarayıcı diline göre e-posta şablonunu ayarla

export { app, auth, db }; 