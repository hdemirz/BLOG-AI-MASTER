'use client';

import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  User
} from 'firebase/auth';

interface AuthResult {
  user?: User;
  error?: string;
}

interface VerificationResult {
  success?: boolean;
  message?: string;
}

export const signUp = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Kayıt olurken bir hata oluştu';
    return { error: errorMessage };
  }
};

export const signIn = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Giriş yaparken bir hata oluştu';
    return { error: errorMessage };
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Çıkış yaparken hata:', error);
  }
};

export const sendVerificationEmail = async (user: User): Promise<VerificationResult> => {
  try {
    await sendEmailVerification(user);
    return { 
      success: true,
      message: 'Doğrulama e-postası gönderildi. Lütfen e-posta kutunuzu kontrol edin.'
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Doğrulama e-postası gönderilirken bir hata oluştu';
    return { 
      success: false,
      message: errorMessage
    };
  }
};

export const checkEmailVerification = async (user: User) => {
  try {
    await user.reload();
    return user.emailVerified;
  } catch (error) {
    return false;
  }
}; 