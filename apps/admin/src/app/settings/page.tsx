'use client';

import React, { useState } from 'react';
import { AdminShell } from '../../components/AdminShell';
import {
  GearSix, ShieldCheck, Truck, CurrencyDollar, FloppyDisk, CheckCircle
} from '@phosphor-icons/react';

export default function PlatformSettingsPage() {
 const [saved, setSaved] = useState(false);

 const handleSave = (e: React.FormEvent) => {
 e.preventDefault();
 setSaved(true);
 setTimeout(() => setSaved(false), 3000);
 };

 return (
 <AdminShell
 title="Platform GearSix & Rules"
 subtitle="Marketplace commission defaults, shipping charge matrix, and payment integrations"
 >
 <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
 {/* Commission GearSix */}
 <div className="bg-canvas border border-border rounded-2xl p-6 space-y-4">
 <h3 className="font-bold text-sm text-content-primary flex items-center gap-2">
 <CurrencyDollar className="w-4 h-4 text-success" /> Default Commission Rates
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs text-content-tertiary mb-1">Standard Merchant Take Rate (%)</label>
 <input
 type="number"
 defaultValue={5.0}
 step={0.1}
 className="w-full p-2.5 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-content-primary"
 />
 </div>
 <div>
 <label className="block text-xs text-content-tertiary mb-1">Fashion & Apparel Take Rate (%)</label>
 <input
 type="number"
 defaultValue={6.0}
 step={0.1}
 className="w-full p-2.5 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-content-primary"
 />
 </div>
 </div>
 </div>

 {/* Shipping Matrix */}
 <div className="bg-canvas border border-border rounded-2xl p-6 space-y-4">
 <h3 className="font-bold text-sm text-content-primary flex items-center gap-2">
 <Truck className="w-4 h-4 text-success" /> Bangladesh Delivery Rate Matrix
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs text-content-tertiary mb-1">Inside Dhaka Metro (BDT)</label>
 <input
 type="number"
 defaultValue={60}
 className="w-full p-2.5 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-content-primary"
 />
 </div>
 <div>
 <label className="block text-xs text-content-tertiary mb-1">Outside Dhaka / Nationwide (BDT)</label>
 <input
 type="number"
 defaultValue={120}
 className="w-full p-2.5 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-content-primary"
 />
 </div>
 </div>
 </div>

 <div className="flex items-center justify-between">
 {saved && (
 <span className="text-xs font-semibold text-success flex items-center gap-1.5">
 <CheckCircle className="w-4 h-4" /> Platform settings saved successfully!
 </span>
 )}
 <button
 type="submit"
 className="ml-auto px-6 py-2.5 rounded-xl bg-action-primary text-content-primary font-bold text-xs shadow-lg shadow-action-primary/10 hover:bg-success transition-all flex items-center gap-2"
 >
 <FloppyDisk className="w-4 h-4" /> FloppyDisk Changes
 </button>
 </div>
 </form>
 </AdminShell>
 );
}
