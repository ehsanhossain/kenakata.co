'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CaretRight, CaretLeft, ArrowRight, Timer, Fire, TrendUp, Sparkle, Star, ShoppingBag, Lightning, ShieldCheck, Truck, CreditCard
} from '@phosphor-icons/react';
import ProductCard from '@/components/ProductCard';
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
          <span className="bg-surface-inverse text-content-inverse text-sm font-bold px-1.5 py-0.5 rounded min-w-[28px] text-center tabular-nums">
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
    <section className="relative overflow-hidden">
      <div className="relative w-full" style={{ minHeight: 'clamp(200px, 30vw, 400px)' }}>
        <Image
          src="/banner.png"
          alt="Kenakata - Bangladesh's Trusted Online Storefront"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--k-charcoal-900)]/60 via-transparent to-transparent" />
        <div className="container-page relative h-full flex items-center py-12 md:py-20">
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
              Your Trusted Storefront
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
              Discover authentic products, fast delivery, and the best prices across Bangladesh.
            </p>
            <Link
              href="/categories/electronics"
              className="btn bg-white text-content-primary hover:bg-white/90 font-semibold text-base px-8 py-3 rounded-xl
                         shadow-lg hover:shadow-xl transition-all duration-normal active:scale-[0.98]"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 ml-1" weight="bold" />
            </Link>
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
        {subtitle && <p className="text-sm text-content-tertiary mt-1">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-content-brand hover:underline flex items-center gap-1 transition-colors shrink-0"
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
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Service Promise Bar */}
      <section className="bg-surface-subtle border-b border-border">
        <div className="container-page py-4">
          <div className="flex items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm overflow-x-auto no-scrollbar">
            {[
              { icon: ShieldCheck, text: 'Authentic Products' },
              { icon: Truck, text: 'Fast Nationwide Delivery' },
              { icon: CreditCard, text: 'Cash on Delivery' },
              { icon: Lightning, text: 'Easy Returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-content-secondary shrink-0">
                <Icon className="w-4 h-4 text-icon-brand" weight="bold" />
                <span className="font-medium whitespace-nowrap">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Shortcuts */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading icon={Sparkle} title="Shop by Category" subtitle="Explore our wide range of products" />
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-subtle border border-border
                              flex items-center justify-center text-2xl sm:text-3xl
                              group-hover:bg-surface-brand-subtle group-hover:border-border-brand/20 group-hover:scale-105
                              transition-all duration-normal shadow-sm group-hover:shadow-md">
                <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-icon-secondary group-hover:text-icon-brand transition-colors" weight="duotone" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-content-secondary mt-2.5 group-hover:text-content-brand transition-colors line-clamp-2">
                {cat.name}
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
              <p className="text-sm text-content-tertiary mt-1">Hurry! Limited time offers</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-sm text-content-secondary">
                <Timer className="w-4 h-4" weight="bold" />
                <span className="hidden sm:inline font-medium">Ends in:</span>
              </div>
              <CountdownTimer endsAt={flashDeals[0]?.flashEndsAt || ''} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {flashDeals.map((deal) => (
              <Link key={deal.id} href={`/products/${deal.slug}`} className="card group bg-canvas">
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 product-image-placeholder">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        background: `linear-gradient(135deg, hsl(${deal.colorHue}, 35%, 92%) 0%, hsl(${deal.colorHue}, 45%, 82%) 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-content-disabled opacity-60" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 badge-red font-semibold">
                    -20%
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-content-brand transition-colors min-h-[2.5rem]">
                    {deal.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="price-current text-base text-danger">{formatBDT(deal.flashPrice)}</span>
                    <span className="price-original text-xs">{formatBDT(deal.price)}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-content-tertiary mb-1">
                      <span>{deal.claimed} sold</span>
                      <span>{deal.total - deal.claimed} left</span>
                    </div>
                    <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-danger to-[var(--k-orange-400)] rounded-full transition-all duration-slow"
                        style={{ width: `${(deal.claimed / deal.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          icon={Star}
          title="Featured Products"
          subtitle="Handpicked for you"
          viewAllHref="/categories/electronics"
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
          <SectionHeading icon={Sparkle} title="Featured Brands" subtitle="Shop from trusted brands" />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/categories/electronics?brand=${brand.slug}`}
                className="group flex flex-col items-center"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-border bg-canvas
                              flex items-center justify-center
                              group-hover:border-border-brand/30 group-hover:shadow-md group-hover:scale-105
                              transition-all duration-normal"
                >
                  <span
                    className="text-sm sm:text-base font-bold"
                    style={{ color: `hsl(${brand.colorHue}, 50%, 35%)` }}
                  >
                    {brand.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-content-secondary mt-2 group-hover:text-content-brand transition-colors">
                  {brand.name}
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
          subtitle="Fresh products just landed"
          viewAllHref="/search?sort=newest"
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
            subtitle="Most loved by our customers"
            viewAllHref="/search?sort=popularity"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {getBestSellers().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          icon={ShoppingBag}
          title="Just For You"
          subtitle="Explore our full collection"
          viewAllHref="/search"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-surface-inverse text-content-inverse">
        <div className="container-page py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Stay Connected with Kenakata</h2>
          <p className="text-white/50 max-w-md mx-auto mb-8">
            Get exclusive deals, new arrivals, and special offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email or phone"
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40
                         focus:bg-white/15 focus:border-[var(--k-orange-500)] focus:ring-0 transition-all text-sm"
            />
            <button className="btn-primary rounded-xl px-8 shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
