import React from 'react';
import { useApp } from '../../context/AppContext';
import PDFTemplate from './PDFTemplate';

export default function QuotationPreview() {
  const { previewQuotation, pricingMaster, setActiveTab, role } = useApp();

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
      <div className="p-8 text-center bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high">
        <span className="material-symbols-outlined text-[48px] text-amber-500 mx-auto mb-3 block">warning</span>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-1">No Quotation Selected</h3>
        <p className="font-body-md text-secondary mb-4">Please generate a quotation or pick one from your quotation directory.</p>
        <button
          onClick={() => setActiveTab('create_quote')}
          className="px-4 py-2 bg-primary-container text-on-primary font-label-md rounded-lg shadow-sm hover:bg-primary"
        >
          Create New Quotation
        </button>
      </div>
    );
  }

  return (
    <div className="quotation-preview-container pb-20">
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="no-print sticky top-16 z-20 bg-surface-container-lowest/95 backdrop-blur border-b border-surface-container-high py-3 px-4 md:px-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(role === 'admin' ? 'all_quotes' : 'dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-container-high text-xs font-semibold text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-label-md text-sm font-bold text-on-surface">{previewQuotation.customerName}</h2>
              <span className="px-2 py-0.5 bg-primary-container/20 text-primary text-[10px] font-bold rounded">
                {previewQuotation.systemCapacityKW} KW
              </span>
            </div>
            <p className="font-label-xs text-[11px] text-secondary font-mono">Ref: {previewQuotation.id} • Date: {previewQuotation.date}</p>
          </div>
        </div>

        {/* Action Buttons (Exact Stitch Specifications) */}
        <div className="flex items-center gap-2.5">
          {/* Dealer Private Profit Notice Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            <span className="material-symbols-outlined text-[16px] text-amber-600">lock</span>
            <span>
              Your Margin: <strong className="font-semibold">₹{(previewQuotation.dealerTotalMargin || (previewQuotation.dealerMarginPerKW * previewQuotation.systemCapacityKW) || 0).toLocaleString('en-IN')}</strong> (Hidden from PDF)
            </span>
          </div>

          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs font-semibold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Share WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-on-secondary-fixed hover:bg-inverse-surface text-on-secondary font-label-md text-xs font-semibold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="no-print max-w-[210mm] mx-auto mt-4 px-4">
        <div className="p-3 bg-surface-container-low border border-primary-container/30 rounded-lg flex items-center justify-between text-xs text-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span>
              Official 4-Page PDF proposal. Page 1 displays the verified original corporate cover. Dealer margin is strictly confidential.
            </span>
          </div>
          <span className="font-semibold text-primary">4 Pages Clean A4</span>
        </div>
      </div>

      {/* Render 4-Page PDF Template */}
      <div className="mt-6 flex justify-center overflow-x-auto max-w-full px-2">
        <PDFTemplate quotation={previewQuotation} pricingMaster={pricingMaster} />
      </div>
    </div>
  );
}
