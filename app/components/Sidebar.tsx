"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/app/components/ThemeProvider";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div>
      {/* Menü Butonu */}
      <button
        onClick={() => setIsOpen(true)}
        className={`p-2 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'hover:bg-gray-800'
            : 'hover:bg-gray-100'
        }`}
        aria-label="Menüyü aç"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Karartma Arka Planı */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menü Paneli */}
      <div
        className={`fixed top-0 left-0 h-full w-80 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        } shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menü Başlığı ve Kapat Butonu */}
        <div className={`flex items-center justify-between p-4 border-b ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Menü
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
            aria-label="Menüyü kapat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menü Linkleri */}
        <nav className="p-4 space-y-2">
          {[
            { href: '/', label: 'Ana Sayfa' },
            { href: '/?category=Kültür', label: 'Kültür' },
            { href: '/?category=Ekonomi', label: 'Ekonomi' },
            { href: '/?category=Politika', label: 'Politika' },
            { href: '/?category=Bilim', label: 'Bilim' },
            { href: '/?category=Teknoloji', label: 'Teknoloji' },
            { href: '/hakkimizda', label: 'Hakkımızda' },
            { href: '/iletisim', label: 'İletişim' },
          ].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
} 