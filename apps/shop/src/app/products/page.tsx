'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMerchantAuth } from '../../context/MerchantAuthContext';
import { MerchantShell } from '../../components/MerchantShell';
import {
  ShoppingBag, Plus, Search, CheckCircle2, Clock,
  AlertCircle, Edit, ExternalLink, ArrowRight
} from 'lucide-react';

const mockShopProducts = [
  {
    id: 'prod-shop-01',
    title: 'Samsung Galaxy Watch 6 (44mm Bluetooth)',
    category: 'Smartwatches',
    price: '৳28,500',
    compareAt: '৳32,000',
    stock: 15,
    status: 'PENDING_APPROVAL',
    sku: 'SAM-W6-44-BLK',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
  },
  {
    id: 'prod-shop-02',
    title: 'Xiaomi Redmi Note 13 Pro (8GB/256GB)',
    category: 'Smartphones',
    price: '৳29,999',
    compareAt: '৳33,000',
    stock: 30,
    status: 'APPROVED',
    sku: 'XIAO-RN13P',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
  },
  {
    id: 'prod-shop-03',
    title: 'Apple AirPods Pro (2nd Gen, Type-C)',
    category: 'Audio',
    price: '৳26,500',
    compareAt: '৳29,000',
    stock: 20,
    status: 'APPROVED',
    sku: 'APP-AIRP-PRO2',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400',
  },
];

export default function MerchantProductsPage() {
  const { merchant } = useMerchantAuth();
  const [search, setSearch] = useState('');

  const isApproved = merchant?.status === 'APPROVED';

  const filtered = mockShopProducts.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  return (
    <MerchantShell
      title="Store Catalog & Inventory"
      subtitle="Manage your products, live stock counts, and check admin moderation status"
      actions={
        <Link
          href="/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      }
    >
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product title, SKU, category..."
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
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price (BDT)</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Catalog Status</th>
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
                        <span className="text-[10px] text-slate-500 font-mono">SKU: {prod.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-200">{prod.category}</td>
                  <td className="px-6 py-4">
                    <p className="font-mono font-bold text-white">{prod.price}</p>
                    {prod.compareAt && (
                      <p className="text-[10px] font-mono text-slate-500 line-through">{prod.compareAt}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-white">{prod.stock} units</td>
                  <td className="px-6 py-4">
                    {prod.status === 'APPROVED' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Live on Storefront
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Clock className="w-3.5 h-3.5 animate-spin" /> Admin Review Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
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
    </MerchantShell>
  );
}
