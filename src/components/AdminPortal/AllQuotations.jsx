import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderArchive,
  Search,
  Filter,
  FileText,
  ShieldCheck,
  Building2,
  Share2,
  ExternalLink,
  DollarSign
} from 'lucide-react';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function AllQuotations() {
  const { quotations, setPreviewQuotation, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = quotations.filter((q) => {
    const matches =
      q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.dealerName && q.dealerName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterType === 'all') return matches;
    if (filterType === 'commercial') return matches && q.projectType.includes('Commercial');
    if (filterType === 'residential') return matches && q.projectType.includes('Residential');
    return matches;
  });

  const handleView = (quote) => {
    setPreviewQuotation(quote);
    setActiveTab('preview_quote');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F1B2E] font-heading">Master Quotations Audit Ledger</h1>
          <p className="text-xs text-gray-500">
            Complete central audit of turnkey proposals and dealer commissions generated nationwide.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-[#6CBF3D]" />
          <span>Internal Margin Audit Active</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by client, dealer, quote ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">Category:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#6CBF3D]"
          >
            <option value="all">All Categories</option>
            <option value="commercial">Commercial & Industrial</option>
            <option value="residential">Residential PM Surya Ghar</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0F1B2E] text-white uppercase">
              <tr>
                <th className="py-3 px-4 font-semibold">Ref No & Date</th>
                <th className="py-3 px-4 font-semibold">Client Enterprise</th>
                <th className="py-3 px-4 font-semibold">Dealer / Channel</th>
                <th className="py-3 px-4 font-semibold text-center">Capacity</th>
                <th className="py-3 px-4 font-semibold text-right">Customer Grand Total</th>
                <th className="py-3 px-4 font-semibold text-right">Audited Dealer Profit</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((quote) => {
                const marginAmt = quote.dealerTotalMargin || (quote.dealerMarginPerKW * quote.systemCapacityKW) || 0;
                return (
                  <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#0F1B2E] block">{quote.id}</span>
                      <span className="text-[11px] text-gray-400">{quote.date}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{quote.customerName}</div>
                      <div className="text-[11px] text-gray-500">{quote.siteAddress || quote.discom}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-800">{quote.dealerName || 'Surya Solar Tech'}</div>
                      <div className="text-[10px] text-gray-400">{quote.dealerId}</div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                        {quote.systemCapacityKW} KW
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                      {formatINR(quote.grandTotalCustomer)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        <DollarSign className="w-3 h-3 text-[#6CBF3D]" />
                        {formatINR(marginAmt)}
                      </span>
                      <span className="block text-[10px] text-gray-400 font-sans mt-0.5">
                        ({formatINR(Math.round(marginAmt / (quote.systemCapacityKW || 1)))}/KW)
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleView(quote)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0F1B2E] hover:bg-[#1A2942] text-white text-[11px] font-semibold rounded-lg shadow-xs transition-colors"
                      >
                        <FileText className="w-3 h-3 text-[#6CBF3D]" />
                        View 4-Page PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
