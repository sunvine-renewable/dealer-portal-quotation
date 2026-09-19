import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { quotationService } from '../../services/quotationService';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹ 0';
  return '₹ ' + Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

export default function CreateQuotation() {
  const { currentDealer, addQuotation, setActiveTab, setPreviewQuotation } = useApp();

  // Step 1.1 Customer Details
  const [custName, setCustName] = useState('Anand Sharma');
  const [custPhone, setCustPhone] = useState('+91 98234 56789');
  const [custLocation, setCustLocation] = useState('Pune, 411038');

  // Step 1.2 System Details
  const [systemCapacity, setSystemCapacity] = useState('5');
  const [panelBrand, setPanelBrand] = useState('Sunvine Monocrystalline Half-Cut 550W (Tier 1)');
  const [inverterModel, setInverterModel] = useState('Sunvine Solar Hybrid Inverter 5kW 3-Phase');
  const [showInverterModal, setShowInverterModal] = useState(false);
  const [showSldModal, setShowSldModal] = useState(false);

  // Step 1.3 Pricing & Subsidy
  const [ratePerKw, setRatePerKw] = useState(65000);
  const [dealerMarginRate, setDealerMarginRate] = useState(8); // 8%
  const [saveStatus, setSaveStatus] = useState('');

  // Sizing Computations
  const kw = parseFloat(systemCapacity) || 5;
  const panelWatt = panelBrand.includes('580W') ? 580 : panelBrand.includes('440W') ? 440 : 550;
  const moduleCount = Math.ceil((kw * 1000) / panelWatt);
  const rooftopAreaSqFt = Math.round(kw * 64);

  // PM Surya Ghar Central DBT Subsidy Formula
  const calculateSubsidy = (capacity) => {
    if (capacity <= 1) return 30000;
    if (capacity <= 2) return 60000;
    return 78000; // Cap at 78,000 for 3kW+
  };

  const totalCost = Math.round(kw * ratePerKw);
  const subsidy = calculateSubsidy(kw);
  const finalPayable = Math.max(0, totalCost - subsidy);
  const annualGenerationUnits = Math.round(kw * 1440);
  const annualSavings = Math.round(annualGenerationUnits * 6.67);
  const paybackYears = annualSavings > 0 ? (finalPayable / annualSavings).toFixed(1) : '3.8';
  const paybackPercent = Math.min(100, Math.round((parseFloat(paybackYears) / 10) * 100));
  const breakEvenYear = new Date().getFullYear() + Math.ceil(parseFloat(paybackYears));
  const dealerMarginINR = Math.round(totalCost * (dealerMarginRate / 100));

  const availableInverters = [
    { name: 'Sunvine Solar Hybrid Inverter 5kW 3-Phase', efficiency: '98.4%', specs: 'Built-in WiFi Smart Logger • IP65 Protection' },
    { name: 'Sunvine On-Grid String Inverter 5kW Single Phase', efficiency: '98.2%', specs: 'Dual MPPT • Zero Export Device Compatible' },
    { name: 'Sungrow SG5.0RS Residential Inverter', efficiency: '98.5%', specs: 'Ultra-silent convection cooling • 10 Yr Warranty' },
    { name: 'Solis S6 Pro Series 5kW 3-Phase Hybrid', efficiency: '98.6%', specs: 'AFCI Arc Fault Protection • Generator Sync' }
  ];

  const handleReset = () => {
    setCustName('Anand Sharma');
    setCustPhone('+91 98234 56789');
    setCustLocation('Pune, 411038');
    setSystemCapacity('5');
    setRatePerKw(65000);
    setDealerMarginRate(8);
  };

  const handleSaveDraft = async () => {
    const quotePayload = {
      id: `SV-2026-Q${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB'),
      customerName: custName,
      customerPhone: custPhone,
      city: custLocation.split(',')[0]?.trim() || 'Pune',
      state: 'Maharashtra',
      systemCapacityKW: kw,
      panelType: panelBrand,
      inverterType: inverterModel,
      baseCost: totalCost - dealerMarginINR,
      dealerMargin: dealerMarginINR,
      totalAmount: totalCost,
      subsidyAmount: subsidy,
      netPayable: finalPayable,
      status: 'Draft',
      dealerCode: currentDealer?.id || 'SV-DLR-0104',
      dealerName: currentDealer?.firmName || 'Rajesh Solar Solutions'
    };

    setSaveStatus('Saving to Supabase...');
    if (addQuotation) addQuotation(quotePayload);
    await quotationService.saveQuotation(quotePayload);
    setSaveStatus('Draft saved successfully to cloud!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handlePreview = () => {
    const quotePayload = {
      id: `SV-2026-Q${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB'),
      customerName: custName,
      customerPhone: custPhone,
      city: custLocation.split(',')[0]?.trim() || 'Pune',
      state: 'Maharashtra',
      systemCapacityKW: kw,
      solarModule: panelBrand,
      moduleCount: moduleCount,
      pvModuleSize: '4 * 8',
      inverterCapacity: `${kw} kW`,
      inverterType: inverterModel,
      inverterCount: '1 NOS',
      baseRatePerKW: ratePerKw - Math.round(ratePerKw * (dealerMarginRate / 100)),
      dealerMarginPerKW: Math.round(ratePerKw * (dealerMarginRate / 100)),
      dealerTotalMargin: dealerMarginINR,
      totalAmount: totalCost,
      subsidyAmount: subsidy,
      grandTotalCustomer: totalCost,
      netPayable: finalPayable,
      status: 'Approved',
      dealerId: currentDealer?.id || 'SV-DLR-0104'
    };

    if (addQuotation) addQuotation(quotePayload);
    if (setPreviewQuotation) setPreviewQuotation(quotePayload);
    setActiveTab('preview_quote');
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Top Navigation Bar & Progress Track (Exact Stitch Stepper) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-6">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="inline-flex items-center gap-1.5 text-secondary hover:text-on-surface font-label-sm transition-colors w-fit group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-space-sm mt-1">
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">New Quotation</h1>
            <span className="bg-surface-container-high text-secondary px-2.5 py-0.5 rounded-full font-label-xs tracking-wide uppercase">
              Ref #SV-2025-Q408
            </span>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center bg-surface-container-lowest p-2 rounded-xl shadow-sm self-start md:self-auto border border-surface-container-high">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-label-sm">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-xs font-bold">1</span>
            <span>Details &amp; Pricing</span>
            <span className="bg-primary-container/20 text-on-primary-container text-[10px] px-1.5 py-0.5 rounded font-label-xs uppercase tracking-wider font-semibold">Active</span>
          </div>
          <div className="w-8 h-0.5 bg-surface-container-high mx-1"></div>
          <button
            onClick={handlePreview}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-secondary hover:text-on-surface font-label-sm transition-colors cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-surface-container-high text-secondary flex items-center justify-center text-label-xs font-bold">2</span>
            <span>Preview &amp; Send</span>
          </button>
        </div>
      </div>

      {/* Save Notification Banner */}
      {saveStatus && (
        <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-label-sm flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Form Layout Grid (Asymmetrical Desktop Split: 7 Cols Left / 5 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Specs & Inputs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Card 1: Customer Details */}
          <section className="bg-surface-container-lowest rounded-xl p-5 md:p-6 shadow-sm border border-surface-container-high">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-high/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-secondary-fixed">Customer Details</h2>
                  <p className="font-body-sm text-body-sm text-secondary">Site contact &amp; regional grid jurisdictional data</p>
                </div>
              </div>
              <span className="font-label-xs text-secondary-fixed-dim uppercase tracking-wider font-semibold">Step 1.1</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="custName">
                  Customer Name <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px] pointer-events-none">badge</span>
                  <input
                    className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none shadow-sm border border-surface-container-high focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
                    id="custName"
                    placeholder="Enter customer's full name"
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="custPhone">
                  Mobile Number <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px] pointer-events-none">phone</span>
                  <input
                    className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none shadow-sm border border-surface-container-high focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
                    id="custPhone"
                    placeholder="+91 98234 56789"
                    type="tel"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="custLocation">
                  Installation City / Pincode <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px] pointer-events-none">location_on</span>
                  <input
                    className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none shadow-sm border border-surface-container-high focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
                    id="custLocation"
                    placeholder="e.g. Pune, 411038"
                    type="text"
                    value={custLocation}
                    onChange={(e) => setCustLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: System Details */}
          <section className="bg-surface-container-lowest rounded-xl p-5 md:p-6 shadow-sm border border-surface-container-high">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-high/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">solar_power</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-secondary-fixed">System Details</h2>
                  <p className="font-body-sm text-body-sm text-secondary">Hardware configuration, inverter tier &amp; module capacity</p>
                </div>
              </div>
              <span className="font-label-xs text-secondary-fixed-dim uppercase tracking-wider font-semibold">Step 1.2</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Capacity Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="systemCapacity">
                    System Capacity (kW)
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-[20px] pointer-events-none">solar_power</span>
                    <select
                      className="w-full h-10 pl-10 pr-9 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none shadow-sm border border-surface-container-high focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 appearance-none cursor-pointer"
                      id="systemCapacity"
                      value={systemCapacity}
                      onChange={(e) => setSystemCapacity(e.target.value)}
                    >
                      <option value="3">3 kW (On-Grid Rooftop Residential)</option>
                      <option value="5">5 kW (On-Grid Rooftop Residential)</option>
                      <option value="7">7 kW (On-Grid Rooftop Residential)</option>
                      <option value="10">10 kW (Commercial / High Load)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-[20px] pointer-events-none">arrow_drop_down</span>
                  </div>
                </div>

                {/* Panel Brand Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="panelBrand">
                    Solar Panel Brand &amp; Wattage
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px] pointer-events-none">grid_view</span>
                    <select
                      className="w-full h-10 pl-10 pr-9 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none shadow-sm border border-surface-container-high focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 appearance-none cursor-pointer"
                      id="panelBrand"
                      value={panelBrand}
                      onChange={(e) => setPanelBrand(e.target.value)}
                    >
                      <option value="Sunvine Monocrystalline Half-Cut 550W (Tier 1)">Sunvine Monocrystalline Half-Cut 550W (Tier 1)</option>
                      <option value="Sunvine TOPCon Dual-Glass Bi-Facial 580W">Sunvine TOPCon Dual-Glass Bi-Facial 580W</option>
                      <option value="Sunvine High-Density Poly 440W Standard">Sunvine High-Density Poly 440W Standard</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-[20px] pointer-events-none">arrow_drop_down</span>
                  </div>
                </div>
              </div>

              {/* Inverter Configuration Card Option */}
              <div className="flex flex-col gap-2 pt-1">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Selected Inverter Unit</label>
                <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs border border-surface-container-high">
                      <span className="material-symbols-outlined text-[22px]">developer_board</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md text-on-surface font-bold">{inverterModel}</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-on-primary-container font-label-xs font-semibold">Included</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-secondary">Efficiency 98.4% • Built-in WiFi Smart Logger • IP65 Protection</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInverterModal(true)}
                    className="text-tertiary hover:text-on-tertiary-container font-label-sm text-left md:text-right self-start md:self-auto underline-offset-4 hover:underline cursor-pointer font-semibold"
                    type="button"
                  >
                    Change Model
                  </button>
                </div>
              </div>

              {/* Visual Hardware Diagram Tile + Single Line Diagram Button */}
              <div className="mt-1 rounded-lg bg-surface border border-surface-container-high p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px]">energy_savings_leaf</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      {moduleCount}x {panelWatt}W Half-Cut Array Configured
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Requires ~{rooftopAreaSqFt} sq. ft. shadow-free rooftop area
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setShowSldModal(true)}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface hover:border-primary transition-colors font-medium shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">schema</span>
                    <span>View Single Line Diagram</span>
                  </button>
                  <span className="hidden md:inline-flex items-center gap-1 font-label-xs text-primary bg-primary-fixed/40 px-2 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>MNRE Compliant</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Context Imagery Preview */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-sm border border-surface-container-high">
            <img
              alt="A clean modern suburban house with sleek black photovoltaic solar panels neatly installed"
              className="w-full h-full object-cover"
              src="/solar_field_cover.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/25 to-transparent flex items-end p-4">
              <div className="flex items-center justify-between w-full text-white">
                <div className="flex items-center gap-2 font-label-sm">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
                  <span className="font-semibold">Standard Tier-1 Rooftop Assembly Package</span>
                </div>
                <span className="font-body-sm text-[12px] opacity-85">25 Years Performance Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Subsidy Calculator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <section className="bg-surface-container-lowest rounded-xl p-5 md:p-6 shadow-sm border border-surface-container-high flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">calculate</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-secondary-fixed">Pricing &amp; Subsidy</h2>
                  <p className="font-body-sm text-body-sm text-secondary">PM Surya Ghar DBT computation</p>
                </div>
              </div>
              <span className="font-label-xs text-secondary-fixed-dim uppercase tracking-wider font-semibold">Step 1.3</span>
            </div>

            {/* Input Field for Rate per kW */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="ratePerKw">
                  Rate per kW (₹)
                </label>
                <span className="font-label-xs text-secondary">Market Benchmark: ₹62k - ₹68k</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-secondary select-none">₹</span>
                <input
                  className="w-full h-11 pl-9 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm outline-none shadow-sm border border-surface-container-high focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-bold"
                  id="ratePerKw"
                  max="120000"
                  min="30000"
                  step="1000"
                  type="number"
                  value={ratePerKw}
                  onChange={(e) => setRatePerKw(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Highlighted Auto-Calculated Summary Box */}
            <div className="mt-1 rounded-xl bg-[#F0FDF4] p-5 shadow-xs flex flex-col gap-3.5 relative overflow-hidden border-2 border-[#6CBF3D]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-label-md font-bold">
                  <span className="material-symbols-outlined text-[20px]">auto_graph</span>
                  <span>Central DBT Subsidy Calculated</span>
                </div>
                <span className="material-symbols-outlined text-primary/25 text-[32px] absolute -top-1 -right-1 pointer-events-none">payments</span>
              </div>

              {/* Line 1: Total Project Cost */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary font-medium">Total Project Cost</span>
                  <span className="font-body-sm text-[11px] text-secondary/70">
                    {kw} kW × {formatINR(ratePerKw)}
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-secondary-fixed font-bold tabular-nums">
                  {formatINR(totalCost)}
                </span>
              </div>

              {/* Line 2: Government Subsidy */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Government Subsidy</span>
                    <span className="bg-primary-container/20 text-on-primary-container text-[10px] px-1.5 py-0.2 rounded font-label-xs font-semibold">
                      Automatic Central Subsidy
                    </span>
                  </div>
                  <span className="font-body-sm text-[11px] text-secondary">PM Surya Ghar: Muft Bijli Yojana</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold tabular-nums">
                  - {formatINR(subsidy)}
                </span>
              </div>

              {/* Line 3: Estimated Annual Savings */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary font-medium">Estimated Annual Savings</span>
                  <span className="font-body-sm text-[11px] text-secondary">approx. {annualGenerationUnits.toLocaleString()} units / year generated</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-bold tabular-nums">
                  {formatINR(annualSavings)} <span className="font-body-sm text-secondary font-normal">/ yr</span>
                </span>
              </div>

              <div className="w-full h-px bg-primary/20 my-0.5"></div>

              {/* Line 4: Final Customer Payable */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-secondary-fixed uppercase tracking-wider font-bold">
                    Final Customer Payable
                  </span>
                  <span className="font-body-sm text-[11px] text-secondary">Net cost post-DBT reimbursement</span>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="font-headline-xl text-headline-xl text-on-secondary-fixed font-bold tabular-nums">
                    {formatINR(finalPayable)}
                  </span>
                  <span className="bg-primary text-on-primary text-label-xs px-2 py-0.5 rounded-full shadow-xs font-bold">Net</span>
                </div>
              </div>
            </div>

            {/* ROI & Payback Micro-Telemetry Graphic */}
            <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-3 border border-surface-container-high">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-secondary font-medium">Estimated Payback Period</span>
                <span className="font-label-md text-on-surface font-bold">{paybackYears} Years</span>
              </div>
              <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-primary-container h-full rounded-full transition-all duration-300" style={{ width: `${paybackPercent}%` }}></div>
              </div>
              <div className="flex items-center justify-between text-label-xs text-secondary">
                <span>ROI Break-even: {breakEvenYear}</span>
                <span>{25 - Math.ceil(parseFloat(paybackYears))}+ Years of Free Power Remaining</span>
              </div>
            </div>

            {/* Interactive Dealer Commercials (Customizable Margin) */}
            <div className="p-4 bg-surface rounded-xl border border-surface-container-high flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
                  <span className="font-label-sm text-sm text-on-surface font-bold">Custom Dealer Margin</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold" id="dealerMarginDisplay">
                  {formatINR(dealerMarginINR)}
                </span>
              </div>

              {/* Preset Chips & Custom Input */}
              <div className="flex flex-wrap items-center gap-2">
                {[5, 8, 10, 12, 15].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDealerMarginRate(pct)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      dealerMarginRate === pct
                        ? 'bg-primary-container text-on-primary shadow-xs'
                        : 'bg-surface-container-lowest border border-surface-container-high text-secondary hover:text-on-surface'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}

                {/* Custom Input */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-xs text-secondary font-medium">Custom:</span>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="35"
                      step="0.5"
                      value={dealerMarginRate}
                      onChange={(e) => setDealerMarginRate(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-16 h-8 text-center text-xs font-bold rounded-lg border border-surface-container-high bg-surface-container-lowest focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none"
                    />
                    <span className="absolute right-2 text-xs text-secondary font-bold pointer-events-none">%</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-secondary flex items-center justify-between pt-2 border-t border-surface-container-high">
                <span>
                  Spread: <strong>{formatINR(Math.round(dealerMarginINR / kw))} / kW</strong>
                </span>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-[10px] bg-primary/10 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[12px]">lock</span>
                  <span>Confidential (Hidden from Customer PDF)</span>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 h-20 bg-surface-container-lowest border-t border-surface-container-high shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-40 flex items-center justify-between px-4 md:px-8">
        <button
          onClick={handleReset}
          className="h-10 px-4 rounded-lg bg-surface-container-lowest text-on-secondary-fixed hover:bg-surface-container-low font-label-md transition-colors flex items-center gap-2 border border-surface-container-high shadow-xs cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Reset Form</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="h-10 px-4 md:px-5 rounded-lg bg-surface-container-lowest text-on-secondary-fixed hover:bg-surface-container-low font-label-md transition-colors border border-surface-container-high shadow-xs cursor-pointer"
            type="button"
          >
            Save Draft
          </button>
          <button
            onClick={handlePreview}
            className="h-10 px-5 md:px-6 rounded-lg bg-[#6CBF3D] hover:bg-[#4F9A2C] active:scale-[0.99] text-on-primary font-label-md transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer font-semibold"
            type="button"
          >
            <span>Preview Quotation</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Single Line Diagram (SLD) Interactive Modal */}
      {showSldModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-surface-container-high animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-2xl">schema</span>
                <h3 className="font-headline-sm text-lg text-on-surface">Electrical Single Line Diagram (SLD)</h3>
              </div>
              <button
                onClick={() => setShowSldModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-secondary"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="py-6 flex flex-col items-center">
              {/* Interactive Vector SLD Flowchart */}
              <div className="w-full bg-surface-container-low p-4 rounded-xl border border-surface-container-high flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-center">
                  <div className="p-2.5 rounded-lg bg-white border border-primary text-primary shadow-xs">
                    <span className="block text-sm font-bold">{kw} kW Array</span>
                    <span className="text-[10px] text-secondary">{moduleCount}x {panelWatt}W Panels</span>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
                  <div className="p-2.5 rounded-lg bg-white border border-secondary text-on-surface shadow-xs">
                    <span className="block text-sm font-bold">DC Isolator</span>
                    <span className="text-[10px] text-secondary">600V DC SPD</span>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
                  <div className="p-2.5 rounded-lg bg-[#6CBF3D]/10 border border-[#6CBF3D] text-[#1c4900] shadow-xs">
                    <span className="block text-sm font-bold">Inverter</span>
                    <span className="text-[10px] text-secondary">{kw}kW 3-Phase</span>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
                  <div className="p-2.5 rounded-lg bg-white border border-secondary text-on-surface shadow-xs">
                    <span className="block text-sm font-bold">Net Meter</span>
                    <span className="text-[10px] text-secondary">Bi-directional</span>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
                  <div className="p-2.5 rounded-lg bg-white border border-primary text-primary shadow-xs">
                    <span className="block text-sm font-bold">DISCOM Grid</span>
                    <span className="text-[10px] text-secondary">415V 50Hz</span>
                  </div>
                </div>

                <div className="w-full pt-3 border-t border-surface-container-high grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-2 rounded border border-surface-container-high">
                    <span className="text-[10px] text-secondary block">Array DC Voltage</span>
                    <span className="font-bold text-on-surface">480V Voc</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-surface-container-high">
                    <span className="text-[10px] text-secondary block">Inverter Protection</span>
                    <span className="font-bold text-on-surface">IP65 Waterproof</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-surface-container-high">
                    <span className="text-[10px] text-secondary block">AC Grid Output</span>
                    <span className="font-bold text-on-surface">415V / 3-Phase</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-surface-container-high">
                    <span className="text-[10px] text-secondary block">Earthing Chemical</span>
                    <span className="font-bold text-on-surface">3 Dedicated Pits</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowSldModal(false)}
                className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:bg-[#4F9A2C] transition-colors"
              >
                Close Diagram
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inverter Selection Modal */}
      {showInverterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">Select Inverter Model</h3>
              <button
                onClick={() => setShowInverterModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-secondary"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3">
              {availableInverters.map((inv, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setInverterModel(inv.name);
                    setShowInverterModal(false);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    inverterModel === inv.name
                      ? 'border-primary-container bg-primary/5 ring-1 ring-primary-container'
                      : 'border-surface-container-high hover:border-primary/50'
                  }`}
                >
                  <div>
                    <h4 className="font-label-md text-sm font-bold text-on-surface">{inv.name}</h4>
                    <p className="text-xs text-secondary mt-0.5">{inv.specs}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface-container text-primary">
                    {inv.efficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
