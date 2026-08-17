'use client';

import Link from 'next/link';
import {
  CheckCircle, Package, Truck, Clock, ArrowRight, Copy, ShoppingBag
} from '@phosphor-icons/react';
import { products, formatBDT } from '@/lib/mock-data';

export default function OrderSuccessPage() {
 const orderNumber = 'KNK-2026-00847';
 const orderDate = new Date().toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' });
 const estimatedDelivery = new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' });
 const orderItems = products.slice(0, 2);
 const total = orderItems.reduce((s, p) => s + p.price, 0) + 6000;

 return (
 <div className="min-h-screen bg-surface-subtle">
 <div className="container-page py-10 sm:py-16 max-w-2xl">
 {/* Success animation */}
 <div className="text-center mb-8">
 <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-semantic-success-soft flex items-center justify-center animate-scale-in">
 <CheckCircle className="w-10 h-10 text-success" />
 </div>
 <h1 className="text-2xl sm:text-3xl font-bold text-content-primary mb-2 animate-fade-in">
 Order Placed Successfully!
 </h1>
 <p className="text-content-tertiary animate-fade-in">
 Thank you for shopping with Kenakata. We&apos;ll send you updates via SMS.
 </p>
 </div>

 {/* Order details card */}
 <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up">
 <div className="p-5 sm:p-6 border-b border-border">
 <div className="flex items-center justify-between mb-4">
 <div>
 <p className="text-xs text-content-tertiary mb-0.5">Order Number</p>
 <p className="text-lg font-bold text-content-primary flex items-center gap-2">
 {orderNumber}
 <button className="p-1 hover:bg-surface-subtle rounded transition-colors" aria-label="Copy order number">
 <Copy className="w-4 h-4 text-content-disabled" />
 </button>
 </p>
 </div>
 <div className="text-right">
 <p className="text-xs text-content-tertiary mb-0.5">Order Date</p>
 <p className="text-sm font-medium text-content-primary">{orderDate}</p>
 </div>
 </div>

 {/* Delivery promise */}
 <div className="bg-surface-brand-subtle rounded-lg p-4 flex items-center gap-3">
 <Truck className="w-5 h-5 text-content-brand shrink-0" />
 <div>
 <p className="text-sm font-medium text-content-primary">Estimated Delivery</p>
 <p className="text-xs text-content-secondary">{estimatedDelivery}</p>
 </div>
 </div>
 </div>

 {/* Items */}
 <div className="p-5 sm:p-6 border-b border-border">
 <h3 className="text-sm font-semibold text-content-primary mb-3">Items Ordered</h3>
 <div className="space-y-3">
 {orderItems.map(p => (
 <div key={p.id} className="flex items-center gap-3">
 <div className="w-12 h-12 rounded-lg product-image-placeholder shrink-0 flex items-center justify-center"
 style={{ background: `hsl(${p.colorHue}, 30%, 92%)` }}>
 <ShoppingBag className="w-4 h-4 text-content-tertiary" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm text-content-primary line-clamp-1">{p.title}</p>
 <p className="text-xs text-content-tertiary">Qty: 1</p>
 </div>
 <span className="text-sm font-medium tabular-nums">{formatBDT(p.price)}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Payment summary */}
 <div className="p-5 sm:p-6 border-b border-border space-y-2 text-sm">
 <div className="flex justify-between"><span className="text-content-secondary">Payment Method</span><span className="font-medium">Cash on Delivery</span></div>
 <div className="flex justify-between font-semibold text-content-primary pt-2 border-t border-border">
 <span>Total</span><span className="text-lg tabular-nums">{formatBDT(total)}</span>
 </div>
 </div>

 {/* Next Steps */}
 <div className="p-5 sm:p-6 bg-surface-subtle">
 <h3 className="text-sm font-semibold text-content-primary mb-3">What&apos;s Next?</h3>
 <div className="space-y-3">
 {[
 { icon: Clock, text: 'We are processing your order', status: 'active' },
 { icon: Package, text: 'Your order will be packed and shipped', status: 'pending' },
 { icon: Truck, text: 'Delivery to your address', status: 'pending' },
 ].map(({ icon: Icon, text, status }, i) => (
 <div key={i} className="flex items-center gap-3">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
 status === 'active' ? 'bg-action-primary text-content-primary' : 'bg-neutral-200 text-content-disabled'
 }`}>
 <Icon className="w-4 h-4" />
 </div>
 <span className={`text-sm ${status === 'active' ? 'font-medium text-content-primary' : 'text-content-tertiary'}`}>{text}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Actions */}
 <div className="flex flex-col sm:flex-row gap-3 mt-6">
 <Link href="/track" className="btn-secondary flex-1 py-3 rounded-xl">
 <Package className="w-5 h-5" /> Track Order
 </Link>
 <Link href="/" className="btn-primary flex-1 py-3 rounded-xl">
 Continue Shopping <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 );
}
