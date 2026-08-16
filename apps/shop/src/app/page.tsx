'use client';

import React from 'react';
import Link from 'next/link';
import { useMerchantAuth } from '../context/MerchantAuthContext';
import { MerchantShell } from '../components/MerchantShell';
import {
  DollarSign, ShoppingCart, Package, TrendingUp, Plus,
  ShieldCheck, AlertCircle, Clock, ArrowRight, Store, Truck,
  CreditCard
} from 'lucide-react';

export default function MerchantDashboardPage() {
  const { merchant } = useMerchantAuth();

  const isApproved = merchant?.status === 'APPROVED';

  const stats = [
    { title: 'Total Store Revenue', value: '৳2,85,000', change: '+18.4%', icon: DollarSign, color: 'text-emerald-400 bg-emerald-500/10' },
    { title: 'Today Orders', value: '7 Orders', change: '৳34,200', icon: ShoppingCart, color: 'text-blue-400 bg-blue-500/10' },
    { title: 'Pending Fulfillment', value: '2 Orders', change: 'Ready for Pathao', icon: Package, color: 'text-amber-400 bg-amber-500/10' },
    { title: 'Available For Payout', value: '৳35,000', change: 'Settled to BRAC Bank', icon: CreditCard, color: 'text-purple-400 bg-purple-500/10' },
  ];

  const recentOrders = [
    { id: 'KK-2026-89412', item: 'Samsung Galaxy A55 5G', customer: 'Tanvir Hossain', price: '৳45,999', status: 'In Transit', color: 'bg-blue-500/20 text-blue-400' },
    { id: 'KK-2026-89411', item: 'Apple AirPods Pro 2', customer: 'Rahim Ahmed', price: '৳26,500', status: 'Ready to Ship', color: 'bg-amber-500/20 text-amber-400' },
  ];

  return (
    <MerchantShell
      title={`Welcome, ${merchant?.shop?.name || 'Seller'}!`}
      subtitle="Overview of your store sales, inventory items, and customer orders"
      actions={
        isApproved ? (
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </Link>
        ) : null
      }
    >
      {/* Pending KYC Notice Banner if not approved */}
      {!isApproved && (
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Store Verification Status: {merchant?.status}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete your business legal entity information and KYC documents to start accepting customer orders.
              </p>
            </div>
          </div>
          <Link
            href="/onboarding"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>View KYC Progress</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.title}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold font-mono text-white">{s.value}</p>
              <p className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {s.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Orders list */}
        <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-base text-white">Recent Customer Orders</h3>
              <p className="text-xs text-slate-400">Manage packing and delivery handovers</p>
            </div>
            <Link href="/orders" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/60 mt-2">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-xs">{ord.item}</p>
                  <p className="text-[11px] text-slate-400">Order: <span className="font-mono text-slate-300">{ord.id}</span> · Customer: {ord.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-white text-xs">{ord.price}</p>
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono mt-0.5 ${ord.color}`}>
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Store Status & Shortcuts */}
        <div className="space-y-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-400" /> Store Profile & Rating
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Store Rating:</span>
                <span className="font-bold text-amber-400">★ 4.9 / 5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Commission Rate:</span>
                <span className="font-mono text-emerald-400 font-bold">5.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Settlement Cycle:</span>
                <span className="text-slate-200">Daily / On-Demand</span>
              </div>
            </div>
            <Link
              href="/products/new"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-emerald-400" /> List New Product
            </Link>
          </div>
        </div>
      </div>
    </MerchantShell>
  );
}
