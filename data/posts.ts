import { BlogPost } from '../types/blog';

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'İlk Blog Yazım',
    content: 'Bu benim ilk blog yazım. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    summary: 'Bu benim ilk blog yazım. Kendimi ve düşüncelerimi paylaşacağım...',
    date: '2024-02-20',
    author: 'Blog Yazarı',
    categories: ['Genel', 'Kişisel'],
    comments: [
      {
        id: '1',
        content: 'Harika bir yazı olmuş!',
        author: 'Okuyucu 1',
        date: '2024-02-20',
        likes: 5,
        dislikes: 1,
        userReaction: null
      }
    ],
    slug: 'ilk-blog-yazim',
    image: '/images/blog-1.jpg',
    readTime: 3
  },
  {
    id: '2',
    title: 'Teknoloji Dünyasındaki Gelişmeler',
    content: 'Teknoloji dünyasında son zamanlarda çok hızlı gelişmeler yaşanıyor. Yapay zeka, blockchain ve quantum bilgisayarlar gibi konular gündemde. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    summary: 'Teknoloji dünyasındaki son gelişmeleri değerlendiriyorum...',
    date: '2024-02-21',
    author: 'Blog Yazarı',
    categories: ['Teknoloji', 'Yapay Zeka'],
    comments: [],
    slug: 'teknoloji-dunyasindaki-gelismeler',
    image: '/images/blog-2.jpg',
    readTime: 5
  }
]; 