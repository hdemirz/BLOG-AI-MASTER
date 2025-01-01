'use client';
import { useState } from 'react';
import { signIn } from '../utils/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn(email, password);
    
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      if (!result.user.emailVerified) {
        setError('Lütfen önce e-posta adresinizi doğrulayın. Spam klasörünü kontrol etmeyi unutmayın.');
        return;
      }
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e]">
      <div className="max-w-md w-full p-8 relative">
        <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Hesabınıza Giriş Yapın
          </h2>
          <p className="text-gray-400">
            Veya{' '}
            <Link href="/uyelik/kayit" className="text-blue-500 hover:text-blue-400">
              yeni bir hesap oluşturun
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              E-posta Adresi
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              className="mt-1 block w-full px-4 py-3 rounded-lg bg-[#2a2f3e] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-3 rounded-lg bg-[#2a2f3e] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/30 border border-red-800/50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1a1f2e] transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
} 