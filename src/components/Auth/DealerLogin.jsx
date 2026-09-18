import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function DealerLogin() {
  const { login, setAuthView } = useApp();
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [password, setPassword] = useState('dealer123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const cleanNumber = mobileNumber.replace(/\D/g, '');
    if (cleanNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      login('dealer');
    }, 600);
  };

  return (
    <main className="w-full">
      <div className="flex flex-col w-full">
        <div className="w-full min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row bg-surface">
          {/* Left Panel: Deep Navy Visual Showcase */}
          <div className="relative w-full lg:w-1/2 bg-on-secondary-fixed text-on-secondary flex flex-col justify-between p-6 sm:p-10 lg:p-8 xl:p-12 overflow-hidden min-h-[460px] lg:min-h-0 lg:h-full">
            {/* Decorative Solar Grid Background Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern height="40" id="solar-grid-pattern" patternUnits="userSpaceOnUse" width="60">
                    <path d="M 60 0 L 0 0 0 40 60 40 Z" fill="none" stroke="#6CBF3D" strokeDasharray="2,2" strokeWidth="0.75"></path>
                    <path d="M 0 20 L 60 20" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="0.5"></path>
                    <path d="M 30 0 L 30 40" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect fill="url(#solar-grid-pattern)" height="100%" width="100%"></rect>
              </svg>
            </div>

            {/* Glowing Green Energy Waves & Ambient Light */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-primary/25 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header / Logo Zone */}
            <div className="relative z-10 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Sunvine Renewable Energy Logo"
                    className="h-9 lg:h-10 w-auto object-contain brightness-110 drop-shadow-sm"
                    src="/sunvine_logo_white.png"
                  />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/15 text-primary-fixed font-label-xs tracking-wider uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                  Authorised Dealer Network
                </span>
              </div>
            </div>

            {/* Center Narrative & Highlights */}
            <div className="relative z-10 my-auto py-6 lg:py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/10 text-primary-fixed mb-3 lg:mb-4">
                <span className="material-symbols-outlined text-base">solar_power</span>
                <span className="font-label-xs tracking-wide">Enterprise Commercial &amp; Residential Portal</span>
              </div>
              <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-on-secondary leading-tight max-w-xl">
                Powering Today. <br/>
                <span className="text-primary-container">Protecting Tomorrow.</span>
              </h2>
              <p className="mt-2.5 font-body-sm text-secondary-fixed-dim max-w-lg leading-relaxed">
                High-precision sizing engines, streamlined rooftop schematics, and instantaneous government subsidy workflows built exclusively for certified channel partners.
              </p>

              {/* Feature List */}
              <div className="mt-5 space-y-2.5 max-w-lg">
                <div className="flex items-start gap-3 bg-surface-container-lowest/5 p-2.5 sm:p-3 rounded-xl backdrop-blur-sm">
                  <div className="p-1.5 rounded-lg bg-primary-container/20 text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-base">bolt</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-xs sm:text-sm text-on-secondary font-semibold">Instant Quotation Engine</h3>
                    <p className="font-body-xs text-xs text-secondary-fixed-dim">Generate fully costed commercial CAD-aligned BOQ propositions in under 90 seconds.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-surface-container-lowest/5 p-2.5 sm:p-3 rounded-xl backdrop-blur-sm">
                  <div className="p-1.5 rounded-lg bg-primary-container/20 text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-base">account_balance</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-xs sm:text-sm text-on-secondary font-semibold">Verified Government Subsidy Calculator</h3>
                    <p className="font-body-xs text-xs text-secondary-fixed-dim">Integrated state and central solar tariff grids with live net-metering slabs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-surface-container-lowest/5 p-2.5 sm:p-3 rounded-xl backdrop-blur-sm">
                  <div className="p-1.5 rounded-lg bg-primary-container/20 text-primary-fixed shrink-0">
                    <span className="material-symbols-outlined text-base">share</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-xs sm:text-sm text-on-secondary font-semibold">Direct WhatsApp &amp; PDF Sharing</h3>
                    <p className="font-body-xs text-xs text-secondary-fixed-dim">Deliver branded estimation decks and system specs directly to customer devices.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Strip */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 text-secondary-fixed-dim text-xs shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-container text-sm">verified_user</span>
                <span>ISO 27001 Certified Workstation</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Grid SLA: 99.98%</span>
                <span>•</span>
                <span>v4.18.2</span>
              </div>
            </div>
          </div>

          {/* Right Half: Clean White Canvas & Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-6 bg-surface-container-low lg:h-full lg:overflow-hidden">
            <div className="w-full max-w-[430px] bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-lg shadow-on-secondary-fixed/5 my-auto">
              {/* Header Badge & Heading */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label-xs font-semibold uppercase tracking-wider">Channel Console</span>
                </div>
                <h1 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-bold">Dealer Login</h1>
                <p className="mt-1 font-body-sm text-secondary text-xs sm:text-sm">Login to create and manage your solar quotations</p>
              </div>

              {/* Form Elements */}
              <form className="space-y-3.5" id="dealer-login-form" onSubmit={handleLogin}>
                {/* Mobile Number Input */}
                <div>
                  <label className="block font-label-xs text-on-surface mb-1.5 font-semibold" htmlFor="mobile-number">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 flex items-center gap-1.5 text-secondary font-label-sm select-none">
                      <span className="material-symbols-outlined text-base">phone_iphone</span>
                      <span className="font-medium text-on-surface">+91</span>
                    </span>
                    <input
                      className="w-full h-10 pl-20 pr-4 bg-surface-container-lowest text-on-surface font-body-sm rounded-lg shadow-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-bright border border-surface-container-high"
                      id="mobile-number"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      placeholder="Enter registered mobile"
                      required
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className="mt-1 font-body-xs text-error flex items-center gap-1 text-xs" id="mobile-error">
                      <span className="material-symbols-outlined text-xs">error</span>
                      {error}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-label-xs text-on-surface font-semibold" htmlFor="dealer-password">
                      Password
                    </label>
                    <a
                      className="font-label-xs text-primary hover:text-on-primary-container transition-colors cursor-pointer"
                      onClick={() => alert('Password reset link sent to your registered phone number.')}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-secondary flex items-center">
                      <span className="material-symbols-outlined text-base">lock</span>
                    </span>
                    <input
                      className="w-full h-10 pl-10 pr-10 bg-surface-container-lowest text-on-surface font-body-sm rounded-lg shadow-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-bright border border-surface-container-high"
                      id="dealer-password"
                      placeholder="Enter your password"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      aria-label="Toggle password visibility"
                      className="absolute right-3 text-secondary hover:text-on-surface transition-colors focus:outline-none flex items-center"
                      id="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base" id="password-eye-icon">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      className="w-3.5 h-3.5 rounded text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container"
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="font-body-xs text-secondary text-xs">Remember my station</span>
                  </label>
                  <span className="font-label-xs text-secondary-fixed-dim text-[11px]">Encrypted Session</span>
                </div>

                {/* Primary Submit Button */}
                <button
                  className="w-full h-10 bg-primary-container hover:bg-primary text-on-primary font-label-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  id="submit-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-base">sync</span>
                      <span>Authenticating Dealer...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Console</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-3.5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-surface-container-high"></div>
                </div>
                <span className="relative px-3 bg-surface-container-lowest text-secondary font-label-xs uppercase tracking-wider text-[11px]">
                  Administrative Access
                </span>
              </div>

              {/* Switch to Super Admin Login */}
              <button
                className="w-full h-10 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-xs sm:font-label-sm font-medium rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 border border-surface-container-high"
                onClick={() => setAuthView('admin_login')}
                type="button"
              >
                <span className="material-symbols-outlined text-primary text-base">shield</span>
                <span>Super Admin &amp; Headquarters Login</span>
              </button>

              {/* Quick Help & Partner Metrics */}
              <div className="mt-4 p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">headset_mic</span>
                  <span className="font-body-xs text-secondary text-xs">
                    Helpline: <strong className="text-on-surface font-semibold text-xs">+91 80000 50580</strong>
                  </span>
                </div>
                <span className="font-label-xs px-2 py-0.5 rounded bg-primary-container/15 text-primary font-semibold text-[11px]">
                  Official Support
                </span>
              </div>

              {/* Portal Legal Notice */}
              <p className="mt-3 text-center font-body-xs text-secondary text-[11px] leading-tight">
                © Sunvine Renewable Energy Private Limited. <br/>
                Authorized dealer access only. Unauthorized entry is logged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
