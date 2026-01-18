import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import ToastProvider from './components/ToastProvider';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://mykekere.com'),
  title: {
    default: 'Kekere - Nigerian Parenting Community Forum',
    template: '%s | Kekere'
  },
  description: 'Join thousands of Nigerian parents sharing parenting tips, asking questions, and supporting each other. Discuss pregnancy, sleep, feeding, development, health, and more.',
  keywords: ['Nigerian parents', 'parenting forum', 'parenting community', 'Nigeria', 'baby care', 'child development', 'parenting advice', 'pregnancy', 'motherhood', 'fatherhood'],
  authors: [{ name: 'Kekere' }],
  creator: 'Kekere',
  publisher: 'Kekere',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://mykekere.com',
    siteName: 'Kekere',
    title: 'Kekere - Nigerian Parenting Community Forum',
    description: 'Join thousands of Nigerian parents sharing parenting tips and experiences.',
    images: [
      {
        url: '/images/hero-family.jpg',
        width: 1200,
        height: 630,
        alt: 'Kekere - Nigerian Parenting Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kekere - Nigerian Parenting Community Forum',
    description: 'Join thousands of Nigerian parents sharing parenting tips and experiences.',
    images: ['/images/hero-family.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8B9D83" />
      </head>
      <body className="antialiased">
        <ToastProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}