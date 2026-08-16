import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  title: {
    default: 'Kenakata — কেনাকাটা | Bangladesh\'s Trusted Online Store',
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
  themeColor: '#232A31',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-brand-charcoal antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
