'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown, Globe, Package } from 'lucide-react';
import { categories, trendingSearches } from '../lib/mock-data';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { user, openAuthModal, logout } = useAuth();
  const { isBn, toggleLocale } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(2);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-normal ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white border-b border-neutral-100'
      }`}
    >
      {/* ── Announcement Strip ── */}
      <div className="bg-brand-charcoal text-white text-xs py-1.5 hidden sm:block">
        <div className="container-page flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Package className="w-3 h-3" />
              Free delivery on orders over ৳2,000
            </span>
            <span className="text-neutral-300">|</span>
            <span>Cash on Delivery available nationwide</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/track" className="hover:text-brand-blue-soft transition-colors duration-fast">
              Track Order
            </Link>
            <Link href="/help" className="hover:text-brand-blue-soft transition-colors duration-fast">
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Header Row ── */}
      <div className="container-page">
        <div className="flex items-center gap-4 h-16 lg:h-[72px]">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2 hover:bg-neutral-50 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo / Wordmark */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-normal">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-brand-charcoal tracking-tight">
                Kenakata
              </span>
              <span className="text-[10px] text-neutral-500 block -mt-1 leading-none font-bengali">
                কেনাকাটা
              </span>
            </div>
          </Link>

          {/* ── Desktop Search ── */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-2xl mx-4 relative">
            <div className="w-full relative">
              <input
                type="search"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-neutral-200 bg-neutral-50
                           text-sm placeholder:text-neutral-500
                           focus:bg-white focus:border-brand-blue focus:ring-0
                           transition-all duration-normal"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            </div>

            {/* Search dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-md border border-neutral-100 p-4 animate-scale-in z-50">
                {searchQuery ? (
                  <div>
                    <p className="text-xs text-neutral-500 mb-3 uppercase tracking-wider font-medium">
                      Search results for &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-sm text-neutral-500 py-4 text-center">
                      Type to search across products, brands, and categories
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-neutral-500 mb-3 uppercase tracking-wider font-medium">
                      Trending Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setIsSearchOpen(false);
                          }}
                          className="chip text-xs"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors duration-fast font-medium"
            >
              <Globe className="w-4 h-4 text-brand-emerald" />
              <span>{isBn ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Account (Logged In vs Modal Trigger) */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors duration-fast">
                  <div className="w-7 h-7 rounded-full bg-brand-emerald/20 text-brand-emerald font-bold flex items-center justify-center text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <span className="hidden lg:inline font-medium max-w-[100px] truncate">{user.name || user.phone}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 hidden group-hover:block z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{user.name || 'Kenakata Customer'}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.phone}</p>
                  </div>
                  <Link href="/account/orders" className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Package className="w-3.5 h-3.5" />
                    {isBn ? 'আমার অর্ডারসমূহ' : 'My Orders'}
                  </Link>
                  <Link href="/account/profile" className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <User className="w-3.5 h-3.5" />
                    {isBn ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-t border-slate-100 dark:border-slate-800 mt-1"
                  >
                    <span>{isBn ? 'লগআউট' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors duration-fast font-medium"
              >
                <User className="w-5 h-5 text-brand-emerald" />
                <span className="hidden lg:inline">{isBn ? 'লগইন' : 'Sign In'}</span>
              </button>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors duration-fast hidden sm:flex"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-semantic-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors duration-fast group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-fast" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ── Mobile Search Bar ── */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-neutral-200 bg-neutral-50
                         text-sm placeholder:text-neutral-400
                         focus:bg-white focus:border-brand-blue focus:ring-0
                         transition-all duration-normal"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* ── Desktop Category Navigation ── */}
      <nav className="hidden lg:block border-t border-neutral-100 bg-white">
        <div className="container-page">
          <ul className="flex items-center gap-0.5 h-11 -mx-2">
            <li>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-charcoal hover:text-brand-blue hover:bg-brand-blue-soft rounded-md transition-all duration-fast"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <Menu className="w-4 h-4" />
                All Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-fast ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </li>
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-700 hover:text-brand-blue hover:bg-brand-blue-soft rounded-md transition-all duration-fast"
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Mega Menu Dropdown ── */}
      {isMegaMenuOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-white shadow-lg border-t border-neutral-100 z-40 animate-fade-in"
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="container-page py-6">
            <div className="grid grid-cols-4 gap-8">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-2 text-sm font-semibold text-brand-charcoal hover:text-brand-blue mb-3 transition-colors"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    {cat.name}
                    <span className="text-xs text-neutral-400 font-normal">({cat.productCount})</span>
                  </Link>
                  {cat.children && (
                    <ul className="space-y-1.5">
                      {cat.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/categories/${child.slug}`}
                            className="text-sm text-neutral-600 hover:text-brand-blue transition-colors"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Menu Sheet ── */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-50 shadow-2xl lg:hidden animate-slide-in-right overflow-y-auto">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">K</span>
                </div>
                <span className="font-bold text-brand-charcoal">Kenakata</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-neutral-50 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 hover:bg-brand-blue-soft hover:text-brand-blue rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="ml-auto text-xs text-neutral-400">{cat.productCount}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-neutral-100 space-y-1">
                <Link href="/account" className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-5 h-5" /> My Account
                </Link>
                <Link href="/track" className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                  <Package className="w-5 h-5" /> Track Order
                </Link>
                <Link href="/help" className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                  <Globe className="w-5 h-5" /> Help Center
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
