'use client';

import React, { useState } from 'react';
import { AdminShell } from '../../components/AdminShell';
import { CreditCard, CheckCircle2, Clock, DollarSign, Building2, Search, ArrowRight, ShieldCheck } from 'lucide-react';

const mockPayouts = [
  {
    id: 'PAY-2026-0041',
    merchant: 'Tanvir Hossain',
    shopName: 'Dhaka Tech Hub',
    amount: '৳25,000',
    fee: '৳0 (Zero Fee Tier)',
    netAmount: '৳25,000',
    method: 'BRAC Bank (A/C: ...9001)',
    status: 'TRANSFERRED',
    requestedAt: 'Aug 14, 2026',
    processedAt: 'Aug 15, 2026',
  },
  {
    id: 'PAY-2026-0042',
    merchant: 'Tanvir Hossain',
    shopName: 'Dhaka Tech Hub',
    amount: '৳35,000',
    fee: '৳0',
    netAmount: '৳35,000',
    method: 'BRAC Bank (A/C: ...9001)',
    status: 'REQUESTED',
    requestedAt: 'Aug 16, 2026 (Today)',
    processedAt: 'Pending Transfer',
  },
];

export default function PayoutsManagementPage() {
  const [payouts, setPayouts] = useState(mockPayouts);

  const handleApprovePayout = (id: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'TRANSFERRED', processedAt: 'Processed Just Now' } : p))
    );
  };

  return (
    <AdminShell
      title="Merchant Payouts & Commission Settlement"
      subtitle="Process merchant earnings withdrawals via BEFTN bank transfer or bKash / Nagad merchant payouts"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Payout Requests</p>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">৳35,000</p>
          <span className="text-[10px] text-slate-400 mt-1 block">1 request awaiting bank transfer</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Settled This Month</p>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">৳2,85,000</p>
          <span className="text-[10px] text-slate-400 mt-1 block">12 payouts completed</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform Commission Earned</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">৳14,250</p>
          <span className="text-[10px] text-slate-400 mt-1 block">5.0% average marketplace take rate</span>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">Withdrawal Requests</h3>
          <span className="text-xs text-slate-400 font-mono">BEFTN Bank Batch Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Payout ID & Date</th>
                <th className="px-6 py-4">Merchant Shop</th>
                <th className="px-6 py-4">Net Amount (BDT)</th>
                <th className="px-6 py-4">Settlement Destination</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payouts.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono font-bold text-white text-sm">{pay.id}</p>
                    <span className="text-[10px] text-slate-500">{pay.requestedAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-200">{pay.shopName}</p>
                    <p className="text-[11px] text-slate-400">{pay.merchant}</p>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400 text-sm">{pay.netAmount}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-300">{pay.method}</td>
                  <td className="px-6 py-4">
                    {pay.status === 'TRANSFERRED' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Transferred
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Clock className="w-3 h-3" /> Pending Transfer
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {pay.status === 'REQUESTED' ? (
                      <button
                        onClick={() => handleApprovePayout(pay.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
                      >
                        Release Payout
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono">{pay.processedAt}</span>
                    )}
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
