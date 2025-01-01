'use client';

import { useState } from 'react';
import { signUp, sendVerificationEmail } from '../utils/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    const result = await signUp(email, password);
    
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      const verificationResult = await sendVerificationEmail(result.user);
      if (verificationResult.success) {
        setSuccess('Kayıt başarılı! ' + verificationResult.message);
        setIsVerificationSent(true);
      } else {
        setError(verificationResult.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#1a1f2e]">
      {/* Sol taraf - Görsel Bölüm */}
      <div className="hidden md:flex md:flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white space-y-6 max-w-xl">
            <h1 className="text-4xl font-bold">Hoş Geldiniz!</h1>
            <p className="text-lg opacity-90">
              Teknoloji, bilim ve daha fazlası hakkında güncel içeriklere erişmek için üye olun.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Güvenli Giriş</h3>
                  <p className="text-sm opacity-75">Verileriniz güvende</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Hızlı Erişim</h3>
                  <p className="text-sm opacity-75">Anında içeriklere ulaşın</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ taraf - Form Bölümü */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Çarpı İkonu */}
        <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Yeni Hesap Oluşturun
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Veya{' '}
              <Link href="/uyelik/giris" className="text-blue-500 hover:text-blue-400">
                mevcut hesabınızla giriş yapın
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  E-posta
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 block w-full px-4 py-3 rounded-lg bg-[#2a2f3e] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/30 border border-red-800/50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-400 text-sm bg-green-900/30 border border-green-800/50 p-3 rounded-lg">
                {success}
              </div>
            )}

            {isVerificationSent && (
              <div className="text-blue-400 text-sm bg-blue-900/30 border border-blue-800/50 p-3 rounded-lg">
                E-posta adresinizi doğrulamadan giriş yapamazsınız. Spam klasörünü kontrol etmeyi unutmayın.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Hesap Oluştur
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-400 bg-[#2a2f3e] p-4 rounded-lg border border-gray-700">
            <p className="font-medium mb-2">Şifre gereksinimleri:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>En az 6 karakter uzunluğunda olmalı</li>
              <li>En az bir büyük harf içermeli</li>
              <li>En az bir küçük harf içermeli</li>
              <li>En az bir rakam içermeli</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 