'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMerchantAuth } from '../../../context/MerchantAuthContext';
import { MerchantShell } from '../../../components/MerchantShell';
import {
  ShoppingBag, Plus, ArrowLeft, UploadSimple, CheckCircle, WarningCircle, CurrencyDollar, Image as ImageIcon, Check
} from '@phosphor-icons/react';

export default function AddNewProductPage() {
 const router = useRouter();
 const { merchant } = useMerchantAuth();

 const [titleEn, setTitleEn] = useState('');
 const [titleBn, setTitleBn] = useState('');
 const [category, setCategory] = useState('smartphones');
 const [priceBDT, setPriceBDT] = useState('');
 const [compareAtBDT, setCompareAtBDT] = useState('');
 const [stock, setStock] = useState('10');
 const [sku, setSku] = useState('');
 const [description, setDescription] = useState('');
 const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800');
 const [submitted, setSubmitted] = useState(false);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitted(true);
 setTimeout(() => {
 router.push('/products');
 }, 1500);
 };

 return (
 <MerchantShell
 title="Create New Product Listing"
 subtitle="Submit product details and BDT poisha pricing for Kenakata Catalog team approval"
 actions={
 <Link
 href="/products"
 className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-muted hover:bg-surface-muted text-xs font-semibold text-content-primary transition-colors"
 >
 <ArrowLeft className="w-4 h-4" /> Back to Products
 </Link>
 }
 >
 <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
 {/* Product Basic Info */}
 <div className="bg-canvas border border-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
 <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
 <ShoppingBag className="w-4 h-4 text-success" /> Basic Information
 </h2>

 <div className="space-y-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Product Title (English) *
 </label>
 <input
 type="text"
 required
 value={titleEn}
 onChange={(e) => setTitleEn(e.target.value)}
 placeholder="e.g. Sony WH-1000XM5 Wireless Headset"
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Product Title (Bangla Translation)
 </label>
 <input
 type="text"
 value={titleBn}
 onChange={(e) => setTitleBn(e.target.value)}
 placeholder="e.g. সনি ওয়্যারলেস হেডফোন"
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Category *
 </label>
 <select
 value={category}
 onChange={(e) => setCategory(e.target.value)}
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 >
 <option value="smartphones">Smartphones & Tablets</option>
 <option value="electronics">Consumer Electronics</option>
 <option value="fashion">Men & Women Fashion</option>
 <option value="groceries">Organic Groceries</option>
 <option value="home">House & Living</option>
 </select>
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Merchant SKU
 </label>
 <input
 type="text"
 value={sku}
 onChange={(e) => setSku(e.target.value)}
 placeholder="e.g. SONY-WH5-BLK"
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Description / Highlights *
 </label>
 <textarea
 rows={3}
 required
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 placeholder="Highlight key specs, warranty terms, and original box contents..."
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 </div>
 </div>

 {/* Pricing & Stock */}
 <div className="bg-canvas border border-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
 <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
 <CurrencyDollar className="w-4 h-4 text-success" /> Pricing & Inventory Stock
 </h2>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Selling Price (BDT ৳) *
 </label>
 <input
 type="number"
 required
 min={1}
 value={priceBDT}
 onChange={(e) => setPriceBDT(e.target.value)}
 placeholder="28500"
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs font-mono font-bold text-success focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Compare-at Price (BDT ৳)
 </label>
 <input
 type="number"
 value={compareAtBDT}
 onChange={(e) => setCompareAtBDT(e.target.value)}
 placeholder="32000"
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-content-tertiary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Stock Quantity *
 </label>
 <input
 type="number"
 required
 min={0}
 value={stock}
 onChange={(e) => setStock(e.target.value)}
 placeholder="10"
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 </div>
 </div>

 {/* Media / Photo */}
 <div className="bg-canvas border border-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
 <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
 <ImageIcon className="w-4 h-4 text-success" /> Product Primary Image
 </h2>
 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Image URL (High-Resolution)
 </label>
 <input
 type="url"
 required
 value={imageUrl}
 onChange={(e) => setImageUrl(e.target.value)}
 placeholder="https://images.unsplash.com/..."
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 </div>

 {/* Action Button */}
 <div className="flex items-center justify-between pt-2">
 {submitted ? (
 <span className="text-xs font-semibold text-success flex items-center gap-1.5">
 <CheckCircle className="w-4 h-4" /> Product submitted for admin review! Redirecting...
 </span>
 ) : (
 <div />
 )}

 <button
 type="submit"
 className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-content-primary font-bold text-xs shadow-lg shadow-action-primary/10 transition-all flex items-center gap-2"
 >
 <Plus className="w-4 h-4" />
 <span>Submit Product for Approval</span>
 </button>
 </div>
 </form>
 </MerchantShell>
 );
}
