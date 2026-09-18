import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function MyQuotations() {
  const { quotations, setActiveTab, setPreviewQuotation } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleOpenPDF = (quote) => {
    if (setPreviewQuotation) setPreviewQuotation(quote);
    setActiveTab('preview_quote');
  };

  const quotesList = [
    {
      id: '#SV-2025-0409',
      customerName: 'MIRANA TECHNOCAST PVT.LTD.',
      type: 'Commercial',
      tag: 'C&I',
      location: 'Metoda GIDC, Rajkot',
      capacity: '280.20 kW',
      moduleType: 'TOPCon 600W',
      date: '17 Aug 2026',
      amount: '₹ 67,24,800',
      status: 'Active / Sent',
      statusColor: 'text-primary bg-primary/10',
      dotColor: 'bg-primary-container',
      icon: 'factory'
    },
    {
      id: '#SV-2025-0408',
      customerName: 'Anand Sharma',
      type: 'Residential',
      tag: 'Rooftop',
      location: 'Pune, Maharashtra',
      capacity: '5.0 kW',
      moduleType: 'Mono Perc',
      date: 'Today, 10:45 AM',
      amount: '₹ 3,45,000',
      status: 'Active / Sent',
      statusColor: 'text-primary bg-primary/10',
      dotColor: 'bg-primary-container',
      icon: 'solar_power'
    },
    {
      id: '#SV-2025-0407',
      customerName: 'Kavita Patel',
      type: 'Residential',
      tag: 'Rooftop',
      location: 'Surat, Gujarat',
      capacity: '3.0 kW',
      moduleType: 'Mono Perc',
      date: 'Yesterday',
      amount: '₹ 2,10,000',
      status: 'Customer Viewed',
      statusColor: 'text-tertiary bg-tertiary-container/20',
      dotColor: 'bg-tertiary',
      icon: 'solar_power'
    },
    {
      id: '#SV-2025-0406',
      customerName: 'Mehta Textiles Ltd',
      type: 'Commercial',
      tag: 'C&I',
      location: 'Ahmedabad, Gujarat',
      capacity: '10.0 kW',
      moduleType: 'Commercial',
      date: '18 Oct 2024',
      amount: '₹ 5,85,000',
      status: 'Pending Approval',
      statusColor: 'text-[#B27204] bg-[#F9A825]/15',
      dotColor: 'bg-[#B27204]',
      icon: 'factory'
    },
    {
      id: '#SV-2025-0405',
      customerName: 'Vikram Rathore',
      type: 'Residential',
      tag: 'Rooftop',
      location: 'Jaipur, Rajasthan',
      capacity: '7.5 kW',
      moduleType: 'Mono Perc',
      date: '15 Oct 2024',
      amount: '₹ 3,95,000',
      status: 'Won / Converted',
      statusColor: 'text-primary bg-primary/10',
      dotColor: 'bg-primary-container',
      icon: 'solar_power'
    },
    {
      id: '#SV-2025-0404',
      customerName: 'Dr. Suresh Nair',
      type: 'Residential',
      tag: 'Rooftop',
      location: 'Bangalore, Karnataka',
      capacity: '4.0 kW',
      moduleType: 'Mono Perc',
      date: '12 Oct 2024',
      amount: '₹ 2,10,000',
      status: 'Customer Viewed',
      statusColor: 'text-tertiary bg-tertiary-container/20',
      dotColor: 'bg-tertiary',
      icon: 'solar_power'
    }
  ];

  const filteredQuotes = quotesList.filter(q => {
    const matchesSearch = q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || q.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col w-full gap-space-lg pb-16">
      {/* Header & Title Section */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">My Quotations Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm">
              42 Records
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary mt-1">
            Browse, search, duplicate and dispatch client proposals across your authorized territory.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('create_quote')}
          className="self-start sm:self-auto flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary px-space-md py-space-sm rounded-lg shadow-sm font-label-md transition-all active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Create New Quotation</span>
        </button>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Field */}
        <div className="relative w-full md:w-96 flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-secondary text-[20px]">search</span>
          <input
            className="w-full h-10 pl-11 pr-4 bg-surface-container-lowest border border-surface-container-high rounded-lg text-on-surface font-body-md text-sm placeholder:text-secondary focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            placeholder="Search by customer name, quote ID, city..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1.5 text-secondary font-label-sm text-xs">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Filter:</span>
          </div>
          <select
            className="h-10 px-3 bg-surface-container-lowest border border-surface-container-high rounded-lg text-on-surface text-xs font-semibold focus:outline-none focus:border-primary-container"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="sent">Active / Sent</option>
            <option value="viewed">Customer Viewed</option>
            <option value="won">Won / Converted</option>
            <option value="pending">Pending Approval</option>
          </select>
        </div>
      </section>

      {/* Mobile Card Feed (Exact Stitch Design: 23_292ed563ed264e6fabb0adbb328d3f5f_6__My_Quotations__Mobile_.html) */}
      <div className="md:hidden flex flex-col gap-3">
        {filteredQuotes.map((q, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-high/60 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-sm font-bold text-on-surface">{q.customerName}</span>
                  <span className={`px-2 py-0.5 rounded-full font-label-xs text-[10px] flex items-center gap-1 font-semibold ${q.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${q.dotColor}`}></span>
                    {q.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-secondary font-body-sm text-xs">
                  <span className="material-symbols-outlined text-[13px]">location_on</span>
                  <span>{q.location}</span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-on-surface font-semibold">{q.id}</span>
                </div>
              </div>
              <span className="font-label-xs text-[10px] text-secondary bg-surface-container-low px-2 py-1 rounded-md shrink-0">
                {q.date.split(',')[0]}
              </span>
            </div>

            <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">solar_power</span>
                </div>
                <div>
                  <div className="font-label-sm text-xs font-semibold text-on-surface">{q.capacity} {q.moduleType}</div>
                  <div className="font-body-sm text-[11px] text-secondary">{q.type} • {q.tag}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-headline-sm text-sm font-bold text-on-surface">{q.amount}</div>
                <div className="font-label-xs text-[10px] text-primary font-semibold">Net Payable</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-0.5">
              <button
                onClick={() => handleOpenPDF(quotations[0])}
                className="h-8 px-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-variant font-label-xs text-xs font-medium flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">visibility</span>
                <span>View</span>
              </button>
              <button
                onClick={() => handleOpenPDF(quotations[0])}
                className="h-8 px-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-variant font-label-xs text-xs font-medium flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
                <span>PDF</span>
              </button>
              <button
                onClick={() => alert(`WhatsApp share link ready for ${q.customerName}`)}
                className="h-8 px-2 rounded-lg bg-primary-container text-on-primary font-label-xs text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Data Table */}
      <section className="hidden md:block w-full overflow-x-auto rounded-xl shadow-xs bg-surface-container-lowest border border-surface-container-high">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-on-secondary-fixed text-on-secondary h-12 text-label-sm font-label-sm select-none">
              <th className="py-3 px-space-md font-semibold tracking-wider">Quotation ID</th>
              <th className="py-3 px-space-md font-semibold tracking-wider">Customer &amp; Location</th>
              <th className="py-3 px-space-md font-semibold tracking-wider">Plant Specs</th>
              <th className="py-3 px-space-md font-semibold tracking-wider">Creation Date</th>
              <th className="py-3 px-space-md font-semibold tracking-wider text-right">Quoted Amount</th>
              <th className="py-3 px-space-md font-semibold tracking-wider text-center">Status</th>
              <th className="py-3 px-space-md font-semibold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-body-md divide-y divide-surface-container">
            {filteredQuotes.map((q, idx) => (
              <tr key={idx} className="bg-surface-container-lowest hover:bg-[#F0F4F2] transition-colors group">
                <td className="py-3.5 px-space-md">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">{q.id}</span>
                    <span
                      className="material-symbols-outlined text-[16px] text-secondary opacity-0 group-hover:opacity-100 cursor-pointer hover:text-primary transition-opacity"
                      title="Copy ID"
                      onClick={() => navigator.clipboard.writeText(q.id)}
                    >
                      content_copy
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-space-md">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">{q.customerName}</span>
                      <span className="font-label-xs px-1.5 py-0.2 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-semibold">{q.tag}</span>
                    </div>
                    <span className="font-body-sm text-secondary flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px] text-secondary">location_on</span>
                      {q.location}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-space-md">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">{q.icon}</span>
                    <span className="font-body-md font-semibold text-on-surface">{q.capacity}</span>
                    <span className="font-label-xs text-secondary bg-surface-container px-1.5 py-0.5 rounded text-[11px]">{q.moduleType}</span>
                  </div>
                </td>
                <td className="py-3.5 px-space-md font-body-md text-secondary whitespace-nowrap">{q.date}</td>
                <td className="py-3.5 px-space-md text-right font-headline-sm text-on-surface font-bold tabular-nums">{q.amount}</td>
                <td className="py-3.5 px-space-md text-center whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-xs ${q.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${q.dotColor}`}></span>
                    {q.status}
                  </span>
                </td>
                <td className="py-3.5 px-space-md text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      onClick={() => handleOpenPDF(quotations[0])}
                      className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container text-secondary hover:text-on-surface flex items-center justify-center transition-colors"
                      title="View Proposal"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => handleOpenPDF(quotations[0])}
                      className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container text-secondary hover:text-on-surface flex items-center justify-center transition-colors"
                      title="Download Official PDF"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                    </button>
                    <button
                      onClick={() => alert(`WhatsApp share link ready for ${q.customerName}`)}
                      className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                      title="Share via WhatsApp"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
