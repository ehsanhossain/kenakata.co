'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '../../components/AdminShell';
import {
  Package, Truck, Clock, CheckCircle2, AlertCircle,
  Search, Filter, ArrowRight, Eye, Phone, MapPin, DollarSign
} from 'lucide-react';

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
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search order number (e.g. KK-2026-89412), phone..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">3 Active Orders in Pipeline</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
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
                <tr key={ord.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono font-bold text-white text-sm">{ord.id}</p>
                    <span className="text-[10px] text-slate-500">{ord.placedAt} · {ord.itemsCount} item</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-200">{ord.customer}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{ord.phone}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {ord.location}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-mono font-bold text-white text-sm">{ord.total}</p>
                    <span className="text-[10px] font-semibold text-emerald-400">{ord.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4">
                    {ord.status === 'IN_TRANSIT' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <Truck className="w-3 h-3" /> In Transit
                      </span>
                    ) : ord.status === 'PROCESSING' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Clock className="w-3 h-3" /> Processing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Delivered
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-400">{ord.courier}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`https://kenakata.co/track?orderId=${ord.id}&phone=${encodeURIComponent(ord.phone)}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
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
