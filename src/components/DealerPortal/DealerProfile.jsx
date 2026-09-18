import React from 'react';
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
  CheckCircle2
} from 'lucide-react';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function DealerProfile() {
  const { currentDealer } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-[#0F1B2E] text-white flex items-center justify-center text-3xl font-extrabold border-2 border-[#6CBF3D]">
          {currentDealer.contactPerson.charAt(0)}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#6CBF3D]/20 text-[#2C6114] text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5 text-[#6CBF3D]" />
            {currentDealer.tier || 'Authorized EPC Partner'}
          </div>
          <h1 className="text-2xl font-bold text-[#0F1B2E]">{currentDealer.firmName}</h1>
          <p className="text-sm text-gray-600">Lead Contact: <strong className="text-gray-900">{currentDealer.contactPerson}</strong></p>
          <p className="text-xs text-gray-400 font-mono">Channel Partner ID: {currentDealer.id}</p>
        </div>
      </div>

      {/* Margin Cap & Territory Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border-2 border-[#6CBF3D]/40 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#2C6114] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#6CBF3D]" />
              Authorized Margin Threshold
            </span>
            <span className="text-[10px] bg-[#6CBF3D] text-white px-2 py-0.5 rounded font-bold">Admin Controlled</span>
          </div>

          <div className="text-3xl font-extrabold text-[#0F1B2E] font-mono mb-2">
            {formatINR(currentDealer.maxMarginCapPerKw)} <span className="text-sm font-medium text-gray-500">/ KW</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your maximum permitted quotation markup per kilowatt. This upper limit is calibrated by Sunvine EPC admin to protect pricing competitiveness.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Assigned DISCOM & Territory
            </span>
            <h3 className="text-lg font-bold text-[#0F1B2E] mb-1">{currentDealer.discom}</h3>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {currentDealer.city}, {currentDealer.state}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Network Status:</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6CBF3D]" /> Active Channel
            </span>
          </div>
        </div>
      </div>

      {/* Official Business Details */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#6CBF3D]" />
          Verified Channel Credentials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="block text-gray-400 font-medium">Registered Enterprise</span>
            <strong className="text-gray-900 text-sm">{currentDealer.firmName}</strong>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="block text-gray-400 font-medium">Primary Mobile Number</span>
            <strong className="text-gray-900 text-sm">{currentDealer.mobile}</strong>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="block text-gray-400 font-medium">Official Email Address</span>
            <strong className="text-gray-900 text-sm">{currentDealer.email}</strong>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="block text-gray-400 font-medium">Onboarding Date</span>
            <strong className="text-gray-900 text-sm">{currentDealer.joinedDate || '12-11-2025'}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
