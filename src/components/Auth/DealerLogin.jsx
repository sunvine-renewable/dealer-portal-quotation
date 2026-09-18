import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Headphones,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function DealerLogin() {
  const { login, setAuthView } = useApp();
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      setError('Please enter a valid 10-digit registered mobile number');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      login('dealer');
    }, 600);
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#F7F9FF] font-sans">
      {/* Left Panel: Deep Navy Visual Showcase */}
      <div className="relative w-full lg:w-1/2 bg-[#0F1B2E] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden min-h-[520px] lg:min-h-screen">
        {/* Decorative Solar Grid Background Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="40" id="solar-grid-pattern" patternUnits="userSpaceOnUse" width="60">
                <path d="M 60 0 L 0 0 0 40 60 40 Z" fill="none" stroke="#6CBF3D" strokeDasharray="2,2" strokeWidth="0.75" />
                <path d="M 0 20 L 60 20" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="0.5" />
                <path d="M 30 0 L 30 40" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect fill="url(#solar-grid-pattern)" height="100%" width="100%" />
          </svg>
        </div>

        {/* Glowing Green Energy Waves & Ambient Light */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#6CBF3D]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-[#2C6C00]/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header / Logo Zone */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <img
              src="/sunvine_logo_white.png"
              alt="Sunvine Renewable Energy Logo"
              className="h-10 w-auto object-contain brightness-110 drop-shadow-sm"
            />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6CBF3D]/15 text-[#A1F96F] text-[11px] font-semibold tracking-wider uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6CBF3D] animate-pulse"></span>
              Authorized Dealer Network
            </span>
          </div>
        </div>

        {/* Center Narrative & Highlights */}
        <div className="relative z-10 my-auto py-10 lg:py-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#A1F96F] mb-6 text-xs font-semibold">
            <Zap className="w-4 h-4 text-[#6CBF3D]" />
            <span>Enterprise Commercial &amp; Residential Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-xl font-heading">
            Powering Today. <br />
            <span className="text-[#6CBF3D]">Protecting Tomorrow.</span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
            High-precision sizing engines, streamlined rooftop schematics, and instantaneous government subsidy workflows built exclusively for certified channel partners.
          </p>

          {/* Feature List */}
          <div className="mt-8 space-y-3.5 max-w-lg">
            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl backdrop-blur-sm border border-white/5">
              <div className="p-2 rounded-lg bg-[#6CBF3D]/20 text-[#A1F96F]">
                <Zap className="w-5 h-5 text-[#6CBF3D]" />
              </div>
              <div>
                <h3 className="text-sm text-white font-semibold">Instant Quotation Engine</h3>
                <p className="text-xs text-gray-300 mt-0.5">Generate fully costed commercial CAD-aligned BOQ propositions in under 90 seconds.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl backdrop-blur-sm border border-white/5">
              <div className="p-2 rounded-lg bg-[#6CBF3D]/20 text-[#A1F96F]">
                <Award className="w-5 h-5 text-[#6CBF3D]" />
              </div>
              <div>
                <h3 className="text-sm text-white font-semibold">Verified Government Subsidy Calculator</h3>
                <p className="text-xs text-gray-300 mt-0.5">Integrated state and central solar tariff grids with live net-metering slabs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl backdrop-blur-sm border border-white/5">
              <div className="p-2 rounded-lg bg-[#6CBF3D]/20 text-[#A1F96F]">
                <ShieldCheck className="w-5 h-5 text-[#6CBF3D]" />
              </div>
              <div>
                <h3 className="text-sm text-white font-semibold">Confidential Dealer Margin Control</h3>
                <p className="text-xs text-gray-300 mt-0.5">Custom profit markups kept 100% confidential and hidden from customer PDF decks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 text-gray-400 text-xs border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#6CBF3D]" />
            <span>ISO 27001 Certified Field Workstation</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Grid SLA: 99.98%</span>
            <span>•</span>
            <span>v4.18.2</span>
          </div>
        </div>
      </div>

      {/* Right Half: Clean Canvas & Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F1F4F9]">
        <div className="w-full max-w-[440px] bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-gray-200">
          {/* Header Badge & Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#D4E0FA] text-[#3C475C] mb-4 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#2C6C00]"></span>
              <span>Channel Console</span>
            </div>
            <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold font-heading">Dealer Login</h2>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-500">Login to create and manage your solar quotations</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile Number Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Registered Mobile Number</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 flex items-center gap-1.5 text-gray-500 text-xs font-semibold select-none">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91</span>
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full h-11 pl-16 pr-4 bg-white text-gray-900 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6CBF3D] font-medium"
                />
              </div>
              {error && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {error}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700">Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-[#2C6C00] font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-11 pl-10 pr-10 bg-white text-gray-900 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6CBF3D]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-[#6CBF3D]" />
                <span>Remember this workstation</span>
              </label>
              <span className="text-[11px] text-gray-400">256-Bit SSL</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating Dealer...</span>
              ) : (
                <>
                  <span>Login to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Super Admin Switcher Link */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gray-200"></div>
            </div>
            <span className="relative px-3 bg-white text-gray-400 text-xs uppercase tracking-wider">
              Management Access
            </span>
          </div>

          <button
            type="button"
            onClick={() => setAuthView('admin_login')}
            className="w-full h-11 bg-[#0F1B2E] hover:bg-[#1A2942] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#6CBF3D]" />
            <span>Super Admin &amp; EPC Headquarters Login</span>
          </button>

          {/* Quick Help */}
          <div className="mt-6 p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#256676]" />
              <span>Dealer Helpline: <strong className="text-gray-900">8000050580</strong></span>
            </div>
            <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-medium">Rajkot HQ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
