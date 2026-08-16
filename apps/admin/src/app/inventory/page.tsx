'use client';

import React from 'react';
import { AdminShell } from '../../components/AdminShell';
import { Warehouse, MapPin, Package, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

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
          <div key={wh.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold">
                  <Warehouse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{wh.name}</h3>
                  <span className="text-[10px] font-mono text-emerald-400">Code: {wh.code}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> {wh.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Active SKUs</p>
                <p className="font-mono font-bold text-white text-lg mt-0.5">{wh.activeSKUs}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Total Units</p>
                <p className="font-mono font-bold text-emerald-400 text-lg mt-0.5">{wh.totalUnits.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Occupancy</p>
                <p className="font-mono font-bold text-white text-lg mt-0.5">{wh.occupancy}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> {wh.location}
              </p>
              <p className="text-[11px] text-slate-500">Manager: {wh.manager}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
