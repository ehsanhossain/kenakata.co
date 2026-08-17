'use client';

import React from 'react';
import { AdminShell } from '../../components/AdminShell';
import {
  Warehouse, MapPin, Package, CheckCircle, TrendUp, Warning
} from '@phosphor-icons/react';

export default function InventoryManagementPage() {
 const warehouses = [
 {
 id: 'WH-DHK-01',
 name: 'Dhaka Central Distribution Hub',
 code: 'DHK-01',
 location: 'Tejgaon Industrial Area, Dhaka 1208',
 manager: 'Md. Shafiqul Islam',
 activeSKUs: 1450,
 totalUnits: 18450,
 occupancy: '68%',
 status: 'OPERATIONAL',
 },
 {
 id: 'WH-CTG-01',
 name: 'Chattogram Port Logistics Hub',
 code: 'CTG-01',
 location: 'Agrabad Commercial Area, Chattogram 4000',
 manager: 'Kamal Uddin',
 activeSKUs: 820,
 totalUnits: 9200,
 occupancy: '52%',
 status: 'OPERATIONAL',
 },
 ];

 return (
 <AdminShell
 title="Warehouse Logistics & Inventory Hubs"
 subtitle="Multi-warehouse stock distribution, real-time reserved units, and courier handover docks"
 >
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {warehouses.map((wh) => (
 <div key={wh.id} className="bg-canvas border border-border rounded-2xl p-6 shadow-xl space-y-4">
 <div className="flex items-center justify-between pb-3 border-b border-border">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-action-primary/10 text-content-brand flex items-center justify-center font-bold">
 <Warehouse className="w-5 h-5" />
 </div>
 <div>
 <h3 className="font-bold text-content-primary text-base">{wh.name}</h3>
 <span className="text-[10px] font-mono text-success">Code: {wh.code}</span>
 </div>
 </div>
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-success-surface text-success border border-success/20">
 <CheckCircle className="w-3 h-3" /> {wh.status}
 </span>
 </div>

 <div className="grid grid-cols-3 gap-3 bg-surface-subtle p-4 rounded-xl border border-border text-center">
 <div>
 <p className="text-[10px] uppercase tracking-wider text-content-tertiary">Active SKUs</p>
 <p className="font-mono font-bold text-content-primary text-lg mt-0.5">{wh.activeSKUs}</p>
 </div>
 <div>
 <p className="text-[10px] uppercase tracking-wider text-content-tertiary">Total Units</p>
 <p className="font-mono font-bold text-success text-lg mt-0.5">{wh.totalUnits.toLocaleString()}</p>
 </div>
 <div>
 <p className="text-[10px] uppercase tracking-wider text-content-tertiary">Occupancy</p>
 <p className="font-mono font-bold text-content-primary text-lg mt-0.5">{wh.occupancy}</p>
 </div>
 </div>

 <div className="space-y-1.5 text-xs text-content-tertiary">
 <p className="flex items-center gap-1.5">
 <MapPin className="w-3.5 h-3.5 text-content-tertiary" /> {wh.location}
 </p>
 <p className="text-[11px] text-content-tertiary">Manager: {wh.manager}</p>
 </div>
 </div>
 ))}
 </div>
 </AdminShell>
 );
}
