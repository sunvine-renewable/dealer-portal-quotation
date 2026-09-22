// Authoritative Single Source of Truth for Sunvine EPC Portal Versioning
// Strictly semantic versioning (MAJOR.MINOR.PATCH)

export const APP_VERSION = '2.0.0';
export const RELEASE_DATE = 'September 2026';
export const RELEASE_TYPE = 'MAJOR'; // 'MAJOR' | 'MINOR' | 'PATCH'

// Verified changelog items derived from real repository Git history
export const CURRENT_RELEASE_CHANGELOG = {
  version: 'v2.0.0',
  title: 'Super Admin Portal & National Operations Overview',
  date: 'September 2026',
  type: 'MAJOR',
  highlights: [
    'Super Admin National Operations Overview with real-time Gujarat solar telemetry',
    'Calibrated dataset of 1,480 Gujarat proposals and 550 verified EPC dealers',
    'Structured 21-column CSV financial ledger export with full BOM metadata',
    'Interactive date range filtering with FY 2025-26 and Q3/Q4 presets',
    'Cross-module quotation presets synchronization between Super Admin and Dealer Portal'
  ],
  categories: {
    features: [
      'Super Admin National Operations Overview with real-time Gujarat solar telemetry',
      'Calibrated dataset of 1,480 Gujarat proposals and 550 verified EPC dealers',
      'Structured 21-column CSV financial ledger export with full BOM metadata',
      'Interactive date range filtering with FY 2025-26 and Q3/Q4 presets',
      'Cross-module quotation presets synchronization between Super Admin and Dealer Portal'
    ],
    improvements: [
      'Zero-FOUC branded application boot shell with font ligature flash protection',
      'Role-segregated persistent notification architecture (Super Admin vs Dealer isolation)',
      'Offline network status detection and graceful connectivity restoration banner',
      'Comprehensive 14-viewport responsive hardening and zero-overflow enforcement'
    ],
    fixes: [
      'Eliminated duplicate notification bug where read alerts reappeared upon page refresh',
      'Fixed popup banner dismissing so closed alerts stay dismissed across sessions',
      'Removed outdated CAD Single Line Diagram (SLD) option from quotation flow',
      'Resolved single-page PDF cover print page-break issues'
    ]
  }
};

// Complete historical release register verified from Git log
export const VERSION_HISTORY = [
  {
    version: 'v2.0.0',
    date: '2026-09-22',
    type: 'MAJOR',
    summary: 'Super Admin National Operations Overview, calibrated Gujarat ledger, CSV export, and presets sync.',
    highlights: [
      'Super Admin National Operations Overview',
      '1,480 calibrated Gujarat quotations & 550 dealers',
      'Real CSV financial ledger export',
      'Cross-portal pricing & margin presets sync'
    ]
  },
  {
    version: 'v1.4.0',
    date: '2026-09-21',
    type: 'MINOR',
    summary: 'Gujarat 550 dealers database integration and PDF BOS price matrix.',
    highlights: [
      '100% Gujarat solar dealer directory across 30 cities',
      'Official BOS pricing matrix and technical BOM specifications from PDF',
      'Initial responsive layout hardening'
    ]
  },
  {
    version: 'v1.3.0',
    date: '2026-09-20',
    type: 'MINOR',
    summary: 'PWA native auto-update, Navigation bar with role-based menus, and notification panel.',
    highlights: [
      'Native in-app PWA update modal',
      'Unified desktop and mobile navigation header',
      'Initial notification drawer'
    ]
  },
  {
    version: 'v1.2.0',
    date: '2026-09-18',
    type: 'PATCH',
    summary: 'Dealer Dashboard telemetry metrics and official Sunvine support helpline.',
    highlights: [
      'Dealer Dashboard KPI cards and pipeline tracking',
      'Official support helpline (+91 80000 50580) integration',
      'Customer WhatsApp proposal sharing'
    ]
  },
  {
    version: 'v1.1.0',
    date: '2026-09-16',
    type: 'MINOR',
    summary: '4-Page Customer Proposal PDF engine and quotation editing.',
    highlights: [
      '4-Page client proposal PDF generation',
      'DISCOM grid-tie documentation and statutory compliance',
      'Direct quote edit and recalculation pipeline'
    ]
  },
  {
    version: 'v1.0.0',
    date: '2026-09-10',
    type: 'MAJOR',
    summary: 'Initial release of Sunvine Solar EPC Dealer Portal.',
    highlights: [
      'Dealer authentication and dashboard',
      'Basic quotation calculator',
      'PM Surya Ghar DBT subsidy estimator'
    ]
  }
];
