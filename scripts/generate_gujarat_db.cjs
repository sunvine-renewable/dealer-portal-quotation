const fs = require('fs');
const path = require('path');

// 1. Exact BOS Price Matrix from PDF (Page 1 Top)
const BOS_PRICE_MATRIX = [
  {
    capacityKW: 2.2,
    noOfModules: 4,
    inverterCapacityKW: 2.2,
    adaniBiFiPrice: 89540,
    apsBiFiPrice: 81400,
    rayzonePrice: 81400,
    topcon585CapacityKW: 2.34,
    waaree585Price: 97227,
    topcon600CapacityKW: 2.4,
    apsTopcon600Price: 92640
  },
  {
    capacityKW: 2.75,
    noOfModules: 5,
    inverterCapacityKW: 3.0,
    adaniBiFiPrice: 106150,
    apsBiFiPrice: 95860,
    rayzonePrice: 95860,
    topcon585CapacityKW: 2.925,
    waaree585Price: 115245,
    topcon600CapacityKW: 3.0,
    apsTopcon600Price: 109800
  },
  {
    capacityKW: 3.3,
    noOfModules: 6,
    inverterCapacityKW: 3.6,
    adaniBiFiPrice: 122100,
    apsBiFiPrice: 110174,
    rayzonePrice: 110174,
    topcon585CapacityKW: 3.51,
    waaree585Price: 133738,
    topcon600CapacityKW: 3.6,
    apsTopcon600Price: 126414
  },
  {
    capacityKW: 3.85,
    noOfModules: 7,
    inverterCapacityKW: 3.6,
    adaniBiFiPrice: 140140,
    apsBiFiPrice: 125510,
    rayzonePrice: 125510,
    topcon585CapacityKW: 4.095,
    waaree585Price: 159705,
    topcon600CapacityKW: 4.2,
    apsTopcon600Price: 151200
  },
  {
    capacityKW: 4.4,
    noOfModules: 8,
    inverterCapacityKW: '4.2/4.4',
    adaniBiFiPrice: 160160,
    apsBiFiPrice: 147100,
    rayzonePrice: 147100,
    topcon585CapacityKW: 4.68,
    waaree585Price: 180096,
    topcon600CapacityKW: 4.8,
    apsTopcon600Price: 171840
  },
  {
    capacityKW: 4.95,
    noOfModules: 9,
    inverterCapacityKW: 5.0,
    adaniBiFiPrice: 182655,
    apsBiFiPrice: 169785,
    rayzonePrice: 169785,
    topcon585CapacityKW: 5.265,
    waaree585Price: 202608,
    topcon600CapacityKW: 5.4,
    apsTopcon600Price: 194400
  },
  {
    capacityKW: 5.5,
    noOfModules: 10,
    inverterCapacityKW: 6.0,
    adaniBiFiPrice: 202950,
    apsBiFiPrice: 183150,
    rayzonePrice: 183150,
    topcon585CapacityKW: 5.85,
    waaree585Price: 225120,
    topcon600CapacityKW: 6.0,
    apsTopcon600Price: 216000
  },
  {
    capacityKW: 6.05,
    noOfModules: 11,
    inverterCapacityKW: 6.0,
    adaniBiFiPrice: 225060,
    apsBiFiPrice: 199650,
    rayzonePrice: 199650,
    topcon585CapacityKW: 6.435,
    waaree585Price: 268983,
    topcon600CapacityKW: 6.6,
    apsTopcon600Price: 275880
  }
];

