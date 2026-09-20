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

// Sample Initial Quotations
export const INITIAL_QUOTATIONS = [
  {
    id: 'SV-2026-Q801',
    date: '17-08-2026',
    dealerId: 'SV-DLR-0841',
    dealerName: 'Rajesh Kumar (Surya Solar Tech)',
    customerName: 'MIRANA TECHNOCAST PVT.LTD.',
    customerPhone: '+91 98250 12345',
    customerEmail: 'procurement@miranacast.com',
    location: 'Metoda GIDC, Rajkot',
    siteAddress: 'Plot 42, GIDC Metoda, Kalawad Road, Rajkot - 360021',
    discom: 'PGVCL (Paschim Gujarat Vij Company Ltd)',
    projectType: 'Commercial & Industrial Rooftop',
    systemCapacityKW: 280.20,
    solarModule: '600 WP TOPCon Mono Bifacial Panel',
    moduleCount: 467,
    pvModuleSize: '4 * 8',
    inverterCapacity: '125 KW',
    inverterType: 'SOLARYAAN / SOLIS / VSOLE 125 KW Three-Phase Grid Tied',
    inverterCount: '2 NOS',
    baseRatePerKW: 24000,
    dealerMarginPerKW: 2000,
    discomMeterCharge: 'Extra as actual if more from PGVCL',
    gedaRegistrationCharge: 'Including',
    meterTestingCharge: 'CUSTOMER SCOPE',
    gstPercentage: 8.9,
    baseTotalAmount: 6724800,
    dealerTotalMargin: 560400,
    grandTotalCustomer: 6724800,
    subsidyAmount: 0,
    netPayable: 6724800,
    status: 'Active / Sent',
    statusClass: 'bg-primary/15 text-primary'
  },
  {
    id: 'SV-2025-0408',
    date: 'Today, 10:45 AM',
    dealerId: 'SV-DLR-0841',
    dealerName: 'Rajesh Kumar (Surya Solar Tech)',
    customerName: 'Anand Sharma',
    customerPhone: '+91 98200 54321',
    customerEmail: 'anand.sharma@gmail.com',
    location: 'Pune, Maharashtra',
    siteAddress: 'Flat 402, Green Acre Heights, Baner, Pune - 411045',
    discom: 'MSEDCL',
    projectType: 'Residential Rooftop',
    systemCapacityKW: 5.0,
    solarModule: 'Sunvine Monocrystalline Half-Cut 550W (Tier 1)',
    moduleCount: 10,
    pvModuleSize: '4 * 8',
    inverterCapacity: '5 kW',
    inverterType: 'Sunvine Solar Hybrid Inverter 5kW 3-Phase',
    inverterCount: '1 NOS',
    baseRatePerKW: 65000,
    dealerMarginPerKW: 4000,
    discomMeterCharge: 'Including',
    gedaRegistrationCharge: 'Including',
    meterTestingCharge: 'DISCOM Scope',
    gstPercentage: 8.9,
    baseTotalAmount: 325000,
    dealerTotalMargin: 20000,
    grandTotalCustomer: 345000,
    subsidyAmount: 78000,
    netPayable: 267000,
    status: 'Active / Sent',
    statusClass: 'bg-primary/15 text-primary'
  },
  {
    id: 'SV-2025-0407',
    date: 'Yesterday',
    dealerId: 'SV-DLR-0841',
    dealerName: 'Rajesh Kumar (Surya Solar Tech)',
    customerName: 'Kavita Patel',
    customerPhone: '+91 98980 12345',
    customerEmail: 'kavita.patel@yahoo.com',
    location: 'Surat, Gujarat',
    siteAddress: 'B-14, Shanti Niketan Society, Adajan, Surat - 395009',
    discom: 'DGVCL',
    projectType: 'Residential Rooftop',
    systemCapacityKW: 3.0,
    solarModule: 'Sunvine Monocrystalline Half-Cut 550W (Tier 1)',
    moduleCount: 6,
    pvModuleSize: '4 * 8',
    inverterCapacity: '3 kW',
    inverterType: 'Sunvine On-Grid String Inverter 3kW Single Phase',
    inverterCount: '1 NOS',
    baseRatePerKW: 64000,
    dealerMarginPerKW: 6000,
    discomMeterCharge: 'Including',
    gedaRegistrationCharge: 'Including',
    meterTestingCharge: 'DISCOM Scope',
    gstPercentage: 8.9,
    baseTotalAmount: 192000,
    dealerTotalMargin: 18000,
    grandTotalCustomer: 210000,
    subsidyAmount: 78000,
    netPayable: 132000,
    status: 'Customer Viewed',
    statusClass: 'bg-tertiary-container/30 text-on-tertiary-container'
  },
  {
    id: 'SV-2025-0406',
    date: '18 Oct 2024',
    dealerId: 'SV-DLR-0841',
    dealerName: 'Rajesh Kumar (Surya Solar Tech)',
    customerName: 'Mehta Textiles Ltd',
    customerPhone: '+91 98255 67890',
    customerEmail: 'accounts@mehtatextiles.com',
    location: 'Ahmedabad, Gujarat',
    siteAddress: 'Shed No. 8, Narol Textile Park, Ahmedabad - 382405',
    discom: 'UGVCL',
    projectType: 'Commercial & Industrial Rooftop',
    systemCapacityKW: 10.0,
    solarModule: 'Premier Energies 585W TOPCon Bifacial Dual Glass',
    moduleCount: 18,
    pvModuleSize: '4 * 8',
    inverterCapacity: '10 kW',
    inverterType: 'Growatt / Deye 10 KW 3-Phase Dual MPPT On-Grid',
    inverterCount: '1 NOS',
    baseRatePerKW: 54000,
    dealerMarginPerKW: 4500,
    discomMeterCharge: 'Extra as actual',
    gedaRegistrationCharge: 'Including',
    meterTestingCharge: 'CUSTOMER SCOPE',
    gstPercentage: 8.9,
    baseTotalAmount: 540000,
    dealerTotalMargin: 45000,
    grandTotalCustomer: 585000,
    subsidyAmount: 0,
    netPayable: 585000,
    status: 'Pending Approval',
    statusClass: 'bg-[#F9A825]/20 text-[#B27204]'
  },
  {
    id: 'SV-2025-0405',
    date: '15 Oct 2024',
    dealerId: 'SV-DLR-0841',
    dealerName: 'Rajesh Kumar (Surya Solar Tech)',
    customerName: 'Vikram Rathore',
    customerPhone: '+91 97123 45678',
    customerEmail: 'vikram.rathore@outlook.com',
    location: 'Jaipur, Rajasthan',
    siteAddress: 'Villa 19, Royal Enclave, Vaishali Nagar, Jaipur - 302021',
    discom: 'JVVNL',
    projectType: 'Residential Rooftop',
    systemCapacityKW: 7.5,
    solarModule: 'Sunvine Monocrystalline Half-Cut 550W (Tier 1)',
    moduleCount: 14,
    pvModuleSize: '4 * 8',
    inverterCapacity: '7.5 kW',
    inverterType: 'Sunvine Solar Hybrid Inverter 5kW 3-Phase',
    inverterCount: '1 NOS',
    baseRatePerKW: 62000,
    dealerMarginPerKW: 6667,
    discomMeterCharge: 'Including',
    gedaRegistrationCharge: 'Including',
    meterTestingCharge: 'DISCOM Scope',
    gstPercentage: 8.9,
    baseTotalAmount: 465000,
    dealerTotalMargin: 50000,
    grandTotalCustomer: 515000,
    subsidyAmount: 78000,
    netPayable: 437000,
    status: 'Won / Converted',
    statusClass: 'bg-primary-fixed text-on-primary-fixed'
  },
  {
    id: 'SV-2025-0404',
    date: '12 Oct 2024',
    dealerId: 'SV-DLR-0841',
    dealerName: 'Rajesh Kumar (Surya Solar Tech)',
    customerName: 'Dr. Suresh Nair',
    customerPhone: '+91 98450 12345',
    customerEmail: 'dr.suresh@apollohealth.org',
    location: 'Bangalore, Karnataka',
    siteAddress: '34, 4th Cross, Indiranagar, Bangalore - 560038',
    discom: 'BESCOM',
    projectType: 'Residential Rooftop',
    systemCapacityKW: 4.0,
    solarModule: 'Sunvine Monocrystalline Half-Cut 550W (Tier 1)',
    moduleCount: 8,
    pvModuleSize: '4 * 8',
    inverterCapacity: '4 kW',
    inverterType: 'Sunvine On-Grid String Inverter 5kW Single Phase',
    inverterCount: '1 NOS',
    baseRatePerKW: 62500,
    dealerMarginPerKW: 6250,
    discomMeterCharge: 'Including',
    gedaRegistrationCharge: 'Including',
    meterTestingCharge: 'DISCOM Scope',
    gstPercentage: 8.9,
    baseTotalAmount: 250000,
    dealerTotalMargin: 25000,
    grandTotalCustomer: 275000,
    subsidyAmount: 78000,
    netPayable: 197000,
    status: 'Customer Viewed',
    statusClass: 'bg-tertiary-container/30 text-on-tertiary-container'
  }
];

