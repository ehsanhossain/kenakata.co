'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, MapPin, ShieldCheck, Heart, LogOut, ChevronRight } from 'lucide-react';

const navItems = [
  { icon: User, label: 'Overview', href: '/account' },
  { icon: Package, label: 'My Orders', href: '/account/orders' },
  { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
  { icon: ShieldCheck, label: 'Profile & Security', href: '/account/profile' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container-page py-6 sm:py-8">
      <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-[140px]">
            {/* Profile summary */}
            <div className="bg-white rounded-xl border border-neutral-100 p-5 mb-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center">
                  <span className="text-white text-lg font-bold">R</span>
                </div>
                <div>
                  <p className="font-semibold text-brand-charcoal">Rahim Ahmed</p>
                  <p className="text-xs text-neutral-500">rahim@email.com</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
              {navItems.map(({ icon: Icon, label, href }) => {
                const isActive = pathname === href || (href !== '/account' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3.5 text-sm border-b border-neutral-50 last:border-0 transition-colors ${
                      isActive
                        ? 'bg-brand-blue-soft text-brand-blue font-medium border-l-3 border-l-brand-blue'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {label}
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-neutral-300" />
                  </Link>
                );
              })}
              <button className="flex items-center gap-3 px-4 py-3.5 text-sm text-semantic-danger hover:bg-semantic-danger-soft w-full transition-colors">
                <LogOut className="w-4.5 h-4.5" /> Log Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
}
