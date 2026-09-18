import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  Plus,
  Trash2,
  CheckCircle,
  Zap,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function HardwareMaster() {
  const { modulesList, setModulesList, invertersList, setInvertersList } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('modules'); // 'modules' | 'inverters'

  // New module state
  const [modBrand, setModBrand] = useState('');
  const [modModel, setModModel] = useState('');
  const [modWattage, setModWattage] = useState(600);
  const [modEfficiency, setModEfficiency] = useState('22.8%');
  const [modWarranty, setModWarranty] = useState(30);

  // New inverter state
  const [invBrand, setInvBrand] = useState('');
  const [invModel, setInvModel] = useState('');
  const [invCapacity, setInvCapacity] = useState(125);
  const [invPhase, setInvPhase] = useState('Three Phase');
  const [invWarranty, setInvWarranty] = useState(8);

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!modBrand || !modModel) return;
    const newMod = {
      id: `mod-${Date.now()}`,
      brand: modBrand,
      model: modModel,
      wattage: Number(modWattage),
      efficiency: modEfficiency,
      warrantyYears: Number(modWarranty),
      isDefault: false
    };
    setModulesList([...modulesList, newMod]);
    setModBrand('');
    setModModel('');
  };

  const handleAddInverter = (e) => {
    e.preventDefault();
    if (!invBrand || !invModel) return;
    const newInv = {
      id: `inv-${Date.now()}`,
      brand: invBrand,
      model: invModel,
      capacityKW: Number(invCapacity),
      phase: invPhase,
      warrantyYears: Number(invWarranty),
      isDefault: false
    };
    setInvertersList([...invertersList, newInv]);
    setInvBrand('');
    setInvModel('');
  };

  const removeModule = (id) => {
    if (modulesList.length <= 1) return;
    setModulesList(modulesList.filter(m => m.id !== id));
  };

  const removeInverter = (id) => {
    if (invertersList.length <= 1) return;
    setInvertersList(invertersList.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F1B2E] font-heading">Approved Hardware Master Catalog</h1>
          <p className="text-xs text-gray-500">
            Maintain authorized PV modules and grid-tied inverters made available to dealers during quotation creation.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('modules')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'modules' ? 'bg-[#0F1B2E] text-white shadow-xs' : 'text-gray-600'
            }`}
          >
            Solar Modules ({modulesList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('inverters')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'inverters' ? 'bg-[#0F1B2E] text-white shadow-xs' : 'text-gray-600'
            }`}
          >
            Solar Inverters ({invertersList.length})
          </button>
        </div>
      </div>

      {/* MODULES SECTION */}
      {activeSubTab === 'modules' && (
        <div className="space-y-6">
          {/* Add Module Form */}
          <form onSubmit={handleAddModule} className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2E] flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#6CBF3D]" />
              Add Approved PV Module Specification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1">Brand Make</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. APS / Sunvine Premier"
                  value={modBrand}
                  onChange={(e) => setModBrand(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1">Model Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 600WP TOPCON MONO BIFACIAL Panel"
                  value={modModel}
                  onChange={(e) => setModModel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Wattage (Wp)</label>
                <input
                  type="number"
                  step="5"
                  value={modWattage}
                  onChange={(e) => setModWattage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-bold"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold rounded-lg shadow-xs transition-colors"
                >
                  Add Module
                </button>
              </div>
            </div>
          </form>

          {/* Module List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modulesList.map((mod) => (
              <div key={mod.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                      {mod.brand}
                    </span>
                    <span className="text-sm font-extrabold text-[#0F1B2E]">{mod.wattage} Wp</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{mod.model}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Efficiency: <strong>{mod.efficiency}</strong></span>
                    <span>Warranty: <strong>{mod.warrantyYears} Years</strong></span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs mt-4">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#6CBF3D]" /> ALMM Listed
                  </span>
                  {modulesList.length > 1 && (
                    <button
                      onClick={() => removeModule(mod.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INVERTERS SECTION */}
      {activeSubTab === 'inverters' && (
        <div className="space-y-6">
          {/* Add Inverter Form */}
          <form onSubmit={handleAddInverter} className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2E] flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#6CBF3D]" />
              Add Approved Solar Grid Inverter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 mb-1">Make / Brand</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solaryaan / Solis"
                  value={invBrand}
                  onChange={(e) => setInvBrand(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1">Model & Rating</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 125 KW String 3-Phase On-Grid"
                  value={invModel}
                  onChange={(e) => setInvModel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Capacity (KW)</label>
                <input
                  type="number"
                  step="1"
                  value={invCapacity}
                  onChange={(e) => setInvCapacity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-bold"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold rounded-lg shadow-xs transition-colors"
                >
                  Add Inverter
                </button>
              </div>
            </div>
          </form>

          {/* Inverter List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invertersList.map((inv) => (
              <div key={inv.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                      {inv.brand}
                    </span>
                    <span className="text-sm font-extrabold text-[#0F1B2E]">{inv.capacityKW} KW</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{inv.model}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Phase: <strong>{inv.phase}</strong></span>
                    <span>Warranty: <strong>{inv.warrantyYears} Years</strong></span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs mt-4">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#6CBF3D]" /> Grid Synchronous MPPT
                  </span>
                  {invertersList.length > 1 && (
                    <button
                      onClick={() => removeInverter(inv.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
