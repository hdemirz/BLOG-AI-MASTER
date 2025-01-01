'use client';

import Link from 'next/link';
import { useTheme } from '@/app/components/ThemeProvider';
import Image from 'next/image';
import ReadingProgress from '@/app/components/ReadingProgress';
import CommentSection from '@/app/components/CommentSection';
import ShareButtons from '@/app/components/ShareButtons';
import Sidebar from '@/app/components/Sidebar';
import { Post } from '@/app/data/posts';

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <ReadingProgress />
      
      {/* Üst Bar */}
      <div className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Sidebar />
            <button 
              onClick={toggleTheme}
              className={`transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}
              aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
            >
              {theme === 'dark' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          <div className="text-center flex-grow">
            <h1 className={`text-3xl font-semibold tracking-tight mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Hakan&apos;ın Blogu</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/giris" 
              className={`transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Giriş Yap
            </Link>
            <Link 
              href="/uyelik" 
              className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Üye Ol
            </Link>
          </div>
        </div>
      </div>

      {/* Ana Menü */}
      <nav className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-8">
              <Link href="/" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                ANA SAYFA
              </Link>
              <Link href="/?category=Kültür" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                KÜLTÜR
              </Link>
              <Link href="/?category=Ekonomi" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                EKONOMİ
              </Link>
              <Link href="/?category=Politika" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                POLİTİKA
              </Link>
              <Link href="/?category=Bilim" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                BİLİM
              </Link>
              <Link href="/?category=Teknoloji" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                TEKNOLOJİ
              </Link>
              <Link href="/hakkimizda" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                HAKKIMIZDA
              </Link>
              <Link href="/iletisim" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                İLETİŞİM
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Blog Yazısı İçeriği */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article>
          {/* Başlık ve Meta Bilgiler */}
          <header className="mb-8">
            <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <time className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {new Date(post.date).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>•</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {post.readTime} dakika okuma süresi
              </span>
            </div>
          </header>

          {/* Görsel */}
          <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Kategoriler */}
          <div className="flex gap-2 mb-8">
            {post.categories.map((category) => (
              <Link
                key={category}
                href={`/?category=${category}`}
                className={`px-3 py-1 rounded-full text-sm ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>

          {/* İçerik */}
          <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Paylaşım Butonları */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <ShareButtons
              title={post.title}
              url={typeof window !== 'undefined' ? window.location.href : ''}
            />
          </div>
        </article>

        {/* Yorumlar */}
        <CommentSection />
      </div>
    </div>
  );
} 