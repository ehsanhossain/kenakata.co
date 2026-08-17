'use client';

import React from 'react';
import Link from 'next/link';
import { AdminShell } from '../components/AdminShell';
import {
  CurrencyDollar, ShoppingCart, Clock, Users, Storefront, CheckSquare, TrendUp, ArrowRight, ShieldCheck, WarningCircle, Package
} from '@phosphor-icons/react';

export default function AdminDashboardPage() {
  const kpiCards = [
    { title: 'Total Platform Revenue', value: '\u09F312,45,800', change: '+14.2%', icon: CurrencyDollar, color: 'text-success bg-success-surface' },
    { title: 'Orders Today', value: '47', change: '+8.5%', icon: ShoppingCart, color: 'text-info bg-info-surface' },
    { title: 'Pending KYC Reviews', value: '1 Storefront', change: 'Ctg Lifestyle', icon: Storefront, color: 'text-warning bg-warning-surface', alert: true },
    { title: 'Registered Customers', value: '2,847', change: '+5.7%', icon: Users, color: 'text-info bg-info-surface' },
  ];

  const recentOrders = [
    { id: 'KK-2026-89412', customer: 'Tanvir Hossain', items: 1, total: '\u09F346,059', status: 'In Transit', color: 'bg-info-surface text-info' },
    { id: 'KK-2026-89411', customer: 'Rahim Ahmed', items: 2, total: '\u09F375,998', status: 'Processing', color: 'bg-warning-surface text-warning' },
    { id: 'KK-2026-89410', customer: 'Fatima Begum', items: 1, total: '\u09F335,000', status: 'Delivered', color: 'bg-success-surface text-success' },
  ];

  return (
    <AdminShell
      title="Kenakata Command Center"
      subtitle="Bangladesh Multi-Vendor E-Commerce Platform HQ"
    >
      {/* Pending KYC Action Banner */}
      <div className="bg-warning-surface border border-warning/20 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center shrink-0">
            <Storefront className="w-6 h-6" weight="fill" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-content-primary text-base">New Merchant KYC Application Received</h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">
                Action Required
              </span>
            </div>
            <p className="text-xs text-content-secondary mt-0.5">
              <strong>Ctg Lifestyle</strong> (Rashedul Karim, Chattogram) submitted Trade License, NID, and Bank Cheque.
            </p>
          </div>
        </div>
        <Link
          href="/merchants/merch-ctg-01"
          className="px-4 py-2 rounded-xl bg-warning hover:opacity-90 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Review Application</span>
          <ArrowRight className="w-4 h-4" weight="bold" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-canvas border border-border rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-content-tertiary uppercase tracking-wider">{kpi.title}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4" weight="bold" />
                </div>
              </div>
              <p className="text-2xl font-bold font-mono text-content-primary">{kpi.value}</p>
              <p className={`text-[11px] font-semibold flex items-center gap-1 ${kpi.alert ? 'text-warning' : 'text-success'}`}>
                {!kpi.alert && <TrendUp className="w-3 h-3" weight="bold" />}
                {kpi.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main GridFour: Orders & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Orders Pipeline */}
        <div className="lg:col-span-2 bg-canvas border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h3 className="font-bold text-base text-content-primary">Recent Orders Fulfillment</h3>
              <p className="text-xs text-content-tertiary">Live order queue from storefront</p>
            </div>
            <Link
              href="/orders"
              className="text-xs text-content-brand hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </Link>
          </div>

          <div className="divide-y divide-border mt-2">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <p className="font-mono font-bold text-content-primary text-xs">{ord.id}</p>
                  <p className="text-[11px] text-content-secondary">{ord.customer} · {ord.items} item</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-content-primary text-xs">{ord.total}</p>
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
          <div className="bg-canvas border border-border rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-sm text-content-primary">Multi-Vendor Portals</h3>
            <div className="space-y-2">
              <Link
                href="/merchants"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle hover:bg-surface-muted border border-border text-xs font-semibold text-content-primary transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Storefront className="w-4 h-4 text-icon-brand" weight="bold" />
                  <span>Merchant KYC Queue</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-warning-surface text-warning font-mono font-bold">
                  1 Review
                </span>
              </Link>
              <Link
                href="/products/approvals"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle hover:bg-surface-muted border border-border text-xs font-semibold text-content-primary transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-icon-brand" weight="bold" />
                  <span>Vendor Product Approvals</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-success-surface text-success font-mono font-bold">
                  2 Pending
                </span>
              </Link>
              <Link
                href="/payouts"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle hover:bg-surface-muted border border-border text-xs font-semibold text-content-primary transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CurrencyDollar className="w-4 h-4 text-icon-brand" weight="bold" />
                  <span>Merchant Payouts</span>
                </div>
                <span className="text-[10px] font-mono text-content-tertiary">{'\u09F3'}35,000</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
