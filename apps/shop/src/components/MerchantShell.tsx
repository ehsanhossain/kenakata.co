'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMerchantAuth } from '../context/MerchantAuthContext';
import {
  LayoutDashboard, ShoppingBag, Package, FileCheck2, CreditCard,
  Settings, ChevronLeft, Menu, Bell, Search, LogOut, ShieldCheck,
  Clock, AlertCircle, Plus, ExternalLink, Sparkles
} from 'lucide-react';

interface MerchantShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function MerchantShell({ children, title, subtitle, actions }: MerchantShellProps) {
  const pathname = usePathname();
  const { merchant, switchDemoMerchant, logout } = useMerchantAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: 'Store Dashboard', href: '/' },
    {
      icon: FileCheck2,
      label: 'KYC & Verification',
      href: '/onboarding',
      badge:
        merchant?.status === 'APPROVED'
          ? 'Verified'
          : merchant?.status === 'UNDER_REVIEW'
          ? 'Under Review'
          : merchant?.status === 'REJECTED'
          ? 'Action Req'
          : 'Pending',
      badgeColor:
        merchant?.status === 'APPROVED'
          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
          : merchant?.status === 'UNDER_REVIEW'
          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          : 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    },
    { icon: ShoppingBag, label: 'Products & Inventory', href: '/products' },
    { icon: Package, label: 'Store Orders', href: '/orders' },
    { icon: CreditCard, label: 'Payouts & Balance', href: '/payouts' },
    { icon: Settings, label: 'Shop Settings', href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 antialiased overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 shrink-0 z-30`}
      >
        {/* Store Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-gradient-to-tr from-brand-emerald to-emerald-400 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <span className="text-slate-950 font-black text-base">S</span>
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <span className="font-bold text-sm text-white tracking-tight block truncate">
                  {merchant?.shop?.name || 'Seller Portal'}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block">Merchant Center</span>
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

        {/* Store Verification Mini Status */}
        {sidebarOpen && merchant && (
          <div className="px-3.5 py-3 border-b border-slate-800/80 bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-semibold text-slate-500">Store Status</span>
              {merchant.status === 'APPROVED' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Live Seller
                </span>
              ) : merchant.status === 'UNDER_REVIEW' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  <Clock className="w-3 h-3 animate-spin" /> In Review
                </span>
              ) : merchant.status === 'REJECTED' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/30">
                  <AlertCircle className="w-3 h-3" /> Action Required
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono">Pending KYC</span>
              )}
            </div>
          </div>
        )}

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
                    ? 'bg-brand-emerald text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/90'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'}`} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {sidebarOpen && item.badge && !isActive && (
                  <span className={`ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Demo Switcher Quick Toolbar */}
        {sidebarOpen && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 space-y-2">
            <p className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">Demo Seller Switch</p>
            <div className="grid grid-cols-3 gap-1 text-[10px] font-semibold">
              <button
                onClick={() => switchDemoMerchant('APPROVED')}
                className={`py-1 rounded border transition-colors ${
                  merchant?.status === 'APPROVED'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Approved Live Shop (Dhaka Tech Hub)"
              >
                Live (DHK)
              </button>
              <button
                onClick={() => switchDemoMerchant('UNDER_REVIEW')}
                className={`py-1 rounded border transition-colors ${
                  merchant?.status === 'UNDER_REVIEW'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Pending KYC Review (Ctg Lifestyle)"
              >
                Review
              </button>
              <button
                onClick={() => switchDemoMerchant('REJECTED')}
                className={`py-1 rounded border transition-colors ${
                  merchant?.status === 'REJECTED'
                    ? 'bg-rose-500 text-white border-rose-400 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Needs Resubmission (Sylhet Tea & Agro)"
              >
                Rejected
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search your products, inventory SKU, orders..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Link
              href="https://kenakata.co"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              <span>View Kenakata Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
            </button>

            {/* Merchant Profile */}
            <div className="flex items-center gap-3 pl-3.5 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-emerald to-emerald-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm">
                {merchant?.name ? merchant.name.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{merchant?.name || 'Store Owner'}</p>
                <p className="text-[10px] text-emerald-400 font-mono truncate max-w-[120px]">
                  {merchant?.shop?.name || 'My Shop'}
                </p>
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

        {/* Page Main Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">{title}</h1>
                {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
