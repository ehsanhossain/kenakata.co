'use client';

import React, { useState } from 'react';
import { MerchantShell } from '../../components/MerchantShell';
import {
  CreditCard, ArrowDownRight, CheckCircle, Clock, CurrencyDollar, Buildings
} from '@phosphor-icons/react';

export default function MerchantPayoutsPage() {
 const [requested, setRequested] = useState(false);

 const handleRequestPayout = () => {
 setRequested(true);
 };

 return (
 <MerchantShell
 title="Storefront Earnings & Bank Payouts"
 subtitle="Withdraw your store sales proceeds directly to your registered BRAC Bank account"
 >
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
 <div className="bg-canvas border border-border rounded-2xl p-5 shadow-sm">
 <p className="text-xs font-semibold text-content-tertiary uppercase tracking-wider">Available Balance</p>
 <p className="text-2xl font-bold font-mono text-success mt-1">৳35,000</p>
 <span className="text-[10px] text-content-tertiary mt-1 block">Ready for withdrawal</span>
 </div>
 <div className="bg-canvas border border-border rounded-2xl p-5 shadow-sm">
 <p className="text-xs font-semibold text-content-tertiary uppercase tracking-wider">Lifetime Payouts</p>
 <p className="text-2xl font-bold font-mono text-content-primary mt-1">৳2,50,000</p>
 <span className="text-[10px] text-content-tertiary mt-1 block">10 successful transfers</span>
 </div>
 <div className="bg-canvas border border-border rounded-2xl p-5 shadow-sm">
 <p className="text-xs font-semibold text-content-tertiary uppercase tracking-wider">Registered Account</p>
 <p className="text-sm font-bold text-content-secondary mt-1">BRAC Bank PLC</p>
 <span className="text-[10px] font-mono text-success mt-1 block">A/C: ...9001 (Verified)</span>
 </div>
 </div>

 <div className="bg-canvas border border-border rounded-2xl p-6 shadow-xl space-y-4">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
 <div>
 <h3 className="font-bold text-base text-content-primary">Withdraw Funds</h3>
 <p className="text-xs text-content-tertiary mt-0.5">Transfers are processed within 1 business day via BEFTN</p>
 </div>
 {requested ? (
 <span className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-success text-xs font-bold flex items-center gap-1.5">
 <CheckCircle className="w-4 h-4" /> Payout Request Submitted!
 </span>
 ) : (
 <button
 onClick={handleRequestPayout}
 className="px-6 py-2.5 rounded-xl bg-action-primary text-content-primary font-bold text-xs shadow-lg shadow-action-primary/10 hover:bg-success transition-all flex items-center gap-2"
 >
 <ArrowDownRight className="w-4 h-4" /> Request Payout of ৳35,000
 </button>
 )}
 </div>

 <div className="space-y-2">
 <h4 className="text-xs font-semibold text-content-tertiary uppercase tracking-wider">Recent Payout Transactions</h4>
 <div className="divide-y divide-slate-800/60">
 <div className="py-3 flex items-center justify-between">
 <div>
 <p className="font-mono font-bold text-content-primary text-xs">PAY-2026-0041</p>
 <p className="text-[11px] text-content-tertiary">BRAC Bank Transfer · Aug 14, 2026</p>
 </div>
 <div className="text-right">
 <p className="font-mono font-bold text-success text-sm">+৳25,000</p>
 <span className="text-[10px] font-semibold text-success">Transferred</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </MerchantShell>
 );
}
