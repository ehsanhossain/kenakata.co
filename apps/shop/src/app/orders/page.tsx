'use client';

import React, { useState } from 'react';
import { MerchantShell } from '../../components/MerchantShell';
import { Package, Truck, CheckCircle2, Clock, MapPin, Search } from 'lucide-react';

const mockShopOrders = [
  {
    id: 'KK-2026-89412',
    customer: 'Tanvir Hossain',
    phone: '+8801712345678',
    item: 'Samsung Galaxy A55 5G (8GB/128GB)',
    amount: '৳45,999',
    destination: 'Dhanmondi, Dhaka',
    status: 'IN_TRANSIT',
    courier: 'Pathao Courier (PTH-892147)',
    date: 'Aug 15, 2026',
  },
  {
    id: 'KK-2026-89411',
    customer: 'Rahim Ahmed',
    phone: '+8801700112233',
    item: 'Apple AirPods Pro 2',
    amount: '৳26,500',
    destination: 'Gulshan, Dhaka',
    status: 'READY_TO_SHIP',
    courier: 'Dhaka Central Hub Handover',
    date: 'Aug 16, 2026 (Today)',
  },
];

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState(mockShopOrders);

  const handleHandoverCourier = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: 'IN_TRANSIT', courier: 'Pathao Courier (PTH-992415)' } : o
      )
    );
  };

  return (
    <MerchantShell
      title="Store Orders & Dispatch Handover"
      subtitle="Fulfill customer orders, print shipping labels, and dispatch via Pathao or Steadfast courier"
    >
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search order number, phone..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">2 Active Orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Product Purchased</th>
                <th className="px-6 py-4">Customer & Address</th>
                <th className="px-6 py-4">Order Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Dispatch Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono font-bold text-white text-sm">{ord.id}</p>
                    <span className="text-[10px] text-slate-500">{ord.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-200">{ord.item}</p>
                    <span className="text-[10px] font-mono text-slate-400">{ord.courier}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-200">{ord.customer}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {ord.destination}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-white text-sm">{ord.amount}</td>
                  <td className="px-6 py-4">
                    {ord.status === 'IN_TRANSIT' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <Truck className="w-3 h-3" /> In Transit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Clock className="w-3 h-3" /> Ready to Ship
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {ord.status === 'READY_TO_SHIP' ? (
                      <button
                        onClick={() => handleHandoverCourier(ord.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
                      >
                        Handover to Pathao
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-400 font-semibold font-mono">Dispatched</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MerchantShell>
  );
}