// 2. Exact BOM Items Table from PDF (Page 1 Bottom)
const BOM_CAPACITY_SPEC = [
  { capacity: '2.16 KW', modules: 4, inv: '1', dcWireRed: '25m', dcWireBlack: '25m', acWireRed: '5m', acWireBlack: '5m', earthingWire: '35m', laWire: '25m', acdb: '1-6 KW', dcdb: '1-6 KW', earthingKit: '1', pvcPipe: '10', pvcElbow: '20', pvcTee: '5', pvcClamp: '1 Pkt', jBolt: '16', mc4Pair: '1 Pair' },
  { capacity: '2.70 KW', modules: 5, inv: '1', dcWireRed: '25m', dcWireBlack: '25m', acWireRed: '5m', acWireBlack: '5m', earthingWire: '35m', laWire: '25m', acdb: '1-6 KW', dcdb: '1-6 KW', earthingKit: '1', pvcPipe: '10', pvcElbow: '20', pvcTee: '5', pvcClamp: '1 Pkt', jBolt: '20', mc4Pair: '1 Pair' },
  { capacity: '3.24 KW', modules: 6, inv: '1', dcWireRed: '25m', dcWireBlack: '25m', acWireRed: '5m', acWireBlack: '5m', earthingWire: '35m', laWire: '25m', acdb: '1-6 KW', dcdb: '1-6 KW', earthingKit: '1', pvcPipe: '12', pvcElbow: '24', pvcTee: '5', pvcClamp: '1 Pkt', jBolt: '24', mc4Pair: '2 Pair' },
  { capacity: '4.32 KW', modules: 8, inv: '1', dcWireRed: '30m', dcWireBlack: '30m', acWireRed: '5m', acWireBlack: '5m', earthingWire: '40m', laWire: '30m', acdb: '1-6 KW', dcdb: '1-6 KW', earthingKit: '1', pvcPipe: '15', pvcElbow: '30', pvcTee: '7', pvcClamp: '1 Pkt', jBolt: '32', mc4Pair: '2 Pair' },
  { capacity: '4.86 KW', modules: 9, inv: '1', dcWireRed: '35m', dcWireBlack: '35m', acWireRed: '5m', acWireBlack: '5m', earthingWire: '45m', laWire: '35m', acdb: '1-6 KW', dcdb: '1-6 KW', earthingKit: '1', pvcPipe: '15', pvcElbow: '30', pvcTee: '7', pvcClamp: '1 Pkt', jBolt: '36', mc4Pair: '3 Pair' },
  { capacity: '5.40 KW', modules: 10, inv: '1', dcWireRed: '35m', dcWireBlack: '35m', acWireRed: '7m', acWireBlack: '7m', earthingWire: '45m', laWire: '35m', acdb: '1-6 KW', dcdb: '1-6 KW', earthingKit: '1', pvcPipe: '15', pvcElbow: '30', pvcTee: '7', pvcClamp: '1 Pkt', jBolt: '40', mc4Pair: '3 Pair' },
  { capacity: '5.94 KW', modules: 11, inv: '1', dcWireRed: '35m', dcWireBlack: '35m', acWireRed: '7m', acWireBlack: '7m', earthingWire: '45m', laWire: '35m', acdb: '1-6 KW', dcdb: '1-6 KW', earthingKit: '1', pvcPipe: '15', pvcElbow: '30', pvcTee: '7', pvcClamp: '1 Pkt', jBolt: '44', mc4Pair: '3 Pair' },
  { capacity: '7.56 KW', modules: 14, inv: '1', dcWireRed: '45m', dcWireBlack: '45m', acWireRed: '7m', acWireBlack: '7m', earthingWire: '50m', laWire: '45m', acdb: '6-10 KW', dcdb: '6-10 KW', earthingKit: '1', pvcPipe: '18', pvcElbow: '36', pvcTee: '7', pvcClamp: '1 Pkt', jBolt: '56', mc4Pair: '4 Pair' },
  { capacity: '8.10 KW', modules: 15, inv: '1', dcWireRed: '45m', dcWireBlack: '45m', acWireRed: '7m', acWireBlack: '7m', earthingWire: '50m', laWire: '45m', acdb: '6-10 KW', dcdb: '6-10 KW', earthingKit: '1', pvcPipe: '18', pvcElbow: '36', pvcTee: '7', pvcClamp: '1 Pkt', jBolt: '60', mc4Pair: '4 Pair' }
];

