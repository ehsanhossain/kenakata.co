'use client';

import React from 'react';
import Link from 'next/link';
import { categories, products, formatBDT } from '../../../lib/mock-data';
import { useLanguage } from '../../../context/LanguageContext';
import {
  DeviceMobile, Laptop, Television, TShirt, Sparkle, House, ShoppingBag, Heart, Barbell, BookOpen, Stack, ArrowRight, ShieldCheck, CaretRight
} from '@phosphor-icons/react';

const categoryIcons: Record<string, React.ReactNode> = {
 electronics: <Laptop className="w-6 h-6" />,
 smartphones: <DeviceMobile className="w-6 h-6" />,
 fashion: <TShirt className="w-6 h-6" />,
 'home-living': <House className="w-6 h-6" />,
 'beauty-personal-care': <Sparkle className="w-6 h-6" />,
 groceries: <ShoppingBag className="w-6 h-6" />,
 'health-wellness': <Heart className="w-6 h-6" />,
 'sports-outdoors': <Barbell className="w-6 h-6" />,
 'books-stationery': <BookOpen className="w-6 h-6" />,
};

export default function AllCategoriesPage() {
 const { isBn } = useLanguage();

 return (
 <div className="min-h-screen bg-surface-subtle dark:bg-canvas pb-16">
 {/* Breadcrumb */}
 <div className="bg-white dark:bg-surface-subtle border-b border-border dark:border-border">
 <div className="container-page py-3">
 <nav className="flex items-center gap-2 text-xs text-content-tertiary">
 <Link href="/" className="hover:text-content-brand transition-colors">
 {isBn ? 'হোম' : 'House'}
 </Link>
 <span>/</span>
 <span className="text-content-primary dark:text-content-primary font-medium">
 {isBn ? 'সব ক্যাটাগরি' : 'All Categories'}
 </span>
 </nav>
 </div>
 </div>

 <div className="container-page py-8">
 {/* Header */}
 <div className="mb-8">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-action-primary/10 text-content-brand text-xs font-semibold uppercase tracking-wider mb-2">
 <Stack className="w-3.5 h-3.5" />
 {isBn ? 'সম্পূর্ণ ক্যাটালগ' : 'Explore Collections'}
 </div>
 <h1 className="text-3xl font-bold text-slate-900 dark:text-content-primary">
 {isBn ? 'সকল পণ্য ক্যাটাগরি' : 'Shop by Category'}
 </h1>
 <p className="text-sm text-content-tertiary mt-1">
 {isBn
 ? 'আপনার পছন্দের প্রতিটি ক্যাটাগরি ও ব্র্যান্ডের শতভাগ আসল পণ্য'
 : 'Browse genuine products across major categories with official Bangladesh warranty'}
 </p>
 </div>

 {/* Categories GridFour */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {categories.map((cat) => {
 const catProducts = products.filter(
 (p) => p.categorySlug === cat.slug || cat.children?.some((c) => c.slug === p.categorySlug)
 );
 return (
 <div
 key={cat.id}
 className="bg-white dark:bg-surface-subtle rounded-2xl border border-border dark:border-border p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
 >
 <div>
 <div className="flex items-center justify-between mb-4">
 <div className="w-12 h-12 rounded-xl bg-action-primary/10 text-content-brand flex items-center justify-center group-hover:bg-action-primary/10 group-hover:text-content-brand transition-colors">
 {categoryIcons[cat.slug] || <Stack className="w-6 h-6" />}
 </div>
 <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-subtle dark:bg-surface-muted text-slate-600 dark:text-content-tertiary">
 {catProducts.length} {isBn ? 'পণ্য' : 'items'}
 </span>
 </div>

 <Link href={`/categories/${cat.slug}`}>
 <h2 className="text-lg font-bold text-slate-900 dark:text-content-primary group-hover:text-content-brand transition-colors">
 {isBn ? cat.nameBn || cat.name : cat.name}
 </h2>
 </Link>

 {/* Subcategories list */}
 {cat.children && cat.children.length > 0 && (
 <div className="mt-3 flex flex-wrap gap-1.5">
 {cat.children.map((sub) => (
 <Link
 key={sub.id}
 href={`/categories/${sub.slug}`}
 className="text-xs px-2.5 py-1 rounded-lg bg-surface-subtle dark:bg-surface-muted hover:bg-surface-brand-subtle hover:text-content-brand text-slate-600 dark:text-content-tertiary transition-colors"
 >
 {isBn ? sub.nameBn || sub.name : sub.name}
 </Link>
 ))}
 </div>
 )}
 </div>

 <div className="mt-6 pt-4 border-t border-border dark:border-border flex items-center justify-between">
 <Link
 href={`/categories/${cat.slug}`}
 className="text-xs font-semibold text-content-brand hover:text-content-brand flex items-center gap-1"
 >
 <span>{isBn ? 'ক্যাটাগরি দেখুন' : 'Browse All'}</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </div>
 );
}
