import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Building2,
  Sliders,
  CheckCircle,
  XCircle,
  Search,
  Phone,
  Mail,
  MapPin,
  X
} from 'lucide-react';

const formatINR = (val) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function DealerManagement() {
  const { dealers, addDealer, toggleDealerStatus, updateDealerMarginCap } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New dealer form fields
  const [newFirm, setNewFirm] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCity, setNewCity] = useState('Rajkot');
  const [newState, setNewState] = useState('Gujarat');
  const [newDiscom, setNewDiscom] = useState('PGVCL');
  const [newTier, setNewTier] = useState('Gold EPC Partner');
  const [newCap, setNewCap] = useState(5500);

  const filteredDealers = dealers.filter(
    (d) =>
      d.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateDealer = (e) => {
    e.preventDefault();
    if (!newFirm || !newContact) return;

    const newDealerObj = {
      id: `SV-DLR-${Math.floor(1000 + Math.random() * 9000)}`,
      firmName: newFirm,
      contactPerson: newContact,
      mobile: newMobile || '9898000000',
      email: newEmail || 'dealer@sunvine.in',
      city: newCity,
      state: newState,
      discom: newDiscom,
      tier: newTier,
      maxMarginCapPerKw: Number(newCap),
      totalQuotes: 0,
      totalCapacityKw: 0,
      status: 'Active',
      joinedDate: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())
    };

    addDealer(newDealerObj);
    setShowAddModal(false);
    // Reset form
    setNewFirm('');
    setNewContact('');
    setNewMobile('');
    setNewEmail('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-[#0F1B2E] font-heading">Authorized EPC Dealer Network</h1>
          <p className="text-xs text-gray-500">
            Control channel partner authorization, territory access, and confidential margin caps.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6CBF3D] hover:bg-[#5AA332] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Onboard New Dealer
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search dealer by name, firm, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6CBF3D] focus:outline-none"
          />
        </div>
      </div>

      {/* Dealers Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0F1B2E] text-white uppercase">
              <tr>
                <th className="py-3 px-4 font-semibold">Dealer ID & Firm</th>
                <th className="py-3 px-4 font-semibold">Contact & Territory</th>
                <th className="py-3 px-4 font-semibold">Tier & DISCOM</th>
                <th className="py-3 px-4 font-semibold">Margin Cap (₹/KW)</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDealers.map((dealer) => (
                <tr key={dealer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-900 block text-sm">{dealer.firmName}</span>
                    <span className="font-mono text-[11px] text-gray-400">{dealer.id}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-800">{dealer.contactPerson}</div>
                    <div className="text-[11px] text-gray-500">{dealer.mobile} • {dealer.city}, {dealer.state}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold mb-1">
                      {dealer.tier}
                    </span>
                    <span className="block text-[11px] text-gray-500">{dealer.discom}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="500"
                        min="1000"
                        max="20000"
                        value={dealer.maxMarginCapPerKw}
                        onChange={(e) => updateDealerMarginCap(dealer.id, e.target.value)}
                        className="w-24 px-2 py-1 border border-gray-300 rounded font-mono font-bold text-[#0F1B2E] text-xs"
                      />
                      <span className="text-[11px] text-gray-400">₹/KW</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        dealer.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {dealer.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleDealerStatus(dealer.id)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        dealer.status === 'Active'
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {dealer.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard New Dealer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#0F1B2E]">Onboard New Solar EPC Dealer</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDealer} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Company / Firm Name *</label>
                <input
                  type="text"
                  required
                  value={newFirm}
                  onChange={(e) => setNewFirm(e.target.value)}
                  placeholder="e.g. Apex Energy Systems"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6CBF3D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder="e.g. Bhavin Shah"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6CBF3D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6CBF3D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="bhavin@apex.in"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6CBF3D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6CBF3D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">DISCOM</label>
                  <select
                    value={newDiscom}
                    onChange={(e) => setNewDiscom(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6CBF3D] bg-white"
                  >
                    <option value="PGVCL">PGVCL</option>
                    <option value="DGVCL">DGVCL</option>
                    <option value="MGVCL">MGVCL</option>
                    <option value="UGVCL">UGVCL</option>
                    <option value="Torrent Power">Torrent Power</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Authorized Margin Cap (₹/KW)</label>
                  <input
                    type="number"
                    step="500"
                    value={newCap}
                    onChange={(e) => setNewCap(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-mono font-bold focus:ring-2 focus:ring-[#6CBF3D]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6CBF3D] text-white font-bold rounded-lg hover:bg-[#5AA332]"
                >
                  Confirm & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
