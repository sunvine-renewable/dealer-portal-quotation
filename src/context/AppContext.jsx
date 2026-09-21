import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_PRICING_MASTER,
  DEFAULT_MODULES,
  DEFAULT_INVERTERS,
  INITIAL_DEALERS,
  INITIAL_QUOTATIONS,
  DEFAULT_NOTIFICATIONS,
  PDF_BOS_PRICE_MATRIX,
  PDF_BOM_SPECIFICATIONS,
  SUNVINE_OFFICIAL_PROFILE
} from '../data/defaultPresets';

const DB_VERSION = 'sunvine_gujarat_ledger_1430_v2';

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
  
  const isDbUpToDate = typeof window !== 'undefined' && localStorage.getItem('sunvine_db_version') === DB_VERSION;

  // Current Dealer Profile (Gujarat default)
  const [currentDealer, setCurrentDealer] = useState(() => {
    if (!isDbUpToDate) return INITIAL_DEALERS[0];
    const saved = localStorage.getItem('sunvine_current_dealer');
    return saved ? JSON.parse(saved) : INITIAL_DEALERS[0];
  });

  // Master Pricing Presets (Configurable by Admin & synced with PDF)
  const [pricingMaster, setPricingMaster] = useState(() => {
    if (!isDbUpToDate) return DEFAULT_PRICING_MASTER;
    const saved = localStorage.getItem('sunvine_pricing_master');
    return saved ? JSON.parse(saved) : DEFAULT_PRICING_MASTER;
  });

  // Benchmark Quotation Presets (Admin & Dealer Sync)
  const [pricingPresets, setPricingPresets] = useState(() => {
    if (!isDbUpToDate) return DEFAULT_PRICING_MASTER.quotationPresets;
    const saved = localStorage.getItem('sunvine_pricing_presets');
    return saved ? JSON.parse(saved) : DEFAULT_PRICING_MASTER.quotationPresets;
  });

  // Solar Hardware Catalogs (from PDF)
  const [modulesList, setModulesList] = useState(() => {
    if (!isDbUpToDate) return DEFAULT_MODULES;
    const saved = localStorage.getItem('sunvine_modules');
    return saved ? JSON.parse(saved) : DEFAULT_MODULES;
  });

  const [invertersList, setInvertersList] = useState(() => {
    if (!isDbUpToDate) return DEFAULT_INVERTERS;
    const saved = localStorage.getItem('sunvine_inverters');
    return saved ? JSON.parse(saved) : DEFAULT_INVERTERS;
  });

  // Dealers Directory (550 Gujarat Dealers Only)
  const [dealers, setDealers] = useState(() => {
    if (!isDbUpToDate) return INITIAL_DEALERS;
    const saved = localStorage.getItem('sunvine_dealers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 500) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_DEALERS;
  });

  // Quotations List (All in Gujarat)
  const [quotations, setQuotations] = useState(() => {
    if (!isDbUpToDate) return INITIAL_QUOTATIONS;
    const saved = localStorage.getItem('sunvine_quotations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_QUOTATIONS;
  });

  // Active quotation loaded in 4-Page Preview
  const [previewQuotation, setPreviewQuotation] = useState(() => {
    if (!isDbUpToDate) return INITIAL_QUOTATIONS[0];
    const saved = localStorage.getItem('sunvine_preview_quotation');
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS[0];
  });

  // Active quotation loaded for Editing in CreateQuotation
  const [editingQuotation, setEditingQuotation] = useState(null);

  // System & Compliance Notifications
  const [notifications, setNotifications] = useState(() => {
    if (!isDbUpToDate) return DEFAULT_NOTIFICATIONS;
    const saved = localStorage.getItem('sunvine_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return DEFAULT_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('sunvine_db_version', DB_VERSION);
  }, []);

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
    localStorage.setItem('sunvine_pricing_presets', JSON.stringify(pricingPresets));
  }, [pricingPresets]);

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

  useEffect(() => {
    localStorage.setItem('sunvine_notifications', JSON.stringify(notifications));
  }, [notifications]);

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

  const updateQuotation = (updatedQuote) => {
    setQuotations(prev => {
      const exists = prev.some(q => q.id === updatedQuote.id);
      if (exists) {
        return prev.map(q => q.id === updatedQuote.id ? { ...q, ...updatedQuote } : q);
      }
      return [updatedQuote, ...prev];
    });
    setPreviewQuotation(updatedQuote);
    setEditingQuotation(null);
  };

  const startEditingQuotation = (quote) => {
    setEditingQuotation(quote);
    setActiveTab('create_quote');
  };

  const clearEditingQuotation = () => {
    setEditingQuotation(null);
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

  const updatePricingPresets = (newPresets) => {
    const timeStr = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());
    const updated = {
      ...pricingPresets,
      ...newPresets,
      lastSynced: `Today, ${timeStr} by ${role === 'admin' ? 'Super Admin Desk' : 'Ops'}`
    };
    setPricingPresets(updated);
    addNotification({
      title: 'Quotation Presets Updated',
      description: `Base Rate: ₹${Number(updated.baseRatePerKw).toLocaleString('en-IN')}/kW | Min Margin: ₹${Number(updated.minMarginPerKw).toLocaleString('en-IN')}/kW.`,
      category: 'pricing',
      icon: 'tune'
    });
  };

  // Notification Actions
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
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
        pricingPresets,
        updatePricingPresets,
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
        updateQuotation,
        editingQuotation,
        startEditingQuotation,
        clearEditingQuotation,
        updateQuotationStatus,
        previewQuotation,
        setPreviewQuotation,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        clearAllNotifications,
        addNotification,
        pdfBosMatrix: PDF_BOS_PRICE_MATRIX,
        pdfBomSpecs: PDF_BOM_SPECIFICATIONS,
        officialProfile: SUNVINE_OFFICIAL_PROFILE
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
