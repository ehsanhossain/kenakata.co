'use client';

import React from 'react';
import Link from 'next/link';
import { AdminShell } from '../components/AdminShell';
import {
  DollarSign, ShoppingCart, Clock, Users, Store, CheckSquare,
  TrendingUp, ArrowRight, ShieldCheck, AlertCircle, Package
} from 'lucide-react';

export default function AdminDashboardPage() {
  const kpiCards = [
    { title: 'Total Platform Revenue', value: '৳12,45,800', change: '+14.2%', icon: DollarSign, color: 'text-emerald-400 bg-emerald-500/10' },
    { title: 'Orders Today', value: '47', change: '+8.5%', icon: ShoppingCart, color: 'text-blue-400 bg-blue-500/10' },
    { title: 'Pending KYC Reviews', value: '1 Store', change: 'Ctg Lifestyle', icon: Store, color: 'text-amber-400 bg-amber-500/10', alert: true },
    { title: 'Registered Customers', value: '2,847', change: '+5.7%', icon: Users, color: 'text-purple-400 bg-purple-500/10' },
  ];

  const recentOrders = [
    { id: 'KK-2026-89412', customer: 'Tanvir Hossain', items: 1, total: '৳46,059', status: 'In Transit', color: 'bg-blue-500/20 text-blue-400' },
    { id: 'KK-2026-89411', customer: 'Rahim Ahmed', items: 2, total: '৳75,998', status: 'Processing', color: 'bg-amber-500/20 text-amber-400' },
    { id: 'KK-2026-89410', customer: 'Fatima Begum', items: 1, total: '৳35,000', status: 'Delivered', color: 'bg-emerald-500/20 text-emerald-400' },
  ];

  return (
    <AdminShell
      title="Kenakata Command Center"
      subtitle="Bangladesh Multi-Vendor E-Commerce Platform HQ · Live Operations"
    >
      {/* Pending KYC Action Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">New Merchant KYC Application Received</h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              <strong>Ctg Lifestyle</strong> (Rashedul Karim, Chattogram) submitted Trade License, NID, and Bank Cheque.
            </p>
          </div>
        </div>
        <Link
          href="/merchants/merch-ctg-01"
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Review Application</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold font-mono text-white">{kpi.value}</p>
              <p className={`text-[11px] font-semibold flex items-center gap-1 ${kpi.alert ? 'text-amber-400' : 'text-emerald-400'}`}>
                {!kpi.alert && <TrendingUp className="w-3 h-3" />}
                {kpi.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Orders & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Orders Pipeline */}
        <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-base text-white">Recent Orders Fulfillment</h3>
              <p className="text-xs text-slate-400">Live order queue from storefront</p>
            </div>
            <Link
              href="/orders"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/60 mt-2">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-mono font-bold text-white text-xs">{ord.id}</p>
                  <p className="text-[11px] text-slate-400">{ord.customer} · {ord.items} item</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-white text-xs">{ord.total}</p>
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono mt-0.5 ${ord.color}`}>
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Links & Infrastructure */}
        <div className="space-y-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-sm text-white">Multi-Vendor Portals</h3>
            <div className="space-y-2">
              <Link
                href="/merchants"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Store className="w-4 h-4 text-emerald-400" />
                  <span>Merchant KYC Queue</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono font-bold">
                  1 Review
                </span>
              </Link>
              <Link
                href="/products/approvals"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  <span>Vendor Product Approvals</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  2 Pending
                </span>
              </Link>
              <Link
                href="/payouts"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Merchant Payouts</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">৳35,000</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
