'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Phone, EnvelopeSimple, Lock, ArrowRight, ShieldCheck, CheckCircle, WarningCircle
} from '@phosphor-icons/react';

export default function LoginPage() {
 const router = useRouter();
 const { isBn } = useLanguage();
 const { requestOtp, verifyOtp, loginWithPassword, loginWithGoogle } = useAuth();

 const [activeTab, setActiveTab] = useState<'otp' | 'password'>('otp');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [otpStep, setOtpStep] = useState(false);
 const [otpCode, setOtpCode] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');
 const [successMsg, setSuccessMsg] = useState('');

 const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 let val = e.target.value.replace(/\D/g, '');
 if (val.startsWith('880')) val = val.substring(3);
 if (val.startsWith('0')) val = val.substring(1);
 if (val.length > 10) val = val.substring(0, 10);
 setPhoneNumber(val ? `+880${val}` : '');
 };

 const handleSendOtp = async (e: React.FormEvent) => {
 e.preventDefault();
 setErrorMsg('');
 setSuccessMsg('');
 const rawNumber = phoneNumber.startsWith('+880') ? phoneNumber : `+880${phoneNumber.replace(/\D/g, '')}`;
 if (rawNumber.length < 14) {
 setErrorMsg(isBn ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' : 'Please enter a valid 11-digit phone number');
 return;
 }
 setIsSubmitting(true);
 const res = await requestOtp(rawNumber);
 setIsSubmitting(false);
 if (res.success) {
 setOtpStep(true);
 setSuccessMsg(isBn ? `ওটিপি কোড পাঠানো হয়েছে (ডেমো: ${res.debugCode || '123456'})` : `Code sent (Demo: ${res.debugCode || '123456'})`);
 } else {
 setErrorMsg(res.message || 'Failed to send OTP');
 }
 };

 const handleVerifyOtp = async (e: React.FormEvent) => {
 e.preventDefault();
 setErrorMsg('');
 if (otpCode.length < 6) {
 setErrorMsg(isBn ? '৬ সংখ্যার কোড দিন' : 'Enter 6-digit code');
 return;
 }
 setIsSubmitting(true);
 const res = await verifyOtp(phoneNumber, otpCode);
 setIsSubmitting(false);
 if (res.success) {
 router.push('/account');
 } else {
 setErrorMsg(res.message || 'Invalid code');
 }
 };

 const handlePasswordLogin = async (e: React.FormEvent) => {
 e.preventDefault();
 setErrorMsg('');
 if (!email || !password) {
 setErrorMsg(isBn ? 'সবগুলো ঘর পূরণ করুন' : 'Fill all fields');
 return;
 }
 setIsSubmitting(true);
 const res = await loginWithPassword(email, password);
 setIsSubmitting(false);
 if (res.success) {
 router.push('/account');
 } else {
 setErrorMsg(res.message || 'Login failed');
 }
 };

 return (
 <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-subtle dark:bg-canvas">
 <div className="w-full max-w-md bg-white dark:bg-surface-subtle rounded-3xl shadow-xl border border-border dark:border-border overflow-hidden">
 {/* Header Banner */}
 <div className="p-8 bg-gradient-to-br from-brand-charcoal to-slate-800 text-content-primary">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-action-primary/20 text-content-brand text-xs font-semibold uppercase tracking-wider mb-2">
 <ShieldCheck className="w-3.5 h-3.5" />
 {isBn ? 'নিরাপদ অ্যাকাউন্ট' : 'Secure Login'}
 </div>
 <h1 className="text-2xl font-bold font-serif">
 {isBn ? 'কেনাকাটা অ্যাকাউন্টে প্রবেশ' : 'Sign in to Kenakata'}
 </h1>
 <p className="text-xs text-content-secondary mt-1">
 {isBn ? 'আপনার ফোন নম্বর বা ইমেইল দিয়ে সহজে লগইন করুন' : 'Manage your orders, wishlist, and fast checkout'}
 </p>
 </div>

 {/* Content */}
 <div className="p-8">
 {errorMsg && (
 <div className="flex items-center gap-2 p-3 mb-4 text-xs text-danger bg-danger-surface dark:bg-danger-surface rounded-xl border border-rose-200 dark:border-rose-900/50">
 <WarningCircle className="w-4 h-4 shrink-0" />
 <span>{errorMsg}</span>
 </div>
 )}

 {successMsg && (
 <div className="flex items-center gap-2 p-3 mb-4 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
 <CheckCircle className="w-4 h-4 shrink-0" />
 <span>{successMsg}</span>
 </div>
 )}

 {/* Tab Switcher */}
 {!otpStep && (
 <div className="flex p-1 mb-6 bg-surface-subtle dark:bg-surface-muted rounded-xl">
 <button
 type="button"
 onClick={() => setActiveTab('otp')}
 className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
 activeTab === 'otp'
 ? 'bg-white dark:bg-surface-subtle text-slate-900 dark:text-content-primary shadow-sm'
 : 'text-content-tertiary'
 }`}
 >
 <span className="flex items-center justify-center gap-1.5">
 <Phone className="w-3.5 h-3.5" />
 {isBn ? 'মোবাইল ওটিপি' : 'Phone OTP'}
 </span>
 </button>
 <button
 type="button"
 onClick={() => setActiveTab('password')}
 className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
 activeTab === 'password'
 ? 'bg-white dark:bg-surface-subtle text-slate-900 dark:text-content-primary shadow-sm'
 : 'text-content-tertiary'
 }`}
 >
 <span className="flex items-center justify-center gap-1.5">
 <EnvelopeSimple className="w-3.5 h-3.5" />
 {isBn ? 'ইমেইল ও পাসওয়ার্ড' : 'Email / Password'}
 </span>
 </button>
 </div>
 )}

 {/* Phone OTP Step 1 */}
 {activeTab === 'otp' && !otpStep && (
 <form onSubmit={handleSendOtp} className="space-y-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary dark:text-content-secondary uppercase tracking-wider mb-2">
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
 className="w-full pl-24 pr-4 py-3 bg-surface-subtle dark:bg-surface-muted border border-border rounded-xl text-slate-900 dark:text-content-primary font-medium focus:ring-2 focus:ring-action-primary/20 outline-none"
 />
 </div>
 </div>

 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full py-3.5 bg-action-primary hover:bg-emerald-600 text-content-primary font-semibold rounded-xl shadow-lg shadow-action-primary/10 flex items-center justify-center gap-2 transition-all"
 >
 <span>{isSubmitting ? 'Sending...' : isBn ? 'ওটিপি কোড পাঠান' : 'PaperPlaneTilt Login Code'}</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </form>
 )}

 {/* Phone OTP Step 2 */}
 {activeTab === 'otp' && otpStep && (
 <form onSubmit={handleVerifyOtp} className="space-y-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary dark:text-content-secondary uppercase tracking-wider mb-2 text-center">
 {isBn ? '৬-সংখ্যার কোড লিখুন' : 'Enter 6-Digit Code'}
 </label>
 <input
 type="text"
 maxLength={6}
 required
 autoFocus
 placeholder="123456"
 value={otpCode}
 onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
 className="w-full text-center text-2xl tracking-[0.4em] font-bold py-3 bg-surface-subtle dark:bg-surface-muted border border-border rounded-xl text-slate-900 dark:text-content-primary outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>

 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full py-3.5 bg-action-primary hover:bg-emerald-600 text-content-primary font-semibold rounded-xl shadow-lg shadow-action-primary/10 flex items-center justify-center gap-2 transition-all"
 >
 <span>{isSubmitting ? 'Verifying...' : isBn ? 'যাচাই করে প্রবেশ করুন' : 'Verify & Continue'}</span>
 <CheckCircle className="w-4 h-4" />
 </button>

 <button
 type="button"
 onClick={() => setOtpStep(false)}
 className="w-full text-center text-xs text-content-tertiary hover:underline pt-2"
 >
 {isBn ? 'নম্বর পরিবর্তন করুন' : 'Change Phone Number'}
 </button>
 </form>
 )}

 {/* Email / Password Form */}
 {activeTab === 'password' && (
 <form onSubmit={handlePasswordLogin} className="space-y-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary dark:text-content-secondary uppercase tracking-wider mb-1.5">
 {isBn ? 'ইমেইল বা মোবাইল' : 'Email or Phone'}
 </label>
 <div className="relative">
 <EnvelopeSimple className="absolute left-4 top-3.5 w-4 h-4 text-content-tertiary" />
 <input
 type="text"
 required
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
 className="w-full py-3.5 bg-surface-inverse hover:bg-surface-muted text-content-primary font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
 >
 <span>{isSubmitting ? 'Signing in...' : isBn ? 'লগইন করুন' : 'Sign In'}</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </form>
 )}

 {/* Social login */}
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
 {isBn ? 'নতুন গ্রাহক?' : "Don't have an account?"}{' '}
 <Link href="/register" className="text-content-brand font-semibold hover:underline">
 {isBn ? 'রেজিস্টার করুন' : 'Create an Account'}
 </Link>
 </div>
 </div>
 </div>
 </div>
 );
}
