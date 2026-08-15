import Link from 'next/link';
import { ShieldCheck, Truck, CreditCard, Headphones, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white mt-auto">
      {/* ── Trust Bar ── */}
      <div className="border-b border-white/10">
        <div className="container-page py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Authentic Products', titleBn: 'আসল পণ্য', desc: '100% genuine guaranteed' },
              { icon: Truck, title: 'Fast Delivery', titleBn: 'দ্রুত ডেলিভারি', desc: 'Nationwide coverage' },
              { icon: CreditCard, title: 'Secure Payment', titleBn: 'নিরাপদ পেমেন্ট', desc: 'COD & digital options' },
              { icon: Headphones, title: 'Customer Support', titleBn: 'গ্রাহক সেবা', desc: 'Always here to help' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0
                                group-hover:bg-brand-blue/30 transition-colors duration-normal">
                  <Icon className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{desc}</p>
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
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <div>
                <span className="font-bold text-lg">Kenakata</span>
                <span className="text-[10px] text-neutral-400 block -mt-1 font-bengali">কেনাকাটা</span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              Bangladesh&apos;s trusted multi-category online store. Find it quickly, understand what you&apos;re buying, and always know what happens next.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-blue/30 transition-colors">
                <span className="text-sm">f</span>
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-blue/30 transition-colors">
                <span className="text-sm">IG</span>
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-blue/30 transition-colors">
                <span className="text-sm">YT</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-neutral-200 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2.5">
              {['Electronics', 'Fashion', 'Home & Living', 'Health & Beauty', 'Sports', 'Groceries'].map((item) => (
                <li key={item}>
                  <Link href={`/categories/${item.toLowerCase().replace(/ & /g, '-')}`} className="text-sm text-neutral-400 hover:text-white transition-colors duration-fast">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-neutral-200 uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Track Order', href: '/track' },
                { label: 'Return Policy', href: '/help/returns' },
                { label: 'Shipping Info', href: '/help/shipping' },
                { label: 'FAQ', href: '/help/faq' },
                { label: 'Contact Us', href: '/help/contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-neutral-400 hover:text-white transition-colors duration-fast">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-neutral-200 uppercase tracking-wider">Policies</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', href: '/help/privacy' },
                { label: 'Terms of Service', href: '/help/terms' },
                { label: 'Refund Policy', href: '/help/refunds' },
                { label: 'Warranty', href: '/help/warranty' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-neutral-400 hover:text-white transition-colors duration-fast">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-neutral-200 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-neutral-400">+880 1XXX-XXXXXX</p>
                  <p className="text-xs text-neutral-500">Sat–Thu, 9am–9pm</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <span className="text-sm text-neutral-400">support@kenakata.co</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
                <span className="text-sm text-neutral-400">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Payment Methods & Copyright ── */}
      <div className="border-t border-white/10">
        <div className="container-page py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500 mr-2">Payment Methods:</span>
              {['bKash', 'Nagad', 'Visa', 'Master', 'COD'].map((method) => (
                <div key={method} className="px-2.5 py-1 bg-white/10 rounded text-[11px] text-neutral-300 font-medium">
                  {method}
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              © 2026 Kenakata. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
