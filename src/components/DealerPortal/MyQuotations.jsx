import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Search,
  Filter,
  FilePlus,
  Share2,
  Printer,
  ShieldCheck,
  CheckCircle,
  Clock,
  Building,
  Zap
} from 'lucide-react';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function MyQuotations() {
  const { quotations, setPreviewQuotation, setActiveTab, currentDealer, updateQuotationStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredQuotes = quotations.filter((q) => {
    const matchesSearch =
      q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.siteAddress && q.siteAddress.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterType === 'all') return matchesSearch;
    if (filterType === 'commercial') return matchesSearch && q.projectType.includes('Commercial');
    if (filterType === 'residential') return matchesSearch && q.projectType.includes('Residential');
    return matchesSearch;
  });

  const handleView = (quote) => {
    setPreviewQuotation(quote);
    setActiveTab('preview_quote');
  };

  const handleWhatsApp = (quote) => {
    const msg = `Hello ${quote.customerName}, here is your Sunvine Solar EPC Turnkey Proposal for ${quote.systemCapacityKW} KW. Quotation Ref: ${quote.id}. Total Turnkey Amount: ${formatINR(quote.grandTotalCustomer)}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-[#0F1B2E] font-heading">My Solar Proposals Directory</h1>
          <p className="text-xs text-gray-500">
            Archive of all turnkey quotations generated under {currentDealer.firmName}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('create_quote')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <FilePlus className="w-4 h-4" />
          Create New Quotation
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by customer, quote ref, location..."
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

      {/* Quotations Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0F1B2E] text-white uppercase">
              <tr>
                <th className="py-3 px-4 font-semibold">Ref No & Date</th>
                <th className="py-3 px-4 font-semibold">Customer & Site Address</th>
                <th className="py-3 px-4 font-semibold text-center">Capacity</th>
                <th className="py-3 px-4 font-semibold text-right">Customer Price</th>
                <th className="py-3 px-4 font-semibold text-right">Confidential Profit</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No proposals found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => {
                  const marginAmt = quote.dealerTotalMargin || (quote.dealerMarginPerKW * quote.systemCapacityKW) || 0;
                  return (
                    <tr key={quote.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-[#0F1B2E] block">{quote.id}</span>
                        <span className="text-[11px] text-gray-500">{quote.date}</span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{quote.customerName}</div>
                        <div className="text-[11px] text-gray-500 truncate max-w-xs">{quote.siteAddress || quote.discom}</div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded bg-[#6CBF3D]/15 text-[#2C6114] font-bold">
                          {quote.systemCapacityKW} KW
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                        {formatINR(quote.grandTotalCustomer)}
                        <span className="block text-[10px] font-normal text-gray-400 font-sans">
                          {formatINR(Math.round(quote.grandTotalCustomer / quote.systemCapacityKW))}/KW
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-[#2C6114]">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3 text-[#6CBF3D]" />
                          {formatINR(marginAmt)}
                        </span>
                        <span className="block text-[10px] text-gray-400 font-sans mt-0.5">Dealer Private</span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                          {quote.status || 'Active'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleView(quote)}
                            className="p-1.5 rounded-lg bg-[#0F1B2E] hover:bg-[#1A2942] text-white transition-colors"
                            title="View 4-Page PDF"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#6CBF3D]" />
                          </button>
                          <button
                            onClick={() => handleWhatsApp(quote)}
                            className="p-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-colors"
                            title="Share on WhatsApp"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
