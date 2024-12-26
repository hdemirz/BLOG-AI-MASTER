import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import LayoutClient from './layout-client';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Hakan\'ın Blogu',
    default: 'Hakan\'ın Blogu',
  },
  description: 'Teknoloji, bilim ve kültür üzerine yazılar',
  keywords: 'blog, teknoloji, bilim, kültür, yazılım, programlama',
  authors: [{ name: 'Hakan Demir' }],
  creator: 'Hakan Demir',
  publisher: 'Hakan Demir',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://blog-ai-hdemirz.vercel.app',
    siteName: 'Hakan\'ın Blogu',
    title: 'Hakan\'ın Blogu',
    description: 'Teknoloji, bilim ve kültür üzerine yazılar',
    images: [
      {
        url: 'https://blog-ai-hdemirz.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hakan\'ın Blogu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hakan\'ın Blogu',
    description: 'Teknoloji, bilim ve kültür üzerine yazılar',
    creator: '@hdemirz',
    images: ['https://blog-ai-hdemirz.vercel.app/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LayoutClient>{children}</LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
