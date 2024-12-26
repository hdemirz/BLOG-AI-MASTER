'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className={`h-full transition-all duration-300 ${
          theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 