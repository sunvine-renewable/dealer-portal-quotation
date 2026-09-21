import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { quotationService } from '../../services/quotationService';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹\u00A00';
  return '₹\u00A0' + Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

export default function CreateQuotation() {
  const { 
    currentDealer, 
    addQuotation, 
    updateQuotation, 
    editingQuotation, 
    clearEditingQuotation, 
    setActiveTab, 
    setPreviewQuotation,
    addNotification
  } = useApp();

  // Step 1.1 Customer Details (Empty by default for dealer input)
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custLocation, setCustLocation] = useState('');

  // Step 1.2 System Details
  const [systemCapacity, setSystemCapacity] = useState('5');
  const [panelBrand, setPanelBrand] = useState('Sunvine Monocrystalline Half-Cut 550W (Tier 1)');
  const [inverterModel, setInverterModel] = useState('Sunvine Solar Hybrid Inverter 5kW 3-Phase');
  const [showInverterModal, setShowInverterModal] = useState(false);

  // Step 1.3 Pricing & Subsidy
  const [ratePerKw, setRatePerKw] = useState(65000);
  const [marginMode, setMarginMode] = useState('percent'); // 'percent' | 'amount'
  const [dealerMarginRate, setDealerMarginRate] = useState(8); // 8%
  const [dealerMarginFixed, setDealerMarginFixed] = useState(25000); // ₹ 25,000
  const [saveStatus, setSaveStatus] = useState('');

  // Auto-populate when editing an existing quote
  useEffect(() => {
    if (editingQuotation) {
      if (editingQuotation.customerName) setCustName(editingQuotation.customerName);
      if (editingQuotation.customerPhone) setCustPhone(editingQuotation.customerPhone);
      if (editingQuotation.location || editingQuotation.city) {
        setCustLocation(editingQuotation.location || `${editingQuotation.city || 'Pune'}, Maharashtra`);
      }
      const rawKw = parseFloat(editingQuotation.systemCapacityKW || editingQuotation.capacity || 5);
      if (!isNaN(rawKw)) setSystemCapacity(String(rawKw));
      if (editingQuotation.solarModule || editingQuotation.panelType) {
        setPanelBrand(editingQuotation.solarModule || editingQuotation.panelType);
      }
      if (editingQuotation.inverterType) {
        setInverterModel(editingQuotation.inverterType);
      }
      if (editingQuotation.baseRatePerKW) {
        setRatePerKw(Number(editingQuotation.baseRatePerKW));
      }
      if (editingQuotation.dealerTotalMargin) {
        setMarginMode('amount');
        setDealerMarginFixed(Number(editingQuotation.dealerTotalMargin));
      } else if (editingQuotation.dealerMarginPerKW && rawKw > 0) {
        setMarginMode('amount');
        setDealerMarginFixed(Number(editingQuotation.dealerMarginPerKW) * rawKw);
      }
    }
  }, [editingQuotation]);

  // Sizing Computations
  const kw = parseFloat(systemCapacity) || 5;
  const panelWatt = panelBrand.includes('580W') ? 580 : panelBrand.includes('440W') ? 440 : 550;
  const moduleCount = Math.ceil((kw * 1000) / panelWatt);
  const rooftopAreaSqFt = Math.round(kw * 64);

  // Base EPC & Hardware Project Cost
  const baseProjectCost = Math.round(kw * ratePerKw);

  // Dealer margin computation (dual mode: % or fixed ₹ amount)
  const dealerMarginINR = marginMode === 'percent'
    ? Math.round(baseProjectCost * (dealerMarginRate / 100))
    : Math.round(dealerMarginFixed);

  // Effective margin percentage
  const effectiveMarginPercent = baseProjectCost > 0
    ? ((dealerMarginINR / baseProjectCost) * 100).toFixed(1)
    : '0.0';

  // Total Customer Quoted Project Cost (Base Cost + Dealer Margin)
  const totalCost = baseProjectCost + dealerMarginINR;

  // PM Surya Ghar Central DBT Subsidy Formula
  const calculateSubsidy = (capacity) => {
    if (capacity <= 1) return 30000;
    if (capacity <= 2) return 60000;
    return 78000; // Cap at 78,000 for 3kW+
  };

  const subsidy = calculateSubsidy(kw);
  const finalPayable = Math.max(0, totalCost - subsidy);
  const annualGenerationUnits = Math.round(kw * 1440);
  const annualSavings = Math.round(annualGenerationUnits * 6.67);
  const paybackYears = annualSavings > 0 ? (finalPayable / annualSavings).toFixed(1) : '3.8';
  const paybackPercent = Math.min(100, Math.round((parseFloat(paybackYears) / 10) * 100));
  const breakEvenYear = new Date().getFullYear() + Math.ceil(parseFloat(paybackYears));

  const availableInverters = [
    { name: 'Sunvine Solar Hybrid Inverter 5kW 3-Phase', efficiency: '98.4%', specs: 'Built-in WiFi Smart Logger • IP65 Protection' },
    { name: 'Sunvine On-Grid String Inverter 5kW Single Phase', efficiency: '98.2%', specs: 'Dual MPPT • Zero Export Device Compatible' },
    { name: 'Sungrow SG5.0RS Residential Inverter', efficiency: '98.5%', specs: 'Ultra-silent convection cooling • 10 Yr Warranty' },
    { name: 'Solis S6 Pro Series 5kW 3-Phase Hybrid', efficiency: '98.6%', specs: 'AFCI Arc Fault Protection • Generator Sync' }
  ];

  const handleReset = () => {
    if (clearEditingQuotation) clearEditingQuotation();
    setCustName('');
    setCustPhone('');
    setCustLocation('');
    setSystemCapacity('5');
    setRatePerKw(65000);
    setMarginMode('percent');
    setDealerMarginRate(8);
    setDealerMarginFixed(25000);
  };

  const handleSaveDraft = async () => {
    const isEdit = Boolean(editingQuotation?.id);
    const quotePayload = {
      id: isEdit ? editingQuotation.id : `SV-2026-Q${Math.floor(100 + Math.random() * 900)}`,
      date: isEdit ? (editingQuotation.date || new Date().toLocaleDateString('en-GB')) : new Date().toLocaleDateString('en-GB'),
      customerName: custName,
      customerPhone: custPhone,
      location: custLocation,
      city: custLocation.split(',')[0]?.trim() || 'Pune',
      state: 'Maharashtra',
      systemCapacityKW: kw,
      panelType: panelBrand,
      solarModule: panelBrand,
      inverterType: inverterModel,
      inverterCapacity: `${kw} kW`,
      baseCost: baseProjectCost,
      dealerMargin: dealerMarginINR,
      dealerTotalMargin: dealerMarginINR,
      dealerMarginPerKW: Math.round(dealerMarginINR / kw),
      totalAmount: totalCost,
      grandTotalCustomer: totalCost,
      subsidyAmount: subsidy,
      netPayable: finalPayable,
      status: isEdit ? (editingQuotation.status || 'Draft') : 'Draft',
      statusClass: isEdit ? (editingQuotation.statusClass || 'bg-secondary/15 text-secondary') : 'bg-secondary/15 text-secondary',
      dealerCode: currentDealer?.id || 'SV-DLR-0104',
      dealerName: currentDealer?.firmName || 'Rajesh Solar Solutions'
    };

    setSaveStatus('Saving quotation...');
    if (isEdit && updateQuotation) {
      updateQuotation(quotePayload);
    } else if (addQuotation) {
      addQuotation(quotePayload);
    }
    await quotationService.saveQuotation(quotePayload);
    setSaveStatus(isEdit ? 'Quotation updated successfully!' : 'Draft saved successfully to cloud!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handlePreview = () => {
    const isEdit = Boolean(editingQuotation?.id);
    const quotePayload = {
      id: isEdit ? editingQuotation.id : `SV-2026-Q${Math.floor(100 + Math.random() * 900)}`,
      date: isEdit ? (editingQuotation.date || new Date().toLocaleDateString('en-GB')) : new Date().toLocaleDateString('en-GB'),
      customerName: custName,
      customerPhone: custPhone,
      location: custLocation,
      city: custLocation.split(',')[0]?.trim() || 'Pune',
      state: 'Maharashtra',
      systemCapacityKW: kw,
      solarModule: panelBrand,
      moduleCount: moduleCount,
      pvModuleSize: '4 * 8',
      inverterCapacity: `${kw} kW`,
      inverterType: inverterModel,
      inverterCount: '1 NOS',
      baseRatePerKW: ratePerKw,
      dealerMarginPerKW: Math.round(dealerMarginINR / kw),
      dealerTotalMargin: dealerMarginINR,
      totalAmount: totalCost,
      subsidyAmount: subsidy,
      grandTotalCustomer: totalCost,
      netPayable: finalPayable,
      status: isEdit ? (editingQuotation.status || 'Active / Sent') : 'Active / Sent',
      statusClass: isEdit ? (editingQuotation.statusClass || 'bg-primary/15 text-primary') : 'bg-primary/15 text-primary',
      dealerId: currentDealer?.id || 'SV-DLR-0104'
    };

    if (isEdit && updateQuotation) {
      updateQuotation(quotePayload);
    } else if (addQuotation) {
      addQuotation(quotePayload);
    }
    if (setPreviewQuotation) setPreviewQuotation(quotePayload);
    setActiveTab('preview_quote');
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Top Navigation Bar & Progress Track (Exact Stitch Stepper) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1 min-w-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="inline-flex items-center gap-1.5 text-secondary hover:text-on-surface font-label-sm transition-colors w-fit group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
            <span>Back to Dashboard</span>
          </button>
          <div className="flex flex-wrap items-center gap-space-sm mt-1">
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
              {editingQuotation ? 'Edit Quotation' : 'New Quotation'}
            </h1>
            <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-label-xs tracking-wide uppercase font-semibold">
              {editingQuotation ? `Editing #${editingQuotation.id}` : 'Ref #SV-2025-Q408'}
            </span>
            {editingQuotation && (
              <button
                onClick={handleReset}
                type="button"
                className="text-xs text-secondary hover:text-error underline ml-2 font-medium"
              >
                Cancel Edit / Create New
              </button>
            )}
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center bg-surface-container-lowest p-1.5 sm:p-2 rounded-xl shadow-sm self-start lg:self-auto border border-surface-container-high max-w-full overflow-x-auto">
          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-label-sm whitespace-nowrap">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-xs font-bold shrink-0">1</span>
            <span>Details &amp; Pricing</span>
            <span className="bg-primary-container/20 text-on-primary-container text-[10px] px-1.5 py-0.5 rounded font-label-xs uppercase tracking-wider font-semibold">Active</span>
          </div>
          <div className="w-4 sm:w-8 h-0.5 bg-surface-container-high mx-1 shrink-0"></div>
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-secondary hover:text-on-surface font-label-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="w-5 h-5 rounded-full bg-surface-container-high text-secondary flex items-center justify-center text-label-xs font-bold shrink-0">2</span>
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
                    className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none shadow-sm border border-surface-container-high focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-mono"
                    id="custPhone"
                    placeholder="10-digit mobile number"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    value={custPhone}
                    onChange={(e) => {
                      const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setCustPhone(numericOnly);
                    }}
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

              {/* Visual Hardware Configuration Tile */}
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
                  <span className="inline-flex items-center gap-1 font-label-xs text-primary bg-primary-fixed/40 px-3 py-1 rounded-full font-semibold">
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
                <span className="material-symbols-outlined text-primary/20 text-[36px] absolute -top-1 -right-1 pointer-events-none">payments</span>
              </div>

              {/* Line 1: Base System Cost */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary font-medium">Base Hardware &amp; EPC Cost</span>
                  <span className="font-body-sm text-[11px] text-secondary/70">
                    {kw} kW × {formatINR(ratePerKw)}
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-secondary-fixed font-bold tabular-nums whitespace-nowrap">
                  {formatINR(baseProjectCost)}
                </span>
              </div>

              {/* Line 2: Dealer Margin Added */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Dealer Commercial Margin</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-label-xs font-semibold">
                      {marginMode === 'percent' ? `${dealerMarginRate}%` : `${effectiveMarginPercent}%`}
                    </span>
                  </div>
                  <span className="font-body-sm text-[11px] text-secondary">Added to proposal</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-emerald-700 font-bold tabular-nums whitespace-nowrap">
                  + {formatINR(dealerMarginINR)}
                </span>
              </div>

              {/* Line 3: Total Project Cost */}
              <div className="flex items-center justify-between py-1 border-t border-dashed border-primary/20">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">Total Project Cost</span>
                  <span className="font-body-sm text-[11px] text-secondary">Customer quote before subsidy</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-secondary-fixed font-black tabular-nums whitespace-nowrap">
                  {formatINR(totalCost)}
                </span>
              </div>

              {/* Line 4: Government Subsidy */}
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
                <span className="font-headline-sm text-headline-sm text-primary font-bold tabular-nums whitespace-nowrap">
                  - {formatINR(subsidy)}
                </span>
              </div>

              {/* Line 5: Estimated Annual Savings */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary font-medium">Estimated Annual Savings</span>
                  <span className="font-body-sm text-[11px] text-secondary">approx. {annualGenerationUnits.toLocaleString()} units / year generated</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-bold tabular-nums whitespace-nowrap">
                  {formatINR(annualSavings)} <span className="font-body-sm text-secondary font-normal">/ yr</span>
                </span>
              </div>

              {/* Line 6: Final Customer Payable (Guaranteed Single Line) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t-2 border-[#6CBF3D]/40">
                <div className="flex flex-col">
                  <span className="font-label-md text-xs sm:text-sm text-on-secondary-fixed uppercase tracking-wider font-bold">
                    Final Customer Payable
                  </span>
                  <span className="font-body-sm text-[11px] text-secondary">Net cost post-DBT reimbursement</span>
                </div>
                <div className="flex items-baseline gap-2 self-start sm:self-auto whitespace-nowrap shrink-0">
                  <span className="text-2xl sm:text-3xl font-black text-on-secondary-fixed tabular-nums whitespace-nowrap inline-flex items-baseline">
                    {formatINR(finalPayable)}
                  </span>
                  <span className="bg-primary text-on-primary text-label-xs px-2 py-0.5 rounded-full shadow-xs font-bold shrink-0">
                    Net
                  </span>
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

            {/* Interactive Dealer Commercials (Dual Mode: % or Fixed ₹ Amount) */}
            <div className="p-4 bg-surface rounded-xl border border-surface-container-high flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
                  <span className="font-label-sm text-sm text-on-surface font-bold">Custom Dealer Margin</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold whitespace-nowrap" id="dealerMarginDisplay">
                  {formatINR(dealerMarginINR)}
                </span>
              </div>

              {/* Mode Toggle: % vs ₹ */}
              <div className="flex items-center p-1 bg-surface-container-low rounded-lg border border-surface-container-high w-fit">
                <button
                  type="button"
                  onClick={() => setMarginMode('percent')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    marginMode === 'percent'
                      ? 'bg-primary-container text-on-primary shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  <span>% Percentage</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMarginMode('amount')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    marginMode === 'amount'
                      ? 'bg-primary-container text-on-primary shadow-xs'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  <span>₹ Fixed Amount</span>
                </button>
              </div>

              {/* Preset Chips & Custom Input */}
              {marginMode === 'percent' ? (
                <div className="flex flex-wrap items-center gap-2">
                  {[5, 8, 10, 12, 15].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDealerMarginRate(pct)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        dealerMarginRate === pct
                          ? 'bg-primary-container text-on-primary shadow-xs'
                          : 'bg-surface-container-lowest border border-surface-container-high text-secondary hover:text-on-surface'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}

                  {/* Custom % Input */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="text-xs text-secondary font-medium">Custom %:</span>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        step="0.5"
                        value={dealerMarginRate}
                        onChange={(e) => setDealerMarginRate(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-16 h-8 text-center text-xs font-bold rounded-lg border border-surface-container-high bg-surface-container-lowest focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none"
                      />
                      <span className="absolute right-2 text-xs text-secondary font-bold pointer-events-none">%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {[10000, 20000, 30000, 50000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDealerMarginFixed(amt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        dealerMarginFixed === amt
                          ? 'bg-primary-container text-on-primary shadow-xs'
                          : 'bg-surface-container-lowest border border-surface-container-high text-secondary hover:text-on-surface'
                      }`}
                    >
                      ₹{(amt / 1000)}k
                    </button>
                  ))}

                  {/* Custom ₹ Input */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="text-xs text-secondary font-medium">Custom ₹:</span>
                    <div className="relative flex items-center">
                      <span className="absolute left-2 text-xs text-secondary font-bold pointer-events-none">₹</span>
                      <input
                        type="number"
                        min="0"
                        max="500000"
                        step="1000"
                        value={dealerMarginFixed}
                        onChange={(e) => setDealerMarginFixed(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-24 h-8 pl-5 pr-2 text-xs font-bold rounded-lg border border-surface-container-high bg-surface-container-lowest focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-secondary flex items-center justify-between pt-2 border-t border-surface-container-high">
                <span className="whitespace-nowrap">
                  Spread: <strong className="text-on-surface font-bold">{formatINR(Math.round(dealerMarginINR / kw))} / kW</strong> ({effectiveMarginPercent}%)
                </span>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-[10px] bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                  <span className="material-symbols-outlined text-[12px]">lock</span>
                  <span>Confidential (Hidden from Customer PDF)</span>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 h-16 sm:h-20 bg-surface-container-lowest border-t border-surface-container-high shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-40 flex items-center justify-between px-3 sm:px-4 md:px-8">
        <button
          onClick={handleReset}
          className="h-9 sm:h-10 px-2.5 sm:px-4 rounded-lg bg-surface-container-lowest text-on-secondary-fixed hover:bg-surface-container-low font-label-md transition-colors flex items-center gap-1.5 sm:gap-2 border border-surface-container-high shadow-xs cursor-pointer shrink-0"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span className="hidden sm:inline">Reset Form</span>
          <span className="sm:hidden text-xs">Reset</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSaveDraft}
            className="h-9 sm:h-10 px-2.5 sm:px-4 md:px-5 rounded-lg bg-surface-container-lowest text-on-secondary-fixed hover:bg-surface-container-low font-label-md transition-colors border border-surface-container-high shadow-xs cursor-pointer text-xs sm:text-sm shrink-0"
            type="button"
          >
            <span className="hidden sm:inline">Save Draft</span>
            <span className="sm:hidden">Save</span>
          </button>
          <button
            onClick={handlePreview}
            className="h-9 sm:h-10 px-3 sm:px-5 md:px-6 rounded-lg bg-[#6CBF3D] hover:bg-[#4F9A2C] active:scale-[0.99] text-on-primary font-label-md transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 cursor-pointer font-semibold text-xs sm:text-sm shrink-0"
            type="button"
          >
            <span className="hidden sm:inline">Preview Quotation</span>
            <span className="sm:hidden">Preview</span>
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

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
