'use client';

import React, { useState } from 'react';
import { useMerchantAuth } from '../../context/MerchantAuthContext';
import { MerchantShell } from '../../components/MerchantShell';
import { Settings, Store, MapPin, Phone, Mail, Save, CheckCircle2 } from 'lucide-react';

export default function MerchantSettingsPage() {
  const { merchant } = useMerchantAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <MerchantShell
      title="Store Settings & Pickup Address"
      subtitle="Manage your public store profile, courier pickup location, and notifications"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-400" /> Store Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Shop Display Name
              </label>
              <input
                type="text"
                defaultValue={merchant?.shop?.name || 'Dhaka Tech Hub'}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Contact Phone
              </label>
              <input
                type="text"
                defaultValue={merchant?.phone || '+8801711223344'}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Courier Pickup Address (For Pathao/Steadfast)
              </label>
              <textarea
                rows={2}
                defaultValue={merchant?.shop?.fullAddress || 'Shop 42, Level 4, Multiplan Center, Elephant Road, Dhaka 1205'}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {saved && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Store profile updated successfully!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Store Settings
          </button>
        </div>
      </form>
    </MerchantShell>
  );
}
