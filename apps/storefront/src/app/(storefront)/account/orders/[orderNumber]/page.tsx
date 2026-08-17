'use client';

import Link from 'next/link';
import {
  ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard, ShoppingBag, DownloadSimple, ArrowCounterClockwise
} from '@phosphor-icons/react';
import { products, formatBDT } from '@/lib/mock-data';

export default function OrderDetailPage() {
 const order = {
 id: 'KNK-2026-00847', date: 'Aug 14, 2026', status: 'In Transit',
 items: products.slice(0, 2).map(p => ({ product: p, qty: 1, price: p.price })),
 subtotal: products[0].price + products[1].price,
 shipping: 6000, discount: 0,
 total: products[0].price + products[1].price + 6000,
 payment: 'Cash on Delivery', address: 'House 42, Road 7, Dhanmondi R/A, Dhaka 1205',
 };

 return (
 <div className="space-y-6">
 {/* Header */}
 <div className="flex items-center justify-between">
 <div>
 <Link href="/account/orders" className="text-sm text-content-brand hover:text-content-brand flex items-center gap-1 mb-2">
 <ArrowLeft className="w-4 h-4" /> Back to Orders
 </Link>
 <h1 className="text-2xl font-bold text-content-primary">Order {order.id}</h1>
 <p className="text-sm text-content-tertiary mt-0.5">Placed on {order.date}</p>
 </div>
 <span className="badge-amber text-sm">{order.status}</span>
 </div>

 {/* Timeline */}
 <div className="bg-white rounded-xl border border-border shadow-sm p-5">
 <h2 className="text-sm font-semibold text-content-primary mb-4">Order Timeline</h2>
 <div className="flex items-center justify-between">
 {[
 { icon: CheckCircle, label: 'Placed', done: true },
 { icon: Package, label: 'Packed', done: true },
 { icon: Truck, label: 'In Transit', done: true, current: true },
 { icon: MapPin, label: 'Delivered', done: false },
 ].map((step, i, arr) => (
 <div key={i} className="flex items-center flex-1">
 <div className="flex flex-col items-center">
 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
 step.current ? 'bg-action-primary text-content-primary ring-4 ring-brand-blue/20'
 : step.done ? 'bg-semantic-success text-content-primary'
 : 'bg-neutral-200 text-content-disabled'
 }`}>
 <step.icon className="w-5 h-5" />
 </div>
 <span className={`text-xs mt-2 font-medium ${step.current ? 'text-content-brand' : step.done ? 'text-content-primary' : 'text-content-disabled'}`}>
 {step.label}
 </span>
 </div>
 {i < arr.length - 1 && (
 <div className={`flex-1 h-0.5 mx-2 ${step.done ? 'bg-semantic-success' : 'bg-neutral-200'}`} />
 )}
 </div>
 ))}
 </div>
 </div>

 {/* Items */}
 <div className="bg-white rounded-xl border border-border shadow-sm">
 <div className="p-5 border-b border-border">
 <h2 className="text-sm font-semibold text-content-primary">Items Ordered</h2>
 </div>
 <div className="divide-y divide-neutral-50">
 {order.items.map(({ product, qty, price }) => (
 <div key={product.id} className="p-4 sm:p-5 flex items-center gap-4">
 <div className="w-16 h-16 rounded-lg product-image-placeholder shrink-0 flex items-center justify-center"
 style={{ background: `hsl(${product.colorHue}, 30%, 92%)` }}>
 <ShoppingBag className="w-6 h-6 text-content-tertiary" />
 </div>
 <div className="flex-1 min-w-0">
 <Link href={`/products/${product.slug}`} className="text-sm font-medium text-content-primary hover:text-content-brand transition-colors line-clamp-1">
 {product.title}
 </Link>
 <p className="text-xs text-content-tertiary mt-0.5">Qty: {qty} × {formatBDT(price)}</p>
 </div>
 <span className="text-sm font-medium tabular-nums shrink-0">{formatBDT(price * qty)}</span>
 </div>
 ))}
 </div>
 </div>

 <div className="grid sm:grid-cols-2 gap-4">
 {/* Payment */}
 <div className="bg-white rounded-xl border border-border shadow-sm p-5">
 <h2 className="text-sm font-semibold text-content-primary mb-3">Payment Summary</h2>
 <div className="space-y-2 text-sm">
 <div className="flex justify-between"><span className="text-content-secondary">Subtotal</span><span className="tabular-nums">{formatBDT(order.subtotal)}</span></div>
 <div className="flex justify-between"><span className="text-content-secondary">Delivery</span><span className="tabular-nums">{formatBDT(order.shipping)}</span></div>
 <div className="flex justify-between font-semibold pt-2 border-t border-border">
 <span>Total</span><span className="tabular-nums">{formatBDT(order.total)}</span>
 </div>
 <div className="flex items-center gap-2 pt-2 text-content-tertiary">
 <CreditCard className="w-4 h-4" /> {order.payment}
 </div>
 </div>
 </div>

 {/* Delivery */}
 <div className="bg-white rounded-xl border border-border shadow-sm p-5">
 <h2 className="text-sm font-semibold text-content-primary mb-3">Delivery Details</h2>
 <div className="space-y-2 text-sm">
 <div className="flex items-start gap-2 text-content-secondary">
 <MapPin className="w-4 h-4 mt-0.5 text-content-brand shrink-0" />
 <span>{order.address}</span>
 </div>
 <div className="flex items-center gap-2 text-content-secondary">
 <Truck className="w-4 h-4 text-content-brand shrink-0" />
 <span>Standard Delivery</span>
 </div>
 </div>
 </div>
 </div>

 {/* Actions */}
 <div className="flex flex-wrap gap-3">
 <button className="btn-secondary text-sm"><DownloadSimple className="w-4 h-4" /> DownloadSimple Invoice</button>
 <button className="btn-ghost text-sm"><ArrowCounterClockwise className="w-4 h-4" /> Request Return</button>
 </div>
 </div>
 );
}
