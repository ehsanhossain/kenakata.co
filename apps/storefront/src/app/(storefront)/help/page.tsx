'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MagnifyingGlass, CaretLeft, CaretDown, CaretRight, Truck,
  Package, Key, Tag, XCircle, ArrowCounterClockwise, CreditCard,
  MapPin, User, ChatCircle, Phone, EnvelopeSimple, ShieldCheck,
  Headset, Storefront, Info, CheckCircle, WarningCircle, Sparkle,
  DeviceMobile, ArrowSquareOut, Clock
} from '@phosphor-icons/react';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  const [complaintResult, setComplaintResult] = useState<string | null>(null);

  // Self Service Tools (8 Daraz-style items with orange icons)
  const selfServiceTools = [
    { icon: Truck, label: 'Track My Order', href: '/track', desc: 'Real-time parcel tracking' },
    { icon: Key, label: 'Reset Password', href: '/account/profile', desc: 'Change account security' },
    { icon: Tag, label: 'My Vouchers', href: '/categories', desc: 'Promo codes & discounts' },
    { icon: XCircle, label: 'Cancel My Order', href: '/account/orders', desc: 'Pre-dispatch cancellation' },
    { icon: ArrowCounterClockwise, label: 'Return My Order', href: '#returns', desc: '7-day easy returns policy' },
    { icon: CreditCard, label: 'My Payment Options', href: '#payments', desc: 'bKash, Nagad & COD' },
    { icon: MapPin, label: 'Change Delivery Address', href: '/account/addresses', desc: 'Update shipping info' },
    { icon: User, label: 'My Profile', href: '/account/profile', desc: 'Manage personal details' },
  ];

  // Top Questions / FAQs
  const topQuestions = [
    {
      q: 'How do I place an order on Kenakata?',
      cat: 'orders',
      a: 'Browse products, select your desired variant (size/color/quantity), click "Add to Cart" or "Buy Now", proceed to checkout, enter your delivery address, select a payment method (Cash on Delivery, bKash, Nagad, or Debit/Credit Card), and click "Confirm Order". You will receive an SMS confirmation instantly.',
    },
    {
      q: 'Can I change my order details after placing an order?',
      cat: 'orders',
      a: 'You can modify delivery details or cancel items within 1 hour of placing the order directly from your Account > Orders page, or by contacting our 24/7 customer support before the package is handed over to the courier.',
    },
    {
      q: 'What is Kenakata Hub / Collection Point Pickup?',
      cat: 'shipping',
      a: 'Kenakata Collection Points allow you to pick up your packages at a convenient local hub near your location with reduced delivery charges. You will receive an OTP via SMS once your parcel arrives at the collection point.',
    },
    {
      q: 'Why am I unable to use collectible discount vouchers?',
      cat: 'promotions',
      a: 'Ensure your cart total meets the minimum spend requirement for the voucher. Vouchers cannot be applied to flash sale items with maximum discounts, and each voucher is single-use per customer account.',
    },
    {
      q: 'What are the delivery timelines across Dhaka & Nationwide?',
      cat: 'shipping',
      a: 'Standard delivery in Dhaka Metro is 24–48 hours. Inter-district and division deliveries (Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, Mymensingh) take 3–5 business days via Pathao, Paperfly, and RedX partner networks.',
    },
    {
      q: 'How does Cash on Delivery (COD) and bKash/Nagad refund work?',
      cat: 'payments',
      a: 'For COD returns, refunds are sent directly to your registered bKash or Nagad wallet within 24–48 hours after our quality check. Digital payments (Cards/MFS) are refunded back to the original source within 3–7 business days.',
    },
  ];

  // Topic Categories
  const categories = [
    { icon: Tag, label: 'Promotions', id: 'promotions', count: '12 articles' },
    { icon: User, label: 'Account Management', id: 'account', count: '8 articles' },
    { icon: Package, label: 'Orders', id: 'orders', count: '15 articles' },
    { icon: Truck, label: 'Shipping & Delivery', id: 'shipping', count: '10 articles' },
    { icon: CreditCard, label: 'Payments', id: 'payments', count: '9 articles' },
    { icon: ArrowCounterClockwise, label: 'Returns & Refunds', id: 'returns', count: '14 articles' },
    { icon: Storefront, label: 'Sell On Kenakata', id: 'merchant', count: '11 articles' },
  ];

  const filteredFaqs = searchQuery
    ? topQuestions.filter(
        (f) =>
          f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory
    ? topQuestions.filter((f) => f.cat === selectedCategory)
    : topQuestions;

  const handleCheckComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintId) return;
    setComplaintResult(
      `Ticket #${complaintId.toUpperCase()}: Status is "Under Review by Senior Support Specialist". Last update: Package verification with Pathao Courier Hub.`
    );
  };

  return (
    <div className="bg-canvas min-h-screen text-content-primary pb-16 font-sans">
      {/* ── Top Subheader / Breadcrumb ── */}
      <div className="bg-canvas border-b border-border">
        <div className="container-page flex items-center justify-between h-11 text-xs text-content-secondary">
          <Link
            href="/"
            className="flex items-center gap-1 font-semibold text-content-brand hover:underline"
          >
            <CaretLeft className="w-3.5 h-3.5" weight="bold" />
            <span>Help Center</span>
          </Link>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/" className="hover:text-content-brand transition-colors">
              Homepage
            </Link>
            <span className="opacity-30">|</span>
            <a href="#faq" className="hover:text-content-brand transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero Search Banner (Kenakata Signature Vibrant Orange) ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[var(--k-orange-600)] via-[var(--k-orange-500)] to-[var(--k-orange-600)] py-12 md:py-16 text-white shadow-inner">
        {/* Subtle Decorative Curves */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[var(--k-orange-800)]/20 blur-2xl pointer-events-none" />

        <div className="container-page relative max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
            Hi, How can we help?
          </h1>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto shadow-2xl rounded-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for topics, questions, order issues..."
              className="w-full h-13 sm:h-14 pl-5 pr-14 sm:pr-16 bg-white text-content-primary rounded-2xl text-sm sm:text-base placeholder:text-content-tertiary focus:outline-none focus:ring-4 focus:ring-black/10 border border-transparent transition-all shadow-md"
            />
            <button
              aria-label="Search help center"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 bg-action-primary hover:bg-action-primary-hover text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shadow"
            >
              <MagnifyingGlass className="w-5 h-5" weight="bold" />
            </button>
          </div>

          {searchQuery && (
            <p className="text-xs text-white/80 mt-3">
              Found {filteredFaqs.length} matching topics for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </section>

      <div className="container-page max-w-5xl py-8 space-y-8">
        {/* ── Operational Timeline Banner ── */}
        <div className="bg-canvas border border-border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-surface-brand-subtle text-content-brand flex items-center justify-center shrink-0 border border-border-brand/20">
            <Clock className="w-5 h-5" weight="bold" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-content-primary flex items-center gap-2">
              <span>Kenakata Delivery Operations & 3PL Hub Timelines</span>
              <span className="text-[10px] bg-success-surface text-success font-mono font-bold px-2 py-0.5 rounded-full border border-success/20">
                Live
              </span>
            </h3>
            <p className="text-xs text-content-secondary mt-1 leading-relaxed">
              Dhaka Metro & Regional Express Hubs operate 7 days a week. Collection Points (CP) and Return Drop-off Centers are open 9:00 AM – 8:00 PM daily nationwide.
            </p>
          </div>
        </div>

        {/* ── Self Service Tools (8 Circular Orange Icons Grid) ── */}
        <section className="bg-canvas border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-content-primary mb-6">
            Self Service Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {selfServiceTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.label}
                  href={tool.href}
                  className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-surface-brand-subtle transition-all duration-fast group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface-brand-subtle border-2 border-action-primary/30 group-hover:border-action-primary group-hover:bg-action-primary flex items-center justify-center text-action-primary group-hover:text-white transition-all duration-normal shadow-sm group-hover:scale-105 mb-2.5">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" weight="bold" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-content-primary group-hover:text-content-brand transition-colors">
                    {tool.label}
                  </span>
                  <span className="text-[10px] text-content-tertiary mt-0.5 hidden sm:block">
                    {tool.desc}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Top Questions & My Cases (Two-Column Section) ── */}
        <section id="faq" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Top Questions (2 cols) */}
          <div className="lg:col-span-2 bg-canvas border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base sm:text-lg font-bold text-content-primary">
                Top Questions
              </h2>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-content-brand font-semibold hover:underline"
                >
                  Clear Category Filter
                </button>
              )}
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-border rounded-xl overflow-hidden transition-all bg-surface-subtle"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-content-primary hover:text-content-brand transition-colors gap-3"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-action-primary shrink-0" />
                        {faq.q}
                      </span>
                      <CaretDown
                        className={`w-4 h-4 text-content-tertiary shrink-0 transition-transform duration-normal ${
                          isOpen ? 'rotate-180 text-action-primary' : ''
                        }`}
                        weight="bold"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-content-secondary leading-relaxed bg-canvas border-t border-border/50 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: My Cases & Complaint Tracker */}
          <div className="space-y-6">
            <div className="bg-canvas border border-border rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-brand-subtle text-action-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" weight="bold" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-content-primary">My Cases</h3>
                  <p className="text-xs text-content-tertiary">To view your complaints & disputes</p>
                </div>
              </div>

              <p className="text-xs text-content-secondary leading-relaxed">
                Check status of submitted return requests, missing items, or payment refund tickets.
              </p>

              <button
                onClick={() => setShowCaseModal(true)}
                className="w-full py-2.5 rounded-xl border-2 border-action-primary text-action-primary hover:bg-action-primary hover:text-white font-bold text-xs transition-all duration-normal flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Click Here</span>
                <CaretRight className="w-3.5 h-3.5" weight="bold" />
              </button>
            </div>

            {/* Quick Contact Widget */}
            <div className="bg-surface-brand-subtle border border-border-brand/20 rounded-2xl p-6 space-y-3">
              <h3 className="font-bold text-sm text-content-primary flex items-center gap-2">
                <Headset className="w-4 h-4 text-action-primary" weight="bold" />
                Need Urgent Assistance?
              </h3>
              <p className="text-xs text-content-secondary leading-relaxed">
                Our support agents in Dhaka are ready to assist with real-time order issues.
              </p>
              <button
                onClick={() => setShowChatModal(true)}
                className="w-full py-2.5 rounded-xl bg-action-primary hover:bg-action-primary-hover text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ChatCircle className="w-4 h-4" weight="bold" />
                <span>Start Live Chat</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Topic Categories Grid (7 Daraz-style Cards) ── */}
        <section className="bg-canvas border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-content-primary mb-6">
            Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat.id);
                    const el = document.getElementById('faq');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-normal group ${
                    isSelected
                      ? 'bg-surface-brand-subtle border-action-primary shadow-sm'
                      : 'bg-canvas border-border hover:border-border-brand hover:shadow-md'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-surface-brand-subtle text-action-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" weight="bold" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-content-primary group-hover:text-content-brand transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-[11px] text-content-tertiary mt-1 font-medium">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Virtual Assistant & Customer Support 24/7 Strip ── */}
        <section className="bg-canvas border border-border rounded-2xl p-6 shadow-sm">
          <p className="text-center text-xs font-bold text-content-tertiary uppercase tracking-wider mb-6">
            KenaBot, Our Virtual Assistant: 24/7
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Live Chat */}
            <div
              onClick={() => setShowChatModal(true)}
              className="flex items-center gap-4 p-4 rounded-xl bg-surface-subtle border border-border hover:border-border-brand cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-brand-subtle text-action-primary flex items-center justify-center shrink-0 group-hover:bg-action-primary group-hover:text-white transition-colors">
                <Headset className="w-6 h-6" weight="bold" />
              </div>
              <div>
                <p className="text-sm font-bold text-content-primary group-hover:text-content-brand transition-colors">
                  Contact Customer Care
                </p>
                <p className="text-xs text-content-tertiary mt-0.5">
                  Live Chat: 9AM - 11PM (Everyday)
                </p>
              </div>
            </div>

            {/* Hotline Call */}
            <a
              href="tel:16789"
              className="flex items-center gap-4 p-4 rounded-xl bg-surface-subtle border border-border hover:border-border-brand transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-brand-subtle text-action-primary flex items-center justify-center shrink-0 group-hover:bg-action-primary group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" weight="bold" />
              </div>
              <div>
                <p className="text-sm font-bold text-content-primary group-hover:text-content-brand transition-colors">
                  Call Us on 16789 / 09612-KENAKATA
                </p>
                <p className="text-xs text-content-tertiary mt-0.5">
                  9AM - 9PM (Saturday – Thursday)
                </p>
              </div>
            </a>
          </div>
        </section>
      </div>

      {/* ── Case Tracking Modal ── */}
      {showCaseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-canvas border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-bold text-base text-content-primary">Check Dispute / Case Status</h3>
              <button
                onClick={() => {
                  setShowCaseModal(false);
                  setComplaintResult(null);
                }}
                className="p-1 text-content-tertiary hover:text-content-primary rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCheckComplaint} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-content-secondary mb-1">
                  Ticket or Order Number
                </label>
                <input
                  type="text"
                  value={complaintId}
                  onChange={(e) => setComplaintId(e.target.value)}
                  placeholder="e.g. TKT-2026-8910 or KNK-2026-00847"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface-subtle text-xs text-content-primary placeholder:text-content-tertiary focus:outline-none focus:border-action-primary"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-action-primary hover:bg-action-primary-hover text-white font-bold text-xs transition-colors"
              >
                Track Case
              </button>
            </form>

            {complaintResult && (
              <div className="p-3.5 rounded-xl bg-surface-brand-subtle border border-border-brand/30 text-xs text-content-primary leading-relaxed animate-fade-in">
                {complaintResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Live Chat Modal / Drawer ── */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-canvas border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <h3 className="font-bold text-base text-content-primary">KenaBot Live Support</h3>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 text-content-tertiary hover:text-content-primary rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="h-48 rounded-xl bg-surface-subtle border border-border p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-xl border border-border max-w-[85%] text-xs shadow-sm">
                  <p className="font-bold text-content-brand mb-0.5">KenaBot (Virtual Agent):</p>
                  <p className="text-content-secondary">
                    নমস্কার / সালাম! How can I assist with your Kenakata order today?
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-center text-content-tertiary">
                Support specialist will join automatically if needed.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-border bg-surface-subtle text-xs text-content-primary focus:outline-none focus:border-action-primary"
              />
              <button
                onClick={() => alert('Message sent to Kenakata Support Specialist!')}
                className="px-4 py-2.5 rounded-xl bg-action-primary text-white font-bold text-xs"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
