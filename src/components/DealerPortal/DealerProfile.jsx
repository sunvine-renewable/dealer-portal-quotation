import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Building2,
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  Lock,
  Calendar,
  CheckCircle,
  Save,
  Key,
  Eye,
  EyeOff,
  Camera,
  Check,
  AlertCircle,
  Zap,
  FileCheck
} from 'lucide-react';

export default function DealerProfile() {
  const { currentDealer, updateDealerProfile } = useApp();

  // Form states initialized with current dealer
  const [dealerName, setDealerName] = useState(currentDealer.contactPerson || 'Rajesh Kumar');
  const [companyName, setCompanyName] = useState(currentDealer.firmName || 'Surya Solar Tech Private Limited');
  const [email, setEmail] = useState(currentDealer.email || 'rajesh@suryasolartech.in');
  const [gstin, setGstin] = useState('24AABCS1429B1Z8');
  const [address, setAddress] = useState('Shop No. 12, Aditya Commercial Complex, Kalawad Road, Rajkot, Gujarat - 360021');

  // Password management states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateDealerProfile({
      contactPerson: dealerName,
      firmName: companyName,
      email: email
    });
    showToast('Personal & Business profile updated successfully!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    showToast('Password updated securely!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Password rules validation
  const hasMinLength = newPassword.length >= 8;
  const hasCase = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasSymbol = /[0-9!@#$%^&*]/.test(newPassword);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F1B2E] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#6CBF3D]">
          <CheckCircle className="w-5 h-5 text-[#6CBF3D]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#2C6C00]" />
            <span>Account • Partner Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1B2E] font-heading">My Profile</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage your dealer credentials, business information, and account security.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6CBF3D]/15 text-[#2C6C00] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6CBF3D] animate-pulse"></span>
            Active Node • GJ-RAJKOT-01
          </span>
          <div className="px-3 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium">
            DISCOM: {currentDealer.discom || 'PGVCL'}
          </div>
        </div>
      </div>

      {/* Hero Partner Card (Matching Stitch Screen 1262d4f6...) */}
      <div className="relative w-full rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8 overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#6CBF3D]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-32 -bottom-20 w-64 h-64 rounded-full bg-sky-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar with Camera Overlay */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-[#6CBF3D]">
                <img
                  src="/dealer_avatar.jpg"
                  alt={dealerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#0F1B2E] text-white flex items-center justify-center shadow-md hover:bg-[#6CBF3D] transition-colors"
                title="Change Avatar"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">{dealerName}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6CBF3D]/20 text-[#2C6C00] text-xs font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Authorized Tier-1 EPC Dealer
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600">{companyName}</div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-800">Partner ID:</span>
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-bold">{currentDealer.id}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Territory: <strong className="text-gray-800">{currentDealer.city}, {currentDealer.state}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#6CBF3D]" />
                  <span>Allocated Quota: <strong className="text-gray-800">1.5 MW / Quarter</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-col items-end gap-2 self-stretch lg:self-auto justify-between pt-2 lg:pt-0">
            <div className="text-left lg:text-right">
              <span className="text-[11px] text-gray-400 uppercase tracking-wider block font-semibold">Channel Standing</span>
              <span className="text-lg font-bold text-[#2C6C00] font-heading">Top 5% Partner</span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[#2C6C00] text-xs font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#6CBF3D]" />
              Gold Tier EPC
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Form & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Personal & Business Details & Certifications */}
        <div className="lg:col-span-7 space-y-6">
          {/* Personal & Business Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-[#2C6C00]" />
                <h2 className="text-base font-bold text-gray-900 font-heading">Personal &amp; Business Details</h2>
              </div>
              <p className="text-xs text-gray-500">Information reflected on your official quotation PDFs and proposals.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Dealer / Contact Name</label>
                  <input
                    type="text"
                    required
                    value={dealerName}
                    onChange={(e) => setDealerName(e.target.value)}
                    className="w-full h-10 px-3 bg-gray-50 rounded-lg text-gray-900 font-medium border border-gray-300 focus:bg-white focus:ring-2 focus:ring-[#6CBF3D] outline-none transition-all text-xs"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-gray-700">Mobile Number</label>
                    <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={`+91 ${currentDealer.mobile}`}
                      className="w-full h-10 px-3 pl-8 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed border border-gray-200 text-xs font-mono font-medium outline-none"
                    />
                    <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3.5" />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">Registered login number – contact Admin to update</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Company / Firm Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full h-10 px-3 bg-gray-50 rounded-lg text-gray-900 font-medium border border-gray-300 focus:bg-white focus:ring-2 focus:ring-[#6CBF3D] outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">GSTIN / Business Registration</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      className="w-full h-10 px-3 uppercase bg-gray-50 rounded-lg text-gray-900 font-mono font-bold border border-gray-300 focus:bg-white focus:ring-2 focus:ring-[#6CBF3D] outline-none text-xs"
                    />
                    <CheckCircle className="w-4 h-4 text-[#6CBF3D] absolute right-3 top-3" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 bg-gray-50 rounded-lg text-gray-900 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-[#6CBF3D] outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Registered Shop / Office Address</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-lg text-gray-900 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-[#6CBF3D] outline-none resize-none text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-gray-400">Printed on generated customer proposals</span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all text-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          {/* Dealer Certifications & Licenses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#256676]" />
                <h3 className="text-sm font-bold text-gray-900 font-heading">Dealer Certifications &amp; Licenses</h3>
              </div>
              <span className="text-xs font-bold text-[#2C6C00]">All Active &amp; Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 block">MNRE Channel Registration</span>
                  <span className="font-bold text-gray-900 block mt-1">MNRE/2024/GJ/8412</span>
                </div>
                <span className="text-[11px] text-[#2C6C00] font-semibold mt-2 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Valid till Dec 2027
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 block">PGVCL Grid-Tie Empanelment</span>
                  <span className="font-bold text-gray-900 block mt-1">Class-A Rooftop</span>
                </div>
                <span className="text-[11px] text-[#2C6C00] font-semibold mt-2 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Active &amp; Empaneled
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 block">Sunvine Master Installer</span>
                  <span className="font-bold text-gray-900 block mt-1">TOPCon &amp; String Inverter</span>
                </div>
                <span className="text-[11px] text-[#2C6C00] font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6CBF3D]" /> Certified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Security & Password Management */}
        <div className="lg:col-span-5 space-y-6">
          {/* Security & Password Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-5 h-5 text-[#2C6C00]" />
                <h2 className="text-base font-bold text-gray-900 font-heading">Security &amp; Password Management</h2>
              </div>
              <p className="text-xs text-gray-500">Keep your portal login credentials and quotes protected.</p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-10 px-3 pr-9 bg-gray-50 rounded-lg text-gray-900 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-[#6CBF3D] outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new secure password"
                    className="w-full h-10 px-3 pr-9 bg-gray-50 rounded-lg text-gray-900 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-[#6CBF3D] outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new secure password"
                  className="w-full h-10 px-3 bg-gray-50 rounded-lg text-gray-900 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-[#6CBF3D] outline-none text-xs"
                />
              </div>

              {/* Password Requirements Checklist */}
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-1 text-[11px]">
                <span className="text-gray-400 font-semibold uppercase tracking-wider block text-[10px]">
                  Password Requirements
                </span>
                <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-700 font-semibold' : 'text-gray-500'}`}>
                  {hasMinLength ? <Check className="w-3.5 h-3.5 text-[#6CBF3D]" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>}
                  <span>Minimum 8+ characters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasCase ? 'text-emerald-700 font-semibold' : 'text-gray-500'}`}>
                  {hasCase ? <Check className="w-3.5 h-3.5 text-[#6CBF3D]" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>}
                  <span>Uppercase &amp; lowercase letters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasSymbol ? 'text-emerald-700 font-semibold' : 'text-gray-500'}`}>
                  {hasSymbol ? <Check className="w-3.5 h-3.5 text-[#6CBF3D]" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>}
                  <span>At least one number or symbol</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-[#0F1B2E] hover:bg-[#1A2942] text-white font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all text-xs"
              >
                <Key className="w-4 h-4 text-[#6CBF3D]" />
                <span>Update Password</span>
              </button>
            </form>
          </div>

          {/* Preferences Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-xs space-y-3">
            <h3 className="font-bold text-gray-900 font-heading">Proposal &amp; Workflow Preferences</h3>
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <span className="text-gray-700">WhatsApp Instant PDF Dispatch</span>
              <span className="text-[#2C6C00] font-bold">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <span className="text-gray-700">Confidential Margin Security</span>
              <span className="text-[#2C6C00] font-bold">Encrypted</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <span className="text-gray-700">Daily Quotation Audit Digest</span>
              <span className="text-gray-500 font-medium">9:00 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
