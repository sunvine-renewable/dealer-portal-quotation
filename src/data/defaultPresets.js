// Default Presets & Master Configuration for Sunvine Renewable Energy

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

  // Official Sunvine Bank Details (Printed on Page 2 of Quotation)
  bankDetails: {
    firmName: 'SUNVINE RENEWABLE',
    bankName: 'HDFC BANK LTD.',
    accountNumber: '99998000050580',
    ifscCode: 'HDFC0002012',
    branch: 'METODA BRANCH',
    email: 'sunvinerenewable@gmail.com'
  },

  // Terms & Warranties (Printed on Page 4 of Quotation)
  termsAndWarranties: {
    modulePerformanceWarrantyYears: 30,
    moduleDefectWarrantyYears: 10,
    inverterWarrantyYears: 8,
    workmanshipWarrantyYears: 5,
    paymentTerms: '10% advance with purchase order, 90% before material dispatch.',
    deliveryDays: 30,
    validityDays: 15,
    officeAddress: 'G-705, Second Gate, Metoda GIDC, Rajkot - 360021. (Guj.) India',
    supportPhone: '+91 95865 33750',
    helpline: '8000050580',
    website: 'www.sunvinerenewable.com'
  }
};

// Approved Solar Modules Master Catalog
export const DEFAULT_MODULES = [
  {
    id: 'mod-1',
    brand: 'APS / Sunvine Premier',
    model: 'PV MODULE, 600WP TOPCON MONO BIFACIAL Panel',
    wattage: 600,
    efficiency: '22.8%',
    warrantyYears: 30,
    isDefault: true
  },
  {
    id: 'mod-2',
    brand: 'Premier Energies',
    model: '585W TOPCon Bifacial Dual Glass',
    wattage: 585,
    efficiency: '22.4%',
    warrantyYears: 30,
    isDefault: false
  },
  {
    id: 'mod-3',
    brand: 'Waaree Solar',
    model: '550W Mono PERC Half-Cut 144 Cells',
    wattage: 550,
    efficiency: '21.5%',
    warrantyYears: 25,
    isDefault: false
  },
  {
    id: 'mod-4',
    brand: 'Adani Solar',
    model: '540W Bifacial Poly / Mono PERC',
    wattage: 540,
    efficiency: '21.1%',
    warrantyYears: 25,
    isDefault: false
  }
];

// Approved Solar Inverters Master Catalog
export const DEFAULT_INVERTERS = [
  {
    id: 'inv-1',
    brand: 'SOLARYAAN / SOLIS / VSOLE',
    model: '125 KW String type three - Phase Grid Tied Inverter',
    capacityKW: 125,
    phase: 'Three Phase',
    warrantyYears: 8,
    isDefault: true
  },
  {
    id: 'inv-2',
    brand: 'Solis Cloud Smart Series',
    model: '50 KW 3-Phase Grid-Tied Inverter with Wi-Fi Logger',
    capacityKW: 50,
    phase: 'Three Phase',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-3',
    brand: 'Growatt / Deye',
    model: '10 KW 3-Phase Dual MPPT On-Grid',
    capacityKW: 10,
    phase: 'Three Phase',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-4',
    brand: 'Sunvine Smart Series',
    model: '5.0 KW 1-Phase / 3-Phase Smart MPPT On-Grid',
    capacityKW: 5,
    phase: 'Single / Three Phase',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-5',
    brand: 'Sunvine Smart Series',
    model: '3.0 KW 1-Phase Smart MPPT On-Grid',
    capacityKW: 3,
    phase: 'Single Phase',
    warrantyYears: 8,
    isDefault: false
  }
];

// Initial Seeded Dealers
export const INITIAL_DEALERS = [
  {
    id: 'SV-DLR-0841',
    firmName: 'Surya Solar Tech Private Limited',
    contactPerson: 'Rajesh Kumar',
    mobile: '9876543210',
    email: 'rajesh@suryasolartech.in',
    city: 'Rajkot',
    state: 'Gujarat',
    discom: 'PGVCL',
    tier: 'Gold EPC Partner',
    maxMarginCapPerKw: 5500,
    totalQuotes: 18,
    totalCapacityKw: 420.5,
    status: 'Active',
    joinedDate: '2025-11-12',
    avatar: '/dealer_avatar.jpg'
  },
  {
    id: 'SV-DLR-0842',
    firmName: 'GreenRay Renewable Solutions',
    contactPerson: 'Karan Patel',
    mobile: '9898012345',
    email: 'karan@greenraysolar.com',
    city: 'Surat',
    state: 'Gujarat',
    discom: 'DGVCL',
    tier: 'Platinum Partner',
    maxMarginCapPerKw: 7500,
    totalQuotes: 34,
    totalCapacityKw: 960.0,
    status: 'Active',
    joinedDate: '2025-09-04'
  },
  {
    id: 'SV-DLR-0843',
    firmName: 'Apex Energy Systems',
    contactPerson: 'Bhavin Shah',
    mobile: '9725098765',
    email: 'bhavin@apexenergy.in',
    city: 'Morbi',
    state: 'Gujarat',
    discom: 'PGVCL',
    tier: 'Standard Tier',
    maxMarginCapPerKw: 5000,
    totalQuotes: 12,
    totalCapacityKw: 310.0,
    status: 'Active',
    joinedDate: '2026-01-20'
  }
];

// Sample Initial Quotation matching Mirana Technocast PDF
export const INITIAL_QUOTATIONS = [
  {
    id: 'SV-2026-Q801',
    date: '17-08-2026',
    dealerId: 'SV-DLR-0841',
    dealerName: 'Rajesh Kumar (Surya Solar Tech)',
    customerName: 'MIRANA TECHNOCAST PVT.LTD.',
    customerPhone: '+91 98250 12345',
    customerEmail: 'procurement@miranacast.com',
    siteAddress: 'Plot 42, GIDC Metoda, Kalawad Road, Rajkot - 360021',
    discom: 'PGVCL (Paschim Gujarat Vij Company Ltd)',
    projectType: 'Commercial & Industrial Rooftop',
    systemCapacityKW: 280.20,
    solarModule: '600 WP TOPCon Mono Bifacial Panel',
    moduleCount: 467,
    pvModuleSize: '4 * 8',
    inverterCapacity: '125 KW',
    inverterCount: '2 NOS',
    baseRatePerKW: 24000,
    dealerMarginPerKW: 2000, // CONFIDENTIAL - Hidden from customer PDF
    discomMeterCharge: 'Extra as actual if more from PGVCL',
    gedaRegistrationCharge: 'Including',
    meterTestingCharge: 'CUSTOMER SCOPE',
    gstPercentage: 8.9,
    baseTotalAmount: 6724800,
    dealerTotalMargin: 560400,
    grandTotalCustomer: 6724800, // Final customer price in invoice
    status: 'Quotation Generated'
  }
];
