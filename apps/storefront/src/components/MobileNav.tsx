'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Search, ShoppingCart, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: LayoutGrid, label: 'Categories', href: '/categories/electronics' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: ShoppingCart, label: 'Cart', href: '/cart', badge: 3 },
  { icon: User, label: 'Account', href: '/account' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 lg:hidden safe-bottom">
      <div className="flex items-center justify-around h-14">
        {navItems.map(({ icon: Icon, label, href, badge }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              className={`relative flex flex-col items-center justify-center gap-0.5 w-16 h-full
                          transition-colors duration-fast ${
                isActive
                  ? 'text-brand-blue'
                  : 'text-neutral-500 hover:text-brand-charcoal'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {badge && (
                  <span className="absolute -top-1.5 -right-2 bg-brand-blue text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-blue rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
