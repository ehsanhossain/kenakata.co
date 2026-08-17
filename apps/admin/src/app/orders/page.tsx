'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '../../components/AdminShell';
import {
  Package, Truck, Clock, CheckCircle, WarningCircle, MagnifyingGlass, Funnel, ArrowRight, Eye, Phone, MapPin, CurrencyDollar
} from '@phosphor-icons/react';

const mockOrders = [
 {
 id: 'KK-2026-89412',
 customer: 'Tanvir Hossain',
 phone: '+8801712345678',
 location: 'Dhanmondi, Dhaka',
 total: '৳46,059',
 paymentMethod: 'bKash Verified',
 status: 'IN_TRANSIT',
 courier: 'Pathao Express (PTH-892147)',
 itemsCount: 1,
 placedAt: 'Aug 15, 2026',
 },
 {
 id: 'KK-2026-89411',
 customer: 'Rahim Ahmed',
 phone: '+8801700112233',
 location: 'Gulshan, Dhaka',
 total: '৳75,998',
 paymentMethod: 'Cash on Delivery',
 status: 'PROCESSING',
 courier: 'Dhaka Central Hub',
 itemsCount: 2,
 placedAt: 'Aug 15, 2026',
 },
 {
 id: 'KK-2026-89410',
 customer: 'Fatima Begum',
 phone: '+8801811223344',
 location: 'Agrabad, Chattogram',
 total: '৳35,000',
 paymentMethod: 'SSLCommerz (Card)',
 status: 'DELIVERED',
 courier: 'Steadfast Courier',
 itemsCount: 1,
 placedAt: 'Aug 14, 2026',
 },
];

export default function OrdersManagementPage() {
 return (
 <AdminShell
 title="Orders Fulfillment Pipeline"
 subtitle="Track end-to-end customer orders, payment verifications, warehouse picking, and courier handovers"
 >
 <div className="bg-canvas border border-border rounded-2xl overflow-hidden shadow-xl">
 <div className="p-4 border-b border-border flex items-center justify-between">
 <div className="relative w-full max-w-sm">
 <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
 <input
 type="text"
 placeholder="Search order number (e.g. KK-2026-89412), phone..."
 className="w-full pl-10 pr-4 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 <span className="text-xs text-content-tertiary font-mono">3 Active Orders in Pipeline</span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs text-content-secondary">
 <thead className="bg-surface-subtle text-content-tertiary uppercase tracking-wider font-semibold border-b border-border">
 <tr>
 <th className="px-6 py-4">Order ID & Date</th>
 <th className="px-6 py-4">Customer & Location</th>
 <th className="px-6 py-4">Total & Payment</th>
 <th className="px-6 py-4">Fulfillment Status</th>
 <th className="px-6 py-4">Courier / Tracking</th>
 <th className="px-6 py-4 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-800/60">
 {mockOrders.map((ord) => (
 <tr key={ord.id} className="hover:bg-surface-subtle/50 transition-colors">
 <td className="px-6 py-4">
 <p className="font-mono font-bold text-content-primary text-sm">{ord.id}</p>
 <span className="text-[10px] text-content-tertiary">{ord.placedAt} · {ord.itemsCount} item</span>
 </td>
 <td className="px-6 py-4">
 <p className="font-semibold text-content-secondary">{ord.customer}</p>
 <p className="text-[11px] text-content-tertiary font-mono">{ord.phone}</p>
 <p className="text-[11px] text-content-tertiary flex items-center gap-1 mt-0.5">
 <MapPin className="w-3 h-3" /> {ord.location}
 </p>
 </td>
 <td className="px-6 py-4">
 <p className="font-mono font-bold text-content-primary text-sm">{ord.total}</p>
 <span className="text-[10px] font-semibold text-success">{ord.paymentMethod}</span>
 </td>
 <td className="px-6 py-4">
 {ord.status === 'IN_TRANSIT' ? (
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-info-surface text-info border border-blue-500/30">
 <Truck className="w-3 h-3" /> In Transit
 </span>
 ) : ord.status === 'PROCESSING' ? (
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-warning-surface text-warning border border-warning/20">
 <Clock className="w-3 h-3" /> Processing
 </span>
 ) : (
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-success-surface text-success border border-success/20">
 <CheckCircle className="w-3 h-3" /> Delivered
 </span>
 )}
 </td>
 <td className="px-6 py-4 font-mono text-[11px] text-content-tertiary">{ord.courier}</td>
 <td className="px-6 py-4 text-right">
 <Link
 href={`https://kenakata.co/track?orderId=${ord.id}&phone=${encodeURIComponent(ord.phone)}`}
 target="_blank"
 className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-muted hover:bg-surface-muted text-xs font-semibold text-content-primary transition-colors"
 >
 <span>Track</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </AdminShell>
 );
}
