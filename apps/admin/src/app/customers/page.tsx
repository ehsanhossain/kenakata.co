'use client';

import React from 'react';
import { AdminShell } from '../../components/AdminShell';
import {
  Users, Phone, MapPin, ShoppingBag, CheckCircle, MagnifyingGlass
} from '@phosphor-icons/react';

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
 <div className="bg-canvas border border-border rounded-2xl overflow-hidden shadow-xl">
 <div className="p-4 border-b border-border flex items-center justify-between">
 <div className="relative w-full max-w-sm">
 <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
 <input
 type="text"
 placeholder="Search customer phone (+880...), name..."
 className="w-full pl-10 pr-4 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-action-primary/20"
 />
 </div>
 <span className="text-xs text-content-tertiary font-mono">3 Registered Customers</span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs text-content-secondary">
 <thead className="bg-surface-subtle text-content-tertiary uppercase tracking-wider font-semibold border-b border-border">
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
 <tr key={c.id} className="hover:bg-surface-subtle/50 transition-colors">
 <td className="px-6 py-4">
 <p className="font-bold text-content-primary text-sm">{c.name}</p>
 <span className="text-[10px] text-content-tertiary font-mono">{c.id} · Joined {c.joinedDate}</span>
 </td>
 <td className="px-6 py-4 font-mono text-success font-semibold">{c.phone}</td>
 <td className="px-6 py-4 text-content-secondary">{c.division}</td>
 <td className="px-6 py-4 font-mono font-semibold text-content-primary">{c.ordersCount} orders</td>
 <td className="px-6 py-4 font-mono font-bold text-success">{c.totalSpent}</td>
 <td className="px-6 py-4">
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-success-surface text-success border border-success/20">
 <CheckCircle className="w-3 h-3" /> Active
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
