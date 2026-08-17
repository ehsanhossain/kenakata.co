'use client';

import { useState } from 'react';
import {
  User, Phone, EnvelopeSimple, Globe, ShieldCheck, DeviceMobile, Clock, FloppyDisk, Eye, EyeSlash, CheckCircle
} from '@phosphor-icons/react';
import { useAuth } from '../../../../context/AuthContext';

export default function ProfilePage() {
 const { user, updateUserProfile } = useAuth();
 const [editing, setEditing] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [name, setName] = useState(user?.name || 'Kenakata Member');
 const [email, setEmail] = useState(user?.email || '');
 const [savedMsg, setSavedMsg] = useState(false);

 const handleSave = async () => {
 await updateUserProfile({ name, email });
 setEditing(false);
 setSavedMsg(true);
 setTimeout(() => setSavedMsg(false), 3000);
 };

 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <h1 className="text-2xl font-bold text-content-primary">Profile & Security</h1>
 {savedMsg && (
 <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
 <CheckCircle className="w-3.5 h-3.5" /> Saved successfully
 </span>
 )}
 </div>

 {/* Personal Info */}
 <div className="bg-white rounded-xl border border-border shadow-sm p-5 sm:p-6">
 <div className="flex items-center justify-between mb-5">
 <h2 className="text-lg font-semibold text-content-primary">Personal Information</h2>
 <button onClick={() => setEditing(!editing)} className="text-sm text-content-brand hover:text-content-brand font-medium">
 {editing ? 'Cancel' : 'PencilSimple'}
 </button>
 </div>
 <div className="space-y-4">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 rounded-full bg-action-primary flex items-center justify-center shrink-0">
 <span className="text-content-primary text-2xl font-bold">
 {name ? name.charAt(0).toUpperCase() : 'K'}
 </span>
 </div>
 {editing && (
 <button className="text-sm text-content-brand hover:underline">Change Photo</button>
 )}
 </div>
 <div className="grid sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Full Name</label>
 {editing ? (
 <input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 className="input"
 />
 ) : (
 <p className="text-sm text-content-primary py-2 font-medium">{user?.name || name}</p>
 )}
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Phone</label>
 <p className="text-sm text-content-primary py-2 flex items-center gap-2 font-medium">
 {user?.phone || '+8801712345678'} <span className="badge-green text-[10px]">Verified</span>
 </p>
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Email</label>
 {editing ? (
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="input"
 />
 ) : (
 <p className="text-sm text-content-primary py-2">{user?.email || 'Not provided'}</p>
 )}
 </div>
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Language Preference</label>
 {editing ? (
 <select className="input" defaultValue="en">
 <option value="en">English</option>
 <option value="bn">বাংলা (Bangla)</option>
 </select>
 ) : (
 <p className="text-sm text-content-primary py-2">English</p>
 )}
 </div>
 </div>
 {editing && (
 <button onClick={handleSave} className="btn-primary mt-2 flex items-center gap-2">
 <FloppyDisk className="w-4 h-4" /> FloppyDisk Changes
 </button>
 )}
 </div>
 </div>

 {/* Security */}
 <div className="bg-white rounded-xl border border-border shadow-sm p-5 sm:p-6">
 <h2 className="text-lg font-semibold text-content-primary mb-5">Security</h2>
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium text-content-secondary mb-1.5">Change Password</label>
 <div className="space-y-3 max-w-sm">
 <div className="relative">
 <input type={showPassword ? 'text' : 'password'} placeholder="Current Password" className="input pr-10" />
 <button onClick={() => setShowPassword(!showPassword)}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-content-disabled hover:text-content-secondary">
 {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
 <div className="bg-white rounded-xl border border-border shadow-sm p-5 sm:p-6">
 <h2 className="text-lg font-semibold text-content-primary mb-5">Active Sessions</h2>
 <div className="space-y-3">
 {[
 { device: 'Chrome on Windows', location: 'Dhaka, Bangladesh', time: 'Active now', current: true },
 { device: 'Safari on iPhone', location: 'Dhaka, Bangladesh', time: '2 hours ago', current: false },
 ].map((session, i) => (
 <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface-subtle">
 <div className="flex items-center gap-3">
 <DeviceMobile className="w-5 h-5 text-content-disabled" />
 <div>
 <p className="text-sm font-medium text-content-primary">
 {session.device}
 {session.current && <span className="badge-green text-[10px] ml-2">Current</span>}
 </p>
 <p className="text-xs text-content-tertiary">{session.location} · {session.time}</p>
 </div>
 </div>
 {!session.current && (
 <button className="text-xs text-danger hover:underline">Revoke</button>
 )}
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
