import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PDF_BOS_PRICE_MATRIX } from '../../data/defaultPresets';

export default function PricingMaster() {
  const {
    pricingMaster,
    updatePricingMaster,
    addNotification,
    pdfBosMatrix,
    setPdfBosMatrix,
    pdfBomSpecs,
    officialProfile,
    dealers,
    tierMargins,
    updateTierMargins,
    modulesList,
    invertersList
  } = useApp();

  // Initialize tab from URL query param if present (?tab=base|modules|bom|bank)
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (['base', 'modules', 'bom', 'bank'].includes(tabParam)) {
        return tabParam;
      }
    }
    return 'base';
  });

  const [toastMessage, setToastMessage] = useState('');
  const totalDealersCount = dealers?.length || 550;

  // Local state for BOS Matrix editing
  const [localBosMatrix, setLocalBosMatrix] = useState(() => {
    return Array.isArray(pdfBosMatrix) && pdfBosMatrix.length > 0 ? pdfBosMatrix : PDF_BOS_PRICE_MATRIX;
  });

  // Keep local matrix synced when global state changes from outside
  useEffect(() => {
    if (Array.isArray(pdfBosMatrix) && pdfBosMatrix.length > 0) {
      setLocalBosMatrix(pdfBosMatrix);
    }
  }, [pdfBosMatrix]);

  // Modal states for Matrix Editing & Adding
  const [isInlineEditingMatrix, setIsInlineEditingMatrix] = useState(false);
  const [showAddSlabModal, setShowAddSlabModal] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [slabForm, setSlabForm] = useState({
    capacityKW: '',
    noOfModules: '',
    inverterCapacityKW: '',
    adaniBiFiPrice: '',
    apsBiFiPrice: '',
    rayzonePrice: '',
    topcon585CapacityKW: '',
    waaree585Price: '',
    topcon600CapacityKW: '',
    apsTopcon600Price: ''
  });

  // Tier margins state
  const [localTierMargins, setLocalTierMargins] = useState(() => tierMargins || {});

  // Form states initialized with pricingMaster or realistic defaults
  const [rate1to3, setRate1to3] = useState(pricingMaster?.baseRates?.tier1to3kw || 62000);
  const [rate3to10, setRate3to10] = useState(pricingMaster?.baseRates?.tier3to10kw || 58000);
  const [rateCommercial, setRateCommercial] = useState(pricingMaster?.baseRates?.tier10to50kw || 24000);

  // Default Hardware selections
  const [selectedDefaultModule, setSelectedDefaultModule] = useState(
    pricingMaster?.defaultHardware?.module || 'Waaree 585W TOPCon Bifacial (ALMM List-I)'
  );
  const [selectedDefaultInverter, setSelectedDefaultInverter] = useState(
    pricingMaster?.defaultHardware?.inverter || 'Sunvine Solaryaan 5.0G (1-Phase 2 MPPT)'
  );
  const [moduleRating, setModuleRating] = useState('585 WP TOPCon Bifacial Half-Cut');
  const [moduleEfficiency, setModuleEfficiency] = useState('22.6% STC Peak');
  const [moduleWarranty, setModuleWarranty] = useState('12 Yrs Product / 30 Yrs Linear Power Warranty');

  const [inverterTopology, setInverterTopology] = useState('1-Phase / 3-Phase Grid-Tied Cloud Wi-Fi');
  const [inverterEfficiency, setInverterEfficiency] = useState('98.6% Euro Efficiency');
  const [inverterWarranty, setInverterWarranty] = useState('8 Years Full Replacement + Remote Telemetry');

  // Bank details matching official PDF
  const [beneficiaryName, setBeneficiaryName] = useState(pricingMaster?.bankDetails?.accountName || 'SUNVINE RENEWABLE');
  const [bankName, setBankName] = useState(pricingMaster?.bankDetails?.bankName || 'HDFC BANK LTD.');
  const [accountNumber, setAccountNumber] = useState(pricingMaster?.bankDetails?.accountNumber || '99998000050580');
  const [ifscCode, setIfscCode] = useState(pricingMaster?.bankDetails?.ifscCode || 'HDFC0002012');
  const [branch, setBranch] = useState(pricingMaster?.bankDetails?.branch || 'METODA GIDC BRANCH, RAJKOT - 360021 (GUJARAT)');

  // Terms matching official PDF
  const [paymentMilestones, setPaymentMilestones] = useState('10% Advance with PO, 90% before material dispatch (All Prices GST Included)');
  const [deliveryTimeline, setDeliveryTimeline] = useState('Transport & Installation: Dealer Scope | Documents: Light Bill, Bank Detail, Aadhar, Mobile');
  const [validityDays, setValidityDays] = useState('15 Days from generation date due to commodity pricing');

  // Helper getters for robust field access across both formats
  const getModules = (row) => row.noOfModules ?? row.modules ?? '-';
  const getInverter = (row) => {
    if (row.inverterCapacityKW) return `${row.inverterCapacityKW} kW`;
    if (row.inverter) return row.inverter;
    return '-';
  };
  const getAdaniPrice = (row) => row.adaniBiFiPrice ?? row.adaniBiFi ?? 0;
  const getApsBiFiPrice = (row) => row.apsBiFiPrice ?? row.apsBiFi ?? 0;
  const getRayzonePrice = (row) => row.rayzonePrice ?? row.rayzone ?? 0;
  const getWaareePrice = (row) => row.waaree585Price ?? row.waaree585Topcon ?? 0;
  const getApsTopconPrice = (row) => row.apsTopcon600Price ?? row.apsTopcon600 ?? 0;

  // Sync tab with URL search params
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabKey);
      window.history.replaceState({ ...window.history.state, subtab: tabKey }, '', url.toString());
    }
  };

  // Listen to popstate for back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        if (['base', 'modules', 'bom', 'bank'].includes(tabParam)) {
          setActiveTab(tabParam);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Handle saving matrix changes
  const handleSaveMatrix = (updatedMatrix) => {
    const matrixToSave = updatedMatrix || localBosMatrix;
    if (setPdfBosMatrix) {
      setPdfBosMatrix(matrixToSave);
    }
    setIsInlineEditingMatrix(false);
    if (addNotification) {
      addNotification({
        type: 'success',
        icon: 'table_chart',
        title: 'BOS Price List Matrix Updated',
        description: `BOS price slabs updated across ${matrixToSave.length} capacities. Synced to all ${totalDealersCount} dealers.`,
        targetTab: 'pricing_master'
      });
    }
    triggerToast(`BOS Price Matrix saved successfully (${matrixToSave.length} capacity slabs)!`);
  };

  // Handle inline cell changes in Matrix
  const handleMatrixCellChange = (index, field, value) => {
    const updated = [...localBosMatrix];
    updated[index] = {
      ...updated[index],
      [field]: Number(value) || value
    };
    setLocalBosMatrix(updated);
  };

  // Handle adding or editing a single slab from modal
  const handleOpenAddSlabModal = () => {
    setEditingRowIndex(null);
    setSlabForm({
      capacityKW: '',
      noOfModules: '',
      inverterCapacityKW: '',
      adaniBiFiPrice: '',
      apsBiFiPrice: '',
      rayzonePrice: '',
      topcon585CapacityKW: '',
      waaree585Price: '',
      topcon600CapacityKW: '',
      apsTopcon600Price: ''
    });
    setShowAddSlabModal(true);
  };

  const handleOpenEditSlabModal = (index) => {
    const row = localBosMatrix[index];
    setEditingRowIndex(index);
    setSlabForm({
      capacityKW: row.capacityKW ?? '',
      noOfModules: getModules(row),
      inverterCapacityKW: row.inverterCapacityKW ?? row.inverter ?? '',
      adaniBiFiPrice: getAdaniPrice(row),
      apsBiFiPrice: getApsBiFiPrice(row),
      rayzonePrice: getRayzonePrice(row),
      topcon585CapacityKW: row.topcon585CapacityKW ?? '',
      waaree585Price: getWaareePrice(row),
      topcon600CapacityKW: row.topcon600CapacityKW ?? '',
      apsTopcon600Price: getApsTopconPrice(row)
    });
    setShowAddSlabModal(true);
  };

  const handleSaveSlabForm = (e) => {
    e.preventDefault();
    if (!slabForm.capacityKW) {
      triggerToast('Please provide a capacity (kW)');
      return;
    }

    const newRow = {
      capacityKW: Number(slabForm.capacityKW) || slabForm.capacityKW,
      noOfModules: Number(slabForm.noOfModules) || slabForm.noOfModules,
      inverterCapacityKW: Number(slabForm.inverterCapacityKW) || slabForm.inverterCapacityKW,
      adaniBiFiPrice: Number(slabForm.adaniBiFiPrice) || 0,
      apsBiFiPrice: Number(slabForm.apsBiFiPrice) || 0,
      rayzonePrice: Number(slabForm.rayzonePrice) || 0,
      topcon585CapacityKW: Number(slabForm.topcon585CapacityKW) || Number(slabForm.capacityKW),
      waaree585Price: Number(slabForm.waaree585Price) || 0,
      topcon600CapacityKW: Number(slabForm.topcon600CapacityKW) || Number(slabForm.capacityKW),
      apsTopcon600Price: Number(slabForm.apsTopcon600Price) || 0
    };

    let updated;
    if (editingRowIndex !== null && editingRowIndex >= 0) {
      updated = [...localBosMatrix];
      updated[editingRowIndex] = newRow;
      triggerToast(`Updated ${newRow.capacityKW} kW pricing slab!`);
    } else {
      updated = [...localBosMatrix, newRow];
      // Sort by capacityKW ascending
      updated.sort((a, b) => (Number(a.capacityKW) || 0) - (Number(b.capacityKW) || 0));
      triggerToast(`Added new ${newRow.capacityKW} kW pricing slab!`);
    }

    setLocalBosMatrix(updated);
    if (setPdfBosMatrix) {
      setPdfBosMatrix(updated);
    }
    setShowAddSlabModal(false);
  };

  const handleDeleteSlab = (index) => {
    const row = localBosMatrix[index];
    if (window.confirm(`Are you sure you want to delete the ${row.capacityKW} kW pricing slab?`)) {
      const updated = localBosMatrix.filter((_, i) => i !== index);
      setLocalBosMatrix(updated);
      if (setPdfBosMatrix) {
        setPdfBosMatrix(updated);
      }
      triggerToast(`Deleted ${row.capacityKW} kW slab`);
    }
  };

  const handleResetMatrixToDefault = () => {
    if (window.confirm('Reset the BOS Price Matrix to the official PDF defaults?')) {
      setLocalBosMatrix(PDF_BOS_PRICE_MATRIX);
      if (setPdfBosMatrix) {
        setPdfBosMatrix(PDF_BOS_PRICE_MATRIX);
      }
      triggerToast('Reset BOS Price Matrix to official PDF defaults');
    }
  };

  const handleSave = (e) => {
    e?.preventDefault();
    if (updatePricingMaster) {
      updatePricingMaster({
        baseRates: {
          tier1to3kw: Number(rate1to3),
          tier3to10kw: Number(rate3to10),
          tier10to50kw: Number(rateCommercial),
          tierAbove50kw: Number(rateCommercial),
        },
        defaultHardware: {
          module: selectedDefaultModule,
          inverter: selectedDefaultInverter
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
    if (setPdfBosMatrix) {
      setPdfBosMatrix(localBosMatrix);
    }
    if (addNotification) {
      addNotification({
        type: 'info',
        icon: 'bolt',
        title: 'Master EPC Pricing & Presets Published',
        description: `Admin revised benchmark rates & presets. Synced across ${totalDealersCount} Gujarat dealers.`,
        targetTab: 'pricing_master'
      });
    }
    triggerToast(`Master pricing & presets published successfully to ${totalDealersCount} Gujarat dealers!`);
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
            Configure baseline turnkey equipment pricing from official Sunvine BOS Price List, DBT subsidy matrices, standard BOM, banking instruments, and commercial terms enforced across {totalDealersCount} authorized Gujarat dealers.
          </p>
        </div>
        {/* Header Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start xl:self-center shrink-0">
          <button
            onClick={() => {
              setRate1to3(62000);
              setRate3to10(58000);
              setRateCommercial(24000);
              handleResetMatrixToDefault();
              triggerToast('Reset to default system presets');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface hover:bg-surface-container-low text-label-md font-label-md transition-colors shadow-sm text-xs sm:text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg text-secondary">restart_alt</span>
            <span>Reset to Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-surface-container-lowest font-label-md text-label-md transition-colors shadow-sm text-xs sm:text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">cloud_sync</span>
            <span>Save &amp; Publish Changes</span>
            <span className="ml-1 text-[10px] font-bold uppercase bg-surface-container-lowest/20 px-1.5 py-0.5 rounded">{totalDealersCount} Dealers</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar with Active Highlighting */}
      <div className="flex items-center gap-2 border-b border-surface-container-highest mt-4 overflow-x-auto no-scrollbar pb-0.5 max-w-full">
        <button
          type="button"
          onClick={() => handleTabChange('base')}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-label-md tracking-tight whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeTab === 'base'
              ? 'border-primary text-inverse-surface font-bold bg-surface-container-low/40 rounded-t-lg'
              : 'border-transparent text-secondary hover:text-on-surface hover:bg-surface-container-lowest/50'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">payments</span>
          <span>Base Pricing &amp; Subsidy Slabs</span>
          {activeTab === 'base' ? (
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold">
              Active
            </span>
          ) : (
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container text-secondary">
              BOS &amp; Slabs
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('modules')}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-label-md tracking-tight whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeTab === 'modules'
              ? 'border-primary text-inverse-surface font-bold bg-surface-container-low/40 rounded-t-lg'
              : 'border-transparent text-secondary hover:text-on-surface hover:bg-surface-container-lowest/50'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">solar_power</span>
          <span>Modules &amp; Inverters Master</span>
          {activeTab === 'modules' ? (
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold">
              Active
            </span>
          ) : (
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container text-secondary">
              {(modulesList?.length || 8) + (invertersList?.length || 6)} Items
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('bom')}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-label-md tracking-tight whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeTab === 'bom'
              ? 'border-primary text-inverse-surface font-bold bg-surface-container-low/40 rounded-t-lg'
              : 'border-transparent text-secondary hover:text-on-surface hover:bg-surface-container-lowest/50'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          <span>Default Bill of Material (BOM)</span>
          {activeTab === 'bom' ? (
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold">
              Active
            </span>
          ) : (
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container text-secondary">
              {pdfBomSpecs?.length || 8} Slabs
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('bank')}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 font-label-md tracking-tight whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            activeTab === 'bank'
              ? 'border-primary text-inverse-surface font-bold bg-surface-container-low/40 rounded-t-lg'
              : 'border-transparent text-secondary hover:text-on-surface hover:bg-surface-container-lowest/50'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">account_balance</span>
          <span>Company Bank Details &amp; Terms &amp; Conditions</span>
          {activeTab === 'bank' ? (
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold">
              Active
            </span>
          ) : (
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container text-secondary">
              Legal &amp; Bank
            </span>
          )}
        </button>
      </div>

      {/* Main Workspace Two-Column Bento Layout */}
      <div className="grid grid-cols-12 gap-6 mt-6 items-start">
        {/* LEFT CONFIGURATION STACK (8 Cols) — Conditionally renders only active tab content */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">

          {/* ========================================================================= */}
          {/* TAB 1: BASE PRICING & SUBSIDY SLABS                                      */}
          {/* ========================================================================= */}
          {activeTab === 'base' && (
            <>
              {/* OFFICIAL PDF BOS PRICE LIST MATRIX (NOW FULLY EDITABLE WITH ADD/EDIT CONTROLS) */}
              <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-surface-container-low gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                      <span className="material-symbols-outlined text-xl">table_chart</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-headline-md text-headline-md text-inverse-surface font-bold">
                          Sunvine Official BOS Price List Matrix
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[11px] font-bold">
                          {localBosMatrix.length} Slabs
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                        GST Included • Transport &amp; Fitting Dealer Scope • Click &quot;Edit Matrix&quot; or &quot;+ Add Slab&quot; to customize prices.
                      </p>
                    </div>
                  </div>

                  {/* Matrix Actions: Add Slab & Toggle Inline Editing */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={handleOpenAddSlabModal}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-container/15 hover:bg-primary-container/25 text-primary text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>Add Slab</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (isInlineEditingMatrix) {
                          handleSaveMatrix();
                        } else {
                          setIsInlineEditingMatrix(true);
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        isInlineEditingMatrix
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isInlineEditingMatrix ? 'check' : 'edit'}
                      </span>
                      <span>{isInlineEditingMatrix ? 'Save Matrix' : 'Edit Matrix'}</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-inverse-surface text-surface-container-lowest text-label-sm font-semibold h-10 border-none">
                        <th className="px-3 py-2 text-xs">KW</th>
                        <th className="px-3 py-2 text-xs">Modules</th>
                        <th className="px-3 py-2 text-xs">Inverter</th>
                        <th className="px-3 py-2 text-xs text-right">Adani Bi-Fi</th>
                        <th className="px-3 py-2 text-xs text-right">APS Bi-Fi</th>
                        <th className="px-3 py-2 text-xs text-right">Rayzone</th>
                        <th className="px-3 py-2 text-xs text-right">Waaree 585W TOPCon</th>
                        <th className="px-3 py-2 text-xs text-right">APS TOPCon 600W</th>
                        <th className="px-3 py-2 text-xs text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest font-body-sm text-xs text-on-surface">
                      {localBosMatrix.map((row, idx) => (
                        <tr key={idx} className={`hover:bg-surface-container-low/60 transition-colors ${idx % 2 === 1 ? 'bg-surface-container-low/20' : ''}`}>
                          {/* Capacity KW */}
                          <td className="px-3 py-2.5 font-bold font-mono text-inverse-surface">
                            {isInlineEditingMatrix ? (
                              <input
                                type="number"
                                step="0.01"
                                value={row.capacityKW}
                                onChange={(e) => handleMatrixCellChange(idx, 'capacityKW', e.target.value)}
                                className="w-16 px-1.5 py-1 bg-surface-container-lowest border border-surface-container-highest rounded text-xs font-mono font-bold"
                              />
                            ) : (
                              `${row.capacityKW} kW`
                            )}
                          </td>

                          {/* No of Modules */}
                          <td className="px-3 py-2.5 font-semibold text-primary font-mono">
                            {isInlineEditingMatrix ? (
                              <input
                                type="number"
                                value={getModules(row)}
                                onChange={(e) => handleMatrixCellChange(idx, 'noOfModules', e.target.value)}
                                className="w-14 px-1.5 py-1 bg-surface-container-lowest border border-surface-container-highest rounded text-xs font-mono text-primary font-bold"
                              />
                            ) : (
                              `${getModules(row)} Mod`
                            )}
                          </td>

                          {/* Inverter Capacity */}
                          <td className="px-3 py-2.5 font-mono">
                            {isInlineEditingMatrix ? (
                              <input
                                type="text"
                                value={row.inverterCapacityKW ?? row.inverter ?? ''}
                                onChange={(e) => handleMatrixCellChange(idx, 'inverterCapacityKW', e.target.value)}
                                className="w-16 px-1.5 py-1 bg-surface-container-lowest border border-surface-container-highest rounded text-xs font-mono"
                              />
                            ) : (
                              getInverter(row)
                            )}
                          </td>

                          {/* Adani Bi-Fi */}
                          <td className="px-3 py-2.5 text-right font-mono font-semibold">
                            {isInlineEditingMatrix ? (
                              <input
                                type="number"
                                value={getAdaniPrice(row)}
                                onChange={(e) => handleMatrixCellChange(idx, 'adaniBiFiPrice', e.target.value)}
                                className="w-24 px-1.5 py-1 bg-surface-container-lowest border border-surface-container-highest rounded text-xs text-right font-mono"
                              />
                            ) : (
                              `₹ ${Number(getAdaniPrice(row)).toLocaleString('en-IN')}`
                            )}
                          </td>

                          {/* APS Bi-Fi */}
                          <td className="px-3 py-2.5 text-right font-mono font-semibold">
                            {isInlineEditingMatrix ? (
                              <input
                                type="number"
                                value={getApsBiFiPrice(row)}
                                onChange={(e) => handleMatrixCellChange(idx, 'apsBiFiPrice', e.target.value)}
                                className="w-24 px-1.5 py-1 bg-surface-container-lowest border border-surface-container-highest rounded text-xs text-right font-mono"
                              />
                            ) : (
                              `₹ ${Number(getApsBiFiPrice(row)).toLocaleString('en-IN')}`
                            )}
                          </td>

                          {/* Rayzone */}
                          <td className="px-3 py-2.5 text-right font-mono font-semibold">
                            {isInlineEditingMatrix ? (
                              <input
                                type="number"
                                value={getRayzonePrice(row)}
                                onChange={(e) => handleMatrixCellChange(idx, 'rayzonePrice', e.target.value)}
                                className="w-24 px-1.5 py-1 bg-surface-container-lowest border border-surface-container-highest rounded text-xs text-right font-mono"
                              />
                            ) : (
                              `₹ ${Number(getRayzonePrice(row)).toLocaleString('en-IN')}`
                            )}
                          </td>

                          {/* Waaree 585W TOPCon */}
                          <td className="px-3 py-2.5 text-right font-mono font-bold text-primary">
                            {isInlineEditingMatrix ? (
                              <input
                                type="number"
                                value={getWaareePrice(row)}
                                onChange={(e) => handleMatrixCellChange(idx, 'waaree585Price', e.target.value)}
                                className="w-24 px-1.5 py-1 bg-surface-container-lowest border border-surface-container-highest rounded text-xs text-right font-mono text-primary font-bold"
                              />
                            ) : (
                              `₹ ${Number(getWaareePrice(row)).toLocaleString('en-IN')}`
                            )}
                          </td>

                          {/* APS TOPCon 600W */}
                          <td className="px-3 py-2.5 text-right font-mono font-bold text-[#256676]">
                            {isInlineEditingMatrix ? (
                              <input
                                type="number"
                                value={getApsTopconPrice(row)}
                                onChange={(e) => handleMatrixCellChange(idx, 'apsTopcon600Price', e.target.value)}
                                className="w-24 px-1.5 py-1 bg-surface-container-lowest border border-surface-container-highest rounded text-xs text-right font-mono text-[#256676] font-bold"
                              />
                            ) : (
                              `₹ ${Number(getApsTopconPrice(row)).toLocaleString('en-IN')}`
                            )}
                          </td>

                          {/* Actions: Edit Modal / Delete */}
                          <td className="px-3 py-2.5 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleOpenEditSlabModal(idx)}
                                className="p-1 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors cursor-pointer"
                                title="Edit this slab in modal"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSlab(idx)}
                                className="p-1 rounded hover:bg-rose-50 text-secondary hover:text-rose-600 transition-colors cursor-pointer"
                                title="Delete this slab"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {isInlineEditingMatrix && (
                  <div className="mt-4 pt-3 border-t border-surface-container-low flex items-center justify-between">
                    <span className="text-xs text-secondary italic">
                      Tip: Modify the input fields directly in the table, then click &quot;Save Matrix Changes&quot; to apply.
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSaveMatrix()}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-label-md text-xs font-bold rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      <span>Save Matrix Changes</span>
                    </button>
                  </div>
                )}
              </div>

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

              {/* SECTION B.2: Dealer Commission Tiers & Default Margins */}
              <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-surface-container-low gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                      <span className="material-symbols-outlined text-xl">price_check</span>
                    </div>
                    <div>
                      <h2 className="font-headline-md text-headline-md text-inverse-surface">
                        Dealer Commission Tiers &amp; Default Margin Ceilings
                      </h2>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Configure base dealer margins and anti-gouging regulatory caps automatically enforced per partner tier.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (updateTierMargins) {
                        updateTierMargins(localTierMargins);
                      }
                      triggerToast(`Tier default margins saved and broadcasted to ${totalDealersCount} Gujarat dealers!`);
                    }}
                    className="px-4 py-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs sm:text-sm font-bold rounded-lg transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    <span>Save Tier Margins</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'diamond', name: 'Diamond EPC Partner', desc: 'Premier High-Volume Partners (> 5.0 MW/quarter)', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                    { key: 'platinum', name: 'Platinum Tier', desc: 'Tier-1 Large Scale EPC (> 3.0 MW/quarter)', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                    { key: 'gold', name: 'Gold EPC Partner', desc: 'Established Standard Installers (1.5 - 3.0 MW/quarter)', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { key: 'silver', name: 'Silver Installer', desc: 'Entry / Regional Empanelled Installers (< 1.5 MW/quarter)', badge: 'bg-slate-100 text-slate-700 border-slate-300' }
                  ].map((tier) => {
                    const conf = localTierMargins[tier.key] || tierMargins?.[tier.key] || { defaultMarginPerKw: 4500, maxMarginCapPerKw: 6000 };
                    return (
                      <div key={tier.key} className="p-4 rounded-xl border border-surface-container-highest bg-surface-container-low/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${tier.badge}`}>
                            {tier.name}
                          </span>
                        </div>
                        <p className="text-xs text-secondary">{tier.desc}</p>
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1">
                              Default Margin (₹/kW)
                            </label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3 text-secondary font-bold text-xs">₹</span>
                              <input
                                type="number"
                                value={conf.defaultMarginPerKw}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setLocalTierMargins((prev) => ({
                                    ...prev,
                                    [tier.key]: {
                                      ...(prev[tier.key] || tierMargins[tier.key]),
                                      defaultMarginPerKw: val
                                    }
                                  }));
                                }}
                                className="w-full h-9 pl-7 pr-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-xs font-bold text-on-surface focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1">
                              Ceiling Cap (₹/kW)
                            </label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3 text-secondary font-bold text-xs">₹</span>
                              <input
                                type="number"
                                value={conf.maxMarginCapPerKw}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setLocalTierMargins((prev) => ({
                                    ...prev,
                                    [tier.key]: {
                                      ...(prev[tier.key] || tierMargins[tier.key]),
                                      maxMarginCapPerKw: val
                                    }
                                  }));
                                }}
                                className="w-full h-9 pl-7 pr-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-xs font-bold text-on-surface focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MODULES & INVERTERS MASTER                                         */}
          {/* ========================================================================= */}
          {activeTab === 'modules' && (
            <>
              {/* Hardware Defaults Form for Quotation Generator */}
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
                        <select
                          value={selectedDefaultModule}
                          onChange={(e) => setSelectedDefaultModule(e.target.value)}
                          className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                        >
                          <option>Waaree 585W TOPCon Bifacial (ALMM List-I)</option>
                          <option>APS 600W TOPCon Bifacial (ALMM List-I)</option>
                          <option>Adani Bi-Fi 550W Vertex Mono PERC</option>
                          <option>APS Bi-Fi 550W Mono Bifacial</option>
                          <option>Rayzone 550W Bifacial TOPCon</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-body-sm text-body-sm text-secondary block mb-1">Module Rating</label>
                          <input
                            className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                            type="text"
                            value={moduleRating}
                            onChange={(e) => setModuleRating(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="font-body-sm text-body-sm text-secondary block mb-1">Module Efficiency</label>
                          <input
                            className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                            type="text"
                            value={moduleEfficiency}
                            onChange={(e) => setModuleEfficiency(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-body-sm text-body-sm text-secondary block mb-1">Warranty Term Rendered on PDF</label>
                        <input
                          className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                          type="text"
                          value={moduleWarranty}
                          onChange={(e) => setModuleWarranty(e.target.value)}
                        />
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
                        <select
                          value={selectedDefaultInverter}
                          onChange={(e) => setSelectedDefaultInverter(e.target.value)}
                          className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                        >
                          <option>Sunvine Solaryaan 5.0G (1-Phase 2 MPPT)</option>
                          <option>Solis S6 Pro Series 5kW 3-Phase</option>
                          <option>Sungrow SG5.0RS Residential Grid-Tied</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-body-sm text-body-sm text-secondary block mb-1">Topology &amp; Interface</label>
                          <input
                            className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                            type="text"
                            value={inverterTopology}
                            onChange={(e) => setInverterTopology(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="font-body-sm text-body-sm text-secondary block mb-1">Peak Efficiency</label>
                          <input
                            className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                            type="text"
                            value={inverterEfficiency}
                            onChange={(e) => setInverterEfficiency(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-body-sm text-body-sm text-secondary block mb-1">Warranty Term Rendered on PDF</label>
                        <input
                          className="w-full py-2 px-3 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface"
                          type="text"
                          value={inverterWarranty}
                          onChange={(e) => setInverterWarranty(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Master Catalog: Approved Solar Modules */}
              <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-surface-container-low gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                      <span className="material-symbols-outlined text-xl">grid_view</span>
                    </div>
                    <div>
                      <h2 className="font-headline-md text-headline-md text-inverse-surface font-bold">
                        Approved Solar Modules Master Catalog
                      </h2>
                      <p className="font-body-sm text-body-sm text-secondary">
                        ALMM List-I compliant high-efficiency bifacial &amp; mono PERC modules for Gujarat installations.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs bg-primary-container/15 text-primary px-2.5 py-1 rounded-full font-bold">
                    {modulesList?.length || 5} ALMM Models
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[680px]">
                    <thead>
                      <tr className="bg-inverse-surface text-surface-container-lowest text-label-sm font-semibold h-10 border-none">
                        <th className="px-3 py-2 text-xs">Brand &amp; Make</th>
                        <th className="px-3 py-2 text-xs">Model Name</th>
                        <th className="px-3 py-2 text-xs">Cell Technology</th>
                        <th className="px-3 py-2 text-xs text-center">Wattage (Wp)</th>
                        <th className="px-3 py-2 text-xs text-center">Efficiency</th>
                        <th className="px-3 py-2 text-right">Benchmark Wp Rate</th>
                        <th className="px-3 py-2 text-right">Warranty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest font-body-sm text-xs text-on-surface">
                      {(modulesList || [
                        { brand: 'Waaree', model: '585W TOPCon Bifacial', cellTech: 'N-Type TOPCon', wattage: 585, efficiency: '22.6%', ratePerWp: '₹ 19.80/Wp', warranty: '30 Yrs' },
                        { brand: 'APS', model: '600W TOPCon Bifacial', cellTech: 'N-Type TOPCon', wattage: 600, efficiency: '22.8%', ratePerWp: '₹ 19.20/Wp', warranty: '30 Yrs' },
                        { brand: 'Adani', model: '550W Vertex Mono PERC', cellTech: 'Mono PERC Bi-Fi', wattage: 550, efficiency: '21.5%', ratePerWp: '₹ 20.10/Wp', warranty: '25 Yrs' },
                        { brand: 'APS', model: '550W Mono Bifacial', cellTech: 'Mono Bifacial', wattage: 550, efficiency: '21.4%', ratePerWp: '₹ 18.90/Wp', warranty: '25 Yrs' },
                        { brand: 'Rayzone', model: '550W Bifacial TOPCon', cellTech: 'TOPCon Bifacial', wattage: 550, efficiency: '21.5%', ratePerWp: '₹ 18.90/Wp', warranty: '25 Yrs' }
                      ]).map((mod, idx) => (
                        <tr key={idx} className="hover:bg-surface-container-low/60 transition-colors">
                          <td className="px-3 py-2.5 font-bold text-inverse-surface">{mod.brand}</td>
                          <td className="px-3 py-2.5 font-medium text-primary">{mod.model}</td>
                          <td className="px-3 py-2.5 text-secondary">{mod.cellTech}</td>
                          <td className="px-3 py-2.5 text-center font-mono font-bold text-on-surface">{mod.wattage} W</td>
                          <td className="px-3 py-2.5 text-center font-mono">{mod.efficiency}</td>
                          <td className="px-3 py-2.5 text-right font-mono font-semibold text-inverse-surface">{mod.ratePerWp}</td>
                          <td className="px-3 py-2.5 text-right text-secondary">{mod.warranty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Master Catalog: Approved Solar Inverters */}
              <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-surface-container-low gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                      <span className="material-symbols-outlined text-xl">bolt</span>
                    </div>
                    <div>
                      <h2 className="font-headline-md text-headline-md text-inverse-surface font-bold">
                        Approved Solar Inverters Master Catalog
                      </h2>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Grid-tied string inverters with built-in Wi-Fi monitoring and dual MPPT algorithms.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs bg-primary-container/15 text-primary px-2.5 py-1 rounded-full font-bold">
                    {invertersList?.length || 4} Certified Series
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[680px]">
                    <thead>
                      <tr className="bg-inverse-surface text-surface-container-lowest text-label-sm font-semibold h-10 border-none">
                        <th className="px-3 py-2 text-xs">Brand</th>
                        <th className="px-3 py-2 text-xs">Series / Model</th>
                        <th className="px-3 py-2 text-xs text-center">Rated Capacity</th>
                        <th className="px-3 py-2 text-xs">Phase Topology</th>
                        <th className="px-3 py-2 text-xs text-center">Peak Efficiency</th>
                        <th className="px-3 py-2 text-right">Warranty Term</th>
                        <th className="px-3 py-2 text-center">Cloud Sync</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest font-body-sm text-xs text-on-surface">
                      {(invertersList || [
                        { brand: 'Sunvine', model: 'Solaryaan 5.0G', capacity: '5.0 kW', phase: '1-Phase 230V / 2 MPPT', efficiency: '98.6%', warranty: '8 Years', cloud: 'Integrated Wi-Fi' },
                        { brand: 'Solis', model: 'S6-GR1P-5K', capacity: '5.0 kW', phase: '1-Phase 230V / 2 MPPT', efficiency: '98.4%', warranty: '8 Years', cloud: 'SolisCloud' },
                        { brand: 'Sungrow', model: 'SG5.0RS', capacity: '5.0 kW', phase: '1-Phase 230V / 2 MPPT', efficiency: '98.5%', warranty: '8 Years', cloud: 'iSolarCloud' },
                        { brand: 'Growatt', model: 'MIN 5000TL-X', capacity: '5.0 kW', phase: '1-Phase 230V / 2 MPPT', efficiency: '98.4%', warranty: '5 Years', cloud: 'ShineServer' }
                      ]).map((inv, idx) => (
                        <tr key={idx} className="hover:bg-surface-container-low/60 transition-colors">
                          <td className="px-3 py-2.5 font-bold text-inverse-surface">{inv.brand}</td>
                          <td className="px-3 py-2.5 font-medium text-primary">{inv.model}</td>
                          <td className="px-3 py-2.5 text-center font-mono font-bold text-on-surface">{inv.capacity}</td>
                          <td className="px-3 py-2.5 text-secondary">{inv.phase}</td>
                          <td className="px-3 py-2.5 text-center font-mono">{inv.efficiency}</td>
                          <td className="px-3 py-2.5 text-right font-mono font-semibold text-inverse-surface">{inv.warranty}</td>
                          <td className="px-3 py-2.5 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-container/20 text-primary">
                              {inv.cloud || 'Wi-Fi IoT'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: DEFAULT BILL OF MATERIAL (BOM)                                     */}
          {/* ========================================================================= */}
          {activeTab === 'bom' && (
            <>
              <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-surface-container-low gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                      <span className="material-symbols-outlined text-xl">inventory_2</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-headline-md text-headline-md text-inverse-surface font-bold">
                          Sunvine Official Standard Bill of Material (BOM)
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[11px] font-bold">
                          PDF Specifications
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                        Capacity-wise baseline electrical hardware, cables, conduits, and surge protection components included in quote calculations.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs bg-surface-container-low text-secondary px-2.5 py-1 rounded border border-surface-container-highest self-start sm:self-center">
                    IS &amp; IEC Standard Compliant
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[840px]">
                    <thead>
                      <tr className="bg-inverse-surface text-surface-container-lowest text-label-sm font-semibold h-10 border-none">
                        <th className="px-3 py-2 text-xs">Capacity</th>
                        <th className="px-3 py-2 text-xs">Modules</th>
                        <th className="px-3 py-2 text-xs">Inverter</th>
                        <th className="px-3 py-2 text-xs">DC Cable</th>
                        <th className="px-3 py-2 text-xs">AC Cable</th>
                        <th className="px-3 py-2 text-xs">Earthing</th>
                        <th className="px-3 py-2 text-xs">LA Wire</th>
                        <th className="px-3 py-2 text-xs">ACDB / DCDB</th>
                        <th className="px-3 py-2 text-xs">Earthing Kit</th>
                        <th className="px-3 py-2 text-xs">MC4</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest font-body-sm text-xs text-on-surface">
                      {(pdfBomSpecs || []).map((bom, idx) => (
                        <tr key={idx} className={`hover:bg-surface-container-low/60 transition-colors ${idx % 2 === 1 ? 'bg-surface-container-low/20' : ''}`}>
                          <td className="px-3 py-2.5 font-bold font-mono text-inverse-surface">{bom.capacityKW} kW</td>
                          <td className="px-3 py-2.5 font-semibold text-primary font-mono">{bom.modules}</td>
                          <td className="px-3 py-2.5 font-mono">{bom.inverter}</td>
                          <td className="px-3 py-2.5 font-mono text-secondary">{bom.dcWire}</td>
                          <td className="px-3 py-2.5 font-mono text-secondary">{bom.acWire}</td>
                          <td className="px-3 py-2.5 font-mono text-secondary">{bom.earthingWire}</td>
                          <td className="px-3 py-2.5 font-mono text-secondary">{bom.laWire}</td>
                          <td className="px-3 py-2.5 text-on-surface">{bom.acdb} / {bom.dcdb}</td>
                          <td className="px-3 py-2.5 text-secondary">{bom.earthingKit}</td>
                          <td className="px-3 py-2.5 font-mono text-primary font-bold">{bom.mc4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Technical Quality Standards Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-xl">foundation</span>
                    <h3 className="font-label-md text-label-md font-bold text-inverse-surface">Mounting Structure</h3>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    Hot-Dip Galvanized (HDG) steel structure with 80+ microns coating thickness. Engineered to withstand 150 km/h wind speeds in Gujarat coastal zones.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-xl">cable</span>
                    <h3 className="font-label-md text-label-md font-bold text-inverse-surface">Solar DC &amp; AC Cables</h3>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    TUV Rheinland certified UV-resistant cross-linked halogen-free solar DC cables. Pure electrolytic copper conductors with minimal voltage drop (&lt; 2%).
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-xl">shield</span>
                    <h3 className="font-label-md text-label-md font-bold text-inverse-surface">Earthing &amp; Protection</h3>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    Dual inverter grounding with chemical earth electrodes. Class-II Surge Protection Devices (SPD) installed in both ACDB and DCDB enclosures.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: COMPANY BANK DETAILS & TERMS & CONDITIONS                          */}
          {/* ========================================================================= */}
          {activeTab === 'bank' && (
            <>
              {/* SECTION D: Official Bank Account for Quotation PDF Footer */}
              <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-low">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                      <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                    </div>
                    <div>
                      <h2 className="font-headline-md text-headline-md text-inverse-surface">Official Remittance Account (Customer Quotation Footer)</h2>
                      <p className="font-body-sm text-body-sm text-secondary">Verified Sunvine bank details automatically injected into payment schedules and PDF footers (from official PDF).</p>
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
                      <p className="font-body-sm text-body-sm text-secondary">Default clause presets appended to dealer quotation terms from Sunvine price matrix.</p>
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
            </>
          )}

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
                Gujarat Simulated
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mb-4 leading-relaxed">
              Real-time test of how these master rates render inside dealer quotation builders before you broadcast changes across {totalDealersCount} partner portal accounts.
            </p>

            {/* Scenario A */}
            <div className="rounded-lg border border-surface-container-highest p-4 bg-surface-container-low mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md font-bold text-inverse-surface">Scenario A: 5.0 kW Residential</span>
                <span className="font-label-xs text-label-xs bg-surface-container px-2 py-0.5 rounded text-secondary font-medium">Rajkot Circle (PGVCL)</span>
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
                <span className="font-label-xs text-label-xs bg-surface-container px-2 py-0.5 rounded text-secondary font-medium">Gujarat GIDC (Metoda)</span>
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
                  <span>{totalDealersCount} Authorized Gujarat Dealers Ready to Receive</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>Discom Tariff Grids Synced (PGVCL / DGVCL / UGVCL / MGVCL)</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>ALMM Approved Module List Validated</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => triggerToast('Broadcasted updated pricing catalog to WhatsApp dealer groups!')}
                className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-primary-container bg-surface-container-lowest hover:bg-primary-container/10 text-primary font-label-md text-label-md transition-colors font-semibold cursor-pointer"
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

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PRICING SLAB                                            */}
      {/* ========================================================================= */}
      {showAddSlabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-low">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                  <span className="material-symbols-outlined text-xl">
                    {editingRowIndex !== null ? 'edit_note' : 'add_chart'}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-inverse-surface">
                    {editingRowIndex !== null ? `Edit ${slabForm.capacityKW} kW Pricing Slab` : 'Add New Capacity Pricing Slab'}
                  </h3>
                  <p className="text-xs text-secondary">
                    Define equipment specs and manufacturer prices (GST Included).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSlabModal(false)}
                className="p-1.5 rounded-lg hover:bg-surface-container text-secondary hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveSlabForm} className="space-y-4">
              {/* Capacity & Core Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    System Capacity (kW) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={slabForm.capacityKW}
                    onChange={(e) => setSlabForm({ ...slabForm, capacityKW: e.target.value })}
                    placeholder="e.g. 5.5"
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-xs font-mono font-bold text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    No. of Solar Modules *
                  </label>
                  <input
                    type="number"
                    required
                    value={slabForm.noOfModules}
                    onChange={(e) => setSlabForm({ ...slabForm, noOfModules: e.target.value })}
                    placeholder="e.g. 10"
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-xs font-mono font-bold text-primary focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Inverter Rating (kW)
                  </label>
                  <input
                    type="text"
                    value={slabForm.inverterCapacityKW}
                    onChange={(e) => setSlabForm({ ...slabForm, inverterCapacityKW: e.target.value })}
                    placeholder="e.g. 5.0 or 6"
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Module Prices by Brand */}
              <div className="border-t border-surface-container-high pt-3">
                <h4 className="text-xs font-bold text-inverse-surface uppercase tracking-wider mb-2.5">
                  Manufacturer Package Prices (₹ Total Including GST)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1">
                      Adani Bi-Fi Package (₹)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-secondary font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={slabForm.adaniBiFiPrice}
                        onChange={(e) => setSlabForm({ ...slabForm, adaniBiFiPrice: e.target.value })}
                        placeholder="e.g. 202950"
                        className="w-full pl-7 pr-3 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-xs font-mono font-semibold text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1">
                      APS Bi-Fi Package (₹)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-secondary font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={slabForm.apsBiFiPrice}
                        onChange={(e) => setSlabForm({ ...slabForm, apsBiFiPrice: e.target.value })}
                        placeholder="e.g. 183150"
                        className="w-full pl-7 pr-3 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-xs font-mono font-semibold text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1">
                      Rayzone Package (₹)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-secondary font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={slabForm.rayzonePrice}
                        onChange={(e) => setSlabForm({ ...slabForm, rayzonePrice: e.target.value })}
                        placeholder="e.g. 183150"
                        className="w-full pl-7 pr-3 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-xs font-mono font-semibold text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary mb-1">
                      Waaree 585W TOPCon Package (₹)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-primary font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={slabForm.waaree585Price}
                        onChange={(e) => setSlabForm({ ...slabForm, waaree585Price: e.target.value })}
                        placeholder="e.g. 225120"
                        className="w-full pl-7 pr-3 py-2 bg-surface-container-lowest border border-primary/40 rounded-lg text-xs font-mono font-bold text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#256676] mb-1">
                      APS TOPCon 600W Package (₹)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-[#256676] font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={slabForm.apsTopcon600Price}
                        onChange={(e) => setSlabForm({ ...slabForm, apsTopcon600Price: e.target.value })}
                        placeholder="e.g. 216000"
                        className="w-full pl-7 pr-3 py-2 bg-surface-container-lowest border border-[#256676]/40 rounded-lg text-xs font-mono font-bold text-[#256676] focus:outline-none focus:border-[#256676]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-surface-container-low">
                <button
                  type="button"
                  onClick={() => setShowAddSlabModal(false)}
                  className="px-4 py-2 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-secondary hover:text-on-surface text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary-container hover:bg-primary text-surface-container-lowest text-xs font-bold shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>{editingRowIndex !== null ? 'Update Slab' : 'Save New Slab'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
