import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_PRICING_MASTER,
  DEFAULT_MODULES,
  DEFAULT_INVERTERS,
  INITIAL_DEALERS,
  INITIAL_QUOTATIONS
} from '../data/defaultPresets';

const AppContext = createContext();

const TAB_TO_PATH = {
  dashboard: '/dashboard',
  create_quote: '/new-quotation',
  preview_quote: '/preview-quotation',
  my_quotes: '/my-quotations',
  profile: '/profile',
  dealer_settings: '/settings',
  admin_dashboard: '/admin',
  dealers_mgmt: '/admin/dealers',
  pricing_master: '/admin/pricing',
  hardware_master: '/admin/hardware',
  all_quotes: '/admin/quotations',
  admin_settings: '/admin/settings'
};

const PATH_TO_TAB = Object.entries(TAB_TO_PATH).reduce((acc, [tab, path]) => {
  acc[path] = tab;
  return acc;
}, {});

const getInitialTabFromUrl = () => {
  if (typeof window === 'undefined') return 'dashboard';
  const pathname = window.location.pathname;
  if (pathname === '/' || pathname === '') {
    return localStorage.getItem('sunvine_tab') || 'dashboard';
  }
  return PATH_TO_TAB[pathname] || localStorage.getItem('sunvine_tab') || 'dashboard';
};

export const AppProvider = ({ children }) => {
  // Authentication & Session State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sunvine_auth') === 'true';
  });

  // Auth screen toggle when not authenticated ('dealer_login' or 'admin_login')
  const [authView, setAuthView] = useState('dealer_login');

  // Role: 'dealer' or 'admin'
  const [role, setRole] = useState(() => localStorage.getItem('sunvine_role') || 'dealer');
  const [activeTab, setActiveTabState] = useState(getInitialTabFromUrl);

  const setActiveTab = (newTab, replace = false) => {
    setActiveTabState(newTab);
    if (typeof window !== 'undefined') {
      const targetPath = TAB_TO_PATH[newTab] || '/dashboard';
      if (window.location.pathname !== targetPath) {
        if (replace) {
          window.history.replaceState({ tab: newTab }, '', targetPath);
        } else {
          window.history.pushState({ tab: newTab }, '', targetPath);
        }
      }
    }
  };

  // Browser back/forward button synchronization
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const matchedTab = PATH_TO_TAB[path];
        if (matchedTab) {
          setActiveTabState(matchedTab);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL on initial load if logged in
  useEffect(() => {
    if (isAuthenticated && typeof window !== 'undefined') {
      const targetPath = TAB_TO_PATH[activeTab] || '/dashboard';
      if (window.location.pathname !== targetPath && window.location.pathname === '/') {
        window.history.replaceState({ tab: activeTab }, '', targetPath);
      }
    }
  }, [isAuthenticated, activeTab]);
  
  // Current Dealer Profile
  const [currentDealer, setCurrentDealer] = useState(() => {
    const saved = localStorage.getItem('sunvine_current_dealer');
    return saved ? JSON.parse(saved) : INITIAL_DEALERS[0];
  });

  // Master Pricing Presets (Configurable by Admin)
  const [pricingMaster, setPricingMaster] = useState(() => {
    const saved = localStorage.getItem('sunvine_pricing_master');
    return saved ? JSON.parse(saved) : DEFAULT_PRICING_MASTER;
  });

  // Solar Hardware Catalogs
  const [modulesList, setModulesList] = useState(() => {
    const saved = localStorage.getItem('sunvine_modules');
    return saved ? JSON.parse(saved) : DEFAULT_MODULES;
  });

  const [invertersList, setInvertersList] = useState(() => {
    const saved = localStorage.getItem('sunvine_inverters');
    return saved ? JSON.parse(saved) : DEFAULT_INVERTERS;
  });

  // Dealers Directory
  const [dealers, setDealers] = useState(() => {
    const saved = localStorage.getItem('sunvine_dealers');
    return saved ? JSON.parse(saved) : INITIAL_DEALERS;
  });

  // Quotations List
  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem('sunvine_quotations');
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
  });

  // Active quotation loaded in 4-Page Preview
  const [previewQuotation, setPreviewQuotation] = useState(() => {
    const saved = localStorage.getItem('sunvine_preview_quotation');
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS[0];
  });

  // Synchronize state with localStorage
  useEffect(() => {
    localStorage.setItem('sunvine_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('sunvine_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('sunvine_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('sunvine_current_dealer', JSON.stringify(currentDealer));
  }, [currentDealer]);

  useEffect(() => {
    localStorage.setItem('sunvine_pricing_master', JSON.stringify(pricingMaster));
  }, [pricingMaster]);

  useEffect(() => {
    localStorage.setItem('sunvine_modules', JSON.stringify(modulesList));
  }, [modulesList]);

  useEffect(() => {
    localStorage.setItem('sunvine_inverters', JSON.stringify(invertersList));
  }, [invertersList]);

  useEffect(() => {
    localStorage.setItem('sunvine_dealers', JSON.stringify(dealers));
  }, [dealers]);

  useEffect(() => {
    localStorage.setItem('sunvine_quotations', JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    if (previewQuotation) {
      localStorage.setItem('sunvine_preview_quotation', JSON.stringify(previewQuotation));
    }
  }, [previewQuotation]);

  // Auth Actions
  const login = (userRole, userProfile = null) => {
    setIsAuthenticated(true);
    setRole(userRole);
    if (userRole === 'admin') {
      setActiveTab('admin_dashboard');
    } else {
      setActiveTab('dashboard');
      if (userProfile) setCurrentDealer(userProfile);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthView('dealer_login');
    localStorage.removeItem('sunvine_auth');
  };

  const updateDealerProfile = (updatedFields) => {
    const updated = { ...currentDealer, ...updatedFields };
    setCurrentDealer(updated);
    setDealers(prev => prev.map(d => d.id === currentDealer.id ? updated : d));
  };

  // Quotation Actions
  const addQuotation = (newQuote) => {
    const updated = [newQuote, ...quotations];
    setQuotations(updated);
    setPreviewQuotation(newQuote);
  };

  const updateQuotationStatus = (id, newStatus) => {
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
  };

  const addDealer = (newDealer) => {
    setDealers(prev => [newDealer, ...prev]);
  };

  const toggleDealerStatus = (id) => {
    setDealers(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'Active' ? 'Suspended' : 'Active' } : d));
  };

  const updateDealerMarginCap = (id, newCap) => {
    setDealers(prev => prev.map(d => d.id === id ? { ...d, maxMarginCapPerKw: Number(newCap) } : d));
  };

  const updatePricingMaster = (newMaster) => {
    setPricingMaster(newMaster);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        authView,
        setAuthView,
        login,
        logout,
        role,
        setRole,
        activeTab,
        setActiveTab,
        currentDealer,
        setCurrentDealer,
        updateDealerProfile,
        pricingMaster,
        updatePricingMaster,
        modulesList,
        setModulesList,
        invertersList,
        setInvertersList,
        dealers,
        addDealer,
        toggleDealerStatus,
        updateDealerMarginCap,
        quotations,
        addQuotation,
        updateQuotationStatus,
        previewQuotation,
        setPreviewQuotation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
