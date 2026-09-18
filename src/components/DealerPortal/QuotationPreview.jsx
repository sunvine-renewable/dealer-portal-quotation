import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import PDFTemplate from './PDFTemplate';
import { openWhatsAppChat, buildProposalWhatsAppMessage, cleanCustomerPhone } from '../../utils/quotationShare';

export default function QuotationPreview() {
  const { previewQuotation, pricingMaster, setActiveTab, role } = useApp();
  const [activePage, setActivePage] = useState('all'); // 'all' | 1 | 2 | 3 | 4
  const [zoomMode, setZoomMode] = useState('fit'); // 'fit' | '100'
  const [scale, setScale] = useState(1);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [targetPhone, setTargetPhone] = useState('');
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const previewWrapperRef = useRef(null);

  // Initialize phone when quotation changes
  useEffect(() => {
    if (previewQuotation) {
      setTargetPhone(previewQuotation.customerPhone || previewQuotation.mobile || '+91 98250 12345');
    }
  }, [previewQuotation]);

  // Compute responsive scale for mobile screens (< 820px)
  useEffect(() => {
    const calculateScale = () => {
      if (!previewWrapperRef.current) return;
      const clientW = previewWrapperRef.current.clientWidth || window.innerWidth;
      const paddingAllowance = window.innerWidth < 640 ? 16 : 32;
      const available = Math.min(clientW, window.innerWidth - paddingAllowance);
      if (available < 794 && zoomMode === 'fit') {
        setScale(available / 794);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [zoomMode]);

  const handlePrint = () => {
    window.print();
  };

  const handleDirectWhatsApp = () => {
    if (!previewQuotation) return;
    openWhatsAppChat(previewQuotation, targetPhone);
  };

  const handleCopyMessage = () => {
    if (!previewQuotation) return;
    const msg = buildProposalWhatsAppMessage(previewQuotation);
    navigator.clipboard.writeText(msg);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
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

  // Pre-calculated scaled dimensions
  const scaledWidth = scale < 1 ? Math.round(794 * scale) : 794;
  const scaledHeight = scale < 1 ? Math.round(1123 * scale) : 1123;

  return (
    <div className="quotation-preview-container pb-20 print:p-0 print:m-0 print:pb-0" ref={previewWrapperRef}>
      {/* Top Control Bar (Hidden on print) */}
      <div className="no-print sticky top-16 z-20 bg-surface-container-lowest/95 backdrop-blur border-b border-surface-container-high py-3 px-3 sm:px-6 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab(role === 'admin' ? 'all_quotes' : 'dashboard')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-surface-container-high text-xs font-semibold text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back</span>
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-label-md text-xs sm:text-sm font-bold text-on-surface truncate max-w-[160px] sm:max-w-xs">
                {previewQuotation.customerName}
              </h2>
              <span className="px-1.5 py-0.5 bg-primary-container/20 text-primary text-[10px] font-bold rounded">
                {previewQuotation.systemCapacityKW || previewQuotation.capacity || '280.2'} KW
              </span>
            </div>
            <p className="font-label-xs text-[10px] text-secondary font-mono">
              Ref: {previewQuotation.id} • {previewQuotation.date}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Dealer Private Profit Notice Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            <span className="material-symbols-outlined text-[16px] text-amber-600">lock</span>
            <span>
              Your Margin: <strong className="font-semibold">₹{(previewQuotation.dealerTotalMargin || (previewQuotation.dealerMarginPerKW * previewQuotation.systemCapacityKW) || 0).toLocaleString('en-IN')}</strong> (Hidden from PDF)
            </span>
          </div>

          <button
            onClick={() => setShowWhatsAppModal(true)}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-white font-label-md text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Open WhatsApp chat with customer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-lg bg-on-secondary-fixed hover:bg-inverse-surface text-on-secondary font-label-md text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Print or Save as 4-Page PDF"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile PDF Viewer Controls (< md) */}
      <div className="no-print mt-3 px-3 max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2 bg-surface-container-lowest p-2 rounded-xl border border-surface-container-high shadow-xs">
        {/* Page Switcher Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 text-xs">
          <span className="text-[11px] font-semibold text-secondary mr-1 shrink-0">Pages:</span>
          {[
            { id: 'all', label: 'All 4 Pages' },
            { id: 1, label: 'P1: Cover' },
            { id: 2, label: 'P2: Specs' },
            { id: 3, label: 'P3: BOM' },
            { id: 4, label: 'P4: Terms' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePage(tab.id)}
              className={`px-2.5 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-colors ${
                activePage === tab.id
                  ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-low text-secondary hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Zoom / Fit View Toggle */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => setZoomMode(zoomMode === 'fit' ? '100' : 'fit')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border border-surface-container-high bg-surface-container-lowest text-secondary hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[15px]">
              {zoomMode === 'fit' ? 'zoom_in' : 'fit_screen'}
            </span>
            <span>{zoomMode === 'fit' ? 'Fit Screen' : '100% Zoom'}</span>
          </button>
        </div>
      </div>

      {/* PDF Container with Responsive Scaling */}
      <div className="mt-4 flex flex-col items-center justify-center overflow-x-auto max-w-full px-2">
        <div
          className="pdf-scalable-viewport transition-transform flex flex-col items-center"
          style={{
            transform: scale < 1 && zoomMode === 'fit' ? `scale(${scale})` : 'none',
            transformOrigin: 'top center',
            width: scale < 1 && zoomMode === 'fit' ? '794px' : 'auto',
            marginBottom: scale < 1 && zoomMode === 'fit' ? `-${Math.round(1123 * (1 - scale) * (activePage === 'all' ? 4 : 1))}px` : '0px'
          }}
        >
          <PDFTemplate quotation={previewQuotation} pricingMaster={pricingMaster} activePage={activePage} />
        </div>
      </div>

      {/* WhatsApp Share Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high relative">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2 text-[#25D366]">
                <span className="material-symbols-outlined text-[26px]">chat</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Share Proposal on WhatsApp</h3>
              </div>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Customer Phone Input */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                  Customer WhatsApp Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-semibold text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                    +91
                  </span>
                  <input
                    type="text"
                    value={targetPhone}
                    onChange={(e) => setTargetPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full h-11 pl-14 pr-4 bg-surface-container-low border border-surface-container-high rounded-xl text-sm font-semibold text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                  />
                </div>
                <p className="text-[11px] text-secondary mt-1">
                  Clicking "Open Chat & Send" will open WhatsApp directly in the chat with this number, with the proposal pre-filled. You only have to press Enter!
                </p>
              </div>

              {/* Message Preview Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Message Preview
                  </label>
                  <button
                    onClick={handleCopyMessage}
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copiedFeedback ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedFeedback ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
                <div className="bg-[#EFEAE2] p-3 rounded-xl border border-[#D1D7DB] text-xs font-sans text-[#111B21] max-h-48 overflow-y-auto whitespace-pre-line leading-relaxed shadow-inner">
                  {buildProposalWhatsAppMessage(previewQuotation)}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-surface-container flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-secondary hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDirectWhatsApp();
                  setShowWhatsAppModal(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-label-md text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Open Chat &amp; Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

