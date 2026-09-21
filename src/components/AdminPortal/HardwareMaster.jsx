import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function HardwareMaster() {
  const { modulesList, setModulesList, invertersList, setInvertersList, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'inverters' | 'bos'
  const [moduleSearch, setModuleSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [showAddInverterModal, setShowAddInverterModal] = useState(false);

  const [moduleForm, setModuleForm] = useState({
    brand: '',
    model: '',
    cellTech: 'TOPCon Mono Bifacial',
    wattage: '550',
    efficiency: '22.6%',
    ratePerWp: '19.20',
    warranty: '30 Years Performance'
  });

  const [inverterForm, setInverterForm] = useState({
    brand: '',
    model: '',
    capacity: '5 kW',
    phase: '3-Phase 415V',
    efficiency: '98.4%',
    warranty: '10 Years'
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveModule = (e) => {
    e.preventDefault();
    if (!moduleForm.brand.trim() || !moduleForm.model.trim()) return;
    const newMod = {
      id: `mod-${Date.now()}`,
      brand: moduleForm.brand.trim(),
      model: moduleForm.model.trim(),
      cellTech: moduleForm.cellTech,
      wattage: Number(moduleForm.wattage) || 550,
      efficiency: moduleForm.efficiency,
      ratePerWp: `₹ ${moduleForm.ratePerWp}/Wp`,
      warranty: moduleForm.warranty
    };
    if (setModulesList) {
      setModulesList(prev => [...(prev || []), newMod]);
    }
    if (addNotification) {
      addNotification({
        type: 'success',
        icon: 'solar_power',
        title: `New Solar Module Added: ${newMod.brand} ${newMod.model}`,
        description: `High-efficiency ${newMod.wattage}W (${newMod.cellTech}) added to hardware catalog.`,
        targetTab: 'hardware_master'
      });
    }
    setShowAddModuleModal(false);
    triggerToast(`Added ${newMod.brand} ${newMod.model} to catalog!`);
    setModuleForm({
      brand: '',
      model: '',
      cellTech: 'TOPCon Mono Bifacial',
      wattage: '550',
      efficiency: '22.6%',
      ratePerWp: '19.20',
      warranty: '30 Years Performance'
    });
  };

  const handleSaveInverter = (e) => {
    e.preventDefault();
    if (!inverterForm.brand.trim() || !inverterForm.model.trim()) return;
    const newInv = {
      id: `inv-${Date.now()}`,
      brand: inverterForm.brand.trim(),
      model: inverterForm.model.trim(),
      capacity: inverterForm.capacity,
      phase: inverterForm.phase,
      efficiency: inverterForm.efficiency,
      warranty: inverterForm.warranty
    };
    if (setInvertersList) {
      setInvertersList(prev => [...(prev || []), newInv]);
    }
    if (addNotification) {
      addNotification({
        type: 'success',
        icon: 'bolt',
        title: `New Inverter Added: ${newInv.brand} ${newInv.model}`,
        description: `${newInv.capacity} (${newInv.phase}) solar inverter published to hardware catalog.`,
        targetTab: 'hardware_master'
      });
    }
    setShowAddInverterModal(false);
    triggerToast(`Added ${newInv.brand} ${newInv.model} to catalog!`);
    setInverterForm({
      brand: '',
      model: '',
      capacity: '5 kW',
      phase: '3-Phase 415V',
      efficiency: '98.4%',
      warranty: '10 Years'
    });
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none flex items-center gap-2 px-4 py-3 rounded-lg bg-on-secondary-fixed text-on-secondary shadow-xl font-label-sm ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <span className="material-symbols-outlined text-[20px] text-primary-fixed">check_circle</span>
        <span>{toastMessage}</span>
      </div>

      {/* PAGE HEADER BLOCK */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 pb-6 border-b border-surface-container-highest">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-inverse-surface tracking-tight">
              Solar Equipment &amp; Hardware Master Catalog
            </h1>
            <span className="bg-primary-container/15 text-primary text-label-xs font-semibold px-2.5 py-0.5 rounded-full border border-primary-container/30">
              ALMM Compliant 2025
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary mt-1">
            Manage approved solar modules, string inverters, and hardware specs available to dealers for quotation generation.
          </p>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => triggerToast('Hardware specifications export initiated')}
            className="flex items-center gap-1.5 px-3 py-2 border border-surface-container-highest bg-surface-container-lowest text-inverse-surface font-label-md rounded-lg hover:bg-surface-container-low transition-colors shadow-sm text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-secondary">file_download</span>
            <span>Import Specs (Excel)</span>
          </button>
          <button
            onClick={() => triggerToast('Bulk price revision opened')}
            className="flex items-center gap-1.5 px-3 py-2 border border-surface-container-highest bg-surface-container-lowest text-inverse-surface font-label-md rounded-lg hover:bg-surface-container-low transition-colors shadow-sm text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-secondary">price_change</span>
            <span>Bulk Price Update</span>
          </button>
          <button
            onClick={() => setShowAddInverterModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-inverse-surface bg-surface-container-lowest text-inverse-surface font-label-md rounded-lg hover:bg-surface-container-low transition-colors shadow-sm cursor-pointer text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined">add</span>
            <span>+ Add Inverter Model</span>
          </button>
          <button
            onClick={() => setShowAddModuleModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold rounded-lg shadow-sm transition-colors cursor-pointer text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span>+ Add Solar Module</span>
          </button>
        </div>
      </div>

      {/* TOP TELEMETRY KPI QUICK STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6">
        {/* Card 1: Active PV Modules */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-sm text-label-sm font-semibold tracking-wider uppercase">Active PV Modules</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-primary">
              <span className="material-symbols-outlined">grid_view</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-headline-xl text-headline-xl text-inverse-surface font-bold">12</span>
            <span className="font-label-sm text-label-sm text-secondary font-medium">ALMM List Models</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="material-symbols-outlined text-primary text-sm">verified</span>
            <span className="font-label-xs text-label-xs text-primary font-semibold">All MNRE List-I Compliant</span>
          </div>
        </div>

        {/* Card 2: Active Inverters */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-sm text-label-sm font-semibold tracking-wider uppercase">Active Inverters</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-primary">
              <span className="material-symbols-outlined">power</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-headline-xl text-headline-xl text-inverse-surface font-bold">18</span>
            <span className="font-label-sm text-label-sm text-secondary font-medium">String &amp; Hybrid</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="material-symbols-outlined text-primary text-sm">bolt</span>
            <span className="font-label-xs text-label-xs text-secondary font-semibold">Tier-1 Certified Grid-Tie</span>
          </div>
        </div>

        {/* Card 3: Avg. Module Efficiency */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-sm text-label-sm font-semibold tracking-wider uppercase">Avg. Module Efficiency</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-primary">
              <span className="material-symbols-outlined">speed</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-headline-xl text-headline-xl text-inverse-surface font-bold">22.4%</span>
            <span className="font-label-xs text-label-xs text-primary font-semibold">+0.6% vs 2024</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="material-symbols-outlined text-secondary text-sm">tune</span>
            <span className="font-label-xs text-label-xs text-secondary font-semibold">TOPCon Bifacial Standard</span>
          </div>
        </div>

        {/* Card 4: Catalog Synchronization */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-sm text-label-sm font-semibold tracking-wider uppercase">Catalog Synchronization</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-primary">
              <span className="material-symbols-outlined">sync</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-headline-sm text-headline-sm text-inverse-surface font-bold">Today, 09:30 AM</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="font-label-xs text-label-xs text-secondary font-semibold">Synced across 48 Active Dealers</span>
          </div>
        </div>
      </section>

      {/* SEGMENTED TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container-highest pb-3 gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-label-md font-bold flex items-center gap-2 shadow-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'modules'
                ? 'bg-inverse-surface text-surface-container-lowest'
                : 'bg-surface-container-low text-secondary hover:text-inverse-surface'
            }`}
          >
            <span className="material-symbols-outlined text-primary-container">solar_power</span>
            <span>Solar PV Modules (ALMM Approved)</span>
            <span className="bg-surface-container-lowest/20 text-surface-container-lowest text-label-xs px-2 py-0.5 rounded-full">12 Models</span>
          </button>
          <button
            onClick={() => setActiveTab('inverters')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-label-md font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'inverters'
                ? 'bg-inverse-surface text-surface-container-lowest font-bold shadow-sm'
                : 'bg-surface-container-low text-secondary hover:text-inverse-surface'
            }`}
          >
            <span className="material-symbols-outlined">settings_input_component</span>
            <span>Solar Inverters (Grid-Tied &amp; Hybrid)</span>
            <span className="bg-surface-container-highest text-secondary text-label-xs px-2 py-0.5 rounded-full">18 Models</span>
          </button>
          <button
            onClick={() => setActiveTab('bos')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-label-md font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'bos'
                ? 'bg-inverse-surface text-surface-container-lowest font-bold shadow-sm'
                : 'bg-surface-container-low text-secondary hover:text-inverse-surface'
            }`}
          >
            <span className="material-symbols-outlined">cable</span>
            <span>Mounting Structures &amp; Cables</span>
            <span className="bg-surface-container-highest text-secondary text-label-xs px-2 py-0.5 rounded-full">BOS</span>
          </button>
        </div>
        <button
          onClick={() => triggerToast('Exported catalog inventory spreadsheet')}
          className="flex items-center gap-1.5 text-primary font-label-md hover:underline self-end sm:self-center shrink-0"
        >
          <span className="material-symbols-outlined">download</span>
          <span>Export Ledger</span>
        </button>
      </div>

      {/* SECTION 1: SOLAR MODULES CATALOG TABLE */}
      {activeTab === 'modules' && (
        <div className="mt-6 bg-surface-container-lowest rounded-xl border border-surface-container-highest shadow-sm overflow-hidden">
          <div className="p-4 bg-surface-container-lowest border-b border-surface-container-highest flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary">search</span>
                <input
                  className="w-full pl-9 pr-3 py-1.5 text-body-md rounded-lg border border-surface-container-highest focus:ring-1 focus:ring-primary-container focus:border-primary-container placeholder-secondary/60"
                  placeholder="Filter by OEM make, wattage, or cell tech..."
                  type="text"
                  value={moduleSearch}
                  onChange={(e) => setModuleSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-label-xs text-secondary font-semibold uppercase mr-1">Filter:</span>
              <button className="px-3 py-1 rounded-full bg-inverse-surface text-surface-container-lowest text-label-xs font-semibold">All (12)</button>
              <button className="px-3 py-1 rounded-full bg-surface-container-low text-secondary hover:bg-surface-container hover:text-inverse-surface text-label-xs font-medium border border-surface-container-highest">TOPCon Bifacial</button>
              <button className="px-3 py-1 rounded-full bg-surface-container-low text-secondary hover:bg-surface-container hover:text-inverse-surface text-label-xs font-medium border border-surface-container-highest">Mono PERC</button>
              <button className="px-3 py-1 rounded-full bg-surface-container-low text-secondary hover:bg-surface-container hover:text-inverse-surface text-label-xs font-medium border border-surface-container-highest">Commercial 600W+</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-inverse-surface text-surface-container-lowest text-label-sm font-semibold h-11 border-b border-surface-container-lowest/10">
                  <th className="px-4 py-2 font-label-sm">OEM Brand / Make</th>
                  <th className="px-4 py-2 font-label-sm">Model Name &amp; Series</th>
                  <th className="px-4 py-2 font-label-sm">Cell Tech</th>
                  <th className="px-4 py-2 font-label-sm text-right">Wattage</th>
                  <th className="px-4 py-2 font-label-sm">Dimensions &amp; Weight</th>
                  <th className="px-4 py-2 font-label-sm text-right">Efficiency %</th>
                  <th className="px-4 py-2 font-label-sm text-right">Base Procurement Rate</th>
                  <th className="px-4 py-2 font-label-sm">Performance Warranty</th>
                  <th className="px-4 py-2 font-label-sm text-center">Dealer Catalog</th>
                  <th className="px-4 py-2 font-label-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest font-body-md text-on-surface">
                {/* Row 1: Premier Energies */}
                <tr className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-surface-container-low text-inverse-surface font-bold text-xs flex items-center justify-center border border-surface-container-highest">PE</span>
                      <span className="font-semibold text-inverse-surface">Premier Energies</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-inverse-surface">Premier Shine 600WP Bifacial</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-label-xs font-semibold bg-tertiary-container/20 text-tertiary">TOPCon Mono Bifacial</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">600 WP</td>
                  <td className="px-4 py-3 text-body-sm text-secondary font-mono">2278 × 1134 × 30 mm | 28.5 kg</td>
                  <td className="px-4 py-3 text-right font-bold text-primary font-mono">22.6%</td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-bold text-inverse-surface font-mono">₹ 18.50 / Wp</div>
                    <div className="text-label-xs text-secondary font-mono">₹ 11,100 / Panel</div>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-secondary">30 Years (0.4% p.a.)</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-secondary">
                      <button className="p-1 hover:text-inverse-surface transition-colors" title="Edit Spec"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-1 hover:text-error transition-colors" title="Archive Spec"><span className="material-symbols-outlined">archive</span></button>
                    </div>
                  </td>
                </tr>

                {/* Row 2: Waaree Energies */}
                <tr className="bg-surface-container-low/30 hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-surface-container-low text-inverse-surface font-bold text-xs flex items-center justify-center border border-surface-container-highest">WE</span>
                      <span className="font-semibold text-inverse-surface">Waaree Energies</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-inverse-surface">TopCon HyperIon 585WP</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-label-xs font-semibold bg-tertiary-container/20 text-tertiary">TOPCon Mono Bifacial</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">585 WP</td>
                  <td className="px-4 py-3 text-body-sm text-secondary font-mono">2278 × 1134 × 35 mm | 27.8 kg</td>
                  <td className="px-4 py-3 text-right font-bold text-primary font-mono">22.4%</td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-bold text-inverse-surface font-mono">₹ 18.25 / Wp</div>
                    <div className="text-label-xs text-secondary font-mono">₹ 10,676 / Panel</div>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-secondary">30 Years (0.4% p.a.)</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-secondary">
                      <button className="p-1 hover:text-inverse-surface transition-colors"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-1 hover:text-error transition-colors"><span className="material-symbols-outlined">archive</span></button>
                    </div>
                  </td>
                </tr>

                {/* Row 3: Adani Solar */}
                <tr className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-surface-container-low text-inverse-surface font-bold text-xs flex items-center justify-center border border-surface-container-highest">AS</span>
                      <span className="font-semibold text-inverse-surface">Adani Solar</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-inverse-surface">Elan Bi-550W Vertex</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-label-xs font-semibold bg-secondary-container text-on-secondary-fixed">Mono PERC Half-Cut 16-BB</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">550 WP</td>
                  <td className="px-4 py-3 text-body-sm text-secondary font-mono">2279 × 1134 × 35 mm | 28.0 kg</td>
                  <td className="px-4 py-3 text-right font-bold text-primary font-mono">21.8%</td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-bold text-inverse-surface font-mono">₹ 17.80 / Wp</div>
                    <div className="text-label-xs text-secondary font-mono">₹ 9,790 / Panel</div>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-secondary">25 Years (0.55% p.a.)</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-secondary">
                      <button className="p-1 hover:text-inverse-surface transition-colors"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-1 hover:text-error transition-colors"><span className="material-symbols-outlined">archive</span></button>
                    </div>
                  </td>
                </tr>

                {/* Row 4: Vikram Solar */}
                <tr className="bg-surface-container-low/30 hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-surface-container-low text-inverse-surface font-bold text-xs flex items-center justify-center border border-surface-container-highest">VS</span>
                      <span className="font-semibold text-inverse-surface">Vikram Solar</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-inverse-surface">Suryava 550 Mono Half-Cut</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-label-xs font-semibold bg-secondary-container text-on-secondary-fixed">Mono PERC Half-Cut 16-BB</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">550 WP</td>
                  <td className="px-4 py-3 text-body-sm text-secondary font-mono">2278 × 1134 × 30 mm | 27.5 kg</td>
                  <td className="px-4 py-3 text-right font-bold text-primary font-mono">21.5%</td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-bold text-inverse-surface font-mono">₹ 17.50 / Wp</div>
                    <div className="text-label-xs text-secondary font-mono">₹ 9,625 / Panel</div>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-secondary">25 Years (0.55% p.a.)</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-secondary">
                      <button className="p-1 hover:text-inverse-surface transition-colors"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-1 hover:text-error transition-colors"><span className="material-symbols-outlined">archive</span></button>
                    </div>
                  </td>
                </tr>

                {/* Row 5: Sunvine Premier */}
                <tr className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-primary-container/20 text-primary font-bold text-xs flex items-center justify-center border border-primary-container/40">SP</span>
                      <span className="font-semibold text-inverse-surface">Sunvine Premier</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-inverse-surface">Sunvine UltraCell 590-BF</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-label-xs font-semibold bg-tertiary-container/20 text-tertiary">TOPCon Mono Bifacial</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">590 WP</td>
                  <td className="px-4 py-3 text-body-sm text-secondary font-mono">2278 × 1134 × 30 mm | 28.1 kg</td>
                  <td className="px-4 py-3 text-right font-bold text-primary font-mono">22.5%</td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-bold text-inverse-surface font-mono">₹ 18.00 / Wp</div>
                    <div className="text-label-xs text-secondary font-mono">₹ 10,620 / Panel</div>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-secondary">30 Years (0.4% p.a.)</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-secondary">
                      <button className="p-1 hover:text-inverse-surface transition-colors"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-1 hover:text-error transition-colors"><span className="material-symbols-outlined">archive</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: SOLAR INVERTERS CATALOG TABLE */}
      {activeTab === 'inverters' && (
        <div className="mt-6 bg-surface-container-lowest rounded-xl border border-surface-container-highest shadow-sm overflow-hidden">
          <div className="p-4 bg-surface-container-lowest border-b border-surface-container-highest flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-inverse-surface font-bold">
                Approved String &amp; Central Inverters Master (Single &amp; Three Phase)
              </h2>
              <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                Preset efficiencies, phase configurations, and base distributor rates for automated quotes.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-label-xs font-semibold rounded-lg bg-surface-container-low text-secondary border border-surface-container-highest flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span>All Capacities</span>
              </button>
              <button className="px-3 py-1.5 text-label-xs font-semibold rounded-lg bg-surface-container-low text-secondary border border-surface-container-highest flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span>Grid-Tied Only</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-inverse-surface text-surface-container-lowest text-label-sm font-semibold h-11 border-b border-surface-container-lowest/10">
                  <th className="px-4 py-2 font-label-sm">Brand / OEM</th>
                  <th className="px-4 py-2 font-label-sm">Model</th>
                  <th className="px-4 py-2 font-label-sm text-right">Rated Capacity</th>
                  <th className="px-4 py-2 font-label-sm">Grid Phase &amp; MPPT</th>
                  <th className="px-4 py-2 font-label-sm text-right">Euro Efficiency</th>
                  <th className="px-4 py-2 font-label-sm text-right">Inverter Base Price (₹)</th>
                  <th className="px-4 py-2 font-label-sm">Replacement Warranty</th>
                  <th className="px-4 py-2 font-label-sm text-center">Dealer Quoting</th>
                  <th className="px-4 py-2 font-label-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest font-body-md text-on-surface">
                {/* Inverter 1: Solaryaan */}
                <tr className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-primary-container/20 text-primary font-bold text-xs flex items-center justify-center border border-primary-container/40">SY</span>
                      <span className="font-semibold text-inverse-surface">Solaryaan (Sunvine Smart)</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-inverse-surface">Sunvine Solaryaan 5.0G</td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">5 kW</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-label-xs font-semibold bg-surface-container-high text-on-surface">1-Phase (2 MPPT)</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-primary font-mono">98.6%</td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">₹ 54,000</td>
                  <td className="px-4 py-3 text-body-sm text-secondary">8 Years Full Comprehensive</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-secondary">
                      <button className="p-1 hover:text-inverse-surface transition-colors" title="Edit Spec"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-1 hover:text-primary transition-colors" title="Specs Sheet PDF"><span className="material-symbols-outlined">picture_as_pdf</span></button>
                    </div>
                  </td>
                </tr>

                {/* Inverter 2: Solis */}
                <tr className="bg-surface-container-low/30 hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-surface-container-low text-inverse-surface font-bold text-xs flex items-center justify-center border border-surface-container-highest">SL</span>
                      <span className="font-semibold text-inverse-surface">Solis</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-inverse-surface">Solis 10K-3P-4G</td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">10 kW</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-label-xs font-semibold bg-surface-container-high text-on-surface">3-Phase (2 MPPT)</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-primary font-mono">98.8%</td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">₹ 92,000</td>
                  <td className="px-4 py-3 text-body-sm text-secondary">10 Years Extended</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-secondary">
                      <button className="p-1 hover:text-inverse-surface transition-colors"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">picture_as_pdf</span></button>
                    </div>
                  </td>
                </tr>

                {/* Inverter 3: Sungrow */}
                <tr className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-surface-container-low text-inverse-surface font-bold text-xs flex items-center justify-center border border-surface-container-highest">SG</span>
                      <span className="font-semibold text-inverse-surface">Sungrow</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-inverse-surface">Sungrow SG50CX</td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">50 kW</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-label-xs font-semibold bg-surface-container-high text-on-surface">3-Phase (4 MPPT)</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-primary font-mono">99.0%</td>
                  <td className="px-4 py-3 text-right font-bold text-inverse-surface font-mono">₹ 2,45,000</td>
                  <td className="px-4 py-3 text-body-sm text-secondary">10 Years Extended</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-secondary">
                      <button className="p-1 hover:text-inverse-surface transition-colors"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">picture_as_pdf</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: BOS */}
      {activeTab === 'bos' && (
        <div className="mt-6 bg-surface-container-lowest rounded-xl border border-surface-container-highest shadow-sm p-6">
          <h2 className="font-headline-sm text-headline-sm text-inverse-surface font-bold mb-4">
            Balance of System (BOS) Standard Catalog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest">
              <h3 className="font-label-md font-bold text-on-surface">Hot-Dip Galvanized Structure</h3>
              <p className="text-body-sm text-secondary mt-1">80 Micron minimum zinc coating, withstands 150 km/h wind load.</p>
              <div className="mt-3 text-primary font-mono font-bold">Standard Grade IS 2062</div>
            </div>
            <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest">
              <h3 className="font-label-md font-bold text-on-surface">Solar DC Cables (1C × 4/6 sq.mm)</h3>
              <p className="text-body-sm text-secondary mt-1">XLPO insulated, UV resistant, electron-beam cross-linked copper.</p>
              <div className="mt-3 text-primary font-mono font-bold">Polycab / Havells EN 50618</div>
            </div>
            <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest">
              <h3 className="font-label-md font-bold text-on-surface">Dual Surge Protection (SPD Type II)</h3>
              <p className="text-body-sm text-secondary mt-1">IP65 poly-carbonate ACDB &amp; DCDB distribution junction enclosures.</p>
              <div className="mt-3 text-primary font-mono font-bold">Hensel / Eaton / Schneider</div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER & AUDIT TRAIL ADVISORY */}
      <div className="mt-8 mb-4 p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-secondary-container text-on-secondary-fixed">
            <span className="material-symbols-outlined">info</span>
          </span>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-semibold text-inverse-surface">Global Catalog Engine Advisory</span>
            <span className="font-body-sm text-body-sm text-secondary">Hardware additions immediately reflect inside the dealer quotation calculation engine for all active DISCOM regions.</span>
          </div>
        </div>
      </div>

      {/* ADD SOLAR MODULE MODAL */}
      {showAddModuleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">solar_power</span>
                </span>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Add Solar PV Module</h3>
              </div>
              <button
                onClick={() => setShowAddModuleModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-secondary cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="py-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">OEM Brand / Make *</label>
                  <input
                    required
                    type="text"
                    value={moduleForm.brand}
                    onChange={(e) => setModuleForm({ ...moduleForm, brand: e.target.value })}
                    placeholder="e.g. Adani Solar / Waaree"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Model Name &amp; Series *</label>
                  <input
                    required
                    type="text"
                    value={moduleForm.model}
                    onChange={(e) => setModuleForm({ ...moduleForm, model: e.target.value })}
                    placeholder="e.g. Shine 600WP TOPCon"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Wattage (W) *</label>
                  <input
                    required
                    type="number"
                    value={moduleForm.wattage}
                    onChange={(e) => setModuleForm({ ...moduleForm, wattage: e.target.value })}
                    placeholder="550"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Efficiency %</label>
                  <input
                    type="text"
                    value={moduleForm.efficiency}
                    onChange={(e) => setModuleForm({ ...moduleForm, efficiency: e.target.value })}
                    placeholder="22.6%"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Rate (₹/Wp)</label>
                  <input
                    type="text"
                    value={moduleForm.ratePerWp}
                    onChange={(e) => setModuleForm({ ...moduleForm, ratePerWp: e.target.value })}
                    placeholder="19.20"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Cell Tech</label>
                <select
                  value={moduleForm.cellTech}
                  onChange={(e) => setModuleForm({ ...moduleForm, cellTech: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                >
                  <option value="TOPCon Mono Bifacial">TOPCon Mono Bifacial (Recommended)</option>
                  <option value="Mono PERC">Mono PERC Half-Cut</option>
                  <option value="HJT Ultra-Efficiency">HJT Ultra-Efficiency</option>
                  <option value="Polycrystalline DCR">Polycrystalline DCR</option>
                </select>
              </div>

              <div className="pt-3 border-t border-surface-container-high flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModuleModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-secondary hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-primary-container text-surface-container-lowest hover:bg-primary rounded-lg transition-all shadow-sm cursor-pointer"
                >
                  Publish to Catalog &amp; Notify Dealers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD INVERTER MODEL MODAL */}
      {showAddInverterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                </span>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Add Inverter Model</h3>
              </div>
              <button
                onClick={() => setShowAddInverterModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-secondary cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveInverter} className="py-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Brand / OEM Make *</label>
                  <input
                    required
                    type="text"
                    value={inverterForm.brand}
                    onChange={(e) => setInverterForm({ ...inverterForm, brand: e.target.value })}
                    placeholder="e.g. Sungrow / Solis / Sunvine"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Model Name *</label>
                  <input
                    required
                    type="text"
                    value={inverterForm.model}
                    onChange={(e) => setInverterForm({ ...inverterForm, model: e.target.value })}
                    placeholder="e.g. SG10RT 3-Phase Multi-MPPT"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Rated Capacity *</label>
                  <input
                    required
                    type="text"
                    value={inverterForm.capacity}
                    onChange={(e) => setInverterForm({ ...inverterForm, capacity: e.target.value })}
                    placeholder="10 kW"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Phase</label>
                  <select
                    value={inverterForm.phase}
                    onChange={(e) => setInverterForm({ ...inverterForm, phase: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  >
                    <option value="3-Phase 415V">3-Phase 415V</option>
                    <option value="1-Phase 230V">1-Phase 230V</option>
                    <option value="Hybrid Battery-Ready">Hybrid Battery-Ready</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Efficiency</label>
                  <input
                    type="text"
                    value={inverterForm.efficiency}
                    onChange={(e) => setInverterForm({ ...inverterForm, efficiency: e.target.value })}
                    placeholder="98.5%"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-surface-container-highest bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container-high flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddInverterModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-secondary hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-primary-container text-surface-container-lowest hover:bg-primary rounded-lg transition-all shadow-sm cursor-pointer"
                >
                  Publish to Catalog &amp; Notify Dealers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
