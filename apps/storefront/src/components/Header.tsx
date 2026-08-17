'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  MagnifyingGlass, User, Heart, ShoppingCart, List, X, CaretDown, Globe, Package,
  Lightning, Camera, Headphones, DeviceMobile, SpeakerHigh, Wind, Lightbulb, House, Bed
} from '@phosphor-icons/react';
import { categories, trendingSearches } from '../lib/mock-data';
import CategoryIcon from './CategoryIcon';
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
          ? 'bg-canvas/95 backdrop-blur-md shadow-md'
          : 'bg-canvas border-b border-border'
      }`}
    >
      {/* Announcement Strip */}
      <div className="bg-gradient-to-r from-[var(--k-orange-600)] via-[var(--k-orange-500)] to-[var(--k-orange-600)] text-white text-xs py-1.5 hidden sm:block shadow-xs">
        <div className="container-page flex justify-between items-center">
          <div className="flex items-center gap-4 font-medium">
            <span className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-white" weight="bold" />
              Free delivery on orders over &#2547;2,000
            </span>
            <span className="opacity-40">|</span>
            <span>Cash on Delivery available nationwide</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/track" className="hover:text-white/80 hover:underline transition-colors duration-fast">
              Track Order
            </Link>
            <Link href="/help" className="hover:text-white/80 hover:underline transition-colors duration-fast">
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="container-page">
        <div className="flex items-center gap-4 h-16 lg:h-[72px]">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2 hover:bg-surface-subtle rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo.svg"
              alt="Kenakata"
              width={120}
              height={28}
              className="h-7 w-auto group-hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop MagnifyingGlass */}
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
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-border bg-surface-subtle
                           text-sm placeholder:text-content-tertiary
                           focus:bg-canvas focus:border-border-brand focus:ring-0
                           transition-all duration-normal"
              />
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-tertiary" />
            </div>

            {/* MagnifyingGlass dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-canvas rounded-xl shadow-md border border-border p-4 animate-scale-in z-50">
                {searchQuery ? (
                  <div>
                    <p className="text-xs text-content-tertiary mb-3 uppercase tracking-wider font-medium">
                      MagnifyingGlass results for &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-sm text-content-tertiary py-4 text-center">
                      Type to search across products, brands, and categories
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-content-tertiary mb-3 uppercase tracking-wider font-medium">
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

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-content-secondary hover:bg-surface-subtle rounded-md transition-colors duration-fast font-medium"
            >
              <Globe className="w-4 h-4 text-icon-brand" weight="bold" />
              <span>{isBn ? '\u09AC\u09BE\u0982\u09B2\u09BE' : 'EN'}</span>
            </button>

            {/* Account */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-content-secondary hover:bg-surface-subtle rounded-md transition-colors duration-fast">
                  <div className="w-7 h-7 rounded-full bg-surface-brand-subtle text-content-brand font-bold flex items-center justify-center text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <span className="hidden lg:inline font-medium max-w-[100px] truncate">{user.name || user.phone}</span>
                  <CaretDown className="w-3.5 h-3.5 text-content-tertiary" />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-48 bg-canvas rounded-xl shadow-xl border border-border py-2 hidden group-hover:block z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-xs font-bold text-content-primary truncate">{user.name || 'Kenakata Customer'}</p>
                    <p className="text-[11px] text-content-tertiary truncate">{user.phone}</p>
                  </div>
                  <Link href="/account/orders" className="flex items-center gap-2 px-4 py-2 text-xs text-content-secondary hover:bg-surface-subtle">
                    <Package className="w-3.5 h-3.5" />
                    {isBn ? '\u0986\u09AE\u09BE\u09B0 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0\u09B8\u09AE\u09C2\u09B9' : 'My Orders'}
                  </Link>
                  <Link href="/account/profile" className="flex items-center gap-2 px-4 py-2 text-xs text-content-secondary hover:bg-surface-subtle">
                    <User className="w-3.5 h-3.5" />
                    {isBn ? '\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 \u09B8\u09C7\u099F\u09BF\u0982\u09B8' : 'Profile GearSix'}
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-danger hover:bg-danger-surface border-t border-border mt-1"
                  >
                    <span>{isBn ? '\u09B2\u0997\u0986\u0989\u099F' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-content-secondary hover:bg-surface-subtle rounded-md transition-colors duration-fast font-medium"
              >
                <User className="w-5 h-5 text-icon-brand" weight="bold" />
                <span className="hidden lg:inline">{isBn ? '\u09B2\u0997\u0987\u09A8' : 'Sign In'}</span>
              </button>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-content-secondary hover:bg-surface-subtle rounded-md transition-colors duration-fast hidden sm:flex"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-content-secondary hover:bg-surface-subtle rounded-md transition-colors duration-fast group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-fast" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-action-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile MagnifyingGlass Bar */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-surface-subtle
                         text-sm placeholder:text-content-tertiary
                         focus:bg-canvas focus:border-border-brand focus:ring-0
                         transition-all duration-normal"
            />
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
          </div>
        </div>
      </div>

      {/* Desktop Category Navigation */}
      <nav className="hidden lg:block border-t border-border bg-canvas">
        <div className="container-page">
          <ul className="flex items-center gap-1 h-11 -mx-2 overflow-x-auto no-scrollbar">
            <li>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-content-primary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all duration-fast"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <List className="w-4 h-4" weight="bold" />
                All Categories
                <CaretDown className={`w-3 h-3 transition-transform duration-fast ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </li>
            <li>
              <Link
                href="/categories/gadgets"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <Lightning className="w-3.5 h-3.5 text-amber-500" weight="fill" />
                <span>Gadgets</span>
              </Link>
            </li>
            <li>
              <Link
                href="/categories/camera"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <Camera className="w-3.5 h-3.5 text-blue-500" weight="fill" />
                <span>Cameras</span>
              </Link>
            </li>
            <li>
              <Link
                href="/categories/earbuds"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <Headphones className="w-3.5 h-3.5 text-purple-500" weight="fill" />
                <span>Earbuds & Audio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/categories/mobile-accessories"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <DeviceMobile className="w-3.5 h-3.5 text-emerald-500" weight="fill" />
                <span>Mobile Accessories</span>
              </Link>
            </li>
            <li>
              <Link
                href="/categories/speaker"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <SpeakerHigh className="w-3.5 h-3.5 text-indigo-500" weight="fill" />
                <span>Bluetooth Speakers</span>
              </Link>
            </li>
            <li>
              <Link
                href="/categories/fan"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <Wind className="w-3.5 h-3.5 text-cyan-500" weight="fill" />
                <span>Cooling Fans</span>
              </Link>
            </li>
            <li>
              <Link
                href="/categories/light"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" weight="fill" />
                <span>Smart Lights</span>
              </Link>
            </li>
            <li>
              <Link
                href="/categories/home-appliance"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <House className="w-3.5 h-3.5 text-rose-500" weight="fill" />
                <span>Home Living</span>
              </Link>
            </li>
            <li>
              <Link
                href="/categories/bed-sheets"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-content-secondary hover:text-content-brand hover:bg-surface-brand-subtle rounded-lg transition-all"
              >
                <Bed className="w-3.5 h-3.5 text-teal-500" weight="fill" />
                <span>3D Bed Sheets</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mega List Dropdown */}
      {isMegaMenuOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-t border-border z-40 animate-fade-in"
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="container-page py-7">
            <div className="grid grid-cols-12 gap-8">
              {/* Column 1: Mobile & Everyday Gadgets */}
              <div className="col-span-3 space-y-3 border-r border-border/60 pr-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/80">
                  <Link
                    href="/categories/gadgets"
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="text-xs font-extrabold uppercase tracking-wider text-content-primary hover:text-content-brand transition-colors flex items-center gap-1.5"
                  >
                    <Lightning className="w-4 h-4 text-[var(--k-orange-500)]" weight="fill" />
                    Mobile & Gadgets
                  </Link>
                  <span className="text-[11px] font-bold text-content-tertiary bg-surface-subtle px-2 py-0.5 rounded-full">
                    45 items
                  </span>
                </div>
                <ul className="space-y-1">
                  {[
                    { name: 'Mobile Accessories', slug: 'mobile-accessories', count: 25 },
                    { name: 'Feature & Mini Phones', slug: 'mobile-phone', count: 9 },
                    { name: 'Smart Electronics', slug: 'electronics', count: 8 },
                    { name: 'Keyboards & Mice', slug: 'mouse-keyboard', count: 2 },
                    { name: 'Mini Router UPS', slug: 'ups', count: 1 },
                  ].map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/categories/${item.slug}`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-surface-brand-subtle text-xs font-medium text-content-secondary hover:text-content-brand transition-all"
                      >
                        <span className="flex items-center gap-2 group-hover:translate-x-0.5 transition-transform">
                          <CategoryIcon slug={item.slug} className="w-4 h-4 text-content-tertiary group-hover:text-content-brand transition-colors" weight="bold" />
                          <span>{item.name}</span>
                        </span>
                        <span className="text-[10px] text-content-tertiary font-normal group-hover:text-content-brand">
                          {item.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Audio, Cameras & Smart Tech */}
              <div className="col-span-3 space-y-3 border-r border-border/60 pr-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/80">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-content-primary flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-blue-500" weight="fill" />
                    Audio & Smart Tech
                  </span>
                  <span className="text-[11px] font-bold text-content-tertiary bg-surface-subtle px-2 py-0.5 rounded-full">
                    21 items
                  </span>
                </div>
                <ul className="space-y-1">
                  {[
                    { name: 'Security & Action Cameras', slug: 'camera', count: 6 },
                    { name: 'Bluetooth Speakers', slug: 'speaker', count: 6 },
                    { name: 'Smart Lights & Lamps', slug: 'light', count: 5 },
                    { name: 'Earbuds & Audio', slug: 'earbuds', count: 3 },
                    { name: 'Thermal & Label Printers', slug: 'printer', count: 1 },
                  ].map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/categories/${item.slug}`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-surface-brand-subtle text-xs font-medium text-content-secondary hover:text-content-brand transition-all"
                      >
                        <span className="flex items-center gap-2 group-hover:translate-x-0.5 transition-transform">
                          <CategoryIcon slug={item.slug} className="w-4 h-4 text-content-tertiary group-hover:text-content-brand transition-colors" weight="bold" />
                          <span>{item.name}</span>
                        </span>
                        <span className="text-[10px] text-content-tertiary font-normal group-hover:text-content-brand">
                          {item.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Home Living & Popular Brands */}
              <div className="col-span-3 space-y-3.5 border-r border-border/60 pr-4">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/80 mb-2">
                    <Link
                      href="/categories/home-appliance"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="text-xs font-extrabold uppercase tracking-wider text-content-primary hover:text-content-brand transition-colors flex items-center gap-1.5"
                    >
                      <House className="w-4 h-4 text-rose-500" weight="fill" />
                      Home & Living
                    </Link>
                    <span className="text-[11px] font-bold text-content-tertiary bg-surface-subtle px-2 py-0.5 rounded-full">
                      8 items
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[
                      { name: 'Rechargeable Fans', slug: 'fan', count: 4 },
                      { name: '3D Bed Sheets & Bedding', slug: 'bed-sheets', count: 3 },
                      { name: 'Comfort & Health Pillows', slug: 'pillow', count: 1 },
                    ].map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/categories/${item.slug}`}
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-surface-brand-subtle text-xs font-medium text-content-secondary hover:text-content-brand transition-all"
                        >
                          <span className="flex items-center gap-2 group-hover:translate-x-0.5 transition-transform">
                            <CategoryIcon slug={item.slug} className="w-4 h-4 text-content-tertiary group-hover:text-content-brand transition-colors" weight="bold" />
                            <span>{item.name}</span>
                          </span>
                          <span className="text-[10px] text-content-tertiary font-normal group-hover:text-content-brand">
                            {item.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Brands Shortcuts */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-content-tertiary mb-2">
                    Popular Brands
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Apple', 'boAt', 'V380', 'Recrsi', 'Hoco', 'Kospet'].map((brand) => (
                      <Link
                        key={brand}
                        href={`/categories/gadgets?brand=${brand.toLowerCase()}`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-surface-subtle text-content-secondary hover:bg-surface-brand-subtle hover:text-content-brand hover:border-border-brand border border-border transition-all"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 4: Promotional Spotlight */}
              <div className="col-span-3 flex flex-col justify-between">
                <div className="rounded-2xl p-5 bg-gradient-to-br from-[var(--k-orange-600)] via-[var(--k-orange-700)] to-[var(--k-orange-800)] text-white shadow-md space-y-3 relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                    <Lightning className="w-3 h-3 text-amber-300" weight="fill" />
                    100% Genuine
                  </div>
                  <h4 className="text-base font-extrabold leading-snug text-white">
                    Explore 74+ Verified Gadgets & Essentials
                  </h4>
                  <p className="text-xs text-white/85 leading-relaxed">
                    Enjoy official brand warranty, Cash on Delivery nationwide, and 7-day easy returns.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/search"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white text-[var(--k-orange-700)] font-bold text-xs shadow-md hover:bg-white/95 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Browse Entire Catalog
                    </Link>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs px-1 text-content-tertiary">
                  <span className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-icon-brand" weight="bold" />
                    Free shipping &#2547;2k+
                  </span>
                  <Link
                    href="/categories"
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="font-bold text-content-brand hover:underline"
                  >
                    All Categories &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile List Sheet */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-[300px] bg-canvas z-50 shadow-2xl lg:hidden animate-slide-in-right overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/logo.svg" alt="Kenakata" width={100} height={24} className="h-6 w-auto" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-surface-subtle rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-content-secondary hover:bg-surface-brand-subtle hover:text-content-brand rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{cat.name}</span>
                      <span className="ml-auto text-xs text-content-tertiary">{cat.productCount}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-border space-y-1">
                <Link href="/account" className="flex items-center gap-3 px-3 py-3 text-sm text-content-secondary hover:bg-surface-subtle rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-5 h-5" /> My Account
                </Link>
                <Link href="/track" className="flex items-center gap-3 px-3 py-3 text-sm text-content-secondary hover:bg-surface-subtle rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                  <Package className="w-5 h-5" /> Track Order
                </Link>
                <Link href="/help" className="flex items-center gap-3 px-3 py-3 text-sm text-content-secondary hover:bg-surface-subtle rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
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
