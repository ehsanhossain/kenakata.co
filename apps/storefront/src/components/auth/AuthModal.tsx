'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Phone, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalView,
    openAuthModal,
    phoneForOtp,
    requestOtp,
    verifyOtp,
    loginWithPassword,
    signupWithPassword,
    loginWithGoogle,
  } = useAuth();
  const { isBn } = useLanguage();

  const [activeTab, setActiveTab] = useState<'otp' | 'password'>('otp');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync phone from context when view changes to 'otp'
  useEffect(() => {
    if (phoneForOtp) {
      setPhoneNumber(phoneForOtp);
      setCountdown(60);
      setCanResend(false);
    }
  }, [phoneForOtp, authModalView]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authModalView === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [authModalView, countdown]);

  if (!isAuthModalOpen) return null;

  // Handle phone format
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('880')) val = val.substring(3);
    if (val.startsWith('0')) val = val.substring(1);
    if (val.length > 10) val = val.substring(0, 10);
    setPhoneNumber(val ? `+880${val}` : '');
  };

  const handleRequestOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const rawNumber = phoneNumber.startsWith('+880') ? phoneNumber : `+880${phoneNumber.replace(/\D/g, '')}`;
    if (rawNumber.length < 14) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' : 'Please enter a valid 11-digit mobile number');
      return;
    }
    setIsSubmitting(true);
    const res = await requestOtp(rawNumber);
    setIsSubmitting(false);
    if (res.success) {
      setSuccessMsg(isBn ? `যাচাইকরণ কোড পাঠানো হয়েছে: ${res.debugCode || '123456'}` : `OTP Code sent (Demo code: ${res.debugCode || '123456'})`);
      setCountdown(60);
      setCanResend(false);
    } else {
      setErrorMsg(res.message || (isBn ? 'কোড পাঠানো সম্ভব হয়নি' : 'Failed to send OTP'));
    }
  };

  // Handle OTP digit changes
  const handleOtpDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const code = otpDigits.join('');
    if (code.length < 6) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে সম্পূর্ণ ৬ ডিজিটের কোড দিন' : 'Please enter all 6 digits');
      return;
    }
    setIsSubmitting(true);
    const res = await verifyOtp(phoneNumber, code);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.message || (isBn ? 'ভুল কোড দেওয়া হয়েছে' : 'Invalid OTP code'));
    }
  };

  const handlePasswordLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg(isBn ? 'সবগুলো তথ্য পূরণ করুন' : 'Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    const res = await loginWithPassword(email, password);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.message || (isBn ? 'লগইন ব্যর্থ হয়েছে' : 'Login failed'));
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
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
    if (!res.success) {
      setErrorMsg(res.message || (isBn ? 'অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে' : 'Registration failed'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-brand-charcoal to-slate-800 text-white relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isBn ? 'নিরাপদ অ্যাকাউন্ট' : 'Secure Access'}
          </div>
          <h2 className="text-2xl font-bold font-serif">
            {authModalView === 'otp'
              ? isBn ? 'ওটিপি যাচাই করুন' : 'Verify Mobile OTP'
              : authModalView === 'register'
              ? isBn ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create an Account'
              : isBn ? 'কেনাকাটায় স্বাগতম' : 'Welcome to Kenakata'}
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {authModalView === 'otp'
              ? isBn ? `${phoneNumber} নম্বরে পাঠানো কোডটি লিখুন` : `Enter the 6-digit code sent to ${phoneNumber}`
              : authModalView === 'register'
              ? isBn ? 'সহজেই এক মিনিটের মধ্যে রেজিস্ট্রেশন করুন' : 'Join thousands of happy shoppers in Bangladesh'
              : isBn ? 'লগইন করে আপনার অর্ডার এবং উইশলিস্ট দেখুন' : 'Sign in to access orders, rewards, and fast checkout'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {/* Alerts */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 mb-4 text-sm text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 mb-4 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* VIEW: LOGIN (TABS: OTP vs PASSWORD) */}
          {authModalView === 'login' && (
            <div>
              {/* Tab Switcher */}
              <div className="flex p-1 mb-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('otp')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'otp'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
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
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {isBn ? 'ইমেইল / পাসওয়ার্ড' : 'Email / Password'}
                  </span>
                </button>
              </div>

              {/* OTP Form */}
              {activeTab === 'otp' && (
                <form onSubmit={handleRequestOtpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {isBn ? 'মোবাইল নম্বর' : 'Mobile Number'}
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 pr-3">
                        🇧🇩 +880
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="1712 345678"
                        value={phoneNumber.replace('+880', '')}
                        onChange={handlePhoneChange}
                        className="w-full pl-24 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-brand-emerald focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      {isBn ? 'আমরা একটি ৬-সংখ্যার ওটিপি কোড পাঠাব' : 'We will send a 6-digit code via SMS'}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-brand-emerald hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? (isBn ? 'কোড পাঠানো হচ্ছে...' : 'Sending Code...') : (isBn ? 'ওটিপি কোড পাঠান' : 'Send Login Code')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Password Form */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {isBn ? 'ইমেইল বা মোবাইল' : 'Email or Phone'}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-emerald focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {isBn ? 'পাসওয়ার্ড' : 'Password'}
                      </label>
                      <button
                        type="button"
                        onClick={() => openAuthModal('register')}
                        className="text-xs text-brand-emerald hover:underline font-medium"
                      >
                        {isBn ? 'ভুলে গেছেন?' : 'Forgot?'}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-emerald focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-brand-charcoal hover:bg-slate-800 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? (isBn ? 'লগইন হচ্ছে...' : 'Signing in...') : (isBn ? 'লগইন করুন' : 'Sign In')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Social Login Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative px-4 text-xs text-slate-400 bg-white dark:bg-slate-900 uppercase">
                  {isBn ? 'অথবা' : 'or continue with'}
                </span>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full py-3 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 transition-colors shadow-sm"
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
                <span className="text-xs font-semibold">{isBn ? 'গুগল দিয়ে সাইন ইন' : 'Google Account'}</span>
              </button>

              {/* Bottom Switcher */}
              <div className="text-center mt-6 text-xs text-slate-500">
                {isBn ? 'নতুন গ্রাহক?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="text-brand-emerald font-semibold hover:underline"
                >
                  {isBn ? 'এখনই রেজিস্টার করুন' : 'Sign up now'}
                </button>
              </div>
            </div>
          )}

          {/* VIEW: OTP VERIFICATION */}
          {authModalView === 'otp' && (
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-center text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
                  {isBn ? '৬ সংখ্যার ওটিপি কোড' : 'Enter 6-Digit Verification Code'}
                </label>
                <div className="flex justify-center gap-2">
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpInputRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-emerald focus:border-transparent outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otpDigits.some((d) => !d)}
                className="w-full py-3.5 px-6 bg-brand-emerald hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50"
              >
                <span>{isSubmitting ? (isBn ? 'যাচাই করা হচ্ছে...' : 'Verifying...') : (isBn ? 'যাচাই করে প্রবেশ করুন' : 'Verify & Continue')}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium"
                >
                  {isBn ? 'নম্বর পরিবর্তন করুন' : 'Change Phone'}
                </button>

                {canResend ? (
                  <button
                    type="button"
                    onClick={handleRequestOtpSubmit}
                    className="text-brand-emerald font-semibold hover:underline"
                  >
                    {isBn ? 'পুনরায় কোড পাঠান' : 'Resend Code'}
                  </button>
                ) : (
                  <span className="text-slate-400 font-mono">
                    {isBn ? `পুনরায় পাঠাতে পারবেন: ${countdown}s` : `Resend in ${countdown}s`}
                  </span>
                )}
              </div>
            </form>
          )}

          {/* VIEW: REGISTER */}
          {authModalView === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  {isBn ? 'পূর্ণ নাম' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Tanvir Hossain"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-emerald focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  {isBn ? 'মোবাইল নম্বর' : 'Mobile Number'}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 pr-3">
                    🇧🇩 +880
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="1712 345678"
                    value={phoneNumber.replace('+880', '')}
                    onChange={handlePhoneChange}
                    className="w-full pl-24 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-emerald focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  {isBn ? 'পাসওয়ার্ড' : 'Create Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-emerald focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-brand-emerald hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50"
              >
                <span>{isSubmitting ? (isBn ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'Creating...') : (isBn ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center mt-4 text-xs text-slate-500">
                {isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-brand-emerald font-semibold hover:underline"
                >
                  {isBn ? 'লগইন করুন' : 'Sign in'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
