'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  SquaresFour, Storefront, CheckSquare, ShoppingBag, Package, Warehouse, Users, CreditCard, ChartBar, GearSix, CaretLeft, List, Bell, MagnifyingGlass, SignOut, ShieldCheck
} from '@phosphor-icons/react';

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AdminShell({ children, title, subtitle, actions }: AdminShellProps) {
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: SquaresFour, label: 'Dashboard', href: '/' },
    { icon: Storefront, label: 'Merchants & KYC', href: '/merchants', badge: '1 Review' },
    { icon: CheckSquare, label: 'Product Approvals', href: '/products/approvals' },
    { icon: ShoppingBag, label: 'Products Catalog', href: '/products' },
    { icon: Package, label: 'Orders Fulfillment', href: '/orders' },
    { icon: Warehouse, label: 'Inventory & Hubs', href: '/inventory' },
    { icon: Users, label: 'Customers', href: '/customers' },
    { icon: CreditCard, label: 'Payouts & Ledger', href: '/payouts' },
    { icon: ChartBar, label: 'Analytics', href: '/analytics' },
    { icon: GearSix, label: 'GearSix', href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-surface-subtle text-content-primary antialiased overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-canvas border-r border-border flex flex-col transition-all duration-300 shrink-0 z-30`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src="/logo.svg"
              alt="Kenakata"
              width={sidebarOpen ? 110 : 32}
              height={28}
              className={`${sidebarOpen ? 'h-7' : 'h-6'} w-auto`}
            />
            {sidebarOpen && (
              <span className="text-[10px] text-content-brand font-semibold tracking-wider uppercase">Admin</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-content-tertiary hover:text-content-primary hover:bg-surface-subtle rounded-lg transition-colors"
          >
            {sidebarOpen ? <CaretLeft className="w-4 h-4" weight="bold" /> : <List className="w-4 h-4" weight="bold" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2.5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                  isActive
                    ? 'bg-action-primary text-white shadow-md'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-subtle'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-content-tertiary group-hover:text-content-primary'}`} weight={isActive ? 'fill' : 'regular'} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {sidebarOpen && item.badge && !isActive && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-warning-surface text-warning border border-warning/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Server & Cluster Health */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-surface-subtle border border-border">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-content-primary leading-none truncate">VPS Hetzner 91.98.166.101</p>
                <p className="text-[9px] text-content-tertiary font-mono mt-0.5">DB: kenakata_db (Supabase)</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface-subtle overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-canvas/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 shrink-0 z-20">
          {/* MagnifyingGlass bar */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
              <input
                type="text"
                placeholder="Search shops, orders, products, KYC trade license..."
                className="w-full pl-10 pr-4 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-action-primary/20 focus:border-action-primary transition-all"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3.5">
            <button className="relative p-2 text-content-tertiary hover:text-content-primary hover:bg-surface-subtle rounded-xl transition-colors">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-action-primary rounded-full" />
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 pl-3.5 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-action-primary text-white font-bold flex items-center justify-center text-xs shadow-sm">
                {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-content-primary leading-tight">{admin?.name || 'Administrator'}</p>
                <p className="text-[10px] text-content-brand font-mono uppercase">{admin?.role || 'SUPER_ADMIN'}</p>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 text-content-tertiary hover:text-danger hover:bg-danger-surface rounded-xl transition-colors ml-1"
              >
                <SignOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">{title}</h1>
                {subtitle && <p className="text-xs sm:text-sm text-content-secondary mt-1">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>

            {/* Children content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
