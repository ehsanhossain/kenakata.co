'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '../../../components/AdminShell';
import {
  CheckSquare, ShoppingBag, Storefront, CheckCircle, XCircle, Eye, Check, X, WarningCircle, ArrowRight
} from '@phosphor-icons/react';

const mockPendingProducts = [
 {
 id: 'prod-pnd-01',
 title: 'Samsung Galaxy Watch 6 (44mm Bluetooth)',
 category: 'Smartwatches',
 shopName: 'Dhaka Tech Hub',
 price: '৳28,500',
 compareAt: '৳32,000',
 stock: 15,
 sku: 'SAM-W6-44-BLK',
 image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
 submittedAt: '2 hours ago',
 description: 'Official Bangladesh warranty, Super AMOLED sapphire crystal with ECG and body composition.',
 },
 {
 id: 'prod-pnd-02',
 title: 'Premium Hand-Embroidered Silk Panjabi (Navy Blue)',
 category: 'Men\'s Ethnic Fashion',
 shopName: 'Ctg Lifestyle',
 price: '৳5,800',
 compareAt: '৳6,500',
 stock: 25,
 sku: 'CTG-PANJ-09',
 image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
 submittedAt: '4 hours ago',
 description: '100% pure Rajshahi silk with intricate neckline and cuff hand embroidery.',
 },
];

export default function ProductApprovalsQueuePage() {
 const [items, setItems] = useState(mockPendingProducts);
 const [approvedIds, setApprovedIds] = useState<string[]>([]);
 const [rejectedIds, setRejectedIds] = useState<string[]>([]);

 const handleApprove = (id: string) => {
 setApprovedIds((prev) => [...prev, id]);
 };

 const handleReject = (id: string) => {
 setRejectedIds((prev) => [...prev, id]);
 };

 return (
 <AdminShell
 title="Vendor Product Approval Queue"
 subtitle="Review product listings and pricing submitted by registered shops before they go live on Kenakata.co"
 actions={
 <Link
 href="/products"
 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-muted hover:bg-surface-muted text-xs font-semibold text-content-primary transition-colors"
 >
 <ShoppingBag className="w-4 h-4" /> View Full Catalog
 </Link>
 }
 >
 <div className="space-y-4">
 {items.length === 0 ? (
 <div className="bg-canvas border border-border rounded-3xl p-12 text-center">
 <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
 <h3 className="text-lg font-bold text-content-primary">All Caught Up!</h3>
 <p className="text-xs text-content-tertiary mt-1">There are no pending vendor products requiring review.</p>
 </div>
 ) : (
 items.map((prod) => {
 const isApproved = approvedIds.includes(prod.id);
 const isRejected = rejectedIds.includes(prod.id);
 return (
 <div
 key={prod.id}
 className="bg-canvas border border-border rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
 >
 <div className="flex items-start gap-4 min-w-0">
 <img
 src={prod.image}
 alt={prod.title}
 className="w-20 h-20 rounded-xl object-cover border border-border shrink-0"
 />
 <div className="space-y-1 min-w-0">
 <div className="flex items-center gap-2 flex-wrap">
 <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-success-surface text-success border border-success/20">
 {prod.category}
 </span>
 <span className="text-[10px] font-mono text-content-tertiary">SKU: {prod.sku}</span>
 <span className="text-[10px] text-content-tertiary">Submitted {prod.submittedAt}</span>
 </div>
 <h3 className="font-bold text-base text-content-primary">{prod.title}</h3>
 <p className="text-xs text-content-tertiary line-clamp-1">{prod.description}</p>
 <p className="text-xs text-content-tertiary">
 Seller Shop: <strong className="text-success">{prod.shopName}</strong> · Stock:{' '}
 <strong className="text-content-primary">{prod.stock} units</strong>
 </p>
 </div>
 </div>

 <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end shrink-0">
 <div className="text-right">
 <p className="text-lg font-bold font-mono text-content-primary">{prod.price}</p>
 {prod.compareAt && (
 <p className="text-xs font-mono text-content-tertiary line-through">{prod.compareAt}</p>
 )}
 </div>

 {isApproved ? (
 <span className="px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-success text-xs font-bold flex items-center gap-1.5">
 <CheckCircle className="w-4 h-4" /> Approved & Live
 </span>
 ) : isRejected ? (
 <span className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-800 text-danger text-xs font-bold flex items-center gap-1.5">
 <XCircle className="w-4 h-4" /> Rejected
 </span>
 ) : (
 <div className="flex items-center gap-2">
 <button
 onClick={() => handleReject(prod.id)}
 className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 transition-colors"
 title="Reject Listing"
 >
 <X className="w-4 h-4" />
 </button>
 <button
 onClick={() => handleApprove(prod.id)}
 className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-content-primary font-bold text-xs shadow-md shadow-action-primary/10 transition-all flex items-center gap-1.5"
 >
 <Check className="w-4 h-4" /> Approve & Publish
 </button>
 </div>
 )}
 </div>
 </div>
 );
 })
 )}
 </div>
 </AdminShell>
 );
}
