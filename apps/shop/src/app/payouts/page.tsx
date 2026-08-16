'use client';

import React, { useState } from 'react';
import { MerchantShell } from '../../components/MerchantShell';
import { CreditCard, ArrowDownRight, CheckCircle2, Clock, DollarSign, Building2 } from 'lucide-react';

export default function MerchantPayoutsPage() {
  const [requested, setRequested] = useState(false);

  const handleRequestPayout = () => {
    setRequested(true);
  };

  return (
    <MerchantShell
      title="Store Earnings & Bank Payouts"
      subtitle="Withdraw your store sales proceeds directly to your registered BRAC Bank account"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Balance</p>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">৳35,000</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Ready for withdrawal</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lifetime Payouts</p>
          <p className="text-2xl font-bold font-mono text-white mt-1">৳2,50,000</p>
          <span className="text-[10px] text-slate-400 mt-1 block">10 successful transfers</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Account</p>
          <p className="text-sm font-bold text-slate-200 mt-1">BRAC Bank PLC</p>
          <span className="text-[10px] font-mono text-emerald-400 mt-1 block">A/C: ...9001 (Verified)</span>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base text-white">Withdraw Funds</h3>
            <p className="text-xs text-slate-400 mt-0.5">Transfers are processed within 1 business day via BEFTN</p>
          </div>
          {requested ? (
            <span className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Payout Request Submitted!
            </span>
          ) : (
            <button
              onClick={handleRequestPayout}
              className="px-6 py-2.5 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex items-center gap-2"
            >
              <ArrowDownRight className="w-4 h-4" /> Request Payout of ৳35,000
            </button>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recent Payout Transactions</h4>
          <div className="divide-y divide-slate-800/60">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-mono font-bold text-white text-xs">PAY-2026-0041</p>
                <p className="text-[11px] text-slate-400">BRAC Bank Transfer · Aug 14, 2026</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-emerald-400 text-sm">+৳25,000</p>
                <span className="text-[10px] font-semibold text-emerald-400">Transferred</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MerchantShell>
  );
}
