import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Navigation() {
  const { role, activeTab, setActiveTab, currentDealer, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dealerMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'create_quote', label: 'New Quotation', icon: 'note_add' },
    { id: 'my_quotes', label: 'My Quotations', icon: 'folder_open' },
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'dealer_settings', label: 'Settings', icon: 'settings' },
  ];

  const adminMenu = [
    { id: 'admin_dashboard', label: 'Executive Overview', icon: 'dashboard' },
    { id: 'dealers_mgmt', label: 'Dealer Partners', icon: 'group' },
    { id: 'pricing_master', label: 'Pricing & Presets', icon: 'tune' },
    { id: 'hardware_master', label: 'Hardware Catalog', icon: 'memory' },
    { id: 'all_quotes', label: 'All Quotations Audit', icon: 'inventory_2' },
    { id: 'admin_settings', label: 'Master Governance', icon: 'settings' },
  ];

  const menuItems = role === 'admin' ? adminMenu : dealerMenu;

  return (
    <>
      {/* Desktop Sidebar (Exact Stitch Design) */}
      <aside className="no-print hidden md:flex fixed left-0 top-0 h-screen w-64 bg-on-secondary-fixed z-50 flex-col justify-between select-none">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="h-16 px-space-lg flex items-center gap-space-sm border-b border-white/10">
            <img
              alt="Sunvine Renewable Energy Logo"
              className="h-8 w-auto object-contain cursor-pointer"
              src="/sunvine_logo_white.png"
              onClick={() => setActiveTab(role === 'admin' ? 'admin_dashboard' : 'dashboard')}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-secondary tracking-tight leading-tight">Sunvine</span>
              <span className="font-label-xs text-label-xs text-secondary-fixed-dim tracking-wider uppercase">
                {role === 'admin' ? 'Super Admin Portal' : 'Dealer Portal'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col mt-space-md">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-space-sm px-space-lg py-space-sm transition-colors text-left ${
                    isActive
                      ? 'border-l-4 border-primary-container bg-white/10 text-on-secondary font-label-md'
                      : 'text-secondary-fixed-dim hover:bg-white/5 hover:text-on-secondary font-body-md'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout Item */}
        <div className="p-space-md border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-secondary-fixed-dim hover:bg-white/5 hover:text-on-secondary transition-colors font-body-md"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Top Header (Exact Stitch Design) */}
      <header className="no-print fixed top-0 left-0 md:left-64 right-0 h-16 bg-surface-container-lowest border-b border-surface-container-high z-40 flex items-center justify-between px-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Left Status Bar */}
        <div className="flex items-center gap-space-md">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-space-xs text-secondary hover:text-on-surface rounded-lg"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <img
            alt="Sunvine Renewable Energy Logo"
            className="h-8 w-auto object-contain md:hidden"
            src="/sunvine_logo_transparent.png"
          />
          <div className="flex items-center gap-space-xs text-secondary font-label-sm">
            <span className="material-symbols-outlined text-[18px]">solar_power</span>
            <span>Channel Network • Dealer Operations</span>
          </div>
        </div>

        {/* Right Status / Profile Controls */}
        <div className="flex items-center gap-space-lg">
          {/* Notification Bell with Active Indicator */}
          <button
            className="relative p-space-xs rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors"
            type="button"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container"></span>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-surface-container-high"></div>

          {/* Dealer Avatar & Dropdown Pill */}
          <div className="relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-space-sm cursor-pointer select-none"
            >
              <img
                src={currentDealer.avatar || '/dealer_avatar.jpg'}
                alt="Dealer Avatar"
                className="w-8 h-8 rounded-full object-cover shadow-sm border border-surface-container-high"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface leading-tight">
                  {role === 'admin' ? 'Super Admin Desk' : currentDealer.firmName || 'Rajesh Solar Solutions'}
                </span>
                <span className="font-label-xs text-label-xs text-secondary leading-tight">
                  {role === 'admin' ? 'System Administrator' : 'Authorized Dealer'}
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                keyboard_arrow_down
              </span>
            </div>

            {/* Quick Profile Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high py-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-4 py-2 border-b border-surface-container-high">
                  <p className="font-label-md text-on-surface text-xs font-bold truncate">
                    {role === 'admin' ? 'Super Admin' : currentDealer.contactPerson}
                  </p>
                  <p className="font-body-sm text-secondary text-[11px] truncate">
                    {role === 'admin' ? 'admin@sunvine.in' : currentDealer.email}
                  </p>
                </div>
                {role === 'dealer' && (
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">account_circle</span>
                    <span>View Profile</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-error hover:bg-error-container/20"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="no-print fixed inset-0 z-50 md:hidden flex flex-col bg-on-secondary-fixed text-white p-6">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <img src="/sunvine_logo_white.png" alt="Sunvine" className="h-7" />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary-fixed-dim">
                {role === 'admin' ? 'Admin Mode' : 'Dealer Portal'}
              </span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-2">
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <nav className="flex-1 space-y-2 py-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold ${
                  activeTab === item.id ? 'bg-primary-container text-on-primary' : 'text-secondary-fixed-dim'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileOpen(false);
                logout();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-error/20 text-error-container rounded-lg font-semibold text-xs"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
