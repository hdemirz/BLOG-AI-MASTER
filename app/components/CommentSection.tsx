'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

export default function CommentSection() {
  const { theme } = useTheme();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Yeni yorum ekleme
    const comment: Comment = {
      id: Date.now(),
      author: 'Misafir',
      content: newComment,
      date: new Date().toLocaleDateString('tr-TR'),
      likes: 0
    };

    setComments([...comments, comment]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <div className="mt-12">
      <h3 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Yorumlar ({comments.length})
      </h3>

      {/* Yorum Formu */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Yorumunuzu yazın..."
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-black border-gray-800 text-white focus:ring-white'
              : 'bg-white border-gray-200 text-black focus:ring-blue-500'
          }`}
          rows={3}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 px-6 py-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-white text-black hover:bg-gray-100'
              : 'bg-black text-white hover:bg-gray-800'
          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Yorum Yap
        </button>
      </form>

      {/* Yorumlar Listesi */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {comment.author}
                </h4>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {comment.date}
                </span>
              </div>
              <button
                onClick={() => handleLike(comment.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                  theme === 'dark'
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {comment.likes}
              </button>
            </div>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 