import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  History,
  User,
  Users,
  Sliders,
  Cpu,
  FolderArchive,
  Menu,
  X,
  ShieldCheck,
  Building2,
  LogOut
} from 'lucide-react';

export default function Navigation() {
  const { role, activeTab, setActiveTab, currentDealer, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dealerMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create_quote', label: 'New Quotation', icon: FilePlus },
    { id: 'preview_quote', label: 'Quotation Preview (PDF)', icon: FileText },
    { id: 'my_quotes', label: 'My Quotations', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const adminMenu = [
    { id: 'admin_dashboard', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'dealers_mgmt', label: 'Dealer Partners', icon: Users, badge: 'Active' },
    { id: 'pricing_master', label: 'Pricing & Presets', icon: Sliders },
    { id: 'hardware_master', label: 'Hardware Catalog', icon: Cpu },
    { id: 'all_quotes', label: 'All Quotations Audit', icon: FolderArchive },
  ];

  const menuItems = role === 'admin' ? adminMenu : dealerMenu;

  return (
    <>
      {/* Desktop Sidebar (Matching Stitch Navigation) */}
      <aside className="no-print hidden md:flex flex-col w-64 bg-[#0F1B2E] border-r border-[#1E2E48] fixed inset-y-0 left-0 z-30 select-none">
        {/* Brand Container */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10 bg-[#0A1322]">
          <img
            src="/sunvine_logo_white.png"
            alt="Sunvine Renewable Energy"
            className="h-10 w-auto object-contain cursor-pointer"
            onClick={() => setActiveTab(role === 'admin' ? 'admin_dashboard' : 'dashboard')}
          />
        </div>

        {/* Workspace Tag */}
        <div className="px-6 py-3 border-b border-white/5 bg-[#122036] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {role === 'admin' ? (
              <ShieldCheck className="w-4 h-4 text-[#6CBF3D]" />
            ) : (
              <Building2 className="w-4 h-4 text-[#6CBF3D]" />
            )}
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {role === 'admin' ? 'Super Admin Portal' : 'EPC Dealer Portal'}
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#6CBF3D] animate-pulse"></span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#6CBF3D] text-white font-semibold shadow-md'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-white/20 text-white font-semibold px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card & Logout Button at Bottom */}
        <div className="p-4 border-t border-white/10 bg-[#0A1322] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#6CBF3D]/20 border border-[#6CBF3D]/40 flex items-center justify-center text-[#6CBF3D] font-bold text-sm shrink-0">
              {role === 'admin' ? 'SA' : currentDealer.contactPerson.charAt(0)}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-white truncate">
                {role === 'admin' ? 'National Admin Desk' : currentDealer.contactPerson}
              </span>
              <span className="text-[11px] text-gray-400 truncate">
                {role === 'admin' ? 'superadmin@sunvine.in' : currentDealer.firmName}
              </span>
            </div>
          </div>

          {/* Official Logout CTA */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-300 text-xs font-semibold border border-white/10 hover:border-red-500/30 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Top Header */}
      <header className="no-print sticky top-0 z-20 md:pl-64 bg-white border-b border-[#E4E7EB] shadow-xs">
        <div className="h-16 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg focus:outline-none"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div>
              <h1 className="text-base md:text-lg font-bold text-[#0F1B2E] font-heading leading-tight">
                {role === 'admin' ? 'Sunvine National EPC Admin Console' : 'Authorized Dealer Quotation Portal'}
              </h1>
              <span className="text-xs text-gray-500 hidden sm:inline">
                Channel Network Operations • Metoda GIDC Rajkot
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            {role === 'dealer' && activeTab !== 'create_quote' && (
              <button
                onClick={() => setActiveTab('create_quote')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6CBF3D] hover:bg-[#5AA332] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <FilePlus className="w-3.5 h-3.5" />
                New Quote
              </button>
            )}

            <button
              onClick={() => setActiveTab('preview_quote')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F4F9] hover:bg-[#E4E7EB] text-[#0F1B2E] text-xs font-medium rounded-lg border border-[#E4E7EB] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#6CBF3D]" />
              <span className="hidden sm:inline">View</span> 4-Page PDF
            </button>

            <button
              onClick={logout}
              className="md:hidden p-1.5 text-gray-500 hover:text-red-600 rounded-lg"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="no-print fixed inset-0 z-40 md:hidden flex flex-col bg-[#0F1B2E] text-white p-6">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <img src="/sunvine_logo_white.png" alt="Sunvine" className="h-8" />
            <button onClick={() => setMobileOpen(false)} className="p-2">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="py-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            {role === 'admin' ? 'Super Admin Mode' : 'Dealer Mode'}
          </div>

          <nav className="flex-1 space-y-2 py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold ${
                  activeTab === item.id ? 'bg-[#6CBF3D] text-white' : 'text-gray-300'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileOpen(false);
                logout();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600/20 text-red-300 rounded-lg font-semibold text-xs"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
