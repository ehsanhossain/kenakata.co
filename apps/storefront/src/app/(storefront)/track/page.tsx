'use client';

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, Phone, ShoppingBag } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [tracked, setTracked] = useState(false);

  return (
    <div className="container-page py-8 sm:py-12 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-2 text-center">Track Your Order</h1>
      <p className="text-neutral-500 text-center mb-8">Enter your order number and phone to get real-time updates</p>

      {/* Search form */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5 sm:p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Order Number</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input type="text" value={orderNumber} onChange={e => setOrderNumber(e.target.value)}
                placeholder="KNK-2026-XXXXX" className="input pl-10" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX" className="input pl-10" />
            </div>
          </div>
          <button onClick={() => setTracked(true)} className="btn-primary w-full py-3 rounded-xl">
            <Search className="w-4 h-4" /> Track Order
          </button>
        </div>
      </div>

      {/* Tracking result */}
      {tracked && (
        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden animate-slide-up">
          <div className="p-5 sm:p-6 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500">Order</p>
                <p className="font-bold text-brand-charcoal">KNK-2026-00847</p>
              </div>
              <span className="badge-amber">In Transit</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-5 sm:p-6">
            <div className="space-y-0">
              {[
                { icon: CheckCircle2, title: 'Order Placed', time: 'Aug 14, 2026 at 3:42 PM', desc: 'Your order has been confirmed', done: true },
                { icon: Package, title: 'Packed & Shipped', time: 'Aug 14, 2026 at 8:15 PM', desc: 'Handed to delivery partner', done: true },
                { icon: Truck, title: 'In Transit', time: 'Aug 15, 2026 at 10:30 AM', desc: 'Package is on the way to Dhaka hub', done: true, current: true },
                { icon: MapPin, title: 'Out for Delivery', time: 'Expected Aug 17', desc: 'Will be delivered to your address', done: false },
                { icon: CheckCircle2, title: 'Delivered', time: '', desc: '', done: false },
              ].map((step, i, arr) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      step.current ? 'bg-brand-blue text-white ring-4 ring-brand-blue/20' :
                      step.done ? 'bg-semantic-success text-white' : 'bg-neutral-200 text-neutral-400'
                    }`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[40px] ${step.done ? 'bg-semantic-success' : 'bg-neutral-200'}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${step.current ? 'text-brand-blue' : step.done ? 'text-brand-charcoal' : 'text-neutral-400'}`}>
                      {step.title}
                    </p>
                    {step.time && <p className="text-xs text-neutral-500 mt-0.5">{step.time}</p>}
                    {step.desc && <p className="text-xs text-neutral-400 mt-0.5">{step.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
