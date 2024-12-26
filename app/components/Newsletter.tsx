'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Newsletter() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // E-posta formatını kontrol et
      if (!email.includes('@')) {
        throw new Error('Geçerli bir e-posta adresi giriniz');
      }

      // Firestore'a kaydet
      await addDoc(collection(db, 'subscribers'), {
        email,
        subscribedAt: new Date().toISOString(),
      });

      setStatus('success');
      setMessage('Başarıyla abone oldunuz!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Yeni Yazılardan Haberdar Olun
          </h2>
          <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            En son blog yazılarımızdan ve güncellemelerimizden haberdar olmak için abone olun.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
          <div className="min-w-0 flex-1 max-w-lg mx-auto sm:mx-0">
            <label htmlFor="email" className="sr-only">
              E-posta Adresi
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full rounded-lg px-5 py-3 text-base ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                  : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
              } shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="E-posta adresinizi girin"
              required
              disabled={status === 'loading'}
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`block w-full sm:w-auto rounded-lg px-5 py-3 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              } text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {status === 'loading' ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Abone olunuyor...
                </div>
              ) : (
                'Abone Ol'
              )}
            </button>
          </div>
        </form>
        {message && (
          <div className={`mt-4 text-sm text-center ${
            status === 'success' 
              ? 'text-green-500 bg-green-50 border border-green-200' 
              : 'text-red-500 bg-red-50 border border-red-200'
          } p-3 rounded-lg max-w-lg mx-auto`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
} 