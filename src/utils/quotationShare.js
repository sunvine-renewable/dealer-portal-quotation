// Clean customer phone number to Indian 10-digit format with country code 91
export function cleanCustomerPhone(phoneStr) {
  if (!phoneStr) return '919825012345';
  const digits = String(phoneStr).replace(/\D/g, '');
  if (digits.length >= 10) {
    return '91' + digits.slice(-10);
  }
  return '919825012345';
}

// Generate the official proposal WhatsApp message
export function buildProposalWhatsAppMessage(quote) {
  const customerName = quote.customerName || 'Valued Customer';
  const capacity = quote.systemCapacityKW 
    ? `${quote.systemCapacityKW} KW` 
    : (quote.capacity || '280.20 kW');
  const quoteId = quote.id || 'SV-2026-Q801';
  const amount = typeof quote.amount === 'string'
    ? quote.amount
    : '₹ ' + (quote.grandTotalCustomer ? quote.grandTotalCustomer.toLocaleString('en-IN') : '67,24,800');
  const moduleInfo = quote.solarModule || quote.moduleType || '600 WP TOPCon Mono Bifacial Panel';
  const invInfo = quote.inverterCapacity || '125 KW Grid-Tied Inverter';
  const date = quote.date || new Date().toLocaleDateString('en-GB');

  return `*☀️ SUNVINE RENEWABLE ENERGY - SOLAR EPC PROPOSAL*

Dear *${customerName}*,

Greetings from *Sunvine Renewable Energy*! We are pleased to share your customized official turnkey solar power proposal.

📋 *QUOTATION SUMMARY*
━━━━━━━━━━━━━━━━━━━━
• *Proposal Ref:* ${quoteId}
• *Date:* ${date}
• *System Capacity:* *${capacity}* On-Grid Solar
• *Solar Modules:* ${moduleInfo}
• *Inverters:* ${invInfo}
• *Total Project Value:* *${amount}*
• *Performance Warranty:* 30 Years Module Output Guarantee
• *Inverter Warranty:* 8 Years Manufacturing Warranty

📄 *OFFICIAL 4-PAGE PROPOSAL PDF*
Your official 4-page turnkey proposal document with Bill of Materials (BOM), Technical System Specifications, and Commercial Terms has been generated.

📞 *Sunvine Helpline:* +91 80000 50580
📧 *Email:* sunvinerenewable@gmail.com
🏢 *Corporate Office:* G-705, Metoda GIDC, Rajkot, Gujarat.

_Empowering The Future with Solar Energy_`;
}

// Open WhatsApp chat directly with pre-filled message
export function openWhatsAppChat(quote, customPhone = null) {
  const phone = customPhone 
    ? cleanCustomerPhone(customPhone) 
    : cleanCustomerPhone(quote.customerPhone || quote.mobile || quote.phone);
  const text = buildProposalWhatsAppMessage(quote);
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
