import {
  Heart, ShoppingCart, X, ShoppingBag
} from '@phosphor-icons/react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/mock-data';

export default function WishlistPage() {
 const wishlistItems = products.slice(0, 4);

 if (wishlistItems.length === 0) {
 return (
 <div className="container-page py-20 text-center">
 <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-surface-subtle flex items-center justify-center">
 <Heart className="w-8 h-8 text-content-tertiary" />
 </div>
 <h1 className="text-xl font-semibold text-content-primary mb-2">Your wishlist is empty</h1>
 <p className="text-sm text-content-tertiary mb-6">FloppyDisk products you love and come back to them anytime.</p>
 <Link href="/" className="btn-primary">Start Shopping</Link>
 </div>
 );
 }

 return (
 <div className="container-page py-6 sm:py-8">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h1 className="text-2xl font-bold text-content-primary">My Wishlist</h1>
 <p className="text-sm text-content-tertiary mt-1">{wishlistItems.length} items saved</p>
 </div>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
 {wishlistItems.map(product => (
 <ProductCard key={product.id} product={product} />
 ))}
 </div>
 </div>
 );
}
