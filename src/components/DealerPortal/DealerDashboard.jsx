import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FilePlus,
  FileText,
  TrendingUp,
  Zap,
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Calculator,
  ChevronRight,
  ExternalLink,
  Printer
} from 'lucide-react';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function DealerDashboard() {
  const { currentDealer, quotations, setActiveTab, setPreviewQuotation, pricingMaster } = useApp();

  // Filter quotations for current dealer (or show all in demo if dealerId matches)
  const dealerQuotes = quotations.filter(q => !q.dealerId || q.dealerId === currentDealer.id || true);

  // Compute metrics
  const totalKw = dealerQuotes.reduce((acc, q) => acc + (Number(q.systemCapacityKW) || 0), 0);
  const totalMargin = dealerQuotes.reduce((acc, q) => acc + (Number(q.dealerTotalMargin) || (Number(q.dealerMarginPerKW || 0) * (q.systemCapacityKW || 0))), 0);
  const totalContractVal = dealerQuotes.reduce((acc, q) => acc + (Number(q.grandTotalCustomer) || 0), 0);

  // PM Surya Ghar Quick Calculator state
  const [calcKw, setCalcKw] = useState(3);
  const getSubsidy = (kw) => {
    if (kw <= 0) return 0;
    if (kw === 1) return 30000;
    if (kw === 2) return 60000;
    return 78000; // >= 3kW
  };

  const handleViewQuote = (quote) => {
    setPreviewQuotation(quote);
    setActiveTab('preview_quote');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Welcome & Primary Actions Banner */}
      <div className="bg-gradient-to-r from-[#0F1B2E] via-[#162742] to-[#0A1322] rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#6CBF3D]/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CBF3D]/20 text-[#6CBF3D] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#6CBF3D]"></span>
              {currentDealer.tier || 'Authorized EPC Channel Partner'}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
              Welcome back, {currentDealer.contactPerson}
            </h1>
            <p className="text-gray-300 text-sm max-w-xl">
              {currentDealer.firmName} • Authorized Territory: {currentDealer.city}, {currentDealer.state} ({currentDealer.discom})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('create_quote')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <FilePlus className="w-4 h-4" />
              Generate Quotation
            </button>
            <button
              onClick={() => setActiveTab('preview_quote')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-all"
            >
              <FileText className="w-4 h-4 text-[#6CBF3D]" />
              Latest 4-Page PDF
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Quotes */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Proposals</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F1B2E]">{dealerQuotes.length}</div>
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold">100% Verified</span>
            <span>Sunvine Standards</span>
          </div>
        </div>

        {/* Quoted Capacity */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Quoted Capacity</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F1B2E]">
            {totalKw.toFixed(1)} <span className="text-sm font-medium text-gray-500">KW</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Commercial, Ind. & Rooftop
          </div>
        </div>

        {/* Confidential Dealer Profit Margin */}
        <div className="bg-white p-5 rounded-xl border-2 border-[#6CBF3D]/40 shadow-xs relative">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold text-[#2C6114] uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6CBF3D]" />
              Confidential Margin
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-[#6CBF3D]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#2C6114] font-mono">
            {formatINR(totalMargin)}
          </div>
          <div className="text-[11px] text-emerald-800 font-medium mt-1">
            🔒 Strictly hidden from customer proposals
          </div>
        </div>

        {/* Total Contract Value */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Contract Volume</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F1B2E] font-mono">
            {formatINR(totalContractVal)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Turnkey Supply & Installation
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Proposals & PM Surya Ghar Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Proposals (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0F1B2E]">Recent Solar Quotations</h2>
              <p className="text-xs text-gray-500">Official 4-page turnkey proposals generated</p>
            </div>
            <button
              onClick={() => setActiveTab('my_quotes')}
              className="text-xs font-semibold text-[#6CBF3D] hover:text-[#5AA332] flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8FAFC] text-gray-600 uppercase border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Proposal Ref & Client</th>
                  <th className="py-3 px-4 font-semibold text-center">Capacity</th>
                  <th className="py-3 px-4 font-semibold text-right">Customer Price</th>
                  <th className="py-3 px-4 font-semibold text-right">Your Margin</th>
                  <th className="py-3 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dealerQuotes.map((quote) => {
                  const quoteMargin = quote.dealerTotalMargin || (quote.dealerMarginPerKW * quote.systemCapacityKW) || 0;
                  return (
                    <tr key={quote.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{quote.customerName}</div>
                        <div className="text-[11px] text-gray-500 font-mono flex items-center gap-2">
                          <span>{quote.id}</span>
                          <span>•</span>
                          <span>{quote.date}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                          {quote.systemCapacityKW} KW
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-gray-900">
                        {formatINR(quote.grandTotalCustomer)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-[#2C6114]">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-[#6CBF3D]" />
                          {formatINR(quoteMargin)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleViewQuote(quote)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#0F1B2E] hover:bg-[#1A2942] text-white text-[11px] font-semibold rounded-md shadow-xs transition-colors"
                        >
                          <FileText className="w-3 h-3 text-[#6CBF3D]" />
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

        {/* Right Column: PM Surya Ghar Muft Bijli Quick Calculator (1/3 width) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F1B2E]">PM Surya Ghar Calculator</h3>
                <p className="text-[11px] text-gray-500">Muft Bijli Yojana Central DBT Subsidy</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Residential System Size ({calcKw} KW)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={calcKw}
                  onChange={(e) => setCalcKw(Number(e.target.value))}
                  className="w-full accent-[#6CBF3D]"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>1 KW</span>
                  <span>3 KW</span>
                  <span>5 KW</span>
                  <span>10 KW</span>
                </div>
              </div>

              {/* Subsidy Calculation Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Gross Project Cost (~₹58k/kW):</span>
                  <span className="font-mono font-semibold">{formatINR(calcKw * 58000)}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-700 font-semibold">
                  <span>PM Surya Ghar Direct Subsidy:</span>
                  <span className="font-mono font-bold">- {formatINR(getSubsidy(calcKw))}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between items-center font-bold text-[#0F1B2E]">
                  <span>Net Customer Outlay:</span>
                  <span className="font-mono text-sm text-[#2C6114]">
                    {formatINR((calcKw * 58000) - getSubsidy(calcKw))}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 leading-snug">
                <strong>Subsidy Slab Note:</strong> ₹30,000 for 1kW; ₹60,000 for 2kW; ₹78,000 max for 3kW & above credited to customer bank directly.
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('create_quote')}
            className="w-full mt-4 py-2.5 bg-[#0F1B2E] hover:bg-[#1A2942] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            Create Proposal With Subsidy <ChevronRight className="w-3.5 h-3.5 text-[#6CBF3D]" />
          </button>
        </div>
      </div>
    </div>
  );
}
