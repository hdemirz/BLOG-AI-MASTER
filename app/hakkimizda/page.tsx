"use client";

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";
import Sidebar from "../components/Sidebar";

export default function About() {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

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

      {/* Hakkımızda İçeriği */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Hakkımızda
        </h1>
        
        <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Merhaba! Ben Hakan, teknoloji, bilim, kültür ve güncel olaylar hakkında düşüncelerimi paylaştığım bu blogu 2024 yılında kurdum. Amacım, ilgi çekici ve bilgilendirici içerikler üreterek, okuyucularıma farklı bakış açıları sunmak.
          </p>
          
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Misyonumuz
          </h2>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Blogumuzun temel misyonu, karmaşık konuları anlaşılır bir dille aktarmak ve okuyucularımıza değer katmak. Teknolojiden sanata, ekonomiden siyasete kadar geniş bir yelpazede, derinlemesine analizler ve özgün içerikler sunuyoruz.
          </p>
          
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Değerlerimiz
          </h2>
          <ul className={`list-disc pl-6 mb-8 text-lg space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Doğruluk ve şeffaflık</li>
            <li>Özgün ve kaliteli içerik</li>
            <li>Okuyucu odaklı yaklaşım</li>
            <li>Sürekli gelişim ve yenilik</li>
          </ul>
          
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            İletişim
          </h2>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Görüş, öneri ve işbirliği teklifleriniz için iletişim sayfamızı kullanabilir veya sosyal medya hesaplarımız üzerinden bize ulaşabilirsiniz.
          </p>
          
          <div className="flex items-center gap-4 mt-8">
            <Link 
              href="/iletisim" 
              className={`px-6 py-3 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 