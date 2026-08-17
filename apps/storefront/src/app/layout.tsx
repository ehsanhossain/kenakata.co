import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kenakata.co'),
  title: {
    default: 'Kenakata - The Best Online Shopping Experience in Bangladesh',
    template: '%s - Kenakata',
  },
  description:
    'Kenakata - The best online shopping experience in Bangladesh. Authentic products, lightning-fast delivery, cash on delivery, and 100% genuine guaranteed.',
  keywords: [
    'e-commerce',
    'Bangladesh',
    'online shopping',
    'Kenakata',
    'কেনাকাটা',
    'অনলাইন শপিং',
    'Dhaka online store',
    'cash on delivery',
    'bKash payment',
  ],
  authors: [{ name: 'Kenakata' }],
  creator: 'Kenakata.co',
  publisher: 'Kenakata',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: 'https://kenakata.co',
    siteName: 'Kenakata',
    title: 'Kenakata - The Best Online Shopping Experience in Bangladesh',
    description:
      'Kenakata - The best online shopping experience in Bangladesh. Authentic products, lightning-fast delivery, cash on delivery, and 100% genuine guaranteed.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kenakata - The Best Online Shopping Experience in Bangladesh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenakata - The Best Online Shopping Experience in Bangladesh',
    description:
      'Kenakata - The best online shopping experience in Bangladesh. Authentic products, lightning-fast delivery, cash on delivery, and 100% genuine guaranteed.',
    images: ['/og-image.png'],
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF4D00',
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
