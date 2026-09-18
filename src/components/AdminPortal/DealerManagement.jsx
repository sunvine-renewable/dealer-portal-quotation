import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function DealerManagement() {
  const { dealers, addDealer, toggleDealerStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New dealer form states
  const [newFirm, setNewFirm] = useState('Surya Solar Tech Private Limited');
  const [newContact, setNewContact] = useState('Rajesh Kumar');
  const [newMobile, setNewMobile] = useState('+91 98765 43210');
  const [newEmail, setNewEmail] = useState('rajesh@suryasolartech.in');
  const [newZone, setNewZone] = useState('Rajkot & Saurashtra Zone (Western Gujarat)');
  const [newAddress, setNewAddress] = useState('Shop No. 12, Aditya Commercial Complex, Kalawad Road, Rajkot - 360005, Gujarat');
  const [newGstin, setNewGstin] = useState('24AABCS1429B1Z8');
  const [newPan, setNewPan] = useState('AABCS1429B');
  const [newDiscomCode, setNewDiscomCode] = useState('VND-PGVCL-8821');
  const [newTier, setNewTier] = useState('Gold EPC Partner (Quarterly Cap: 1.5 MW)');
  const [newCap, setNewCap] = useState('5,000 / kW cap');

  // Filter dealers
  const filteredDealers = (dealers || []).filter((d) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      (d.firmName && d.firmName.toLowerCase().includes(term)) ||
      (d.contactPerson && d.contactPerson.toLowerCase().includes(term)) ||
      (d.city && d.city.toLowerCase().includes(term));

    if (!matchSearch) return false;
    if (activeTabFilter === 'active') return d.status === 'Active';
    if (activeTabFilter === 'pending') return d.status === 'Pending';
    if (activeTabFilter === 'suspended') return d.status === 'Suspended';
    return true;
  });

  const handleCreateDealer = (e) => {
    e.preventDefault();
    if (!newFirm || !newContact) return;

    const newDealerObj = {
      id: `SV-DLR-0${Math.floor(800 + Math.random() * 100)}`,
      firmName: newFirm,
      contactPerson: newContact,
      mobile: newMobile || '+91 98765 43210',
      email: newEmail || 'dealer@sunvine.in',
      city: newZone.includes('Rajkot') ? 'Rajkot' : 'Pune',
      state: 'Gujarat',
      discom: 'PGVCL Circle',
      tier: 'Gold EPC',
      maxMarginCapPerKw: 6000,
      totalQuotes: 1,
      totalCapacityKw: 5.0,
      status: 'Active',
      joinedDate: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())
    };

    if (addDealer) {
      addDealer(newDealerObj);
    }
    setShowAddModal(false);
  };

  // If Onboarding Mode is Active, show exact Stitch Onboard Screen
  if (showAddModal) {
    return (
      <div className="flex flex-col w-full pb-16">
        {/* Breadcrumb Header */}
        <section className="bg-surface-container-lowest border-b border-surface-container-highest px-8 py-5 -mt-4 -mx-6 mb-6">
          <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary hover:text-primary transition-colors font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Back to Dealer Management</span>
                </button>
                <span className="text-secondary/40 text-xs">/</span>
                <div className="flex items-center gap-1.5 text-secondary font-label-xs text-label-xs">
                  <span>Admin Console</span>
                  <span>&gt;</span>
                  <span>Dealer Partners</span>
                  <span>&gt;</span>
                  <span className="text-on-surface font-semibold">Onboard New Partner</span>
                </div>
              </div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                Onboard New EPC Dealer Partner
              </h1>
              <p className="font-body-md text-body-md text-secondary">
                Create authorized dealer profile, configure margin caps, DISCOM empanelment, and issue authenticated portal credentials.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 font-label-md text-label-md text-secondary hover:text-error transition-colors rounded-lg"
                type="button"
              >
                Discard Changes
              </button>
              <button
                onClick={handleCreateDealer}
                className="px-4 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary transition-colors shadow-sm flex items-center gap-1.5"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>Save &amp; Onboard Partner</span>
              </button>
            </div>
          </div>
        </section>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-12 gap-6 max-w-[1520px] mx-auto w-full">
          {/* Left Column (8 cols) */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
            {/* Section 1: Firm & Agency Profile */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between pb-5 border-b border-surface-container-highest">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-container/15 flex items-center justify-center text-primary font-bold">
                    <span className="material-symbols-outlined text-[20px]">apartment</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">1. Firm &amp; Agency Profile</h2>
                    <p className="font-body-sm text-body-sm text-secondary">Statutory operational business identity and primary communications point</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-label-xs font-label-xs bg-primary-container/15 text-primary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Verified Entity
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
                <div className="col-span-2">
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    Firm / Agency Trade Name <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-medium"
                      type="text"
                      value={newFirm}
                      onChange={(e) => setNewFirm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-primary">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-secondary">Registered under Registrar of Companies (ROC - Ahmedabad)</p>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    Authorized Signatory / Person <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5 flex items-center justify-between">
                    <span>Registered Mobile (OTP &amp; Login) <span className="text-error">*</span></span>
                    <span className="font-label-xs text-label-xs text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">lock</span> Auth Key
                    </span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-semibold focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    type="text"
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                  />
                  <p className="mt-1 font-body-sm text-body-sm text-secondary">Primary authentication identifier for portal sign-in and signature OTPs</p>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    Official Business Email <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    Territory &amp; Region Hub <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={newZone}
                      onChange={(e) => setNewZone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 appearance-none"
                    >
                      <option>Rajkot &amp; Saurashtra Zone (Western Gujarat)</option>
                      <option>Ahmedabad Central &amp; Gandhinagar</option>
                      <option>Surat &amp; South Gujarat Hub</option>
                      <option>Vadodara Industrial Corridor</option>
                      <option>Pune &amp; Western Maharashtra Division</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary">
                      <span className="material-symbols-outlined text-[20px]">unfold_more</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    Registered Office Physical Address <span className="text-error">*</span>
                  </label>
                  <textarea
                    className="w-full px-3.5 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    rows={2}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Statutory KYC & DISCOM Empanelment */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between pb-5 border-b border-surface-container-highest">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-tertiary/15 flex items-center justify-center text-tertiary font-bold">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">2. Statutory KYC &amp; DISCOM Empanelment</h2>
                    <p className="font-body-sm text-body-sm text-secondary">Government tax compliance and utility board grid-synchronization licenses</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-label-xs font-label-xs bg-tertiary/15 text-tertiary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  KYC Tier-1 Passed
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    GSTIN Number <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 font-mono uppercase bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-semibold focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    type="text"
                    value={newGstin}
                    onChange={(e) => setNewGstin(e.target.value)}
                  />
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-container/15 text-primary">
                      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Verified via GSTN API
                    </span>
                    <span className="text-[11px] text-secondary font-medium">Active • Regular Taxpayer</span>
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    Business PAN <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 font-mono uppercase bg-surface-container-low border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-semibold focus:outline-none cursor-not-allowed"
                    readOnly
                    type="text"
                    value={newPan}
                  />
                  <p className="mt-1.5 font-body-sm text-body-sm text-secondary">Auto-extracted from verified GSTIN record (Income Tax Dept sync)</p>
                </div>
                <div className="col-span-2">
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    DISCOM Vendor Empanelment Code <span className="text-error">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      className="flex-1 px-3.5 py-2.5 font-mono bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-semibold focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                      type="text"
                      value={newDiscomCode}
                      onChange={(e) => setNewDiscomCode(e.target.value)}
                    />
                    <span className="px-3 py-2 bg-surface-container-low text-secondary border border-surface-container-highest rounded-lg text-label-sm font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                      Verified Rooftop Vendor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Commercial Controls & Dealer Margin Governance */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between pb-5 border-b border-surface-container-highest">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary-container/50 flex items-center justify-center text-on-secondary-container font-bold">
                    <span className="material-symbols-outlined text-[20px]">price_check</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">3. Commercial Controls &amp; Dealer Margin Governance</h2>
                    <p className="font-body-sm text-body-sm text-secondary">Enforce pricing safeguards, quote ceilings, and automated escrow payout workflows</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-label-xs font-label-xs bg-secondary-container text-on-secondary-fixed font-semibold">
                  Audit Policy Active
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    Assigned Partner Tier <span className="text-error">*</span>
                  </label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-semibold"
                  >
                    <option>Gold EPC Partner (Quarterly Cap: 1.5 MW)</option>
                    <option>Platinum Tier (Quarterly Cap: &gt; 3.0 MW)</option>
                    <option>Silver Installer (Quarterly Cap: 500 kW)</option>
                    <option>Bronze Associate (Speculative)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5">
                    Minimum Quote Enforced Floor (Turnkey Base) <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-semibold focus:outline-none cursor-not-allowed"
                    readOnly
                    type="text"
                    value="₹ 54,000 / kW turnkey base"
                  />
                  <p className="mt-1 font-body-sm text-body-sm text-secondary">System-wide quality protection floor to prevent sub-standard module delivery</p>
                </div>
                <div className="col-span-2">
                  <label className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1.5 flex items-center justify-between">
                    <span>Max Allowed Dealer Margin Addition Cap <span className="text-error">*</span></span>
                    <span className="font-label-xs text-label-xs text-primary font-bold">Standard Cap: ₹ 5,000</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-surface-container-highest rounded-lg text-body-md font-body-md text-on-surface font-bold focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    type="text"
                    value={newCap}
                    onChange={(e) => setNewCap(e.target.value)}
                  />
                  <div className="mt-3 p-3.5 rounded-lg bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-700 text-[20px] mt-0.5">policy</span>
                    <p className="font-body-sm text-body-sm text-amber-900 leading-relaxed">
                      <strong className="font-semibold">Protective Regulatory Threshold:</strong> Prevents predatory consumer overcharging. Any customer quote generated with a margin addition exceeding <strong className="font-bold">₹5,000/kW</strong> will be paused and routed to the Sunvine Super Admin Desk for mandatory pricing review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col gap-5 sticky top-20">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[22px]">key</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">System Credentials</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-primary-container/20 text-primary border border-primary-container/30">
                  AUTO-ALLOCATED
                </span>
              </div>
              <div className="p-3.5 bg-surface-container-low rounded-lg border border-surface-container-highest flex items-center justify-between">
                <div>
                  <span className="font-label-xs text-label-xs text-secondary uppercase tracking-wider block">Assigned Partner ID</span>
                  <span className="font-headline-sm text-headline-sm font-bold font-mono text-on-surface">#SV-DLR-0845</span>
                </div>
                <div className="text-right">
                  <span className="font-label-xs text-label-xs text-secondary block">Provisioning Status</span>
                  <span className="inline-flex items-center gap-1 font-label-xs text-label-xs font-bold text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
                    Ready to Dispatch
                  </span>
                </div>
              </div>
              <div className="space-y-3 bg-surface-bright p-4 rounded-lg border border-surface-container-highest">
                <div className="flex flex-col">
                  <span className="font-label-xs text-label-xs text-secondary uppercase font-semibold">Dealer Portal URL</span>
                  <span className="font-mono text-body-sm text-tertiary font-medium select-all">portal.sunvinerenewable.com/dealer</span>
                </div>
                <div className="h-px bg-surface-container-highest"></div>
                <div className="flex flex-col">
                  <span className="font-label-xs text-label-xs text-secondary uppercase font-semibold">Authentication Protocol</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-body-sm font-semibold text-on-surface">Registered Mobile OTP</span>
                    <span className="font-mono text-label-sm text-secondary font-medium">{newMobile}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCreateDealer}
                className="w-full h-11 bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-md font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                <span>Confirm &amp; Issue Credentials</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render Exact Dealer Management Directory
  return (
    <div className="flex flex-col gap-6 w-full pb-16">
      {/* Page Header & Action Clusters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-headline-xl text-[#0F1B2E] tracking-tight">
            Dealer Partner Management
          </h1>
          <p className="text-body-md text-secondary mt-1">
            Manage onboarded EPC dealers, commission tiers, login credentials, and quotation permissions.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="h-10 px-4 bg-white border border-[#0F1B2E] text-[#0F1B2E] font-label-md rounded-lg hover:bg-[#F6F8F7] transition-all duration-150 flex items-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Directory</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="h-10 px-4 bg-[#6CBF3D] hover:bg-[#4F9A2C] text-white font-label-md font-semibold rounded-lg transition-all duration-150 flex items-center gap-2 shadow-sm focus:ring-2 focus:ring-primary-container focus:ring-offset-2"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>+ Onboard New Dealer</span>
          </button>
        </div>
      </div>

      {/* 4 METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-[#E4E7EB] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] relative overflow-hidden group hover:border-[#6CBF3D]/50 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-secondary font-label-sm uppercase tracking-wider text-[11px]">Total Registered Dealers</span>
            <span className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-[#0F1B2E]">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-headline-xl font-poppins font-bold text-[#0F1B2E]">62</span>
            <span className="inline-flex items-center gap-0.5 text-label-xs font-semibold text-[#2E7D32] bg-[#6CBF3D]/15 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +8 this quarter
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-body-sm text-secondary">
            <span>Western Grid Region</span>
            <span className="font-semibold text-on-surface">5 Discoms</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-[#E4E7EB] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] relative overflow-hidden group hover:border-[#6CBF3D]/50 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-secondary font-label-sm uppercase tracking-wider text-[11px]">Active &amp; Quoting</span>
            <span className="w-9 h-9 rounded-lg bg-[#6CBF3D]/15 flex items-center justify-center text-[#2E7D32]">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-headline-xl font-poppins font-bold text-[#0F1B2E]">48</span>
            <span className="text-label-sm font-semibold text-secondary">(77.4% activation)</span>
            <span className="ml-auto inline-flex items-center text-label-xs font-semibold text-[#2E7D32]">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +14.2%
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F9] flex items-center gap-1.5 text-body-sm text-[#2E7D32] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#6CBF3D]"></span>
            <span>42 quotes generated today</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-[#E4E7EB] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] relative overflow-hidden group hover:border-amber-400/50 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-secondary font-label-sm uppercase tracking-wider text-[11px]">Pending Verification / KYC</span>
            <span className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-700">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-headline-xl font-poppins font-bold text-[#0F1B2E]">9</span>
            <span className="inline-flex items-center text-label-xs font-semibold text-[#B27204] bg-[#F9A825]/15 px-2 py-0.5 rounded-full">
              Requires Audit
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-body-sm text-secondary">
            <span>Avg. review SLA</span>
            <span className="font-semibold text-on-surface font-poppins">4.2 hours</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border border-[#E4E7EB] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] relative overflow-hidden group hover:border-red-300 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-secondary font-label-sm uppercase tracking-wider text-[11px]">Suspended / Inactive</span>
            <span className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <span className="material-symbols-outlined text-[20px]">person_off</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-headline-xl font-poppins font-bold text-[#0F1B2E]">5</span>
            <span className="inline-flex items-center text-label-xs font-medium text-secondary bg-surface-container px-2 py-0.5 rounded-full">
              8.0% Base
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F9] text-body-sm text-secondary truncate">
            License expired or dormant &gt;60d
          </div>
        </div>
      </div>

      {/* FILTER & CONTROL BAR */}
      <div className="bg-white rounded-xl border border-[#E4E7EB] p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex-1 min-w-[280px] max-w-md relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">filter_list</span>
            <input
              className="w-full h-10 pl-9 pr-3 text-body-sm rounded-lg border border-[#E4E7EB] focus:border-[#6CBF3D] focus:ring-2 focus:ring-[#6CBF3D]/20 outline-none"
              placeholder="Filter by Dealer, Firm Name, GSTIN, or Contact..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <select className="h-10 px-3 bg-white border border-[#E4E7EB] rounded-lg text-body-sm text-on-surface focus:border-[#6CBF3D] outline-none">
              <option>Region / DISCOM Circle (All Circles)</option>
              <option>PGVCL - Paschim Gujarat</option>
              <option>DGVCL - Dakshin Gujarat</option>
              <option>MGVCL - Madhya Gujarat</option>
              <option>UGVCL - Uttar Gujarat</option>
            </select>
            <select className="h-10 px-3 bg-white border border-[#E4E7EB] rounded-lg text-body-sm text-on-surface focus:border-[#6CBF3D] outline-none">
              <option>Margin Slab Tier (All Tiers)</option>
              <option>Platinum Partner (₹7.5k/kW)</option>
              <option>Gold EPC (₹6.0k/kW)</option>
              <option>Standard Tier (₹5.0k/kW)</option>
            </select>
            <button
              onClick={() => { setSearchTerm(''); setActiveTabFilter('all'); }}
              className="h-10 px-3 rounded-lg text-secondary hover:text-[#0F1B2E] hover:bg-[#F6F8F7] text-label-sm flex items-center gap-1 transition-colors"
              title="Reset Filters"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            </button>
          </div>
        </div>

        {/* Quick Tabs */}
        <div className="pt-3 border-t border-[#F1F4F9] flex flex-wrap items-center justify-between gap-3 text-label-sm">
          <div className="flex items-center gap-1 bg-[#F6F8F7] p-1 rounded-lg">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                activeTabFilter === 'all' ? 'bg-white text-[#0F1B2E] shadow-xs' : 'text-secondary hover:text-on-surface'
              }`}
            >
              All (62)
            </button>
            <button
              onClick={() => setActiveTabFilter('active')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTabFilter === 'active' ? 'bg-white text-[#0F1B2E] shadow-xs' : 'text-secondary hover:text-on-surface'
              }`}
            >
              Active (48)
            </button>
            <button
              onClick={() => setActiveTabFilter('pending')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTabFilter === 'pending' ? 'bg-white text-[#0F1B2E] shadow-xs' : 'text-secondary hover:text-on-surface'
              }`}
            >
              Pending KYC (9)
            </button>
            <button
              onClick={() => setActiveTabFilter('suspended')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTabFilter === 'suspended' ? 'bg-white text-[#0F1B2E] shadow-xs' : 'text-secondary hover:text-on-surface'
              }`}
            >
              Suspended (5)
            </button>
          </div>
          <div className="text-body-sm text-secondary">
            Showing <span className="font-semibold text-on-surface">1-4</span> of <span className="font-semibold text-on-surface">62</span> Dealers
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-xl border border-[#E4E7EB] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1240px]">
            <thead>
              <tr className="bg-[#0F1B2E] text-white text-label-xs uppercase tracking-wider h-11 select-none">
                <th className="py-3 px-4 font-semibold text-left w-32">Dealer ID</th>
                <th className="py-3 px-4 font-semibold text-left min-w-[240px]">Dealer / Firm Name</th>
                <th className="py-3 px-4 font-semibold text-left min-w-[170px]">Region &amp; DISCOM</th>
                <th className="py-3 px-4 font-semibold text-left min-w-[160px]">Pricing &amp; Margin</th>
                <th className="py-3 px-4 font-semibold text-right w-36">Quotes Issued</th>
                <th className="py-3 px-4 font-semibold text-right min-w-[140px]">Capacity Sold</th>
                <th className="py-3 px-4 font-semibold text-left w-48">KYC &amp; GSTIN</th>
                <th className="py-3 px-4 font-semibold text-center w-28">Portal Status</th>
                <th className="py-3 px-4 font-semibold text-center w-36">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB] text-body-sm">
              {/* Row 1: Featured Authorized Partner (Surya Solar Tech) */}
              <tr className="bg-white hover:bg-[#F0F4F2] transition-colors duration-150 group">
                <td className="py-3 px-4">
                  <span className="font-mono text-label-xs font-semibold text-[#0F1B2E] bg-surface-container px-2 py-1 rounded">
                    #SV-DLR-0842
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Rajesh Kumar avatar"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#6CBF3D]/40"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPrXHZs-qW_IfxFB32q6OMBxh9-Q8lbGsGBMHtdkNUgY_4yuNIKjzl9IouO3S3aNB09wnjzip9MP60dQxzL4kQPmGopeAc3FhmzSe-rn5i-NJoa8LROkq6pxtArBvBH1gOf32o8gNlXRFqVCbs_ran3kYrMxI68PMiaTNELo-PNmGam_oiuZjvHaBAalOT1KVsAA0nMIY8TkaF5V5g5bstz4lf60C_guBjH_ZJgQWwByqwwd7bZd8y"
                    />
                    <div>
                      <div className="font-poppins font-semibold text-on-surface group-hover:text-primary transition-colors">
                        Surya Solar Tech Pvt Ltd
                      </div>
                      <div className="text-[12px] text-secondary flex items-center gap-2">
                        <span className="font-medium text-on-surface">Rajesh Kumar</span>
                        <span className="text-outline-variant">•</span>
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="text-[11px] text-secondary/70">rajesh@suryasolartech.in</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-on-surface">Rajkot, Gujarat</div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    PGVCL Circle
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <span className="material-symbols-outlined text-[13px]">military_tech</span> Gold EPC
                  </div>
                  <div className="text-[11px] text-secondary mt-1">Cap: <span className="font-semibold text-on-surface">₹6,000 / kW</span></div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="font-semibold text-on-surface font-poppins">42 Quotes</div>
                  <div className="text-[11px] text-[#2E7D32]">18 this month</div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="font-bold text-on-surface font-poppins">1.42 MW</div>
                  <div className="w-24 ml-auto mt-1.5 bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#6CBF3D] h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <div className="text-[10px] text-secondary mt-0.5">82% of Q2 quota</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-on-surface font-medium">
                    <span>24AABCS1429B1Z8</span>
                    <span className="material-symbols-outlined text-[15px] text-[#2E7D32]" title="GSTIN Active &amp; Verified">check_circle</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-green-50 text-green-700 font-semibold">PAN OK</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-green-50 text-green-700 font-semibold">Aadhaar e-KYC</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="text-[10px] font-semibold text-[#2E7D32] inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#6CBF3D]"></span> Active
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => setShowAddModal(true)} className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E] transition-colors" title="Edit Dealer Profile">
                      <span className="material-symbols-outlined text-[17px]">edit</span>
                    </button>
                    <button className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E] transition-colors" title="View Customer Quotes">
                      <span className="material-symbols-outlined text-[17px]">folder_open</span>
                    </button>
                    <button className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E] transition-colors" title="Reset Portal Credentials">
                      <span className="material-symbols-outlined text-[17px]">key</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2: Gir Green Solutions */}
              <tr className="bg-[#F6F8F7] hover:bg-[#F0F4F2] transition-colors duration-150 group">
                <td className="py-3 px-4">
                  <span className="font-mono text-label-xs font-semibold text-[#0F1B2E] bg-white px-2 py-1 rounded border border-[#E4E7EB]">
                    #SV-DLR-0841
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3E7C8C] text-white font-poppins font-bold flex items-center justify-center text-xs">
                      GG
                    </div>
                    <div>
                      <div className="font-poppins font-semibold text-on-surface group-hover:text-primary transition-colors">Gir Green Solutions LLP</div>
                      <div className="text-[12px] text-secondary flex items-center gap-2">
                        <span className="font-medium text-on-surface">Amit Patel</span>
                        <span className="text-outline-variant">•</span>
                        <span>+91 94280 11982</span>
                      </div>
                      <div className="text-[11px] text-secondary/70">amit@girgreensolar.com</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-on-surface">Surat, Gujarat</div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                    DGVCL Circle
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="material-symbols-outlined text-[13px]">workspace_premium</span> Platinum Partner
                  </div>
                  <div className="text-[11px] text-secondary mt-1">Cap: <span className="font-semibold text-on-surface">₹7,500 / kW</span></div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="font-semibold text-on-surface font-poppins">68 Quotes</div>
                  <div className="text-[11px] text-[#2E7D32]">29 this month</div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="font-bold text-on-surface font-poppins">2.85 MW</div>
                  <div className="w-24 ml-auto mt-1.5 bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#6CBF3D] h-full rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="text-[10px] text-secondary mt-0.5">95% of Q2 quota</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-on-surface font-medium">
                    <span>24AAEFG9921D1ZZ</span>
                    <span className="material-symbols-outlined text-[15px] text-[#2E7D32]">check_circle</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-green-50 text-green-700 font-semibold">PAN OK</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-green-50 text-green-700 font-semibold">Vendor Empaneled</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="text-[10px] font-semibold text-[#2E7D32] inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#6CBF3D]"></span> Active
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E]"><span className="material-symbols-outlined text-[17px]">edit</span></button>
                    <button className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E]"><span className="material-symbols-outlined text-[17px]">folder_open</span></button>
                    <button className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E]"><span className="material-symbols-outlined text-[17px]">key</span></button>
                  </div>
                </td>
              </tr>

              {/* Row 3: Saurashtra Power Dynamics */}
              <tr className="bg-white hover:bg-[#F0F4F2] transition-colors duration-150 group">
                <td className="py-3 px-4">
                  <span className="font-mono text-label-xs font-semibold text-[#0F1B2E] bg-surface-container px-2 py-1 rounded">
                    #SV-DLR-0792
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 text-white font-poppins font-bold flex items-center justify-center text-xs">
                      SP
                    </div>
                    <div>
                      <div className="font-poppins font-semibold text-on-surface group-hover:text-primary transition-colors">Saurashtra Power Dynamics</div>
                      <div className="text-[12px] text-secondary flex items-center gap-2">
                        <span className="font-medium text-on-surface">Bhavesh Vora</span>
                        <span className="text-outline-variant">•</span>
                        <span>+91 97234 50912</span>
                      </div>
                      <div className="text-[11px] text-secondary/70">bvora@saurashtrapower.in</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-on-surface">Morbi, Gujarat</div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    PGVCL Circle
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-800 border border-gray-300">
                    <span className="material-symbols-outlined text-[13px]">shield</span> Standard Tier
                  </div>
                  <div className="text-[11px] text-secondary mt-1">Cap: <span className="font-semibold text-on-surface">₹5,000 / kW</span></div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="font-semibold text-on-surface font-poppins">19 Quotes</div>
                  <div className="text-[11px] text-[#2E7D32]">5 this month</div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="font-bold text-on-surface font-poppins">640 kW</div>
                  <div className="w-24 ml-auto mt-1.5 bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#6CBF3D] h-full rounded-full" style={{ width: '58%' }}></div>
                  </div>
                  <div className="text-[10px] text-secondary mt-0.5">58% of Q2 quota</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-on-surface font-medium">
                    <span>24AAACS9182C1ZG</span>
                    <span className="material-symbols-outlined text-[15px] text-[#2E7D32]">check_circle</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-green-50 text-green-700 font-semibold">PAN OK</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-50 text-amber-700 font-semibold">DISCOM Renew Due</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="text-[10px] font-semibold text-[#2E7D32] inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#6CBF3D]"></span> Active
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E]"><span className="material-symbols-outlined text-[17px]">edit</span></button>
                    <button className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E]"><span className="material-symbols-outlined text-[17px]">folder_open</span></button>
                    <button className="w-7 h-7 rounded hover:bg-surface-container text-secondary hover:text-[#0F1B2E]"><span className="material-symbols-outlined text-[17px]">key</span></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-[#E4E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-secondary font-label-sm text-label-sm">
          <span>Showing <span className="font-semibold text-on-surface">1 to 3</span> of <span className="font-semibold text-on-surface">62</span> entries</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded border border-[#E4E7EB] text-secondary hover:bg-surface-container transition-colors disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="px-3 py-1 rounded bg-[#0F1B2E] text-white font-semibold">1</button>
            <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface transition-colors">2</button>
            <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface transition-colors">3</button>
            <span className="px-1 text-secondary">...</span>
            <button className="p-1.5 rounded border border-[#E4E7EB] text-secondary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
