'use client';

import { useState } from 'react';
import { addDocument, updateDocument, deleteDocument } from '../utils/db';
import { uploadFile, deleteFile } from '../utils/storage';
import { auth } from '../firebase';
import { logUserInteraction } from '../utils/analytics';

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: Date;
}

interface FirebaseError {
  code: string;
  message: string;
}

export default function BlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!auth.currentUser) {
        throw new Error('Lütfen önce giriş yapın');
      }

      let imageUrl = '';
      if (image) {
        const imagePath = `blog-images/${Date.now()}-${image.name}`;
        const uploadResult = await uploadFile(image, imagePath);
        if (uploadResult.error) {
          throw new Error(uploadResult.error);
        }
        imageUrl = uploadResult.url || '';
      }

      const post: BlogPost = {
        title,
        content,
        imageUrl,
        author: auth.currentUser.uid,
        createdAt: new Date()
      };

      const { id, error: dbError } = await addDocument('posts', post);
      if (dbError) {
        throw new Error(dbError);
      }

      logUserInteraction('create_post', 'blog', 'success');
      
      // Formu temizle
      setTitle('');
      setContent('');
      setImage(null);
      
    } catch (error: unknown) {
      let errorMessage = 'Blog yazısı oluşturulurken bir hata oluştu';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      setError(errorMessage);
      logUserInteraction('create_post_error', 'blog', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Yeni Blog Yazısı</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">İçerik</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Görsel</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Yükleniyor...' : 'Yazıyı Yayınla'}
        </button>
      </form>
    </div>
  );
} 