'use client';

import { useTheme } from './components/ThemeProvider';

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen bg-white dark:bg-black text-black dark:text-white`}>
      {children}
    </div>
  );
} 