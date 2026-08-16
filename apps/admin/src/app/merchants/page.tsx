'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '../../components/AdminShell';
import {
  Store, ShieldCheck, Clock, AlertCircle, CheckCircle2,
  XCircle, Search, Filter, ArrowRight, Eye, Building2, MapPin, Phone
} from 'lucide-react';

const mockMerchants = [
  {
    id: 'merch-ctg-01',
    name: 'Rashedul Karim',
    email: 'ctg.fashion@kenakata.co',
    phone: '+8801819988776',
    shopName: 'Ctg Lifestyle',
    entityType: 'SOLE_PROPRIETORSHIP',
    tradeLicenseNo: 'TL-CTG-2025-4519',
    division: 'Chattogram',
    status: 'UNDER_REVIEW',
    kycDocsCount: 4,
    submittedAt: '10 mins ago',
    logo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=100',
  },
  {
    id: 'merch-dhk-01',
    name: 'Tanvir Hossain',
    email: 'dhaka.electronics@kenakata.co',
    phone: '+8801711223344',
    shopName: 'Dhaka Tech Hub',
    entityType: 'PRIVATE_LIMITED',
    tradeLicenseNo: 'TL-DHK-2024-9812',
    division: 'Dhaka',
    status: 'APPROVED',
    kycDocsCount: 4,
    submittedAt: 'Aug 10, 2026',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
    sales: '৳2,85,000',
    productsCount: 5,
  },
  {
    id: 'merch-syl-01',
    name: 'Nazmul Islam',
    email: 'sylhet.organic@kenakata.co',
    phone: '+8801915544332',
    shopName: 'Sylhet Tea & Agro',
    entityType: 'PARTNERSHIP',
    tradeLicenseNo: 'TL-SYL-2023-1102',
    division: 'Sylhet',
    status: 'REJECTED',
    kycDocsCount: 1,
    submittedAt: 'Aug 12, 2026',
    rejectionReason: 'Trade License expired on Dec 31, 2025. Please upload valid 2026 copy.',
    logo: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=100',
  },
];

export default function MerchantsListPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMerchants = mockMerchants.filter((m) => {
    if (activeTab !== 'ALL' && m.status !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        m.shopName.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.tradeLicenseNo.toLowerCase().includes(q) ||
        m.phone.includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UNDER_REVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5 animate-spin" /> Under Review
          </span>
        );
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified & Active
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" /> Needs Resubmission
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400">
            Draft
          </span>
        );
    }
  };

  return (
    <AdminShell
      title="Merchant KYC & Store Verification"
      subtitle="Review trade licenses, national identity, entity documents, and manage local store sellers"
      actions={
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 font-mono">
            1 Pending KYC Action
          </span>
        </div>
      }
    >
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Awaiting Verification</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2">1 Store</p>
          <p className="text-[11px] text-amber-400/80 mt-1">Ctg Lifestyle uploaded all 4 KYC documents</p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Stores</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2">1 Active Store</p>
          <p className="text-[11px] text-emerald-400/80 mt-1">Dhaka Tech Hub (5 Live Products)</p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resubmission Required</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2">1 Store</p>
          <p className="text-[11px] text-rose-400/80 mt-1">Sylhet Tea & Agro (Expired Trade License)</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Applications' },
            { id: 'UNDER_REVIEW', label: 'Under Review (1)' },
            { id: 'APPROVED', label: 'Approved (1)' },
            { id: 'REJECTED', label: 'Rejected (1)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand-emerald text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search store name, trade license..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
          />
        </div>
      </div>

      {/* Merchants Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Shop & Business Entity</th>
                <th className="px-6 py-4">Proprietor / Contact</th>
                <th className="px-6 py-4">Trade License & TIN</th>
                <th className="px-6 py-4">KYC Documents</th>
                <th className="px-6 py-4">Verification Status</th>
                <th className="px-6 py-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-slate-900/50 transition-colors">
                  {/* Shop Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white shrink-0">
                        {merchant.shopName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{merchant.shopName}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          <span className="font-mono">{merchant.entityType}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Proprietor */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-200">{merchant.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{merchant.phone}</p>
                    <p className="text-[11px] text-slate-500">{merchant.email}</p>
                  </td>

                  {/* Legal Registration */}
                  <td className="px-6 py-4">
                    <p className="font-mono font-semibold text-emerald-400">{merchant.tradeLicenseNo}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" /> {merchant.division} Division
                    </p>
                  </td>

                  {/* KYC Docs */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono font-semibold">
                      {merchant.kycDocsCount} Files Uploaded
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">Trade License, NID, Bank</p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {getStatusBadge(merchant.status)}
                    {merchant.rejectionReason && (
                      <p className="text-[10px] text-rose-400 max-w-xs truncate mt-1" title={merchant.rejectionReason}>
                        {merchant.rejectionReason}
                      </p>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/merchants/${merchant.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-brand-emerald hover:text-slate-950 font-semibold text-white transition-all shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect KYC</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
