'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  createdAt: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const querySnapshot = await getDocs(postsCollection);
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];

        // Tarihe göre sırala (en yeni en üstte)
        const sortedPosts = documents.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setPosts(sortedPosts);
      } catch (err) {
        console.error('Blog yazıları yüklenirken hata:', err);
        setError('Blog yazıları yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center p-4 rounded-lg ${
        theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-800'
      }`}>
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`text-center p-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        Henüz blog yazısı bulunmuyor.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className={`rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="p-6">
            <h2 className={`text-xl font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {post.title}
            </h2>
            <p className={`mb-4 line-clamp-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {post.content}
            </p>
            <div className="flex justify-between items-center text-sm">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                {new Date(post.createdAt).toLocaleDateString('tr-TR')}
              </span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                {post.authorEmail}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
} 