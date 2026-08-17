'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart, Star, ShoppingBag, ShieldCheck
} from '@phosphor-icons/react';
import { type Product, formatBDT, calcDiscount } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
  variant?: 'standard' | 'compact' | 'horizontal';
}

export default function ProductCard({ product, variant = 'standard' }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const discount = calcDiscount(product.price, product.compareAt);
  const mainImage = product.images?.[0] || '';

  if (variant === 'horizontal') {
    return (
      <Link href={`/products/${product.slug}`} className="card group flex gap-4 p-3 hover:border-border-brand transition-all">
        {/* Image */}
        <div className="relative w-28 h-28 shrink-0 bg-neutral-50 rounded-lg overflow-hidden border border-border/50">
          {!imgError && mainImage ? (
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-subtle">
              <ShoppingBag className="w-8 h-8 text-content-disabled" />
            </div>
          )}
          {discount && (
            <span className="absolute top-1.5 left-1.5 badge-red text-[10px] py-0.5 px-1.5 rounded font-bold shadow-sm">
              -{discount}%
            </span>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <p className="text-xs font-semibold text-content-tertiary uppercase tracking-wider">{product.brand}</p>
              {product.merchant?.isVerified && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1 rounded">
                  <ShieldCheck className="w-3 h-3" weight="fill" />
                  Verified
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-content-primary line-clamp-2 group-hover:text-content-brand transition-colors">
              {product.title}
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="price-current text-base font-bold text-content-brand">{formatBDT(product.price)}</span>
            {product.compareAt && (
              <span className="price-original text-xs line-through text-content-disabled">{formatBDT(product.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="card group relative bg-white border border-border/70 rounded-xl overflow-hidden hover:shadow-lg hover:border-border-brand/50 transition-all duration-200">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className={`relative overflow-hidden bg-neutral-50 border-b border-border/40 ${variant === 'compact' ? 'aspect-square' : 'aspect-[4/5]'}`}>
          {!imgError && mainImage ? (
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-subtle">
              <ShoppingBag className="w-12 h-12 text-content-disabled opacity-60" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {discount && (
              <span className="badge-red text-[11px] font-bold px-2 py-0.5 shadow-sm rounded">
                -{discount}%
              </span>
            )}
            {product.isNew && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                NEW
              </span>
            )}
          </div>

          {/* Verified Merchant Badge */}
          <div className="absolute top-2.5 right-12 z-10">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-full shadow-xs border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" weight="fill" />
              Verified
            </span>
          </div>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 backdrop-blur-xs">
              <span className="bg-surface-inverse text-content-inverse text-xs font-semibold px-3 py-1.5 rounded-md shadow">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-4">
          {/* Brand & Category */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <p className="text-[11px] text-content-tertiary uppercase tracking-wider font-semibold truncate">
              {product.brand}
            </p>
            <span className="text-[10px] text-content-disabled truncate">
              {product.categoryName}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-content-primary line-clamp-2 leading-snug mb-2 group-hover:text-content-brand transition-colors duration-fast min-h-[2.5rem]">
            {product.title}
          </h3>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-amber-500" weight="fill" />
                <span className="text-xs font-bold text-content-primary">{product.rating}</span>
              </div>
              <span className="text-xs text-content-disabled">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="price-current text-lg font-bold text-content-brand tabular-nums">{formatBDT(product.price)}</span>
            {product.compareAt && (
              <span className="price-original text-xs line-through text-content-disabled tabular-nums">{formatBDT(product.compareAt)}</span>
            )}
          </div>
          {discount && product.compareAt && (
            <p className="text-[11px] font-medium text-emerald-600 mt-1">
              Save {formatBDT(product.compareAt - product.price)}
            </p>
          )}

          {/* Stock qualifier */}
          {product.inStock && product.stockQty <= 10 && (
            <p className="text-xs text-amber-600 mt-1.5 font-medium">
              Only {product.stockQty} left in stock
            </p>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
                   flex items-center justify-center shadow-xs border border-border/50
                   hover:bg-white hover:shadow-md hover:scale-110
                   transition-all duration-fast group/wish"
        aria-label={`Add ${product.title} to wishlist`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Heart className="w-4 h-4 text-content-disabled group-hover/wish:text-danger transition-colors" />
      </button>
    </div>
  );
}
