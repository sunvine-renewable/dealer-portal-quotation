# Sunvine Renewable Energy — Responsive UI Architecture & Rules

> **Status**: Permanent Project Standard  
> **Applicability**: Super Admin Portal, Dealer Portal, Shared UI Components, and Modals  
> **Enforcement**: Mandatory automated check via Puppeteer before merging to `main`

---

## 1. Core Philosophy & Principles

The Sunvine Dealer and Admin portals are mission-critical operational platforms used in diverse field conditions—from rooftop solar engineers using low-cost smartphones under sunlight to regional branch managers operating tablets and corporate executives reviewing financial ledgers on high-resolution multi-monitor desktop workstations.

Every user interface component must adhere to three foundational axioms:

1. **Zero Horizontal Viewport Overflow**:  
   At no point may the outer page trigger unwanted horizontal scrolling on the root viewport (`document.documentElement.scrollWidth <= window.innerWidth`).
2. **Fluid Elasticity & Component-Level Containment**:  
   Layout containers must flex, wrap, or scroll locally rather than pushing page boundaries. Hardcoded pixel widths (`w-[Xpx]`) on parent containers or screen wrappers are strictly prohibited.
3. **Touch Ergonomics & Legibility Preservation**:  
   Solar technicians and dealers require minimum 44×44px interactive tap targets, high-contrast visual cues, and resilient typography that prevents iOS Safari auto-zoom.

---

## 2. Standard Viewport Matrix (14 Target Environments)

All views, dialogs, charts, and tables must render without clipping, text overlap, or broken layouts across the following 14 screen configurations:

| Device Category | Target Device | Viewport Dimensions (W × H) | Min Column Grid |
|---|---|---|---|
| **Ultra-Compact Mobile** | iPhone SE (1st gen) / Low-end Android | **320 × 568 px** | 1 Column (`grid-cols-1`) |
| **Compact Mobile** | Samsung Galaxy S-series | **360 × 800 px** | 1 Column (`grid-cols-1`) |
| **Standard Mobile** | iPhone 8 / SE (2nd/3rd gen) | **375 × 667 px** | 1 Column (`grid-cols-1`) |
| **Modern Mobile** | iPhone 12 / 13 / 14 / 15 | **390 × 844 px** | 1 Column (`grid-cols-1`) |
| **Android Large** | Google Pixel 7 / Galaxy S23+ | **412 × 915 px** | 1 Column (`grid-cols-1`) |
| **Mobile Pro Max** | iPhone 14 / 15 Pro Max | **430 × 932 px** | 1 Column (`grid-cols-1`) |
| **Small Tablet / Foldable** | iPad Mini / Galaxy Fold Unfolded | **768 × 1024 px** | 2 Columns (`sm:grid-cols-2`) |
| **Mid Tablet** | iPad Air / Pro 11" (Portrait) | **834 × 1194 px** | 2 Columns (`md:grid-cols-2`) |
| **Large Tablet / Netbook** | iPad Pro 12.9" / Small Laptop | **1024 × 768 px** | 3–4 Columns (`lg:grid-cols-4`) |
| **Compact Laptop** | MacBook Air / 13" Laptops | **1280 × 800 px** | Full Desktop (`xl:grid-cols-4`) |
| **Standard Laptop** | HD Business Notebooks | **1366 × 768 px** | Full Desktop |
| **Premium Desktop** | MacBook Pro 16" / QHD | **1440 × 900 px** | Full Desktop |
| **High-DPI Desktop** | Surface Laptop / Windows Scaled 125% | **1536 × 864 px** | Full Desktop |
| **Full HD / 4K Workstation**| Standard 24"-27" External Monitors | **1920 × 1080 px** | Full Desktop (`2xl:...`) |

---

## 3. Structural Layout & CSS Rules

### Rule 3.1: Flex Containers & `min-w-0`
By default, CSS flex child elements have `min-width: auto`, preventing truncation (`truncate`) or shrinkage below their content size.
* **Requirement**: Whenever placing text, status badges, or action buttons inside a flex child, add `min-w-0` to the child container:
  ```jsx
  {/* Correct */}
  <div className="flex items-center justify-between gap-3">
    <div className="min-w-0 flex-1">
      <h4 className="font-bold text-slate-800 truncate">{customerName}</h4>
      <p className="text-xs text-slate-500 truncate">{dealerName}</p>
    </div>
    <span className="shrink-0 font-mono font-bold text-slate-900">{amount}</span>
  </div>
  ```

### Rule 3.2: Grid Layout Stacking
Metric cards, KPI tiles, and feature panels must stack naturally:
* **Requirement**: Always declare mobile-first responsive columns:
  ```jsx
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {/* KPI Cards */}
  </div>
  ```

### Rule 3.3: Data Tables & Ledgers Containment
Financial ledgers (e.g. Admin Recent Proposals, BOM lists) contain multiple columns that cannot be legibly compressed to 320px.
* **Requirement**:
  1. Wrap every table in an isolated overflow container:
     ```jsx
     <div className="w-full overflow-x-auto rounded-xl border border-slate-200/80 -webkit-overflow-scrolling-touch">
       <table className="w-full text-left border-collapse min-w-[720px]">
         ...
       </table>
     </div>
     ```
  2. Provide a minimum readable table width (`min-w-[640px]` to `min-w-[800px]`) so text does not wrap awkwardly.
  3. Ensure headers, badges, and action buttons maintain adequate internal padding (`px-4 py-3 sm:px-6 sm:py-4`).

