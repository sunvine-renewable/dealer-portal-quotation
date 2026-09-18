import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }) {
  const [fadeState, setFadeState] = useState('in'); // 'in' -> 'out'

  useEffect(() => {
    // 0.8s display, then 0.4s fade out
    const timer = setTimeout(() => {
      setFadeState('out');
    }, 1000);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 1400);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F1B2E] transition-opacity duration-400 select-none ${
        fadeState === 'out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Soft radial emerald ambient glow behind logo */}
      <div className="absolute w-96 h-96 rounded-full bg-[#6CBF3D]/15 blur-3xl pointer-events-none animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Exact Original Sunvine Logo */}
        <div className="transform transition-transform duration-700 ease-out hover:scale-105 mb-5">
          <img
            src="/sunvine_logo_white.png"
            alt="Sunvine Renewable Energy"
            className="h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_0_25px_rgba(108,191,61,0.35)]"
          />
        </div>

        {/* Brand Tagline */}
        <p className="text-gray-300 text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-center mt-1">
          CLEAN ENERGY. SUSTAINABLE FUTURE. BETTER TOMORROW.
        </p>
      </div>

      {/* Discreet footer motto */}
      <div className="absolute bottom-8 text-[11px] text-gray-500 tracking-widest uppercase">
        Powering Today. Protecting Tomorrow.
      </div>
    </div>
  );
}