// Gujarat Cities & their DISCOM mappings
const GUJARAT_ZONES = [
  { city: 'Rajkot', discom: 'PGVCL', zone: 'Saurashtra', weight: 45 },
  { city: 'Ahmedabad', discom: 'UGVCL / Torrent', zone: 'North / Central', weight: 65 },
  { city: 'Surat', discom: 'DGVCL / Torrent', zone: 'South Gujarat', weight: 60 },
  { city: 'Vadodara', discom: 'MGVCL', zone: 'Central Gujarat', weight: 40 },
  { city: 'Morbi', discom: 'PGVCL', zone: 'Saurashtra', weight: 30 },
  { city: 'Bhavnagar', discom: 'PGVCL', zone: 'Saurashtra', weight: 25 },
  { city: 'Jamnagar', discom: 'PGVCL', zone: 'Saurashtra', weight: 25 },
  { city: 'Junagadh', discom: 'PGVCL', zone: 'Saurashtra', weight: 20 },
  { city: 'Gandhinagar', discom: 'UGVCL / Torrent', zone: 'North Gujarat', weight: 20 },
  { city: 'Anand', discom: 'MGVCL', zone: 'Central Gujarat', weight: 20 },
  { city: 'Mehsana', discom: 'UGVCL', zone: 'North Gujarat', weight: 22 },
  { city: 'Bharuch', discom: 'DGVCL', zone: 'South Gujarat', weight: 18 },
  { city: 'Navsari', discom: 'DGVCL', zone: 'South Gujarat', weight: 15 },
  { city: 'Valsad', discom: 'DGVCL', zone: 'South Gujarat', weight: 15 },
  { city: 'Vapi', discom: 'DGVCL', zone: 'South Gujarat', weight: 18 },
  { city: 'Bhuj', discom: 'PGVCL', zone: 'Kutch', weight: 15 },
  { city: 'Gandhidham', discom: 'PGVCL', zone: 'Kutch', weight: 15 },
  { city: 'Surendranagar', discom: 'PGVCL', zone: 'Saurashtra', weight: 15 },
  { city: 'Amreli', discom: 'PGVCL', zone: 'Saurashtra', weight: 12 },
  { city: 'Porbandar', discom: 'PGVCL', zone: 'Saurashtra', weight: 12 },
  { city: 'Himatnagar', discom: 'UGVCL', zone: 'North Gujarat', weight: 12 },
  { city: 'Palanpur', discom: 'UGVCL', zone: 'North Gujarat', weight: 12 },
  { city: 'Godhra', discom: 'MGVCL', zone: 'Central Gujarat', weight: 10 },
  { city: 'Veraval', discom: 'PGVCL', zone: 'Saurashtra', weight: 10 },
  { city: 'Gondal', discom: 'PGVCL', zone: 'Saurashtra', weight: 10 },
  { city: 'Jetpur', discom: 'PGVCL', zone: 'Saurashtra', weight: 10 },
  { city: 'Nadiad', discom: 'MGVCL', zone: 'Central Gujarat', weight: 12 },
  { city: 'Kalol', discom: 'UGVCL', zone: 'North Gujarat', weight: 10 },
  { city: 'Ankleshwar', discom: 'DGVCL', zone: 'South Gujarat', weight: 12 },
  { city: 'Botad', discom: 'PGVCL', zone: 'Saurashtra', weight: 10 }
];

const GUJARATI_FIRST_NAMES = [
  'Rajesh', 'Amit', 'Karan', 'Bhavin', 'Paresh', 'Nitin', 'Hasmukh', 'Jignesh',
  'Prakash', 'Mahesh', 'Dipak', 'Ketan', 'Chetan', 'Mukesh', 'Harsh', 'Chirag',
  'Pratik', 'Mayur', 'Sanjay', 'Manish', 'Kishore', 'Girish', 'Dharmesh', 'Bhavesh',
  'Vipul', 'Haresh', 'Nilesh', 'Pankaj', 'Vijay', 'Ashok', 'Dinesh', 'Bharat',
  'Jayesh', 'Dhaval', 'Ramesh', 'Jagdish', 'Narendra', 'Rohit', 'Kamlesh', 'Bipin'
];

const GUJARATI_SURNAMES = [
  'Patel', 'Shah', 'Mehta', 'Desai', 'Chauhan', 'Jadeja', 'Vala', 'Dabhi',
  'Joshi', 'Trivedi', 'Dave', 'Pandya', 'Parmar', 'Solanki', 'Prajapati', 'Panchal',
  'Soni', 'Gohil', 'Makwana', 'Zala', 'Bhatt', 'Rathod', 'Gajjar', 'Vora',
  'Kapadia', 'Kotak', 'Bavishi', 'Kansara', 'Ruparelia', 'Dholakia', 'Maniar', 'Sanghavi'
];

const COMPANY_PREFIXES = [
  'Surya', 'Sunvine', 'GreenRay', 'Apex', 'Gir', 'Somnath', 'Kutch', 'Navkar',
  'Maruti', 'Shree Ram', 'Saurashtra', 'Charotar', 'Sabarmati', 'Riddhi Siddhi',
  'Dwarkadhish', 'Khodiyar', 'Amba', 'Bhavani', 'Shreeji', 'Mahavir', 'Aditya',
  'Rudra', 'Jay', 'Shivam', 'Om', 'Krishna', 'Vraj', 'Nilkanth', 'Gayatri', 'Shakti'
];

