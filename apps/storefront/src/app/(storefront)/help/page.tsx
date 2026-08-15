import Link from 'next/link';
import { HelpCircle, ChevronDown, RotateCcw, Truck, ShieldCheck, CreditCard, Phone, Mail, MessageCircle, FileText, ExternalLink } from 'lucide-react';

const faqs = [
  { q: 'How do I track my order?', a: 'Go to the Track Order page and enter your order number and the phone number used during checkout. You\'ll see real-time status updates.' },
  { q: 'What is the return policy?', a: 'Most products can be returned within 7-14 days of delivery, provided they are unused and in original packaging. Some categories like groceries and personal care items are non-returnable.' },
  { q: 'How does Cash on Delivery work?', a: 'Select COD as your payment method during checkout. Pay the delivery person in cash when your order arrives. A small COD fee may apply for orders under ৳1,000.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days for Dhaka and 5-7 days for other divisions. Express delivery (1-2 days) is available for select areas.' },
  { q: 'Can I change my delivery address after placing an order?', a: 'You can update your delivery address within 2 hours of placing the order by contacting our support team. After that, changes may not be possible.' },
  { q: 'What payment methods do you accept?', a: 'We accept Cash on Delivery, bKash, Nagad, Visa, Mastercard, and bank transfers via SSLCommerz.' },
];

export default function HelpPage() {
  return (
    <div className="container-page py-8 sm:py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-brand-charcoal mb-2">Help Center</h1>
        <p className="text-neutral-500">Find answers to common questions and get support</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {[
          { icon: RotateCcw, label: 'Returns & Refunds', color: 'text-brand-blue bg-brand-blue-soft' },
          { icon: Truck, label: 'Delivery Info', color: 'text-semantic-success bg-semantic-success-soft' },
          { icon: CreditCard, label: 'Payment Help', color: 'text-semantic-warning bg-semantic-warning-soft' },
          { icon: ShieldCheck, label: 'Warranty', color: 'text-purple-600 bg-purple-50' },
        ].map(({ icon: Icon, label, color }) => (
          <button key={label} className="card p-4 flex flex-col items-center text-center hover:shadow-md transition-all group">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-brand-charcoal">{label}</span>
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-brand-charcoal mb-5">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <details key={i} className="group bg-white rounded-xl border border-neutral-100 overflow-hidden">
              <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none list-none">
                <span className="text-sm font-medium text-brand-charcoal pr-4">{q}</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <p className="text-sm text-neutral-600 leading-relaxed">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 text-center">
        <h2 className="text-xl font-bold text-brand-charcoal mb-2">Still need help?</h2>
        <p className="text-sm text-neutral-500 mb-6">Our support team is available Saturday–Thursday, 9am–9pm</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="btn-primary">
            <MessageCircle className="w-4 h-4" /> Live Chat
          </button>
          <button className="btn-secondary">
            <Phone className="w-4 h-4" /> Call Us
          </button>
          <button className="btn-ghost">
            <Mail className="w-4 h-4" /> Email Support
          </button>
        </div>
      </div>

      {/* Policy links */}
      <div className="grid sm:grid-cols-3 gap-4 mt-10">
        {[
          { icon: FileText, title: 'Privacy Policy', desc: 'How we handle your data' },
          { icon: FileText, title: 'Terms of Service', desc: 'Rules and conditions' },
          { icon: RotateCcw, title: 'Refund Policy', desc: 'How refunds work' },
        ].map(({ icon: Icon, title, desc }) => (
          <Link key={title} href="#" className="card p-4 flex items-start gap-3 hover:shadow-md transition-all group">
            <Icon className="w-5 h-5 text-brand-blue mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-brand-charcoal group-hover:text-brand-blue transition-colors">{title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
