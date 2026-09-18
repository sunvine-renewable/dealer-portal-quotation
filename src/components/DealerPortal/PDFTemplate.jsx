import React from 'react';

// Format Indian Rupee currency with commas
const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(val);
};

export default function PDFTemplate({ quotation }) {
  if (!quotation) return null;

  const {
    id = 'SV-2026-Q801',
    date = '17-08-2026',
    customerName = 'MIRANA TECHNOCAST PVT.LTD.',
    systemCapacityKW = 280.20,
    solarModule = '600 WP',
    moduleCount = 467,
    pvModuleSize = '4 * 8',
    inverterCapacity = '125 KW',
    inverterCount = '2 NOS',
    baseRatePerKW = 24000,
    dealerMarginPerKW = 0,
    discomMeterCharge = 'Extra',
    gedaRegistrationCharge = 'Including',
    meterTestingCharge = 'CUSTOMER SCOPE',
    gstPercentage = 8.9,
    grandTotalCustomer = 6724800
  } = quotation;

  // Calculate customer-facing rate (Dealer margin is strictly merged into rate or kept confidential)
  const customerRatePerKW = baseRatePerKW + (dealerMarginPerKW || 0);
  const calculatedGrandTotal = grandTotalCustomer || Math.round(customerRatePerKW * systemCapacityKW);

  return (
    <div className="pdf-document font-sans text-[#1B1F23] bg-white print:bg-white select-none">
      {/* ========================================================
          PAGE 1: EXACT MIRANA TECHNOCAST COVER PAGE
          ======================================================== */}
      <div className="pdf-page relative w-[210mm] min-h-[297mm] mx-auto p-10 flex flex-col justify-between bg-white border border-gray-300 shadow-xl print:border-none print:shadow-none print:m-0 print:p-8 mb-8 page-break-after overflow-hidden">
        {/* Top Header */}
        <div className="flex justify-between items-start pt-2">
          <img
            src="/sunvine_logo_transparent.png"
            alt="Sunvine Renewable"
            className="h-14 w-auto object-contain"
          />
          <div className="text-right text-[11px] font-semibold text-gray-700 tracking-wider uppercase leading-tight pt-1">
            CLEAN ENERGY.<br />
            SUSTAINABLE FUTURE.<br />
            BETTER TOMORROW.
          </div>
        </div>

        {/* Middle Section: 2 Columns */}
        <div className="grid grid-cols-12 gap-6 my-auto pt-6 pb-4 items-center">
          {/* Left Column (7 cols): Titles, Feature Badges & Why Choose Card */}
          <div className="col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-widest">
                <span>PREPARED FOR YOU</span>
                <span className="w-12 h-px bg-yellow-500"></span>
              </div>
              <h1 className="text-5xl font-black text-[#0B2545] tracking-tight leading-none mt-1">
                QUOTATION
              </h1>
              <p className="text-[11px] font-bold text-[#0B2545] uppercase tracking-wider mt-1.5">
                SOLAR EPC SOLUTIONS | ENGINEERED FOR EXCELLENCE
              </p>
            </div>

            {/* 3 Green Capability Badges */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7AC143] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                    <line x1="3" y1="9" x2="21" y2="9" strokeWidth="2"/>
                    <line x1="3" y1="15" x2="21" y2="15" strokeWidth="2"/>
                    <line x1="9" y1="3" x2="9" y2="21" strokeWidth="2"/>
                    <line x1="15" y1="3" x2="15" y2="21" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#7AC143] uppercase tracking-wider">SOLAR EPC EXPERTISE</h4>
                  <p className="text-[11px] text-gray-600 leading-snug">End-to-end solutions from design to commissioning.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7AC143] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#7AC143] uppercase tracking-wider">QUALITY &amp; RELIABILITY</h4>
                  <p className="text-[11px] text-gray-600 leading-snug">Premium quality materials. Long-term performance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7AC143] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#7AC143] uppercase tracking-wider">SUSTAINABLE IMPACT</h4>
                  <p className="text-[11px] text-gray-600 leading-snug">Clean energy for a greener and better future.</p>
                </div>
              </div>
            </div>

            {/* Dark Navy Card: WHY CHOOSE SUNVINE RENEWABLE? */}
            <div className="bg-[#0B2545] rounded-xl p-4 text-white shadow-md">
              <h3 className="text-xs font-bold tracking-wider uppercase">
                WHY CHOOSE <br />
                <span className="text-[#7AC143] text-sm">SUNVINE RENEWABLE?</span>
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-[11px] font-medium text-gray-200">
                <li className="flex items-center gap-2">
                  <span className="text-[#7AC143] font-bold text-xs">✔</span> Experienced &amp; Skilled Team
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7AC143] font-bold text-xs">✔</span> Advanced Technology
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7AC143] font-bold text-xs">✔</span> Timely Delivery
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7AC143] font-bold text-xs">✔</span> Cost-Effective Solutions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7AC143] font-bold text-xs">✔</span> Strong After-Sales Support
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (5 cols): Curved Solar Array Artwork & Seal */}
          <div className="col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full h-84 rounded-3xl overflow-hidden border-4 border-[#7AC143] shadow-lg flex items-center justify-center">
              <img
                src="/solar_field_cover.jpg"
                alt="Solar Rooftop EPC Plant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <div className="text-xl font-black tracking-tight drop-shadow">{systemCapacityKW} KW</div>
                <div className="text-xs uppercase font-bold text-[#A1F96F]">Turnkey EPC Grid Solar</div>
                <div className="text-[10px] text-gray-200 truncate">{customerName}</div>
              </div>
            </div>

            {/* Green Seal Circle */}
            <div className="w-full mt-4 bg-[#7AC143] rounded-2xl p-3 text-white flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                <span className="text-base font-black">⚡</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block">OUR COMMITMENT</span>
                <p className="text-[10px] leading-tight font-medium">Delivering reliable, efficient and sustainable solar solutions that empower your growth.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: 5 Pillars & Dark Contact Strip */}
        <div className="pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            <span>POWERING TODAY. PROTECTING TOMORROW.</span>
            <span className="flex-1 h-px bg-yellow-500"></span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center py-2 border-t border-b border-gray-200 mb-3">
            <div>
              <div className="text-base">⚡</div>
              <span className="text-[9px] font-bold text-gray-800 uppercase">INNOVATION</span>
            </div>
            <div>
              <div className="text-base">🛡️</div>
              <span className="text-[9px] font-bold text-gray-800 uppercase">INTEGRITY</span>
            </div>
            <div>
              <div className="text-base">🤝</div>
              <span className="text-[9px] font-bold text-gray-800 uppercase">TEAMWORK</span>
            </div>
            <div>
              <div className="text-base">📈</div>
              <span className="text-[9px] font-bold text-gray-800 uppercase">GROWTH</span>
            </div>
            <div>
              <div className="text-base">🌱</div>
              <span className="text-[9px] font-bold text-gray-800 uppercase">SUSTAINABILITY</span>
            </div>
          </div>

          {/* Navy Contact Strip */}
          <div className="bg-[#0B2545] text-white rounded-lg px-4 py-2.5 flex justify-between items-center text-[11px] font-semibold">
            <div className="flex items-center gap-1.5">
              <span>📞</span> <span>8000050580</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>✉</span> <span>info@sunvinerenewable.com</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🌐</span> <span>www.sunvinerenewable.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PAGE 2: SYSTEM DETAILS & PRICE SUMMARY (EXACT MIRANA PDF)
          ======================================================== */}
      <div className="pdf-page relative w-[210mm] min-h-[297mm] mx-auto p-10 flex flex-col justify-between bg-white border border-gray-300 shadow-xl print:border-none print:shadow-none print:m-0 print:p-8 mb-8 page-break-after">
        <div>
          {/* Top Right Logo */}
          <div className="flex justify-end pb-3">
            <img src="/sunvine_logo_transparent.png" alt="Sunvine" className="h-10 object-contain" />
          </div>

          {/* Heading */}
          <div className="text-center my-2">
            <h2 className="text-2xl font-black text-[#2E7D32] tracking-wide uppercase">
              SYSTEM DETAILS
            </h2>
            <p className="text-xs italic text-gray-700 font-serif mt-0.5">
              Empowering The Future with Solar Energy
            </p>
          </div>

          {/* TABLE 1: SPECIFICATION & SYSTEM DETAILS */}
          <div className="mt-3 mb-4 overflow-hidden border border-[#406c70]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#58979c] text-[#0B2545]">
                <tr>
                  <th className="py-2 px-4 font-black uppercase tracking-wider w-1/2 border-r border-[#406c70]">
                    SPECIFICATION
                  </th>
                  <th className="py-2 px-4 font-black uppercase tracking-wider w-1/2">
                    SYSTEM DETAILS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#406c70] text-gray-900 font-medium">
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">CUSTOMER NAME</td>
                  <td className="py-2 px-4 font-bold uppercase">{customerName}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">DATE</td>
                  <td className="py-2 px-4">{date}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">SOLAR MODULE</td>
                  <td className="py-2 px-4">{solarModule}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">SYSTEM TOTAL CAPACITY</td>
                  <td className="py-2 px-4 font-semibold">{systemCapacityKW} KW On Grid Solar</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">PV MODULE SIZE</td>
                  <td className="py-2 px-4">{pvModuleSize}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">INVERTER CAPACITY</td>
                  <td className="py-2 px-4">{inverterCapacity}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">NUMBER OF INVERTER</td>
                  <td className="py-2 px-4">{inverterCount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3 Guarantees with green tick */}
          <div className="space-y-1 text-xs text-gray-900 font-semibold my-4 pl-2">
            <div className="flex items-center gap-2">
              <span className="text-[#2E7D32] font-bold">✔</span>
              <span>30 Years Solar Panel Performance Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#2E7D32] font-bold">✔</span>
              <span>Premium Installation Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#2E7D32] font-bold">✔</span>
              <span>Smart Savings on Electricity Bills</span>
            </div>
          </div>

          {/* Heading: PRICE SUMMARY */}
          <div className="text-center my-3">
            <h2 className="text-2xl font-black text-[#2E7D32] tracking-wide uppercase">
              PRICE SUMMARY
            </h2>
          </div>

          {/* Industrial Rooftop Tag */}
          <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 uppercase my-2">
            <span className="w-1.5 h-4 bg-[#B4C400] inline-block"></span>
            <span>INDUSTRIAL ROOFTOP :</span>
          </div>

          {/* TABLE 2: PROJECT COST SUMMARY */}
          <div className="overflow-hidden border border-[#406c70] mb-4">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#58979c] text-[#0B2545]">
                <tr>
                  <th className="py-2 px-4 font-black uppercase tracking-wider w-2/3 border-r border-[#406c70]">
                    PROJECT COST SUMMARY
                  </th>
                  <th className="py-2 px-4 font-black uppercase tracking-wider text-center w-1/3">
                    APS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#406c70] text-gray-900">
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">PRODUCT DESCRIPTION</td>
                  <td className="py-2 px-4 text-center font-medium">600 WP : ({systemCapacityKW} KW)</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">TOTAL NUMBER OF MODULES</td>
                  <td className="py-2 px-4 text-center font-medium">{moduleCount}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">RATE PER KW</td>
                  <td className="py-2 px-4 text-center font-mono font-bold">{formatINR(customerRatePerKW)}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">
                    DISCOM Meter Charge ( Extra as actual if more from PGVCL)
                  </td>
                  <td className="py-2 px-4 text-center text-gray-700">{discomMeterCharge}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">GEDA Registration Charge</td>
                  <td className="py-2 px-4 text-center text-gray-700">{gedaRegistrationCharge}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">
                    METER , METER BOX , CT-PT SET , METER TESTING CHARGE
                  </td>
                  <td className="py-2 px-4 text-center text-gray-700">{meterTestingCharge}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2 px-4 font-bold border-r border-[#406c70]">GST {gstPercentage}%</td>
                  <td className="py-2 px-4 text-center text-gray-700">Extra</td>
                </tr>
                {/* GRAND TOTAL ROW */}
                <tr className="bg-[#58979c] text-[#0B2545] font-black text-sm">
                  <td className="py-2.5 px-4 uppercase tracking-wider text-right pr-6 border-r border-[#406c70]">
                    GRAND TOTAL
                  </td>
                  <td className="py-2.5 px-4 text-center font-mono text-base font-black text-[#0B2545]">
                    {formatINR(calculatedGrandTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section: BANK DETAILS */}
          <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 uppercase my-2">
            <span className="w-1.5 h-4 bg-[#B4C400] inline-block"></span>
            <span>BANK DETAILS</span>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-gray-900 pt-1 font-medium">
            <div>
              <span className="font-bold">FIRM NAME : </span> <strong>SUNVINE RENEWABLE</strong>
            </div>
            <div>
              <span className="font-bold">A/C NO. : </span> <strong className="font-mono">99998000050580</strong>
            </div>
            <div>
              <span className="font-bold">BANK NAME : </span> <strong>HDFC BANK LTD.</strong>
            </div>
            <div>
              <span className="font-bold">IFSC : </span> <strong className="font-mono">HDFC0002012</strong>
            </div>
            <div>
              <span className="font-bold">Gmail : </span> <span>sunvinerenewable@gmail.com</span>
            </div>
            <div>
              <span className="font-bold">BRANCH : </span> <strong>METODA BRANCH</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PAGE 3: BILL OF MATERIAL : SOLAR ON GRID SYSTEM (EXACT MIRANA PDF)
          ======================================================== */}
      <div className="pdf-page relative w-[210mm] min-h-[297mm] mx-auto p-10 flex flex-col justify-between bg-white border border-gray-300 shadow-xl print:border-none print:shadow-none print:m-0 print:p-8 mb-8 page-break-after">
        <div>
          {/* Top Right Logo */}
          <div className="flex justify-end pb-3">
            <img src="/sunvine_logo_transparent.png" alt="Sunvine" className="h-10 object-contain" />
          </div>

          {/* Section Title */}
          <div className="flex items-center gap-1.5 text-sm font-black text-gray-900 uppercase mb-3">
            <span className="w-1.5 h-4 bg-[#B4C400] inline-block"></span>
            <span>BILL OF MATERIAL : SOLAR ON GRID SYSTEM</span>
          </div>

          {/* EXACT BOM TABLE */}
          <div className="overflow-hidden border border-[#4d7594]">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-[#6b95b5] text-gray-900">
                <tr>
                  <th className="py-1.5 px-3 font-bold border-r border-[#4d7594] text-center w-12">SR. NO.</th>
                  <th className="py-1.5 px-4 font-bold border-r border-[#4d7594]">ITEM</th>
                  <th className="py-1.5 px-3 font-bold border-r border-[#4d7594] text-center w-28">QTY.</th>
                  <th className="py-1.5 px-3 font-bold text-center w-48">MAKE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4d7594] text-gray-900">
                {/* 1. SOLAR MODULES */}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">1</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">SOLAR MODULES</td>
                  <td className="py-1 px-3 border-r border-[#4d7594]"></td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">1.1</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">PV MODULE, 600WP TOPCON MONO BIFACIAL Panel</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594] font-semibold">{moduleCount}</td>
                  <td className="py-1 px-3 text-center font-semibold">APS</td>
                </tr>

                {/* 2. INVERTER DETAILS */}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">2</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">INVERTER DETAILS</td>
                  <td className="py-1 px-3 border-r border-[#4d7594]"></td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">2.1</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">String type three - Phase Grid Tied Inverter</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594] font-semibold">2</td>
                  <td className="py-1 px-3 text-center text-[10px] leading-tight font-semibold">
                    SOLARYAAN / SOLIS / VSOLE<br />Any Reputed
                  </td>
                </tr>

                {/* 3. MODULE MOUNTING STRUCTURE */}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">3</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">MODULE MOUNTING STRUCTURE</td>
                  <td className="py-1 px-3 border-r border-[#4d7594]"></td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">3.1</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">ALUMINIUM CHANNEL (MONO RAIL)</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3 text-center font-semibold">STANDARD</td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">3.2</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">
                    Hot Dip Galvanized Pipe<br />
                    (60,80 Micron - 2MM thickness)
                  </td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3 text-center text-[10px] leading-tight">
                    FORTUNE / HINDUSTAR SIZE : 60X40 / 40X40<br />Any Reputed
                  </td>
                </tr>

                {/* 4. DC CABLES */}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">4</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">DC CABLES</td>
                  <td className="py-1 px-3 border-r border-[#4d7594]"></td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">4.1</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">
                    1C X 4 sq.mm (Red) Type-1, (Black) Type-1,<br />
                    PVC Tape RYBK sets, Gitte screw
                  </td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3 text-center font-semibold">
                    POLYCAB<br />Any Reputed
                  </td>
                </tr>

                {/* 5. AC CABLES */}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">5</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">AC CABLES</td>
                  <td className="py-1 px-3 border-r border-[#4d7594]"></td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">5.1</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">
                    4C/3.5C X 150 sq.mm. Almm Armd<br />
                    Earthing Cable Cu Flex. 4mm
                  </td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3 text-center font-semibold">
                    POLYCAB<br />Any Reputed
                  </td>
                </tr>

                {/* 6. ACDB + DCDB */}
                <tr>
                  <td className="py-1 px-3 text-center font-bold border-r border-[#4d7594]">6</td>
                  <td className="py-1 px-4 font-bold border-r border-[#4d7594]">ACDB + DCDB</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594] font-semibold">1 + 1</td>
                  <td className="py-1 px-3 text-center text-[10px] leading-tight font-semibold">
                    L&amp;T (L&amp;K) / HAVELLS<br />/ SCHNEIDER<br />Any Reputed
                  </td>
                </tr>

                {/* 7. LA CABLE */}
                <tr>
                  <td className="py-1 px-3 text-center font-bold border-r border-[#4d7594]">7</td>
                  <td className="py-1 px-4 font-bold border-r border-[#4d7594]">LA CABLE 1C X 25 sq.mm</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3 text-center font-semibold">
                    POLYCAB<br />Any Reputed
                  </td>
                </tr>

                {/* 8. EARTHING & ACCESSORIES */}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">8</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">EARTHING &amp; ACCESSORIES</td>
                  <td className="py-1 px-3 border-r border-[#4d7594]"></td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">8.1</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">Earthing Road</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3 text-center text-[10px] font-semibold">
                    VASUNDHARA<br />ISI STANDARD
                  </td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">8.2</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">Lightning Arrestor</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3 text-center text-[10px] font-semibold">
                    VASUNDHARA<br />ISI STANDARD
                  </td>
                </tr>

                {/* 9. OTHER ACCESSORIES */}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">9</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">OTHER ACCESSORIES</td>
                  <td className="py-1 px-3 border-r border-[#4d7594]"></td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">9.1</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">Stud nut wisher , stud</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">9.2</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">Cable tie , pvc elbow</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3"></td>
                </tr>
                <tr>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">9.3</td>
                  <td className="py-1 px-4 border-r border-[#4d7594]">Seddle clip , pvc pipe &amp; fitting</td>
                  <td className="py-1 px-3 text-center border-r border-[#4d7594]">As per requirement</td>
                  <td className="py-1 px-3"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom Note */}
          <div className="mt-4 text-[10.5px] font-bold text-gray-900 leading-snug">
            Note: If any Condition, any Material is not available which is mentioned above for Supply, that Material will replace with Comparable Reputed Brand for Completion of Project without Prior Notice.
          </div>
        </div>
      </div>

      {/* ========================================================
          PAGE 4: TERMS & CONDITIONS (EXACT MIRANA PDF)
          ======================================================== */}
      <div className="pdf-page relative w-[210mm] min-h-[297mm] mx-auto p-10 flex flex-col justify-between bg-white border border-gray-300 shadow-xl print:border-none print:shadow-none print:m-0 print:p-8 mb-8">
        <div>
          {/* Top Right Logo */}
          <div className="flex justify-end pb-3">
            <img src="/sunvine_logo_transparent.png" alt="Sunvine" className="h-10 object-contain" />
          </div>

          {/* Title */}
          <h2 className="text-center text-xl font-black text-gray-900 uppercase mb-2">
            TERMS &amp; CONDITIONS
          </h2>

          <div className="space-y-2 text-[10.5px] text-gray-900 leading-normal">
            <div>
              <strong className="block font-bold">Guarantee &amp; Warranty of The Plant</strong>
              <strong className="block font-bold mt-1">Module Warranty:</strong>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>The 30-year limited warranty covers the module as follows:</li>
                <li>10 years against manufacturing defects.</li>
                <li>90% power output for the first 10 years, and 80% for the next 15 years. (Terms subject to the module's manufacturing conditions.)</li>
                <li>From the date of commissioning and handover of the solar power system (Day One), the responsibility for cleaning and maintaining the solar panels shall be solely borne by the customer.</li>
              </ul>
            </div>

            <div>
              <strong className="block font-bold">Inverter Warranty:</strong>
              <ul className="list-disc pl-4">
                <li>The solar inverter comes with a 8-year warranty against manufacturing defects (Terms subject to the inverter's manufacturing conditions and based on inverter make).</li>
              </ul>
            </div>

            <div>
              <strong className="block font-bold">Other Equipment Warranty:</strong>
              <ul className="list-disc pl-4">
                <li>Up to 5 years from installation.</li>
              </ul>
            </div>

            <div className="pt-1">
              <strong className="block font-bold">Warranty Exclusions: (This warranty shall not apply to damages, failures, or defects resulting from) :</strong>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Switch Gears (L&amp;T): 12-month manufacturing defect warranty from the invoice date (No burning conditions covered).</li>
                <li>SPD: No coverage for burning or failure.</li>
                <li>DCDB/ACDB (Residential Projects): No warranty.</li>
                <li>No Returns: Goods once sold will not be accepted back.</li>
                <li>Natural disasters including but not limited to flood, cyclone, lightning, earthquake, storm, fire, or other force majeure events.</li>
                <li>Improper use, negligence, misuse, vandalism, theft, accidental damage, or unauthorized modifications.</li>
                <li>Repairs, alterations, relocation, or servicing performed by any person or organization not authorized by the Company.</li>
                <li>Voltage fluctuations, power surges, grid abnormalities, or electrical faults originating from the utility supply.</li>
                <li>Structural defects, water leakage, corrosion, or issues related to the customer's premises.</li>
                <li>Failure to follow recommended operating and maintenance procedures.</li>
              </ul>
            </div>

            <div className="pt-1">
              <strong className="block font-bold">Terms of Payment:</strong>
              <ul className="list-disc pl-4">
                <li>10% advance with purchase order.</li>
                <li>90% before material dispatch.</li>
              </ul>
            </div>

            <div>
              <strong className="block font-bold">Delivery:</strong>
              <ul className="list-disc pl-4">
                <li>Typically, 30 days from the PO date, subject to legal and government approvals.</li>
              </ul>
            </div>

            <div>
              <strong className="block font-bold">Insurance:</strong>
              <ul className="list-disc pl-4">
                <li>After commissioning, the plant will be handed over to the client, who must arrange appropriate asset insurance for the PV system.</li>
              </ul>
            </div>

            <div>
              <strong className="block font-bold">Validity:</strong>
              <ul className="list-disc pl-4">
                <li>Our offer is valid for 15 days from the date of this offer</li>
              </ul>
            </div>

            <div className="font-bold pt-1">
              Note: Breakage of panels or other equipment is not covered under warranty.
            </div>
          </div>

          {/* Large Centered Green Banner */}
          <div className="text-center my-6">
            <h3 className="text-lg font-black text-[#2E7D32] tracking-wide uppercase">
              THANK YOU FOR CHOOSING SUNVINE RENEWABLE
            </h3>
          </div>

          {/* Bottom Metoda Rajkot Address & Contacts */}
          <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-gray-200">
            <div>
              <strong className="block text-gray-900 font-bold">SUNVINE RENEWABLE:</strong>
              <p className="text-gray-800 leading-snug">
                G-705, Second Gate, Metoda GIDC,<br />
                Rajkot - 360021. (Guj.) India
              </p>
            </div>
            <div className="text-right">
              <strong className="block font-bold text-gray-900">+91 95865 33750</strong>
              <a href="mailto:sunvinerenewable@gmail.com" className="text-blue-700 underline block font-medium">
                sunvinerenewable@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
