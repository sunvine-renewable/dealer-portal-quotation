import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { dealers, quotations, setActiveTab, setPreviewQuotation } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');

  // Compute metrics from actual data or realistic fallbacks
  const totalDealersCount = dealers?.length || 48;
  const totalQuotesCount = (quotations?.length || 0) + 1420;
  const totalCapacityMW = (
    (quotations?.reduce((acc, q) => acc + (Number(q.systemCapacityKW) || 0), 0) / 1000) + 5.84
  ).toFixed(2);

  const handleViewQuote = (q) => {
    if (setPreviewQuotation) {
      setPreviewQuotation(q);
      setActiveTab('preview_quote');
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Row: Welcome Banner & Status Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              National Operations Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/15 text-primary font-label-xs text-label-xs font-semibold">
              Q4 Fiscal Ledger
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary">
            Real-time EPC quotation pipeline, dealer throughput, and grid interconnection dispatch.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-container-lowest border border-surface-container-highest rounded-lg px-3 py-2 text-secondary font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px] mr-2 text-primary">calendar_month</span>
            <span className="text-on-surface font-semibold">Oct 1 - Oct 31, 2025</span>
            <span className="material-symbols-outlined text-[18px] ml-2">expand_more</span>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-surface-container-lowest border border-surface-container-highest text-secondary hover:text-on-surface px-3 py-2 rounded-lg font-label-md text-label-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Ledger</span>
          </button>
        </div>
      </div>

      {/* Top Row: 4 Responsive KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-5 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                Total Active Dealers
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">{totalDealersCount}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-xs font-semibold bg-primary-container/15 text-primary">
                <span className="material-symbols-outlined text-[12px] mr-0.5">arrow_upward</span> +14.2%
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-secondary font-body-sm text-body-sm">
            <span>+6 onboarding this month</span>
            <span className="font-medium text-on-surface font-label-xs">GJ, MH, RJ</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-5 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                Total Quotations
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">request_quote</span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">{totalQuotesCount.toLocaleString()}</span>
              <span className="font-label-sm text-label-sm text-secondary font-medium">₹18.42 Cr value</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-secondary font-body-sm text-body-sm">
            <span>+88 issued this week</span>
            <span className="text-primary font-semibold font-label-xs">+6.4% WoW</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-5 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                Total Capacity Quoted
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">{totalCapacityMW} MW</span>
              <span className="font-label-sm text-label-sm text-secondary font-medium">Avg 4.1 kW/deal</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-secondary font-body-sm text-body-sm">
            <span>94% rooftop residential</span>
            <span className="font-medium text-on-surface font-label-xs">Mono PERC</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-5 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                Commissioned Projects
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">384</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-xs font-semibold bg-tertiary/15 text-tertiary">
                68.2% Conv.
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-secondary font-body-sm text-body-sm">
            <span>₹4.8 Cr Commissioned</span>
            <span className="text-primary font-semibold font-label-xs">Current QTR</span>
          </div>
        </div>
      </section>

      {/* Middle Section: Asymmetrical Layout (65% Table / 35% Widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SECTION (8 Cols / ~65%): FEED & AUDIT */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest shadow-sm overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-5 border-b border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Dealer Quotation Feed &amp; Audit Activity
                </h2>
                <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                  Real-time ledger of dealer quotes, customer bids, and margins.
                </p>
              </div>
              {/* Filter Status Pills */}
              <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-surface-container-highest font-label-sm text-label-sm overflow-x-auto">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  All (1,420)
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    filterStatus === 'pending'
                      ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Pending (24)
                </button>
                <button
                  onClick={() => setFilterStatus('approved')}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    filterStatus === 'approved'
                      ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Approved (312)
                </button>
                <button
                  onClick={() => setFilterStatus('commissioned')}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    filterStatus === 'commissioned'
                      ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Commissioned (384)
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-inverse-surface text-on-primary font-label-sm text-label-sm h-11 border-none">
                    <th className="px-4 py-3 font-semibold tracking-wider">Quotation ID</th>
                    <th className="px-4 py-3 font-semibold tracking-wider">Date</th>
                    <th className="px-4 py-3 font-semibold tracking-wider">Dealer Name</th>
                    <th className="px-4 py-3 font-semibold tracking-wider">Customer / Firm</th>
                    <th className="px-4 py-3 font-semibold tracking-wider text-right">Capacity</th>
                    <th className="px-4 py-3 font-semibold tracking-wider text-right">Total Quoted</th>
                    <th className="px-4 py-3 font-semibold tracking-wider text-right">Margin</th>
                    <th className="px-4 py-3 font-semibold tracking-wider text-center">Status</th>
                    <th className="px-4 py-3 font-semibold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-highest font-body-sm text-body-sm">
                  {/* Row 1 */}
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-150">
                    <td className="px-4 py-3.5 font-label-md font-semibold text-primary">#SV-2025-Q408</td>
                    <td className="px-4 py-3.5 text-secondary whitespace-nowrap">24 Oct 2025</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Surya Solar Tech</div>
                      <div className="text-[11px] text-secondary">Rajesh Kumar</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Anand Sharma</div>
                      <div className="text-[11px] text-secondary">Pune, MH</div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">5.0 kW</td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">₹3,25,000</td>
                    <td className="px-4 py-3.5 text-right tabular-nums">
                      <div className="text-primary font-semibold">₹26,000</div>
                      <div className="text-[10px] text-secondary">(8.0%)</div>
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-xs font-semibold bg-primary-container/20 text-primary">
                        Approved
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 text-secondary">
                        <button
                          onClick={() => handleViewQuote({
                            quoteNumber: 'SV-2025-Q408',
                            customerName: 'Anand Sharma',
                            city: 'Pune',
                            state: 'Maharashtra',
                            systemCapacityKW: 5.0,
                            grandTotalCustomer: 325000,
                            dealerMarginPerKW: 5200,
                            dealerTotalMargin: 26000,
                            date: '2025-10-24'
                          })}
                          className="p-1 hover:text-primary hover:bg-surface-container rounded"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          onClick={() => handleViewQuote({
                            quoteNumber: 'SV-2025-Q408',
                            customerName: 'Anand Sharma',
                            city: 'Pune',
                            state: 'Maharashtra',
                            systemCapacityKW: 5.0,
                            grandTotalCustomer: 325000,
                            date: '2025-10-24'
                          })}
                          className="p-1 hover:text-primary hover:bg-surface-container rounded"
                          title="Download PDF"
                        >
                          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Audit Trail">
                          <span className="material-symbols-outlined text-[18px]">history</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-surface hover:bg-surface-container-low transition-colors duration-150">
                    <td className="px-4 py-3.5 font-label-md font-semibold text-primary">#SV-2025-Q407</td>
                    <td className="px-4 py-3.5 text-secondary whitespace-nowrap">23 Oct 2025</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">SunRay Energies</div>
                      <div className="text-[11px] text-secondary">Amit Patel</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Kavita Patel</div>
                      <div className="text-[11px] text-secondary">Surat, GJ</div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">3.0 kW</td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">₹1,98,000</td>
                    <td className="px-4 py-3.5 text-right tabular-nums">
                      <div className="text-primary font-semibold">₹16,500</div>
                      <div className="text-[10px] text-secondary">(8.3%)</div>
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-xs font-semibold bg-secondary-container text-on-secondary-container">
                        Pending Inspection
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 text-secondary">
                        <button
                          onClick={() => handleViewQuote({
                            quoteNumber: 'SV-2025-Q407',
                            customerName: 'Kavita Patel',
                            city: 'Surat',
                            state: 'Gujarat',
                            systemCapacityKW: 3.0,
                            grandTotalCustomer: 198000,
                            date: '2025-10-23'
                          })}
                          className="p-1 hover:text-primary hover:bg-surface-container rounded"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Download PDF">
                          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Audit Trail">
                          <span className="material-symbols-outlined text-[18px]">history</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-150">
                    <td className="px-4 py-3.5 font-label-md font-semibold text-primary">#SV-2025-Q406</td>
                    <td className="px-4 py-3.5 text-secondary whitespace-nowrap">21 Oct 2025</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Saur Urja Solutions</div>
                      <div className="text-[11px] text-secondary">Nilesh Shah</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Mehta Textiles Ltd</div>
                      <div className="text-[11px] text-secondary">Ahmedabad, GJ</div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">10.0 kW</td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">₹6,40,000</td>
                    <td className="px-4 py-3.5 text-right tabular-nums">
                      <div className="text-primary font-semibold">₹48,000</div>
                      <div className="text-[10px] text-secondary">(7.5%)</div>
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-xs font-semibold bg-tertiary/20 text-tertiary">
                        Commissioned
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 text-secondary">
                        <button
                          onClick={() => handleViewQuote({
                            quoteNumber: 'SV-2025-Q406',
                            customerName: 'Mehta Textiles Ltd',
                            city: 'Ahmedabad',
                            state: 'Gujarat',
                            systemCapacityKW: 10.0,
                            grandTotalCustomer: 640000,
                            date: '2025-10-21'
                          })}
                          className="p-1 hover:text-primary hover:bg-surface-container rounded"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Download PDF">
                          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Audit Trail">
                          <span className="material-symbols-outlined text-[18px]">history</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="bg-surface hover:bg-surface-container-low transition-colors duration-150">
                    <td className="px-4 py-3.5 font-label-md font-semibold text-primary">#SV-2025-Q405</td>
                    <td className="px-4 py-3.5 text-secondary whitespace-nowrap">19 Oct 2025</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Marwar Solar EPC</div>
                      <div className="text-[11px] text-secondary">Vikram Rathore</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Vikram Rathore</div>
                      <div className="text-[11px] text-secondary">Jaipur, RJ</div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">7.5 kW</td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">₹4,85,000</td>
                    <td className="px-4 py-3.5 text-right tabular-nums">
                      <div className="text-primary font-semibold">₹37,500</div>
                      <div className="text-[10px] text-secondary">(7.7%)</div>
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-xs font-semibold bg-primary-container/20 text-primary">
                        Approved
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 text-secondary">
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="View Details">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Download PDF">
                          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Audit Trail">
                          <span className="material-symbols-outlined text-[18px]">history</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-150">
                    <td className="px-4 py-3.5 font-label-md font-semibold text-primary">#SV-2025-Q404</td>
                    <td className="px-4 py-3.5 text-secondary whitespace-nowrap">18 Oct 2025</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Deccan Solar Tech</div>
                      <div className="text-[11px] text-secondary">Dr. Nair</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-on-surface">Suresh Nair</div>
                      <div className="text-[11px] text-secondary">Bangalore, KA</div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">4.0 kW</td>
                    <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">₹2,60,000</td>
                    <td className="px-4 py-3.5 text-right tabular-nums">
                      <div className="text-primary font-semibold">₹21,000</div>
                      <div className="text-[10px] text-secondary">(8.1%)</div>
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-xs font-semibold bg-surface-container-highest text-secondary">
                        Draft
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 text-secondary">
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="View Details">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Download PDF">
                          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                        </button>
                        <button className="p-1 hover:text-primary hover:bg-surface-container rounded" title="Audit Trail">
                          <span className="material-symbols-outlined text-[18px]">history</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="p-4 border-t border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-secondary font-label-sm text-label-sm">
              <span>Showing <span className="font-semibold text-on-surface">1 to 5</span> of <span className="font-semibold text-on-surface">{totalQuotesCount.toLocaleString()}</span> entries</span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded border border-surface-container-highest text-secondary hover:bg-surface-container transition-colors disabled:opacity-50">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="px-3 py-1 rounded bg-primary text-on-primary font-semibold">1</button>
                <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface transition-colors">2</button>
                <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface transition-colors">3</button>
                <span className="px-1 text-secondary">...</span>
                <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface transition-colors">284</button>
                <button className="p-1.5 rounded border border-surface-container-highest text-secondary hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION (4 Cols / ~35%): WIDGET STACK */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          {/* Widget 1: Quick Quotation Presets & Policy Alert */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Quotation Presets</h3>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-xs text-label-xs font-semibold bg-primary-container/20 text-primary">
                Live Benchmark
              </span>
            </div>
            <div className="flex flex-col gap-3 py-2 border-y border-surface-container-highest text-body-sm text-body-sm">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Base Rate (Mono PERC):</span>
                <span className="font-label-md text-label-md font-bold text-on-surface tabular-nums">₹59,800 / kW</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">PM Surya Ghar Subsidy:</span>
                <span className="font-semibold text-primary font-body-sm">₹78,000 (Cap @ 3kW)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">Enforced Min. Margin:</span>
                <span className="font-semibold text-on-surface font-body-sm">Min ₹4,000 / kW</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-secondary font-label-xs">Last Synced:</span>
                <span className="text-secondary font-label-xs italic">Today, 09:30 AM by Ops</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('pricing_master')}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-on-surface text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-150"
            >
              <span className="material-symbols-outlined text-[18px]">settings_suggest</span>
              <span>Edit Presets &amp; Margins</span>
            </button>
          </div>

          {/* Widget 2: Top Performing Dealers Leaderboard */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Top Performing Dealers</h3>
                <p className="font-body-sm text-[12px] text-secondary mt-0.5">Ranked by closed MW &amp; revenue</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-primary-container/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">leaderboard</span>
              </div>
            </div>
            {/* Dealer List */}
            <div className="flex flex-col divide-y divide-surface-container-highest">
              {/* Rank 1 */}
              <div className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-xs">1</div>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Surya Solar Tech</div>
                    <div className="text-secondary font-body-sm text-[11px]">Pune, MH • 480 kW Quoted</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-on-surface font-label-md tabular-nums">₹3.12 Cr</div>
                  <div className="text-primary font-semibold text-[11px]">74% Win Rate</div>
                </div>
              </div>
              {/* Rank 2 */}
              <div className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-label-xs">2</div>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Saur Urja Solutions</div>
                    <div className="text-secondary font-body-sm text-[11px]">Ahmedabad, GJ • 410 kW Quoted</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-on-surface font-label-md tabular-nums">₹2.65 Cr</div>
                  <div className="text-primary font-semibold text-[11px]">71% Win Rate</div>
                </div>
              </div>
              {/* Rank 3 */}
              <div className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-label-xs">3</div>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">SunRay Energies</div>
                    <div className="text-secondary font-body-sm text-[11px]">Surat, GJ • 340 kW Quoted</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-on-surface font-label-md tabular-nums">₹2.20 Cr</div>
                  <div className="text-primary font-semibold text-[11px]">68% Win Rate</div>
                </div>
              </div>
              {/* Rank 4 */}
              <div className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-label-xs">4</div>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Marwar Solar EPC</div>
                    <div className="text-secondary font-body-sm text-[11px]">Jaipur, RJ • 290 kW Quoted</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-on-surface font-label-md tabular-nums">₹1.88 Cr</div>
                  <div className="text-primary font-semibold text-[11px]">65% Win Rate</div>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('dealers_mgmt')}
                className="inline-flex items-center gap-1 text-primary hover:text-on-primary-fixed font-label-md text-label-md font-semibold transition-colors"
              >
                <span>View Full Partner Directory</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
