import React from 'react';

// Reusable Base Shimmer Block
export function Shimmer({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-surface-container-high/60 rounded-lg ${className}`}
      aria-hidden="true"
    />
  );
}

// KPI Metric Cards Skeleton (Matches Admin & Dealer top metric grids)
export function KpiCardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`kpi-skel-${i}`}
          className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-5 shadow-sm flex flex-col justify-between min-h-[140px]"
        >
          <div>
            <div className="flex items-center justify-between">
              <Shimmer className="h-4 w-32" />
              <Shimmer className="w-8 h-8 rounded-lg" />
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <Shimmer className="h-8 w-24" />
              <Shimmer className="h-4 w-20" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between">
            <Shimmer className="h-3 w-28" />
            <Shimmer className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Data Table Skeleton (Matches Quotation Feeds, Dealer Lists, Hardware Catalogs)
export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-surface-container-highest bg-surface-container-lowest">
      <div className="p-4 border-b border-surface-container-highest flex items-center justify-between gap-4">
        <Shimmer className="h-6 w-48" />
        <Shimmer className="h-8 w-64 rounded-lg" />
      </div>
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-surface-container-highest bg-surface-container-low/40">
            {Array.from({ length: cols }).map((_, c) => (
              <th key={`th-${c}`} className="p-4">
                <Shimmer className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-highest">
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={`tr-${r}`} className="p-4">
              {Array.from({ length: cols }).map((_, c) => (
                <td key={`td-${r}-${c}`} className="p-4">
                  <Shimmer className={`h-4 ${c === 0 ? 'w-28' : c === 1 ? 'w-36' : 'w-20'}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-surface-container-highest flex items-center justify-between">
        <Shimmer className="h-4 w-36" />
        <div className="flex gap-2">
          <Shimmer className="h-8 w-8 rounded-lg" />
          <Shimmer className="h-8 w-8 rounded-lg" />
          <Shimmer className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Form Skeleton (Matches CreateQuotation stepper, settings forms, profile editors)
export function FormSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-highest p-6 space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2 border-b border-surface-container-highest pb-4">
        <Shimmer className="h-6 w-48" />
        <Shimmer className="h-4 w-80" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`field-${i}`} className="space-y-2">
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-surface-container-highest flex justify-end gap-3">
        <Shimmer className="h-11 w-28 rounded-xl" />
        <Shimmer className="h-11 w-36 rounded-xl" />
      </div>
    </div>
  );
}

// Top Performing Dealers / Leaderboard Widget Skeleton
export function LeaderboardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Shimmer className="h-5 w-40" />
          <Shimmer className="h-3 w-28" />
        </div>
        <Shimmer className="w-7 h-7 rounded-full" />
      </div>
      <div className="divide-y divide-surface-container-highest">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`lead-${i}`} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shimmer className="w-6 h-6 rounded-full" />
              <div className="space-y-1.5">
                <Shimmer className="h-4 w-32" />
                <Shimmer className="h-3 w-24" />
              </div>
            </div>
            <div className="space-y-1 text-right">
              <Shimmer className="h-4 w-16 ml-auto" />
              <Shimmer className="h-3 w-12 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
