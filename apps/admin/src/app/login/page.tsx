'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  ShieldCheck, EnvelopeSimple, Lock, ArrowRight, Eye, EyeSlash, WarningCircle
} from '@phosphor-icons/react';

export default function AdminLoginPage() {
 const router = useRouter();
 const { login } = useAdminAuth();

 const [email, setEmail] = useState('admin@kenakata.co');
 const [password, setPassword] = useState('Admin@123456');
 const [showPassword, setShowPassword] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');

 const handleLogin = async (e: React.FormEvent) => {
 e.preventDefault();
 setErrorMsg('');
 if (!email || !password) {
 setErrorMsg('Please enter both email and password');
 return;
 }
 setIsSubmitting(true);
 const res = await login(email, password);
 setIsSubmitting(false);
 if (res.success) {
 router.push('/');
 } else {
 setErrorMsg(res.message || 'Invalid administrator credentials');
 }
 };

 const handleFillDemo = () => {
 setEmail('admin@kenakata.co');
 setPassword('Admin@123456');
 };

 return (
 <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-canvas text-content-primary selection:bg-action-primary selection:text-content-primary">
 {/* Background glow */}
 <div className="fixed inset-0 overflow-hidden pointer-events-none">
 <div className="absolute -top-40 -left-40 w-96 h-96 bg-success-surface rounded-full blur-3xl" />
 <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-info-surface rounded-full blur-3xl" />
 </div>

 <div className="relative w-full max-w-md bg-surface-subtle backdrop-blur-xl border border-border rounded-3xl p-8 sm:p-10 shadow-2xl">
 {/* Brand */}
 <div className="flex flex-col items-center text-center mb-8">
 <div className="w-14 h-14 bg-gradient-to-tr from-action-primary to-action-primary-hover rounded-2xl flex items-center justify-center shadow-lg shadow-action-primary/10 mb-4">
 <ShieldCheck className="w-8 h-8 text-content-primary" />
 </div>
 <h1 className="text-2xl font-bold text-content-primary tracking-tight">
 Kenakata Command Center
 </h1>
 <p className="text-xs text-content-tertiary mt-1">
 Authorized Personnel & Management Access Only
 </p>
 </div>

 {/* Error Alert */}
 {errorMsg && (
 <div className="flex items-center gap-2 p-3.5 mb-6 text-xs text-danger bg-danger-surface rounded-xl border border-rose-800/50">
 <WarningCircle className="w-4 h-4 shrink-0" />
 <span>{errorMsg}</span>
 </div>
 )}

 <form onSubmit={handleLogin} className="space-y-5">
 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
 Administrator Email
 </label>
 <div className="relative">
 <EnvelopeSimple className="absolute left-4 top-3.5 w-4 h-4 text-content-tertiary" />
 <input
 type="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="admin@kenakata.co"
 className="w-full pl-11 pr-4 py-3 bg-surface-muted/80 border border-slate-700 rounded-xl text-content-primary text-sm placeholder:text-slate-600 focus:ring-2 focus:ring-action-primary/20 focus:border-transparent outline-none transition-all"
 />
 </div>
 </div>

 <div>
 <div className="flex justify-between items-center mb-2">
 <label className="text-xs font-semibold text-content-secondary uppercase tracking-wider">
 Security Password
 </label>
 <button
 type="button"
 onClick={handleFillDemo}
 className="text-[11px] text-content-brand hover:underline font-medium"
 >
 Auto-fill Demo
 </button>
 </div>
 <div className="relative">
 <Lock className="absolute left-4 top-3.5 w-4 h-4 text-content-tertiary" />
 <input
 type={showPassword ? 'text' : 'password'}
 required
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="••••••••••••"
 className="w-full pl-11 pr-11 py-3 bg-surface-muted/80 border border-slate-700 rounded-xl text-content-primary text-sm placeholder:text-slate-600 focus:ring-2 focus:ring-action-primary/20 focus:border-transparent outline-none transition-all font-mono"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-4 top-3.5 text-content-tertiary hover:text-content-secondary"
 >
 {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
 </button>
 </div>
 </div>

 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full py-3.5 bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-content-primary font-bold rounded-xl shadow-lg shadow-action-primary/10 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50 mt-2"
 >
 <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </form>

 <div className="mt-8 pt-6 border-t border-border text-center">
 <p className="text-[11px] text-content-tertiary">
 Protected by End-to-End JWT Session Tokens & PostgreSQL 15 RBAC
 </p>
 </div>
 </div>
 </div>
 );
}