// Production-grade Initial Notifications for EPC Solar Dealer Portal
export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'success',
    icon: 'check_circle',
    title: 'Quotation #SV-Q-1042 approved',
    description: 'Your quotation for Rajesh Kumar has been approved by MNRE compliance team.',
    timestamp: '2m ago',
    read: false,
    targetTab: 'my_quotes'
  },
  {
    id: 'notif-2',
    type: 'info',
    icon: 'bolt',
    title: 'DISCOM tariff updated for Western MH',
    description: 'MSEDCL net-metering grid injection tariff revised to ₹3.82/unit for rooftop installations.',
    timestamp: '45m ago',
    read: false,
    targetTab: 'pricing_master'
  },
  {
    id: 'notif-3',
    type: 'warning',
    icon: 'shield',
    title: 'Margin governance policy changed',
    description: 'Admin updated maximum dealer margin ceiling to ₹8,000/kW for Residential 1–3 kW systems.',
    timestamp: '1h ago',
    read: false,
    targetTab: 'dealer_settings'
  },
  {
    id: 'notif-4',
    type: 'info',
    icon: 'support_agent',
    title: 'New message from Sunvine Support Desk',
    description: 'Dispatch confirmation for APS 600W TOPCon Bifacial panels for SV-2025-0402.',
    timestamp: '3h ago',
    read: true,
    targetTab: 'profile'
  },
  {
    id: 'notif-5',
    type: 'warning',
    icon: 'schedule',
    title: 'MNRE Channel Registration expiring in 30 days',
    description: 'Your MNRE Partner empanelment (MNRE/2023/MH/4412) renewal window is now open.',
    timestamp: 'Yesterday',
    read: true,
    targetTab: 'profile'
  },
  {
    id: 'notif-6',
    type: 'alert',
    icon: 'cancel',
    title: 'Quotation #SV-Q-1038 rejected — revision needed',
    description: 'DISCOM load clearance rejected due to sanction capacity mismatch. Please update and re-submit.',
    timestamp: 'Yesterday',
    read: true,
    targetTab: 'my_quotes'
  },
  {
    id: 'notif-7',
    type: 'info',
    icon: 'account_balance',
    title: 'Bank commission rate updated',
    description: 'Quarterly EPC channel incentive payout structure and commission schedule updated for Q3.',
    timestamp: '2d ago',
    read: true,
    targetTab: 'dashboard'
  },
  {
    id: 'notif-8',
    type: 'info',
    icon: 'description',
    title: 'New firmware & compliance document uploaded',
    description: 'Standard DISCOM 3-Phase Grid-Tie SLD schematic template (v2.4) uploaded to catalog.',
    timestamp: '3d ago',
    read: true,
    targetTab: 'hardware_master'
  },
  {
    id: 'notif-9',
    type: 'success',
    icon: 'verified_user',
    title: 'Dealer KYC verification completed',
    description: 'GSTIN 27AABCS1429B1Z8 verified. Authorized Tier-1 Gold EPC status active.',
    timestamp: '4d ago',
    read: true,
    targetTab: 'profile'
  },
  {
    id: 'notif-10',
    type: 'info',
    icon: 'build',
    title: 'System maintenance scheduled this weekend',
    description: 'Portal cloud synchronization upgrade scheduled for Saturday 11:00 PM – 1:00 AM IST.',
    timestamp: '5d ago',
    read: true,
    targetTab: 'dashboard'
  }
];

