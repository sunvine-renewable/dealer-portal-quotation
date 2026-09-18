import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import SplashScreen from './components/SplashScreen';
import Navigation from './components/Navigation';

// Authentication Views
import DealerLogin from './components/Auth/DealerLogin';
import AdminLogin from './components/Auth/AdminLogin';

// Dealer Portal Views
import DealerDashboard from './components/DealerPortal/DealerDashboard';
import CreateQuotation from './components/DealerPortal/CreateQuotation';
import QuotationPreview from './components/DealerPortal/QuotationPreview';
import MyQuotations from './components/DealerPortal/MyQuotations';
import DealerProfile from './components/DealerPortal/DealerProfile';
import DealerSettings from './components/DealerPortal/DealerSettings';

// Admin Portal Views
import AdminDashboard from './components/AdminPortal/AdminDashboard';
import DealerManagement from './components/AdminPortal/DealerManagement';
import PricingMaster from './components/AdminPortal/PricingMaster';
import HardwareMaster from './components/AdminPortal/HardwareMaster';
import AllQuotations from './components/AdminPortal/AllQuotations';
import AdminSettings from './components/AdminPortal/AdminSettings';

function MainApp() {
  const { isAuthenticated, authView, role, activeTab } = useApp();
  const [splashFinished, setSplashFinished] = useState(() => {
    return sessionStorage.getItem('sunvine_splash_shown') === 'true';
  });

  const handleSplashFinish = () => {
    sessionStorage.setItem('sunvine_splash_shown', 'true');
    setSplashFinished(true);
  };

  // 0. Public Proposal Viewer (Accessible by customer via WhatsApp link)
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const isPublicProposalView = urlParams.get('view') === 'quote';

  if (isPublicProposalView) {
    return (
      <div className="min-h-screen bg-[#F6F8F7] text-[#0F1B2E] font-sans antialiased py-4 px-2 sm:px-6">
        <main className="max-w-5xl mx-auto">
          <QuotationPreview isPublicView={true} />
        </main>
      </div>
    );
  }

  // 1. Unauthenticated Gateway
  if (!isAuthenticated) {
    return (
      <>
        {!splashFinished && <SplashScreen onFinish={handleSplashFinish} />}
        {authView === 'admin_login' ? <AdminLogin /> : <DealerLogin />}
      </>
    );
  }

  // 2. Authenticated Portal Views
  const renderView = () => {
    // Shared 4-Page PDF proposal preview
    if (activeTab === 'preview_quote') {
      return <QuotationPreview />;
    }

    if (role === 'admin') {
      switch (activeTab) {
        case 'admin_dashboard':
          return <AdminDashboard />;
        case 'dealers_mgmt':
          return <DealerManagement />;
        case 'pricing_master':
          return <PricingMaster />;
        case 'hardware_master':
          return <HardwareMaster />;
        case 'all_quotes':
          return <AllQuotations />;
        case 'admin_settings':
          return <AdminSettings />;
        default:
          return <AdminDashboard />;
      }
    }

    // Default: Dealer Portal Views
    switch (activeTab) {
      case 'dashboard':
        return <DealerDashboard />;
      case 'create_quote':
        return <CreateQuotation />;
      case 'my_quotes':
        return <MyQuotations />;
      case 'profile':
        return <DealerProfile />;
      case 'dealer_settings':
        return <DealerSettings />;
      default:
        return <DealerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7] text-[#0F1B2E] font-sans antialiased">
      {/* 1-Second Splash on first arrival */}
      {!splashFinished && <SplashScreen onFinish={handleSplashFinish} />}

      {/* Navigation Layout */}
      <Navigation />

      {/* Main Content Area */}
      <main className="md:pl-64 pt-16 pb-24 md:pb-8 transition-all">
        <div className="p-3 sm:p-4 md:p-8 max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
