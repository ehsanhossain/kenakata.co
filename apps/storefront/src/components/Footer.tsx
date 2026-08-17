'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, Truck, CreditCard, Headset, Phone, EnvelopeSimple, MapPin
} from '@phosphor-icons/react';

const paymentMethodIcons = [
  'Group 1437253294.svg',
  'Group 1437253295.svg',
  'Group 1437253296.svg',
  'Group 1437253297.svg',
  'Group 1437253298.svg',
  'Group 1437253299.svg',
  'Group 1437253300.svg',
  'Group 1437253301.svg',
  'Group 1437253302.svg',
  'Group 1437253303.svg',
  'Group 1437253304.svg',
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[var(--k-orange-600)] via-[var(--k-orange-700)] to-[var(--k-orange-800)] text-white mt-auto font-sans shadow-inner">
      {/* ── Trust Bar ── */}
      <div className="border-b border-white/15 bg-black/5">
        <div className="container-page py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Authentic Products', desc: '100% genuine guaranteed' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide coverage' },
              { icon: CreditCard, title: 'Secure Payment', desc: 'COD & digital options' },
              { icon: Headset, title: 'Customer Support', desc: 'Always here to help' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0
                                group-hover:bg-white group-hover:text-[var(--k-orange-700)] text-white transition-all duration-normal shadow-sm">
                  <Icon className="w-6 h-6" weight="bold" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-tight">{title}</p>
                  <p className="text-xs text-white/80 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="container-page py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="Kenakata"
                width={120}
                height={28}
                className="h-7 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Bangladesh&apos;s trusted multi-category online store. Find it quickly, understand what you&apos;re buying, and always know what happens next.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white hover:text-[var(--k-orange-700)] text-white flex items-center justify-center transition-all text-xs font-bold shadow-sm"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white hover:text-[var(--k-orange-700)] text-white flex items-center justify-center transition-all text-xs font-bold shadow-sm"
              >
                IG
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white hover:text-[var(--k-orange-700)] text-white flex items-center justify-center transition-all text-xs font-bold shadow-sm"
              >
                YT
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {['Electronics', 'Fashion', 'Home & Living', 'Health & Beauty', 'Sports', 'Groceries'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/categories/${item.toLowerCase().replace(/ & /g, '-')}`}
                    className="text-xs sm:text-sm text-white/80 hover:text-white hover:underline transition-colors duration-fast"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Track Order', href: '/track' },
                { label: 'Help Center', href: '/help' },
                { label: 'Return Policy', href: '/help#returns' },
                { label: 'Shipping Info', href: '/help#shipping' },
                { label: 'FAQ', href: '/help#faq' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs sm:text-sm text-white/80 hover:text-white hover:underline transition-colors duration-fast"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Policies
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', href: '/help#privacy' },
                { label: 'Terms of Service', href: '/help#terms' },
                { label: 'Refund Policy', href: '/help#refunds' },
                { label: 'Warranty & Claims', href: '/help#warranty' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs sm:text-sm text-white/80 hover:text-white hover:underline transition-colors duration-fast"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-white mt-0.5 shrink-0" weight="bold" />
                <div>
                  <p className="text-xs sm:text-sm text-white font-bold">+880 9612-KENAKATA</p>
                  <p className="text-[11px] text-white/70">Sat–Thu, 9am–9pm</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <EnvelopeSimple className="w-4 h-4 text-white shrink-0" weight="bold" />
                <span className="text-xs sm:text-sm text-white/90">support@kenakata.co</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white mt-0.5 shrink-0" weight="bold" />
                <span className="text-xs sm:text-sm text-white/90">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Payment Methods & Copyright ── */}
      <div className="border-t border-white/15 bg-black/20">
        <div className="container-page py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="text-xs font-bold text-white/90 mr-2 uppercase tracking-wider">
                Payment Methods:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {paymentMethodIcons.map((file, idx) => (
                  <div
                    key={idx}
                    className="h-7 px-2.5 bg-white rounded-md flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                  >
                    <Image
                      src={`/payment-methods/${file}`}
                      alt={`Payment method ${idx + 1}`}
                      width={38}
                      height={20}
                      className="h-4.5 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright Kenakata 2026 */}
            <div className="text-xs text-white/90 text-center lg:text-right shrink-0">
              <p className="font-bold text-white">
                &copy; Kenakata 2026. All rights reserved.
              </p>
              <p className="text-[11px] text-white/70 mt-0.5">
                Bangladesh&apos;s Trusted Multi-Category Online Store
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
