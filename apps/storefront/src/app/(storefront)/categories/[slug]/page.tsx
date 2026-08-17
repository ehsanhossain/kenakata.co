'use client';

import { useState } from 'react';
import {
  Sliders, CaretDown, X, GridNine, ListDashes
} from '@phosphor-icons/react';
import ProductCard from '@/components/ProductCard';
import { products, categories, brands, formatBDT } from '@/lib/mock-data';

const sortOptions = [
 { value: 'relevance', label: 'Relevance' },
 { value: 'popularity', label: 'Popularity' },
 { value: 'newest', label: 'Newest' },
 { value: 'price_asc', label: 'Price: Low to High' },
 { value: 'price_desc', label: 'Price: High to Low' },
 { value: 'rating', label: 'Rating' },
];

export default function CategoryPage() {
 const [sort, setSort] = useState('relevance');
 const [showFilters, setShowFilters] = useState(false);
 const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
 const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

 const filteredProducts = products.filter(p => {
 if (selectedBrands.length > 0 && !selectedBrands.includes(p.brandSlug)) return false;
 return true;
 });

 const toggleBrand = (slug: string) => {
 setSelectedBrands(prev => prev.includes(slug) ? prev.filter(b => b !== slug) : [...prev, slug]);
 };

 return (
 <div>
 {/* Breadcrumb */}
 <div className="bg-surface-subtle border-b border-border">
 <div className="container-page py-3">
 <nav className="flex items-center gap-2 text-sm text-content-tertiary">
 <a href="/" className="hover:text-content-brand transition-colors">House</a>
 <span>/</span>
 <span className="text-content-primary font-medium">Electronics</span>
 </nav>
 </div>
 </div>

 <div className="container-page py-6 sm:py-8">
 {/* Page header */}
 <div className="mb-6">
 <h1 className="text-2xl sm:text-3xl font-bold text-content-primary">Electronics</h1>
 <p className="text-sm text-content-tertiary mt-1">{filteredProducts.length} products found</p>
 </div>

 {/* Subcategory chips */}
 <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
 <button className="chip-active shrink-0">All Electronics</button>
 {(categories.find(c => c.slug === 'electronics')?.children || []).map(sub => (
 <button key={sub.id} className="chip shrink-0">{sub.name}</button>
 ))}
 </div>

 <div className="flex gap-8">
 {/* ── Desktop Funnel Sidebar ── */}
 <aside className="hidden lg:block w-[264px] shrink-0">
 <div className="sticky top-[140px] space-y-6">
 {/* Brand Funnel */}
 <div className="bg-white rounded-lg border border-border p-4">
 <h3 className="text-sm font-semibold text-content-primary mb-3">Brand</h3>
 <div className="space-y-2">
 {brands.map(brand => (
 <label key={brand.id} className="flex items-center gap-2.5 cursor-pointer group">
 <input
 type="checkbox"
 checked={selectedBrands.includes(brand.slug)}
 onChange={() => toggleBrand(brand.slug)}
 className="w-4 h-4 rounded border-neutral-300 text-content-brand focus:ring-brand-blue/30"
 />
 <span className="text-sm text-content-secondary group-hover:text-content-primary">{brand.name}</span>
 <span className="ml-auto text-xs text-content-disabled">({brand.productCount})</span>
 </label>
 ))}
 </div>
 </div>

 {/* Price Funnel */}
 <div className="bg-white rounded-lg border border-border p-4">
 <h3 className="text-sm font-semibold text-content-primary mb-3">Price Range</h3>
 <div className="flex items-center gap-2">
 <input type="number" placeholder="Min" className="input text-xs py-2 px-3" />
 <span className="text-content-disabled">–</span>
 <input type="number" placeholder="Max" className="input text-xs py-2 px-3" />
 </div>
 <button className="btn-secondary w-full mt-3 text-xs py-2">Apply</button>
 </div>

 {/* Rating Funnel */}
 <div className="bg-white rounded-lg border border-border p-4">
 <h3 className="text-sm font-semibold text-content-primary mb-3">Rating</h3>
 {[4, 3, 2, 1].map(stars => (
 <label key={stars} className="flex items-center gap-2 py-1.5 cursor-pointer">
 <input type="radio" name="rating" className="w-4 h-4 text-content-brand focus:ring-brand-blue/30" />
 <div className="flex items-center gap-0.5">
 {Array.from({ length: 5 }).map((_, i) => (
 <span key={i} className={`text-sm ${i < stars ? 'text-warning' : 'text-content-secondary'}`}>★</span>
 ))}
 </div>
 <span className="text-xs text-content-tertiary">& up</span>
 </label>
 ))}
 </div>

 {/* Availability */}
 <div className="bg-white rounded-lg border border-border p-4">
 <h3 className="text-sm font-semibold text-content-primary mb-3">Availability</h3>
 <label className="flex items-center gap-2.5 cursor-pointer">
 <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-neutral-300 text-content-brand focus:ring-brand-blue/30" />
 <span className="text-sm text-content-secondary">In Stock Only</span>
 </label>
 </div>
 </div>
 </aside>

 {/* ── Product GridFour ── */}
 <div className="flex-1 min-w-0">
 {/* Sort & View Toolbar */}
 <div className="flex items-center justify-between gap-3 pb-4 border-b border-border mb-6 sticky top-[120px] bg-white z-10 -mx-4 px-4 sm:mx-0 sm:px-0 py-2">
 {/* Mobile filter button */}
 <button
 onClick={() => setShowFilters(true)}
 className="lg:hidden btn-ghost text-sm gap-1.5 px-3"
 >
 <Sliders className="w-4 h-4" />
 Filters
 </button>

 {/* Applied filters */}
 {selectedBrands.length > 0 && (
 <div className="hidden sm:flex items-center gap-2 flex-wrap">
 {selectedBrands.map(slug => (
 <span key={slug} className="chip-active text-xs gap-1">
 {brands.find(b => b.slug === slug)?.name}
 <button onClick={() => toggleBrand(slug)}><X className="w-3 h-3" /></button>
 </span>
 ))}
 <button onClick={() => setSelectedBrands([])} className="text-xs text-content-tertiary hover:text-danger transition-colors">
 Clear all
 </button>
 </div>
 )}

 <div className="flex items-center gap-3 ml-auto">
 {/* View mode toggle */}
 <div className="hidden sm:flex items-center bg-surface-subtle rounded-lg p-0.5">
 <button
 onClick={() => setViewMode('grid')}
 className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-content-brand' : 'text-content-disabled'}`}
 >
 <GridNine className="w-4 h-4" />
 </button>
 <button
 onClick={() => setViewMode('list')}
 className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-content-brand' : 'text-content-disabled'}`}
 >
 <ListDashes className="w-4 h-4" />
 </button>
 </div>

 {/* Sort */}
 <div className="relative">
 <select
 value={sort}
 onChange={(e) => setSort(e.target.value)}
 className="appearance-none bg-surface-subtle border border-border rounded-lg text-sm pl-3 pr-8 py-2 focus:ring-0 focus:border-border-brand cursor-pointer"
 >
 {sortOptions.map(opt => (
 <option key={opt.value} value={opt.value}>{opt.label}</option>
 ))}
 </select>
 <CaretDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-disabled pointer-events-none" />
 </div>
 </div>
 </div>

 {/* Product grid */}
 <div className={
 viewMode === 'grid'
 ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5'
 : 'space-y-3'
 }>
 {filteredProducts.map(product => (
 <ProductCard
 key={product.id}
 product={product}
 variant={viewMode === 'list' ? 'horizontal' : 'standard'}
 />
 ))}
 </div>

 {/* Pagination */}
 <div className="flex items-center justify-center gap-2 mt-10">
 <button className="btn-ghost text-sm px-3 py-2 opacity-50 cursor-not-allowed" disabled>Previous</button>
 <button className="w-9 h-9 rounded-lg bg-action-primary text-content-primary text-sm font-medium">1</button>
 <button className="w-9 h-9 rounded-lg text-content-secondary text-sm hover:bg-surface-subtle transition-colors">2</button>
 <button className="w-9 h-9 rounded-lg text-content-secondary text-sm hover:bg-surface-subtle transition-colors">3</button>
 <button className="btn-ghost text-sm px-3 py-2">Next</button>
 </div>
 </div>
 </div>
 </div>

 {/* ── Mobile Funnel Sheet ── */}
 {showFilters && (
 <>
 <div className="fixed inset-0 bg-black/40 z-50 lg:hidden" onClick={() => setShowFilters(false)} />
 <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto lg:hidden animate-slide-up safe-bottom">
 <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
 <h2 className="text-lg font-semibold">Filters</h2>
 <div className="flex items-center gap-3">
 <button onClick={() => { setSelectedBrands([]); }} className="text-sm text-content-brand">Clear all</button>
 <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
 </div>
 </div>
 <div className="p-4 space-y-6">
 <div>
 <h3 className="text-sm font-semibold mb-3">Brand</h3>
 <div className="space-y-2.5">
 {brands.map(brand => (
 <label key={brand.id} className="flex items-center gap-2.5">
 <input
 type="checkbox"
 checked={selectedBrands.includes(brand.slug)}
 onChange={() => toggleBrand(brand.slug)}
 className="w-4 h-4 rounded border-neutral-300 text-content-brand"
 />
 <span className="text-sm">{brand.name}</span>
 </label>
 ))}
 </div>
 </div>
 </div>
 <div className="sticky bottom-0 bg-white border-t border-border p-4 flex gap-3 safe-bottom">
 <button onClick={() => setShowFilters(false)} className="btn-secondary flex-1">Cancel</button>
 <button onClick={() => setShowFilters(false)} className="btn-primary flex-1">
 Show {filteredProducts.length} results
 </button>
 </div>
 </div>
 </>
 )}
 </div>
 );
}
