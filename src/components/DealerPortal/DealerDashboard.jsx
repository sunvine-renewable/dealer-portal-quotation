import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function DealerDashboard() {
  const { currentDealer, quotations, setActiveTab, setPreviewQuotation } = useApp();
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 Days');

  const handleOpenPDF = (quote) => {
    if (setPreviewQuotation) {
      setPreviewQuotation(quote || quotations[0]);
    }
    setActiveTab('preview_quote');
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Top Operational Control & Profile Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-sm">
        <div className="flex items-start md:items-center gap-space-md">
          <div className="relative shrink-0">
            <img
              alt="Rajesh Kumar Profile"
              className="w-16 h-16 rounded-xl object-cover shadow-md shadow-secondary/10"
              src={currentDealer.avatar || '/dealer_avatar.jpg'}
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-container rounded-full ring-2 ring-surface"></span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs text-secondary font-label-xs tracking-wider uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>
              <span>{currentDealer.firmName || 'Surya Solar Tech'} • {currentDealer.city || 'Pune West Hub'}</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-secondary-fixed tracking-tight">
              Welcome back, {currentDealer.contactPerson || 'Rajesh Kumar'}
            </h1>
            <p className="font-body-md text-body-md text-secondary">
              Here's an overview of your quotation activity and solar installations pipeline.
            </p>
          </div>
        </div>

        {/* Quick Actions Toolbar */}
        <div className="flex items-center gap-space-sm self-start lg:self-center">
          <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm text-secondary font-label-sm hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>{selectedTimeRange}</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </div>
          <button
            onClick={() => setActiveTab('create_quote')}
            className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary px-space-md py-space-sm rounded-lg shadow-sm font-label-md transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Create New Quotation</span>
          </button>
        </div>
      </section>

      {/* Telemetry & Performance KPI Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Card 1: Total Quotations */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-md">
            <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">description</span>
            </div>
            <span className="px-space-sm py-0.5 rounded-full text-label-xs font-label-xs bg-primary-container/15 text-primary">
              +8 this month (↑ 24%)
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">42</span>
              <span className="font-label-sm text-label-sm text-secondary">proposals</span>
            </div>
            <div className="font-label-sm text-label-sm text-secondary mt-1">Total Quotations</div>
          </div>
          {/* Mini Sparkline Representation */}
          <div className="mt-space-md pt-space-xs flex items-end gap-1.5 h-8">
            <div className="w-full bg-surface-container rounded-t h-2"></div>
            <div className="w-full bg-surface-container rounded-t h-3"></div>
            <div className="w-full bg-surface-container rounded-t h-3"></div>
            <div className="w-full bg-surface-container rounded-t h-5"></div>
            <div className="w-full bg-surface-container rounded-t h-4"></div>
            <div className="w-full bg-primary-container/60 rounded-t h-6"></div>
            <div className="w-full bg-primary-container rounded-t h-8"></div>
          </div>
        </div>

        {/* Card 2: This Month Quotations */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed/40 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[24px]">wb_sunny</span>
            </div>
            <span className="px-space-sm py-0.5 rounded-full text-label-xs font-label-xs bg-tertiary/10 text-tertiary">
              ₹18.4 Lakhs quoted
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">14</span>
              <span className="font-label-sm text-label-sm text-secondary">in October</span>
            </div>
            <div className="font-label-sm text-label-sm text-secondary mt-1">This Month Quotations</div>
          </div>
          {/* Capacity Yield Bar Visual */}
          <div className="mt-space-md flex flex-col gap-1">
            <div className="flex justify-between text-label-xs font-label-xs text-secondary">
              <span>Target Progress</span>
              <span className="text-on-surface font-semibold">70 kW / 100 kW</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: Total Business Value */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[24px]">currency_rupee</span>
            </div>
            <span className="px-space-sm py-0.5 rounded-full text-label-xs font-label-xs bg-secondary-fixed text-on-secondary-fixed-variant">
              8 Approved • 4 Commissioned
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">₹ 58.20 L</span>
            </div>
            <div className="font-label-sm text-label-sm text-secondary mt-1">Total Business Value</div>
          </div>
          {/* Conversion Split */}
          <div className="mt-space-md flex items-center justify-between text-label-xs font-label-xs text-secondary pt-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span>₹34.8L Approved</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
              <span>₹23.4L In Pipeline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Solar Estimator Banner Action Card */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary p-space-lg md:p-space-xl shadow-md">
        {/* Subtle Geometric SVG Watermark Pattern */}
        <svg className="absolute right-0 top-0 bottom-0 h-full opacity-10 pointer-events-none transform translate-x-12" fill="none" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <polygon fill="currentColor" points="40,20 180,20 140,180 0,180"></polygon>
          <polygon fill="currentColor" points="190,20 330,20 290,180 150,180"></polygon>
          <polygon fill="currentColor" points="340,20 480,20 440,180 300,180"></polygon>
          <line stroke="currentColor" strokeWidth="6" x1="20" x2="460" y1="100" y2="100"></line>
          <line stroke="currentColor" strokeWidth="4" x1="10" x2="450" y1="60" y2="60"></line>
          <line stroke="currentColor" strokeWidth="4" x1="0" x2="440" y1="140" y2="140"></line>
        </svg>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
          <div className="max-w-2xl">
            <div className="flex items-center gap-space-xs text-primary-fixed font-label-sm uppercase tracking-wider mb-space-xs">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Fast EPC Engine • Instant DISCOM Rates</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-primary font-bold">
              Need a quick quotation for a customer?
            </h2>
            <p className="font-body-md text-body-md text-on-primary/90 mt-1 max-w-xl">
              Generate customized solar EPC quotations with instant subsidy calculations in under 2 minutes.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('create_quote')}
            className="shrink-0 flex items-center justify-center gap-space-sm bg-surface-container-lowest text-primary hover:bg-surface-container hover:text-on-primary-container px-space-lg py-3 rounded-lg font-label-md transition-all shadow-sm active:scale-95"
            type="button"
          >
            <span>+ Create New Quotation</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Recent Quotations Data Section */}
      <section className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface">Recent Quotations</h2>
            <span className="px-space-xs py-0.5 rounded text-label-xs font-label-xs bg-surface-container-high text-secondary">
              5 Recent
            </span>
          </div>
          <button
            onClick={() => setActiveTab('my_quotes')}
            className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary hover:text-on-primary-container font-semibold transition-colors"
          >
            <span>View All (42)</span>
            <span className="material-symbols-outlined text-[16px]">east</span>
          </button>
        </div>

        {/* Data Table Container */}
        <div className="w-full overflow-x-auto rounded-xl shadow-sm bg-surface-container-lowest">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-on-secondary-fixed text-on-secondary h-12 text-label-sm font-label-sm select-none">
                <th className="px-space-lg py-space-sm font-semibold tracking-wider">Customer Name</th>
                <th className="px-space-lg py-space-sm font-semibold tracking-wider">System Capacity</th>
                <th className="px-space-lg py-space-sm font-semibold tracking-wider">Date</th>
                <th className="px-space-lg py-space-sm font-semibold tracking-wider text-right">Amount</th>
                <th className="px-space-lg py-space-sm font-semibold tracking-wider text-center">Status</th>
                <th className="px-space-lg py-space-sm font-semibold tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md divide-y divide-surface-container">
              {/* Row 1 */}
              <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                <td className="px-space-lg py-3.5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">Anand Sharma</span>
                    <span className="text-label-xs text-secondary">Pune, Maharashtra</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5">
                  <div className="flex items-center gap-1.5 font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[18px]">solar_power</span>
                    <span>5.0 kW</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5 text-secondary font-label-xs whitespace-nowrap">
                  Today, 10:45 AM
                </td>
                <td className="px-space-lg py-3.5 text-right font-bold text-on-surface tabular-nums">
                  ₹ 3,45,000
                </td>
                <td className="px-space-lg py-3.5 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-primary-container/15 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Active / Sent
                  </span>
                </td>
                <td className="px-space-lg py-3.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="View Quotation"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="Download PDF"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                    <button
                      onClick={() => alert('WhatsApp sharing link generated for Anand Sharma!')}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors"
                      title="Share via WhatsApp"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="bg-surface-container-low hover:bg-surface-container transition-colors">
                <td className="px-space-lg py-3.5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">Kavita Patel</span>
                    <span className="text-label-xs text-secondary">Surat, Gujarat</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5">
                  <div className="flex items-center gap-1.5 font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[18px]">solar_power</span>
                    <span>3.0 kW</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5 text-secondary font-label-xs whitespace-nowrap">
                  Yesterday
                </td>
                <td className="px-space-lg py-3.5 text-right font-bold text-on-surface tabular-nums">
                  ₹ 2,10,000
                </td>
                <td className="px-space-lg py-3.5 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-tertiary-container/30 text-on-tertiary-container">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    Customer Viewed
                  </span>
                </td>
                <td className="px-space-lg py-3.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="View Quotation"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="Download PDF"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                    <button
                      onClick={() => alert('WhatsApp sharing link generated for Kavita Patel!')}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors"
                      title="Share via WhatsApp"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                <td className="px-space-lg py-3.5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-on-surface">MIRANA TECHNOCAST PVT.LTD.</span>
                      <span className="text-label-xs px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant">Commercial</span>
                    </div>
                    <span className="text-label-xs text-secondary">Metoda GIDC, Rajkot</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5">
                  <div className="flex items-center gap-1.5 font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[18px]">factory</span>
                    <span>280.20 kW</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5 text-secondary font-label-xs whitespace-nowrap">
                  17 Aug 2026
                </td>
                <td className="px-space-lg py-3.5 text-right font-bold text-on-surface tabular-nums">
                  ₹ 67,24,800
                </td>
                <td className="px-space-lg py-3.5 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-amber-500/15 text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Verified Proposal
                  </span>
                </td>
                <td className="px-space-lg py-3.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="View Quotation"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="Download PDF"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                    <button
                      onClick={() => alert('WhatsApp sharing link generated for Mirana Technocast!')}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors"
                      title="Share via WhatsApp"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="bg-surface-container-low hover:bg-surface-container transition-colors">
                <td className="px-space-lg py-3.5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">Vikram Rathore</span>
                    <span className="text-label-xs text-secondary">Jaipur, Rajasthan</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5">
                  <div className="flex items-center gap-1.5 font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[18px]">solar_power</span>
                    <span>7.5 kW</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5 text-secondary font-label-xs whitespace-nowrap">
                  15 Oct 2024
                </td>
                <td className="px-space-lg py-3.5 text-right font-bold text-on-surface tabular-nums">
                  ₹ 5,15,000
                </td>
                <td className="px-space-lg py-3.5 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-primary-container/15 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Active / Sent
                  </span>
                </td>
                <td className="px-space-lg py-3.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="View Quotation"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="Download PDF"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                    <button
                      onClick={() => alert('WhatsApp sharing link generated for Vikram Rathore!')}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors"
                      title="Share via WhatsApp"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                <td className="px-space-lg py-3.5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">Dr. Suresh Nair</span>
                    <span className="text-label-xs text-secondary">Bangalore, Karnataka</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5">
                  <div className="flex items-center gap-1.5 font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[18px]">solar_power</span>
                    <span>4.0 kW</span>
                  </div>
                </td>
                <td className="px-space-lg py-3.5 text-secondary font-label-xs whitespace-nowrap">
                  12 Oct 2024
                </td>
                <td className="px-space-lg py-3.5 text-right font-bold text-on-surface tabular-nums">
                  ₹ 2,75,000
                </td>
                <td className="px-space-lg py-3.5 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-xs font-label-xs bg-tertiary-container/30 text-on-tertiary-container">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    Customer Viewed
                  </span>
                </td>
                <td className="px-space-lg py-3.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="View Quotation"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => handleOpenPDF()}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="Download PDF"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                    <button
                      onClick={() => alert('WhatsApp sharing link generated for Dr. Suresh Nair!')}
                      className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors"
                      title="Share via WhatsApp"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Notification Banner / Channel Support Quick Tip */}
      <footer className="mt-space-sm p-space-md bg-surface-container-low rounded-xl flex items-center justify-between flex-wrap gap-space-sm">
        <div className="flex items-center gap-space-sm text-secondary font-body-sm">
          <span className="material-symbols-outlined text-tertiary text-[20px]">info</span>
          <span>DISCOM subsidy slabs for PM Surya Ghar: Muft Bijli Yojana have been refreshed for Maharashtra &amp; Gujarat circles.</span>
        </div>
        <div className="flex items-center gap-space-md text-label-xs font-label-xs">
          <a className="text-primary hover:underline cursor-pointer" onClick={() => setActiveTab('create_quote')}>
            Download Revised Rate Matrix
          </a>
          <span className="text-secondary">•</span>
          <a className="text-secondary hover:text-on-surface cursor-pointer" onClick={() => setActiveTab('profile')}>
            Contact EPC Territory Manager
          </a>
        </div>
      </footer>
    </div>
  );
}
