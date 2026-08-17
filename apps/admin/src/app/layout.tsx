import type { Metadata } from 'next';
import './globals.css';
import { AdminProviders } from '../components/AdminProviders';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_ADMIN_URL || 'https://base.kenakata.co'),
  title: { default: 'Kenakata Admin - Command Center', template: '%s - Kenakata Admin' },
  description: 'Kenakata Operations Command Center and Platform Administration',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Kenakata Admin - Command Center',
    description: 'Kenakata Operations Command Center and Platform Administration',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-canvas text-content-primary antialiased">
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}
