import { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Üye Ol - Blog AI',
  description: 'Yeni hesap oluşturarak blog yazılarına erişebilirsiniz.',
};

export default function UyelikPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
} 