'use client';

import { useEffect, useState } from 'react';
import { getCollection } from '../utils/db';
import { logPageView } from '../utils/analytics';
import { auth } from '../firebase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: Date;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Firebase'in başlatılmasını bekle
    const unsubscribe = auth.onAuthStateChanged(() => {
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (initialized) {
      loadPosts();
      logPageView('blog_list');
    }
  }, [initialized]);

  const loadPosts = async () => {
    try {
      const { documents, error } = await getCollection('posts');
      if (error) throw new Error(error);

      // Tarihe göre sırala (en yeni en üstte)
      const sortedPosts = documents.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setPosts(sortedPosts as BlogPost[]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!initialized || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Hata: {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        Henüz blog yazısı bulunmuyor.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {post.imageUrl && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {post.content}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 