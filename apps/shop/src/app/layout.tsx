import type { Metadata } from 'next';
import './globals.css';
import { MerchantAuthProvider } from '../context/MerchantAuthContext';

export const metadata: Metadata = {
  title: 'Kenakata Merchant Center · Local Storefront Owner Portal',
  description: 'Register your shop, upload KYC documents, list products, and manage sales on Kenakata.co',
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
