'use client';

import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  DocumentData
} from 'firebase/firestore';

interface FirestoreResponse<T> {
  data?: T;
  id?: string;
  documents?: T[];
  error: string | null;
}

// Yeni Döküman Ekleme
export const addDocument = async <T extends DocumentData>(
  collectionName: string, 
  data: T
): Promise<FirestoreResponse<T>> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Döküman eklenirken bir hata oluştu';
    return { id: null, error: errorMessage };
  }
};

// Döküman Güncelleme
export const updateDocument = async <T extends DocumentData>(
  collectionName: string, 
  docId: string, 
  data: Partial<T>
): Promise<FirestoreResponse<T>> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return { error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Döküman güncellenirken bir hata oluştu';
    return { error: errorMessage };
  }
};

// Döküman Silme
export const deleteDocument = async (
  collectionName: string, 
  docId: string
): Promise<FirestoreResponse<void>> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Döküman silinirken bir hata oluştu';
    return { error: errorMessage };
  }
};

// Tek Döküman Getirme
export const getDocument = async <T extends DocumentData>(
  collectionName: string, 
  docId: string
): Promise<FirestoreResponse<T>> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { 
        data: { id: docSnap.id, ...docSnap.data() } as T, 
        error: null 
      };
    }
    return { data: null, error: 'Döküman bulunamadı' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Döküman getirilirken bir hata oluştu';
    return { data: null, error: errorMessage };
  }
};

// Koleksiyon Getirme
export const getCollection = async <T extends DocumentData>(
  collectionName: string
): Promise<FirestoreResponse<T>> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
    return { documents, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Koleksiyon getirilirken bir hata oluştu';
    return { documents: [], error: errorMessage };
  }
}; 