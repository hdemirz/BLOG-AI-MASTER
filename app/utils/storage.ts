import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

interface UploadResult {
  url?: string;
  error?: string;
}

interface DeleteResult {
  error?: string;
}

interface GetUrlResult {
  url?: string;
  error?: string;
}

export const uploadFile = async (file: File, path: string): Promise<UploadResult> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { url: downloadURL };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Dosya yüklenirken bir hata oluştu';
    return { error: errorMessage };
  }
};

export const deleteFile = async (path: string): Promise<DeleteResult> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return {};
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Dosya silinirken bir hata oluştu';
    return { error: errorMessage };
  }
};

export const getFileUrl = async (path: string): Promise<GetUrlResult> => {
  try {
    const url = await getDownloadURL(ref(storage, path));
    return { url };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Dosya URL\'i alınırken bir hata oluştu';
    return { error: errorMessage };
  }
}; 