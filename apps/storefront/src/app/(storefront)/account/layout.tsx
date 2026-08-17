'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User, Package, MapPin, ShieldCheck, Heart, SignOut, CaretRight
} from '@phosphor-icons/react';
import { useAuth } from '../../../context/AuthContext';

const navItems = [
 { icon: User, label: 'Overview', href: '/account' },
 { icon: Package, label: 'My Orders', href: '/account/orders' },
 { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
 { icon: ShieldCheck, label: 'Profile & Security', href: '/account/profile' },
 { icon: Heart, label: 'Wishlist', href: '/wishlist' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
 const pathname = usePathname();
 const { user, logout, openAuthModal } = useAuth();

 return (
 <div className="container-page py-6 sm:py-8">
 <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
 {/* Sidebar */}
 <aside className="lg:col-span-1">
 <div className="sticky top-[140px]">
 {/* Profile summary */}
 <div className="bg-white rounded-xl border border-border p-5 mb-4 shadow-sm">
 <div className="flex items-center gap-3 mb-2">
 <div className="w-12 h-12 rounded-full bg-action-primary flex items-center justify-center">
 <span className="text-content-primary text-lg font-bold">
 {user?.name ? user.name.charAt(0).toUpperCase() : 'K'}
 </span>
 </div>
 <div className="min-w-0">
 <p className="font-semibold text-content-primary truncate">{user?.name || 'Kenakata Member'}</p>
 <p className="text-xs text-content-tertiary truncate">{user?.phone || user?.email || 'Logged In'}</p>
 </div>
 </div>
 </div>

 {/* Nav */}
 <nav className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
 {navItems.map(({ icon: Icon, label, href }) => {
 const isActive = pathname === href || (href !== '/account' && pathname.startsWith(href));
 return (
 <Link
 key={href}
 href={href}
 className={`flex items-center gap-3 px-4 py-3.5 text-sm border-b border-neutral-50 last:border-0 transition-colors ${
 isActive
 ? 'bg-surface-brand-subtle text-content-brand font-medium border-l-3 border-l-brand-blue'
 : 'text-content-secondary hover:bg-surface-subtle'
 }`}
 >
 <Icon className="w-4.5 h-4.5" />
 {label}
 <CaretRight className="w-3.5 h-3.5 ml-auto text-content-tertiary" />
 </Link>
 );
 })}
 {user ? (
 <button
 onClick={() => logout()}
 className="flex items-center gap-3 px-4 py-3.5 text-sm text-danger hover:bg-danger-soft w-full transition-colors font-medium text-left"
 >
 <SignOut className="w-4.5 h-4.5" /> Log Out
 </button>
 ) : (
 <button
 onClick={() => openAuthModal('login')}
 className="flex items-center gap-3 px-4 py-3.5 text-sm text-content-brand hover:bg-surface-brand-subtle w-full transition-colors font-medium text-left"
 >
 <User className="w-4.5 h-4.5" /> Sign In
 </button>
 )}
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
