import type { Metadata } from 'next';
import './globals.css';
import { MerchantAuthProvider } from '../context/MerchantAuthContext';

export const metadata: Metadata = {
  title: 'Kenakata Merchant Center · Local Store Owner Portal',
  description: 'Register your shop, upload KYC documents, list products, and manage sales on Kenakata.co',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-900 text-slate-100 min-h-screen">
        <MerchantAuthProvider>{children}</MerchantAuthProvider>
      </body>
    </html>
  );
}