const COMPANY_SUFFIXES = [
  'Solar Tech Pvt Ltd', 'Renewable Solutions LLP', 'Energy Systems', 'Solar Power EPC',
  'Green Energy Infra', 'Solar Solutions', 'CleanTech Enterprises', 'Solar EPC Engineers',
  'Sun Energy Works', 'Rooftop Solar Agency', 'Power Projects LLP', 'Solar Dynamics'
];

const TIERS = [
  { name: 'Platinum Partner', cap: 7500, weight: 20 },
  { name: 'Gold EPC Partner', cap: 6000, weight: 45 },
  { name: 'Standard Tier', cap: 5000, weight: 25 },
  { name: 'Diamond Partner', cap: 8000, weight: 10 }
];

function generateDealers(count = 550) {
  const dealers = [];
  
  // Seed First Dealer: Surya Solar Tech (Featured Dealer in Rajkot)
  dealers.push({
    id: 'SV-DLR-0841',
    firmName: 'Surya Solar Tech Private Limited',
    contactPerson: 'Rajesh Kumar',
    mobile: '9876543210',
    email: 'rajesh@suryasolartech.in',
    city: 'Rajkot',
    state: 'Gujarat',
    discom: 'PGVCL',
    tier: 'Gold EPC Partner',
    maxMarginCapPerKw: 6000,
    totalQuotes: 48,
    totalCapacityKw: 1420.5,
    gstin: '24AFPFS7402A1Z7',
    pan: 'AFPFS7402A',
    status: 'Active',
    joinedDate: '2024-11-12',
    avatar: '/dealer_avatar.jpg',
    address: 'G-705, Near Swaminarayan Restaurant, Kalawad Road, Rajkot - 360021'
  });

  // Seed Second Dealer: Gir Green Solutions (Surat)
  dealers.push({
    id: 'SV-DLR-0842',
    firmName: 'Gir Green Solutions LLP',
    contactPerson: 'Amit Patel',
    mobile: '9428011982',
    email: 'amit@girgreensolar.com',
    city: 'Surat',
    state: 'Gujarat',
    discom: 'DGVCL',
    tier: 'Platinum Partner',
    maxMarginCapPerKw: 7500,
    totalQuotes: 68,
    totalCapacityKw: 2850.0,
    gstin: '24AABCG1198P1Z3',
    pan: 'AABCG1198P',
    status: 'Active',
    joinedDate: '2024-09-04',
    address: 'Ring Road Commercial Hub, Adajan, Surat - 395009'
  });

  // Seed Third Dealer: Apex Energy Morbi
  dealers.push({
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
    totalQuotes: 32,
    totalCapacityKw: 840.0,
    gstin: '24AACCA9876S1Z9',
    pan: 'AACCA9876S',
    status: 'Active',
    joinedDate: '2025-01-20',
    address: '8-A National Highway, Ceramic Plaza, Morbi - 363642'
  });

  // Generate 547 more Gujarat dealers
  for (let i = 4; i <= count; i++) {
    const idNum = String(i).padStart(4, '0');
    const id = `SV-DLR-${idNum}`;
    
    // Pick city weighted
    const zoneIndex = Math.floor(Math.random() * GUJARAT_ZONES.length);
    const zone = GUJARAT_ZONES[zoneIndex];
    
    // Pick name
    const fName = GUJARATI_FIRST_NAMES[Math.floor(Math.random() * GUJARATI_FIRST_NAMES.length)];
    const lName = GUJARATI_SURNAMES[Math.floor(Math.random() * GUJARATI_SURNAMES.length)];
    const contactPerson = `${fName} ${lName}`;
    
    // Pick firm
    const prefix = COMPANY_PREFIXES[Math.floor(Math.random() * COMPANY_PREFIXES.length)];
    const suffix = COMPANY_SUFFIXES[Math.floor(Math.random() * COMPANY_SUFFIXES.length)];
    // Sometimes use surname in firm name (e.g. Patel Solar Energy)
    const firmName = Math.random() > 0.65 ? `${lName} ${suffix}` : `${prefix} ${suffix}`;
    
    // Generate valid Gujarat GSTIN (starts with 24)
    const randomPanLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const panP1 = randomPanLetters[Math.floor(Math.random() * 26)] + randomPanLetters[Math.floor(Math.random() * 26)] + randomPanLetters[Math.floor(Math.random() * 26)];
    const panEntity = Math.random() > 0.5 ? 'P' : (Math.random() > 0.5 ? 'C' : 'F');
    const panInitial = lName[0] || 'P';
    const panDigits = Math.floor(1000 + Math.random() * 9000);
    const panEnd = randomPanLetters[Math.floor(Math.random() * 26)];
    const pan = `${panP1}${panEntity}${panInitial}${panDigits}${panEnd}`;
    const gstin = `24${pan}1Z${Math.floor(1 + Math.random() * 9)}`;
    
    // Mobile
    const mobilePrefix = ['98', '97', '94', '99', '96', '91', '70', '82'][Math.floor(Math.random() * 8)];
    const mobile = `${mobilePrefix}${Math.floor(10000000 + Math.random() * 90000000)}`;
    
    // Email
    const cleanFirm = firmName.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12);
    const email = `${fName.toLowerCase()}@${cleanFirm}.in`;
    
    // Tier
    const tierRand = Math.random() * 100;
    let tier = TIERS[1]; // default Gold
    if (tierRand < 15) tier = TIERS[0]; // Platinum
    else if (tierRand < 60) tier = TIERS[1]; // Gold
    else if (tierRand < 90) tier = TIERS[2]; // Standard
    else tier = TIERS[3]; // Diamond
    
    // Status
    const statusRand = Math.random() * 100;
    let status = 'Active';
    if (statusRand > 88) status = 'Pending';
    else if (statusRand > 82) status = 'Suspended';
    
    const quotesCount = status === 'Active' ? Math.floor(3 + Math.random() * 50) : Math.floor(Math.random() * 4);
    const capacityKw = +(quotesCount * (3.5 + Math.random() * 12)).toFixed(1);
    
    const year = 2024 + (Math.random() > 0.5 ? 1 : 0);
    const month = String(Math.floor(1 + Math.random() * 12)).padStart(2, '0');
    const day = String(Math.floor(1 + Math.random() * 28)).padStart(2, '0');
    const joinedDate = `${year}-${month}-${day}`;

    dealers.push({
      id,
      firmName,
      contactPerson,
      mobile,
      email,
      city: zone.city,
      state: 'Gujarat',
      discom: zone.discom,
      tier: tier.name,
      maxMarginCapPerKw: tier.cap,
      totalQuotes: quotesCount,
      totalCapacityKw: capacityKw,
      gstin,
      pan,
      status,
      joinedDate,
      address: `GIDC Industrial Estate, Near Main Market, ${zone.city}, Gujarat`
    });
  }

  return dealers;
}

