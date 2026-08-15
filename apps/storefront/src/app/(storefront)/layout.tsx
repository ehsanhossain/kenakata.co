import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
