import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sliders,
  Save,
  Building2,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  Landmark,
  Percent,
  FileCheck
} from 'lucide-react';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function PricingMaster() {
  const { pricingMaster, updatePricingMaster } = useApp();
  const [formData, setFormData] = useState({ ...pricingMaster });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleBaseRateChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      baseRates: {
        ...prev.baseRates,
        [field]: Number(val)
      }
    }));
  };

  const handleBankChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [field]: val
      }
    }));
  };

  const handleTermsChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      termsAndWarranties: {
        ...prev.termsAndWarranties,
        [field]: val
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updatePricingMaster(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F1B2E] font-heading">Central Pricing & Proposal Presets</h1>
          <p className="text-xs text-gray-500">
            Define system base rates, statutory parameters, bank details, and terms stamped onto official proposals.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Master Presets
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#6CBF3D]" />
          Pricing Master and Official Bank Settings saved successfully!
        </div>
      )}

      {/* Section 1: Turnkey Base EPC Rates */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6CBF3D]"></span>
          1. Turnkey Base EPC Supply Rates (₹ / KW)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Residential (1.0 to 3.0 KW)
            </label>
            <div className="relative">
              <input
                type="number"
                step="500"
                value={formData.baseRates.residential_1_to_3}
                onChange={(e) => handleBaseRateChange('residential_1_to_3', e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono font-bold text-[#0F1B2E] border rounded-lg focus:ring-2 focus:ring-[#6CBF3D]"
              />
              <span className="absolute right-3 top-2 text-xs text-gray-400">₹/KW</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">High-density residential PM Surya Ghar</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Residential (3.1 to 10.0 KW)
            </label>
            <div className="relative">
              <input
                type="number"
                step="500"
                value={formData.baseRates.residential_3_to_10}
                onChange={(e) => handleBaseRateChange('residential_3_to_10', e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono font-bold text-[#0F1B2E] border rounded-lg focus:ring-2 focus:ring-[#6CBF3D]"
              />
              <span className="absolute right-3 top-2 text-xs text-gray-400">₹/KW</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">Bungalows & villas with 3-phase grid</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Commercial & Industrial (&gt; 10 KW)
            </label>
            <div className="relative">
              <input
                type="number"
                step="500"
                value={formData.baseRates.commercial_industrial}
                onChange={(e) => handleBaseRateChange('commercial_industrial', e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono font-bold text-[#0F1B2E] border rounded-lg focus:ring-2 focus:ring-[#6CBF3D]"
              />
              <span className="absolute right-3 top-2 text-xs text-gray-400">₹/KW</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">Factories, shedding, HT & LT connections</p>
          </div>
        </div>
      </div>

      {/* Section 2: Official Remittance Bank Details */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider flex items-center gap-2">
          <Landmark className="w-4 h-4 text-[#6CBF3D]" />
          2. Official Sunvine Bank Remittance Details (Printed on Page 2)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Beneficiary Firm Name</label>
            <input
              type="text"
              value={formData.bankDetails.firmName}
              onChange={(e) => handleBankChange('firmName', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Bank Name</label>
            <input
              type="text"
              value={formData.bankDetails.bankName}
              onChange={(e) => handleBankChange('bankName', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Bank Account Number</label>
            <input
              type="text"
              value={formData.bankDetails.accountNumber}
              onChange={(e) => handleBankChange('accountNumber', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">IFSC Code</label>
            <input
              type="text"
              value={formData.bankDetails.ifscCode}
              onChange={(e) => handleBankChange('ifscCode', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Branch Name</label>
            <input
              type="text"
              value={formData.bankDetails.branch}
              onChange={(e) => handleBankChange('branch', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Official Remittance Email</label>
            <input
              type="email"
              value={formData.bankDetails.email}
              onChange={(e) => handleBankChange('email', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Standard Warranties & Plant Terms */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#6CBF3D]" />
          3. Standard Warranties & Operating Terms (Printed on Page 4)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Module Performance (Yrs)</label>
            <input
              type="number"
              value={formData.termsAndWarranties.modulePerformanceWarrantyYears}
              onChange={(e) => handleTermsChange('modulePerformanceWarrantyYears', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-bold text-center"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Module Defect (Yrs)</label>
            <input
              type="number"
              value={formData.termsAndWarranties.moduleDefectWarrantyYears}
              onChange={(e) => handleTermsChange('moduleDefectWarrantyYears', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-bold text-center"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Inverter Warranty (Yrs)</label>
            <input
              type="number"
              value={formData.termsAndWarranties.inverterWarrantyYears}
              onChange={(e) => handleTermsChange('inverterWarrantyYears', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-bold text-center"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Workmanship & AMC (Yrs)</label>
            <input
              type="number"
              value={formData.termsAndWarranties.workmanshipWarrantyYears}
              onChange={(e) => handleTermsChange('workmanshipWarrantyYears', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-bold text-center"
            />
          </div>
        </div>

        <div className="pt-2 text-xs">
          <label className="block font-semibold text-gray-700 mb-1">Official Address for Proposal Footers</label>
          <input
            type="text"
            value={formData.termsAndWarranties.officeAddress}
            onChange={(e) => handleTermsChange('officeAddress', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
