'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronRight, ChevronLeft, ArrowRight, Timer, Flame, TrendingUp,
  Sparkles, Star, ShoppingBag, Zap, Shield, Truck, CreditCard
} from 'lucide-react';
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
          <span className="bg-brand-charcoal text-white text-sm font-bold px-1.5 py-0.5 rounded min-w-[28px] text-center tabular-nums">
            {String(val).padStart(2, '0')}
          </span>
          {label !== 's' && <span className="text-brand-charcoal font-bold">:</span>}
        </div>
      ))}
    </div>
  );
}

// ── Hero Banner Carousel ──
function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % heroBanners.length), 6000);
    return () => clearInterval(id);
  }, []);

  const banner = heroBanners[current];

  return (
    <section className="relative overflow-hidden">
      <div
        className={`bg-gradient-to-br ${banner.gradient} text-white transition-all duration-700`}
        style={{ minHeight: 'clamp(280px, 40vw, 480px)' }}
      >
        <div className="container-page h-full flex items-center py-12 md:py-20">
          <div className="max-w-xl animate-fade-in" key={banner.id}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {banner.titleEn}
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
              {banner.subtitleEn}
            </p>
            <Link
              href={banner.link}
              className="btn bg-white text-brand-charcoal hover:bg-neutral-100 font-semibold text-base px-8 py-3 rounded-xl
                         shadow-lg hover:shadow-xl transition-all duration-normal active:scale-[0.98]"
            >
              {banner.ctaEn}
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          {/* Decorative elements */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
            <div className="w-72 h-72 rounded-full bg-white/5 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-white/5 flex items-center justify-center">
                <ShoppingBag className="w-20 h-20 text-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-normal ${
                i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrent(c => (c - 1 + heroBanners.length) % heroBanners.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                     flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => setCurrent(c => (c + 1) % heroBanners.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                     flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
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
  accentColor = 'text-brand-blue',
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  accentColor?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-6 sm:mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className={`w-5 h-5 ${accentColor}`} />
          <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-brand-blue hover:text-brand-blue-hover flex items-center gap-1 transition-colors shrink-0"
        >
          View All <ChevronRight className="w-4 h-4" />
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
      {/* ── Hero Banner ── */}
      <HeroBanner />

      {/* ── Service Promise Bar ── */}
      <section className="bg-neutral-50 border-b border-neutral-100">
        <div className="container-page py-4">
          <div className="flex items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm overflow-x-auto no-scrollbar">
            {[
              { icon: Shield, text: 'Authentic Products' },
              { icon: Truck, text: 'Fast Nationwide Delivery' },
              { icon: CreditCard, text: 'Cash on Delivery' },
              { icon: Zap, text: 'Easy Returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-neutral-600 shrink-0">
                <Icon className="w-4 h-4 text-brand-blue" />
                <span className="font-medium whitespace-nowrap">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Shortcuts ── */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading icon={Sparkles} title="Shop by Category" subtitle="Explore our wide range of products" />
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-50 border border-neutral-100
                              flex items-center justify-center text-2xl sm:text-3xl
                              group-hover:bg-brand-blue-soft group-hover:border-brand-blue/20 group-hover:scale-105
                              transition-all duration-normal shadow-sm group-hover:shadow-md">
                {cat.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-neutral-700 mt-2.5 group-hover:text-brand-blue transition-colors line-clamp-2">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Flash Deals ── */}
      <section className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 border-y border-neutral-100">
        <div className="container-page py-8 sm:py-12">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-semantic-danger" />
                <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal">Flash Deals</h2>
              </div>
              <p className="text-sm text-neutral-500 mt-1">Hurry! Limited time offers</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                <Timer className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Ends in:</span>
              </div>
              <CountdownTimer endsAt={flashDeals[0]?.flashEndsAt || ''} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {flashDeals.map((deal) => (
              <Link key={deal.id} href={`/products/${deal.slug}`} className="card group bg-white">
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 product-image-placeholder">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        background: `linear-gradient(135deg, hsl(${deal.colorHue}, 35%, 92%) 0%, hsl(${deal.colorHue}, 45%, 82%) 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-neutral-300/60" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 badge-red font-semibold">
                    -20%
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-brand-blue transition-colors min-h-[2.5rem]">
                    {deal.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="price-current text-base text-semantic-danger">{formatBDT(deal.flashPrice)}</span>
                    <span className="price-original text-xs">{formatBDT(deal.price)}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-neutral-500 mb-1">
                      <span>{deal.claimed} sold</span>
                      <span>{deal.total - deal.claimed} left</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-semantic-danger to-orange-400 rounded-full transition-all duration-slow"
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

      {/* ── Featured Products ── */}
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

      {/* ── Brands Spotlight ── */}
      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="container-page py-8 sm:py-12">
          <SectionHeading icon={Sparkles} title="Featured Brands" subtitle="Shop from trusted brands" />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/categories/electronics?brand=${brand.slug}`}
                className="group flex flex-col items-center"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-neutral-200 bg-white
                              flex items-center justify-center
                              group-hover:border-brand-blue/30 group-hover:shadow-md group-hover:scale-105
                              transition-all duration-normal"
                >
                  <span
                    className="text-sm sm:text-base font-bold"
                    style={{ color: `hsl(${brand.colorHue}, 50%, 35%)` }}
                  >
                    {brand.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-neutral-700 mt-2 group-hover:text-brand-blue transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          icon={Zap}
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

      {/* ── Best Sellers ── */}
      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="container-page py-8 sm:py-12">
          <SectionHeading
            icon={TrendingUp}
            title="Best Sellers"
            subtitle="Most loved by our customers"
            viewAllHref="/search?sort=popularity"
            accentColor="text-semantic-success"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {getBestSellers().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── All Products ── */}
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

      {/* ── Newsletter / CTA ── */}
      <section className="bg-brand-charcoal text-white">
        <div className="container-page py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Stay Connected with Kenakata</h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Get exclusive deals, new arrivals, and special offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email or phone"
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-neutral-400
                         focus:bg-white/15 focus:border-brand-blue focus:ring-0 transition-all text-sm"
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
