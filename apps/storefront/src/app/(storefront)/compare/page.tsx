import Link from 'next/link';
import { Star, X, ShoppingBag, ShoppingCart, Plus } from 'lucide-react';
import { products, formatBDT, calcDiscount } from '@/lib/mock-data';

export default function ComparePage() {
  const compareItems = products.slice(0, 3);
  const allSpecKeys = [...new Set(compareItems.flatMap(p => Object.keys(p.specifications)))];

  return (
    <div className="container-page py-6 sm:py-8">
      <h1 className="text-2xl font-bold text-brand-charcoal mb-6">Compare Products</h1>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="w-[140px] sm:w-[180px]" />
              {compareItems.map(p => (
                <th key={p.id} className="px-3 pb-4 text-left align-top">
                  <div className="card p-3 relative">
                    <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-semantic-danger-soft hover:text-semantic-danger transition-all">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="aspect-square rounded-lg product-image-placeholder mb-3 flex items-center justify-center"
                      style={{ background: `hsl(${p.colorHue}, 30%, 92%)` }}>
                      <ShoppingBag className="w-10 h-10 text-neutral-300/50" />
                    </div>
                    <Link href={`/products/${p.slug}`} className="text-sm font-medium text-brand-charcoal hover:text-brand-blue transition-colors line-clamp-2">
                      {p.title}
                    </Link>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium">{p.rating}</span>
                      <span className="text-xs text-neutral-400">({p.reviewCount})</span>
                    </div>
                    <div className="mt-2">
                      <span className="price-current text-base">{formatBDT(p.price)}</span>
                      {p.compareAt && <span className="price-original ml-2 text-xs">{formatBDT(p.compareAt)}</span>}
                    </div>
                    <button className="btn-primary w-full mt-3 text-xs py-2">
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </th>
              ))}
              {compareItems.length < 4 && (
                <th className="px-3 pb-4 align-top">
                  <Link href="/search" className="card p-3 h-full flex flex-col items-center justify-center min-h-[200px] text-neutral-400 hover:text-brand-blue hover:border-brand-blue/30 transition-all">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Add Product</span>
                  </Link>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {/* Brand row */}
            <tr className="bg-neutral-50">
              <td className="px-4 py-3 text-sm font-medium text-neutral-600">Brand</td>
              {compareItems.map(p => (
                <td key={p.id} className="px-4 py-3 text-sm text-brand-charcoal">{p.brand}</td>
              ))}
              {compareItems.length < 4 && <td />}
            </tr>
            {/* Spec rows */}
            {allSpecKeys.map((key, i) => (
              <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                <td className="px-4 py-3 text-sm font-medium text-neutral-600">{key}</td>
                {compareItems.map(p => (
                  <td key={p.id} className="px-4 py-3 text-sm text-brand-charcoal">
                    {p.specifications[key] || '—'}
                  </td>
                ))}
                {compareItems.length < 4 && <td />}
              </tr>
            ))}
            {/* Warranty */}
            <tr className="bg-neutral-50">
              <td className="px-4 py-3 text-sm font-medium text-neutral-600">Warranty</td>
              {compareItems.map(p => (
                <td key={p.id} className="px-4 py-3 text-sm text-brand-charcoal">{p.warranty}</td>
              ))}
              {compareItems.length < 4 && <td />}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
