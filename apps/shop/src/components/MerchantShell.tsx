'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMerchantAuth } from '../context/MerchantAuthContext';
import {
  SquaresFour, ShoppingBag, Package, FileText, CreditCard, GearSix, CaretLeft, List, Bell, MagnifyingGlass, SignOut, ShieldCheck, Clock, WarningCircle, Plus, ArrowSquareOut, Sparkle
} from '@phosphor-icons/react';

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
    { icon: SquaresFour, label: 'Storefront Dashboard', href: '/' },
    {
      icon: FileText,
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
          ? 'bg-success-surface text-success border-success/20'
          : merchant?.status === 'UNDER_REVIEW'
          ? 'bg-warning-surface text-warning border-warning/20'
          : 'bg-danger-surface text-danger border-danger/20',
    },
    { icon: ShoppingBag, label: 'Products & Inventory', href: '/products' },
    { icon: Package, label: 'Storefront Orders', href: '/orders' },
    { icon: CreditCard, label: 'Payouts & Balance', href: '/payouts' },
    { icon: GearSix, label: 'Shop GearSix', href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-surface-subtle text-content-primary antialiased overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-canvas border-r border-border flex flex-col transition-all duration-300 shrink-0 z-30`}
      >
        {/* Storefront Brand / Logo */}
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
              <span className="text-[10px] text-content-brand font-semibold tracking-wider uppercase">Shop</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-content-tertiary hover:text-content-primary hover:bg-surface-subtle rounded-lg transition-colors"
          >
            {sidebarOpen ? <CaretLeft className="w-4 h-4" weight="bold" /> : <List className="w-4 h-4" weight="bold" />}
          </button>
        </div>

        {/* Storefront Verification Mini Status */}
        {sidebarOpen && merchant && (
          <div className="px-3.5 py-3 border-b border-border bg-surface-subtle">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-semibold text-content-tertiary">Storefront Status</span>
              {merchant.status === 'APPROVED' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success bg-success-surface px-2 py-0.5 rounded-full border border-success/20">
                  <ShieldCheck className="w-3 h-3" weight="fill" /> Live Seller
                </span>
              ) : merchant.status === 'UNDER_REVIEW' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-warning bg-warning-surface px-2 py-0.5 rounded-full border border-warning/20">
                  <Clock className="w-3 h-3" weight="bold" /> In Review
                </span>
              ) : merchant.status === 'REJECTED' ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-danger bg-danger-surface px-2 py-0.5 rounded-full border border-danger/20">
                  <WarningCircle className="w-3 h-3" weight="fill" /> Action Required
                </span>
              ) : (
                <span className="text-[10px] text-content-tertiary font-mono">Pending KYC</span>
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
                    ? 'bg-action-primary text-white shadow-md'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-subtle'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-content-tertiary group-hover:text-content-primary'}`} weight={isActive ? 'fill' : 'regular'} />
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
          <div className="p-3 border-t border-border space-y-2">
            <p className="text-[10px] font-semibold uppercase text-content-tertiary tracking-wider">Demo Seller Switch</p>
            <div className="grid grid-cols-3 gap-1 text-[10px] font-semibold">
              <button
                onClick={() => switchDemoMerchant('APPROVED')}
                className={`py-1 rounded border transition-colors ${
                  merchant?.status === 'APPROVED'
                    ? 'bg-success text-white border-success font-bold'
                    : 'bg-surface-subtle text-content-tertiary border-border hover:text-content-primary'
                }`}
                title="Approved Live Shop (Dhaka Tech Hub)"
              >
                Live (DHK)
              </button>
              <button
                onClick={() => switchDemoMerchant('UNDER_REVIEW')}
                className={`py-1 rounded border transition-colors ${
                  merchant?.status === 'UNDER_REVIEW'
                    ? 'bg-warning text-white border-warning font-bold'
                    : 'bg-surface-subtle text-content-tertiary border-border hover:text-content-primary'
                }`}
                title="Pending KYC Review (Ctg Lifestyle)"
              >
                Review
              </button>
              <button
                onClick={() => switchDemoMerchant('REJECTED')}
                className={`py-1 rounded border transition-colors ${
                  merchant?.status === 'REJECTED'
                    ? 'bg-danger text-white border-danger font-bold'
                    : 'bg-surface-subtle text-content-tertiary border-border hover:text-content-primary'
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
      <div className="flex-1 flex flex-col min-w-0 bg-surface-subtle overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-canvas/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
              <input
                type="text"
                placeholder="Search your products, inventory SKU, orders..."
                className="w-full pl-10 pr-4 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-action-primary/20 focus:border-action-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Link
              href="https://kenakata.co"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-subtle hover:bg-surface-muted border border-border text-xs font-semibold text-content-secondary transition-colors"
            >
              <span>View Kenakata Storefront</span>
              <ArrowSquareOut className="w-3.5 h-3.5" />
            </Link>

            <button className="relative p-2 text-content-tertiary hover:text-content-primary hover:bg-surface-subtle rounded-xl transition-colors">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-action-primary rounded-full" />
            </button>

            {/* Merchant Profile */}
            <div className="flex items-center gap-3 pl-3.5 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-action-primary text-white font-bold flex items-center justify-center text-xs shadow-sm">
                {merchant?.name ? merchant.name.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-content-primary leading-tight">{merchant?.name || 'Storefront Owner'}</p>
                <p className="text-[10px] text-content-brand font-mono truncate max-w-[120px]">
                  {merchant?.shop?.name || 'My Shop'}
                </p>
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

        {/* Page Main Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">{title}</h1>
                {subtitle && <p className="text-xs sm:text-sm text-content-secondary mt-1">{subtitle}</p>}
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
