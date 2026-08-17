'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House, GridFour, MagnifyingGlass, ShoppingCart, User
} from '@phosphor-icons/react';

const navItems = [
 { icon: House, label: 'House', href: '/' },
 { icon: GridFour, label: 'Categories', href: '/categories/electronics' },
 { icon: MagnifyingGlass, label: 'MagnifyingGlass', href: '/search' },
 { icon: ShoppingCart, label: 'Cart', href: '/cart', badge: 3 },
 { icon: User, label: 'Account', href: '/account' },
];

export default function MobileNav() {
 const pathname = usePathname();

 return (
 <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border lg:hidden safe-bottom">
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
 ? 'text-content-brand'
 : 'text-content-tertiary hover:text-content-primary'
 }`}
 >
 <div className="relative">
 <Icon className="w-5 h-5" />
 {badge && (
 <span className="absolute -top-1.5 -right-2 bg-action-primary text-content-primary text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
 {badge}
 </span>
 )}
 </div>
 <span className={`text-[10px] leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
 {label}
 </span>
 {isActive && (
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-action-primary rounded-full" />
 )}
 </Link>
 );
 })}
 </div>
 </nav>
 );
}
