import type { Metadata } from 'next';
import './globals.css';
import { AdminProviders } from '../components/AdminProviders';

export const metadata: Metadata = {
  title: { default: 'Kenakata Admin', template: '%s | Kenakata Admin' },
  description: 'Kenakata Operations Dashboard',
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