### Rule 3.4: Modals, Popovers & Dialogs
1. **Backdrop & Z-Index**: All application modals must render with `z-50` or higher, above splash screens (`z-40`) and sidebars (`z-30`).
2. **Width & Margin Constraints**:
   ```jsx
   <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
     <div className="w-full max-w-lg max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
       {/* Modal Header */}
       <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">...</div>
       {/* Scrollable Body */}
       <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">...</div>
       {/* Modal Footer */}
       <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">...</div>
     </div>
   </div>
   ```
3. Always include both `Escape` keyboard handling and a clear `✕` close button.

### Rule 3.5: Form Inputs & Touch Usability
1. **Font Size**: All `<input>`, `<select>`, and `<textarea>` elements must have at least `text-base` (16px) or `text-sm sm:text-base` to stop iOS WebKit from automatically zooming into the page on focus.
2. **Numeric Fields**: Number inputs must provide `inputMode="numeric"` or `inputMode="decimal"` to automatically pop up the numeric keypad on mobile devices.
3. **Interactive Heights**: Primary action buttons must have a minimum height of `h-10` (40px) or `h-11` (44px) on mobile viewports.

---

## 4. Single Source of Truth & Mathematical Consistency

Any dashboard aggregating quotes, financial amounts, capacity, or statuses must satisfy the invariant:

$$\text{KPI Count} \equiv \text{Table Total Count} \equiv \sum \text{Status Pill Counts} \equiv \text{Export Record Count}$$

1. Filtering by date range must synchronously recalculate:
   - Total Quoted Proposals
   - Total Capacity Quoted (MW/kW)
   - Total Commercial Quoted Value (₹ Cr / ₹ Lakh)
   - Status Counts (Commissioned, Approved, Pending, Others)
   - Top Performing Dealer Leaderboard
   - CSV Ledger Export Records
2. Quotation rate presets modified in the Super Admin console must immediately propagate to `AppContext` and synchronize with the Dealer Quotation generator.

---

## 5. Automated Verification & Quality Gate

Prior to pushing code to production or merging branches, run the automated Puppeteer audit suite:

```bash
node scripts/test_production_hardening.cjs
```

The automated audit asserts:
1. **Zero Viewport Overflows**: Inspects `document.documentElement.scrollWidth <= window.innerWidth` across all 14 standard viewports.
2. **Element Out-of-Bounds Detection**: Checks that no child elements bleed past the horizontal viewport boundary.
3. **Zero Console Errors / Warnings**: Captures and validates clean console output with zero unhandled exceptions.
4. **Data Contract Compliance**: Validates KPI math, filter array counts, persistent notifications, and real version metadata.

---

## 6. Permanent Production Reliability & Architecture Standards

From this point onward, every new feature, page, component, modal, form, table, API integration, dashboard, quotation workflow, notification, or design change MUST preserve the application's production responsiveness and reliability standards automatically.

### Rule 6.1: Zero-FOUC Boot Sequence & Font Protection
1. Root containers (`#root`) must provide an inline branded shell so no raw HTML, unstyled text, or layout jumps occur during initial script download.
2. Material Symbols icon ligatures must be hidden (`letter-spacing: -9999px` or `color: transparent`) until `document.fonts.ready` confirms the font is loaded, preventing words like `calendar_month` from flashing.

### Rule 6.2: Mandatory Skeleton Loaders
Never display empty white boxes or jarring layout shifts while data is loading. Every async data view must render a matching skeleton component (`KpiCardSkeleton`, `TableSkeleton`, `FormSkeleton`, `LeaderboardSkeleton`).

### Rule 6.3: Form Submission State Machine
Every form and primary action button must implement explicit states:
`IDLE` → `LOADING` (disabled + loading spinner) → `SUCCESS` (toast feedback) → `ERROR` (actionable guidance).
- Accidental double-clicks and duplicate API submissions must be blocked (`disabled={isSubmitting}`).
- Unsaved user input must be preserved on network failure.

### Rule 6.4: Offline & Low-Network Resilience
1. Listen to `online` and `offline` events globally (`NetworkStatusBanner`).
2. Provide clear offline indication without blocking local cached proposals or operations.
3. Show confirmation when connectivity is restored.

### Rule 6.5: Role-Partitioned Persistent Notifications
1. Notifications must be partitioned by role (`audience: 'admin' | 'dealer' | 'all'`). Dealers must never receive admin operational alerts, and admins must never receive dealer-scoped draft alerts.
2. Read state must be persisted immediately (`localStorage.setItem('sunvine_read_notifs_${role}', ...)`). Refreshing the page must NEVER revert a read notification to unread or regenerate duplicate notifications.
3. Popup dismissals must persist across sessions (`sunvine_dismissed_popups_${role}`).

### Rule 6.6: Single-Source Semantic Versioning
1. The authoritative version must reside in `src/config/version.js` (`APP_VERSION`), strictly following `MAJOR.MINOR.PATCH`.
2. All UI components (Update modal, profile header, footers, package.json) must consume this single source.
3. Changelog entries must only contain verified features, improvements, and fixes derived from actual Git commits. Never fabricate release history or use simulated timer loops for progress indicators.

### Rule 6.7: Error Boundaries & Containment
All top-level views must be wrapped in `ErrorBoundary` to prevent unhandled React exceptions from crashing the application into a blank screen. Fallback screens must provide "Reload Application" and "Return to Dashboard" recovery actions.

### Rule 6.8: Zero Fake Data Policy
Never fabricate dummy statistics, fake progress bars, simulated logs, or fake backend states. All telemetry must reflect verified system state.
