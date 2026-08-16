'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AdminShell } from '../../../components/AdminShell';
import {
  Store, Building2, MapPin, Phone, Mail, FileText, CheckCircle2,
  XCircle, AlertCircle, ShieldCheck, ArrowLeft, ExternalLink, Download,
  Clock, Check, X, Sliders, RefreshCw
} from 'lucide-react';

export default function MerchantKycInspectorPage() {
  const params = useParams();
  const router = useRouter();
  const merchantId = params.id as string;

  const [status, setStatus] = useState<'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'>('UNDER_REVIEW');
  const [commissionRate, setCommissionRate] = useState(5.0);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState<string | null>(null);

  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      type: 'TRADE_LICENSE',
      title: 'City Corporation Trade License (2025-2026)',
      docNumber: 'TL-CTG-2025-4519',
      fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
      fileName: 'Trade_License_Ctg_2026.pdf',
      status: 'PENDING',
      expiry: 'June 30, 2026',
    },
    {
      id: 'doc-2',
      type: 'NID_FRONT',
      title: 'Smart National Identity Card (Front)',
      docNumber: '19882691234567890',
      fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
      fileName: 'NID_Rashedul_Front.jpg',
      status: 'PENDING',
    },
    {
      id: 'doc-3',
      type: 'NID_BACK',
      title: 'Smart National Identity Card (Back)',
      docNumber: '19882691234567890',
      fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
      fileName: 'NID_Rashedul_Back.jpg',
      status: 'PENDING',
    },
    {
      id: 'doc-4',
      type: 'BANK_CHEQUE',
      title: 'Bank Cheque Leaf / Account Statement',
      docNumber: 'IBBL-2050123456789012',
      fileUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200',
      fileName: 'Islami_Bank_Cheque.jpg',
      status: 'PENDING',
    },
  ]);

  const handleVerifyDoc = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: 'VERIFIED' } : d))
    );
  };

  const handleRejectDoc = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: 'REJECTED' } : d))
    );
  };

  const handleApproveShop = async () => {
    setIsApproving(true);
    setTimeout(() => {
      setStatus('APPROVED');
      setDocuments((prev) => prev.map((d) => ({ ...d, status: 'VERIFIED' })));
      setIsApproving(false);
    }, 600);
  };

  const handleConfirmReject = () => {
    if (!rejectionReason) return;
    setStatus('REJECTED');
    setIsRejectModalOpen(false);
  };

  return (
    <AdminShell
      title="KYC Document Inspector & Compliance Review"
      subtitle={`Application ID: ${merchantId} · Store: Ctg Lifestyle · Proprietor: Rashedul Karim`}
      actions={
        <Link
          href="/merchants"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Merchants
        </Link>
      }
    >
      {/* Top Banner Decision Status */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-emerald to-emerald-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Ctg Lifestyle</h2>
              {status === 'APPROVED' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified & Active
                </span>
              ) : status === 'REJECTED' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Needs Resubmission
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Compliance Review Required
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Proprietor: <strong className="text-slate-200">Rashedul Karim</strong> · Phone:{' '}
              <span className="font-mono text-emerald-400">+8801819988776</span> · Email:{' '}
              <span className="text-slate-300">ctg.fashion@kenakata.co</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {status !== 'APPROVED' && (
            <button
              onClick={() => setIsRejectModalOpen(true)}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" /> Request Resubmission
            </button>
          )}

          {status !== 'APPROVED' ? (
            <button
              onClick={handleApproveShop}
              disabled={isApproving}
              className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> {isApproving ? 'Activating...' : 'Approve & Activate Shop'}
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-xl text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" /> Store is Verified & Live on Kenakata.co
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Entity Details & Bank Account */}
        <div className="space-y-6">
          {/* Legal Entity Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" /> Business Entity
              </h3>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                SOLE_PROPRIETORSHIP
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">Trade License No</p>
                <p className="font-mono font-bold text-white mt-0.5">TL-CTG-2025-4519</p>
              </div>

              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">Trade License Expiry</p>
                <p className="font-mono font-medium text-emerald-400 mt-0.5">June 30, 2026 (Valid)</p>
              </div>

              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">e-TIN Number</p>
                <p className="font-mono font-medium text-slate-200 mt-0.5">987654321987 (Tax Zone 4, Ctg)</p>
              </div>

              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">Proprietor National ID (NID)</p>
                <p className="font-mono font-medium text-slate-200 mt-0.5">19882691234567890</p>
              </div>

              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">Store Pickup Address</p>
                <p className="font-medium text-slate-300 mt-0.5">
                  Shop 12, Level 2, GEC Circle Plaza, Agrabad, Chattogram 4000
                </p>
              </div>
            </div>
          </div>

          {/* Settlement Bank Account */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Settlement Account
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                Primary Account
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">Bank Name</p>
                <p className="font-bold text-white mt-0.5">Islami Bank Bangladesh PLC</p>
              </div>
              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">Branch & Routing</p>
                <p className="font-medium text-slate-300 mt-0.5 font-mono">Agrabad Branch (Routing: 125261890)</p>
              </div>
              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">Account Holder Name</p>
                <p className="font-bold text-slate-200 mt-0.5">Ctg Lifestyle Enterprise</p>
              </div>
              <div>
                <p className="text-slate-500 uppercase tracking-wider text-[10px]">Account Number</p>
                <p className="font-mono font-bold text-emerald-400 mt-0.5">2050123456789012</p>
              </div>
            </div>
          </div>

          {/* Platform Commission Rate */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" /> Platform Commission Rate
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Marketplace Fee</span>
              <span className="font-bold font-mono text-emerald-400 text-lg">{commissionRate}%</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="0.5"
              value={commissionRate}
              onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
              className="w-full accent-brand-emerald cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Standard rate is 5.0% - 6.0% for fashion and consumer electronics.
            </p>
          </div>
        </div>

        {/* Right Column: High Resolution Document Reviewer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base text-white">KYC Verification Documents ({documents.length})</h3>
                <p className="text-xs text-slate-400 mt-0.5">Inspect high resolution scans submitted by proprietor</p>
              </div>
            </div>

            {/* Document Scans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xs text-white truncate">{doc.title}</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">{doc.docNumber || doc.fileName}</p>
                      </div>
                      {doc.status === 'VERIFIED' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Verified
                        </span>
                      ) : doc.status === 'REJECTED' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          Rejected
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Preview Image Thumbnail */}
                    <div
                      onClick={() => setSelectedDocPreview(doc.fileUrl)}
                      className="relative h-44 bg-slate-950 overflow-hidden cursor-pointer group flex items-center justify-center p-2"
                    >
                      <img
                        src={doc.fileUrl}
                        alt={doc.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-slate-700">
                          <ExternalLink className="w-3.5 h-3.5" /> Click to Zoom
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Actions */}
                  <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleVerifyDoc(doc.id)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark Valid
                    </button>
                    <button
                      onClick={() => handleRejectDoc(doc.id)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/50 text-rose-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Mark Invalid
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Fullscreen Document Image Preview */}
      {selectedDocPreview && (
        <div
          onClick={() => setSelectedDocPreview(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
            <button
              onClick={() => setSelectedDocPreview(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedDocPreview} alt="Document High Res Preview" className="w-full h-auto object-contain max-h-[85vh]" />
          </div>
        </div>
      )}

      {/* Modal: Rejection / Resubmission Reason */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Request Resubmission</h3>
                <p className="text-xs text-slate-400">Specify why the documents were rejected</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Rejection Reason / Required Action
              </label>
              <textarea
                rows={4}
                required
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. The uploaded NID scan is blurry. Please upload a high-resolution photo of both front and back..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors shadow-lg shadow-rose-600/20"
              >
                Send Feedback to Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
