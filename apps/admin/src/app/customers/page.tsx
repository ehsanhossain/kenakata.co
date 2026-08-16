'use client';

import React from 'react';
import { AdminShell } from '../../components/AdminShell';
import { Users, Phone, MapPin, ShoppingBag, CheckCircle2, Search } from 'lucide-react';

const mockCustomers = [
  {
    id: 'CUST-001',
    name: 'Tanvir Hossain',
    phone: '+8801712345678',
    email: 'customer@kenakata.co',
    division: 'Dhaka',
    ordersCount: 4,
    totalSpent: '৳1,24,500',
    status: 'ACTIVE',
    joinedDate: 'Aug 2026',
  },
  {
    id: 'CUST-002',
    name: 'Rahim Ahmed',
    phone: '+8801700112233',
    email: 'rahim.ahmed@gmail.com',
    division: 'Dhaka',
    ordersCount: 2,
    totalSpent: '৳75,998',
    status: 'ACTIVE',
    joinedDate: 'Aug 2026',
  },
  {
    id: 'CUST-003',
    name: 'Fatima Begum',
    phone: '+8801811223344',
    email: 'fatima.b@gmail.com',
    division: 'Chattogram',
    ordersCount: 1,
    totalSpent: '৳35,000',
    status: 'ACTIVE',
    joinedDate: 'Aug 2026',
  },
];

export default function CustomersManagementPage() {
  return (
    <AdminShell
      title="Customer Accounts & Profiles"
      subtitle="Registered shoppers authenticated via Phone OTP (+880 BD numbers) or Supabase Auth"
    >
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search customer phone (+880...), name..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">3 Registered Customers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Customer Name & ID</th>
                <th className="px-6 py-4">Phone (OTP Verified)</th>
                <th className="px-6 py-4">Division</th>
                <th className="px-6 py-4">Lifetime Orders</th>
                <th className="px-6 py-4">Total Spent (BDT)</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white text-sm">{c.name}</p>
                    <span className="text-[10px] text-slate-500 font-mono">{c.id} · Joined {c.joinedDate}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-400 font-semibold">{c.phone}</td>
                  <td className="px-6 py-4 text-slate-300">{c.division}</td>
                  <td className="px-6 py-4 font-mono font-semibold text-white">{c.ordersCount} orders</td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400">{c.totalSpent}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
