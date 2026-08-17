import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  title: {
    default: 'Kenakata — কেনাকাটা | Bangladesh\'s Trusted Online Storefront',
    template: '%s | Kenakata',
  },
  description: 'Find it quickly, understand exactly what you are buying, pay your way, and always know what happens next. Bangladesh\'s trusted multi-category online store.',
  keywords: ['e-commerce', 'Bangladesh', 'online shopping', 'কেনাকাটা', 'অনলাইন শপিং'],
  authors: [{ name: 'Kenakata' }],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    siteName: 'Kenakata',
    title: 'Kenakata — কেনাকাটা',
    description: 'Bangladesh\'s trusted multi-category online store.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-canvas text-content-primary antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
