'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMerchantAuth } from '../../context/MerchantAuthContext';
import { Store, ShieldCheck, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MerchantLoginPage() {
  const { login, switchDemoMerchant } = useMerchantAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('dhaka.electronics@kenakata.co');
  const [password, setPassword] = useState('Shop@123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(emailOrPhone, password);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 antialiased font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-emerald to-emerald-400 text-slate-950 font-black text-xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            S
          </div>
          <h1 className="text-2xl font-bold text-white font-serif tracking-tight">Kenakata Merchant Center</h1>
          <p className="text-xs text-slate-400">Sign in to manage your local shop, catalog, and orders</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Merchant Email or Phone
              </label>
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="seller@kenakata.co or +88017..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 pr-10 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In to Merchant Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Fast Switch Demo Accounts */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
              Quick Test Merchant Logins
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setEmailOrPhone('dhaka.electronics@kenakata.co');
                  setPassword('Shop@123456');
                  switchDemoMerchant('APPROVED');
                }}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs transition-colors flex items-center justify-between group"
              >
                <div>
                  <p className="font-bold text-white group-hover:text-emerald-400">Dhaka Tech Hub (Approved)</p>
                  <p className="text-[10px] text-slate-500">dhaka.electronics@kenakata.co</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Live Store
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmailOrPhone('ctg.fashion@kenakata.co');
                  setPassword('Shop@123456');
                  switchDemoMerchant('UNDER_REVIEW');
                }}
                className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs transition-colors flex items-center justify-between group"
              >
                <div>
                  <p className="font-bold text-white group-hover:text-amber-400">Ctg Lifestyle (Under Review)</p>
                  <p className="text-[10px] text-slate-500">ctg.fashion@kenakata.co</p>
                </div>
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  KYC Pending
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Register Link */}
        <p className="text-center text-xs text-slate-400">
          Want to sell your products on Kenakata?{' '}
          <Link href="/register" className="text-emerald-400 font-bold hover:underline">
            Register New Shop
          </Link>
        </p>
      </div>
    </div>
  );
}
