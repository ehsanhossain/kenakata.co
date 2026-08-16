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
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}
