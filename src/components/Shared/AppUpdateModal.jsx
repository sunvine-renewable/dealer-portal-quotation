import React, { useState, useEffect } from 'react';

export const CURRENT_APP_VERSION = 'v1.3.0';
export const RELEASE_DATE = 'September 2026';

export const CHANGELOG_ITEMS = [
  { icon: 'bolt', text: 'Live Dealer Margin & Real-time Customer Price Calculation' },
  { icon: 'edit_document', text: 'Direct Edit & Re-calculation for existing Quotations' },
  { icon: 'schema', text: 'Industrial CAD Single Line Diagram (SLD) with DISCOM Grid-Tie' },
  { icon: 'phone_in_talk', text: 'Official Sunvine Helpline (+91 80000 50580) & Support Desk' },
  { icon: 'public', text: 'Official Custom Domain (sunvine-dealer.vprotech.online) Support' }
];

export default function AppUpdateModal() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

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

    // Simulated smooth Android installation progress bar
    for (let p = 10; p <= 90; p += 20) {
      setProgress(p);
      await new Promise(r => setTimeout(r, 200));
    }

    // Tell any waiting service worker to take control
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }
    }

    // Clear stale cache storage to ensure fresh bundles
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      } catch (e) {}
    }

    setProgress(100);
    localStorage.setItem('sunvine_installed_version', CURRENT_APP_VERSION);

    await new Promise(r => setTimeout(r, 400));
    // Hard refresh window to load fresh app
    window.location.reload(true);
  };

  if (!hasUpdate) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-[#0F1B2E]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 flex flex-col animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Android Native Style Banner Header */}
        <div className="bg-gradient-to-br from-[#0F1B2E] via-[#162740] to-[#1E3A5F] text-white p-6 relative overflow-hidden">
          {/* Glowing Ambient Light */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#6CBF3D]/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#6CBF3D] flex items-center justify-center text-white shadow-lg shadow-[#6CBF3D]/30 shrink-0">
              <span className="material-symbols-outlined text-[28px] animate-bounce">system_update</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A1F96F] font-bold block">
                Official System Update
              </span>
              <h2 className="text-xl font-bold font-headline tracking-tight text-white">
                Sunvine Portal {CURRENT_APP_VERSION}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#6CBF3D]/25 text-[#A1F96F] text-[11px] font-semibold border border-[#6CBF3D]/40">
              Mandatory Security &amp; Engine Release
            </span>
            <span className="text-[11px] text-gray-300">
              • {RELEASE_DATE}
            </span>
          </div>
        </div>

        {/* Update Details & Changelog */}
        <div className="p-6 flex flex-col gap-4 bg-gray-50/50">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#6CBF3D]">new_releases</span>
              <span>What's New in this Update:</span>
            </h3>
            <div className="space-y-2">
              {CHANGELOG_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="material-symbols-outlined text-[18px] text-[#6CBF3D] shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Alert Box */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">info</span>
            <span className="leading-snug">
              This update is <strong>mandatory</strong> to ensure accurate DISCOM subsidy calculation, cloud quote sync, and uninterrupted proposal generation.
            </span>
          </div>

          {/* Progress Bar (Visible while installing) */}
          {isUpdating && (
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex justify-between text-xs font-semibold text-gray-700">
                <span>Installing update package...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#6CBF3D] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Button (No Dismiss - Mandatory) */}
          <div className="pt-2">
            <button
              onClick={handleApplyUpdate}
              disabled={isUpdating}
              className="w-full h-12 bg-gradient-to-r from-[#6CBF3D] to-[#55A32E] hover:from-[#5EAB34] hover:to-[#4A9127] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#6CBF3D]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-75 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isUpdating ? 'sync' : 'upgrade'}
              </span>
              <span>
                {isUpdating ? 'Applying Update & Restarting...' : 'Update Now (अपडेट करें) ⚡'}
              </span>
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              App will restart automatically in 2 seconds after update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
