'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Minus, Plus, X, Heart, ShoppingBag, Truck, ShieldCheck, Tag, CaretRight, ArrowRight
} from '@phosphor-icons/react';
import { products, formatBDT, calcDiscount } from '@/lib/mock-data';

const initialCart = products.slice(0, 3).map((p, i) => ({
 id: `cart-${i}`,
 product: p,
 variant: p.variants[0] || null,
 quantity: i === 0 ? 2 : 1,
}));

export default function CartPage() {
 const [items, setItems] = useState(initialCart);
 const [coupon, setCoupon] = useState('');
 const [couponApplied, setCouponApplied] = useState(false);

 const updateQty = (id: string, qty: number) => {
 if (qty < 1) return;
 setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.min(10, qty) } : i));
 };
 const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

 const subtotal = items.reduce((sum, i) => sum + (i.variant?.price || i.product.price) * i.quantity, 0);
 const shipping = subtotal > 200000 ? 0 : 6000; // Free over 2000 BDT
 const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
 const total = subtotal - discount + shipping;

 if (items.length === 0) {
 return (
 <div className="container-page py-20 text-center">
 <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-surface-subtle flex items-center justify-center">
 <ShoppingBag className="w-8 h-8 text-content-tertiary" />
 </div>
 <h1 className="text-xl font-semibold text-content-primary mb-2">Your cart is empty</h1>
 <p className="text-sm text-content-tertiary mb-6">Looks like you haven&apos;t added anything yet.</p>
 <Link href="/" className="btn-primary">Continue Shopping</Link>
 </div>
 );
 }

 return (
 <div className="container-page py-6 sm:py-8">
 <h1 className="text-2xl font-bold text-content-primary mb-6">Shopping Cart ({items.length} items)</h1>

 <div className="grid lg:grid-cols-3 gap-8">
 {/* ── Cart Items ── */}
 <div className="lg:col-span-2 space-y-4">
 {items.map(item => {
 const price = item.variant?.price || item.product.price;
 const compareAt = item.variant?.compareAt || item.product.compareAt;
 const disc = calcDiscount(price, compareAt);
 return (
 <div key={item.id} className="card p-4 sm:p-5 flex gap-4">
 {/* Image */}
 <Link href={`/products/${item.product.slug}`} className="shrink-0">
 <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg product-image-placeholder overflow-hidden">
 <div className="w-full h-full flex items-center justify-center opacity-20"
 style={{ background: `hsl(${item.product.colorHue}, 35%, 88%)` }}>
 <ShoppingBag className="w-8 h-8 text-content-disabled" />
 </div>
 </div>
 </Link>
 {/* Details */}
 <div className="flex-1 min-w-0">
 <div className="flex items-start justify-between gap-2">
 <div className="min-w-0">
 <p className="text-xs text-content-tertiary mb-0.5">{item.product.brand}</p>
 <Link href={`/products/${item.product.slug}`}
 className="text-sm font-medium text-content-primary hover:text-content-brand transition-colors line-clamp-2">
 {item.product.title}
 </Link>
 {item.variant && (
 <p className="text-xs text-content-tertiary mt-1">
 {Object.values(item.variant.optionValues).join(' · ')}
 </p>
 )}
 </div>
 <button onClick={() => removeItem(item.id)} className="p-1.5 text-content-disabled hover:text-danger hover:bg-danger-soft rounded-md transition-all shrink-0">
 <X className="w-4 h-4" />
 </button>
 </div>

 <div className="flex items-end justify-between mt-3">
 {/* Price */}
 <div>
 <span className="price-current text-base">{formatBDT(price)}</span>
 {compareAt && <span className="price-original ml-2">{formatBDT(compareAt)}</span>}
 {disc && <span className="badge-red text-[10px] ml-2">-{disc}%</span>}
 </div>
 {/* Quantity */}
 <div className="flex items-center">
 <button onClick={() => updateQty(item.id, item.quantity - 1)}
 className="w-8 h-8 rounded-l-md border border-border flex items-center justify-center hover:bg-surface-subtle">
 <Minus className="w-3.5 h-3.5" />
 </button>
 <div className="w-10 h-8 border-y border-border flex items-center justify-center text-sm font-medium tabular-nums">
 {item.quantity}
 </div>
 <button onClick={() => updateQty(item.id, item.quantity + 1)}
 className="w-8 h-8 rounded-r-md border border-border flex items-center justify-center hover:bg-surface-subtle">
 <Plus className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>

 <div className="flex items-center gap-3 mt-3">
 <button className="text-xs text-content-tertiary hover:text-content-brand flex items-center gap-1 transition-colors">
 <Heart className="w-3.5 h-3.5" /> Move to Wishlist
 </button>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* ── Order Summary ── */}
 <div className="lg:col-span-1">
 <div className="sticky top-[140px] space-y-4">
 <div className="card p-5">
 <h2 className="text-lg font-semibold text-content-primary mb-4">Order Summary</h2>

 {/* Coupon */}
 <div className="mb-4">
 <div className="flex gap-2">
 <div className="relative flex-1">
 <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-disabled" />
 <input
 type="text"
 value={coupon}
 onChange={e => setCoupon(e.target.value)}
 placeholder="Coupon code"
 className="input pl-9 text-sm"
 />
 </div>
 <button
 onClick={() => { if (coupon) setCouponApplied(true); }}
 className="btn-secondary text-sm px-4"
 >
 Apply
 </button>
 </div>
 {couponApplied && (
 <p className="text-xs text-success mt-2 flex items-center gap-1">
 <ShieldCheck className="w-3.5 h-3.5" /> 10% discount applied!
 </p>
 )}
 </div>

 <div className="space-y-3 text-sm">
 <div className="flex justify-between">
 <span className="text-content-secondary">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
 <span className="font-medium tabular-nums">{formatBDT(subtotal)}</span>
 </div>
 {discount > 0 && (
 <div className="flex justify-between text-success">
 <span>Coupon Discount</span>
 <span className="font-medium tabular-nums">-{formatBDT(discount)}</span>
 </div>
 )}
 <div className="flex justify-between">
 <span className="text-content-secondary">Delivery</span>
 <span className={`font-medium tabular-nums ${shipping === 0 ? 'text-success' : ''}`}>
 {shipping === 0 ? 'FREE' : formatBDT(shipping)}
 </span>
 </div>
 <div className="border-t border-border pt-3 flex justify-between">
 <span className="font-semibold text-content-primary">Total</span>
 <span className="text-xl font-bold text-content-primary tabular-nums">{formatBDT(total)}</span>
 </div>
 </div>

 <Link href="/checkout" className="btn-primary w-full mt-5 py-3 text-base font-semibold rounded-xl">
 Proceed to Checkout <ArrowRight className="w-5 h-5 ml-1" />
 </Link>

 <p className="text-xs text-content-tertiary text-center mt-3">
 Prices and delivery are estimated. Final amounts at checkout.
 </p>
 </div>

 {/* Trust signals */}
 <div className="flex items-center justify-center gap-4 text-xs text-content-tertiary">
 <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-success" /> Secure</span>
 <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-content-brand" /> Free over ৳2,000</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
