'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMerchantAuth } from '../../context/MerchantAuthContext';
import {
  Storefront, ShieldCheck, ArrowRight, CheckCircle
} from '@phosphor-icons/react';

export default function MerchantRegisterPage() {
 const { register } = useMerchantAuth();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('+880');
 const [shopName, setShopName] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsLoading(true);
 await register({ name, email, phone, shopName, password });
 };

 return (
 <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4 sm:p-6 antialiased font-sans">
 <div className="w-full max-w-md space-y-6">
 {/* Brand Header */}
 <div className="text-center space-y-2">
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-action-primary to-action-primary-hover text-content-primary font-black text-xl flex items-center justify-center mx-auto shadow-xl shadow-action-primary/10">
 S
 </div>
 <h1 className="text-2xl font-bold text-content-primary tracking-tight">Register as Kenakata Seller</h1>
 <p className="text-xs text-content-tertiary">Join Bangladesh's premier multi-vendor marketplace</p>
 </div>

 {/* Register Card */}
 <div className="bg-surface-subtle border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
 Proprietor Full Name *
 </label>
 <input
 type="text"
 required
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="e.g. Tanvir Hossain"
 className="w-full p-3 bg-canvas border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
 Storefront / Brand Name *
 </label>
 <input
 type="text"
 required
 value={shopName}
 onChange={(e) => setShopName(e.target.value)}
 placeholder="e.g. Dhaka Tech Hub"
 className="w-full p-3 bg-canvas border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
 Mobile Phone Number *
 </label>
 <input
 type="text"
 required
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 placeholder="+88017..."
 className="w-full p-3 bg-canvas border border-border rounded-xl text-xs font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
 Business Email Address *
 </label>
 <input
 type="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="contact@yourshop.com"
 className="w-full p-3 bg-canvas border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
 Password *
 </label>
 <input
 type="password"
 required
 minLength={6}
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="••••••••"
 className="w-full p-3 bg-canvas border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <button
 type="submit"
 disabled={isLoading}
 className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-content-primary font-bold text-xs shadow-lg shadow-action-primary/10 transition-all flex items-center justify-center gap-2"
 >
 <span>{isLoading ? 'Creating Storefront Account...' : 'Continue to KYC Verification'}</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </form>
 </div>

 {/* Footer Login Link */}
 <p className="text-center text-xs text-content-tertiary">
 Already registered?{' '}
 <Link href="/login" className="text-success font-bold hover:underline">
 Sign In
 </Link>
 </p>
 </div>
 </div>
 );
}
