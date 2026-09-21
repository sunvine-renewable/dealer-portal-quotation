// Default Presets & Master Configuration for Sunvine Renewable Energy
// 100% Gujarat State Solar EPC Network & BOS Price List from PDF

import {
  SUNVINE_OFFICIAL_PROFILE,
  PDF_BOS_PRICE_MATRIX,
  PDF_BOM_SPECIFICATIONS,
  GUJARAT_MODULES,
  GUJARAT_INVERTERS,
  GUJARAT_DEALERS,
  GUJARAT_QUOTATIONS
} from './gujaratDatabase';

export {
  SUNVINE_OFFICIAL_PROFILE,
  PDF_BOS_PRICE_MATRIX,
  PDF_BOM_SPECIFICATIONS,
  GUJARAT_MODULES,
  GUJARAT_INVERTERS,
  GUJARAT_DEALERS,
  GUJARAT_QUOTATIONS
};

export const DEFAULT_PRICING_MASTER = {
  // Base EPC turnkey rates per kW
  baseRates: {
    residential_1_to_3: 62000,   // ₹62,000 / kW
    residential_3_to_10: 58000,  // ₹58,000 / kW
    commercial_industrial: 24000 // ₹24,000 / kW (C&I > 10 kW)
  },

  // Central PM Surya Ghar Muft Bijli Yojana DBT Subsidy Slabs
  subsidySlabs: [
    { capacityKW: 1, amount: 30000, label: '1.0 kW' },
    { capacityKW: 2, amount: 60000, label: '2.0 kW' },
    { capacityKW: 3, amount: 78000, label: '3.0 kW & Above' }
  ],

  // Statutory Fees & Taxes
  taxes: {
    gstPercent: 13.8, // Composite solar GST
    gedaRegistrationCharge: 'Including',
    discomMeterCharge: 'Extra as actual',
    testingCharge: 'Customer Scope'
  },

  // Official Sunvine Bank Details from PDF
  bankDetails: SUNVINE_OFFICIAL_PROFILE.bankDetails,

  // Terms & Warranties from PDF & Master Configuration
  termsAndWarranties: {
    modulePerformanceWarrantyYears: 30,
    moduleDefectWarrantyYears: 12,
    inverterWarrantyYears: 8,
    workmanshipWarrantyYears: 5,
    paymentTerms: '10% advance with purchase order, 90% before material dispatch.',
    deliveryDays: 15,
    validityDays: 15,
    officeAddress: SUNVINE_OFFICIAL_PROFILE.address,
    supportPhone: SUNVINE_OFFICIAL_PROFILE.terms.supportPhone,
    helpline: SUNVINE_OFFICIAL_PROFILE.terms.helpline,
    website: SUNVINE_OFFICIAL_PROFILE.terms.website,
    gstin: SUNVINE_OFFICIAL_PROFILE.gstin
  },

  // Real PDF BOS Reference Data
  bosPriceMatrix: PDF_BOS_PRICE_MATRIX,
  bomSpecifications: PDF_BOM_SPECIFICATIONS
};

// Approved Solar Modules Master Catalog (from PDF)
export const DEFAULT_MODULES = GUJARAT_MODULES;

// Approved Solar Inverters Master Catalog (from PDF & Master)
export const DEFAULT_INVERTERS = GUJARAT_INVERTERS;

// 550 Verified Gujarat Solar EPC Dealers (100% Gujarat Only)
export const INITIAL_DEALERS = GUJARAT_DEALERS;

// Gujarat Quotations Master Dataset
export const INITIAL_QUOTATIONS = GUJARAT_QUOTATIONS;

// Gujarat System & Compliance Notifications
export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'success',
    icon: 'check_circle',
    title: 'Quotation #SV-2026-Q801 approved by PGVCL',
    description: 'Rooftop solar quotation for MIRANA TECHNOCAST PVT.LTD. (Metoda GIDC, Rajkot) verified by DISCOM.',
    timestamp: '5m ago',
    read: false,
    targetTab: 'all_quotes'
  },
  {
    id: 'notif-2',
    type: 'info',
    icon: 'bolt',
    title: 'GEDA Solar Policy 2025-26 active across Gujarat',
    description: 'Net-metering clearance expedited for Saurashtra (PGVCL) and South Gujarat (DGVCL) circles.',
    timestamp: '35m ago',
    read: false,
    targetTab: 'pricing_master'
  },
  {
    id: 'notif-3',
    type: 'warning',
    icon: 'shield',
    title: 'Gujarat Dealer Margin Cap Policy Enforced',
    description: 'Admin enforced maximum dealer margin ceiling of ₹6,000/kW for Gold EPC and ₹7,500/kW for Platinum partners.',
    timestamp: '1h ago',
    read: false,
    targetTab: 'dealers_mgmt'
  },
  {
    id: 'notif-4',
    type: 'info',
    icon: 'solar_power',
    title: 'New Hardware Specs Added from PDF Catalog',
    description: 'APS 600WP TOPCon Bifacial panels and Waaree HyperIon 585WP published to Gujarat catalog.',
    timestamp: '2h ago',
    read: true,
    targetTab: 'hardware_master'
  },
  {
    id: 'notif-5',
    type: 'success',
    icon: 'verified_user',
    title: 'Sunvine Renewable Official GSTIN Verified',
    description: 'GSTIN 24AFPFS7402A1Z7 (Rajkot, Gujarat) linked to PDF quotation generator footer.',
    timestamp: '1d ago',
    read: true,
    targetTab: 'admin_settings'
  },
  {
    id: 'notif-6',
    type: 'info',
    icon: 'account_balance',
    title: 'PM Surya Ghar DBT National Portal Subsidy Synced',
    description: 'Direct Benefit Transfer slab (₹78,000 for >=3kW) synchronized with Discom consumer billing ledger.',
    timestamp: '2d ago',
    read: true,
    targetTab: 'pricing_master'
  }
];
