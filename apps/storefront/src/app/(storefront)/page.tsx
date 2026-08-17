'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CaretRight, CaretLeft, ArrowRight, Timer, Fire, TrendUp, Sparkle, Star, ShoppingBag, Lightning, ShieldCheck, Truck, CreditCard, Storefront
} from '@phosphor-icons/react';
import ProductCard from '@/components/ProductCard';
import CategoryIcon from '@/components/CategoryIcon';
import {
  categories, brands, products, flashDeals, heroBanners,
  getFeaturedProducts, getNewProducts, getBestSellers, formatBDT
} from '@/lib/mock-data';

// ── Countdown Timer Component ──
function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return (
    <div className="flex items-center gap-1">
      {[
        { val: timeLeft.h, label: 'h' },
        { val: timeLeft.m, label: 'm' },
        { val: timeLeft.s, label: 's' },
      ].map(({ val, label }) => (
        <div key={label} className="flex items-center gap-0.5">
          <span className="bg-surface-inverse text-content-inverse text-xs sm:text-sm font-bold px-2 py-0.5 rounded min-w-[28px] text-center tabular-nums shadow-xs">
            {String(val).padStart(2, '0')}
          </span>
          {label !== 's' && <span className="text-content-primary font-bold">:</span>}
        </div>
      ))}
    </div>
  );
}

