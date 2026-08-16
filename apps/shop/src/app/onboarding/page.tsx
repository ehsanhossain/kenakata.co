'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMerchantAuth } from '../../context/MerchantAuthContext';
import { MerchantShell } from '../../components/MerchantShell';
import {
  Building2, FileText, CreditCard, Send, CheckCircle2,
  Clock, AlertCircle, Upload, ShieldCheck, ArrowRight, ArrowLeft,
  Store, Check, Sparkles, AlertTriangle
} from 'lucide-react';

export default function MerchantOnboardingPage() {
  const router = useRouter();
  const { merchant, updateShopData, updateStatus } = useMerchantAuth();

  const [activeStep, setActiveStep] = useState(
    merchant?.status === 'APPROVED' ? 5 : merchant?.status === 'UNDER_REVIEW' ? 4 : 1
  );

  // Form states
  const [entityType, setEntityType] = useState(merchant?.shop?.entityType || 'SOLE_PROPRIETORSHIP');
  const [tradeLicenseNo, setTradeLicenseNo] = useState(merchant?.shop?.tradeLicenseNo || 'TL-DHK-2026-8812');
  const [tinNo, setTinNo] = useState(merchant?.shop?.tinNo || '123456789012');
  const [binNo, setBinNo] = useState(merchant?.shop?.binNo || '987654321098');
  const [nidNo, setNidNo] = useState(merchant?.shop?.nidNo || '19902692812345678');
  const [division, setDivision] = useState(merchant?.shop?.division || 'Dhaka');
  const [district, setDistrict] = useState(merchant?.shop?.district || 'Dhaka');
  const [fullAddress, setFullAddress] = useState(
    merchant?.shop?.fullAddress || 'Level 4, BCS Computer City, Dhaka 1205'
  );

  // Step 2 uploaded documents
  const [uploadedDocs, setUploadedDocs] = useState([
    { type: 'TRADE_LICENSE', title: 'City Corporation Trade License', file: 'Trade_License_2026.pdf', uploaded: true },
    { type: 'NID_FRONT', title: 'National Identity (NID) Front', file: 'NID_Front_Scan.jpg', uploaded: true },
    { type: 'NID_BACK', title: 'National Identity (NID) Back', file: 'NID_Back_Scan.jpg', uploaded: true },
    { type: 'BANK_CHEQUE', title: 'Bank Cheque Leaf / Statement', file: 'BRAC_Bank_Cheque.jpg', uploaded: true },
  ]);

  // Step 3 bank details
  const [bankName, setBankName] = useState('BRAC Bank PLC');
  const [branchName, setBranchName] = useState('Gulshan Branch');
  const [routingNumber, setRoutingNumber] = useState('060261234');
  const [accountHolderName, setAccountHolderName] = useState(merchant?.name || 'Dhaka Tech Hub Ltd');
  const [accountNumber, setAccountNumber] = useState('1501203456789001');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    updateShopData({
      entityType,
      tradeLicenseNo,
      tinNo,
      binNo,
      nidNo,
      division,
      district,
      fullAddress,
    });
    setActiveStep(2);
  };

  const handleSaveStep2 = () => {
    setActiveStep(3);
  };

  const handleSaveStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(4);
  };

  const handleSubmitForReview = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      updateStatus('UNDER_REVIEW');
      setIsSubmitting(false);
    }, 800);
  };

  const steps = [
    { id: 1, title: 'Business Entity', icon: Building2 },
    { id: 2, title: 'KYC Documents', icon: FileText },
    { id: 3, title: 'Settlement Bank', icon: CreditCard },
    { id: 4, title: 'Compliance Review', icon: Send },
    { id: 5, title: 'Store Live', icon: CheckCircle2 },
  ];

  return (
    <MerchantShell
      title="Store Owner KYC & Compliance Verification"
      subtitle="Complete your mandatory Bangladesh business entity verification to activate sales on Kenakata.co"
    >
      {/* Rejection Alert Banner if applicable */}
      {merchant?.status === 'REJECTED' && merchant.rejectionReason && (
        <div className="bg-rose-950/80 border border-rose-500/50 rounded-3xl p-6 shadow-xl flex items-start gap-4 animate-fadeIn">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">KYC Resubmission Required by Kenakata Compliance</h3>
            <p className="text-xs text-rose-200 mt-1">{merchant.rejectionReason}</p>
            <p className="text-[11px] text-slate-400 mt-2">
              Please update the highlighted documents below and re-submit for review.
            </p>
          </div>
        </div>
      )}

      {/* 5-Step Stepper Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = activeStep > step.id || merchant?.status === 'APPROVED';
            const isCurrent = activeStep === step.id;

            return (
              <div
                key={step.id}
                onClick={() => {
                  if (step.id <= 3 || isCompleted) setActiveStep(step.id);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-1.5 ${
                  isCurrent
                    ? 'bg-brand-emerald/10 border-brand-emerald text-brand-emerald shadow-lg shadow-emerald-500/10'
                    : isCompleted
                    ? 'bg-slate-900/60 border-slate-700 text-slate-200'
                    : 'bg-slate-900/20 border-slate-800/60 text-slate-600'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isCurrent
                      ? 'bg-brand-emerald text-slate-950 font-black'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <p className="font-bold text-xs">{step.title}</p>
                <span className="text-[10px] font-mono text-slate-500">Step 0{step.id}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Legal Entity Details Form */}
      {activeStep === 1 && (
        <form onSubmit={handleSaveStep1} className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" /> Step 1: Business Entity & Registration Details
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Provide legal entity identification recognized under Bangladesh Ministry of Commerce guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Business Entity Type *
              </label>
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald font-sans"
              >
                <option value="SOLE_PROPRIETORSHIP">Sole Proprietorship (একক মালিকানা)</option>
                <option value="PARTNERSHIP">Partnership (অংশীদারি কারবার)</option>
                <option value="PRIVATE_LIMITED">Private Limited Company (প্রাঃ লিঃ)</option>
                <option value="INDIVIDUAL">Individual Artisan / Home-based Seller</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Trade License Number *
              </label>
              <input
                type="text"
                required
                value={tradeLicenseNo}
                onChange={(e) => setTradeLicenseNo(e.target.value)}
                placeholder="e.g. TL-DHK-2024-9812"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                12-Digit e-TIN Number *
              </label>
              <input
                type="text"
                required
                value={tinNo}
                onChange={(e) => setTinNo(e.target.value)}
                placeholder="e.g. 123456789012"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                9-Digit VAT / BIN Registration (Optional)
              </label>
              <input
                type="text"
                value={binNo}
                onChange={(e) => setBinNo(e.target.value)}
                placeholder="e.g. 987654321098"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Owner National ID (NID / Smart Card) *
              </label>
              <input
                type="text"
                required
                value={nidNo}
                onChange={(e) => setNidNo(e.target.value)}
                placeholder="e.g. 19902692812345678"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Division & District *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  placeholder="Division (e.g. Dhaka)"
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="District"
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Physical Store / Pickup Warehouse Address *
              </label>
              <textarea
                rows={2}
                required
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="e.g. Shop 42, Level 4, Multiplan Center, Elephant Road, Dhaka 1205"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <span>Save & Continue to KYC Uploads</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Step 2: KYC Document Uploads */}
      {activeStep === 2 && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" /> Step 2: Upload Legal KYC Documents
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Upload clear PDF scans or JPG/PNG photos of your Trade License, National ID, and Bank Verification Cheque.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uploadedDocs.map((doc, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-white">{doc.title}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    <Check className="w-3 h-3" /> Ready
                  </span>
                </div>
                <div className="border-2 border-dashed border-slate-800 hover:border-brand-emerald rounded-xl p-4 text-center cursor-pointer transition-colors group">
                  <Upload className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-300 group-hover:text-white truncate">{doc.file}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Click or drag file to replace scan</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={handleSaveStep2}
              className="px-6 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <span>Save & Continue to Settlement Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Settlement Bank Account Setup */}
      {activeStep === 3 && (
        <form onSubmit={handleSaveStep3} className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" /> Step 3: Payout Settlement Account
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Your sales earnings will be deposited directly to this bank account via BEFTN/NPSB.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Bank Name *
              </label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. BRAC Bank PLC, City Bank, Dutch-Bangla"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Branch Name *
              </label>
              <input
                type="text"
                required
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="e.g. Gulshan Branch"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                9-Digit Bank Routing Number *
              </label>
              <input
                type="text"
                required
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                placeholder="e.g. 060261234"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Account Holder Name *
              </label>
              <input
                type="text"
                required
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
                placeholder="Must match trade license business name"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Account Number *
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="e.g. 1501203456789001"
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <span>Review & Submit Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Submission & Compliance Review */}
      {activeStep === 4 && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-xl max-w-2xl mx-auto">
          {merchant?.status === 'UNDER_REVIEW' ? (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
                <Clock className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Your Store is Under Compliance Review</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for completing your KYC intake. Kenakata Compliance Officers are reviewing your trade license and national ID documents. Approvals typically complete within 2 to 4 business hours.
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Store Name:</span>
                  <strong className="text-white">{merchant.shop?.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Trade License:</span>
                  <span className="font-mono text-emerald-400">{merchant.shop?.tradeLicenseNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Documents Submitted:</span>
                  <span className="text-slate-200">4 Scans (Trade License, NID, Bank)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-emerald/20 text-brand-emerald flex items-center justify-center mx-auto">
                <Send className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Ready to Submit for Compliance Review?</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                By submitting, you certify that all uploaded trade licenses and national identity details are authentic and valid under Bangladesh law.
              </p>
              <button
                onClick={handleSubmitForReview}
                disabled={isSubmitting}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{isSubmitting ? 'Submitting to Compliance...' : 'Submit KYC Application'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Approved Live Celebration */}
      {activeStep === 5 && (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-emerald to-emerald-400 text-slate-950 font-bold flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Verified Kenakata Merchant
            </span>
            <h2 className="text-2xl font-bold text-white font-serif">Congratulations! Your Store is Active & Live</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Your business entity documents have been verified by Kenakata Compliance. You can now add products, manage customer orders, and receive direct bank payouts.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-brand-emerald text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex items-center gap-2"
            >
              <Store className="w-4 h-4" /> Manage Products
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              Go to Store Dashboard
            </Link>
          </div>
        </div>
      )}
    </MerchantShell>
  );
}
