'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlass, Funnel, ArrowRight, ShoppingBag
} from '@phosphor-icons/react';
import { formatBDT } from '@/lib/mock-data';

const orders = [
 { id: 'KNK-2026-00847', date: 'Aug 14, 2026', status: 'In Transit', statusColor: 'badge-amber', total: 7599800, items: 2, itemNames: 'Samsung Galaxy A55 5G, Xiaomi Redmi Note 13 Pro' },
 { id: 'KNK-2026-00832', date: 'Aug 10, 2026', status: 'Delivered', statusColor: 'badge-green', total: 3500000, items: 1, itemNames: 'Sony WH-1000XM5' },
 { id: 'KNK-2026-00815', date: 'Aug 2, 2026', status: 'Delivered', statusColor: 'badge-green', total: 349900, items: 1, itemNames: 'Aarong Premium Cotton Punjabi' },
 { id: 'KNK-2026-00798', date: 'Jul 25, 2026', status: 'Delivered', statusColor: 'badge-green', total: 279900, items: 1, itemNames: 'Yellow Casual Sneakers' },
 { id: 'KNK-2026-00772', date: 'Jul 15, 2026', status: 'Cancelled', statusColor: 'badge-red', total: 1099900, items: 1, itemNames: 'Walton Primo NH5 Lite' },
];

const statusFilters = ['All', 'In Transit', 'Delivered', 'Cancelled'];

export default function OrdersPage() {
 const [filter, setFilter] = useState('All');
 const [search, setSearch] = useState('');

 const filtered = orders.filter(o => {
 if (filter !== 'All' && o.status !== filter) return false;
 if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.itemNames.toLowerCase().includes(search.toLowerCase())) return false;
 return true;
 });

 return (
 <div className="space-y-6">
 <h1 className="text-2xl font-bold text-content-primary">My Orders</h1>

 {/* Filters & MagnifyingGlass */}
 <div className="flex flex-col sm:flex-row gap-3">
 <div className="relative flex-1">
 <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-disabled" />
 <input type="text" value={search} onChange={e => setSearch(e.target.value)}
 placeholder="Search by order ID or product..." className="input pl-9 text-sm" />
 </div>
 <div className="flex gap-2 overflow-x-auto no-scrollbar">
 {statusFilters.map(s => (
 <button key={s} onClick={() => setFilter(s)}
 className={s === filter ? 'chip-active shrink-0' : 'chip shrink-0'}>
 {s}
 </button>
 ))}
 </div>
 </div>

 {/* Orders list */}
 <div className="space-y-3">
 {filtered.map(order => (
 <Link key={order.id} href={`/account/orders/${order.id}`}
 className="card p-4 sm:p-5 flex items-center justify-between hover:shadow-md transition-all group">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-lg bg-surface-subtle flex items-center justify-center shrink-0">
 <ShoppingBag className="w-6 h-6 text-content-tertiary" />
 </div>
 <div className="min-w-0">
 <p className="text-sm font-semibold text-content-primary group-hover:text-content-brand transition-colors">
 {order.id}
 </p>
 <p className="text-xs text-content-tertiary mt-0.5">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
 <p className="text-xs text-content-disabled mt-0.5 line-clamp-1">{order.itemNames}</p>
 </div>
 </div>
 <div className="text-right flex items-center gap-3 shrink-0">
 <div>
 <span className={order.statusColor}>{order.status}</span>
 <p className="text-sm font-medium tabular-nums mt-1">{formatBDT(order.total)}</p>
 </div>
 <ArrowRight className="w-4 h-4 text-content-tertiary group-hover:text-content-brand transition-colors" />
 </div>
 </Link>
 ))}
 </div>

 {filtered.length === 0 && (
 <div className="text-center py-12">
 <ShoppingBag className="w-12 h-12 text-content-secondary mx-auto mb-3" />
 <p className="text-sm text-content-tertiary">No orders found matching your filters.</p>
 </div>
 )}
 </div>
 );
}
