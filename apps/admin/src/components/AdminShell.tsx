'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard, Store, CheckSquare, ShoppingBag, Package,
  Warehouse, Users, CreditCard, BarChart3, Settings, ChevronLeft,
  Menu, Bell, Search, LogOut, ShieldCheck
} from 'lucide-react';

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
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Store, label: 'Merchants & KYC', href: '/merchants', badge: '1 Review' },
    { icon: CheckSquare, label: 'Product Approvals', href: '/products/approvals' },
    { icon: ShoppingBag, label: 'Products Catalog', href: '/products' },
    { icon: Package, label: 'Orders Fulfillment', href: '/orders' },
    { icon: Warehouse, label: 'Inventory & Hubs', href: '/inventory' },
    { icon: Users, label: 'Customers', href: '/customers' },
    { icon: CreditCard, label: 'Payouts & Ledger', href: '/payouts' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 antialiased overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 shrink-0 z-30`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-gradient-to-tr from-brand-emerald to-emerald-400 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <span className="text-slate-950 font-black text-base">K</span>
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <span className="font-bold text-sm text-white tracking-tight block truncate">Kenakata Base</span>
                <span className="text-[10px] text-emerald-400 font-mono block">Enterprise HQ</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2.5 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                  isActive
                    ? 'bg-brand-emerald text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/90'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'}`} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {sidebarOpen && item.badge && !isActive && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Server & Cluster Health */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-slate-300 leading-none truncate">VPS Hetzner 91.98.166.101</p>
                <p className="text-[9px] text-slate-500 font-mono mt-0.5">DB: kenakata_db (Supabase)</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
          {/* Search bar */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search shops, orders, products, KYC trade license..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3.5">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 pl-3.5 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-emerald to-emerald-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm">
                {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{admin?.name || 'Administrator'}</p>
                <p className="text-[10px] text-emerald-400 font-mono uppercase">{admin?.role || 'SUPER_ADMIN'}</p>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors ml-1"
              >
                <LogOut className="w-4 h-4" />
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
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">{title}</h1>
                {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
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
