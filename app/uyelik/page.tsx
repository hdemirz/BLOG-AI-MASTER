'use client';

import { useState } from 'react';
import { signUp } from '../utils/auth';
import { useRouter } from 'next/navigation';
import { logUserInteraction } from '../utils/analytics';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Şifre en az 8 karakter uzunluğunda olmalıdır';
    }
    if (!hasUpperCase) {
      return 'Şifre en az bir büyük harf içermelidir';
    }
    if (!hasLowerCase) {
      return 'Şifre en az bir küçük harf içermelidir';
    }
    if (!hasNumbers) {
      return 'Şifre en az bir rakam içermelidir';
    }
    if (!hasSpecialChar) {
      return 'Şifre en az bir özel karakter içermelidir (!@#$%^&*(),.?":{}|<>)';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Şifre kontrolü
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    // Şifre validasyonu
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const { user, error: signUpError } = await signUp(email, password);
      
      if (signUpError) {
        throw new Error(signUpError);
      }

      if (user) {
        setSuccess('Hesabınız başarıyla oluşturuldu! Yönlendiriliyorsunuz...');
        logUserInteraction('register_success', 'auth', email);
        
        // 2 saniye bekleyip ana sayfaya yönlendir
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Kayıt olurken bir hata oluştu';
      setError(errorMessage);
      logUserInteraction('register_error', 'auth', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Yeni Hesap Oluştur
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-posta Adresi
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-posta Adresi"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Şifre"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Şifre Tekrar
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Şifre Tekrar"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm text-center">
              {success}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Kaydediliyor...' : 'Hesap Oluştur'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          <h3 className="font-medium mb-2">Şifre Gereksinimleri:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>En az 8 karakter uzunluğunda</li>
            <li>En az bir büyük harf</li>
            <li>En az bir küçük harf</li>
            <li>En az bir rakam</li>
            <li>En az bir özel karakter (!@#$%^&*(),.?":{}|<>)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 