import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  Key,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Server,
  Activity
} from 'lucide-react';

export default function AdminLogin() {
  const { login, setAuthView } = useApp();
  const [adminEmail, setAdminEmail] = useState('national.admin@sunvinerenewable.com');
  const [accessKey, setAccessKey] = useState('SV-SUPER-ADMIN-2026');
  const [twoFactorCode, setTwoFactorCode] = useState('804291');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login('admin');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F9FF] font-sans">
      {/* Left Panel: Deep Navy Visual Showcase */}
      <div className="relative w-full lg:w-1/2 bg-[#0F1B2E] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden min-h-[520px] lg:min-h-screen">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="32" id="admin-grid" patternUnits="userSpaceOnUse" width="32">
                <path d="M 32 0 L 0 0 0 32 32 32 Z" fill="none" stroke="#6CBF3D" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect fill="url(#admin-grid)" height="100%" width="100%" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <img
            src="/sunvine_logo_white.png"
            alt="Sunvine Renewable Energy"
            className="h-10 w-auto object-contain brightness-110"
          />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#A1F96F] text-[11px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6CBF3D] animate-ping"></span>
            SUPER ADMIN • NATIONAL CONSOLE v2.4
          </span>
        </div>

        {/* Narrative */}
        <div className="relative z-10 my-auto py-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading">
            National Solar EPC Operations &amp; <span className="text-[#6CBF3D]">Channel Management</span> Console
          </h1>
          <p className="mt-4 text-sm text-gray-300 max-w-lg leading-relaxed">
            Centralized telemetry, DISCOM tariff synchronization, and real-time dealer financial governance across all national nodes.
          </p>

          {/* Security Cards Cluster */}
          <div className="mt-8 space-y-3 max-w-lg">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#6CBF3D]/20 text-[#6CBF3D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">ISO 27001 Certified Infrastructure</h3>
                <p className="text-xs text-gray-400">End-to-end enterprise hardening and security audits.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Encrypted Dealer Financial Data</h3>
                <p className="text-xs text-gray-400">AES-256 protected margin ledgers and DISCOM subsidies audit trail.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#6CBF3D]/20 text-[#6CBF3D]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">24x7 Network Monitoring</h3>
                <p className="text-xs text-gray-400">Active telemetry, latency tracking, and session IP logging.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-6 border-t border-white/10 text-xs text-gray-400 flex flex-wrap justify-between items-center gap-2">
          <span>Connected Nodes: <strong>48 Operational</strong> (Rajkot HQ)</span>
          <span>© 2026 Sunvine Renewable Energy Pvt. Ltd.</span>
        </div>
      </div>

      {/* Right Panel: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F1F4F9]">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-gray-200">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
              <Lock className="w-3.5 h-3.5" /> High-Privilege Gateway
            </span>
            <button
              onClick={() => setAuthView('dealer_login')}
              className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dealer
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Super Admin Sign In</h2>
            <p className="text-xs text-gray-500 mt-1">Authenticate with executive credentials and 2FA token</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Corporate Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CBF3D] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Master Access Key</label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CBF3D] outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">2FA Security Token</label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="6-digit OTP"
                  className="w-full h-11 px-3 text-center tracking-[0.5em] font-mono text-base font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6CBF3D] outline-none bg-emerald-50/40 text-emerald-900"
                />
              </div>
              <span className="text-[10px] text-gray-400 block text-center mt-1">Pre-filled with master bypass token for dev workstation</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#0F1B2E] hover:bg-[#1A2942] text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <span>Verifying Authority...</span>
              ) : (
                <>
                  <span>Authorize Executive Session</span>
                  <ArrowRight className="w-4 h-4 text-[#6CBF3D]" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-gray-400">
            Internal executive access only. All authorization attempts are recorded with timestamp and IP address.
          </p>
        </div>
      </div>
    </div>
  );
}
