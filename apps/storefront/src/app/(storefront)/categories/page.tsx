'use client';

import React from 'react';
import Link from 'next/link';
import { categories, products } from '../../../lib/mock-data';
import { useLanguage } from '../../../context/LanguageContext';
import { Stack, ArrowRight, CaretRight } from '@phosphor-icons/react';
import CategoryIcon from '../../../components/CategoryIcon';

export default function AllCategoriesPage() {
  const { isBn } = useLanguage();

  return (
    <div className="min-h-screen bg-surface-subtle pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-canvas border-b border-border">
        <div className="container-page py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-content-tertiary">
            <Link href="/" className="font-medium hover:text-content-brand hover:underline transition-colors">
              {isBn ? 'হোম' : 'Home'}
            </Link>
            <CaretRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-content-primary font-semibold">
              {isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-page py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-action-primary/10 text-content-brand text-xs font-semibold uppercase tracking-wider mb-2">
            <Stack className="w-3.5 h-3.5" weight="bold" />
            {isBn ? 'সম্পূর্ণ ক্যাটালগ' : 'Official Catalog'}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-content-primary">
            {isBn ? 'সকল পণ্য ক্যাটাগরি' : 'Shop by Category'}
          </h1>
          <p className="text-sm text-content-tertiary mt-1.5 max-w-xl">
            {isBn
              ? 'আপনার পছন্দের প্রতিটি ক্যাটাগরির শতভাগ আসল গ্যাজেট ও হোম লিভিং পণ্য'
              : 'Explore all verified gadgets, mobile accessories, audio, cooling fans, and home living products with official warranty.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const catProducts = products.filter(
              (p) => p.mainCategorySlug === cat.slug || p.categorySlug === cat.slug || cat.children?.some((c) => c.slug === p.categorySlug)
            );
            return (
              <div
                key={cat.id}
                className="bg-canvas rounded-2xl border border-border p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-surface-brand-subtle text-content-brand flex items-center justify-center shadow-xs">
                      <CategoryIcon slug={cat.slug} className="w-8 h-8" weight="duotone" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-subtle text-content-secondary border border-border/60">
                      {catProducts.length} {isBn ? 'পণ্য' : 'Items'}
                    </span>
                  </div>

                  <Link href={`/categories/${cat.slug}`} className="group">
                    <h2 className="text-xl sm:text-2xl font-bold text-content-primary group-hover:text-content-brand transition-colors">
                      {isBn ? cat.nameBn || cat.name : cat.name}
                    </h2>
                  </Link>

                  {/* Subcategories list */}
                  {cat.children && cat.children.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cat.children.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/categories/${sub.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-surface-subtle hover:bg-surface-brand-subtle hover:text-content-brand text-content-secondary transition-colors border border-border/40"
                        >
                          <CategoryIcon slug={sub.slug} className="w-3.5 h-3.5 text-content-tertiary" weight="bold" />
                          <span>{isBn ? sub.nameBn || sub.name : sub.name}</span>
                          <span className="text-[10px] text-content-disabled font-normal">({sub.productCount})</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-xs sm:text-sm font-bold text-content-brand hover:underline flex items-center gap-1.5"
                  >
                    <span>{isBn ? 'সম্পূর্ণ ক্যাটাগরি দেখুন' : 'Explore Full Category'}</span>
                    <ArrowRight className="w-4 h-4" weight="bold" />
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
