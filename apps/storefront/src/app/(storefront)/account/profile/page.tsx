'use client';

import { useState } from 'react';
import { User, Phone, Mail, Globe, ShieldCheck, Smartphone, Clock, Save, Eye, EyeOff } from 'lucide-react';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-charcoal">Profile & Security</h1>

      {/* Personal Info */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-brand-charcoal">Personal Information</h2>
          <button onClick={() => setEditing(!editing)} className="text-sm text-brand-blue hover:text-brand-blue-hover font-medium">
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center shrink-0">
              <span className="text-white text-2xl font-bold">R</span>
            </div>
            {editing && (
              <button className="text-sm text-brand-blue hover:underline">Change Photo</button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name</label>
              {editing ? (
                <input type="text" defaultValue="Rahim Ahmed" className="input" />
              ) : (
                <p className="text-sm text-brand-charcoal py-2">Rahim Ahmed</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
              <p className="text-sm text-brand-charcoal py-2 flex items-center gap-2">
                01712345678 <span className="badge-green text-[10px]">Verified</span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
              {editing ? (
                <input type="email" defaultValue="rahim@email.com" className="input" />
              ) : (
                <p className="text-sm text-brand-charcoal py-2">rahim@email.com</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Language Preference</label>
              {editing ? (
                <select className="input" defaultValue="en">
                  <option value="en">English</option>
                  <option value="bn">বাংলা (Bangla)</option>
                </select>
              ) : (
                <p className="text-sm text-brand-charcoal py-2">English</p>
              )}
            </div>
          </div>
          {editing && (
            <button className="btn-primary mt-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-brand-charcoal mb-5">Security</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Change Password</label>
            <div className="space-y-3 max-w-sm">
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Current Password" className="input pr-10" />
                <button onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <input type="password" placeholder="New Password" className="input" />
              <input type="password" placeholder="Confirm New Password" className="input" />
              <button className="btn-secondary text-sm">Update Password</button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-brand-charcoal mb-5">Active Sessions</h2>
        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'Dhaka, Bangladesh', time: 'Active now', current: true },
            { device: 'Safari on iPhone', location: 'Dhaka, Bangladesh', time: '2 hours ago', current: false },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-brand-charcoal">
                    {session.device}
                    {session.current && <span className="badge-green text-[10px] ml-2">Current</span>}
                  </p>
                  <p className="text-xs text-neutral-500">{session.location} · {session.time}</p>
                </div>
              </div>
              {!session.current && (
                <button className="text-xs text-semantic-danger hover:underline">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
