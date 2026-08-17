'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sliders, CaretDown, X, GridNine, ListDashes, CaretRight, Sparkle, ShieldCheck, Check
} from '@phosphor-icons/react';
import ProductCard from '@/components/ProductCard';
import CategoryIcon from '@/components/CategoryIcon';
import { products, categories, brands, formatBDT, type Product } from '@/lib/mock-data';

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = (params.slug as string) || 'gadgets';

  const [sort, setSort] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubcat, setSelectedSubcat] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Reset filters on slug change
  useEffect(() => {
    setSelectedSubcat(null);
    setSelectedBrands([]);
  }, [slug]);

  // Find matching parent category or subcategory
  const currentCategory = useMemo(() => {
    const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();

    // Check main category
    const main = categories.find(c => c.slug === cleanSlug || c.id === cleanSlug || c.slug === cleanSlug.replace(/-electronics$/, ''));
    if (main) return { category: main, isMain: true, parent: null };

    // Check subcategory
    for (const parent of categories) {
      const sub = parent.children?.find(c => c.slug === cleanSlug || c.id === cleanSlug || c.slug === cleanSlug.replace(/s$/, ''));
      if (sub) return { category: sub, isMain: false, parent };
    }

    return { category: categories[0], isMain: true, parent: null };
  }, [slug]);

  // Available subcategories for chips
  const subcategoryList = useMemo(() => {
    if (currentCategory.isMain) {
      return currentCategory.category.children || [];
    }
    return currentCategory.parent?.children || [];
  }, [currentCategory]);

  // Filter products
  const categoryProducts = useMemo(() => {
    let list = products.filter(p => {
      if (currentCategory.isMain) {
        if (selectedSubcat) {
          return p.categorySlug === selectedSubcat;
        }
        return p.mainCategorySlug === currentCategory.category.slug || p.categorySlug === currentCategory.category.slug;
      } else {
        return p.categorySlug === currentCategory.category.slug;
      }
    });

    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brandSlug));
    }

    if (inStockOnly) {
      list = list.filter(p => p.inStock);
    }

    // Sorting
    if (sort === 'newest') {
      list = [...list].filter(p => p.isNew).concat(list.filter(p => !p.isNew));
    } else if (sort === 'popularity') {
      list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sort === 'price_asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [currentCategory, selectedSubcat, selectedBrands, inStockOnly, sort]);

  // Available brands within this category
  const categoryBrands = useMemo(() => {
    const brandSlugs = new Set(
      products
        .filter(p => currentCategory.isMain ? (p.mainCategorySlug === currentCategory.category.slug) : (p.categorySlug === currentCategory.category.slug))
        .map(p => p.brandSlug)
    );
    return brands.filter(b => brandSlugs.has(b.slug));
  }, [currentCategory]);

  const toggleBrand = (brandSlug: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandSlug) ? prev.filter(b => b !== brandSlug) : [...prev, brandSlug]
    );
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-surface-subtle border-b border-border">
        <div className="container-page py-3">
          <nav className="flex items-center gap-2 text-sm text-content-tertiary">
            <Link href="/" className="hover:text-content-brand transition-colors">Home</Link>
            <CaretRight className="w-3 h-3" />
            <Link href="/categories" className="hover:text-content-brand transition-colors">Categories</Link>
            {currentCategory.parent && (
              <>
                <CaretRight className="w-3 h-3" />
                <Link href={`/categories/${currentCategory.parent.slug}`} className="hover:text-content-brand transition-colors">
                  {currentCategory.parent.name}
                </Link>
              </>
            )}
            <CaretRight className="w-3 h-3" />
            <span className="text-content-primary font-semibold">{currentCategory.category.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-page py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-10 h-10 rounded-xl bg-surface-brand-subtle text-content-brand flex items-center justify-center">
                <CategoryIcon slug={currentCategory.category.slug} className="w-6 h-6" weight="duotone" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-content-primary">
                {currentCategory.category.name}
              </h1>
            </div>
            <p className="text-sm text-content-tertiary">
              Showing {categoryProducts.length} verified products with official warranty
            </p>
          </div>

          {/* Sort & View Mode Controls */}
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products by"
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-border bg-white text-content-primary focus:border-border-brand focus:ring-0 shadow-xs"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <div className="flex items-center rounded-xl border border-border bg-white p-0.5 shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-surface-brand-subtle text-content-brand' : 'text-content-disabled'}`}
                aria-label="Grid view"
              >
                <GridNine className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-surface-brand-subtle text-content-brand' : 'text-content-disabled'}`}
                aria-label="List view"
              >
                <ListDashes className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subcategory Filter Chips */}
        {subcategoryList.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {currentCategory.isMain && (
              <button
                onClick={() => setSelectedSubcat(null)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
                  selectedSubcat === null
                    ? 'bg-action-primary text-white shadow-xs'
                    : 'bg-white border border-border text-content-secondary hover:border-border-brand'
                }`}
              >
                All {currentCategory.category.name}
              </button>
            )}
            {subcategoryList.map(sub => {
              const isSelected = currentCategory.isMain
                ? selectedSubcat === sub.slug
                : currentCategory.category.slug === sub.slug;

              if (!currentCategory.isMain) {
                return (
                  <Link
                    key={sub.id}
                    href={`/categories/${sub.slug}`}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-action-primary text-white shadow-xs'
                        : 'bg-white border border-border text-content-secondary hover:border-border-brand'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.name}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcat(selectedSubcat === sub.slug ? null : sub.slug)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-action-primary text-white shadow-xs'
                      : 'bg-white border border-border text-content-secondary hover:border-border-brand'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex gap-8">
          {/* ── Sidebar Filters ── */}
          <aside className="hidden lg:block w-[240px] shrink-0 space-y-5">
            {/* Brand Filter */}
            {categoryBrands.length > 0 && (
              <div className="bg-white rounded-xl border border-border p-4 shadow-xs">
                <h3 className="text-xs font-bold text-content-primary uppercase tracking-wider mb-3">Brands</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                  {categoryBrands.map(brand => (
                    <label key={brand.id} className="flex items-center gap-2.5 cursor-pointer group text-xs">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.slug)}
                        onChange={() => toggleBrand(brand.slug)}
                        className="w-4 h-4 rounded border-neutral-300 text-content-brand focus:ring-brand-blue/30"
                      />
                      <span className="text-content-secondary group-hover:text-content-primary font-medium">{brand.name}</span>
                      <span className="ml-auto text-content-disabled">({brand.productCount})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* In Stock Filter */}
            <div className="bg-white rounded-xl border border-border p-4 shadow-xs">
              <h3 className="text-xs font-bold text-content-primary uppercase tracking-wider mb-3">Availability</h3>
              <label className="flex items-center gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-content-brand focus:ring-brand-blue/30"
                />
                <span className="text-content-secondary font-medium">In Stock Only</span>
              </label>
            </div>

            {/* Quality Guarantee */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-4 shadow-xs space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" weight="fill" />
                100% Genuine Guarantee
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                All products in this category are verified by Kenakata with authentic brand warranties and 7-day return guarantee.
              </p>
            </div>
          </aside>

          {/* ── Product List / Grid ── */}
          <main className="flex-1 min-w-0">
            {categoryProducts.length > 0 ? (
              <div className={viewMode === 'grid'
                ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
                : "flex flex-col gap-3"
              }>
                {categoryProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === 'list' ? 'horizontal' : 'standard'}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-border p-12 text-center">
                <p className="text-base font-semibold text-content-primary mb-1">No products found</p>
                <p className="text-xs text-content-tertiary mb-4">Try adjusting your brand or filter selections.</p>
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedSubcat(null);
                  }}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
