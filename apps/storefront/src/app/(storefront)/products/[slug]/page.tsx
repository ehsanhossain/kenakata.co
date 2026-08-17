'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star, Heart, ShareNetwork, ShoppingCart, Lightning, CaretRight, CaretDown, ShieldCheck, Truck, ArrowCounterClockwise, CreditCard, Minus, Plus, Check, MapPin, ShoppingBag, Storefront
} from '@phosphor-icons/react';
import ProductCard from '@/components/ProductCard';
import { getProduct, products, formatBDT, calcDiscount, type Product, type Variant } from '@/lib/mock-data';

function ProductGallery({ product }: { product: Product }) {
  const images = product.images && product.images.length > 0 ? product.images : [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasError, setHasError] = useState<Record<number, boolean>>({});

  const discount = calcDiscount(product.price, product.compareAt);
  const currentImage = images[selectedIndex] || '';

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-neutral-50 border border-border/80 shadow-xs">
        {currentImage && !hasError[selectedIndex] ? (
          <img
            src={currentImage}
            alt={`${product.title} view ${selectedIndex + 1}`}
            className="w-full h-full object-contain object-center transition-all duration-300 p-2 sm:p-4"
            onError={() => setHasError(prev => ({ ...prev, [selectedIndex]: true }))}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface-subtle">
            <ShoppingBag className="w-20 h-20 text-content-tertiary/40" />
            <span className="text-xs text-content-tertiary mt-2">No image available</span>
          </div>
        )}

        {discount && (
          <span className="absolute top-4 left-4 badge-red font-bold text-sm px-3 py-1 shadow-md rounded-lg">
            -{discount}% OFF
          </span>
        )}

        {/* Verified Badge Overlay */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-xs border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" weight="fill" />
            Verified Merchant
          </span>
        </div>

        {/* Mobile Gallery position indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:hidden bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === selectedIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`aspect-square rounded-xl overflow-hidden bg-neutral-50 border-2 transition-all p-1
                ${selectedIndex === i ? 'border-border-brand shadow-sm ring-2 ring-brand-blue/20' : 'border-border/60 hover:border-border'}`}
            >
              {!hasError[i] ? (
                <img
                  src={img}
                  alt={`${product.title} thumb ${i + 1}`}
                  className="w-full h-full object-cover object-center rounded-lg"
                  onError={() => setHasError(prev => ({ ...prev, [i]: true }))}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-subtle">
                  <ShoppingBag className="w-4 h-4 text-content-disabled" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProduct(slug);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(product?.variants[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [showCartConfirm, setShowCartConfirm] = useState(false);

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-content-secondary mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-content-primary mb-2">Product not found</h1>
        <p className="text-sm text-content-tertiary mb-6">The product you&apos;re looking for doesn&apos;t exist or has been updated.</p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const currentCompareAt = selectedVariant?.compareAt || product.compareAt;
  const discount = calcDiscount(currentPrice, currentCompareAt);
  const relatedProducts = products
    .filter(p => (p.categorySlug === product.categorySlug || p.mainCategorySlug === product.mainCategorySlug) && p.id !== product.id)
    .slice(0, 5);

  const handleAddToCart = () => {
    setShowCartConfirm(true);
    setTimeout(() => setShowCartConfirm(false), 3000);
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="bg-surface-subtle border-b border-border">
        <div className="container-page py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-content-tertiary overflow-x-auto no-scrollbar">
            <Link href="/" className="font-medium hover:text-content-brand hover:underline transition-colors shrink-0">
              Home
            </Link>
            <CaretRight className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
            <Link href="/categories" className="font-medium hover:text-content-brand hover:underline transition-colors shrink-0">
              Categories
            </Link>
            {product.mainCategorySlug && product.mainCategorySlug !== product.categorySlug && (
              <>
                <CaretRight className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                <Link
                  href={`/categories/${product.mainCategorySlug}`}
                  className="font-medium hover:text-content-brand hover:underline transition-colors shrink-0"
                >
                  {product.mainCategoryName || 'Gadgets'}
                </Link>
              </>
            )}
            <CaretRight className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
            <Link
              href={`/categories/${product.categorySlug}`}
              className="font-medium hover:text-content-brand hover:underline transition-colors shrink-0"
            >
              {product.categoryName}
            </Link>
            <CaretRight className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
            <span className="text-content-primary font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-page py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Left: Gallery ── */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* ── Right: Purchase Panel ── */}
          <div className="lg:sticky lg:top-[140px] lg:self-start space-y-5">
            {/* Brand & Category */}
            <div className="flex items-center justify-between">
              <Link
                href={`/categories/${product.categorySlug}?brand=${product.brandSlug}`}
                className="text-sm font-semibold text-content-brand hover:underline uppercase tracking-wider"
              >
                {product.brand}
              </Link>
              <span className="badge-subtle text-xs">
                {product.categoryName}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-content-primary leading-snug">
              {product.title}
            </h1>

            {/* Rating & SKU */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-warning' : 'text-neutral-300'}`} weight="fill" />
                ))}
              </div>
              <span className="font-semibold text-content-primary">{product.rating}</span>
              <span className="text-content-disabled">({product.reviewCount} reviews)</span>
              <span className="text-neutral-300">|</span>
              <span className="text-content-tertiary">SKU: <strong className="text-content-secondary">{product.sku}</strong></span>
            </div>

            {/* Verified Merchant & Quality Guarantee */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <ShieldCheck className="w-4 h-4" weight="fill" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-900">
                    {(process.env.NEXT_PUBLIC_SHOW_MERCHANT_NAME === 'true' && product.merchant?.name)
                      ? `Sold by ${product.merchant.name}`
                      : '100% Genuine & Authentic Item'}
                  </p>
                  <p className="text-[11px] text-emerald-700">Official Brand Warranty • Quality Inspected by Kenakata</p>
                </div>
              </div>
              <span className="badge-green text-xs font-semibold px-2.5 py-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" weight="fill" />
                Verified
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-surface-subtle rounded-xl p-4 border border-border">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-content-brand tabular-nums">{formatBDT(currentPrice)}</span>
                {currentCompareAt && (
                  <span className="text-lg text-content-disabled line-through tabular-nums">{formatBDT(currentCompareAt)}</span>
                )}
                {discount && (
                  <span className="badge-red text-sm font-bold px-2 py-0.5">-{discount}%</span>
                )}
              </div>
              {discount && currentCompareAt && (
                <p className="text-sm text-emerald-700 font-semibold mt-1">
                  You save {formatBDT(currentCompareAt - currentPrice)}
                </p>
              )}
              <p className="text-xs text-content-tertiary mt-1">Price inclusive of all taxes • Cash on Delivery available</p>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium text-content-primary mb-2">Quantity</p>
              <div className="flex items-center gap-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-l-lg border border-border flex items-center justify-center hover:bg-surface-subtle transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-14 h-10 border-y border-border flex items-center justify-center text-sm font-medium tabular-nums">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 rounded-r-lg border border-border flex items-center justify-center hover:bg-surface-subtle transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {product.stockQty <= 10 && (
                  <span className="ml-3 text-sm text-warning font-medium">Only {product.stockQty} left</span>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="btn-secondary flex-1 py-3 text-base font-semibold rounded-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="btn-primary flex-1 py-3 text-base font-semibold rounded-xl">
                <Lightning className="w-5 h-5" />
                Buy Now
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-1">
              <button className="flex items-center gap-1.5 text-sm text-content-secondary hover:text-danger transition-colors">
                <Heart className="w-4 h-4" /> Add to Wishlist
              </button>
              <button className="flex items-center gap-1.5 text-sm text-content-secondary hover:text-content-brand transition-colors">
                <ShareNetwork className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Delivery Estimator */}
            <div className="bg-surface-subtle rounded-xl p-4 border border-border space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-content-primary">
                <MapPin className="w-4 h-4 text-content-brand" />
                Delivery to Bangladesh (64 Districts)
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-medium text-content-primary">Standard Doorstep Delivery: ৳60 Inside Dhaka / ৳120 Outside</p>
                  <p className="text-content-tertiary text-xs">Estimated 2-4 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="w-4 h-4 text-content-brand shrink-0" />
                <span className="text-content-secondary">Cash on Delivery & bKash / Nagad Available</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                { icon: ShieldCheck, text: '100% Genuine Product', color: 'text-emerald-600' },
                { icon: ArrowCounterClockwise, text: product.returnPolicy, color: 'text-content-brand' },
                { icon: ShieldCheck, text: product.warranty, color: 'text-content-brand' },
                { icon: CreditCard, text: 'Secure Checkout', color: 'text-emerald-600' },
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-content-secondary">
                  <Icon className={`w-4 h-4 ${color} shrink-0`} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Specs / Reviews ── */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex gap-0 border-b border-border overflow-x-auto no-scrollbar">
            {([
              { key: 'description' as const, label: 'Description' },
              { key: 'specs' as const, label: 'Specifications' },
              { key: 'reviews' as const, label: `Reviews (${product.reviewCount})` },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-border-brand text-content-brand'
                    : 'border-transparent text-content-tertiary hover:text-content-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 max-w-3xl">
            {activeTab === 'description' && (
              <div className="animate-fade-in space-y-6">
                {/* Highlights */}
                {product.highlights && product.highlights.length > 0 && (
                  <div className="bg-surface-brand-subtle/50 rounded-xl p-5 border border-border-brand/20">
                    <h3 className="text-sm font-bold text-content-primary mb-3">Key Highlights</h3>
                    <ul className="space-y-2">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-content-secondary">
                          <Check className="w-4 h-4 text-content-brand mt-0.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="text-sm text-content-secondary leading-relaxed whitespace-pre-line space-y-2">
                  {product.description}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="animate-fade-in">
                <table className="w-full border border-border rounded-xl overflow-hidden">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-surface-subtle' : 'bg-white'}>
                        <td className="px-4 py-3 text-sm font-medium text-content-secondary w-1/3 border-b border-border/50">{key}</td>
                        <td className="px-4 py-3 text-sm text-content-primary font-medium border-b border-border/50">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in space-y-6">
                {/* Rating Summary */}
                <div className="flex items-center gap-8 bg-surface-subtle rounded-xl p-5">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-content-primary">{product.rating}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-warning' : 'text-neutral-300'}`} weight="fill" />
                      ))}
                    </div>
                    <p className="text-xs text-content-tertiary mt-1">{product.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map(stars => {
                      const pct = stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : stars === 2 ? 1 : 1;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-content-tertiary w-6 text-right">{stars}★</span>
                          <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div className="h-full bg-warning rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-content-disabled w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample reviews */}
                {[
                  { name: 'Tanvir Ahmed', rating: 5, date: '1 week ago', text: '100% original product with official packaging. Fast delivery and exactly as described!' },
                  { name: 'Sadia Rahman', rating: 5, date: '2 weeks ago', text: 'Very impressed with the quality and packaging. Highly recommended.' },
                  { name: 'Mahmudul Hasan', rating: 4, date: '3 weeks ago', text: 'Good quality for the price. Works smoothly without any issues.' },
                ].map((review, i) => (
                  <div key={i} className="border-b border-border pb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-surface-brand-subtle flex items-center justify-center font-bold text-xs text-content-brand">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-content-primary">{review.name}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-amber-400 text-warning' : 'text-neutral-300'}`} weight="fill" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-content-disabled">{review.date}</span>
                    </div>
                    <p className="text-sm text-content-secondary leading-relaxed">{review.text}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="badge-green text-[10px]">Verified Purchase</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-xl font-bold text-content-primary mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Sticky Mobile Purchase Bar ── */}
      <div className="fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-border p-3 flex items-center gap-3 lg:hidden safe-bottom shadow-lg">
        <div className="flex-1">
          <p className="text-lg font-bold text-content-primary tabular-nums">{formatBDT(currentPrice)}</p>
          {discount && <p className="text-xs text-emerald-600 font-semibold">-{discount}% off</p>}
        </div>
        <button onClick={handleAddToCart} className="btn-secondary py-2.5 px-4 text-sm rounded-lg">
          <ShoppingCart className="w-4 h-4" /> Cart
        </button>
        <button className="btn-primary py-2.5 px-6 text-sm rounded-lg">
          <Lightning className="w-4 h-4" /> Buy Now
        </button>
      </div>

      {/* Cart confirmation toast */}
      {showCartConfirm && (
        <div className="fixed top-20 right-4 z-50 bg-white border border-border rounded-xl shadow-md p-4 flex items-center gap-3 animate-slide-up max-w-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-content-primary">Added to cart</p>
            <p className="text-xs text-content-tertiary truncate">{product.title}</p>
          </div>
          <Link href="/cart" className="text-sm font-medium text-content-brand hover:underline shrink-0">
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
}