// ── Hero Banner ──
function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[var(--k-orange-700)] via-[var(--k-orange-600)] to-[var(--k-orange-500)] text-white">
      <div className="relative w-full min-h-[360px] sm:min-h-[420px] flex items-center">
        {/* Background Image / Banner */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner.png"
            alt="Kenakata Storefront"
            fill
            className="object-cover object-center opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--k-orange-950)]/75 via-[var(--k-orange-700)]/80 to-[var(--k-orange-500)]/30" />
        </div>

        <div className="container-page relative z-10 py-12 md:py-20">
          <div className="max-w-xl animate-fade-in space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 text-xs font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white" weight="fill" />
              100% Genuine &amp; Verified Products
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-sm">
              Premium Gadgets &amp; Home Living
            </h1>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
              Explore 74+ verified gadgets, earphones, rechargeable cooling fans, security cameras, and 3D bed sheets with official warranty.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/categories/gadgets"
                className="btn bg-white text-[var(--k-orange-700)] hover:bg-white/95 font-bold text-sm sm:text-base px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-normal active:scale-[0.98]"
              >
                Shop Gadgets
                <ArrowRight className="w-4 h-4 ml-1.5" weight="bold" />
              </Link>
              <Link
                href="/categories/home-appliance"
                className="btn bg-white/20 backdrop-blur-md text-white border border-white/35 hover:bg-white/30 font-semibold text-sm sm:text-base px-6 py-3 rounded-xl transition-all"
              >
                Home Living
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section Heading ──
function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  viewAllHref,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-6 sm:mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-5 h-5 text-icon-brand" weight="bold" />
          <h2 className="text-xl sm:text-2xl font-bold text-content-primary">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-content-tertiary mt-0.5">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm font-semibold text-content-brand hover:underline flex items-center gap-1 transition-colors shrink-0"
        >
          View All <CaretRight className="w-4 h-4" weight="bold" />
        </Link>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// HOMEPAGE
// ══════════════════════════════════════════════════════
export default function HomePage() {
  // Extract all subcategories for direct shortcut grid
  const allSubcategories = useMemo(() => {
    return categories.flatMap(cat => cat.children || []);
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Service Promise Bar */}
      <section className="bg-surface-subtle border-b border-border">
        <div className="container-page py-3.5">
          <div className="flex items-center justify-between gap-6 sm:gap-12 text-xs sm:text-sm overflow-x-auto no-scrollbar">
            {[
              { icon: ShieldCheck, text: '100% Genuine & Verified Products', highlight: true },
              { icon: Truck, text: 'Fast Nationwide Delivery' },
              { icon: CreditCard, text: 'Cash on Delivery Available' },
              { icon: Lightning, text: '7 Days Return Guarantee' },
            ].map(({ icon: Icon, text, highlight }) => (
              <div key={text} className={`flex items-center gap-2 shrink-0 ${highlight ? 'text-emerald-700 font-bold' : 'text-content-secondary font-medium'}`}>
                <Icon className={`w-4 h-4 ${highlight ? 'text-emerald-600' : 'text-icon-brand'}`} weight="bold" />
                <span className="whitespace-nowrap">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Shortcuts */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          icon={Sparkle}
          title="Shop by Category"
          subtitle="Explore all verified gadgets and home essentials"
          viewAllHref="/categories"
        />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4">
          {allSubcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/categories/${sub.slug}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-border/80 hover:border-border-brand hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-surface-brand-subtle text-content-brand flex items-center justify-center group-hover:scale-110 group-hover:bg-action-primary/10 transition-all duration-fast">
                <CategoryIcon slug={sub.slug} className="w-7 h-7" weight="duotone" />
              </div>
              <span className="text-xs font-semibold text-content-primary mt-2.5 group-hover:text-content-brand transition-colors line-clamp-2 leading-tight">
                {sub.name}
              </span>
              <span className="text-[10px] text-content-disabled mt-0.5">
                {sub.productCount} items
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="bg-surface-brand-subtle border-y border-border">
        <div className="container-page py-8 sm:py-12">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Fire className="w-5 h-5 text-danger" weight="fill" />
                <h2 className="text-xl sm:text-2xl font-bold text-content-primary">Flash Deals</h2>
              </div>
              <p className="text-sm text-content-tertiary mt-0.5">Limited time wholesale-to-retail special pricing</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-content-secondary font-medium">
                <Timer className="w-4 h-4" weight="bold" />
                <span className="hidden sm:inline">Ends in:</span>
              </div>
              <CountdownTimer endsAt={flashDeals[0]?.flashEndsAt || ''} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {flashDeals.map((deal) => (
              <ProductCard key={deal.id} product={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          icon={Star}
          title="Featured Products"
          subtitle="Top picked gadgets & accessories"
          viewAllHref="/categories/gadgets"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
          {getFeaturedProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brands Spotlight */}
      <section className="bg-surface-subtle border-y border-border">
        <div className="container-page py-8 sm:py-12">
          <SectionHeading icon={Sparkle} title="Featured Brands" subtitle="Authentic products from top manufacturers" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {brands.slice(0, 16).map((brand) => (
              <Link
                key={brand.id}
                href={`/categories/gadgets?brand=${brand.slug}`}
                className="group flex flex-col items-center p-3 rounded-2xl bg-white border border-border hover:border-border-brand hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-subtle flex items-center justify-center font-bold text-sm text-content-brand group-hover:scale-105 transition-transform">
                  {brand.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-content-primary mt-2 group-hover:text-content-brand transition-colors truncate max-w-full">
                  {brand.name}
                </span>
                <span className="text-[10px] text-content-disabled">
                  {brand.productCount} items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          icon={Lightning}
          title="New Arrivals"
          subtitle="Fresh gadgets just added to catalog"
          viewAllHref="/categories/gadgets"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
          {getNewProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-surface-subtle border-y border-border">
        <div className="container-page py-8 sm:py-12">
          <SectionHeading
            icon={TrendUp}
            title="Best Sellers"
            subtitle="Most ordered products by customers"
            viewAllHref="/categories/gadgets"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {getBestSellers().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Full Catalog */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          icon={ShoppingBag}
          title="All Products"
          subtitle="Explore our curated collection of verified gadgets & home essentials"
          viewAllHref="/search"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
          {products.slice(0, 20).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length > 20 && (
           <div className="text-center mt-8">
            <Link
              href="/search"
              className="btn-primary px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2"
            >
              Browse All {products.length} Products
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
