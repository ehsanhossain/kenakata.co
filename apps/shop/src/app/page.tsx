'use client';

import React from 'react';
import Link from 'next/link';
import { useMerchantAuth } from '../context/MerchantAuthContext';
import { MerchantShell } from '../components/MerchantShell';
import {
  CurrencyDollar, ShoppingCart, Package, TrendUp, Plus, ShieldCheck, WarningCircle, Clock, ArrowRight, Storefront, Truck, CreditCard
} from '@phosphor-icons/react';

export default function MerchantDashboardPage() {
  const { merchant } = useMerchantAuth();

  const isApproved = merchant?.status === 'APPROVED';

  const stats = [
    { title: 'Total Storefront Revenue', value: '\u09F32,85,000', change: '+18.4%', icon: CurrencyDollar, color: 'text-success bg-success-surface' },
    { title: 'Today Orders', value: '7 Orders', change: '\u09F334,200', icon: ShoppingCart, color: 'text-info bg-info-surface' },
    { title: 'Pending Fulfillment', value: '2 Orders', change: 'Ready for Pathao', icon: Package, color: 'text-warning bg-warning-surface' },
    { title: 'Available For Payout', value: '\u09F335,000', change: 'Settled to BRAC Bank', icon: CreditCard, color: 'text-info bg-info-surface' },
  ];

  const recentOrders = [
    { id: 'KK-2026-89412', item: 'Samsung Galaxy A55 5G', customer: 'Tanvir Hossain', price: '\u09F345,999', status: 'In Transit', color: 'bg-info-surface text-info' },
    { id: 'KK-2026-89411', item: 'Apple AirPods Pro 2', customer: 'Rahim Ahmed', price: '\u09F326,500', status: 'Ready to Ship', color: 'bg-warning-surface text-warning' },
  ];

  return (
    <MerchantShell
      title={`Welcome, ${merchant?.shop?.name || 'Seller'}!`}
      subtitle="Overview of your store sales, inventory items, and customer orders"
      actions={
        isApproved ? (
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-action-primary text-white font-bold text-xs shadow-sm hover:bg-action-primary-hover transition-all"
          >
            <Plus className="w-4 h-4" weight="bold" /> Add New Product
          </Link>
        ) : null
      }
    >
      {/* Pending KYC Notice Banner if not approved */}
      {!isApproved && (
        <div className="bg-warning-surface border border-warning/20 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center shrink-0">
              <WarningCircle className="w-6 h-6" weight="fill" />
            </div>
            <div>
              <h3 className="font-bold text-content-primary text-base">Storefront Verification Status: {merchant?.status}</h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Complete your business legal entity information and KYC documents to start accepting customer orders.
              </p>
            </div>
          </div>
          <Link
            href="/onboarding"
            className="px-5 py-2.5 rounded-xl bg-warning hover:opacity-90 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>View KYC Progress</span>
            <ArrowRight className="w-4 h-4" weight="bold" />
          </Link>
        </div>
      )}

      {/* KPI Stats GridFour */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-canvas border border-border rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-content-tertiary uppercase tracking-wider">{s.title}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4 h-4" weight="bold" />
                </div>
              </div>
              <p className="text-2xl font-bold font-mono text-content-primary">{s.value}</p>
              <p className="text-[11px] font-semibold text-success flex items-center gap-1">
                <TrendUp className="w-3 h-3" weight="bold" /> {s.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main GridFour: Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Orders list */}
        <div className="lg:col-span-2 bg-canvas border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-content-primary">Recent Customer Orders</h3>
              <p className="text-xs text-content-tertiary">Manage packing and delivery handovers</p>
            </div>
            <Link href="/orders" className="text-xs text-content-brand hover:underline font-semibold flex items-center gap-1">
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </Link>
          </div>

          <div className="divide-y divide-border mt-2">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-content-primary text-xs">{ord.item}</p>
                  <p className="text-[11px] text-content-secondary">Order: <span className="font-mono text-content-primary">{ord.id}</span> · Customer: {ord.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-content-primary text-xs">{ord.price}</p>
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono mt-0.5 ${ord.color}`}>
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Storefront Status & Shortcuts */}
        <div className="space-y-6">
          <div className="bg-canvas border border-border rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-content-primary flex items-center gap-2">
              <Storefront className="w-4 h-4 text-icon-brand" weight="bold" /> Storefront Profile & Rating
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-content-tertiary">Storefront Rating:</span>
                <span className="font-bold text-warning flex items-center gap-0.5">4.9 / 5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-tertiary">Commission Rate:</span>
                <span className="font-mono text-content-brand font-bold">5.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-tertiary">Settlement Cycle:</span>
                <span className="text-content-primary">Daily / On-Demand</span>
              </div>
            </div>
            <Link
              href="/products/new"
              className="w-full py-2.5 rounded-xl bg-surface-subtle hover:bg-surface-muted border border-border text-content-primary font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-icon-brand" weight="bold" /> List New Product
            </Link>
          </div>
        </div>
      </div>
    </MerchantShell>
  );
}
