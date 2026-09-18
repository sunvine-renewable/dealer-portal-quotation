import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import PDFTemplate from './PDFTemplate';
import {
  Printer,
  Share2,
  ArrowLeft,
  Download,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  Building2,
  ShieldCheck
} from 'lucide-react';

export default function QuotationPreview() {
  const { previewQuotation, pricingMaster, setActiveTab, currentDealer, role } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!previewQuotation) return;
    const msg = `Hello *${previewQuotation.customerName}*, greetings from Sunvine Renewable Energy! Here is your official turnkey solar proposal for *${previewQuotation.systemCapacityKW} KW*.\nProposal Reference: ${previewQuotation.id}\nTurnkey Proposal Link / Details ready for review.`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  if (!previewQuotation) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-xs border border-gray-200">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-800 mb-1">No Quotation Selected</h3>
        <p className="text-sm text-gray-500 mb-4">Please generate a quotation or pick one from your quotation directory.</p>
        <button
          onClick={() => setActiveTab('create_quote')}
          className="px-4 py-2 bg-[#6CBF3D] text-white rounded-lg text-sm font-semibold hover:bg-[#5aa332]"
        >
          Create New Quotation
        </button>
      </div>
    );
  }

  return (
    <div className="quotation-preview-container pb-16">
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="no-print sticky top-16 z-20 bg-white/95 backdrop-blur border-b border-gray-200 py-3 px-4 md:px-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(role === 'admin' ? 'all_quotes' : 'dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-gray-900">{previewQuotation.customerName}</h2>
              <span className="px-2 py-0.5 bg-[#6CBF3D]/20 text-[#2c6114] text-[10px] font-bold rounded">
                {previewQuotation.systemCapacityKW} KW
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-mono">Ref: {previewQuotation.id} • Date: {previewQuotation.date}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Dealer Private Profit Notice Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>
              Your Margin: <strong className="font-semibold">₹{(previewQuotation.dealerTotalMargin || (previewQuotation.dealerMarginPerKW * previewQuotation.systemCapacityKW) || 0).toLocaleString('en-IN')}</strong> (Hidden from PDF)
            </span>
          </div>

          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            WhatsApp
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0F1B2E] hover:bg-[#1A2942] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#6CBF3D]" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="no-print max-w-[210mm] mx-auto mt-4 px-4">
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#6CBF3D]" />
            <span>
              This 4-page official document strictly follows Sunvine EPC guidelines. Dealer margin is strictly excluded from customer view.
            </span>
          </div>
          <span className="font-semibold text-emerald-800">4 Pages Clean A4</span>
        </div>
      </div>

      {/* Render 4-Page PDF Template */}
      <div className="mt-6 flex justify-center overflow-x-auto max-w-full px-2">
        <PDFTemplate quotation={previewQuotation} pricingMaster={pricingMaster} />
      </div>
    </div>
  );
}
