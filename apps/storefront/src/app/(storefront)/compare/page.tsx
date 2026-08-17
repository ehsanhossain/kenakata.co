'use client';

import Link from 'next/link';
import {
  Star, X, ShoppingBag, ShoppingCart, Plus
} from '@phosphor-icons/react';
import { products, formatBDT, calcDiscount } from '@/lib/mock-data';

export default function ComparePage() {
 const compareItems = products.slice(0, 3);
 const allSpecKeys = [...new Set(compareItems.flatMap(p => Object.keys(p.specifications)))];

 return (
 <div className="container-page py-6 sm:py-8">
 <h1 className="text-2xl font-bold text-content-primary mb-6">Compare Products</h1>

 <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
 <table className="w-full min-w-[600px]">
 <thead>
 <tr>
 <th className="w-[140px] sm:w-[180px]" />
 {compareItems.map(p => (
 <th key={p.id} className="px-3 pb-4 text-left align-top">
 <div className="card p-3 relative">
 <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-surface-subtle flex items-center justify-center hover:bg-danger-soft hover:text-danger transition-all">
 <X className="w-3.5 h-3.5" />
 </button>
 <div className="aspect-square rounded-lg product-image-placeholder mb-3 flex items-center justify-center"
 style={{ background: `hsl(${p.colorHue}, 30%, 92%)` }}>
 <ShoppingBag className="w-10 h-10 text-content-tertiary/50" />
 </div>
 <Link href={`/products/${p.slug}`} className="text-sm font-medium text-content-primary hover:text-content-brand transition-colors line-clamp-2">
 {p.title}
 </Link>
 <div className="flex items-center gap-1 mt-2">
 <Star className="w-3.5 h-3.5 fill-amber-400 text-warning" />
 <span className="text-xs font-medium">{p.rating}</span>
 <span className="text-xs text-content-disabled">({p.reviewCount})</span>
 </div>
 <div className="mt-2">
 <span className="price-current text-base">{formatBDT(p.price)}</span>
 {p.compareAt && <span className="price-original ml-2 text-xs">{formatBDT(p.compareAt)}</span>}
 </div>
 <button className="btn-primary w-full mt-3 text-xs py-2">
 <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
 </button>
 </div>
 </th>
 ))}
 {compareItems.length < 4 && (
 <th className="px-3 pb-4 align-top">
 <Link href="/search" className="card p-3 h-full flex flex-col items-center justify-center min-h-[200px] text-content-disabled hover:text-content-brand hover:border-border-brand/30 transition-all">
 <Plus className="w-8 h-8 mb-2" />
 <span className="text-sm font-medium">Add Product</span>
 </Link>
 </th>
 )}
 </tr>
 </thead>
 <tbody>
 {/* Brand row */}
 <tr className="bg-surface-subtle">
 <td className="px-4 py-3 text-sm font-medium text-content-secondary">Brand</td>
 {compareItems.map(p => (
 <td key={p.id} className="px-4 py-3 text-sm text-content-primary">{p.brand}</td>
 ))}
 {compareItems.length < 4 && <td />}
 </tr>
 {/* Spec rows */}
 {allSpecKeys.map((key, i) => (
 <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-subtle'}>
 <td className="px-4 py-3 text-sm font-medium text-content-secondary">{key}</td>
 {compareItems.map(p => (
 <td key={p.id} className="px-4 py-3 text-sm text-content-primary">
 {p.specifications[key] || '—'}
 </td>
 ))}
 {compareItems.length < 4 && <td />}
 </tr>
 ))}
 {/* Warranty */}
 <tr className="bg-surface-subtle">
 <td className="px-4 py-3 text-sm font-medium text-content-secondary">Warranty</td>
 {compareItems.map(p => (
 <td key={p.id} className="px-4 py-3 text-sm text-content-primary">{p.warranty}</td>
 ))}
 {compareItems.length < 4 && <td />}
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 );
}