// 3. Generate Realistic Gujarat Quotations
function generateQuotations(dealers) {
  const quotes = [];
  const activeDealers = dealers.filter(d => d.status === 'Active');

  const customers = [
    { name: 'MIRANA TECHNOCAST PVT.LTD.', person: 'Mr. Pareshbhai', city: 'Rajkot', discom: 'PGVCL', kw: 280.20, type: 'Commercial & Industrial Rooftop', rate: 24000, margin: 2000, status: 'Active / Sent' },
    { name: 'Mehta Textiles Ltd', person: 'Ketanbhai Mehta', city: 'Ahmedabad', discom: 'UGVCL', kw: 10.0, type: 'Commercial & Industrial Rooftop', rate: 54000, margin: 4500, status: 'Active / Sent' },
    { name: 'Kavita Patel', person: 'Mrs. Kavita Patel', city: 'Surat', discom: 'DGVCL', kw: 3.3, type: 'Residential Rooftop', rate: 64000, margin: 6000, status: 'Customer Viewed' },
    { name: 'Rajeshbhai Vaghani', person: 'Rajeshbhai Vaghani', city: 'Rajkot', discom: 'PGVCL', kw: 5.5, type: 'Residential Rooftop', rate: 62000, margin: 4000, status: 'Active / Sent' },
    { name: 'Patel Cold Storage Pvt Ltd', person: 'Nitin Patel', city: 'Vadodara', discom: 'MGVCL', kw: 50.0, type: 'Commercial & Industrial Rooftop', rate: 38000, margin: 3500, status: 'Pending Approval' },
    { name: 'Morbi Ceramic Tiles Plant 3', person: 'Bhavinbhai Shah', city: 'Morbi', discom: 'PGVCL', kw: 125.0, type: 'Commercial & Industrial Rooftop', rate: 26000, margin: 2500, status: 'Active / Sent' },
    { name: 'Dr. Hiren Dave', person: 'Dr. Hiren Dave', city: 'Ahmedabad', discom: 'Torrent Power', kw: 6.05, type: 'Residential Rooftop', rate: 62000, margin: 4500, status: 'Active / Sent' },
    { name: 'Jagdish Cotton Ginning Mill', person: 'Jagdishbhai Prajapati', city: 'Mehsana', discom: 'UGVCL', kw: 80.0, type: 'Commercial & Industrial Rooftop', rate: 28000, margin: 3000, status: 'Active / Sent' },
    { name: 'Bhavnagar Salt & Chemicals Ltd', person: 'Girishbhai Zala', city: 'Bhavnagar', discom: 'PGVCL', kw: 60.0, type: 'Commercial & Industrial Rooftop', rate: 33000, margin: 3200, status: 'Customer Viewed' },
    { name: 'Jamnagar Brass Parts Works', person: 'Mayurbhai Jadeja', city: 'Jamnagar', discom: 'PGVCL', kw: 45.0, type: 'Commercial & Industrial Rooftop', rate: 34000, margin: 3000, status: 'Active / Sent' },
    { name: 'Gondal Oil Mill Industries', person: 'Hareshbhai Patel', city: 'Gondal', discom: 'PGVCL', kw: 100.0, type: 'Commercial & Industrial Rooftop', rate: 27000, margin: 2500, status: 'Active / Sent' },
    { name: 'Sanjaybhai Trivedi (Bungalow)', person: 'Sanjay Trivedi', city: 'Gandhinagar', discom: 'Torrent Power', kw: 4.4, type: 'Residential Rooftop', rate: 63000, margin: 5000, status: 'Active / Sent' },
    { name: 'Ankleshwar Pharma Intermediates', person: 'Dipak Desai', city: 'Ankleshwar', discom: 'DGVCL', kw: 150.0, type: 'Commercial & Industrial Rooftop', rate: 25000, margin: 2000, status: 'Pending Approval' },
    { name: 'Veraval Fisheries Export Unit', person: 'Mansukhbhai Vala', city: 'Veraval', discom: 'PGVCL', kw: 75.0, type: 'Commercial & Industrial Rooftop', rate: 30000, margin: 2800, status: 'Active / Sent' },
    { name: 'Navsari Floriculture Nursery', person: 'Pankajbhai Soni', city: 'Navsari', discom: 'DGVCL', kw: 15.0, type: 'Commercial & Industrial Rooftop', rate: 52000, margin: 4000, status: 'Active / Sent' },
    { name: 'Surendranagar Ginning Complex', person: 'Chirag Chauhan', city: 'Surendranagar', discom: 'PGVCL', kw: 90.0, type: 'Commercial & Industrial Rooftop', rate: 27500, margin: 2500, status: 'Active / Sent' },
    { name: 'Anand Milk Dairy Chilling Center', person: 'Vipulbhai Patel', city: 'Anand', discom: 'MGVCL', kw: 40.0, type: 'Commercial & Industrial Rooftop', rate: 36000, margin: 3000, status: 'Active / Sent' },
    { name: 'Kutch Mineral Processing Plant', person: 'Jigneshbhai Kotak', city: 'Bhuj', discom: 'PGVCL', kw: 110.0, type: 'Commercial & Industrial Rooftop', rate: 26500, margin: 2200, status: 'Customer Viewed' },
    { name: 'Bharuch Chemical Logistics Hub', person: 'Maheshbhai Kapadia', city: 'Bharuch', discom: 'DGVCL', kw: 65.0, type: 'Commercial & Industrial Rooftop', rate: 32000, margin: 2800, status: 'Active / Sent' },
    { name: 'Porbandar Marine Engineering', person: 'Dharmesh Solanki', city: 'Porbandar', discom: 'PGVCL', kw: 35.0, type: 'Commercial & Industrial Rooftop', rate: 39000, margin: 3500, status: 'Active / Sent' }
  ];

  customers.forEach((cust, idx) => {
    const d = activeDealers[idx % activeDealers.length];
    const quoteNum = `SV-2026-Q${800 + idx}`;
    const baseTotal = Math.round(cust.kw * cust.rate);
    const dealerMargin = Math.round(cust.kw * cust.margin);
    const grandTotal = baseTotal + dealerMargin;
    
    // Central Subsidy for Residential
    let subsidy = 0;
    if (cust.type.includes('Residential')) {
      if (cust.kw >= 3) subsidy = 78000;
      else if (cust.kw >= 2) subsidy = 60000;
      else subsidy = 30000;
    }
    const netPayable = Math.max(0, grandTotal - subsidy);

    quotes.push({
      id: quoteNum,
      quoteNumber: quoteNum,
      date: `2026-0${1 + (idx % 8)}-${10 + (idx % 18)}`,
      dealerId: d.id,
      dealerName: `${d.contactPerson} (${d.firmName})`,
      customerName: cust.name,
      contactPerson: cust.person,
      customerPhone: `+91 ${d.mobile}`,
      customerEmail: `info@${cust.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10)}.in`,
      location: `${cust.city}, Gujarat`,
      city: cust.city,
      state: 'Gujarat',
      siteAddress: `Plot No. ${12 + idx * 3}, GIDC Estate, ${cust.city}, Gujarat`,
      discom: cust.discom,
      projectType: cust.type,
      systemCapacityKW: cust.kw,
      solarModule: cust.kw > 10 ? 'APS 600WP TOPCon Mono Bifacial Panel' : 'Waaree 585WP TOPCon Bifacial Dual Glass',
      moduleCount: Math.ceil((cust.kw * 1000) / (cust.kw > 10 ? 600 : 585)),
      pvModuleSize: '4 * 8',
      inverterCapacity: cust.kw >= 100 ? '125 KW' : (cust.kw >= 40 ? '50 KW' : `${Math.ceil(cust.kw)} kW`),
      inverterType: cust.kw >= 100 ? 'SOLARYAAN / SOLIS 125 KW Three-Phase Grid Tied' : 'Sunvine Smart Series MPPT Grid-Tied',
      inverterCount: '1 NOS',
      baseRatePerKW: cust.rate,
      dealerMarginPerKW: cust.margin,
      discomMeterCharge: 'Including',
      gedaRegistrationCharge: 'Including',
      meterTestingCharge: cust.kw > 10 ? 'CUSTOMER SCOPE' : 'DISCOM Scope',
      gstPercentage: 13.8,
      baseTotalAmount: baseTotal,
      dealerTotalMargin: dealerMargin,
      grandTotalCustomer: grandTotal,
      subsidyAmount: subsidy,
      netPayable: netPayable,
      status: cust.status,
      statusClass: cust.status.includes('Sent') ? 'bg-primary/15 text-primary' : 'bg-tertiary-container/30 text-on-tertiary-container'
    });
  });

  return quotes;
}

