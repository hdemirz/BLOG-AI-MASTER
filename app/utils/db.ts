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

interface AddDocumentResult {
  id?: string;
  error?: string;
}

interface UpdateDocumentResult {
  error?: string;
}

interface GetDocumentResult<T> {
  data?: T;
  error?: string;
}

interface GetDocumentsResult<T> {
  documents?: T[];
  error?: string;
}

export const addDocument = async (
  collectionName: string,
  data: DocumentData
): Promise<AddDocumentResult> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Döküman eklenirken bir hata oluştu';
    return { id: undefined, error: errorMessage };
  }
};

export const checkDocumentExists = async (
  collectionName: string,
  field: string,
  value: string
): Promise<boolean> => {
  try {
    const q = query(collection(db, collectionName), where(field, '==', value));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Döküman kontrolü sırasında hata:', error);
    return false;
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<UpdateDocumentResult> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return {};
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Döküman güncellenirken bir hata oluştu';
    return { error: errorMessage };
  }
};

export const getDocument = async <T extends DocumentData>(
  collectionName: string,
  docId: string
): Promise<GetDocumentResult<T>> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = {
        id: docSnap.id,
        ...docSnap.data()
      } as unknown as T;
      
      return { data };
    }
    
    return { error: 'Döküman bulunamadı' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Döküman alınırken bir hata oluştu';
    return { error: errorMessage };
  }
};

export const getDocuments = async <T extends DocumentData>(
  collectionName: string
): Promise<GetDocumentsResult<T>> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as unknown as T));
    
    return { documents };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Dökümanlar alınırken bir hata oluştu';
    return { error: errorMessage };
  }
}; 