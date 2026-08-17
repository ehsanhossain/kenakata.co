'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MagnifyingGlass as SearchIcon, Sliders
} from '@phosphor-icons/react';
import ProductCard from '@/components/ProductCard';
import { products, trendingSearches, searchProducts } from '@/lib/mock-data';

function SearchContent() {
 const searchParams = useSearchParams();
 const initialQuery = searchParams.get('q') || '';
 const [query, setQuery] = useState(initialQuery);

 const results = query ? searchProducts(query) : products;

 return (
 <div className="container-page py-6 sm:py-8">
 {/* MagnifyingGlass bar */}
 <div className="max-w-2xl mx-auto mb-8">
 <div className="relative">
 <input
 type="search"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 placeholder="Search for products, brands, categories..."
 className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-surface-subtle
 text-base focus:bg-white focus:border-border-brand focus:ring-0 transition-all"
 autoFocus
 />
 <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-disabled" />
 </div>
 </div>

 {query ? (
 <>
 <h1 className="text-xl font-semibold text-content-primary mb-1">
 MagnifyingGlass results for &ldquo;{query}&rdquo;
 </h1>
 <p className="text-sm text-content-tertiary mb-6">{results.length} products found</p>

 {results.length > 0 ? (
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
 {results.map(product => (
 <ProductCard key={product.id} product={product} />
 ))}
 </div>
 ) : (
 /* Empty state */
 <div className="text-center py-16">
 <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-surface-subtle flex items-center justify-center">
 <SearchIcon className="w-8 h-8 text-content-tertiary" />
 </div>
 <h2 className="text-lg font-semibold text-content-primary mb-2">No results found</h2>
 <p className="text-sm text-content-tertiary max-w-sm mx-auto mb-6">
 We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Try a different search term or browse our categories.
 </p>
 <div className="flex flex-wrap justify-center gap-2">
 {trendingSearches.slice(0, 6).map(term => (
 <button key={term} onClick={() => setQuery(term)} className="chip text-sm">
 {term}
 </button>
 ))}
 </div>
 </div>
 )}
 </>
 ) : (
 /* No query — show trending */
 <div>
 <h2 className="text-lg font-semibold text-content-primary mb-4">Trending Searches</h2>
 <div className="flex flex-wrap gap-2 mb-10">
 {trendingSearches.map(term => (
 <button key={term} onClick={() => setQuery(term)} className="chip">
 {term}
 </button>
 ))}
 </div>

 <h2 className="text-lg font-semibold text-content-primary mb-4">Popular Products</h2>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
 {products.slice(0, 10).map(product => (
 <ProductCard key={product.id} product={product} />
 ))}
 </div>
 </div>
 )}
 </div>
 );
}

export default function SearchPage() {
 return (
 <Suspense fallback={<div className="container-page py-20 text-center text-content-disabled">Loading search...</div>}>
 <SearchContent />
 </Suspense>
 );
}
