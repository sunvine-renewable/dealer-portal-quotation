import React, { useState, useEffect } from 'react';
import { APP_VERSION, RELEASE_DATE, CURRENT_RELEASE_CHANGELOG } from '../../config/version';

export const CURRENT_APP_VERSION = `v${APP_VERSION}`;

export default function AppUpdateModal() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStep, setUpdateStep] = useState('');

  useEffect(() => {
    // 1. Check version stored in localStorage
    const savedVersion = localStorage.getItem('sunvine_installed_version');
    if (savedVersion && savedVersion !== CURRENT_APP_VERSION) {
      setHasUpdate(true);
    } else if (!savedVersion) {
      // First visit initialization
      localStorage.setItem('sunvine_installed_version', CURRENT_APP_VERSION);
    }

    // 2. Service Worker Native Update Listener
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // If there's already a waiting worker
        if (registration.waiting) {
          setHasUpdate(true);
        }

        // When a new service worker is discovered
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setHasUpdate(true);
              }
            });
          }
        });
      }).catch(() => {});
    }

    // 3. Custom trigger listener (e.g. from Settings or test)
    const handleManualCheck = () => setHasUpdate(true);
    window.addEventListener('sunvine_trigger_update_modal', handleManualCheck);
    return () => window.removeEventListener('sunvine_trigger_update_modal', handleManualCheck);
  }, []);

  const handleApplyUpdate = async () => {
    setIsUpdating(true);
    setUpdateStep('Synchronizing application assets...');

    // Tell any waiting service worker to take control
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        }
      } catch (e) {}
    }

    setUpdateStep('Invalidating stale cache partitions...');
    // Safely clear outdated caches while preserving application state in localStorage
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      } catch (e) {}
    }

    setUpdateStep('Updating installation signature...');
    localStorage.setItem('sunvine_installed_version', CURRENT_APP_VERSION);

    await new Promise(r => setTimeout(r, 600));
    setUpdateStep('Reloading application...');
    
    // Refresh to activate new service worker and assets
    window.location.reload();
  };

  if (!hasUpdate) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-[#0F1B2E]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-modal-title"
      >
        {/* Android Native Style Banner Header */}
        <div className="bg-gradient-to-br from-[#0F1B2E] via-[#162740] to-[#1E3A5F] text-white p-6 relative overflow-hidden shrink-0">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#6CBF3D]/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#6CBF3D] flex items-center justify-center text-white shadow-lg shadow-[#6CBF3D]/30 shrink-0">
              <span className="material-symbols-outlined text-[28px]">system_update</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A1F96F] font-bold block">
                Official Production Release
              </span>
              <h2 id="update-modal-title" className="text-xl font-bold font-headline tracking-tight text-white">
                Sunvine Portal {CURRENT_APP_VERSION}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#6CBF3D]/25 text-[#A1F96F] text-[11px] font-semibold border border-[#6CBF3D]/40">
              {CURRENT_RELEASE_CHANGELOG.type} Release
            </span>
            <span className="text-[11px] text-gray-300">
              • {RELEASE_DATE}
            </span>
          </div>
        </div>

        {/* Update Details & Verified Changelog */}
        <div className="p-6 flex flex-col gap-4 bg-gray-50/50 overflow-y-auto flex-1">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#6CBF3D]">new_releases</span>
              <span>Key Updates in this Release:</span>
            </h3>
            
            <div className="space-y-2">
              {/* Verified Features */}
              {CURRENT_RELEASE_CHANGELOG.categories.features.slice(0, 3).map((feat, idx) => (
                <div key={`feat-${idx}`} className="flex items-start gap-2.5 text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="material-symbols-outlined text-[18px] text-[#6CBF3D] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}

              {/* Verified Improvements */}
              {CURRENT_RELEASE_CHANGELOG.categories.improvements.slice(0, 2).map((imp, idx) => (
                <div key={`imp-${idx}`} className="flex items-start gap-2.5 text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="material-symbols-outlined text-[18px] text-sky-600 shrink-0 mt-0.5">
                    speed
                  </span>
                  <span className="leading-snug">{imp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">info</span>
            <span className="leading-snug">
              This update activates the latest central pricing presets, DISCOM compliance rules, and Gujarat offline cache manifests.
            </span>
          </div>

          {/* Indeterminate Updating State */}
          {isUpdating && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 animate-in fade-in duration-200">
              <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin shrink-0"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-900">Installing Update...</span>
                <span className="text-[11px] text-emerald-700">{updateStep}</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleApplyUpdate}
              disabled={isUpdating}
              className="w-full h-12 bg-gradient-to-r from-[#6CBF3D] to-[#55A32E] hover:from-[#5EAB34] hover:to-[#4A9127] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#6CBF3D]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-75 cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[20px] ${isUpdating ? 'animate-spin' : ''}`}>
                {isUpdating ? 'sync' : 'upgrade'}
              </span>
              <span>
                {isUpdating ? 'Applying Update...' : 'Update Now (अपडेट करें) ⚡'}
              </span>
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              Application will restart automatically after activating the update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
