'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  User, Phone, EnvelopeSimple, Lock, ArrowRight, ShieldCheck, WarningCircle
} from '@phosphor-icons/react';

export default function RegisterPage() {
 const router = useRouter();
 const { isBn } = useLanguage();
 const { signupWithPassword, loginWithGoogle } = useAuth();

 const [fullName, setFullName] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');

 const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 let val = e.target.value.replace(/\D/g, '');
 if (val.startsWith('880')) val = val.substring(3);
 if (val.startsWith('0')) val = val.substring(1);
 if (val.length > 10) val = val.substring(0, 10);
 setPhoneNumber(val ? `+880${val}` : '');
 };

 const handleRegister = async (e: React.FormEvent) => {
 e.preventDefault();
 setErrorMsg('');
 if (!fullName || !phoneNumber || !password) {
 setErrorMsg(isBn ? 'নাম, ফোন এবং পাসওয়ার্ড আবশ্যক' : 'Name, phone and password are required');
 return;
 }
 setIsSubmitting(true);
 const res = await signupWithPassword({
 name: fullName,
 phone: phoneNumber.startsWith('+880') ? phoneNumber : `+880${phoneNumber.replace(/\D/g, '')}`,
 email,
 password,
 });
 setIsSubmitting(false);
 if (res.success) {
 router.push('/account');
 } else {
 setErrorMsg(res.message || 'Registration failed');
 }
 };

 return (
 <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-subtle dark:bg-canvas">
 <div className="w-full max-w-md bg-white dark:bg-surface-subtle rounded-3xl shadow-xl border border-border dark:border-border overflow-hidden">
 {/* Header Banner */}
 <div className="p-8 bg-gradient-to-br from-brand-charcoal to-slate-800 text-content-primary">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-action-primary/20 text-content-brand text-xs font-semibold uppercase tracking-wider mb-2">
 <ShieldCheck className="w-3.5 h-3.5" />
 {isBn ? 'নতুন অ্যাকাউন্ট' : 'Register'}
 </div>
 <h1 className="text-2xl font-bold font-serif">
 {isBn ? 'কেনাকাটায় অ্যাকাউন্ট খুলুন' : 'Join Kenakata Today'}
 </h1>
 <p className="text-xs text-content-secondary mt-1">
 {isBn ? '১ মিনিটে অ্যাকাউন্ট খুলে দ্রুত কেনাকাটা শুরু করুন' : 'Instant orders, fast tracking, and exclusive discounts'}
 </p>
 </div>

 {/* Form */}
 <div className="p-8">
 {errorMsg && (
 <div className="flex items-center gap-2 p-3 mb-4 text-xs text-danger bg-danger-surface dark:bg-danger-surface rounded-xl border border-rose-200 dark:border-rose-900/50">
 <WarningCircle className="w-4 h-4 shrink-0" />
 <span>{errorMsg}</span>
 </div>
 )}

 <form onSubmit={handleRegister} className="space-y-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary dark:text-content-secondary uppercase tracking-wider mb-1.5">
 {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'}
 </label>
 <div className="relative">
 <User className="absolute left-4 top-3.5 w-4 h-4 text-content-tertiary" />
 <input
 type="text"
 required
 placeholder="Tanvir Hossain"
 value={fullName}
 onChange={(e) => setFullName(e.target.value)}
 className="w-full pl-11 pr-4 py-3 bg-surface-subtle dark:bg-surface-muted border border-border rounded-xl text-slate-900 dark:text-content-primary text-sm outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary dark:text-content-secondary uppercase tracking-wider mb-1.5">
 {isBn ? 'মোবাইল নম্বর' : 'Mobile Number'}
 </label>
 <div className="relative flex items-center">
 <span className="absolute left-4 flex items-center gap-1 text-xs font-semibold text-content-secondary dark:text-content-secondary border-r border-border pr-3">
 🇧🇩 +880
 </span>
 <input
 type="tel"
 required
 placeholder="1712 345678"
 value={phoneNumber.replace('+880', '')}
 onChange={handlePhoneChange}
 className="w-full pl-24 pr-4 py-3 bg-surface-subtle dark:bg-surface-muted border border-border rounded-xl text-slate-900 dark:text-content-primary text-sm outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary dark:text-content-secondary uppercase tracking-wider mb-1.5">
 {isBn ? 'ইমেইল (ঐচ্ছিক)' : 'Email Address (Optional)'}
 </label>
 <div className="relative">
 <EnvelopeSimple className="absolute left-4 top-3.5 w-4 h-4 text-content-tertiary" />
 <input
 type="email"
 placeholder="you@example.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full pl-11 pr-4 py-3 bg-surface-subtle dark:bg-surface-muted border border-border rounded-xl text-slate-900 dark:text-content-primary text-sm outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary dark:text-content-secondary uppercase tracking-wider mb-1.5">
 {isBn ? 'পাসওয়ার্ড' : 'Password'}
 </label>
 <div className="relative">
 <Lock className="absolute left-4 top-3.5 w-4 h-4 text-content-tertiary" />
 <input
 type="password"
 required
 placeholder="••••••••"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full pl-11 pr-4 py-3 bg-surface-subtle dark:bg-surface-muted border border-border rounded-xl text-slate-900 dark:text-content-primary text-sm outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 </div>

 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full py-3.5 bg-action-primary hover:bg-emerald-600 text-content-primary font-semibold rounded-xl shadow-lg shadow-action-primary/10 flex items-center justify-center gap-2 transition-all"
 >
 <span>{isSubmitting ? 'Creating...' : isBn ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </form>

 <div className="relative my-6 text-center">
 <div className="absolute inset-0 flex items-center">
 <div className="w-full border-t border-border dark:border-border" />
 </div>
 <span className="relative px-4 text-xs text-content-tertiary bg-white dark:bg-surface-subtle uppercase">
 {isBn ? 'অথবা' : 'or'}
 </span>
 </div>

 <button
 type="button"
 onClick={loginWithGoogle}
 className="w-full py-3 px-4 bg-white dark:bg-surface-muted hover:bg-surface-subtle dark:hover:bg-surface-muted text-content-secondary dark:text-content-secondary font-medium rounded-xl border border-border flex items-center justify-center gap-3 transition-colors text-xs font-semibold"
 >
 <svg className="w-4 h-4" viewBox="0 0 24 24">
 <path
 fill="#4285F4"
 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
 />
 <path
 fill="#34A853"
 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
 />
 <path
 fill="#FBBC05"
 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
 />
 <path
 fill="#EA4335"
 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
 />
 </svg>
 <span>{isBn ? 'গুগল দিয়ে সাইন ইন' : 'Sign In with Google'}</span>
 </button>

 <div className="text-center mt-6 text-xs text-content-tertiary">
 {isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}
 <Link href="/login" className="text-content-brand font-semibold hover:underline">
 {isBn ? 'লগইন করুন' : 'Sign in'}
 </Link>
 </div>
 </div>
 </div>
 </div>
 );
}
