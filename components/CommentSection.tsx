'use client';

import { Comment } from "@/types/blog";
import { useState } from "react";

// SVG İkonları
const LikeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-5 h-5 ${className}`}
  >
    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
  </svg>
);

const DislikeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-5 h-5 ${className}`}
  >
    <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77c.483 0 .964.078 1.423.23l3.114 1.04a4.501 4.501 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.836 1.363 1.313 2.959 1.313 4.666 0 1.42-.317 2.766-.924 3.977-.197.4.078.898.523.898h.052c.832 0 1.612-.453 1.918-1.227z" />
  </svg>
);

interface CommentSectionProps {
  initialComments?: Comment[];
}

export default function CommentSection({ initialComments = [] }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(initialComments);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: "Ziyaretçi",
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
      userReaction: null
    };

    setLocalComments([...localComments, comment]);
    setNewComment("");
  };

  const handleDelete = (commentId: string) => {
    setShowDeleteConfirm(commentId);
  };

  const confirmDelete = (commentId: string) => {
    setLocalComments(localComments.filter((comment) => comment.id !== commentId));
    setShowDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const handleReaction = (commentId: string, reaction: 'like' | 'dislike') => {
    setLocalComments(
      localComments.map((comment) => {
        if (comment.id === commentId) {
          const updatedComment = { ...comment };
          
          // Aynı reaksiyona tıklanırsa, reaksiyonu kaldır
          if (comment.userReaction === reaction) {
            if (reaction === 'like') {
              updatedComment.likes -= 1;
            } else {
              updatedComment.dislikes -= 1;
            }
            updatedComment.userReaction = null;
            return updatedComment;
          }
          
          // Eski reaksiyonu kaldır
          if (comment.userReaction === 'like') {
            updatedComment.likes -= 1;
          } else if (comment.userReaction === 'dislike') {
            updatedComment.dislikes -= 1;
          }
          
          // Yeni reaksiyonu ekle
          if (reaction === 'like') {
            updatedComment.likes += 1;
          } else {
            updatedComment.dislikes += 1;
          }
          
          updatedComment.userReaction = reaction;
          return updatedComment;
        }
        return comment;
      })
    );
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Yorumlar</h2>
      
      {/* Yorum Listesi */}
      <div className="space-y-6 mb-8">
        {localComments.map((comment) => (
          <div
            key={comment.id}
            className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 relative group"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex justify-between items-center">
              <span>{comment.author} • {comment.date}</span>
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Sil
              </button>
            </div>
            <p className="text-gray-800 dark:text-gray-200 mb-2">{comment.content}</p>

            {/* Beğeni Butonları */}
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => handleReaction(comment.id, 'like')}
                className={`flex items-center gap-1 transition-colors ${
                  comment.userReaction === 'like'
                    ? 'text-green-500'
                    : 'text-gray-500 hover:text-green-500'
                }`}
              >
                <LikeIcon />
                <span>{comment.likes}</span>
              </button>
              <button
                onClick={() => handleReaction(comment.id, 'dislike')}
                className={`flex items-center gap-1 transition-colors ${
                  comment.userReaction === 'dislike'
                    ? 'text-red-500'
                    : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <DislikeIcon />
                <span>{comment.dislikes}</span>
              </button>
            </div>

            {/* Silme Onay Modalı */}
            {showDeleteConfirm === comment.id && (
              <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm mb-4">Bu yorumu silmek istediğinizden emin misiniz?</p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => confirmDelete(comment.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Evet, Sil
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                  >
                    İptal
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {localComments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center italic">
            Henüz yorum yapılmamış. İlk yorumu siz yapın!
          </p>
        )}
      </div>

      {/* Yorum Formu */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Yorumunuzu yazın..."
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          rows={4}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Yorum Yap
        </button>
      </form>
    </div>
  );
} 