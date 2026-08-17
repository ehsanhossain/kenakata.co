'use client';

import Link from 'next/link';
import {
  Heart, Star, ShoppingBag
} from '@phosphor-icons/react';
import { type Product, formatBDT, calcDiscount } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
  variant?: 'standard' | 'compact' | 'horizontal';
}

export default function ProductCard({ product, variant = 'standard' }: ProductCardProps) {
  const discount = calcDiscount(product.price, product.compareAt);

  if (variant === 'horizontal') {
    return (
      <Link href={`/products/${product.slug}`} className="card group flex gap-4 p-3">
        {/* Image */}
        <div className="relative w-28 h-28 shrink-0 product-image-placeholder rounded-md">
          <div
            className="absolute inset-0 rounded-md opacity-20"
            style={{
              background: `linear-gradient(135deg, hsl(${product.colorHue}, 40%, 90%) 0%, hsl(${product.colorHue}, 50%, 80%) 100%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-content-disabled" />
          </div>
          {discount && (
            <span className="absolute top-1.5 left-1.5 badge-red text-[10px] py-0">
              -{discount}%
            </span>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <p className="text-xs text-content-tertiary mb-0.5">{product.brand}</p>
            <h3 className="text-sm font-medium text-content-primary line-clamp-2 group-hover:text-content-brand transition-colors">
              {product.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="price-current text-base">{formatBDT(product.price)}</span>
            {product.compareAt && (
              <span className="price-original">{formatBDT(product.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="card group relative">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className={`relative overflow-hidden ${variant === 'compact' ? 'aspect-square' : 'aspect-[4/5]'}`}>
          <div
            className="absolute inset-0 product-image-placeholder transition-transform duration-slow group-hover:scale-[1.03]"
          >
            <div
              className="absolute inset-0 opacity-15"
              style={{
                background: `linear-gradient(135deg, hsl(${product.colorHue}, 35%, 92%) 0%, hsl(${product.colorHue}, 45%, 82%) 100%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-content-disabled opacity-60" />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {discount && (
              <span className="badge-red text-[11px] font-semibold px-2 py-0.5">
                -{discount}%
              </span>
            )}
            {product.isNew && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-info-surface text-info">
                NEW
              </span>
            )}
          </div>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
              <span className="bg-surface-inverse text-content-inverse text-xs font-medium px-3 py-1.5 rounded-md">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {/* Brand */}
          {product.brand && (
            <p className="text-[11px] text-content-tertiary uppercase tracking-wider font-medium mb-1">
              {product.brand}
            </p>
          )}

          {/* Title */}
          <h3 className="text-sm font-medium text-content-primary line-clamp-2 leading-snug mb-2 group-hover:text-content-brand transition-colors duration-fast min-h-[2.5rem]">
            {product.title}
          </h3>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-warning" weight="fill" />
                <span className="text-xs font-semibold text-content-primary">{product.rating}</span>
              </div>
              <span className="text-xs text-content-disabled">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="price-current text-lg">{formatBDT(product.price)}</span>
            {product.compareAt && (
              <span className="price-original">{formatBDT(product.compareAt)}</span>
            )}
          </div>
          {discount && product.compareAt && (
            <p className="price-save mt-1">
              FloppyDisk {formatBDT(product.compareAt - product.price)}
            </p>
          )}

          {/* Stock / Delivery qualifier */}
          {product.inStock && product.stockQty <= 10 && (
            <p className="text-xs text-warning mt-2 font-medium">
              Only {product.stockQty} left
            </p>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
                   flex items-center justify-center shadow-sm
                   hover:bg-white hover:shadow-md hover:scale-110
                   transition-all duration-fast group/wish"
        aria-label={`Add ${product.title} to wishlist`}
        onClick={(e) => e.stopPropagation()}
      >
        <Heart className="w-4 h-4 text-content-disabled group-hover/wish:text-danger transition-colors" />
      </button>
    </div>
  );
}
