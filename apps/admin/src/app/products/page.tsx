'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '../../components/AdminShell';
import {
  ShoppingBag, CheckSquare, Plus, Search, Filter,
  CheckCircle2, AlertCircle, Edit, Trash2, ArrowUpRight
} from 'lucide-react';

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
    seller: 'Official Store',
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
    seller: 'Official Store',
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
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            <CheckSquare className="w-4 h-4 text-emerald-400" /> Pending Approvals (2)
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      }
    >
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Table Search */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product title, seller, brand..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">{filtered.length} products listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
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
                <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.title} className="w-10 h-10 rounded-lg object-cover border border-slate-800 shrink-0" />
                      <div>
                        <p className="font-bold text-white text-sm line-clamp-1">{prod.title}</p>
                        <span className="text-[10px] text-slate-500 font-mono">/{prod.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-200">{prod.category}</p>
                    <p className="text-[11px] text-slate-400">{prod.brand}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[11px] text-emerald-400">
                      {prod.seller}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-white">{prod.price}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-slate-200">{prod.stock} units</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`https://kenakata.co/products/${prod.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                        title="View Live on Storefront"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg">
                        <Edit className="w-4 h-4" />
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
