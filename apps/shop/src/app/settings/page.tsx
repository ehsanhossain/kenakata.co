'use client';

import React, { useState } from 'react';
import { useMerchantAuth } from '../../context/MerchantAuthContext';
import { MerchantShell } from '../../components/MerchantShell';
import {
  GearSix, Storefront, MapPin, Phone, EnvelopeSimple, FloppyDisk, CheckCircle
} from '@phosphor-icons/react';

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
 title="Storefront GearSix & Pickup Address"
 subtitle="Manage your public store profile, courier pickup location, and notifications"
 >
 <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
 <div className="bg-canvas border border-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
 <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
 <Storefront className="w-4 h-4 text-success" /> Storefront Profile
 </h2>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Shop Display Name
 </label>
 <input
 type="text"
 defaultValue={merchant?.shop?.name || 'Dhaka Tech Hub'}
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Contact Phone
 </label>
 <input
 type="text"
 defaultValue={merchant?.phone || '+8801711223344'}
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-content-primary"
 />
 </div>

 <div className="sm:col-span-2">
 <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
 Courier Pickup Address (For Pathao/Steadfast)
 </label>
 <textarea
 rows={2}
 defaultValue={merchant?.shop?.fullAddress || 'Shop 42, Level 4, Multiplan Center, Elephant Road, Dhaka 1205'}
 className="w-full p-3 bg-surface-subtle border border-border rounded-xl text-xs text-content-primary"
 />
 </div>
 </div>
 </div>

 <div className="flex items-center justify-between">
 {saved && (
 <span className="text-xs font-semibold text-success flex items-center gap-1.5">
 <CheckCircle className="w-4 h-4" /> Storefront profile updated successfully!
 </span>
 )}
 <button
 type="submit"
 className="ml-auto px-6 py-2.5 rounded-xl bg-action-primary text-content-primary font-bold text-xs shadow-lg shadow-action-primary/10 hover:bg-success transition-all flex items-center gap-2"
 >
 <FloppyDisk className="w-4 h-4" /> FloppyDisk Storefront GearSix
 </button>
 </div>
 </form>
 </MerchantShell>
 );
}
