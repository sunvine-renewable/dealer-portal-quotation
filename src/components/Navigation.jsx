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
  Download,
  Menu,
  X,
  ShieldCheck,
  Building2,
  Lock
} from 'lucide-react';

export default function Navigation() {
  const { role, setRole, activeTab, setActiveTab, currentDealer } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dealerMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create_quote', label: 'Create Quotation', icon: FilePlus },
    { id: 'preview_quote', label: 'Quotation Preview (PDF)', icon: FileText },
    { id: 'my_quotes', label: 'My Quotations', icon: History },
    { id: 'profile', label: 'Dealer Profile', icon: User },
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
      {/* Persistent Desktop Sidebar */}
      <aside className="no-print hidden md:flex flex-col w-64 bg-[#0F1B2E] border-r border-[#1E2E48] fixed inset-y-0 left-0 z-30 select-none">
        {/* Logo Container */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-white/10 bg-[#0A1322]">
          <img
            src="/sunvine_logo_white.png"
            alt="Sunvine Renewable Energy"
            className="h-10 w-auto object-contain cursor-pointer"
            onClick={() => setActiveTab(role === 'admin' ? 'admin_dashboard' : 'dashboard')}
          />
        </div>

        {/* Role Switcher Pill */}
        <div className="p-4 border-b border-white/5 bg-[#122036]">
          <div className="flex items-center justify-between p-1 bg-[#09101C] rounded-lg border border-white/10">
            <button
              onClick={() => {
                setRole('dealer');
                setActiveTab('dashboard');
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                role === 'dealer'
                  ? 'bg-[#6CBF3D] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Dealer
            </button>
            <button
              onClick={() => {
                setRole('admin');
                setActiveTab('admin_dashboard');
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                role === 'admin'
                  ? 'bg-[#6CBF3D] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400 px-1">
            <span>Current Workspace:</span>
            <span className="font-semibold text-white uppercase tracking-wider text-[10px] bg-white/10 px-1.5 py-0.5 rounded">
              {role === 'admin' ? 'Super Admin' : 'EPC Dealer'}
            </span>
          </div>
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
                    ? 'bg-[#6CBF3D] text-white shadow-md'
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

        {/* User Card at Bottom */}
        <div className="p-4 border-t border-white/10 bg-[#09101C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#6CBF3D]/20 border border-[#6CBF3D]/40 flex items-center justify-center text-[#6CBF3D] font-bold text-sm">
              {role === 'admin' ? 'SA' : currentDealer.contactPerson.charAt(0)}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-white truncate">
                {role === 'admin' ? 'Sunvine Admin Desk' : currentDealer.contactPerson}
              </span>
              <span className="text-[11px] text-gray-400 truncate">
                {role === 'admin' ? 'national@sunvinerenewable.com' : currentDealer.firmName}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Top Mobile/Desktop Header */}
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
            {/* Direct Switch to Create Quote */}
            {role === 'dealer' && activeTab !== 'create_quote' && (
              <button
                onClick={() => setActiveTab('create_quote')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6CBF3D] hover:bg-[#4F9A2C] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <FilePlus className="w-3.5 h-3.5" />
                New Quote
              </button>
            )}

            {/* Direct Switch to Preview */}
            <button
              onClick={() => setActiveTab('preview_quote')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F4F9] hover:bg-[#E4E7EB] text-[#0F1B2E] text-xs font-medium rounded-lg border border-[#E4E7EB] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#6CBF3D]" />
              <span className="hidden sm:inline">View</span> 4-Page PDF
            </button>

            {/* PWA Install Trigger / Status Pill */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-500 bg-[#F6F8F7] px-2.5 py-1 rounded-full border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#6CBF3D]"></span>
              <span>PWA Ready</span>
            </div>
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

          <div className="my-4 p-1 bg-[#09101C] rounded-lg flex">
            <button
              onClick={() => {
                setRole('dealer');
                setActiveTab('dashboard');
                setMobileOpen(false);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded ${role === 'dealer' ? 'bg-[#6CBF3D]' : 'text-gray-400'}`}
            >
              Dealer Mode
            </button>
            <button
              onClick={() => {
                setRole('admin');
                setActiveTab('admin_dashboard');
                setMobileOpen(false);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded ${role === 'admin' ? 'bg-[#6CBF3D]' : 'text-gray-400'}`}
            >
              Admin Mode
            </button>
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
        </div>
      )}
    </>
  );
}
