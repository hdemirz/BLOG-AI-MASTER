'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { addDocument } from '../../utils/db';
import { logUserInteraction } from '../../utils/analytics';

export default function YeniBlogSayfasi() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!auth.currentUser) {
        throw new Error('Lütfen önce giriş yapın');
      }

      const post = {
        title,
        content,
        author: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
        authorEmail: auth.currentUser.email
      };

      const { id, error: addError } = await addDocument('posts', post);
      
      if (addError) {
        throw new Error(addError);
      }

      logUserInteraction('create_post', 'blog', 'success');
      router.push('/'); // Ana sayfaya yönlendir
      
    } catch (err: any) {
      setError(err.message);
      logUserInteraction('create_post_error', 'blog', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Yeni Blog Yazısı</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Başlık
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Blog yazınız için bir başlık girin"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                İçerik
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Blog yazınızın içeriğini buraya girin..."
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  loading
                    ? 'bg-indigo-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? 'Yayınlanıyor...' : 'Yazıyı Yayınla'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 