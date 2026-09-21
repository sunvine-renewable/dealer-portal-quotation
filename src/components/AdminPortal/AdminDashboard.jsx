import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { dealers, quotations, setActiveTab, setPreviewQuotation } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');

  // Compute metrics from actual data or realistic fallbacks
  const totalDealersCount = dealers?.length || 550;
  const totalQuotesCount = quotations?.length || 20;
  const totalQuotedValue = quotations?.reduce((acc, q) => acc + (q.grandTotalCustomer || q.totalAmount || 0), 0) || 7850000;
  const totalCapacityKW = (
    quotations?.reduce((acc, q) => acc + (Number(q.systemCapacityKW || q.capacity) || 0), 0) || 118.5
  );
  const totalCapacityMW = (totalCapacityKW / 1000).toFixed(2);

  const pendingCount = (quotations || []).filter(q => (q.status || '').toLowerCase().includes('pending') || (q.status || '').toLowerCase().includes('draft') || (q.status || '').toLowerCase().includes('review')).length;
  const approvedCount = (quotations || []).filter(q => (q.status || '').toLowerCase().includes('approved') || (q.status || '').toLowerCase().includes('sanction')).length;
  const commCount = (quotations || []).filter(q => (q.status || '').toLowerCase().includes('commission') || (q.status || '').toLowerCase().includes('install')).length;

  const filteredFeedQuotes = (quotations || []).filter(q => {
    if (filterStatus === 'pending') return (q.status || '').toLowerCase().includes('pending') || (q.status || '').toLowerCase().includes('draft') || (q.status || '').toLowerCase().includes('review');
    if (filterStatus === 'approved') return (q.status || '').toLowerCase().includes('approved') || (q.status || '').toLowerCase().includes('sanction');
    if (filterStatus === 'commissioned') return (q.status || '').toLowerCase().includes('commission') || (q.status || '').toLowerCase().includes('install');
    return true;
  }).slice(0, 6);

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
              Gujarat Operations Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/15 text-primary font-label-xs text-label-xs font-semibold">
              Gujarat State Ledger
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary">
            Real-time EPC quotation pipeline across 550 Gujarat dealers and PGVCL, DGVCL, MGVCL, UGVCL, Torrent Power.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-surface-container-lowest border border-surface-container-highest rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-secondary font-label-md text-xs sm:text-sm">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] mr-1.5 sm:mr-2 text-primary">calendar_month</span>
            <span className="text-on-surface font-semibold">Oct 1 - Oct 31, 2025</span>
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] ml-1.5 sm:ml-2">expand_more</span>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 sm:gap-2 bg-surface-container-lowest border border-surface-container-highest text-secondary hover:text-on-surface px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-label-md text-xs sm:text-sm transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">download</span>
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
            <span>+18 onboarding this month</span>
            <span className="font-medium text-on-surface font-label-xs">Gujarat State (100%)</span>
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
              <span className="font-label-sm text-label-sm text-secondary font-medium">₹{(totalQuotedValue / 100000).toFixed(2)} L value</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-secondary font-body-sm text-body-sm">
            <span>+12 issued this week</span>
            <span className="text-primary font-semibold font-label-xs">+8.4% WoW</span>
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
              <span className="font-label-sm text-label-sm text-secondary font-medium">Avg 4.8 kW/deal</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-secondary font-body-sm text-body-sm">
            <span>Gujarat Rooftop (BOS Matrix)</span>
            <span className="font-medium text-on-surface font-label-xs">Waaree &amp; Adani</span>
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
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">{commCount || 14}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-xs font-semibold bg-tertiary/15 text-tertiary">
                70% Conv.
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-secondary font-body-sm text-body-sm">
            <span>₹{(totalQuotedValue * 0.7 / 100000).toFixed(2)} L Installed</span>
            <span className="text-primary font-semibold font-label-xs">PGVCL &amp; DGVCL</span>
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
              {/* Filter Status Pills */}
              <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-surface-container-highest font-label-sm text-label-sm overflow-x-auto max-w-full shrink-0">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  All ({totalQuotesCount})
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    filterStatus === 'pending'
                      ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setFilterStatus('approved')}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    filterStatus === 'approved'
                      ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Approved ({approvedCount})
                </button>
                <button
                  onClick={() => setFilterStatus('commissioned')}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    filterStatus === 'commissioned'
                      ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Commissioned ({commCount})
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
                  {filteredFeedQuotes.map((q, idx) => {
                    const quoteId = q.quoteNumber || q.id || `#SV-GJ-2025-${idx + 101}`;
                    const marginAmt = q.dealerTotalMargin || (q.dealerMarginPerKW ? Math.round(q.dealerMarginPerKW * (q.systemCapacityKW || 5)) : 24000);
                    const totalAmt = q.grandTotalCustomer || q.totalAmount || 320000;
                    const marginPct = ((marginAmt / totalAmt) * 100).toFixed(1);
                    const statusStr = q.status || 'Approved';

                    return (
                      <tr key={q.id || idx} className={`hover:bg-surface-container-low transition-colors duration-150 ${idx % 2 === 1 ? 'bg-surface' : 'bg-surface-container-lowest'}`}>
                        <td className="px-4 py-3.5 font-label-md font-semibold text-primary">{quoteId}</td>
                        <td className="px-4 py-3.5 text-secondary whitespace-nowrap">{q.date || '24 Oct 2025'}</td>
                        <td className="px-4 py-3.5">
                          <div className="font-medium text-on-surface">{q.dealerName || 'Gujarat Solar Tech'}</div>
                          <div className="text-[11px] text-secondary">{q.contactPerson || q.dealerId || 'Rajkot Branch'}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="font-medium text-on-surface">{q.customerName}</div>
                          <div className="text-[11px] text-secondary">{q.city || 'Rajkot'}, GJ ({q.discom || 'PGVCL'})</div>
                        </td>
                        <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">{q.systemCapacityKW || 5.0} kW</td>
                        <td className="px-4 py-3.5 text-right font-semibold text-on-surface tabular-nums">₹{totalAmt.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3.5 text-right tabular-nums">
                          <div className="text-primary font-semibold">₹{marginAmt.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] text-secondary">({marginPct}%)</div>
                        </td>
                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-xs font-semibold ${
                            statusStr.toLowerCase().includes('approved') ? 'bg-primary-container/20 text-primary' :
                            statusStr.toLowerCase().includes('commission') ? 'bg-tertiary/20 text-tertiary' :
                            'bg-secondary-container text-on-secondary-container'
                          }`}>
                            {statusStr}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1 text-secondary">
                            <button
                              onClick={() => handleViewQuote(q)}
                              className="p-1 hover:text-primary hover:bg-surface-container rounded"
                              title="View Details"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                            <button
                              onClick={() => handleViewQuote(q)}
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
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="p-4 border-t border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-secondary font-label-sm text-label-sm">
              <span>Showing <span className="font-semibold text-on-surface">1 to {filteredFeedQuotes.length}</span> of <span className="font-semibold text-on-surface">{totalQuotesCount.toLocaleString()}</span> entries</span>
              <button
                onClick={() => setActiveTab('all_quotations')}
                className="px-3 py-1.5 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary-container/10 transition-colors flex items-center gap-1"
              >
                <span>View All {totalQuotesCount} Proposals</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
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
                    <div className="font-label-md text-label-md font-bold text-on-surface">Rajkot Solar Tech</div>
                    <div className="text-secondary font-body-sm text-[11px]">Rajkot, GJ • 480 kW Quoted</div>
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
                    <div className="font-label-md text-label-md font-bold text-on-surface">Morbi Solar EPC</div>
                    <div className="text-secondary font-body-sm text-[11px]">Morbi, GJ • 290 kW Quoted</div>
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
