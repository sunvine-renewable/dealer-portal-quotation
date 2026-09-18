import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FilePlus,
  ShieldCheck,
  Zap,
  Info,
  Building2,
  DollarSign,
  Layers,
  FileText,
  ChevronRight,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function CreateQuotation() {
  const {
    pricingMaster,
    modulesList,
    invertersList,
    currentDealer,
    addQuotation,
    setActiveTab,
    setPreviewQuotation
  } = useApp();

  // Step 1: Customer Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [discom, setDiscom] = useState('PGVCL (Paschim Gujarat Vij Company Ltd)');

  // Step 2: System Sizing
  const [projectType, setProjectType] = useState('Commercial & Industrial Rooftop');
  const [capacityKW, setCapacityKW] = useState(280.20);
  const [selectedModuleId, setSelectedModuleId] = useState(modulesList[0]?.id || 'mod-1');
  const [selectedInverterId, setSelectedInverterId] = useState(invertersList[0]?.id || 'inv-1');
  const [moduleSizePattern, setModuleSizePattern] = useState('4 * 8');
  const [inverterQty, setInverterQty] = useState('2 NOS');

  // Step 3: Turnkey Pricing & CONFIDENTIAL Dealer Margin
  const [marginType, setMarginType] = useState('per_kw'); // 'per_kw' | 'flat'
  const [marginPerKw, setMarginPerKw] = useState(2000);
  const [marginFlat, setMarginFlat] = useState(50000);
  const [showMarginBreakdown, setShowMarginBreakdown] = useState(true);

  // Statutory charges
  const [gedaCharge, setGedaCharge] = useState('Including');
  const [discomCharge, setDiscomCharge] = useState('Extra as actual if more from PGVCL');
  const [testingCharge, setTestingCharge] = useState('CUSTOMER SCOPE');

  // Helper to determine base rate according to project type and capacity
  const getSuggestedBaseRate = () => {
    if (projectType.includes('Residential')) {
      if (capacityKW <= 3) return pricingMaster.baseRates.residential_1_to_3;
      return pricingMaster.baseRates.residential_3_to_10;
    }
    return pricingMaster.baseRates.commercial_industrial;
  };

  const [baseRate, setBaseRate] = useState(getSuggestedBaseRate());

  // Handle project type switch to auto update base rate
  const handleProjectTypeChange = (type) => {
    setProjectType(type);
    if (type.includes('Residential')) {
      setBaseRate(capacityKW <= 3 ? pricingMaster.baseRates.residential_1_to_3 : pricingMaster.baseRates.residential_3_to_10);
    } else {
      setBaseRate(pricingMaster.baseRates.commercial_industrial);
    }
  };

  // Selected hardware objects
  const selectedModule = modulesList.find(m => m.id === selectedModuleId) || modulesList[0];
  const selectedInverter = invertersList.find(i => i.id === selectedInverterId) || invertersList[0];

  // Calculate panel count automatically: (capacityKW * 1000) / module wattage
  const computedModuleCount = Math.ceil((capacityKW * 1000) / (selectedModule?.wattage || 600));

  // Margin calculation
  const dealerMaxCap = currentDealer?.maxMarginCapPerKw || 6000;
  const effectiveMarginPerKw = marginType === 'per_kw' ? Number(marginPerKw) : (Number(marginFlat) / (capacityKW || 1));
  const totalDealerMargin = marginType === 'per_kw' ? Math.round(Number(marginPerKw) * capacityKW) : Number(marginFlat);

  // Turnkey Calculations
  const customerRatePerKW = baseRate + effectiveMarginPerKw;
  const baseTotalAmount = Math.round(baseRate * capacityKW);
  const turnkeyContractAmount = Math.round(customerRatePerKW * capacityKW);
  const gstPercent = pricingMaster.taxes.gstPercent || 8.9;
  const gstAmount = Math.round(turnkeyContractAmount * (gstPercent / 100));
  const grandTotalCustomer = turnkeyContractAmount + gstAmount;

  // Handle Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName) {
      alert('Please enter customer or enterprise name');
      return;
    }

    const newQuotationId = `SV-${new Date().getFullYear()}-Q${Math.floor(100 + Math.random() * 900)}`;
    const todayFormatted = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()).replace(/\//g, '-');

    const quotationData = {
      id: newQuotationId,
      date: todayFormatted,
      dealerId: currentDealer.id,
      dealerName: `${currentDealer.contactPerson} (${currentDealer.firmName})`,
      customerName,
      customerPhone,
      customerEmail,
      siteAddress,
      discom,
      projectType,
      systemCapacityKW: Number(capacityKW),
      solarModule: selectedModule.model,
      moduleCount: computedModuleCount,
      pvModuleSize: moduleSizePattern,
      inverterCapacity: `${selectedInverter.capacityKW} KW`,
      inverterCount: inverterQty,
      baseRatePerKW: Number(baseRate),
      dealerMarginPerKW: Math.round(effectiveMarginPerKw),
      dealerTotalMargin: totalDealerMargin,
      discomMeterCharge: discomCharge,
      gedaRegistrationCharge: gedaCharge,
      meterTestingCharge: testingCharge,
      gstPercentage: gstPercent,
      baseTotalAmount,
      grandTotalCustomer,
      status: 'Quotation Generated'
    };

    addQuotation(quotationData);
    setPreviewQuotation(quotationData);
    setActiveTab('preview_quote');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-[#6CBF3D]/10 text-[#6CBF3D]">
              <FilePlus className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-[#0F1B2E] font-heading">New Solar EPC Quotation Generator</h1>
          </div>
          <p className="text-xs text-gray-500">
            Generate turnkey proposal matching the official Sunvine 4-page Mirana Technocast format.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-gray-400 block">Authorized Dealer</span>
            <span className="text-xs font-semibold text-gray-800">{currentDealer.firmName}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0F1B2E] text-white flex items-center justify-center text-xs font-bold">
            {currentDealer.contactPerson.charAt(0)}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Customer & Site Details */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs">
          <h2 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6CBF3D]"></span>
            1. Customer & Project Site Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Customer / Enterprise Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. MIRANA TECHNOCAST PVT. LTD."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6CBF3D] focus:border-transparent font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Contact Phone / WhatsApp
              </label>
              <input
                type="tel"
                placeholder="e.g. +91 98250 12345"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6CBF3D] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. procurement@miranacast.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6CBF3D] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                DISCOM (Power Distribution Co.)
              </label>
              <select
                value={discom}
                onChange={(e) => setDiscom(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6CBF3D] focus:border-transparent bg-white"
              >
                <option value="PGVCL (Paschim Gujarat Vij Company Ltd)">PGVCL (Paschim Gujarat Vij Company Ltd)</option>
                <option value="DGVCL (Dakshin Gujarat Vij Company Ltd)">DGVCL (Dakshin Gujarat Vij Company Ltd)</option>
                <option value="MGVCL (Madhya Gujarat Vij Company Ltd)">MGVCL (Madhya Gujarat Vij Company Ltd)</option>
                <option value="UGVCL (Uttar Gujarat Vij Company Ltd)">UGVCL (Uttar Gujarat Vij Company Ltd)</option>
                <option value="Torrent Power Ltd. (Ahmedabad/Surat)">Torrent Power Ltd.</option>
                <option value="MSEDCL (Maharashtra)">MSEDCL (Maharashtra)</option>
                <option value="Other Regional State DISCOM">Other Regional State DISCOM</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Site Location & Installation Address
              </label>
              <input
                type="text"
                placeholder="e.g. Plot No. 42, GIDC Metoda, Kalawad Road, Rajkot - 360021"
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6CBF3D] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Technical Sizing & Hardware Selection */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs">
          <h2 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6CBF3D]"></span>
            2. System Sizing & Approved Hardware Specification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Project Category</label>
              <select
                value={projectType}
                onChange={(e) => handleProjectTypeChange(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D] bg-white"
              >
                <option value="Commercial & Industrial Rooftop">Commercial & Industrial Rooftop</option>
                <option value="Residential PM Surya Ghar Rooftop">Residential PM Surya Ghar Rooftop</option>
                <option value="Institutional & Educational">Institutional & Educational</option>
                <option value="Agricultural Solar Pump / Grid">Agricultural Solar Pump / Grid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">System Capacity (KW DC) *</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max="10000"
                  required
                  value={capacityKW}
                  onChange={(e) => setCapacityKW(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D] font-bold text-[#0F1B2E]"
                />
                <span className="absolute right-3 top-2 text-xs font-semibold text-gray-400">KW</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Calculated Panels</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-800">
                {computedModuleCount} Modules ({selectedModule?.wattage}W each)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Solar PV Module Brand & Type
              </label>
              <select
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D] bg-white"
              >
                {modulesList.map((mod) => (
                  <option key={mod.id} value={mod.id}>
                    {mod.brand} - {mod.model} ({mod.wattage}W)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Grid Inverter Specification & Make
              </label>
              <select
                value={selectedInverterId}
                onChange={(e) => setSelectedInverterId(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D] bg-white"
              >
                {invertersList.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.brand} - {inv.model} ({inv.capacityKW}KW)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Module Structure Configuration</label>
              <input
                type="text"
                value={moduleSizePattern}
                onChange={(e) => setModuleSizePattern(e.target.value)}
                placeholder="e.g. 4 * 8"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Inverter Quantity Count</label>
              <input
                type="text"
                value={inverterQty}
                onChange={(e) => setInverterQty(e.target.value)}
                placeholder="e.g. 2 NOS"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: CONFIDENTIAL DEALER MARGIN & COMMERCIAL PRICING */}
        <div className="bg-gradient-to-br from-emerald-50/50 via-white to-gray-50 rounded-xl p-6 border-2 border-[#6CBF3D]/30 shadow-md relative overflow-hidden">
          {/* Security Badge in Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-200 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#6CBF3D] text-white rounded-lg shadow-xs">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider flex items-center gap-2">
                  3. Turnkey Base Pricing & Confidential Dealer Margin
                </h3>
                <span className="text-[11px] text-emerald-800 font-semibold">
                  Confidential to Dealer Portal • Strictly hidden on customer-facing proposal PDF
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMarginBreakdown(!showMarginBreakdown)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              {showMarginBreakdown ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showMarginBreakdown ? 'Hide Margin Logic' : 'View Margin Logic'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {/* Turnkey Base Rate */}
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Sunvine Base EPC Rate (₹/KW)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1000"
                  step="100"
                  value={baseRate}
                  onChange={(e) => setBaseRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D] font-mono font-bold text-gray-900"
                />
                <span className="absolute right-3 top-2 text-xs font-semibold text-gray-400">₹/KW</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5">
                Base Turnkey Total: <span className="font-semibold text-gray-800">{formatINR(baseTotalAmount)}</span>
              </p>
            </div>

            {/* Dealer Margin Mode & Input */}
            <div className="md:col-span-2 bg-white p-4 rounded-xl border-2 border-[#6CBF3D] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0F1B2E] uppercase">
                  Confidential Dealer Margin
                </span>
                {/* Margin Mode Switcher */}
                <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setMarginType('per_kw')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      marginType === 'per_kw'
                        ? 'bg-[#6CBF3D] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Per KW (₹/KW)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMarginType('flat')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      marginType === 'flat'
                        ? 'bg-[#6CBF3D] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Flat Lump Sum (₹)
                  </button>
                </div>
              </div>

              {/* Input according to mode */}
              {marginType === 'per_kw' ? (
                <div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max={dealerMaxCap}
                      step="100"
                      value={marginPerKw}
                      onChange={(e) => setMarginPerKw(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-base rounded-lg border border-emerald-300 focus:ring-2 focus:ring-[#6CBF3D] font-mono font-bold text-emerald-800"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-semibold text-gray-400">₹/KW</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1">
                    <span>Approved Max Cap: {formatINR(dealerMaxCap)}/KW</span>
                    <span className="text-emerald-700 font-bold">Your Total Margin: {formatINR(totalDealerMargin)}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="5000"
                      value={marginFlat}
                      onChange={(e) => setMarginFlat(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-base rounded-lg border border-emerald-300 focus:ring-2 focus:ring-[#6CBF3D] font-mono font-bold text-emerald-800"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-semibold text-gray-400">INR Flat</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1">
                    <span>Effective per KW: {formatINR(effectiveMarginPerKw)}/KW</span>
                    <span className="text-emerald-700 font-bold">Your Total Margin: {formatINR(totalDealerMargin)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Ledger Preview Breakdown */}
          {showMarginBreakdown && (
            <div className="bg-[#0F1B2E] text-white p-4 rounded-xl border border-[#1E2E48] mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6CBF3D] mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Live Financial Summary (Dealer Confidential vs Customer Facing)
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="block text-gray-400 text-[11px]">Sunvine Base Rate</span>
                  <span className="text-base font-bold font-mono">{formatINR(baseRate)}/KW</span>
                  <span className="block text-[10px] text-gray-500 mt-0.5">EPC Supply + Work</span>
                </div>

                <div className="p-3 bg-[#6CBF3D]/20 rounded-lg border border-[#6CBF3D]/40">
                  <span className="block text-emerald-300 text-[11px] font-semibold">Your Profit Margin</span>
                  <span className="text-base font-bold text-[#6CBF3D] font-mono">{formatINR(effectiveMarginPerKw)}/KW</span>
                  <span className="block text-[10px] text-emerald-200 mt-0.5">{formatINR(totalDealerMargin)} Total Net</span>
                </div>

                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="block text-gray-400 text-[11px]">Customer Turnkey Rate</span>
                  <span className="text-base font-bold text-white font-mono">{formatINR(customerRatePerKW)}/KW</span>
                  <span className="block text-[10px] text-gray-400 mt-0.5">Printed on Page 2</span>
                </div>

                <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                  <span className="block text-gray-400 text-[11px]">Customer Grand Total</span>
                  <span className="text-base font-bold text-[#6CBF3D] font-mono">{formatINR(grandTotalCustomer)}</span>
                  <span className="block text-[10px] text-gray-400 mt-0.5">Incl. {gstPercent}% GST</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Statutory & Terms Confirmations */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs">
          <h2 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6CBF3D]"></span>
            4. Statutory Net Metering & Scope Declarations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">GEDA Registration Charge</label>
              <input
                type="text"
                value={gedaCharge}
                onChange={(e) => setGedaCharge(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">DISCOM Net Meter Charge</label>
              <input
                type="text"
                value={discomCharge}
                onChange={(e) => setDiscomCharge(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Meter Testing & Calibration Scope</label>
              <input
                type="text"
                value={testingCharge}
                onChange={(e) => setTestingCharge(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D]"
              />
            </div>
          </div>
        </div>

        {/* Submit & Generate Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div>
            <p className="text-sm font-bold text-gray-900">Ready to generate proposal?</p>
            <p className="text-xs text-gray-500">
              The proposal will be compiled directly into the official Sunvine 4-page PDF format.
            </p>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <FileText className="w-5 h-5" />
            Generate & Preview 4-Page PDF
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
