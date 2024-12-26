"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/app/components/ThemeProvider';
import { posts, Post } from './data/posts';
import Sidebar from './components/Sidebar';
import { useSearchParams } from 'next/navigation';
import { auth } from './firebase';

interface HomeProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const params = useSearchParams();
  const selectedCategory = params.get('category');
  const searchRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory ? post.categories.includes(selectedCategory) : true;
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
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
            <h1 className={`text-3xl font-semibold tracking-tight mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Hakan&apos;ın Blogu
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={() => auth.signOut()}
                className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                  theme === 'dark' 
                    ? 'text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Çıkış Yap
              </button>
            ) : (
              <>
                <Link 
                  href="/giris" 
                  className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/uyelik" 
                  className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  Üye Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Ana Menü */}
      <nav className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-8">
              <Link 
                href="/" 
                className={`group relative font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">ANA SAYFA</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </Link>
              <Link 
                href="/?category=Kültür" 
                className={`group relative font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">KÜLTÜR</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </Link>
              <Link 
                href="/?category=Ekonomi" 
                className={`group relative font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">EKONOMİ</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </Link>
              <Link 
                href="/?category=Politika" 
                className={`group relative font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">POLİTİKA</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </Link>
              <Link 
                href="/?category=Bilim" 
                className={`group relative font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">BİLİM</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </Link>
              <Link 
                href="/?category=Teknoloji" 
                className={`group relative font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">TEKNOLOJİ</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </Link>
              <Link 
                href="/hakkimizda" 
                className={`group relative font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">HAKKIMIZDA</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </Link>
              <Link 
                href="/iletisim" 
                className={`group relative font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">İLETİŞİM</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </Link>
            </div>
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`group relative p-2 rounded-full ${
                  theme === 'dark'
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}></span>
              </button>
              {isSearchOpen && (
                <div className={`absolute top-full right-0 mt-2 w-96 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-black border border-gray-800 hover:border-gray-700' 
                    : 'bg-white border border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Blog yazılarında ara..."
                    className={`w-full p-2 rounded-md border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      theme === 'dark'
                        ? 'bg-black border-gray-800 text-white focus:ring-white hover:border-gray-700'
                        : 'bg-white border-gray-200 text-black focus:ring-blue-500 hover:border-gray-300'
                    }`}
                  />
                  <div className="mt-4">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Popüler aramalar:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Teknoloji', 'Ekonomi', 'Bilim', 'Kültür'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
                            theme === 'dark'
                              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Blog Yazıları */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`rounded-lg overflow-hidden border transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                theme === 'dark' 
                  ? 'border-gray-800 hover:bg-gray-900/50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Link href={`/post/${post.slug}`}>
                <div className="p-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-white group-hover:text-blue-400' 
                      : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {post.title}
                  </h2>
                  <p className={`mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className={`px-2 py-1 rounded-full text-xs transition-colors duration-200 ${
                          theme === 'dark'
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <time className={`transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-gray-300' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      {new Date(post.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className={`transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-gray-300' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      {post.readTime} dakika okuma
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className={`relative overflow-hidden rounded-[40px] ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900' 
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}>
          {/* Dekoratif elementler */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/10"></div>
          </div>

          <div className="relative p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>

              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Yeni Yazılardan İlk Siz Haberdar Olun!
              </h2>
              
              <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Her hafta yayınlanan en iyi içeriklerimizi kaçırmak için bültenimize katılın. 
                Spam yok, sadece kaliteli içerik!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className={`flex-1 px-6 py-4 rounded-xl text-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-900/50 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500'
                      : 'bg-white border-gray-200 text-black focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                <button
                  className={`px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  }`}
                >
                  Abone Ol
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Haftalık Bülten
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Özel İçerikler
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Ücretsiz
                  </span>
                </div>
              </div>

              <p className={`mt-6 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                🔒 Gizliliğinize önem veriyoruz. E-posta adresinizi asla paylaşmayacağız.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
