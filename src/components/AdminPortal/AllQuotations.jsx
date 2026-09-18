import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function AllQuotations() {
  const { setPreviewQuotation, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState('all');
  const [marginProfileFilter, setMarginProfileFilter] = useState('all');

  const handleViewPdf = (quoteData) => {
    if (setPreviewQuotation) {
      setPreviewQuotation(quoteData);
      setActiveTab('preview_quote');
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* 1. Breadcrumbs & Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-surface-container-highest">
        <div>
          <nav className="flex items-center gap-1.5 text-xs font-label-xs text-secondary mb-1">
            <span>Admin Console</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span>National Ledger</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-on-surface font-medium">All Quotations Master</span>
          </nav>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            National Quotation Master Directory
          </h1>
          <p className="font-body-md text-body-md text-secondary mt-1">
            Centralized oversight of all customer quotations issued across all registered dealers, margin audits, and conversion stages.
          </p>
        </div>
        {/* Action Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="bg-white border border-[#E4E7EB] hover:bg-[#F6F8F7] text-on-surface font-label-md py-2 px-3.5 rounded-lg flex items-center gap-2 text-xs shadow-sm transition-colors">
            <span className="material-symbols-outlined text-secondary">calendar_today</span>
            <span>Date Range: This Month (Oct 2025)</span>
            <span className="material-symbols-outlined text-xs text-secondary">expand_more</span>
          </button>
          <button className="bg-white border border-[#E4E7EB] hover:bg-[#F6F8F7] text-on-surface font-label-md py-2 px-3.5 rounded-lg flex items-center gap-2 text-xs shadow-sm transition-colors">
            <span className="material-symbols-outlined text-secondary">storefront</span>
            <span>Filter by Dealer (All 62 Dealers)</span>
            <span className="material-symbols-outlined text-xs text-secondary">expand_more</span>
          </button>
          <button className="bg-white border border-[#E4E7EB] hover:bg-[#F6F8F7] text-on-surface font-label-md py-2 px-3.5 rounded-lg flex items-center gap-2 text-xs shadow-sm transition-colors">
            <span className="material-symbols-outlined text-secondary">electric_meter</span>
            <span>Filter by DISCOM Circle (All Circles)</span>
            <span className="material-symbols-outlined text-xs text-secondary">expand_more</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-[#0F1B2E] hover:bg-[#182a45] text-white font-label-md py-2 px-4 rounded-lg flex items-center gap-2 text-xs shadow-sm transition-colors border border-[#0F1B2E]"
          >
            <span className="material-symbols-outlined text-[#6CBF3D]">file_download</span>
            <span>Export All Proposals (Excel)</span>
          </button>
        </div>
      </div>

      {/* 2. Overview Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-[#E4E7EB] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-xs">Total Proposals Issued</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined">request_quote</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-xl text-[#0F1B2E] font-bold">1,420</span>
              <span className="text-xs font-label-xs text-[#2E7D32] bg-[rgba(108,191,61,0.15)] px-2 py-0.5 rounded-full font-semibold">+88 WoW</span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#6CBF3D]">currency_rupee</span>
              <span className="font-semibold text-on-surface">₹ 18.42 Cr</span> total value across circuits
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-[#E4E7EB] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-xs">Average Quotation Value</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined">calculate</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-xl text-[#0F1B2E] font-bold">₹ 1.29 Lakhs</span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mt-1">
              Median <span className="text-on-surface font-semibold">₹ 2.47L</span> for Residential projects
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-[#E4E7EB] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-xs">Total Capacity Quoted</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined">solar_power</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-xl text-[#0F1B2E] font-bold">5.82 MW</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden flex">
                <div className="bg-[#6CBF3D] h-full w-[94%]" title="Rooftop: 94%"></div>
                <div className="bg-[#256676] h-full w-[6%]" title="C&I: 6%"></div>
              </div>
              <span className="text-[11px] font-label-xs text-secondary whitespace-nowrap">94% Res / 6% C&amp;I</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-[#E4E7EB] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-xs">Average Dealer Margin</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined">verified_user</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-xl text-[#0F1B2E] font-bold">₹ 3,450 <span className="text-sm font-normal text-secondary">/ kW</span></span>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-[#2E7D32]">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Audit Compliant
              </span>
              <span className="text-[11px] text-secondary font-label-xs">7.2% avg (Within ₹5k cap)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Master Directory Table Section */}
      <div className="bg-white rounded-xl border border-[#E4E7EB] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Filter Tabs & Table Controls Bar */}
        <div className="p-4 border-b border-[#E4E7EB] flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white">
          <div className="flex flex-wrap items-center gap-1.5 bg-[#F6F8F7] p-1 rounded-lg border border-[#E4E7EB]">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3.5 py-1.5 rounded-md font-label-sm text-xs font-semibold shadow-sm flex items-center gap-2 transition-colors ${
                activeTabFilter === 'all' ? 'bg-[#0F1B2E] text-white' : 'text-secondary hover:text-on-surface'
              }`}
            >
              <span>All Proposals</span>
              <span className="bg-white/20 px-1.5 py-0.2 rounded text-[10px]">1,420</span>
            </button>
            <button
              onClick={() => setActiveTabFilter('approved')}
              className={`px-3 py-1.5 rounded-md font-label-sm text-xs transition-colors flex items-center gap-2 ${
                activeTabFilter === 'approved' ? 'bg-[#0F1B2E] text-white' : 'text-secondary hover:text-on-surface'
              }`}
            >
              <span>Approved &amp; In-Progress</span>
              <span className="bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded text-[10px]">384</span>
            </button>
            <button
              onClick={() => setActiveTabFilter('discom')}
              className={`px-3 py-1.5 rounded-md font-label-sm text-xs transition-colors flex items-center gap-2 ${
                activeTabFilter === 'discom' ? 'bg-[#0F1B2E] text-white' : 'text-secondary hover:text-on-surface'
              }`}
            >
              <span>Under Discom Review</span>
              <span className="bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded text-[10px]">512</span>
            </button>
            <button
              onClick={() => setActiveTabFilter('draft')}
              className={`px-3 py-1.5 rounded-md font-label-sm text-xs transition-colors flex items-center gap-2 ${
                activeTabFilter === 'draft' ? 'bg-[#0F1B2E] text-white' : 'text-secondary hover:text-on-surface'
              }`}
            >
              <span>Draft / Stale</span>
              <span className="bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded text-[10px]">524</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-72 sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-sm">search</span>
              <input
                className="w-full bg-[#FFFFFF] border border-[#E4E7EB] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#1B1F23] placeholder-gray-400 focus:outline-none focus:border-[#6CBF3D] focus:ring-2 focus:ring-[#6CBF3D]/20 transition-all font-body-sm"
                placeholder="Search by Quote #, Customer Name, or Dealer ID..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={marginProfileFilter}
              onChange={(e) => setMarginProfileFilter(e.target.value)}
              className="bg-white border border-[#E4E7EB] rounded-lg text-xs py-1.5 px-3 font-label-sm text-on-surface focus:outline-none focus:border-[#6CBF3D]"
            >
              <option value="all">All Margin Profiles</option>
              <option value="high">Margin &gt; ₹4,500/kW</option>
              <option value="flagged">🚨 Flagged for Executive Audit</option>
              <option value="compliant">Compliant Margins (&lt;= ₹5,000/kW)</option>
            </select>
          </div>
        </div>

        {/* 4. Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1300px]">
            <thead>
              <tr className="bg-[#0F1B2E] text-white font-label-sm text-xs">
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px]">Quote Ref</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px]">Gen Date &amp; Time</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px]">Issuing Dealer / Firm</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px]">Customer / Enterprise</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px]">System Size &amp; Type</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px] text-right">Base EPC Price</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px] text-center">Dealer Margin Audit</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px] text-right">Gross Quoted</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px] text-center">Lifecycle Stage</th>
                <th className="py-3.5 px-4 font-semibold tracking-wider uppercase text-[11px] text-center">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB] font-body-sm text-xs">
              {/* Row 1: Large C&I with Compliant Margin (Mirana Technocast) */}
              <tr className="hover:bg-[#F0F4F2] transition-colors bg-[#FFFFFF]">
                <td className="py-3.5 px-4 font-mono font-bold text-on-surface">
                  <button
                    onClick={() => handleViewPdf({
                      quoteNumber: 'SV-2025-Q409',
                      customerName: 'MIRANA TECHNOCAST PVT.LTD.',
                      contactPerson: 'Mr. Pareshbhai',
                      city: 'Rajkot',
                      state: 'Gujarat',
                      systemCapacityKW: 280.20,
                      grandTotalCustomer: 7285200,
                      dealerMarginPerKW: 2000,
                      dealerTotalMargin: 560400,
                      date: '2025-10-24'
                    })}
                    className="text-[#256676] hover:underline flex items-center gap-1 font-bold"
                  >
                    #SV-2025-Q409
                  </button>
                </td>
                <td className="py-3.5 px-4 text-secondary whitespace-nowrap">
                  24 Oct 2025, 11:20 AM
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-on-surface">Rajesh Solar Tech</div>
                  <div className="text-[11px] text-secondary font-mono flex items-center gap-1">
                    <span>#SV-DLR-0842</span> • <span>Rajkot, GJ</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">MIRANA TECHNOCAST PVT.LTD.</div>
                  <div className="text-[11px] text-secondary">HT Consumer • PGVCL</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">280.20 kW</div>
                  <div className="text-[11px] text-secondary">C&amp;I Rooftop (Grid Tied)</div>
                </td>
                <td className="py-3.5 px-4 text-right font-medium text-secondary">
                  ₹ 67,24,800
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[rgba(108,191,61,0.15)] text-[#2E7D32]">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      ₹ 5,60,400 <span className="font-normal font-mono">(₹2,000/kW)</span>
                    </span>
                    <span className="text-[10px] text-[#2E7D32] mt-0.5">Compliant (Below C&amp;I cap)</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#0F1B2E] text-sm">
                  ₹ 72,85,200
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Customer Approved
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleViewPdf({
                        quoteNumber: 'SV-2025-Q409',
                        customerName: 'MIRANA TECHNOCAST PVT.LTD.',
                        contactPerson: 'Mr. Pareshbhai',
                        city: 'Rajkot',
                        state: 'Gujarat',
                        systemCapacityKW: 280.20,
                        grandTotalCustomer: 7285200,
                        date: '2025-10-24'
                      })}
                      className="p-1.5 hover:bg-surface-container-high rounded text-secondary hover:text-on-surface"
                      title="View Customer PDF"
                    >
                      <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                    </button>
                    <button className="p-1.5 hover:bg-surface-container-high rounded text-secondary hover:text-[#256676]" title="Internal Margin Audit Sheet">
                      <span className="material-symbols-outlined text-sm">shield</span>
                    </button>
                    <button className="p-1.5 hover:bg-surface-container-high rounded text-secondary hover:text-green-600" title="WhatsApp Resend">
                      <span className="material-symbols-outlined text-sm">share</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2: Residential with Margin Warning */}
              <tr className="hover:bg-[#F0F4F2] transition-colors bg-[#F6F8F7]">
                <td className="py-3.5 px-4 font-mono font-bold text-on-surface">
                  <button
                    onClick={() => handleViewPdf({
                      quoteNumber: 'SV-2025-Q408',
                      customerName: 'Anand Sharma',
                      city: 'Surat',
                      state: 'Gujarat',
                      systemCapacityKW: 5.0,
                      grandTotalCustomer: 247000,
                      dealerMarginPerKW: 5200,
                      dealerTotalMargin: 26000,
                      date: '2025-10-24'
                    })}
                    className="text-[#256676] hover:underline flex items-center gap-1 font-bold"
                  >
                    #SV-2025-Q408
                  </button>
                </td>
                <td className="py-3.5 px-4 text-secondary whitespace-nowrap">
                  24 Oct 2025, 10:45 AM
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-on-surface">Surya Green Solutions</div>
                  <div className="text-[11px] text-secondary font-mono flex items-center gap-1">
                    <span>#SV-DLR-0841</span> • <span>Surat, GJ</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">Anand Sharma</div>
                  <div className="text-[11px] text-secondary">Bungalow 14, Vesu • DGVCL</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">5.00 kW</div>
                  <div className="text-[11px] text-secondary">Residential Rooftop (Mono PERC)</div>
                </td>
                <td className="py-3.5 px-4 text-right font-medium text-secondary">
                  ₹ 2,21,000
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[rgba(249,168,37,0.15)] text-[#B27204]">
                      <span className="material-symbols-outlined text-xs">warning</span>
                      ₹ 26,000 <span className="font-normal font-mono">(₹5,200/kW)</span>
                    </span>
                    <span className="text-[10px] text-[#B27204] font-medium mt-0.5">⚠️ Exceeds ₹5k standard cap</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#0F1B2E] text-sm">
                  ₹ 2,47,000
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    Quotation Generated
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleViewPdf({
                        quoteNumber: 'SV-2025-Q408',
                        customerName: 'Anand Sharma',
                        city: 'Surat',
                        state: 'Gujarat',
                        systemCapacityKW: 5.0,
                        grandTotalCustomer: 247000,
                        date: '2025-10-24'
                      })}
                      className="p-1.5 hover:bg-surface-container-high rounded text-secondary hover:text-on-surface"
                      title="View Customer PDF"
                    >
                      <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                    </button>
                    <button className="p-1.5 hover:bg-surface-container-high rounded text-secondary hover:text-[#256676]" title="Internal Margin Audit Sheet">
                      <span className="material-symbols-outlined text-sm">shield</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3: 3 kW Small Residential Compliant */}
              <tr className="hover:bg-[#F0F4F2] transition-colors bg-[#FFFFFF]">
                <td className="py-3.5 px-4 font-mono font-bold text-on-surface">
                  <button
                    onClick={() => handleViewPdf({
                      quoteNumber: 'SV-2025-Q407',
                      customerName: 'Kavita Patel',
                      city: 'Morbi',
                      state: 'Gujarat',
                      systemCapacityKW: 3.0,
                      grandTotalCustomer: 148000,
                      dealerMarginPerKW: 3200,
                      dealerTotalMargin: 16000,
                      date: '2025-10-24'
                    })}
                    className="text-[#256676] hover:underline flex items-center gap-1 font-bold"
                  >
                    #SV-2025-Q407
                  </button>
                </td>
                <td className="py-3.5 px-4 text-secondary whitespace-nowrap">
                  24 Oct 2025, 09:15 AM
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-on-surface">Saur Urja Tech</div>
                  <div className="text-[11px] text-secondary font-mono flex items-center gap-1">
                    <span>#SV-DLR-0792</span> • <span>Morbi, GJ</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">Kavita Patel</div>
                  <div className="text-[11px] text-secondary">Shakti Park • PGVCL</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">3.00 kW</div>
                  <div className="text-[11px] text-secondary">Residential Subsidy (Surya Gujarat)</div>
                </td>
                <td className="py-3.5 px-4 text-right font-medium text-secondary">
                  ₹ 1,32,000
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[rgba(108,191,61,0.15)] text-[#2E7D32]">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      ₹ 16,000 <span className="font-normal font-mono">(₹3,200/kW)</span>
                    </span>
                    <span className="text-[10px] text-[#2E7D32] mt-0.5">Compliant Margin</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#0F1B2E] text-sm">
                  ₹ 1,48,000
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                    DISCOM Sanctioned
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleViewPdf({
                        quoteNumber: 'SV-2025-Q407',
                        customerName: 'Kavita Patel',
                        city: 'Morbi',
                        state: 'Gujarat',
                        systemCapacityKW: 3.0,
                        grandTotalCustomer: 148000,
                        date: '2025-10-24'
                      })}
                      className="p-1.5 hover:bg-surface-container-high rounded text-secondary hover:text-on-surface"
                      title="View Customer PDF"
                    >
                      <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                    </button>
                    <button className="p-1.5 hover:bg-surface-container-high rounded text-secondary hover:text-[#256676]" title="Internal Margin Audit Sheet">
                      <span className="material-symbols-outlined text-sm">shield</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4: Flagged Audit */}
              <tr className="hover:bg-red-50/50 transition-colors bg-red-50/20">
                <td className="py-3.5 px-4 font-mono font-bold text-on-surface">
                  <button className="text-[#D64545] hover:underline flex items-center gap-1 font-bold">
                    #SV-2025-Q406
                  </button>
                </td>
                <td className="py-3.5 px-4 text-secondary whitespace-nowrap">
                  23 Oct 2025, 05:40 PM
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-on-surface">Pinnacle Sun Tech</div>
                  <div className="text-[11px] text-secondary font-mono flex items-center gap-1">
                    <span>#SV-DLR-0610</span> • <span>Ahmedabad, GJ</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">Mehta Textiles Ltd</div>
                  <div className="text-[11px] text-secondary">Naroda GIDC • UGVCL</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">10.00 kW</div>
                  <div className="text-[11px] text-secondary">Commercial High Margin</div>
                </td>
                <td className="py-3.5 px-4 text-right font-medium text-secondary">
                  ₹ 5,10,000
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[rgba(214,69,69,0.15)] text-[#D64545] border border-[#D64545]/30">
                      <span className="material-symbols-outlined text-xs">error</span>
                      ₹ 75,000 <span className="font-normal font-mono">(₹7,500/kW)</span>
                    </span>
                    <span className="text-[10px] text-[#D64545] font-bold mt-0.5">🚨 Flagged: Requires Admin Overrule</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-[#D64545] text-sm">
                  ₹ 5,85,000
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    Under Review
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-red-100 rounded text-red-700" title="Super Admin Override Dialog">
                      <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                    </button>
                    <button className="p-1.5 hover:bg-surface-container-high rounded text-secondary hover:text-[#256676]" title="Internal Margin Audit Sheet">
                      <span className="material-symbols-outlined text-sm">shield</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="p-4 border-t border-[#E4E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-secondary font-label-sm text-label-sm">
          <span>Showing <span className="font-semibold text-on-surface">1 to 4</span> of <span className="font-semibold text-on-surface">1,420</span> proposals</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded border border-[#E4E7EB] text-secondary hover:bg-surface-container transition-colors disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="px-3 py-1 rounded bg-[#0F1B2E] text-white font-semibold">1</button>
            <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface transition-colors">2</button>
            <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface transition-colors">3</button>
            <span className="px-1 text-secondary">...</span>
            <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface transition-colors">284</button>
            <button className="p-1.5 rounded border border-[#E4E7EB] text-secondary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
