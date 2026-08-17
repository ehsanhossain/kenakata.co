'use client';

import { useState } from 'react';
import {
  MapPin, Plus, PencilSimple, Trash, Star, House, Briefcase
} from '@phosphor-icons/react';

const savedAddresses = [
 { id: '1', label: 'House', icon: House, name: 'Rahim Ahmed', phone: '01712345678', division: 'Dhaka', district: 'Dhanmondi', address: 'House 42, Road 7, Dhanmondi R/A', postalCode: '1205', isDefault: true },
 { id: '2', label: 'Office', icon: Briefcase, name: 'Rahim Ahmed', phone: '01712345678', division: 'Dhaka', district: 'Motijheel', address: 'Level 4, BCS Tower, Dilkusha C/A', postalCode: '1000', isDefault: false },
];

export default function AddressesPage() {
 const [addresses, setAddresses] = useState(savedAddresses);
 const [showForm, setShowForm] = useState(false);

 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <h1 className="text-2xl font-bold text-content-primary">Saved Addresses</h1>
 <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
 <Plus className="w-4 h-4" /> Add Address
 </button>
 </div>

 {showForm && (
 <div className="bg-white rounded-xl border border-border shadow-sm p-5 animate-fade-in">
 <h2 className="text-lg font-semibold text-content-primary mb-4">New Address</h2>
 <div className="grid grid-cols-2 gap-4">
 <div className="col-span-2 sm:col-span-1">
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Label</label>
 <input type="text" placeholder="e.g. House, Office" className="input" />
 </div>
 <div className="col-span-2 sm:col-span-1">
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Full Name</label>
 <input type="text" className="input" />
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Phone</label>
 <input type="tel" placeholder="01XXXXXXXXX" className="input" />
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Division</label>
 <select className="input">
 {['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'].map(d => (
 <option key={d}>{d}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">District</label>
 <input type="text" className="input" />
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Postal Code</label>
 <input type="text" className="input" />
 </div>
 <div className="col-span-2">
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Address Details</label>
 <textarea className="input min-h-[80px]" rows={3} placeholder="House, Road, Area" />
 </div>
 </div>
 <div className="flex gap-3 mt-5">
 <button onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
 <button onClick={() => setShowForm(false)} className="btn-primary">FloppyDisk Address</button>
 </div>
 </div>
 )}

 <div className="grid sm:grid-cols-2 gap-4">
 {addresses.map(addr => (
 <div key={addr.id} className={`bg-white rounded-xl border-2 p-5 transition-all ${addr.isDefault ? 'border-border-brand shadow-sm' : 'border-border'}`}>
 <div className="flex items-center justify-between mb-3">
 <div className="flex items-center gap-2">
 <addr.icon className="w-4 h-4 text-content-brand" />
 <span className="text-sm font-semibold text-content-primary">{addr.label}</span>
 {addr.isDefault && <span className="badge-blue text-[10px]">Default</span>}
 </div>
 <div className="flex items-center gap-1">
 <button className="p-1.5 text-content-disabled hover:text-content-brand hover:bg-surface-brand-subtle rounded-md transition-all">
 <PencilSimple className="w-3.5 h-3.5" />
 </button>
 <button className="p-1.5 text-content-disabled hover:text-danger hover:bg-danger-soft rounded-md transition-all">
 <Trash className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>
 <p className="text-sm font-medium text-content-primary">{addr.name}</p>
 <p className="text-sm text-content-secondary mt-0.5">{addr.address}</p>
 <p className="text-sm text-content-tertiary">{addr.district}, {addr.division} {addr.postalCode}</p>
 <p className="text-xs text-content-disabled mt-1">{addr.phone}</p>
 {!addr.isDefault && (
 <button className="text-xs text-content-brand hover:text-content-brand mt-3 font-medium">
 Set as Default
 </button>
 )}
 </div>
 ))}
 </div>
 </div>
 );
}
