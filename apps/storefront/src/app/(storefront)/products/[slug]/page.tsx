'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Star, Heart, Share2, ShoppingCart, Zap, ChevronRight, ChevronDown,
  ShieldCheck, Truck, RotateCcw, CreditCard, Minus, Plus, Check,
  MapPin, ShoppingBag
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProduct, products, formatBDT, calcDiscount, type Product, type Variant } from '@/lib/mock-data';

function GalleryPlaceholder({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const thumbnails = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-xl overflow-hidden product-image-placeholder">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: `linear-gradient(135deg, hsl(${product.colorHue}, 35%, 92%) 0%, hsl(${product.colorHue}, 45%, 80%) 100%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag className="w-24 h-24 text-neutral-300/40" />
        </div>
        {calcDiscount(product.price, product.compareAt) && (
          <span className="absolute top-4 left-4 badge-red font-semibold text-sm px-3 py-1">
            -{calcDiscount(product.price, product.compareAt)}%
          </span>
        )}
        {/* Gallery position indicator (mobile) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:hidden">
          {thumbnails.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i === selected ? 'bg-brand-blue' : 'bg-white/60'}`}
            />
          ))}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="hidden sm:grid grid-cols-4 gap-2">
        {thumbnails.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`aspect-square rounded-lg overflow-hidden product-image-placeholder border-2 transition-all
              ${selected === i ? 'border-brand-blue shadow-focus' : 'border-transparent hover:border-neutral-200'}`}
          >
            <div
              className="w-full h-full opacity-10"
              style={{ background: `hsl(${product.colorHue + i * 20}, 30%, 88%)` }}
            />
          </button>
        ))}
      </div>
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
        <ShoppingBag className="w-16 h-16 text-neutral-200 mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-brand-charcoal mb-2">Product not found</h1>
        <p className="text-sm text-neutral-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const currentCompareAt = selectedVariant?.compareAt || product.compareAt;
  const discount = calcDiscount(currentPrice, currentCompareAt);
  const relatedProducts = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 5);

  const handleAddToCart = () => {
    setShowCartConfirm(true);
    setTimeout(() => setShowCartConfirm(false), 3000);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="container-page py-3">
          <nav className="flex items-center gap-2 text-sm text-neutral-500 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-brand-blue transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/categories/${product.categorySlug}`} className="hover:text-brand-blue transition-colors shrink-0">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-brand-charcoal font-medium truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-page py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Left: Gallery ── */}
          <div>
            <GalleryPlaceholder product={product} />
          </div>

          {/* ── Right: Purchase Panel ── */}
          <div className="lg:sticky lg:top-[140px] lg:self-start space-y-6">
            {/* Brand */}
            <Link href={`/categories/${product.categorySlug}?brand=${product.brandSlug}`}
              className="text-sm font-medium text-brand-blue hover:text-brand-blue-hover transition-colors">
              {product.brand}
            </Link>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-brand-charcoal leading-tight -mt-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 -mt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-brand-charcoal">{product.rating}</span>
              <span className="text-sm text-neutral-400">({product.reviewCount} reviews)</span>
              <span className="text-neutral-200">|</span>
              <span className="text-sm text-neutral-500">SKU: {product.sku}</span>
            </div>

            {/* Price */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-brand-charcoal tabular-nums">{formatBDT(currentPrice)}</span>
                {currentCompareAt && (
                  <span className="text-lg text-neutral-400 line-through tabular-nums">{formatBDT(currentCompareAt)}</span>
                )}
                {discount && (
                  <span className="badge-red text-sm font-semibold">-{discount}%</span>
                )}
              </div>
              {discount && currentCompareAt && (
                <p className="text-sm text-semantic-success font-medium mt-1">
                  You save {formatBDT(currentCompareAt - currentPrice)}
                </p>
              )}
              <p className="text-xs text-neutral-500 mt-1">Price inclusive of all taxes</p>
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="space-y-4">
                {Object.keys(product.variants[0].optionValues).map(optionName => {
                  const uniqueValues = [...new Set(product.variants.map(v => v.optionValues[optionName]))];
                  return (
                    <div key={optionName}>
                      <p className="text-sm font-medium text-brand-charcoal mb-2">
                        {optionName}: <span className="text-neutral-500">{selectedVariant?.optionValues[optionName]}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {uniqueValues.map(val => {
                          const variant = product.variants.find(v => v.optionValues[optionName] === val);
                          const isSelected = selectedVariant?.optionValues[optionName] === val;
                          return (
                            <button
                              key={val}
                              onClick={() => variant && setSelectedVariant(variant)}
                              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-fast
                                ${isSelected
                                  ? 'border-brand-blue bg-brand-blue-soft text-brand-blue shadow-focus'
                                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                                }
                                ${!variant?.inStock ? 'opacity-40 cursor-not-allowed line-through' : ''}
                              `}
                              disabled={!variant?.inStock}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium text-brand-charcoal mb-2">Quantity</p>
              <div className="flex items-center gap-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-l-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-14 h-10 border-y border-neutral-200 flex items-center justify-center text-sm font-medium tabular-nums">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 rounded-r-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {product.stockQty <= 10 && (
                  <span className="ml-3 text-sm text-semantic-warning font-medium">Only {product.stockQty} left</span>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-secondary flex-1 py-3 text-base font-semibold rounded-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="btn-primary flex-1 py-3 text-base font-semibold rounded-xl">
                <Zap className="w-5 h-5" />
                Buy Now
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2">
              <button className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-semantic-danger transition-colors">
                <Heart className="w-4 h-4" /> Add to Wishlist
              </button>
              <button className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-brand-blue transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Delivery Estimator */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-brand-charcoal">
                <MapPin className="w-4 h-4 text-brand-blue" />
                Deliver to Dhaka
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-semantic-success shrink-0" />
                <div>
                  <p className="font-medium text-brand-charcoal">Standard Delivery: ৳60</p>
                  <p className="text-neutral-500 text-xs">Estimated 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="w-4 h-4 text-brand-blue shrink-0" />
                <span className="text-neutral-600">Cash on Delivery available</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, text: 'Authentic Product', color: 'text-semantic-success' },
                { icon: RotateCcw, text: product.returnPolicy, color: 'text-brand-blue' },
                ...(product.warranty !== 'N/A' ? [{ icon: ShieldCheck, text: product.warranty, color: 'text-brand-blue' }] : []),
                { icon: CreditCard, text: 'Secure Payment', color: 'text-semantic-success' },
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-600">
                  <Icon className={`w-4 h-4 ${color} shrink-0`} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Specs / Reviews ── */}
        <div className="mt-12 border-t border-neutral-100 pt-8">
          <div className="flex gap-0 border-b border-neutral-200 overflow-x-auto no-scrollbar">
            {([
              { key: 'description' as const, label: 'Description' },
              { key: 'specs' as const, label: 'Specifications' },
              { key: 'reviews' as const, label: `Reviews (${product.reviewCount})` },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-brand-blue text-brand-blue'
                    : 'border-transparent text-neutral-500 hover:text-brand-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 max-w-reading">
            {activeTab === 'description' && (
              <div className="animate-fade-in space-y-4">
                {/* Highlights */}
                <div className="bg-brand-blue-soft/50 rounded-xl p-5 mb-6">
                  <h3 className="text-sm font-semibold text-brand-charcoal mb-3">Key Highlights</h3>
                  <ul className="space-y-2">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="animate-fade-in">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                        <td className="px-4 py-3 text-sm font-medium text-neutral-600 w-1/3">{key}</td>
                        <td className="px-4 py-3 text-sm text-brand-charcoal">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in space-y-6">
                {/* Rating Summary */}
                <div className="flex items-center gap-8 bg-neutral-50 rounded-xl p-5">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-brand-charcoal">{product.rating}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{product.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map(stars => {
                      const pct = stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : stars === 2 ? 3 : 2;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500 w-6 text-right">{stars}★</span>
                          <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-neutral-400 w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample reviews */}
                {[
                  { name: 'Rahim K.', rating: 5, date: '2 weeks ago', text: 'Excellent product! The quality is amazing and delivery was fast. Highly recommended for anyone looking for a premium experience.' },
                  { name: 'Fatima B.', rating: 4, date: '1 month ago', text: 'Very good product. The build quality is solid and it works perfectly. Would have given 5 stars but the packaging could be better.' },
                  { name: 'Kamal S.', rating: 5, date: '1 month ago', text: 'Great value for money. Exactly as described. The customer service was also very helpful when I had questions.' },
                ].map((review, i) => (
                  <div key={i} className="border-b border-neutral-100 pb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-blue-soft flex items-center justify-center">
                          <span className="text-xs font-semibold text-brand-blue">{review.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-brand-charcoal">{review.name}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400">{review.date}</span>
                    </div>
                    <p className="text-sm text-neutral-700 leading-relaxed">{review.text}</p>
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
          <section className="mt-12 border-t border-neutral-100 pt-8">
            <h2 className="text-xl font-bold text-brand-charcoal mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Sticky Mobile Purchase Bar ── */}
      <div className="fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-neutral-200 p-3 flex items-center gap-3 lg:hidden safe-bottom shadow-lg">
        <div className="flex-1">
          <p className="text-lg font-bold text-brand-charcoal tabular-nums">{formatBDT(currentPrice)}</p>
          {discount && <p className="text-xs text-semantic-success font-medium">-{discount}% off</p>}
        </div>
        <button onClick={handleAddToCart} className="btn-secondary py-2.5 px-4 text-sm rounded-lg">
          <ShoppingCart className="w-4 h-4" /> Cart
        </button>
        <button className="btn-primary py-2.5 px-6 text-sm rounded-lg">
          <Zap className="w-4 h-4" /> Buy Now
        </button>
      </div>

      {/* Cart confirmation toast */}
      {showCartConfirm && (
        <div className="fixed top-20 right-4 z-50 bg-white border border-neutral-200 rounded-xl shadow-md p-4 flex items-center gap-3 animate-slide-up max-w-sm">
          <div className="w-10 h-10 rounded-full bg-semantic-success-soft flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-semantic-success" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-brand-charcoal">Added to cart</p>
            <p className="text-xs text-neutral-500 truncate">{product.title}</p>
          </div>
          <Link href="/cart" className="text-sm font-medium text-brand-blue hover:text-brand-blue-hover shrink-0">
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
}
