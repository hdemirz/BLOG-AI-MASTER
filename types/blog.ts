export interface Comment {
  id: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  dislikes: number;
  userReaction: 'like' | 'dislike' | null;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: string;
  author: string;
  image: string;
  readTime: number;
  categories: string[];
  comments: Comment[];
  slug: string;
} 