import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function DealerSettings() {
  const { currentDealer } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    agencyName: currentDealer?.agencyName || 'Rajkot Solar Tech Private Limited',
    contactPerson: currentDealer?.contactPerson || 'Rajesh Patel',
    phone: currentDealer?.phone || '+91 98765 43210',
    email: currentDealer?.email || 'rajesh@rajkotsolartech.in',
    gstin: '24AFPFS7402A1Z7',
    pan: 'AABCS1429B',
    defaultDiscom: 'PGVCL (Paschim Gujarat Vij Company Ltd)',
    discomDivision: 'Rajkot Rural Division / Metoda Sub-division',
    gedaLicenseNo: 'GEDA/EPC/2024/0981',
    defaultPaymentTerms: '30% Advance, 50% on Delivery, 20% on Net-metering',
    defaultDeliveryWeeks: '3 to 4 Weeks from GEDA Approval',
    bankName: 'State Bank of India',
    accountNumber: '394857201948',
    ifscCode: 'SBIN0001234',
    whatsappAlerts: true,
    emailAlerts: true,
    autoPdfDownload: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Top Breadcrumbs & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm">
            <span>Dealer Console</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Settings</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Account &amp; Quotation Configurations</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Dealer Settings &amp; Preferences</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-xs text-label-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Tier-1 EPC Partner
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary max-w-3xl">
            Manage your authorized EPC agency profile, quotation calculation rules, margin governance, security credentials, and cross-channel notifications.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setSaved(false)}
            type="button"
            className="px-4 py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors duration-150 font-label-md text-label-md rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">undo</span>
            <span>Discard Unsaved</span>
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="px-5 py-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md rounded-lg transition-colors duration-150 shadow-sm flex items-center gap-2 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">
              {saved ? 'check_circle' : 'save'}
            </span>
            <span>{saved ? 'Preferences Saved' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Multi-Column Settings Architecture */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Navigation Tabs Sidebar */}
        <nav className="col-span-12 lg:col-span-3 flex flex-col gap-2 bg-surface-container-lowest p-3 rounded-xl shadow-sm">
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary">Configuration Hub</span>
            <span className="material-symbols-outlined text-secondary text-[16px]">tune</span>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-left font-label-md text-label-md transition-colors ${
              activeTab === 'profile'
                ? 'bg-surface-container text-on-surface font-semibold'
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
              <span>Account &amp; Profile</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
          </button>

          <button
            onClick={() => setActiveTab('discom')}
            className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-left font-label-md text-label-md transition-colors ${
              activeTab === 'discom'
                ? 'bg-surface-container text-on-surface font-semibold'
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">electrical_services</span>
              <span>DISCOM &amp; Grid Defaults</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-xs text-label-xs">Active</span>
          </button>

          <button
            onClick={() => setActiveTab('banking')}
            className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-left font-label-md text-label-md transition-colors ${
              activeTab === 'banking'
                ? 'bg-surface-container text-on-surface font-semibold'
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
              <span>Banking &amp; Commission</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-left font-label-md text-label-md transition-colors ${
              activeTab === 'notifications'
                ? 'bg-surface-container text-on-surface font-semibold'
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              <span>Alerts &amp; Notifications</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          </button>

          {/* Left Sidebar System Telemetry Pill */}
          <div className="mt-4 p-3 rounded-lg bg-surface-container-low flex flex-col gap-2">
            <div className="flex items-center justify-between font-label-xs text-label-xs text-secondary">
              <span>Profile Strength</span>
              <span className="font-bold text-primary">96%</span>
            </div>
            <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '96%' }}></div>
            </div>
            <span className="text-[11px] font-body-sm text-secondary">Aadhaar e-KYC and GSTIN 100% verified.</span>
          </div>
        </nav>

        {/* Right Column: Settings Content Sections */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-8">
          {/* Section A: Agency Profile & Statutory Credentials */}
          {(activeTab === 'profile' || activeTab === 'all') && (
            <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Agency Profile &amp; Statutory Credentials</h2>
                    <span className="font-body-sm text-body-sm text-secondary">Official registration parameters vetted under national EPC compliance standards.</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold inline-flex items-center gap-1.5 self-start sm:self-center">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Verified Partner
                </span>
              </div>

              {/* Profile Top Banner with Photo and ID */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm bg-surface-container shrink-0">
                    <img
                      alt="Rajesh Kumar Profile"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPrXHZs-qW_IfxFB32q6OMBxh9-Q8lbGsGBMHtdkNUgY_4yuNIKjzl9IouO3S3aNB09wnjzip9MP60dQxzL4kQPmGopeAc3FhmzSe-rn5i-NJoa8LROkq6pxtArBvBH1gOf32o8gNlXRFqVCbs_ran3kYrMxI68PMiaTNELo-PNmGam_oiuZjvHaBAalOT1KVsAA0nMIY8TkaF5V5g5bstz4lf60C_guBjH_ZJgQWwByqwwd7bZd8y"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface">{form.contactPerson}</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-secondary text-[11px] font-semibold">Managing Director</span>
                    </div>
                    <span className="font-body-md text-body-md text-secondary">{form.agencyName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-lg self-start md:self-auto shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[18px]">lock</span>
                  <div className="flex flex-col">
                    <span className="font-label-xs text-label-xs text-secondary uppercase tracking-wider">Dealer Unique ID</span>
                    <span className="font-headline-sm text-headline-sm font-mono text-on-surface">SV-DLR-GJ-0842</span>
                  </div>
                </div>
              </div>

              {/* Grid of Statutory & Contact Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">Registered Agency Legal Name</label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                    type="text"
                    value={form.agencyName}
                    onChange={(e) => setForm({ ...form, agencyName: e.target.value })}
                  />
                  <span className="text-[11px] font-body-sm text-secondary">Registered under the Companies Act (India)</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">Principal Solar Engineer / Signatory</label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                    type="text"
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-sm text-label-sm text-on-surface font-medium">Primary Registered Phone</label>
                    <span className="text-[11px] text-tertiary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">lock</span> e-KYC Bound
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface select-none"
                      readOnly
                      type="text"
                      value={form.phone}
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-primary">verified</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">Official Business Email</label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-sm text-label-sm text-on-surface font-medium">GST Identification Number (GSTIN)</label>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold tracking-wide">GST PORTAL VERIFIED</span>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full font-mono px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-body-md text-on-surface shadow-sm uppercase"
                      type="text"
                      value={form.gstin}
                      onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-primary">gpp_good</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">Permanent Account Number (PAN)</label>
                  <input
                    className="w-full font-mono px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm uppercase"
                    type="text"
                    value={form.pan}
                    onChange={(e) => setForm({ ...form, pan: e.target.value })}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Section B: DISCOM & Grid Connections */}
          {(activeTab === 'discom' || activeTab === 'all') && (
            <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">electrical_services</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-headline-md text-on-surface">DISCOM &amp; Solar Grid Parameters</h2>
                  <span className="font-body-sm text-body-sm text-secondary">Default distribution company jurisdiction and GEDA registration parameters.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">Default Utility Grid DISCOM</label>
                  <select
                    value={form.defaultDiscom}
                    onChange={(e) => setForm({ ...form, defaultDiscom: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  >
                    <option value="PGVCL (Paschim Gujarat Vij Company Ltd)">PGVCL (Paschim Gujarat Vij Company Ltd)</option>
                    <option value="UGVCL (Uttar Gujarat Vij Company Ltd)">UGVCL (Uttar Gujarat Vij Company Ltd)</option>
                    <option value="MGVCL (Madhya Gujarat Vij Company Ltd)">MGVCL (Madhya Gujarat Vij Company Ltd)</option>
                    <option value="DGVCL (Dakshin Gujarat Vij Company Ltd)">DGVCL (Dakshin Gujarat Vij Company Ltd)</option>
                    <option value="Torrent Power (Ahmedabad / Surat)">Torrent Power (Ahmedabad / Surat)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">Sub-Division / Regional Office</label>
                  <input
                    type="text"
                    value={form.discomDivision}
                    onChange={(e) => setForm({ ...form, discomDivision: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">State Nodal Agency EPC License Number (GEDA)</label>
                  <input
                    type="text"
                    value={form.gedaLicenseNo}
                    onChange={(e) => setForm({ ...form, gedaLicenseNo: e.target.value })}
                    className="w-full font-mono px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm uppercase focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Section C: Banking & Commission Payouts */}
          {(activeTab === 'banking' || activeTab === 'all') && (
            <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">account_balance</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Banking &amp; Commission Payouts</h2>
                  <span className="font-body-sm text-body-sm text-secondary">Direct bank settlement coordinates for confidential dealer margins and EPC incentives.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">Bank Name</label>
                  <input
                    type="text"
                    value={form.bankName}
                    onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">Account Number</label>
                  <input
                    type="text"
                    value={form.accountNumber}
                    onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                    className="w-full font-mono px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium">IFSC Code</label>
                  <input
                    type="text"
                    value={form.ifscCode}
                    onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
                    className="w-full font-mono px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md text-on-surface shadow-sm uppercase focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Direct RTGS / NEFT Payout Gateway Active</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-xs text-label-xs font-bold">VERIFIED</span>
              </div>
            </section>
          )}

          {/* Section D: Alerts & Notifications */}
          {(activeTab === 'notifications' || activeTab === 'all') && (
            <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">notifications_active</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Alerts &amp; Channel Automation</h2>
                  <span className="font-body-sm text-body-sm text-secondary">Cross-channel instant proposal delivery alerts via WhatsApp and Email.</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-3.5 rounded-lg border border-outline-variant/20 hover:bg-surface-container-low cursor-pointer transition-colors">
                  <div>
                    <span className="font-semibold text-on-surface block text-sm">WhatsApp Proposal Dispatch</span>
                    <span className="text-xs text-secondary">Transmit signed 4-page PDF proposal link directly to customer WhatsApp</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.whatsappAlerts}
                    onChange={(e) => setForm({ ...form, whatsappAlerts: e.target.checked })}
                    className="rounded text-primary-container focus:ring-primary-container w-5 h-5"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-lg border border-outline-variant/20 hover:bg-surface-container-low cursor-pointer transition-colors">
                  <div>
                    <span className="font-semibold text-on-surface block text-sm">BCC Agency Email Notification</span>
                    <span className="text-xs text-secondary">Receive an encrypted duplicate of every proposal sent to customers</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.emailAlerts}
                    onChange={(e) => setForm({ ...form, emailAlerts: e.target.checked })}
                    className="rounded text-primary-container focus:ring-primary-container w-5 h-5"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-lg border border-outline-variant/20 hover:bg-surface-container-low cursor-pointer transition-colors">
                  <div>
                    <span className="font-semibold text-on-surface block text-sm">Automatic A4 PDF Cache</span>
                    <span className="text-xs text-secondary">Pre-generate high-resolution Mirana-compliant printable quotation pages</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.autoPdfDownload}
                    onChange={(e) => setForm({ ...form, autoPdfDownload: e.target.checked })}
                    className="rounded text-primary-container focus:ring-primary-container w-5 h-5"
                  />
                </label>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
