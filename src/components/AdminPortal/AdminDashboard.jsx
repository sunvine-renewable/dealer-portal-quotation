import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  FileText,
  Zap,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Building2,
  Sliders,
  Cpu,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function AdminDashboard() {
  const { dealers, quotations, setActiveTab, setPreviewQuotation } = useApp();

  // Network calculations
  const totalNetworkKw = quotations.reduce((acc, q) => acc + (Number(q.systemCapacityKW) || 0), 0);
  const totalTurnkeyVal = quotations.reduce((acc, q) => acc + (Number(q.grandTotalCustomer) || 0), 0);
  const totalDealerMargins = quotations.reduce((acc, q) => acc + (Number(q.dealerTotalMargin) || (Number(q.dealerMarginPerKW || 0) * (q.systemCapacityKW || 0))), 0);

  const handleViewQuote = (q) => {
    setPreviewQuotation(q);
    setActiveTab('preview_quote');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Executive Overview Header */}
      <div className="bg-[#0F1B2E] text-white p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6CBF3D]/20 text-[#6CBF3D] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Executive Central Operations
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-heading">
            Sunvine National EPC Command Console
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time audit of authorized dealers, turnkey quotations, hardware inventory, and margins.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab('dealers_mgmt')}
            className="px-4 py-2.5 bg-[#6CBF3D] hover:bg-[#5AA332] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            Manage Dealers
          </button>
          <button
            onClick={() => setActiveTab('pricing_master')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/15 transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4 text-[#6CBF3D]" />
            Pricing Master
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Dealers</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F1B2E]">{dealers.length}</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">100% Authorized & KYC Verified</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Pipeline (KW)</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F1B2E]">
            {totalNetworkKw.toFixed(1)} <span className="text-xs text-gray-500 font-medium">KW</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Total System Quoted</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Network Turnkey Value</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F1B2E] font-mono">
            {formatINR(totalTurnkeyVal)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Turnkey Supply Contracts</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Dealer Margin Pool</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700 font-mono">
            {formatINR(totalDealerMargins)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Dealer Commissions Audited</p>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3: Recent Network Quotations Audit */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0F1B2E]">All Dealer Proposals Audit</h2>
              <p className="text-xs text-gray-500">Live proposal feed across Gujarat & Maharashtra DISCOMs</p>
            </div>
            <button
              onClick={() => setActiveTab('all_quotes')}
              className="text-xs font-semibold text-[#6CBF3D] hover:text-[#5AA332] flex items-center gap-1"
            >
              Full Ledger <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8FAFC] text-gray-600 uppercase border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Client & Proposal</th>
                  <th className="py-3 px-4 font-semibold">Dealer / Partner</th>
                  <th className="py-3 px-4 font-semibold text-center">Size</th>
                  <th className="py-3 px-4 font-semibold text-right">Customer Total</th>
                  <th className="py-3 px-4 font-semibold text-right">Dealer Margin</th>
                  <th className="py-3 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotations.map((q) => {
                  const m = q.dealerTotalMargin || (q.dealerMarginPerKW * q.systemCapacityKW) || 0;
                  return (
                    <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-gray-900 block">{q.customerName}</span>
                        <span className="text-[11px] text-gray-400 font-mono">{q.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-800 font-medium block">{q.dealerName}</span>
                        <span className="text-[10px] text-gray-400">{q.discom}</span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-[#0F1B2E]">
                        {q.systemCapacityKW} KW
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                        {formatINR(q.grandTotalCustomer)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-emerald-700 font-bold">
                        {formatINR(m)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleViewQuote(q)}
                          className="px-2.5 py-1 bg-[#0F1B2E] text-white rounded text-[11px] font-semibold hover:bg-[#1A2942]"
                        >
                          View PDF
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1/3: Channel Partner Network List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <h3 className="text-sm font-bold text-[#0F1B2E]">Channel Partners</h3>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                {dealers.length} Active
              </span>
            </div>

            <div className="space-y-3">
              {dealers.map((dealer) => (
                <div key={dealer.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900">{dealer.contactPerson}</span>
                    <span className="text-[10px] bg-[#6CBF3D]/20 text-[#2C6114] font-bold px-1.5 py-0.5 rounded">
                      {dealer.tier}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mb-1">{dealer.firmName}</div>
                  <div className="flex items-center justify-between text-[11px] text-gray-600 pt-2 border-t border-gray-200">
                    <span>Margin Cap: <strong>{formatINR(dealer.maxMarginCapPerKw)}/KW</strong></span>
                    <span>{dealer.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('dealers_mgmt')}
            className="w-full mt-4 py-2.5 bg-[#0F1B2E] text-white rounded-lg text-xs font-bold hover:bg-[#1A2942] transition-colors"
          >
            Manage All Dealers
          </button>
        </div>
      </div>
    </div>
  );
}
