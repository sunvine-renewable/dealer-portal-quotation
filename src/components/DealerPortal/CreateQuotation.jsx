import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹ 0';
  return '₹ ' + new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(val);
};

export default function CreateQuotation() {
  const {
    currentDealer,
    addQuotation,
    setActiveTab,
    setPreviewQuotation
  } = useApp();

  // Customer Details
  const [customerName, setCustomerName] = useState('Mirana Technocast Pvt. Ltd.');
  const [customerPhone, setCustomerPhone] = useState('+91 98250 12345');
  const [customerEmail, setCustomerEmail] = useState('procurement@miranacast.com');
  const [siteAddress, setSiteAddress] = useState('Plot 42, GIDC Metoda, Kalawad Road, Rajkot - 360021');
  const [discom, setDiscom] = useState('PGVCL (Paschim Gujarat Vij Company Ltd)');
  const [connectionType, setConnectionType] = useState('Commercial & Industrial Rooftop (3-Phase HT / LT)');

  // Plant Sizing
  const [sanctionedLoad, setSanctionedLoad] = useState(300.00);
  const [capacityKW, setCapacityKW] = useState(280.20);
  const [moduleCount, setModuleCount] = useState(467);
  const [moduleType, setModuleType] = useState('600 WP TOPCon Mono PERC Bifacial (Sunvine Premier Series)');
  const [inverterCount, setInverterCount] = useState('2 NOS');
  const [inverterType, setInverterType] = useState('125 kW String 3-Phase Grid-Tied (Solaryaan / Solis Cloud IoT)');

  // Dealer Margin
  const [marginMode, setMarginMode] = useState('per_kw'); // 'per_kw' | 'flat'
  const [marginPerKw, setMarginPerKw] = useState(2000);
  const [marginFlat, setMarginFlat] = useState(560400);

  // Financial calculations
  const baseRatePerKW = 24000;
  const baseTotal = Math.round(baseRatePerKW * capacityKW);
  const dealerProfit = marginMode === 'per_kw' ? Math.round(marginPerKw * capacityKW) : Number(marginFlat);
  const effectiveMarginPerKw = marginMode === 'per_kw' ? Number(marginPerKw) : Math.round(dealerProfit / capacityKW);
  const customerRatePerKW = baseRatePerKW + effectiveMarginPerKw;
  const grandTotalCustomer = Math.round(customerRatePerKW * capacityKW);
  const marginPercent = customerRatePerKW > 0 ? ((effectiveMarginPerKw / customerRatePerKW) * 100).toFixed(2) : '0.00';

  // Savings & Payback
  const annualGenerationKWh = Math.round(capacityKW * 1460); // approx 1460 units/kW/yr
  const annualSavingsINR = Math.round(annualGenerationKWh * 8.0); // @ 8/kWh
  const simplePaybackYears = annualSavingsINR > 0 ? (grandTotalCustomer / annualSavingsINR).toFixed(1) : '2.2';

  const handleGeneratePDF = () => {
    const newQuote = {
      id: `SV-2026-Q${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB'),
      customerName,
      customerPhone,
      customerEmail,
      siteAddress,
      discom,
      connectionType,
      systemCapacityKW: capacityKW,
      solarModule: moduleType,
      moduleCount,
      pvModuleSize: '4 * 8',
      inverterCapacity: '125 KW',
      inverterCount,
      baseRatePerKW,
      dealerMarginPerKW: effectiveMarginPerKw,
      dealerTotalMargin: dealerProfit,
      discomMeterCharge: 'Extra as actual if more from PGVCL',
      gedaRegistrationCharge: 'Including',
      meterTestingCharge: 'CUSTOMER SCOPE',
      gstPercentage: 8.9,
      grandTotalCustomer,
      dealerId: currentDealer.id
    };

    if (addQuotation) addQuotation(newQuote);
    if (setPreviewQuotation) setPreviewQuotation(newQuote);
    setActiveTab('preview_quote');
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Subheader: Page Title & Stepper Progress Bar */}
      <section className="px-space-md pt-4 pb-4 bg-surface-container-lowest border-b border-surface-container-high/70 rounded-t-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight">Create Customer Quotation</h1>
              <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/40 font-mono">Ref: #SV-2025-Q409</span>
            </div>
            <p className="text-secondary font-body-md text-body-md mt-1">Configure technical equipment, customer tariff profile, and set authorized dealer margin.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Template loaded: Mirana Technocast 280.20 kW')}
              className="h-9 px-3.5 rounded-lg border border-on-surface text-on-surface font-label-md text-label-md hover:bg-surface-container-low flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>Load Template</span>
            </button>
            <button
              className="h-9 px-3.5 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-dim flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Filter View</span>
            </button>
          </div>
        </div>

        {/* 4-Step Horizontal Stepper */}
        <div className="mt-6 pt-4 border-t border-surface-container-high grid grid-cols-4 gap-4">
          {/* Step 1: Customer Info (Completed) */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div>
              <p className="font-label-xs text-label-xs text-primary uppercase font-bold">Step 1</p>
              <p className="font-label-md text-label-md text-on-surface font-semibold">Customer Info</p>
            </div>
            <div className="hidden sm:block flex-1 h-0.5 bg-primary ml-2"></div>
          </div>

          {/* Step 2: System Specs (Completed) */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div>
              <p className="font-label-xs text-label-xs text-primary uppercase font-bold">Step 2</p>
              <p className="font-label-md text-label-md text-on-surface font-semibold">System Specs</p>
            </div>
            <div className="hidden sm:block flex-1 h-0.5 bg-primary ml-2"></div>
          </div>

          {/* Step 3: Pricing & Margin (Active) */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-sm font-bold ring-4 ring-primary-container/20">
              3
            </div>
            <div>
              <p className="font-label-xs text-label-xs text-primary-container uppercase font-bold">Active Step</p>
              <p className="font-label-md text-label-md text-on-surface font-bold">Pricing &amp; Margin</p>
            </div>
            <div className="hidden sm:block flex-1 h-0.5 bg-surface-variant ml-2"></div>
          </div>

          {/* Step 4: Preview (Pending) */}
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-8 h-8 rounded-full bg-surface-variant text-secondary flex items-center justify-center text-sm font-bold">
              4
            </div>
            <div>
              <p className="font-label-xs text-label-xs text-secondary uppercase font-semibold">Step 4</p>
              <p className="font-label-md text-label-md text-secondary font-medium">Final Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Operational 2-Column Workstation Grid */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* ======================= LEFT COLUMN: Forms & Specs (7 cols) ======================= */}
        <div className="col-span-12 xl:col-span-7 space-y-6">
          {/* Card 1: Customer Details Form Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined text-[20px]">business</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Step 1: Customer &amp; Site Details</h2>
                  <p className="font-body-sm text-body-sm text-secondary">Verified Commercial &amp; Industrial connection credentials</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-xs text-label-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">verified</span> Auto-Verified
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div className="md:col-span-2">
                <label className="block font-label-sm text-label-sm text-secondary mb-1.5">Customer / Entity Full Name</label>
                <div className="relative">
                  <input
                    className="w-full h-10 px-3.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-on-surface font-body-md focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-primary text-[20px]">check_circle</span>
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="block font-label-sm text-label-sm text-secondary mb-1.5">Authorized Contact Phone</label>
                <input
                  className="w-full h-10 px-3.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-on-surface font-body-md focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all"
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
              {/* Email */}
              <div>
                <label className="block font-label-sm text-label-sm text-secondary mb-1.5">Procurement Email Address</label>
                <input
                  className="w-full h-10 px-3.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-on-surface font-body-md focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              {/* Site Address */}
              <div className="md:col-span-2">
                <label className="block font-label-sm text-label-sm text-secondary mb-1.5">Project Site Physical Installation Address</label>
                <input
                  className="w-full h-10 px-3.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-on-surface font-body-md focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all"
                  type="text"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                />
              </div>
              {/* DISCOM */}
              <div>
                <label className="block font-label-sm text-label-sm text-secondary mb-1.5">Electricity Distribution Utility (DISCOM)</label>
                <div className="relative">
                  <select
                    className="w-full h-10 pl-3.5 pr-8 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-on-surface font-body-md focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none appearance-none"
                    value={discom}
                    onChange={(e) => setDiscom(e.target.value)}
                  >
                    <option>PGVCL (Paschim Gujarat Vij Company Ltd)</option>
                    <option>UGVCL (Uttar Gujarat)</option>
                    <option>MGVCL (Madhya Gujarat)</option>
                    <option>Torrent Power Ahmedabad/Surat</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-secondary pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
              {/* Connection Type */}
              <div>
                <label className="block font-label-sm text-label-sm text-secondary mb-1.5">Sanctioned Tariff / Connection Type</label>
                <div className="relative">
                  <select
                    className="w-full h-10 pl-3.5 pr-8 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-on-surface font-body-md focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none appearance-none"
                    value={connectionType}
                    onChange={(e) => setConnectionType(e.target.value)}
                  >
                    <option>Commercial &amp; Industrial Rooftop (3-Phase HT / LT)</option>
                    <option>Residential Society Group Net Metering</option>
                    <option>Institutional / Educational Net Metering</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-secondary pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: System Sizing & Hardware Selection Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Step 2: System Sizing &amp; Hardware Selection</h2>
                  <p className="font-body-sm text-body-sm text-secondary">Tier-1 certified bill of materials and grid synchronization setup</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-secondary-container font-label-xs text-label-xs font-semibold">Tier-1 EPC Spec</span>
            </div>

            {/* Capacity Badges Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-surface-container-low/60 border border-surface-container-high mb-5">
              <div className="border-r border-surface-container-high pr-4">
                <p className="font-label-xs text-label-xs text-secondary uppercase font-semibold">Sanctioned Grid Load</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <input
                    type="number"
                    value={sanctionedLoad}
                    onChange={(e) => setSanctionedLoad(Number(e.target.value))}
                    className="w-24 font-headline-lg text-headline-lg font-bold text-on-surface bg-transparent border-b border-gray-300 focus:outline-none"
                  />
                  <span className="font-label-md text-label-md text-secondary">kW Sanctioned</span>
                </div>
                <p className="font-body-sm text-body-sm text-outline mt-0.5">Transformer ratio verified at 11 kV HT bay</p>
              </div>
              <div className="pl-2">
                <p className="font-label-xs text-label-xs text-primary uppercase font-bold">Configured Solar Plant Capacity</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <input
                    type="number"
                    step="0.1"
                    value={capacityKW}
                    onChange={(e) => setCapacityKW(Number(e.target.value))}
                    className="w-28 font-headline-lg text-headline-lg font-bold text-primary bg-transparent border-b border-primary focus:outline-none"
                  />
                  <span className="font-label-md text-label-md text-primary font-semibold">kWp DC Array</span>
                </div>
                <div className="flex items-center gap-1 text-primary font-label-xs text-label-xs mt-0.5">
                  <span className="material-symbols-outlined text-[15px]">speed</span>
                  <span>Optimal {sanctionedLoad > 0 ? ((capacityKW / sanctionedLoad) * 100).toFixed(1) : 93.4}% loading ratio</span>
                </div>
              </div>
            </div>

            {/* Hardware List */}
            <div className="space-y-4">
              {/* Module Selection */}
              <div className="p-3.5 rounded-lg border border-surface-container-high bg-surface-container-lowest hover:border-outline-variant transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">solar_power</span>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface font-semibold">Solar Photovoltaic Modules</label>
                      <p className="font-body-md text-body-md text-on-surface mt-0.5 font-medium">{moduleType}</p>
                      <p className="font-body-sm text-body-sm text-secondary mt-0.5">25-Year Linear Power Warranty • 16-BB Half-Cut N-Type Cells</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded bg-surface-container font-mono font-bold text-on-surface text-label-sm">{moduleCount} Units</span>
                    <p className="font-label-xs text-label-xs text-secondary mt-1">{capacityKW} kWp DC</p>
                  </div>
                </div>
              </div>

              {/* Inverter Selection */}
              <div className="p-3.5 rounded-lg border border-surface-container-high bg-surface-container-lowest hover:border-outline-variant transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">bolt</span>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface font-semibold">Grid-Tied String Inverters</label>
                      <p className="font-body-md text-body-md text-on-surface mt-0.5 font-medium">{inverterType}</p>
                      <p className="font-body-sm text-body-sm text-secondary mt-0.5">Dual MPPT • Built-in DC Switch &amp; Type II AC/DC Surge Arresters</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded bg-surface-container font-mono font-bold text-on-surface text-label-sm">{inverterCount}</span>
                    <p className="font-label-xs text-label-xs text-secondary mt-1">250 kW AC Output</p>
                  </div>
                </div>
              </div>

              {/* Mounting Structure */}
              <div className="p-3.5 rounded-lg border border-surface-container-high bg-surface-container-lowest hover:border-outline-variant transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">grid_view</span>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface font-semibold">Mounting Superstructure</label>
                      <p className="font-body-md text-body-md text-on-surface mt-0.5 font-medium">Hot Dip Galvanized 2mm HDG Structure (150 km/h wind tested, 10 Yrs Warranty)</p>
                      <p className="font-body-sm text-body-sm text-secondary mt-0.5">80 Micron HDG Coating • Custom Purlin Rails for GI Industrial Shed Roof</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded bg-surface-container font-mono font-bold text-on-surface text-label-sm">1 Set</span>
                    <p className="font-label-xs text-label-xs text-secondary mt-1">Wind Zone III</p>
                  </div>
                </div>
              </div>

              {/* Balance of System (BOS) */}
              <div className="p-3.5 rounded-lg border border-surface-container-high bg-surface-container-lowest hover:border-outline-variant transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">cable</span>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface font-semibold">Electrical Balance of System (BOS)</label>
                      <p className="font-body-md text-body-md text-on-surface mt-0.5 font-medium">Polycab 4-Core XLPE + Hensel IP65 ACDB/DCDB + Type II SPD</p>
                      <p className="font-body-sm text-body-sm text-secondary mt-0.5">Copper Bonded Chemical Earthing (4 Pits) • Dedicated Lightning Arrester</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded bg-surface-container font-mono font-bold text-on-surface text-label-sm">Turnkey</span>
                    <p className="font-label-xs text-label-xs text-secondary mt-1">CE &amp; CEA Compliant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Engineering Cert Footnote */}
            <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between text-secondary font-label-xs text-label-xs">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">gavel</span>
                Structural stability certified according to IS 875 (Part 3)
              </span>
              <a className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer" onClick={() => alert('Single Line Diagram (SLD) CAD preview generated.')}>
                <span>View Single Line Diagram (SLD)</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        {/* ======================= RIGHT COLUMN: Dealer Margin & Financials (5 cols) ======================= */}
        <div className="col-span-12 xl:col-span-5 space-y-6">
          {/* STEP 3: DEDICATED PROMINENT DEALER MARGIN & PRICING BOX */}
          <div className="bg-surface-container-lowest rounded-xl border-2 border-primary shadow-lg overflow-hidden relative">
            {/* Confidential Gold / Green Banner */}
            <div className="bg-gradient-to-r from-[#0F1B2E] via-[#1a2e4c] to-[#0F1B2E] text-surface-container-lowest px-5 py-3 border-b border-primary-container/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                    <span className="material-symbols-outlined text-[15px]">lock</span>
                  </div>
                  <span className="font-label-sm text-label-sm tracking-wider uppercase font-bold text-primary-fixed">Confidential Dealer Commercials</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-amber-400/20 text-amber-300 border border-amber-300/40">Hidden From Client PDF</span>
              </div>
              <p className="font-body-sm text-body-sm text-surface-variant/80 mt-1.5 leading-snug">
                🔒 Strictly internal to <strong className="text-surface-container-lowest">{currentDealer.firmName || 'Rajesh Solar'}</strong>. Customer quote PDF will only display the consolidated turnkey rate ({formatINR(customerRatePerKW)} / kW), keeping your margin 100% private.
              </p>
            </div>

            <div className="p-5 space-y-5 bg-gradient-to-b from-surface-container-lowest to-surface-container-low/40">
              {/* Margin Mode Toggle */}
              <div className="flex items-center justify-between bg-surface-container-high/60 p-1 rounded-lg border border-surface-container-highest">
                <button
                  onClick={() => setMarginMode('per_kw')}
                  className={`flex-1 py-1.5 rounded-md font-label-sm text-label-sm transition-all flex items-center justify-center gap-1.5 ${
                    marginMode === 'per_kw'
                      ? 'text-on-surface bg-surface-container-lowest shadow-sm font-bold'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
                  <span>Per kW Rate (₹/kW)</span>
                </button>
                <button
                  onClick={() => setMarginMode('flat')}
                  className={`flex-1 py-1.5 rounded-md font-label-sm text-label-sm transition-all flex items-center justify-center gap-1.5 ${
                    marginMode === 'flat'
                      ? 'text-on-surface bg-surface-container-lowest shadow-sm font-bold'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">payments</span>
                  <span>Flat Lump-Sum (₹)</span>
                </button>
              </div>

              {/* Metric 1: Base Turnkey EPC Cost (Sunvine) */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-surface-container-highest">
                <div>
                  <span className="font-label-xs text-label-xs uppercase font-bold text-secondary tracking-wider">Base Turnkey EPC Cost (Sunvine)</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">{formatINR(baseRatePerKW)}</span>
                    <span className="font-label-xs text-label-xs text-secondary">/ kW</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-xs text-label-xs text-secondary block font-medium">EPC Base Total</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface font-mono">{formatINR(baseTotal)}</span>
                </div>
              </div>

              {/* Metric 2: Interactive Margin Configuration */}
              <div className="p-4 rounded-xl bg-primary-container/10 border border-primary-container/40 relative">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1.5">
                    <span>Dealer Profit Margin Addition</span>
                    <span className="material-symbols-outlined text-[16px] text-primary" title="Your direct commission per kilowatt">info</span>
                  </label>
                  <span className="font-label-xs text-label-xs text-primary font-bold px-2 py-0.5 rounded bg-primary-container/20">Targeted Spread: +{marginPercent}%</span>
                </div>

                {marginMode === 'per_kw' ? (
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface font-bold text-headline-sm">₹</span>
                    <input
                      className="w-full h-12 pl-8 pr-28 text-headline-md font-headline-md font-bold text-on-surface bg-surface-container-lowest border-2 border-primary-container rounded-lg focus:ring-4 focus:ring-primary-container/20 outline-none"
                      id="dealer-margin-input"
                      type="number"
                      value={marginPerKw}
                      onChange={(e) => setMarginPerKw(Number(e.target.value))}
                    />
                    <span className="absolute right-3.5 text-secondary font-label-md font-semibold pointer-events-none">/ kW Added</span>
                  </div>
                ) : (
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface font-bold text-headline-sm">₹</span>
                    <input
                      className="w-full h-12 pl-8 pr-24 text-headline-md font-headline-md font-bold text-on-surface bg-surface-container-lowest border-2 border-primary-container rounded-lg focus:ring-4 focus:ring-primary-container/20 outline-none"
                      type="number"
                      value={marginFlat}
                      onChange={(e) => setMarginFlat(Number(e.target.value))}
                    />
                    <span className="absolute right-3.5 text-secondary font-label-md font-semibold pointer-events-none">Flat Total</span>
                  </div>
                )}

                {/* Range Quick Increments */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="font-label-xs text-label-xs text-secondary font-medium">Quick Set:</span>
                  {[1500, 2000, 2500, 3000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setMarginMode('per_kw');
                        setMarginPerKw(amt);
                      }}
                      className={`px-2 py-1 text-xs rounded font-semibold transition-all ${
                        marginMode === 'per_kw' && marginPerKw === amt
                          ? 'bg-primary text-on-primary font-bold border border-primary'
                          : 'bg-surface-container-lowest border border-outline-variant/60 hover:border-primary text-on-surface'
                      }`}
                    >
                      ₹ {amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric 3: Highlighted Dealer Profit Pill / Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0F1B2E] to-[#1c304d] text-surface-container-lowest border border-surface-container-highest shadow-md">
                <div className="flex items-center justify-between text-surface-variant/80 font-label-xs text-label-xs uppercase font-semibold tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary-fixed">monetization_on</span>
                    Your Net Margin / Commission
                  </span>
                  <span className="text-primary-fixed font-bold">{capacityKW} kW × {formatINR(effectiveMarginPerKw)}</span>
                </div>
                <div className="flex items-baseline justify-between mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-xl text-headline-xl font-bold tracking-tight text-primary-fixed">{formatINR(dealerProfit)}</span>
                    <span className="font-label-xs text-label-xs text-surface-variant/90 font-medium">Total Profit</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold shadow">
                    {marginPercent}% Margin
                  </div>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-surface-container-highest/20 flex items-center justify-between text-[11px] text-surface-variant/70">
                  <span>Disbursed within 48h of Net-Meter synchronization</span>
                  <span className="text-primary-fixed font-semibold">TDS 5% applicable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Customer Financial Summary Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">description</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Customer Commercial Proposal Summary</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-label-xs font-semibold bg-surface-container text-secondary">Client Facing</span>
            </div>

            {/* Key Financial Breakdown Table */}
            <div className="space-y-3 font-body-md text-body-md">
              <div className="flex items-center justify-between py-1.5 border-b border-surface-container-high">
                <span className="text-secondary font-medium">Consolidated Turnkey Rate</span>
                <span className="font-semibold text-on-surface">{formatINR(customerRatePerKW)} / kW</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-surface-container-high">
                <div>
                  <span className="text-on-surface font-semibold">Gross Project Value</span>
                  <p className="font-label-xs text-label-xs text-secondary">({capacityKW} kW × {formatINR(customerRatePerKW)})</p>
                </div>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface font-mono">{formatINR(grandTotalCustomer)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-surface-container-high">
                <span className="text-secondary font-medium">Central Govt. Subsidy</span>
                <span className="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded">₹ 0 (C&amp;I Not Eligible for DBT)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-surface-container-high">
                <div>
                  <span className="text-on-surface font-medium">Accelerated Depreciation (40% 1st Yr)</span>
                  <p className="font-label-xs text-label-xs text-primary font-semibold">Corporate Tax Deduction Benefit</p>
                </div>
                <span className="font-semibold text-primary font-mono">Tax Shield ~₹ {((grandTotalCustomer * 0.40 * 0.30) / 100000).toFixed(2)} L</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-surface-container-high">
                <div>
                  <span className="text-secondary font-medium">Est. Annual Generation</span>
                  <p className="font-label-xs text-label-xs text-secondary">@ ₹8.00 / kWh industrial tariff</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-on-surface">{annualGenerationKWh.toLocaleString('en-IN')} kWh / Yr</span>
                  <p className="font-label-xs text-label-xs text-primary font-bold">{formatINR(annualSavingsINR)} Savings / Yr</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-surface-container-high">
                <span className="text-secondary font-medium">Simple Payback Horizon</span>
                <span className="font-headline-sm text-headline-sm font-bold text-primary">~ {simplePaybackYears} Years</span>
              </div>
            </div>

            {/* Net Payable Highlight */}
            <div className="mt-5 p-4 rounded-xl bg-surface-container-low border border-surface-container-highest flex items-center justify-between">
              <div>
                <p className="font-label-xs text-label-xs text-secondary uppercase font-bold tracking-wider">Final Net Payable By Customer</p>
                <p className="font-headline-xl text-headline-xl font-bold text-on-surface font-mono tracking-tight mt-0.5">{formatINR(grandTotalCustomer)}</p>
                <p className="font-label-xs text-label-xs text-secondary mt-0.5">Includes standard 5-year O&amp;M warranty and insurance</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-primary font-label-md font-bold">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Validated
                </span>
                <p className="font-label-xs text-label-xs text-secondary">Excl. 13.8% GST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Sticky Action Bar */}
      <footer className="fixed bottom-0 right-0 left-0 md:left-64 h-20 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container-high px-8 flex items-center justify-between z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        {/* Left Utility Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCustomerName('');
              setCustomerPhone('');
              setCustomerEmail('');
              setSiteAddress('');
            }}
            className="h-10 px-4 rounded-lg border border-surface-container-highest text-secondary hover:text-error hover:bg-error-container/20 font-label-md text-label-md transition-colors flex items-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset Form</span>
          </button>
          <button
            onClick={() => alert('Quotation saved to Drafts.')}
            className="h-10 px-4 rounded-lg border border-on-surface text-on-surface hover:bg-surface-container-low font-label-md text-label-md transition-colors flex items-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save as Draft</span>
          </button>
        </div>

        {/* Right Output Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting Costing Worksheet as Excel (.xlsx)...')}
            className="hidden sm:flex h-10 px-4 rounded-lg bg-surface-container border border-surface-container-highest text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors items-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">table_view</span>
            <span>Download Costing Worksheet (Excel)</span>
          </button>
          {/* Primary Large Green PDF Button */}
          <button
            onClick={handleGeneratePDF}
            className="h-11 px-6 rounded-lg bg-primary-container text-surface-container-lowest hover:bg-primary font-label-md text-label-md font-bold tracking-wide flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-98"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
            <span>Generate Official 4-Page Quotation PDF</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
