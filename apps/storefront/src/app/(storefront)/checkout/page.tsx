'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, CreditCard, Truck, ShieldCheck, Check, CaretDown, Lock, Phone, User, EnvelopeSimple, House, FileText, ShoppingBag, Money, DeviceMobile
} from '@phosphor-icons/react';
import { products, formatBDT } from '@/lib/mock-data';

type Step = 'contact' | 'address' | 'delivery' | 'payment' | 'review';

const steps: { key: Step; label: string; icon: React.ElementType }[] = [
 { key: 'contact', label: 'Contact', icon: Phone },
 { key: 'address', label: 'Address', icon: MapPin },
 { key: 'delivery', label: 'Delivery', icon: Truck },
 { key: 'payment', label: 'Payment', icon: CreditCard },
 { key: 'review', label: 'Review', icon: FileText },
];

const divisions = ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'];

export default function CheckoutPage() {
 const [currentStep, setCurrentStep] = useState<Step>('contact');
 const [form, setForm] = useState({
 name: '', phone: '', email: '',
 division: 'Dhaka', district: '', upazila: '', postalCode: '', addressLine: '', landmark: '',
 deliveryOption: 'standard',
 paymentMethod: 'cod',
 termsAccepted: false,
 });

 const currentStepIndex = steps.findIndex(s => s.key === currentStep);
 const orderItems = products.slice(0, 2);
 const subtotal = orderItems.reduce((s, p) => s + p.price, 0);
 const shipping = 6000;
 const total = subtotal + shipping;

 const nextStep = () => {
 const idx = currentStepIndex;
 if (idx < steps.length - 1) setCurrentStep(steps[idx + 1].key);
 };
 const prevStep = () => {
 const idx = currentStepIndex;
 if (idx > 0) setCurrentStep(steps[idx - 1].key);
 };

 return (
 <div className="min-h-screen bg-surface-subtle">
 {/* Checkout Header — simplified */}
 <header className="bg-white border-b border-border sticky top-0 z-30">
 <div className="container-page flex items-center justify-between h-14">
 <Link href="/" className="flex items-center gap-2">
 <div className="w-7 h-7 bg-action-primary rounded-md flex items-center justify-center">
 <span className="text-content-primary font-bold text-sm">K</span>
 </div>
 <span className="font-semibold text-content-primary">Checkout</span>
 </Link>
 <div className="flex items-center gap-1.5 text-xs text-content-tertiary">
 <Lock className="w-3.5 h-3.5 text-success" />
 <span>Secure Checkout</span>
 </div>
 </div>
 </header>

 {/* Progress Steps */}
 <div className="bg-white border-b border-border">
 <div className="container-page py-4">
 <div className="flex items-center justify-between max-w-2xl mx-auto">
 {steps.map((step, i) => {
 const isCompleted = i < currentStepIndex;
 const isCurrent = i === currentStepIndex;
 return (
 <div key={step.key} className="flex items-center gap-1 flex-1">
 <button
 onClick={() => i <= currentStepIndex && setCurrentStep(step.key)}
 className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors
 ${isCompleted ? 'text-success cursor-pointer' : isCurrent ? 'text-content-brand' : 'text-content-disabled'}
 `}
 >
 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
 ${isCompleted ? 'bg-semantic-success text-content-primary' : isCurrent ? 'bg-action-primary text-content-primary' : 'bg-neutral-200 text-content-tertiary'}
 `}>
 {isCompleted ? <Check className="w-3.5 h-3.5" /> : i + 1}
 </div>
 <span className="hidden sm:inline">{step.label}</span>
 </button>
 {i < steps.length - 1 && (
 <div className={`flex-1 h-0.5 mx-2 rounded ${i < currentStepIndex ? 'bg-semantic-success' : 'bg-neutral-200'}`} />
 )}
 </div>
 );
 })}
 </div>
 </div>
 </div>

 <div className="container-page py-6 sm:py-8">
 <div className="grid lg:grid-cols-12 gap-8">
 {/* ── Form Section ── */}
 <div className="lg:col-span-7">
 <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-sm">
 {/* Contact */}
 {currentStep === 'contact' && (
 <div className="animate-fade-in space-y-5">
 <h2 className="text-lg font-semibold text-content-primary">Contact Information</h2>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Full Name *</label>
 <div className="relative">
 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-disabled" />
 <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
 placeholder="আপনার নাম / Your name" className="input pl-10" />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Phone Number *</label>
 <div className="relative">
 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-disabled" />
 <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
 placeholder="01XXXXXXXXX" className="input pl-10" />
 </div>
 <p className="text-xs text-content-tertiary mt-1">We&apos;ll send order updates via SMS</p>
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Email (optional)</label>
 <div className="relative">
 <EnvelopeSimple className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-disabled" />
 <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
 placeholder="your@email.com" className="input pl-10" />
 </div>
 </div>
 </div>
 )}

 {/* Address */}
 {currentStep === 'address' && (
 <div className="animate-fade-in space-y-5">
 <h2 className="text-lg font-semibold text-content-primary">Delivery Address</h2>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Division *</label>
 <select value={form.division} onChange={e => setForm({ ...form, division: e.target.value })}
 className="input">
 {divisions.map(d => <option key={d} value={d}>{d}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">District *</label>
 <input type="text" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })}
 placeholder="e.g. Mirpur" className="input" />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Upazila/Thana *</label>
 <input type="text" value={form.upazila} onChange={e => setForm({ ...form, upazila: e.target.value })}
 className="input" />
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Postal Code</label>
 <input type="text" value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })}
 className="input" />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Address Details *</label>
 <textarea value={form.addressLine} onChange={e => setForm({ ...form, addressLine: e.target.value })}
 placeholder="House, Road, Building, Area" className="input min-h-[80px]" rows={3} />
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Landmark (optional)</label>
 <input type="text" value={form.landmark} onChange={e => setForm({ ...form, landmark: e.target.value })}
 placeholder="Near mosque, school, etc." className="input" />
 </div>
 </div>
 )}

 {/* Delivery */}
 {currentStep === 'delivery' && (
 <div className="animate-fade-in space-y-5">
 <h2 className="text-lg font-semibold text-content-primary">Delivery Option</h2>
 {[
 { value: 'standard', label: 'Standard Delivery', time: '3-5 business days', price: '৳60', desc: 'Delivered by Pathao' },
 { value: 'express', label: 'Express Delivery', time: '1-2 business days', price: '৳120', desc: 'Priority handling' },
 ].map(opt => (
 <label key={opt.value}
 className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
 form.deliveryOption === opt.value
 ? 'border-border-brand bg-surface-brand-subtle/30'
 : 'border-border hover:border-neutral-300'
 }`}>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <input type="radio" name="delivery" value={opt.value}
 checked={form.deliveryOption === opt.value}
 onChange={() => setForm({ ...form, deliveryOption: opt.value })}
 className="w-4 h-4 text-content-brand" />
 <div>
 <p className="text-sm font-medium text-content-primary">{opt.label}</p>
 <p className="text-xs text-content-tertiary">{opt.time} · {opt.desc}</p>
 </div>
 </div>
 <span className="text-sm font-semibold text-content-primary">{opt.price}</span>
 </div>
 </label>
 ))}
 </div>
 )}

 {/* Payment */}
 {currentStep === 'payment' && (
 <div className="animate-fade-in space-y-5">
 <h2 className="text-lg font-semibold text-content-primary">Payment Method</h2>
 {[
 { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive', icon: <Money className="w-5 h-5 text-emerald-600" weight="bold" /> },
 { value: 'bkash', label: 'bKash', desc: 'Pay with bKash mobile wallet', icon: <DeviceMobile className="w-5 h-5 text-pink-600" weight="bold" /> },
 { value: 'sslcommerz', label: 'Card / Online Banking', desc: 'Visa, Mastercard, bank transfer', icon: <CreditCard className="w-5 h-5 text-blue-600" weight="bold" /> },
 ].map(opt => (
 <label key={opt.value}
 className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
 form.paymentMethod === opt.value
 ? 'border-border-brand bg-surface-brand-subtle/30'
 : 'border-border hover:border-neutral-300'
 }`}>
 <div className="flex items-center gap-3">
 <input type="radio" name="payment" value={opt.value}
 checked={form.paymentMethod === opt.value}
 onChange={() => setForm({ ...form, paymentMethod: opt.value })}
 className="w-4 h-4 text-content-brand" />
 <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center">
    {opt.icon}
  </div>
 <div>
 <p className="text-sm font-medium text-content-primary">{opt.label}</p>
 <p className="text-xs text-content-tertiary">{opt.desc}</p>
 </div>
 </div>
 </label>
 ))}
 </div>
 )}

 {/* Review */}
 {currentStep === 'review' && (
 <div className="animate-fade-in space-y-5">
 <h2 className="text-lg font-semibold text-content-primary">Review Your Order</h2>
 <div className="space-y-3 text-sm">
 <div className="p-3 bg-surface-subtle rounded-lg">
 <p className="text-xs text-content-tertiary mb-1">Contact</p>
 <p className="font-medium">{form.name || 'Your Name'} · {form.phone || '01XXXXXXXXX'}</p>
 </div>
 <div className="p-3 bg-surface-subtle rounded-lg">
 <p className="text-xs text-content-tertiary mb-1">Delivery Address</p>
 <p className="font-medium">{form.addressLine || 'Address details'}, {form.upazila}, {form.district}, {form.division}</p>
 </div>
 <div className="p-3 bg-surface-subtle rounded-lg">
 <p className="text-xs text-content-tertiary mb-1">Delivery</p>
 <p className="font-medium">{form.deliveryOption === 'express' ? 'Express (1-2 days)' : 'Standard (3-5 days)'}</p>
 </div>
 <div className="p-3 bg-surface-subtle rounded-lg">
 <p className="text-xs text-content-tertiary mb-1">Payment</p>
 <p className="font-medium">{form.paymentMethod === 'cod' ? 'Cash on Delivery' : form.paymentMethod === 'bkash' ? 'bKash' : 'Card/Online Banking'}</p>
 </div>
 </div>
 <label className="flex items-start gap-2 p-3 rounded-lg border border-border">
 <input type="checkbox" checked={form.termsAccepted}
 onChange={e => setForm({ ...form, termsAccepted: e.target.checked })}
 className="w-4 h-4 mt-0.5 text-content-brand rounded" />
 <span className="text-sm text-content-secondary">
 I accept the <a href="/help/terms" className="text-content-brand hover:underline">Terms of Service</a> and <a href="/help/privacy" className="text-content-brand hover:underline">Privacy Policy</a>
 </span>
 </label>
 </div>
 )}

 {/* Navigation */}
 <div className="flex gap-3 mt-8 pt-5 border-t border-border">
 {currentStepIndex > 0 && (
 <button onClick={prevStep} className="btn-ghost flex-1 py-3">Back</button>
 )}
 {currentStep === 'review' ? (
 <Link href="/orders/success" className="btn-primary flex-1 py-3 text-base font-semibold rounded-xl">
 <Lock className="w-4 h-4" /> Place Order — {formatBDT(total)}
 </Link>
 ) : (
 <button onClick={nextStep} className="btn-primary flex-1 py-3 text-base font-semibold rounded-xl">
 Continue
 </button>
 )}
 </div>
 </div>
 </div>

 {/* ── Sticky Summary ── */}
 <div className="lg:col-span-5">
 <div className="sticky top-[120px]">
 <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
 <h3 className="text-sm font-semibold text-content-primary mb-4">Order Summary</h3>
 <div className="space-y-3 mb-4">
 {orderItems.map(p => (
 <div key={p.id} className="flex items-center gap-3">
 <div className="w-14 h-14 rounded-lg product-image-placeholder shrink-0 overflow-hidden"
 style={{ background: `hsl(${p.colorHue}, 30%, 92%)` }}>
 <div className="w-full h-full flex items-center justify-center">
 <ShoppingBag className="w-5 h-5 text-content-tertiary" />
 </div>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm text-content-primary line-clamp-1">{p.title}</p>
 <p className="text-xs text-content-tertiary">Qty: 1</p>
 </div>
 <span className="text-sm font-medium tabular-nums shrink-0">{formatBDT(p.price)}</span>
 </div>
 ))}
 </div>
 <div className="border-t border-border pt-3 space-y-2 text-sm">
 <div className="flex justify-between"><span className="text-content-secondary">Subtotal</span><span className="tabular-nums">{formatBDT(subtotal)}</span></div>
 <div className="flex justify-between"><span className="text-content-secondary">Delivery</span><span className="tabular-nums">{formatBDT(shipping)}</span></div>
 <div className="flex justify-between font-semibold text-content-primary pt-2 border-t border-border">
 <span>Total</span><span className="text-lg tabular-nums">{formatBDT(total)}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
