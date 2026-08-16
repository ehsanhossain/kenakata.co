'use client';

import React, { useState } from 'react';
import { AdminShell } from '../../components/AdminShell';
import { Settings, ShieldCheck, Truck, DollarSign, Save, CheckCircle2 } from 'lucide-react';

export default function PlatformSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminShell
      title="Platform Settings & Rules"
      subtitle="Marketplace commission defaults, shipping charge matrix, and payment integrations"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Commission Settings */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Default Commission Rates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Standard Merchant Take Rate (%)</label>
              <input
                type="number"
                defaultValue={5.0}
                step={0.1}
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Fashion & Apparel Take Rate (%)</label>
              <input
                type="number"
                defaultValue={6.0}
                step={0.1}
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white"
              />
            </div>
          </div>
        </div>

        {/* Shipping Matrix */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" /> Bangladesh Delivery Rate Matrix
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Inside Dhaka Metro (BDT)</label>
              <input
                type="number"
                defaultValue={60}
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Outside Dhaka / Nationwide (BDT)</label>
              <input
                type="number"
                defaultValue={120}
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {saved && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Platform settings saved successfully!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
