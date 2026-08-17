import type { Metadata } from 'next';
import './globals.css';
import { MerchantAuthProvider } from '../context/MerchantAuthContext';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SHOP_URL || 'https://shop.kenakata.co'),
  title: 'Kenakata Merchant Center - Local Store Owner Portal',
  description: 'Register your shop, upload KYC documents, list products, and manage sales on Kenakata.co',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Kenakata Merchant Center - Local Store Owner Portal',
    description: 'Register your shop, upload KYC documents, list products, and manage sales on Kenakata.co',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body className="bg-canvas text-content-primary min-h-screen">
        <MerchantAuthProvider>{children}</MerchantAuthProvider>
      </body>
    </html>
  );
}
