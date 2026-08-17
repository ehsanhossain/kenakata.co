'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlass, Package, Truck, CheckCircle, Clock, MapPin,
  Phone, ShoppingBag, CaretRight, Question, ShieldCheck, User,
  Calendar, ChatCircle, ArrowCounterClockwise, Sparkle
} from '@phosphor-icons/react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('KNK-2026-00847');
  const [phone, setPhone] = useState('01712345678');
  const [tracked, setTracked] = useState(true);

  const trackingSteps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      time: '15 Aug 2026, 03:45 PM',
      desc: 'Seller accepted order and packed items',
      done: true,
      current: false,
    },
    {
      icon: Package,
      title: 'Dispatched to Kenakata Sorting Hub',
      time: '15 Aug 2026, 08:30 PM',
      desc: 'Tejgaon Central Logistics Center',
      done: true,
      current: false,
    },
    {
      icon: Truck,
      title: 'In Transit (Pathao Express)',
      time: '16 Aug 2026, 11:15 AM',
      desc: 'Out for delivery to Banani, Dhaka hub',
      done: true,
      current: true,
    },
    {
      icon: MapPin,
      title: 'Out for Final Delivery',
      time: 'Expected: Today by 6:00 PM',
      desc: 'Rider assigned (Md. Al-Amin, 018XXXXXXXX)',
      done: false,
      current: false,
    },
    {
      icon: CheckCircle,
      title: 'Delivered & Handed Over',
      time: 'Pending confirmation',
      desc: 'Customer signature & OTP verification',
      done: false,
      current: false,
    },
  ];

  return (
    <div className="bg-canvas min-h-screen text-content-primary pb-16 font-sans">
      {/* ── Top Header Banner ── */}
      <section className="bg-gradient-to-r from-[var(--k-orange-600)] via-[var(--k-orange-500)] to-[var(--k-orange-600)] py-10 text-white shadow-inner">
        <div className="container-page max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm mb-3">
            <Truck className="w-4 h-4" weight="bold" />
            <span>Real-Time Parcel Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Enter your Kenakata Order ID and mobile number for live GPS delivery status
          </p>
        </div>
      </section>

      <div className="container-page max-w-3xl -mt-5 space-y-6">
        {/* ── Tracking Search Form ── */}
        <div className="bg-canvas border border-border rounded-2xl shadow-xl p-6 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setTracked(true);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-content-secondary mb-1.5">
                Order Number / Tracking ID
              </label>
              <div className="relative">
                <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" weight="bold" />
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. KNK-2026-00847"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface-subtle text-xs sm:text-sm text-content-primary focus:outline-none focus:border-action-primary focus:bg-canvas transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-content-secondary mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" weight="bold" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface-subtle text-xs sm:text-sm text-content-primary focus:outline-none focus:border-action-primary focus:bg-canvas transition-colors"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-action-primary hover:bg-action-primary-hover text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <MagnifyingGlass className="w-4 h-4" weight="bold" />
                <span>Track Live Status</span>
              </button>
            </div>
          </form>
        </div>

        {/* ── Live Tracking Card Result ── */}
        {tracked && (
          <div className="space-y-6 animate-slide-up">
            {/* Status Summary Strip */}
            <div className="bg-canvas border border-border rounded-2xl shadow-sm p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
                <div>
                  <span className="text-[10px] uppercase font-bold text-content-tertiary tracking-wider">
                    Order Reference
                  </span>
                  <h2 className="text-lg font-extrabold text-content-primary font-mono">
                    {orderNumber || 'KNK-2026-00847'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-warning-surface text-warning border border-warning/20">
                    <span className="w-2 h-2 rounded-full bg-warning animate-ping" />
                    In Transit · Out for Delivery
                  </span>
                </div>
              </div>

              {/* Delivery Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <p className="text-content-tertiary">Estimated Delivery:</p>
                  <p className="font-bold text-content-primary mt-0.5">Today, 6:00 PM</p>
                </div>
                <div>
                  <p className="text-content-tertiary">Courier Partner:</p>
                  <p className="font-bold text-content-brand mt-0.5">Pathao Express (Air)</p>
                </div>
                <div>
                  <p className="text-content-tertiary">Payment Method:</p>
                  <p className="font-bold text-content-primary mt-0.5">Cash on Delivery (COD)</p>
                </div>
                <div>
                  <p className="text-content-tertiary">Amount Due:</p>
                  <p className="font-bold font-mono text-content-brand mt-0.5">৳3,450</p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Delivery Progress Timeline */}
            <div className="bg-canvas border border-border rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
              <h3 className="font-bold text-base text-content-primary pb-3 border-b border-border">
                Package Progress Timeline
              </h3>

              <div className="space-y-0 relative pl-2 sm:pl-4">
                {trackingSteps.map((step, idx, arr) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 sm:gap-6 relative">
                      {/* Left Icon Node & Connector Line */}
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                            step.current
                              ? 'bg-action-primary text-white ring-4 ring-action-primary/20 shadow-md scale-110'
                              : step.done
                              ? 'bg-success text-white'
                              : 'bg-surface-muted text-content-disabled'
                          }`}
                        >
                          <Icon className="w-5 h-5" weight={step.done || step.current ? 'bold' : 'regular'} />
                        </div>
                        {idx < arr.length - 1 && (
                          <div
                            className={`w-0.5 min-h-[44px] sm:min-h-[48px] my-1 ${
                              step.done ? 'bg-success' : 'bg-border'
                            }`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-6 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <p
                            className={`text-xs sm:text-sm font-bold ${
                              step.current
                                ? 'text-action-primary'
                                : step.done
                                ? 'text-content-primary'
                                : 'text-content-disabled'
                            }`}
                          >
                            {step.title}
                          </p>
                          <span className="text-[11px] text-content-tertiary font-mono">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-content-secondary mt-0.5 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Need Help CTA */}
            <div className="bg-surface-brand-subtle border border-border-brand/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-action-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Question className="w-5 h-5" weight="bold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-content-primary">
                    Having trouble with this delivery?
                  </h4>
                  <p className="text-xs text-content-secondary mt-0.5">
                    Contact delivery rider or visit our Help Center for instant support.
                  </p>
                </div>
              </div>
              <Link
                href="/help"
                className="px-4 py-2 rounded-xl bg-action-primary hover:bg-action-primary-hover text-white font-bold text-xs shadow-sm transition-colors shrink-0"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
