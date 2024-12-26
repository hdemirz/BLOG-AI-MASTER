'use client';

import { useState } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';

export default function Newsletter() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Burada gerçek bir API çağrısı yapılabilir
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className={`p-8 rounded-lg ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <h3 className={`text-2xl font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Yeni Yazılardan Haberdar Olun
      </h3>
      <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        En son blog yazılarımızdan ve güncellemelerimizden haberdar olmak için bültenimize abone olun.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              theme === 'dark'
                ? 'bg-black border-gray-800 text-white focus:ring-white'
                : 'bg-white border-gray-200 text-black focus:ring-blue-500'
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full py-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-white text-black hover:bg-gray-100'
              : 'bg-black text-white hover:bg-gray-800'
          } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {status === 'loading' ? 'Kaydediliyor...' : 'Abone Ol'}
        </button>

        {status === 'success' && (
          <div className={`p-4 rounded-lg ${
            theme === 'dark'
              ? 'bg-green-900/50 border border-green-800 text-green-300'
              : 'bg-green-50 border border-green-200 text-green-800'
          }`}>
            Bültene başarıyla abone oldunuz!
          </div>
        )}

        {status === 'error' && (
          <div className={`p-4 rounded-lg ${
            theme === 'dark'
              ? 'bg-red-900/50 border border-red-800 text-red-300'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            Bir hata oluştu. Lütfen tekrar deneyin.
          </div>
        )}
      </form>
    </div>
  );
} 