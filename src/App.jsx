import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import SplashScreen from './components/SplashScreen';
import Navigation from './components/Navigation';

// Dealer Portal Views
import DealerDashboard from './components/DealerPortal/DealerDashboard';
import CreateQuotation from './components/DealerPortal/CreateQuotation';
import QuotationPreview from './components/DealerPortal/QuotationPreview';
import MyQuotations from './components/DealerPortal/MyQuotations';
import DealerProfile from './components/DealerPortal/DealerProfile';

// Admin Portal Views
import AdminDashboard from './components/AdminPortal/AdminDashboard';
import DealerManagement from './components/AdminPortal/DealerManagement';
import PricingMaster from './components/AdminPortal/PricingMaster';
import HardwareMaster from './components/AdminPortal/HardwareMaster';
import AllQuotations from './components/AdminPortal/AllQuotations';

function MainApp() {
  const { role, activeTab } = useApp();
  const [splashFinished, setSplashFinished] = useState(() => {
    return sessionStorage.getItem('sunvine_splash_shown') === 'true';
  });

  const handleSplashFinish = () => {
    sessionStorage.setItem('sunvine_splash_shown', 'true');
    setSplashFinished(true);
  };

  // Render view corresponding to current active tab and role
  const renderView = () => {
    // Shared preview tab for both dealer & admin
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
      default:
        return <DealerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7] text-[#0F1B2E] font-sans antialiased">
      {/* 1-Second Minimalist Brand Splash Screen on Initial Load */}
      {!splashFinished && <SplashScreen onFinish={handleSplashFinish} />}

      {/* Navigation Layout */}
      <Navigation />

      {/* Main Content Area */}
      <main className="md:pl-64 transition-all">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
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
