'use client';

import React, { useState } from 'react';
import { MerchantShell } from '../../components/MerchantShell';
import {
  Package, Truck, CheckCircle, Clock, MapPin, MagnifyingGlass
} from '@phosphor-icons/react';

const mockShopOrders = [
 {
 id: 'KK-2026-89412',
 customer: 'Tanvir Hossain',
 phone: '+8801712345678',
 item: 'Samsung Galaxy A55 5G (8GB/128GB)',
 amount: '৳45,999',
 destination: 'Dhanmondi, Dhaka',
 status: 'IN_TRANSIT',
 courier: 'Pathao Courier (PTH-892147)',
 date: 'Aug 15, 2026',
 },
 {
 id: 'KK-2026-89411',
 customer: 'Rahim Ahmed',
 phone: '+8801700112233',
 item: 'Apple AirPods Pro 2',
 amount: '৳26,500',
 destination: 'Gulshan, Dhaka',
 status: 'READY_TO_SHIP',
 courier: 'Dhaka Central Hub Handover',
 date: 'Aug 16, 2026 (Today)',
 },
];

export default function MerchantOrdersPage() {
 const [orders, setOrders] = useState(mockShopOrders);

 const handleHandoverCourier = (id: string) => {
 setOrders((prev) =>
 prev.map((o) =>
 o.id === id ? { ...o, status: 'IN_TRANSIT', courier: 'Pathao Courier (PTH-992415)' } : o
 )
 );
 };

 return (
 <MerchantShell
 title="Storefront Orders & Dispatch Handover"
 subtitle="Fulfill customer orders, print shipping labels, and dispatch via Pathao or Steadfast courier"
 >
 <div className="bg-canvas border border-border rounded-2xl overflow-hidden shadow-xl">
 <div className="p-4 border-b border-border flex items-center justify-between">
 <div className="relative w-full max-w-sm">
 <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
 <input
 type="text"
 placeholder="Search order number, phone..."
 className="w-full pl-10 pr-4 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 <span className="text-xs text-content-tertiary font-mono">2 Active Orders</span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs text-content-secondary">
 <thead className="bg-surface-subtle text-content-tertiary uppercase tracking-wider font-semibold border-b border-border">
 <tr>
 <th className="px-6 py-4">Order ID & Date</th>
 <th className="px-6 py-4">Product Purchased</th>
 <th className="px-6 py-4">Customer & Address</th>
 <th className="px-6 py-4">Order Amount</th>
 <th className="px-6 py-4">Status</th>
 <th className="px-6 py-4 text-right">Dispatch Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-800/60">
 {orders.map((ord) => (
 <tr key={ord.id} className="hover:bg-surface-subtle/50 transition-colors">
 <td className="px-6 py-4">
 <p className="font-mono font-bold text-content-primary text-sm">{ord.id}</p>
 <span className="text-[10px] text-content-tertiary">{ord.date}</span>
 </td>
 <td className="px-6 py-4">
 <p className="font-semibold text-content-secondary">{ord.item}</p>
 <span className="text-[10px] font-mono text-content-tertiary">{ord.courier}</span>
 </td>
 <td className="px-6 py-4">
 <p className="font-medium text-content-secondary">{ord.customer}</p>
 <p className="text-[10px] text-content-tertiary flex items-center gap-1 mt-0.5">
 <MapPin className="w-3 h-3" /> {ord.destination}
 </p>
 </td>
 <td className="px-6 py-4 font-mono font-bold text-content-primary text-sm">{ord.amount}</td>
 <td className="px-6 py-4">
 {ord.status === 'IN_TRANSIT' ? (
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-info-surface text-info border border-blue-500/30">
 <Truck className="w-3 h-3" /> In Transit
 </span>
 ) : (
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-warning-surface text-warning border border-warning/20">
 <Clock className="w-3 h-3" /> Ready to Ship
 </span>
 )}
 </td>
 <td className="px-6 py-4 text-right">
 {ord.status === 'READY_TO_SHIP' ? (
 <button
 onClick={() => handleHandoverCourier(ord.id)}
 className="px-3.5 py-1.5 rounded-xl bg-action-primary text-content-primary font-bold text-xs shadow-md shadow-action-primary/10 hover:bg-success transition-colors"
 >
 Handover to Pathao
 </button>
 ) : (
 <span className="text-[11px] text-success font-semibold font-mono">Dispatched</span>
 )}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </MerchantShell>
 );
}
