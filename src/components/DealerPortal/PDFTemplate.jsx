import React from 'react';

// Format INR currency
const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function PDFTemplate({ quotation, pricingMaster }) {
  if (!quotation) return null;

  const {
    id = 'SV-2026-Q801',
    date = '17-08-2026',
    customerName = 'CUSTOMER / ENTERPRISE NAME',
    customerPhone = '+91 98765 43210',
    customerEmail = 'info@client.com',
    siteAddress = 'Metoda GIDC, Rajkot, Gujarat',
    discom = 'PGVCL (Paschim Gujarat Vij Company Ltd)',
    projectType = 'Commercial & Industrial Rooftop',
    systemCapacityKW = 280.20,
    solarModule = '600 WP TOPCon Mono Bifacial Panel',
    moduleCount = 467,
    pvModuleSize = '4 * 8',
    inverterCapacity = '125 KW',
    inverterCount = '2 NOS',
    baseRatePerKW = 24000,
    dealerMarginPerKW = 0,
    discomMeterCharge = 'Extra as actual if more from PGVCL',
    gedaRegistrationCharge = 'Including',
    meterTestingCharge = 'CUSTOMER SCOPE',
    gstPercentage = 8.9,
    baseTotalAmount = 6724800,
    dealerTotalMargin = 0,
    grandTotalCustomer = 6724800
  } = quotation;

  // Final customer-facing turnkey rate per kW (baseRate + dealerMargin)
  const customerRatePerKW = baseRatePerKW + (dealerMarginPerKW || 0);
  const totalTurnkeyCost = Math.round(customerRatePerKW * systemCapacityKW);
  const gstAmount = Math.round(totalTurnkeyCost * ((gstPercentage || 8.9) / 100));
  const finalPayable = totalTurnkeyCost + gstAmount;

  const bank = pricingMaster?.bankDetails || {
    firmName: 'SUNVINE RENEWABLE',
    bankName: 'HDFC BANK LTD.',
    accountNumber: '99998000050580',
    ifscCode: 'HDFC0002012',
    branch: 'METODA BRANCH',
    email: 'sunvinerenewable@gmail.com'
  };

  const terms = pricingMaster?.termsAndWarranties || {
    modulePerformanceWarrantyYears: 30,
    moduleDefectWarrantyYears: 10,
    inverterWarrantyYears: 8,
    workmanshipWarrantyYears: 5,
    officeAddress: 'G-705, Second Gate, Metoda GIDC, Rajkot - 360021. (Guj.) India',
    supportPhone: '+91 95865 33750',
    helpline: '8000050580',
    website: 'www.sunvinerenewable.com'
  };

  return (
    <div className="pdf-document font-sans text-[#1A2942] bg-white print:bg-white">
      {/* ========================================================
          PAGE 1: COVER PAGE
          ======================================================== */}
      <div className="pdf-page relative w-[210mm] min-h-[297mm] mx-auto p-12 flex flex-col justify-between bg-white border border-gray-200 shadow-lg print:border-none print:shadow-none print:m-0 print:p-12 mb-8 page-break-after">
        {/* Top Header */}
        <div className="flex justify-between items-start border-b-2 border-[#6CBF3D] pb-6">
          <div>
            <img
              src="/sunvine_logo_transparent.png"
              alt="Sunvine Renewable Energy"
              className="h-16 w-auto object-contain"
            />
            <p className="text-[11px] font-semibold tracking-wider text-[#0F1B2E] mt-1 uppercase">
              Clean Energy • Sustainable Future • Better Tomorrow
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-[#0F1B2E] text-white text-xs font-bold uppercase tracking-widest rounded">
              Commercial Proposal
            </span>
            <p className="text-xs text-gray-500 mt-2 font-mono">Ref: {id}</p>
            <p className="text-xs font-semibold text-gray-700">Date: {date}</p>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="my-auto py-12">
          <div className="w-16 h-1.5 bg-[#6CBF3D] mb-6"></div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F1B2E] tracking-tight leading-tight">
            PROPOSAL FOR GRID-TIED<br />
            <span className="text-[#6CBF3D]">{systemCapacityKW} KW</span> SOLAR PV SYSTEM
          </h1>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-widest mt-3">
            Turnkey Engineering, Procurement & Commissioning (EPC)
          </p>

          <div className="mt-12 p-8 bg-[#F8FAFC] border-l-4 border-[#0F1B2E] rounded-r-xl shadow-xs">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Prepared Exclusively For:</p>
            <h2 className="text-2xl font-bold text-[#0F1B2E]">{customerName}</h2>
            {siteAddress && <p className="text-sm text-gray-600 mt-1">{siteAddress}</p>}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-6 text-xs text-gray-600">
              {customerPhone && <div><span className="font-semibold text-gray-800">Phone:</span> {customerPhone}</div>}
              {customerEmail && <div><span className="font-semibold text-gray-800">Email:</span> {customerEmail}</div>}
              <div><span className="font-semibold text-gray-800">DISCOM:</span> {discom}</div>
            </div>
          </div>
        </div>

        {/* Cover Page Footer */}
        <div className="border-t border-gray-200 pt-6 flex justify-between items-end text-xs text-gray-600">
          <div>
            <p className="font-bold text-[#0F1B2E] text-sm">SUNVINE RENEWABLE ENERGY</p>
            <p>{terms.officeAddress}</p>
            <p>Customer Care: {terms.helpline} | {terms.supportPhone}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">Page 1 of 4</p>
            <p className="font-semibold text-[#6CBF3D]">{terms.website}</p>
          </div>
        </div>
      </div>

      {/* ========================================================
          PAGE 2: SYSTEM SPECIFICATION & COMMERCIAL OFFER
          ======================================================== */}
      <div className="pdf-page relative w-[210mm] min-h-[297mm] mx-auto p-12 flex flex-col justify-between bg-white border border-gray-200 shadow-lg print:border-none print:shadow-none print:m-0 print:p-12 mb-8 page-break-after">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
            <img src="/sunvine_logo_transparent.png" alt="Sunvine" className="h-10 object-contain" />
            <div className="text-right text-xs">
              <span className="font-bold text-[#0F1B2E]">System Technical & Commercial Details</span>
              <p className="text-gray-500">Ref: {id} | {date}</p>
            </div>
          </div>

          {/* Table 1: Technical Sizing */}
          <h3 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6CBF3D]"></span>
            1. System Sizing & Technical Specifications
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0F1B2E] text-white">
                <tr>
                  <th className="py-2.5 px-4 font-semibold w-12">SR</th>
                  <th className="py-2.5 px-4 font-semibold">DESCRIPTION</th>
                  <th className="py-2.5 px-4 font-semibold text-right">SPECIFICATION / QUANTITY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="py-2.5 px-4 font-medium text-gray-500">01</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">Total System Capacity</td>
                  <td className="py-2.5 px-4 text-right font-bold text-[#6CBF3D]">{systemCapacityKW} KW DC</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-4 font-medium text-gray-500">02</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">Solar PV Module Specification</td>
                  <td className="py-2.5 px-4 text-right">{solarModule}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2.5 px-4 font-medium text-gray-500">03</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">Number of Solar Modules</td>
                  <td className="py-2.5 px-4 text-right font-semibold">{moduleCount} NOS</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-4 font-medium text-gray-500">04</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">Module Structure Matrix / Size</td>
                  <td className="py-2.5 px-4 text-right">{pvModuleSize} Configuration</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2.5 px-4 font-medium text-gray-500">05</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">Solar Grid Inverter Model & Quantity</td>
                  <td className="py-2.5 px-4 text-right">{inverterCapacity} ({inverterCount})</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-4 font-medium text-gray-500">06</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">GEDA Registration & Processing</td>
                  <td className="py-2.5 px-4 text-right font-medium text-green-700">{gedaRegistrationCharge}</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2.5 px-4 font-medium text-gray-500">07</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">DISCOM Net Metering Charge</td>
                  <td className="py-2.5 px-4 text-right text-gray-700">{discomMeterCharge}</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-4 font-medium text-gray-500">08</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-900">Meter Testing & Calibration</td>
                  <td className="py-2.5 px-4 text-right font-semibold text-amber-800">{meterTestingCharge}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Commercial Pricing Summary (DEALER MARGIN COMPLETELY HIDDEN) */}
          <h3 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6CBF3D]"></span>
            2. Commercial Offer & Investment Summary
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0F1B2E] text-white">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">DESCRIPTION</th>
                  <th className="py-2.5 px-4 font-semibold text-center">CAPACITY</th>
                  <th className="py-2.5 px-4 font-semibold text-right">RATE / KW</th>
                  <th className="py-2.5 px-4 font-semibold text-right">TOTAL AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    Complete Turnkey Solar EPC System Installation<br />
                    <span className="text-[11px] font-normal text-gray-500">
                      Supply, Design, Structure, Inverters, Cabling, Installation & Commissioning
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-gray-800">{systemCapacityKW} KW</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">{formatINR(customerRatePerKW)}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">{formatINR(totalTurnkeyCost)}</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td colSpan="3" className="py-2 px-4 text-right font-semibold text-gray-700">
                    Applicable GST ({gstPercentage || 8.9}%)
                  </td>
                  <td className="py-2 px-4 text-right font-mono text-gray-700">{formatINR(gstAmount)}</td>
                </tr>
                <tr className="bg-[#0F1B2E] text-white font-bold">
                  <td colSpan="3" className="py-3 px-4 text-right uppercase tracking-wider text-xs">
                    Grand Total Investment (Inclusive of GST)
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-base text-[#6CBF3D]">
                    {formatINR(finalPayable)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 3: Official Bank Details */}
          <div className="p-4 bg-[#F8FAFC] border border-gray-200 rounded-lg">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2E] mb-2">
              Official Bank Details for Remittance
            </h4>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs">
              <div><span className="text-gray-500 font-medium">Beneficiary Name:</span> <strong className="text-gray-900">{bank.firmName}</strong></div>
              <div><span className="text-gray-500 font-medium">Bank Name:</span> <strong className="text-gray-900">{bank.bankName}</strong></div>
              <div><span className="text-gray-500 font-medium">Account Number:</span> <strong className="font-mono text-gray-900">{bank.accountNumber}</strong></div>
              <div><span className="text-gray-500 font-medium">IFSC Code:</span> <strong className="font-mono text-gray-900">{bank.ifscCode}</strong></div>
              <div><span className="text-gray-500 font-medium">Branch:</span> <span className="text-gray-900">{bank.branch}</span></div>
              <div><span className="text-gray-500 font-medium">Email:</span> <span className="text-gray-900">{bank.email}</span></div>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-xs text-gray-500">
          <span>Sunvine Renewable Energy • Commercial Quotation</span>
          <span>Page 2 of 4</span>
        </div>
      </div>

      {/* ========================================================
          PAGE 3: BILL OF MATERIALS (BOM) & SPECIFICATIONS
          ======================================================== */}
      <div className="pdf-page relative w-[210mm] min-h-[297mm] mx-auto p-12 flex flex-col justify-between bg-white border border-gray-200 shadow-lg print:border-none print:shadow-none print:m-0 print:p-12 mb-8 page-break-after">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
            <img src="/sunvine_logo_transparent.png" alt="Sunvine" className="h-10 object-contain" />
            <div className="text-right text-xs">
              <span className="font-bold text-[#0F1B2E]">Bill of Materials (BOM) & Scope</span>
              <p className="text-gray-500">Ref: {id} | {date}</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6CBF3D]"></span>
            3. Detailed Bill of Materials (BOM) & EPC Technical Scope
          </h3>

          <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0F1B2E] text-white">
                <tr>
                  <th className="py-2.5 px-3 font-semibold w-10">SR</th>
                  <th className="py-2.5 px-3 font-semibold w-40">COMPONENT</th>
                  <th className="py-2.5 px-3 font-semibold">TECHNICAL DESCRIPTION & MAKE</th>
                  <th className="py-2.5 px-3 font-semibold text-center w-28">WARRANTY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="py-2.5 px-3 font-medium text-gray-500">01</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">Solar PV Modules</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    High Efficiency Mono Bifacial TOPCon Half-Cut Cells with Dual Glass, ALMM Listed, IEC 61215/61730 certified.
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-green-700">30 Years Linear</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-3 font-medium text-gray-500">02</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">Grid-Tied Inverter</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    {inverterCapacity} Three-Phase On-Grid String Inverter with Dual MPPT, IP65 Weatherproof, Smart Remote Wi-Fi Logger.
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">8 Years Direct</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2.5 px-3 font-medium text-gray-500">03</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">Module Mounting Structure (MMS)</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    Hot-Dip Galvanized Iron (HDGI 80 microns) / Anodized Aluminum, engineered to withstand wind velocity up to 150 km/h.
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">10 Years</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-3 font-medium text-gray-500">04</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">AC Distribution Board (ACDB)</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    Weatherproof IP65 outdoor enclosure equipped with SPD Type II, MCCB/MCB protection of Schneider/ABB/Siemens make.
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">5 Years</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2.5 px-3 font-medium text-gray-500">05</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">DC Distribution Board (DCDB)</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    1000V/1500V DC Isolator, 15A/20A DC Fuses with Phoenix/Dehn DC SPD Type II arresters in IP65 enclosure.
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">5 Years</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-3 font-medium text-gray-500">06</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">Solar DC Cables</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    1C x 4/6 sq.mm Tinned Copper Flexible Conductor, Cross-linked Polyolefin (XLPO) UV resistant solar cable (EN 50618).
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">25 Years</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2.5 px-3 font-medium text-gray-500">07</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">AC Power Cables</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    1.1kV Grade Armoured XLPE Aluminum / Copper Conductor cable (Polycab / Havells / KEI) sized for minimal voltage drop.
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">5 Years</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-3 font-medium text-gray-500">08</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">Earthing System</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    Maintenance-free chemical earthing electrodes with BFC compound (Separate earthing for AC, DC, and Lightning).
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">5 Years</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2.5 px-3 font-medium text-gray-500">09</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">Lightning Arrester (LA)</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    Early Streamer Emission (ESE) / Conventional Copper Franklin Rod with dedicated down conductor to earth pit.
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">5 Years</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="py-2.5 px-3 font-medium text-gray-500">10</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">Net Metering Liaisoning</td>
                  <td className="py-2.5 px-3 text-gray-700">
                    End-to-end statutory file clearance with DISCOM & Chief Electrical Inspectorate (CEI) approval support.
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-800">Complete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Page Footer */}
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-xs text-gray-500">
          <span>Sunvine Renewable Energy • BOM Specifications</span>
          <span>Page 3 of 4</span>
        </div>
      </div>

      {/* ========================================================
          PAGE 4: TERMS & CONDITIONS, WARRANTY & SIGN-OFF
          ======================================================== */}
      <div className="pdf-page relative w-[210mm] min-h-[297mm] mx-auto p-12 flex flex-col justify-between bg-white border border-gray-200 shadow-lg print:border-none print:shadow-none print:m-0 print:p-12 mb-8">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
            <img src="/sunvine_logo_transparent.png" alt="Sunvine" className="h-10 object-contain" />
            <div className="text-right text-xs">
              <span className="font-bold text-[#0F1B2E]">Terms, Warranty & Authorization</span>
              <p className="text-gray-500">Ref: {id} | {date}</p>
            </div>
          </div>

          {/* Warranty Highlights Box */}
          <div className="p-4 bg-[#F0FDF4] border border-[#6CBF3D]/40 rounded-lg mb-6">
            <h4 className="text-xs font-bold text-[#14532D] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6CBF3D]"></span>
              Manufacturer Standard Warranties
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-700">
              <div className="bg-white p-2.5 rounded border border-gray-200 text-center">
                <span className="block text-xl font-bold text-[#0F1B2E]">{terms.modulePerformanceWarrantyYears} Yrs</span>
                <span className="text-[11px] text-gray-500 font-medium">Module Linear Output</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-gray-200 text-center">
                <span className="block text-xl font-bold text-[#0F1B2E]">{terms.moduleDefectWarrantyYears} Yrs</span>
                <span className="text-[11px] text-gray-500 font-medium">Module Product Defect</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-gray-200 text-center">
                <span className="block text-xl font-bold text-[#0F1B2E]">{terms.inverterWarrantyYears} Yrs</span>
                <span className="text-[11px] text-gray-500 font-medium">Inverter Performance</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-gray-200 text-center">
                <span className="block text-xl font-bold text-[#0F1B2E]">{terms.workmanshipWarrantyYears} Yrs</span>
                <span className="text-[11px] text-gray-500 font-medium">Free Workmanship & AMC</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions List */}
          <h3 className="text-sm font-bold text-[#0F1B2E] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6CBF3D]"></span>
            4. General Terms & Conditions of Contract
          </h3>
          <ul className="space-y-2 text-xs text-gray-700 list-disc list-inside leading-relaxed mb-8">
            <li><strong>Payment Terms:</strong> {pricingMaster?.termsAndWarranties?.paymentTerms || '10% advance with Purchase Order, 90% before material dispatch from warehouse.'}</li>
            <li><strong>Delivery Schedule:</strong> Project commissioning within {terms.deliveryDays || 30} days from receipt of advance payment and technical site clearance.</li>
            <li><strong>Quotation Validity:</strong> This commercial proposal is valid for {terms.validityDays || 15} days from the date of issuance due to commodity price fluctuations.</li>
            <li><strong>Customer Scope:</strong> Safe roof access, water connection for regular panel washing, 3-phase power point for installation tools, and DISCOM meter testing official fee.</li>
            <li><strong>Grid Connectivity:</strong> System synchronization is subject to DISCOM feeder availability and net-meter provisioning timelines.</li>
            <li><strong>Force Majeure:</strong> Delays caused by acts of God, extreme natural disasters, pandemic lockdowns, or DISCOM grid outages remain exempt from default timelines.</li>
          </ul>

          {/* Signatures & Approvals */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-between h-36">
              <span className="text-xs font-bold text-[#0F1B2E] uppercase">For Sunvine Renewable Energy</span>
              <div className="border-b border-dashed border-gray-400 w-3/4 mb-1"></div>
              <div className="text-[11px] text-gray-600">
                <p className="font-semibold text-gray-800">Authorized Signatory & Seal</p>
                <p>Engineering & Projects Division</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-between h-36">
              <span className="text-xs font-bold text-[#0F1B2E] uppercase">Customer Acceptance & Order Confirmation</span>
              <div className="border-b border-dashed border-gray-400 w-3/4 mb-1"></div>
              <div className="text-[11px] text-gray-600">
                <p className="font-semibold text-gray-800">Authorized Signature & Company Stamp</p>
                <p>I / We hereby accept the technical & commercial offer.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Official Address Footer */}
        <div className="border-t-2 border-[#6CBF3D] pt-4 mt-8 flex justify-between items-center text-xs text-gray-600">
          <div>
            <p className="font-bold text-[#0F1B2E]">SUNVINE RENEWABLE ENERGY</p>
            <p className="text-[11px]">{terms.officeAddress}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">Helpline: {terms.helpline} | {terms.supportPhone}</p>
            <p className="text-[11px] text-gray-500">Page 4 of 4</p>
          </div>
        </div>
      </div>
    </div>
  );
}
