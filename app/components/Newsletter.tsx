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
    console.log('Form gönderiliyor...', email);
    
    try {
      // Firestore'a kaydet
      const docRef = await addDoc(collection(db, 'subscribers'), {
        email: email,
        date: new Date().toISOString()
      });

      console.log('Kayıt başarılı, ID:', docRef.id);
      setMessage('Başarıyla abone oldunuz!');
      setStatus('success');
      setEmail('');
      
    } catch (error) {
      console.error('Hata:', error);
      setMessage('Bir hata oluştu, lütfen tekrar deneyin.');
      setStatus('error');
    }
  };

  return (
    <div className="p-8 rounded-lg bg-gray-100 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Bültene Abone Olun
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          className="w-full p-2 border rounded"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Gönderiliyor...' : 'Abone Ol'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-2 rounded ${
          status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
} 