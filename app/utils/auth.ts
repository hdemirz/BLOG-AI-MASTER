'use client';

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential,
  AuthError
} from 'firebase/auth';
import { auth } from '../firebase';

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Kayıt olurken bir hata oluştu';
    return { user: null, error: errorMessage };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Giriş yaparken bir hata oluştu';
    return { user: null, error: errorMessage };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Çıkış yaparken bir hata oluştu';
    return { error: errorMessage };
  }
}; 