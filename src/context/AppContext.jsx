import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_PRICING_MASTER,
  DEFAULT_MODULES,
  DEFAULT_INVERTERS,
  INITIAL_DEALERS,
  INITIAL_QUOTATIONS
} from '../data/defaultPresets';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Session / Role Management: 'dealer' or 'admin'
  const [role, setRole] = useState(() => localStorage.getItem('sunvine_role') || 'dealer');
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('sunvine_tab') || 'dashboard');
  
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
    localStorage.setItem('sunvine_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('sunvine_tab', activeTab);
  }, [activeTab]);

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

  // Actions
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
        role,
        setRole,
        activeTab,
        setActiveTab,
        currentDealer,
        setCurrentDealer,
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
