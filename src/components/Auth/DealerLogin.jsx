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
        <div className="w-full min-h-screen flex flex-col lg:flex-row bg-surface">
          {/* Left Panel: Deep Navy Visual Showcase */}
          <div className="relative w-full lg:w-1/2 bg-on-secondary-fixed text-on-secondary flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden min-h-[520px] lg:min-h-screen">
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
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Sunvine Renewable Energy Logo"
                    className="h-10 w-auto object-contain brightness-110 drop-shadow-sm"
                    src="/sunvine_logo_transparent.png"
                  />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/15 text-primary-fixed font-label-xs tracking-wider uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                  Authorised Dealer Network
                </span>
              </div>
            </div>

            {/* Center Narrative & Highlights */}
            <div className="relative z-10 my-auto py-12 lg:py-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/10 text-primary-fixed mb-6">
                <span className="material-symbols-outlined text-base">solar_power</span>
                <span className="font-label-sm tracking-wide">Enterprise Commercial &amp; Residential Portal</span>
              </div>
              <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-secondary leading-tight max-w-xl">
                Powering Today. <br/>
                <span className="text-primary-container">Protecting Tomorrow.</span>
              </h2>
              <p className="mt-4 font-body-lg text-secondary-fixed-dim max-w-lg">
                High-precision sizing engines, streamlined rooftop schematics, and instantaneous government subsidy workflows built exclusively for certified channel partners.
              </p>

              {/* Feature List */}
              <div className="mt-8 space-y-4 max-w-lg">
                <div className="flex items-start gap-3 bg-surface-container-lowest/5 p-3.5 rounded-xl backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-primary-container/20 text-primary-fixed">
                    <span className="material-symbols-outlined text-lg">bolt</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-sm text-on-secondary font-semibold">Instant Quotation Engine</h3>
                    <p className="font-body-sm text-secondary-fixed-dim">Generate fully costed commercial CAD-aligned BOQ propositions in under 90 seconds.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-surface-container-lowest/5 p-3.5 rounded-xl backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-primary-container/20 text-primary-fixed">
                    <span className="material-symbols-outlined text-lg">account_balance</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-sm text-on-secondary font-semibold">Verified Government Subsidy Calculator</h3>
                    <p className="font-body-sm text-secondary-fixed-dim">Integrated state and central solar tariff grids with live net-metering slabs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-surface-container-lowest/5 p-3.5 rounded-xl backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-primary-container/20 text-primary-fixed">
                    <span className="material-symbols-outlined text-lg">share</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-sm text-on-secondary font-semibold">Direct WhatsApp &amp; PDF Sharing</h3>
                    <p className="font-body-sm text-secondary-fixed-dim">Deliver branded estimation decks and system specs directly to customer devices.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Strip */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 text-secondary-fixed-dim text-body-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-base">verified_user</span>
                <span>ISO 27001 Certified Field Workstation</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Grid SLA: 99.98%</span>
                <span>•</span>
                <span>v4.18.2</span>
              </div>
            </div>
          </div>

          {/* Right Half: Clean White Canvas & Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-surface-container-low">
            <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-xl p-8 sm:p-10 shadow-lg shadow-on-secondary-fixed/5">
              {/* Header Badge & Heading */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed-variant mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label-xs font-semibold uppercase tracking-wider">Channel Console</span>
                </div>
                <h1 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-bold">Dealer Login</h1>
                <p className="mt-2 font-body-md text-secondary">Login to create and manage your solar quotations</p>
              </div>

              {/* Form Elements */}
              <form className="space-y-5" id="dealer-login-form" onSubmit={handleLogin}>
                {/* Mobile Number Input */}
                <div>
                  <label className="block font-label-sm text-on-surface mb-2 font-semibold" htmlFor="mobile-number">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 flex items-center gap-1.5 text-secondary font-label-md select-none">
                      <span className="material-symbols-outlined text-base">phone_iphone</span>
                      <span className="font-medium text-on-surface">+91</span>
                    </span>
                    <input
                      className="w-full h-11 pl-20 pr-4 bg-surface-container-lowest text-on-surface font-body-md rounded-lg shadow-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-bright border border-surface-container-high"
                      id="mobile-number"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      placeholder="Enter your registered mobile number"
                      required
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className="mt-1.5 font-body-sm text-error flex items-center gap-1" id="mobile-error">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {error}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-label-sm text-on-surface font-semibold" htmlFor="dealer-password">
                      Password
                    </label>
                    <a
                      className="font-label-sm text-primary hover:text-on-primary-container transition-colors cursor-pointer"
                      onClick={() => alert('Password reset link sent to your registered phone number.')}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-secondary flex items-center">
                      <span className="material-symbols-outlined text-lg">lock</span>
                    </span>
                    <input
                      className="w-full h-11 pl-11 pr-11 bg-surface-container-lowest text-on-surface font-body-md rounded-lg shadow-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-bright border border-surface-container-high"
                      id="dealer-password"
                      placeholder="Enter your password"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      aria-label="Toggle password visibility"
                      className="absolute right-3.5 text-secondary hover:text-on-surface transition-colors focus:outline-none flex items-center"
                      id="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg" id="password-eye-icon">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      className="w-4 h-4 rounded text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container"
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="font-body-sm text-secondary">Remember my station</span>
                  </label>
                  <span className="font-label-xs text-secondary-fixed-dim">Encrypted Key</span>
                </div>

                {/* Primary Submit Button */}
                <button
                  className="w-full h-11 bg-primary-container hover:bg-primary text-on-primary font-label-md rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  id="submit-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                      <span>Authenticating Dealer...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Console</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-surface-container-high"></div>
                </div>
                <span className="relative px-3 bg-surface-container-lowest text-secondary font-label-sm uppercase tracking-wider text-xs">
                  Administrative Access
                </span>
              </div>

              {/* Switch to Super Admin Login */}
              <button
                className="w-full h-11 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 border border-surface-container-high"
                onClick={() => setAuthView('admin_login')}
                type="button"
              >
                <span className="material-symbols-outlined text-primary text-lg">shield</span>
                <span>Super Admin &amp; EPC Headquarters Login</span>
              </button>

              {/* Quick Help & Partner Metrics */}
              <div className="mt-8 p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">headset_mic</span>
                  <span className="font-body-sm text-secondary">
                    Helpline: <strong className="text-on-surface font-semibold">1800-SUN-VINE</strong>
                  </span>
                </div>
                <span className="font-label-xs px-2 py-0.5 rounded bg-surface-container-highest text-secondary">
                  Toll Free
                </span>
              </div>

              {/* Portal Legal Notice */}
              <p className="mt-6 text-center font-body-sm text-secondary text-xs">
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
