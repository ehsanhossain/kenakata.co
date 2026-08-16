'use client';

import React from 'react';
import Link from 'next/link';
import { categories, products, formatBDT } from '../../../lib/mock-data';
import { useLanguage } from '../../../context/LanguageContext';
import {
  Smartphone, Laptop, Tv, Shirt, Sparkles, Home, ShoppingBag,
  Heart, Dumbbell, BookOpen, Layers, ArrowRight, ShieldCheck, ChevronRight
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  electronics: <Laptop className="w-6 h-6" />,
  smartphones: <Smartphone className="w-6 h-6" />,
  fashion: <Shirt className="w-6 h-6" />,
  'home-living': <Home className="w-6 h-6" />,
  'beauty-personal-care': <Sparkles className="w-6 h-6" />,
  groceries: <ShoppingBag className="w-6 h-6" />,
  'health-wellness': <Heart className="w-6 h-6" />,
  'sports-outdoors': <Dumbbell className="w-6 h-6" />,
  'books-stationery': <BookOpen className="w-6 h-6" />,
};

export default function AllCategoriesPage() {
  const { isBn } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container-page py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-blue transition-colors">
              {isBn ? 'হোম' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-white font-medium">
              {isBn ? 'সব ক্যাটাগরি' : 'All Categories'}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-page py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            {isBn ? 'সম্পূর্ণ ক্যাটালগ' : 'Explore Collections'}
          </div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
            {isBn ? 'সকল পণ্য ক্যাটাগরি' : 'Shop by Category'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isBn
              ? 'আপনার পছন্দের প্রতিটি ক্যাটাগরি ও ব্র্যান্ডের শতভাগ আসল পণ্য'
              : 'Browse genuine products across major categories with official Bangladesh warranty'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const catProducts = products.filter(
              (p) => p.categorySlug === cat.slug || cat.children?.some((c) => c.slug === p.categorySlug)
            );
            return (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-brand-emerald/10 group-hover:text-brand-emerald transition-colors">
                      {categoryIcons[cat.slug] || <Layers className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {catProducts.length} {isBn ? 'পণ্য' : 'items'}
                    </span>
                  </div>

                  <Link href={`/categories/${cat.slug}`}>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors">
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
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-blue-soft hover:text-brand-blue text-slate-600 dark:text-slate-400 transition-colors"
                        >
                          {isBn ? sub.nameBn || sub.name : sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-xs font-semibold text-brand-blue hover:text-brand-blue-hover flex items-center gap-1"
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
