import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function PricingMaster() {
  const { pricingMaster, updatePricingMaster, addNotification } = useApp();

  const [activeTab, setActiveTab] = useState('base');
  const [toastMessage, setToastMessage] = useState('');

  // Form states initialized with pricingMaster or realistic defaults
  const [rate1to3, setRate1to3] = useState(pricingMaster?.baseRates?.tier1to3kw || 62000);
  const [rate3to10, setRate3to10] = useState(pricingMaster?.baseRates?.tier3to10kw || 58000);
  const [rateCommercial, setRateCommercial] = useState(pricingMaster?.baseRates?.tier10to50kw || 24000);

  // Bank details
  const [beneficiaryName, setBeneficiaryName] = useState(pricingMaster?.bankDetails?.accountName || 'SUNVINE RENEWABLE');
  const [bankName, setBankName] = useState(pricingMaster?.bankDetails?.bankName || 'HDFC BANK LTD.');
  const [accountNumber, setAccountNumber] = useState(pricingMaster?.bankDetails?.accountNumber || '99998000050580');
  const [ifscCode, setIfscCode] = useState(pricingMaster?.bankDetails?.ifscCode || 'HDFC0002012');
  const [branch, setBranch] = useState(pricingMaster?.bankDetails?.branch || 'METODA GIDC BRANCH, RAJKOT - 360021 (GUJARAT)');

  // Terms
  const [paymentMilestones, setPaymentMilestones] = useState('10% Advance with PO, 90% before material dispatch');
  const [deliveryTimeline, setDeliveryTimeline] = useState('30 Calendar Days from CEIG/Discom sanction approval');
  const [validityDays, setValidityDays] = useState('15 Days from generation date due to commodity pricing');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updatePricingMaster) {
      updatePricingMaster({
        baseRates: {
          tier1to3kw: Number(rate1to3),
          tier3to10kw: Number(rate3to10),
          tier10to50kw: Number(rateCommercial),
          tierAbove50kw: Number(rateCommercial),
        },
        bankDetails: {
          accountName: beneficiaryName,
          bankName,
          accountNumber,
          ifscCode,
          branch,
        }
      });
    }
    if (addNotification) {
      addNotification({
        type: 'info',
        icon: 'bolt',
        title: 'Master EPC Pricing & Presets Published',
        description: `Admin revised benchmark rates: 1-3kW at ₹${Number(rate1to3).toLocaleString('en-IN')}/kW, 3-10kW at ₹${Number(rate3to10).toLocaleString('en-IN')}/kW.`,
        targetTab: 'pricing_master'
      });
    }
    triggerToast('Master pricing & presets published successfully to 48 dealers!');
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Toast */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none flex items-center gap-2 px-4 py-3 rounded-lg bg-on-secondary-fixed text-on-secondary shadow-xl font-label-sm ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <span className="material-symbols-outlined text-[20px] text-primary-fixed">check_circle</span>
        <span>{toastMessage}</span>
      </div>

      {/* Breadcrumb & Master Title Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between pb-6 gap-4 border-b border-surface-container-highest">
        <div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary mb-1.5">
            <span>Admin Console</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span>Commercial Master Rules</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-on-surface font-semibold">Quotation Presets</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-inverse-surface tracking-tight">
            Quotation Presets &amp; Master Pricing Engine
          </h1>
          <p className="font-body-md text-body-md text-secondary mt-1 max-w-3xl">
            Configure baseline turnkey equipment pricing, DBT subsidy matrices, standard Bill of Materials (BOM), banking instruments, and commercial terms enforced across all authorized dealer proposals.
          </p>
        </div>
        {/* Header Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start xl:self-center shrink-0">
          <button
            onClick={() => {
              setRate1to3(62000);
              setRate3to10(58000);
              setRateCommercial(24000);
              triggerToast('Reset to default system presets');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface hover:bg-surface-container-low text-label-md font-label-md transition-colors shadow-sm text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-lg text-secondary">restart_alt</span>
            <span>Reset to Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-surface-container-lowest font-label-md text-label-md transition-colors shadow-sm text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-lg">cloud_sync</span>
            <span>Save &amp; Publish Changes</span>
            <span className="ml-1 text-[10px] font-bold uppercase bg-surface-container-lowest/20 px-1.5 py-0.5 rounded">48 Dealers</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-surface-container-highest mt-4 overflow-x-auto no-scrollbar pb-0.5 max-w-full">
        <button
          onClick={() => setActiveTab('base')}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-label-md font-bold tracking-tight whitespace-nowrap shrink-0 ${
            activeTab === 'base' ? 'border-primary text-inverse-surface' : 'border-transparent text-secondary hover:text-on-surface'
          }`}
        >
          <span>Base Pricing &amp; Subsidy Slabs</span>
          <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold">Active</span>
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-label-md font-medium whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'modules' ? 'border-primary text-inverse-surface font-bold' : 'border-transparent text-secondary hover:text-on-surface'
          }`}
        >
          <span>Modules &amp; Inverters Master</span>
          <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container text-secondary">18 Items</span>
        </button>
        <button
          onClick={() => setActiveTab('bom')}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-label-md font-medium whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'bom' ? 'border-primary text-inverse-surface font-bold' : 'border-transparent text-secondary hover:text-on-surface'
          }`}
        >
          <span>Default Bill of Material (BOM)</span>
          <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container text-secondary">8 Components</span>
        </button>
        <button
          onClick={() => setActiveTab('bank')}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-label-md font-medium whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'bank' ? 'border-primary text-inverse-surface font-bold' : 'border-transparent text-secondary hover:text-on-surface'
          }`}
        >
          <span>Company Bank Details &amp; Terms &amp; Conditions</span>
        </button>
      </div>

      {/* Main Workspace Two-Column Bento Layout */}
      <div className="grid grid-cols-12 gap-6 mt-6 items-start">
        {/* LEFT CONFIGURATION STACK (8 Cols) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
          {/* SECTION A: Base Turnkey Pricing per kW */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                  <span className="material-symbols-outlined text-xl">payments</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-inverse-surface">Tier-based Base EPC Pricing (Turnkey BOS + Modules)</h2>
                  <p className="font-body-sm text-body-sm text-secondary">Standard reference baseline enforced in dealer quotation calculations prior to dealer margin addon.</p>
                </div>
              </div>
              <span className="font-label-xs text-label-xs bg-surface-container-low text-secondary px-2.5 py-1 rounded border border-surface-container-highest">Currency: INR (₹)</span>
            </div>
            {/* Tier Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {/* Tier 1 */}
              <div className="border border-surface-container-highest rounded-lg p-4 bg-surface-container-lowest hover:border-primary-container/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Residential (1 to 3 kW)</span>
                    <span className="font-label-xs text-label-xs bg-surface-container px-2 py-0.5 rounded text-secondary">Small Grid</span>
                  </div>
                  <label className="font-body-sm text-body-sm text-secondary block mb-1.5">Base Rate per kW</label>
                  <div className="relative flex items-center mb-3">
                    <span className="absolute left-3 font-semibold text-secondary">₹</span>
                    <input
                      className="w-full pl-8 pr-12 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-headline-sm font-headline-sm font-bold text-inverse-surface focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                      type="number"
                      value={rate1to3}
                      onChange={(e) => setRate1to3(e.target.value)}
                    />
                    <span className="absolute right-3 font-label-xs text-label-xs text-secondary">/ kW</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm text-secondary bg-surface-container-low px-2 py-1.5 rounded">
                    <span>Benchmark</span>
                    <span className="font-semibold text-on-surface">Avg Market: ₹63.5k</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container-low flex items-center justify-between">
                  <span className="font-label-xs text-label-xs text-secondary">Enforce Minimum Floor</span>
                  <input defaultChecked className="rounded text-primary-container focus:ring-primary-container w-4 h-4 cursor-pointer" type="checkbox"/>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="border border-surface-container-highest rounded-lg p-4 bg-surface-container-lowest hover:border-primary-container/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Residential (3 to 10 kW)</span>
                    <span className="font-label-xs text-label-xs bg-primary-container/15 text-primary px-2 py-0.5 rounded font-semibold">High Volume Tier</span>
                  </div>
                  <label className="font-body-sm text-body-sm text-secondary block mb-1.5">Base Rate per kW</label>
                  <div className="relative flex items-center mb-3">
                    <span className="absolute left-3 font-semibold text-secondary">₹</span>
                    <input
                      className="w-full pl-8 pr-12 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-headline-sm font-headline-sm font-bold text-inverse-surface focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                      type="number"
                      value={rate3to10}
                      onChange={(e) => setRate3to10(e.target.value)}
                    />
                    <span className="absolute right-3 font-label-xs text-label-xs text-secondary">/ kW</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm text-secondary bg-surface-container-low px-2 py-1.5 rounded">
                    <span>Gross 5 kW Est.</span>
                    <span className="font-semibold text-on-surface">₹ {(Number(rate3to10) * 5).toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container-low flex items-center justify-between">
                  <span className="font-label-xs text-label-xs text-secondary">Enforce Minimum Floor</span>
                  <input defaultChecked className="rounded text-primary-container focus:ring-primary-container w-4 h-4 cursor-pointer" type="checkbox"/>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="border border-surface-container-highest rounded-lg p-4 bg-surface-container-lowest hover:border-primary-container/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Commercial (C&amp;I &gt; 10 kW)</span>
                    <span className="font-label-xs text-label-xs bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded font-semibold">LT / HT Commercial</span>
                  </div>
                  <label className="font-body-sm text-body-sm text-secondary block mb-1.5">Base Rate per kW</label>
                  <div className="relative flex items-center mb-3">
                    <span className="absolute left-3 font-semibold text-secondary">₹</span>
                    <input
                      className="w-full pl-8 pr-12 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-headline-sm font-headline-sm font-bold text-inverse-surface focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                      type="number"
                      value={rateCommercial}
                      onChange={(e) => setRateCommercial(e.target.value)}
                    />
                    <span className="absolute right-3 font-label-xs text-label-xs text-secondary">/ kW</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm text-secondary bg-surface-container-low px-2 py-1.5 rounded">
                    <span>Structure Scope</span>
                    <span className="font-semibold text-on-surface text-[11px]">Excl. HT Yard</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container-low flex items-center justify-between">
                  <span className="font-label-xs text-label-xs text-secondary">Custom Margin Review</span>
                  <input defaultChecked className="rounded text-primary-container focus:ring-primary-container w-4 h-4 cursor-pointer" type="checkbox"/>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Central Govt. PM Surya Ghar Subsidy Slabs */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-surface-container-low gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-inverse-surface">Central Govt. PM Surya Ghar Subsidy Matrix</h2>
                  <p className="font-body-sm text-body-sm text-secondary">National DBT Portal guidelines for Direct Benefit Transfer applied to quote sheets.</p>
                </div>
              </div>
              <span className="font-label-xs text-label-xs bg-primary-container/15 text-primary px-3 py-1 rounded-full font-bold self-start sm:self-center">
                MNRE National Portal DBT Matrix 2024-25
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-primary-container"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Capacity: 1.0 kW</span>
                  <span className="font-label-xs text-label-xs text-secondary">Slab Tier 1</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mb-1">Fixed Central Subsidy</p>
                <div className="text-headline-lg font-headline-lg text-primary font-bold">₹ 30,000</div>
                <p className="font-label-xs text-label-xs text-secondary mt-2">Flat ₹30,000/kW assistance</p>
              </div>
              <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-primary-container"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Capacity: 2.0 kW</span>
                  <span className="font-label-xs text-label-xs text-secondary">Slab Tier 2</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mb-1">Cumulative Central Subsidy</p>
                <div className="text-headline-lg font-headline-lg text-primary font-bold">₹ 60,000</div>
                <p className="font-label-xs text-label-xs text-secondary mt-2">Direct deposit to beneficiary account</p>
              </div>
              <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-primary-container"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Capacity: 3.0 kW &amp; Above</span>
                  <span className="font-label-xs text-label-xs text-secondary">Maximum Cap</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mb-1">Max Residential Subsidy</p>
                <div className="text-headline-lg font-headline-lg text-primary font-bold">₹ 78,000</div>
                <p className="font-label-xs text-label-xs text-secondary mt-2">Capped at ₹78k for ≥ 3 kW</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-surface border border-surface-container-highest flex items-start gap-2.5">
              <span className="material-symbols-outlined text-secondary text-lg mt-0.5">info</span>
              <p className="font-body-sm text-body-sm text-secondary">
                <strong className="text-on-surface">DBT Process Note:</strong> Subsidy is automatically credited via DBT directly to customer Aadhaar-linked bank account upon Discom net-metering commissioning and joint inspection report upload.
              </p>
            </div>
          </div>

          {/* SECTION C: Equipment Master Catalog Defaults */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                  <span className="material-symbols-outlined text-xl">solar_power</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-inverse-surface">Default System Specifications for Quotation Generator</h2>
                  <p className="font-body-sm text-body-sm text-secondary">These hardware specifications auto-populate when a dealer creates a new residential or light-commercial estimate.</p>
                </div>
              </div>
              <span className="font-label-xs text-label-xs bg-surface-container px-2.5 py-1 rounded text-secondary font-semibold">Tier-1 Hardware</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Module Defaults */}
              <div className="border border-surface-container-highest rounded-lg p-4 bg-surface-container-low">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">grid_view</span>
                    <h3 className="font-label-md text-label-md font-bold text-on-surface">Default Solar Module</h3>
                  </div>
                  <span className="font-label-xs text-label-xs bg-primary-container/15 text-primary px-2 py-0.5 rounded font-semibold">ALMM Approved</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="font-body-sm text-body-sm text-secondary block mb-1">Assigned Make &amp; Model</label>
                    <select className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container">
                      <option>Sunvine / Premier Energies TOPCon Bifacial (600 WP)</option>
                      <option>Waaree Bi-55 Dual Glass 540 WP</option>
                      <option>Adani Solar Shine Series Mono PERC 545 WP</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-body-sm text-body-sm text-secondary block mb-1">Module Rating</label>
                      <input className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface" type="text" defaultValue="600 WP Mono Bifacial Half-Cut"/>
                    </div>
                    <div>
                      <label className="font-body-sm text-body-sm text-secondary block mb-1">Module Efficiency</label>
                      <input className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface" type="text" defaultValue="22.8% STC Peak"/>
                    </div>
                  </div>
                  <div>
                    <label className="font-body-sm text-body-sm text-secondary block mb-1">Warranty Term Rendered on PDF</label>
                    <input className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface" type="text" defaultValue="12 Yrs Product / 30 Yrs Linear Power Warranty"/>
                  </div>
                </div>
              </div>

              {/* Inverter Defaults */}
              <div className="border border-surface-container-highest rounded-lg p-4 bg-surface-container-low">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">electrical_services</span>
                    <h3 className="font-label-md text-label-md font-bold text-on-surface">Default Solar Inverter</h3>
                  </div>
                  <span className="font-label-xs text-label-xs bg-primary-container/15 text-primary px-2 py-0.5 rounded font-semibold">Cloud IoT Sync</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="font-body-sm text-body-sm text-secondary block mb-1">Assigned Make &amp; Series</label>
                    <select className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container">
                      <option>Sunvine Smart Series (Solaryaan / Solis MPPT Dual)</option>
                      <option>Growatt MIN 3-Phase Residential Series</option>
                      <option>Polycab Solar Grid-Tied Inverter</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-body-sm text-body-sm text-secondary block mb-1">Topology &amp; Interface</label>
                      <input className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface" type="text" defaultValue="3-Phase Grid-Tied Cloud Wi-Fi"/>
                    </div>
                    <div>
                      <label className="font-body-sm text-body-sm text-secondary block mb-1">Peak Efficiency</label>
                      <input className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface" type="text" defaultValue="98.6% Euro Efficiency"/>
                    </div>
                  </div>
                  <div>
                    <label className="font-body-sm text-body-sm text-secondary block mb-1">Warranty Term Rendered on PDF</label>
                    <input className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface" type="text" defaultValue="8 Years Full Replacement + Remote Telemetry"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION D: Official Bank Account for Quotation PDF Footer */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-inverse-surface">Official Remittance Account (Customer Quotation Footer)</h2>
                  <p className="font-body-sm text-body-sm text-secondary">Verified Sunvine bank details automatically injected into payment schedules and PDF footers.</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-container/15 text-primary rounded-full font-label-xs text-label-xs font-semibold">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Verified RTGS Account</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label className="font-body-sm text-body-sm text-secondary block mb-1">Beneficiary Firm Name</label>
                <input
                  className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-semibold"
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                />
              </div>
              <div>
                <label className="font-body-sm text-body-sm text-secondary block mb-1">Bank Name</label>
                <input
                  className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              <div>
                <label className="font-body-sm text-body-sm text-secondary block mb-1">Current Account Number</label>
                <input
                  className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-mono"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="font-body-sm text-body-sm text-secondary block mb-1">IFSC Code</label>
                <input
                  className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-mono uppercase"
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-body-sm text-body-sm text-secondary block mb-1">Branch Name &amp; Clearing Location</label>
                <input
                  className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SECTION E: Quotation Terms & Conditions Editor */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                  <span className="material-symbols-outlined text-xl">gavel</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-inverse-surface">Commercial Milestones &amp; Legal Terms</h2>
                  <p className="font-body-sm text-body-sm text-secondary">Default clause presets appended to dealer quotation terms.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="font-body-sm text-body-sm text-secondary block mb-1">Default Payment Milestones</label>
                <input
                  className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                  type="text"
                  value={paymentMilestones}
                  onChange={(e) => setPaymentMilestones(e.target.value)}
                />
              </div>
              <div>
                <label className="font-body-sm text-body-sm text-secondary block mb-1">Commissioning Delivery Timeline</label>
                <input
                  className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                  type="text"
                  value={deliveryTimeline}
                  onChange={(e) => setDeliveryTimeline(e.target.value)}
                />
              </div>
              <div>
                <label className="font-body-sm text-body-sm text-secondary block mb-1">Quotation Proposal Validity</label>
                <input
                  className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                  type="text"
                  value={validityDays}
                  onChange={(e) => setValidityDays(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-surface-container-highest self-end">
                <div>
                  <span className="font-label-md text-label-md font-bold text-on-surface block">Statutory CEIG / Net Metering</span>
                  <span className="font-body-sm text-body-sm text-secondary">Dealer Assisted Discom Liaison Included</span>
                </div>
                <input defaultChecked className="rounded text-primary-container focus:ring-primary-container w-4 h-4 cursor-pointer" type="checkbox"/>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE IMPACT PREVIEW (4 Cols) */}
        <div className="col-span-12 xl:col-span-4 sticky top-20 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-xl">preview</span>
                <h3 className="font-headline-sm text-headline-sm text-inverse-surface">Live Proposal Preview</h3>
              </div>
              <span className="font-label-xs text-label-xs bg-inverse-surface text-surface-container-lowest px-2 py-0.5 rounded font-mono">
                Simulated Output
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mb-4 leading-relaxed">
              Real-time test of how these master rates render inside dealer quotation builders before you broadcast changes across the partner portal.
            </p>

            {/* Scenario A */}
            <div className="rounded-lg border border-surface-container-highest p-4 bg-surface-container-low mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md font-bold text-inverse-surface">Scenario A: 5.0 kW Residential</span>
                <span className="font-label-xs text-label-xs bg-surface-container px-2 py-0.5 rounded text-secondary font-medium">Pune Circle</span>
              </div>
              <div className="space-y-1.5 text-body-sm text-body-sm pt-2 border-t border-surface-container-highest/60">
                <div className="flex justify-between text-secondary">
                  <span>Base Rate (5 kW × ₹{Number(rate3to10).toLocaleString()})</span>
                  <span className="text-on-surface font-medium">₹ {(5 * Number(rate3to10)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Discom &amp; Net Meter Fees</span>
                  <span className="text-on-surface font-medium">+ ₹ 7,000</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>GST (13.8% composite EPC)</span>
                  <span className="text-on-surface font-medium">+ ₹ {Math.round(5 * Number(rate3to10) * 0.138).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface font-semibold pt-1 border-t border-surface-container-highest/50">
                  <span>Gross Project Cost</span>
                  <span>₹ {Math.round(5 * Number(rate3to10) * 1.138 + 7000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-primary font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">energy_savings_leaf</span>
                    PM Surya Ghar DBT Subsidy
                  </span>
                  <span>- ₹ 78,000</span>
                </div>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-primary-container/15 border border-primary-container/30 flex items-center justify-between">
                <div>
                  <span className="font-label-xs text-label-xs text-primary uppercase font-bold tracking-wider block">Net Customer Investment</span>
                  <span className="font-headline-md text-headline-md font-bold text-primary">
                    ₹ {Math.round(5 * Number(rate3to10) * 1.138 + 7000 - 78000).toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-label-xs text-label-xs text-secondary block">Dealer Margin Room</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">₹ 26,000 (~8%)</span>
                </div>
              </div>
            </div>

            {/* Scenario B */}
            <div className="rounded-lg border border-surface-container-highest p-4 bg-surface-container-low mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md font-bold text-inverse-surface">Scenario B: 280 kW C&amp;I Rooftop</span>
                <span className="font-label-xs text-label-xs bg-surface-container px-2 py-0.5 rounded text-secondary font-medium">Gujarat GIDC</span>
              </div>
              <div className="space-y-1.5 text-body-sm text-body-sm pt-2 border-t border-surface-container-highest/60">
                <div className="flex justify-between text-secondary">
                  <span>Base Rate (280 kW × ₹{Number(rateCommercial).toLocaleString()})</span>
                  <span className="text-on-surface font-medium">₹ {(280 * Number(rateCommercial)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface font-semibold pt-1 border-t border-surface-container-highest/50">
                  <span>Gross Turnkey Estimate</span>
                  <span className="text-headline-sm font-headline-sm font-bold text-on-surface">
                    ₹ {((280 * Number(rateCommercial)) / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <div className="flex justify-between text-tertiary font-medium">
                  <span>Expected Annual Energy Savings</span>
                  <span>₹ 19.4 Lakhs / yr</span>
                </div>
                <div className="text-label-xs text-label-xs text-secondary text-right">
                  Payback Estimate: ~3.4 Years
                </div>
              </div>
            </div>

            {/* System Sync Checklist */}
            <div className="border-t border-surface-container-highest pt-4">
              <h4 className="font-label-md text-label-md font-bold text-on-surface mb-2.5">System Sync Checklist</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-body-sm text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>48 Authorized Dealers Ready to Receive</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>Discom Tariff Grids Synced (PGVCL/MSEDCL)</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>ALMM Approved Module List Validated</span>
                </div>
              </div>
              <button
                onClick={() => triggerToast('Broadcasted updated pricing catalog to WhatsApp dealer groups!')}
                className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-primary-container bg-surface-container-lowest hover:bg-primary-container/10 text-primary font-label-md text-label-md transition-colors font-semibold"
              >
                <span className="material-symbols-outlined text-lg">forum</span>
                <span>Broadcast Price Update to WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="bg-inverse-surface text-surface-container-lowest rounded-xl p-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container text-2xl shrink-0">verified_user</span>
            <div className="text-body-sm text-body-sm">
              <span className="font-semibold text-surface-container-lowest block">Immutable Audit Log</span>
              <span className="text-surface-variant/80 text-[12px]">All changes to these rates are stamped with your Executive cryptographic key.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
