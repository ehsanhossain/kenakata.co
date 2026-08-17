'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '../../components/AdminShell';
import {
  ShoppingBag, CheckSquare, Plus, MagnifyingGlass, Funnel, CheckCircle, WarningCircle, PencilSimple, Trash, ArrowUpRight
} from '@phosphor-icons/react';

const mockCatalog = [
 {
 id: 'prod-1',
 slug: 'samsung-galaxy-a55-5g',
 title: 'Samsung Galaxy A55 5G (8GB/128GB)',
 category: 'Smartphones',
 brand: 'Samsung',
 price: '৳45,999',
 stock: 45,
 status: 'ACTIVE',
 approvalStatus: 'APPROVED',
 seller: 'Official Storefront',
 image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&q=80',
 },
 {
 id: 'prod-2',
 slug: 'xiaomi-redmi-note-13-pro',
 title: 'Xiaomi Redmi Note 13 Pro (8GB/256GB)',
 category: 'Smartphones',
 brand: 'Xiaomi',
 price: '৳29,999',
 stock: 30,
 status: 'ACTIVE',
 approvalStatus: 'APPROVED',
 seller: 'Dhaka Tech Hub',
 image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&q=80',
 },
 {
 id: 'prod-3',
 slug: 'apple-airpods-pro-2',
 title: 'Apple AirPods Pro (2nd Generation, Type-C)',
 category: 'Audio',
 brand: 'Apple',
 price: '৳26,500',
 stock: 20,
 status: 'ACTIVE',
 approvalStatus: 'APPROVED',
 seller: 'Dhaka Tech Hub',
 image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&q=80',
 },
 {
 id: 'prod-4',
 slug: 'aarong-silk-panjabi',
 title: 'Aarong Hand-Embroidered Silk Panjabi',
 category: 'Fashion',
 brand: 'Aarong',
 price: '৳6,500',
 stock: 15,
 status: 'ACTIVE',
 approvalStatus: 'APPROVED',
 seller: 'Official Storefront',
 image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&q=80',
 },
];

export default function ProductsManagementPage() {
 const [search, setSearch] = useState('');

 const filtered = mockCatalog.filter((p) => {
 if (!search) return true;
 const q = search.toLowerCase();
 return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q);
 });

 return (
 <AdminShell
 title="Products & Catalog Inventory"
 subtitle="Manage all store listings, inventory balances, poisha pricing, and seller products"
 actions={
 <div className="flex items-center gap-2">
 <Link
 href="/products/approvals"
 className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-muted hover:bg-surface-muted text-xs font-semibold text-content-primary transition-colors"
 >
 <CheckSquare className="w-4 h-4 text-success" /> Pending Approvals (2)
 </Link>
 <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-action-primary text-content-primary font-bold text-xs shadow-md shadow-action-primary/10">
 <Plus className="w-4 h-4" /> Add Product
 </button>
 </div>
 }
 >
 <div className="bg-canvas border border-border rounded-2xl overflow-hidden shadow-xl">
 {/* Table MagnifyingGlass */}
 <div className="p-4 border-b border-border flex items-center justify-between">
 <div className="relative w-full max-w-sm">
 <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
 <input
 type="text"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 placeholder="Search product title, seller, brand..."
 className="w-full pl-10 pr-4 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 <span className="text-xs text-content-tertiary font-mono">{filtered.length} products listed</span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs text-content-secondary">
 <thead className="bg-surface-subtle text-content-tertiary uppercase tracking-wider font-semibold border-b border-border">
 <tr>
 <th className="px-6 py-4">Product Details</th>
 <th className="px-6 py-4">Category & Brand</th>
 <th className="px-6 py-4">Seller / Shop</th>
 <th className="px-6 py-4">Price (BDT)</th>
 <th className="px-6 py-4">Stock Level</th>
 <th className="px-6 py-4">Status</th>
 <th className="px-6 py-4 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-800/60">
 {filtered.map((prod) => (
 <tr key={prod.id} className="hover:bg-surface-subtle/50 transition-colors">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <img src={prod.image} alt={prod.title} className="w-10 h-10 rounded-lg object-cover border border-border shrink-0" />
 <div>
 <p className="font-bold text-content-primary text-sm line-clamp-1">{prod.title}</p>
 <span className="text-[10px] text-content-tertiary font-mono">/{prod.slug}</span>
 </div>
 </div>
 </td>
 <td className="px-6 py-4">
 <p className="font-semibold text-content-secondary">{prod.category}</p>
 <p className="text-[11px] text-content-tertiary">{prod.brand}</p>
 </td>
 <td className="px-6 py-4">
 <span className="px-2 py-0.5 rounded bg-surface-muted font-mono text-[11px] text-success">
 {prod.seller}
 </span>
 </td>
 <td className="px-6 py-4 font-mono font-bold text-content-primary">{prod.price}</td>
 <td className="px-6 py-4">
 <span className="font-mono font-semibold text-content-secondary">{prod.stock} units</span>
 </td>
 <td className="px-6 py-4">
 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-success-surface text-success border border-success/20">
 <CheckCircle className="w-3.5 h-3.5" /> Active
 </span>
 </td>
 <td className="px-6 py-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <Link
 href={`https://kenakata.co/products/${prod.slug}`}
 target="_blank"
 className="p-1.5 text-content-tertiary hover:text-content-primary hover:bg-surface-muted rounded-lg"
 title="View Live on Storefront"
 >
 <ArrowUpRight className="w-4 h-4" />
 </Link>
 <button className="p-1.5 text-content-tertiary hover:text-success hover:bg-surface-muted rounded-lg">
 <PencilSimple className="w-4 h-4" />
 </button>
 </div>
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