const dealers = generateDealers(550);
const quotations = generateQuotations(dealers);

const fileContent = `// Real Testing Database — 100% Gujarat State Solar EPC Network & BOS Price List
// Generated from "BOS PRICE LIST ALL.pdf" & Sunvine Renewable Energy Specifications

export const SUNVINE_OFFICIAL_PROFILE = {
  companyName: 'SUNVINE RENEWABLE',
  gstin: '24AFPFS7402A1Z7',
  address: 'G-705, near swaminarayan restaurant, Rajkot, Gujarat - 360021',
  tagline: 'Empowering Gujarat with Clean Solar Energy',
  state: 'Gujarat',
  notes: [
    'ALL PRICES ARE INCLUDING GST',
    'TRANSPORTATION AND INSTALLATION - DEALER SCOPE',
    'LIST OF COMPULSORY REQUIRED DOCUMENTS: LIGHT BILL, BANK DETAIL, AADHAR CARD, MOBILE NO.'
  ],
  bankDetails: {
    firmName: 'SUNVINE RENEWABLE',
    bankName: 'HDFC BANK LTD.',
    accountNumber: '99998000050580',
    ifscCode: 'HDFC0002012',
    branch: 'METODA BRANCH, RAJKOT',
    email: 'sunvinerenewable@gmail.com'
  },
  terms: {
    modulePerformanceWarrantyYears: 30,
    moduleDefectWarrantyYears: 12,
    inverterWarrantyYears: 8,
    workmanshipWarrantyYears: 5,
    paymentTerms: '10% advance with purchase order, 90% before material dispatch.',
    deliveryDays: 15,
    validityDays: 15,
    supportPhone: '+91 95865 33750',
    helpline: '8000050580',
    website: 'www.sunvinerenewable.com'
  }
};

// Exact BOS Price List from PDF (Page 1 Top)
export const PDF_BOS_PRICE_MATRIX = ${JSON.stringify(BOS_PRICE_MATRIX, null, 2)};

// Exact Bill of Materials (BOM) Specs from PDF (Page 1 Bottom)
export const PDF_BOM_SPECIFICATIONS = ${JSON.stringify(BOM_CAPACITY_SPEC, null, 2)};

// Real Approved Solar Modules Catalog
export const GUJARAT_MODULES = [
  {
    id: 'mod-aps-600',
    brand: 'APS / Sunvine Premier',
    model: '600WP TOPCON MONO BIFACIAL Panel',
    wattage: 600,
    cellTech: 'TOPCon Mono Bifacial',
    efficiency: '22.8%',
    ratePerWp: '₹ 18.00/Wp',
    warrantyYears: 30,
    isDefault: true
  },
  {
    id: 'mod-waaree-585',
    brand: 'Waaree Energies',
    model: '585WP TOPCon Bifacial Dual Glass (HyperIon)',
    wattage: 585,
    cellTech: 'TOPCon Mono Bifacial',
    efficiency: '22.4%',
    ratePerWp: '₹ 18.25/Wp',
    warrantyYears: 30,
    isDefault: false
  },
  {
    id: 'mod-adani-550',
    brand: 'Adani Solar',
    model: 'Elan Bi-550W Mono PERC Half-Cut',
    wattage: 550,
    cellTech: 'Mono PERC Bifacial',
    efficiency: '21.8%',
    ratePerWp: '₹ 17.80/Wp',
    warrantyYears: 25,
    isDefault: false
  },
  {
    id: 'mod-aps-550',
    brand: 'APS Bi-Fi',
    model: '550W Bifacial Dual Glass',
    wattage: 550,
    cellTech: 'TOPCon Mono Bifacial',
    efficiency: '21.6%',
    ratePerWp: '₹ 17.50/Wp',
    warrantyYears: 25,
    isDefault: false
  },
  {
    id: 'mod-rayzone-550',
    brand: 'Rayzone Solar',
    model: '550W Bi-Fi Mono PERC Half-Cut',
    wattage: 550,
    cellTech: 'Mono PERC Bifacial',
    efficiency: '21.6%',
    ratePerWp: '₹ 17.50/Wp',
    warrantyYears: 25,
    isDefault: false
  }
];

// Real Approved Solar Inverters Catalog
export const GUJARAT_INVERTERS = [
  {
    id: 'inv-solis-2_2',
    brand: 'Solis / Solaryaan',
    model: '2.2 KW Single Phase Grid-Tied Inverter',
    capacityKW: 2.2,
    phase: 'Single Phase',
    efficiency: '97.8%',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-sunvine-3',
    brand: 'Sunvine Smart Series',
    model: '3.0 KW 1-Phase Smart MPPT On-Grid',
    capacityKW: 3.0,
    phase: 'Single Phase',
    efficiency: '98.0%',
    warrantyYears: 8,
    isDefault: true
  },
  {
    id: 'inv-solis-3_6',
    brand: 'Solis / Vsole',
    model: '3.6 KW Single Phase Dual MPPT On-Grid',
    capacityKW: 3.6,
    phase: 'Single Phase',
    efficiency: '98.2%',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-sunvine-5',
    brand: 'Sunvine Smart Series',
    model: '5.0 KW 3-Phase Smart MPPT On-Grid',
    capacityKW: 5.0,
    phase: 'Three Phase',
    efficiency: '98.4%',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-sunvine-6',
    brand: 'Sunvine Smart Series',
    model: '6.0 KW 3-Phase Smart MPPT On-Grid',
    capacityKW: 6.0,
    phase: 'Three Phase',
    efficiency: '98.4%',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-growatt-10',
    brand: 'Growatt / Deye',
    model: '10.0 KW 3-Phase Dual MPPT On-Grid',
    capacityKW: 10.0,
    phase: 'Three Phase',
    efficiency: '98.6%',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-solis-50',
    brand: 'Solis Cloud Series',
    model: '50.0 KW 3-Phase Grid-Tied Inverter with Wi-Fi Logger',
    capacityKW: 50.0,
    phase: 'Three Phase',
    efficiency: '98.7%',
    warrantyYears: 8,
    isDefault: false
  },
  {
    id: 'inv-solaryaan-125',
    brand: 'Solaryaan / Solis / Vsole',
    model: '125.0 KW String type Three-Phase Grid Tied Inverter',
    capacityKW: 125.0,
    phase: 'Three Phase',
    efficiency: '99.0%',
    warrantyYears: 8,
    isDefault: false
  }
];

// 550 Registered Gujarat Solar EPC Dealers (100% Gujarat Only)
export const GUJARAT_DEALERS = ${JSON.stringify(dealers, null, 2)};

// Real Gujarat Quotations Dataset
export const GUJARAT_QUOTATIONS = ${JSON.stringify(quotations, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'gujaratDatabase.js'), fileContent, 'utf8');
console.log('Successfully generated src/data/gujaratDatabase.js!');
console.log('Total Gujarat Dealers:', dealers.length);
console.log('Total Gujarat Quotations:', quotations.length);
