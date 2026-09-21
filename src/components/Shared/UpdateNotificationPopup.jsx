import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function UpdateNotificationPopup() {
  const {
    notifications,
    markNotificationAsRead,
    setActiveTab,
    dismissedPopupIds,
    dismissPopupNotification
  } = useApp();

  const [visible, setVisible] = useState(false);
  const [sessionDismissed, setSessionDismissed] = useState(false);

  // Focus popup on the latest announcement/notification
  const latestUnread = notifications && notifications.length > 0 ? notifications[0] : null;
  const isEligible = Boolean(
    latestUnread &&
    !latestUnread.read &&
    !dismissedPopupIds?.includes(latestUnread.id) &&
    !sessionDismissed
  );

  useEffect(() => {
    setVisible(isEligible);
  }, [isEligible]);

  if (!visible || !latestUnread) return null;

  const handleClose = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (latestUnread) {
      dismissPopupNotification(latestUnread.id);
    }
    setSessionDismissed(true);
    setVisible(false);
  };

  const handleAction = () => {
    if (latestUnread) {
      markNotificationAsRead(latestUnread.id);
      dismissPopupNotification(latestUnread.id);
      setSessionDismissed(true);
      setVisible(false);
      if (latestUnread.targetTab) {
        setActiveTab(latestUnread.targetTab);
      }
    }
  };

  const getIconInfo = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: 'check_circle',
          badgeBg: 'bg-emerald-500/15',
          textClass: 'text-emerald-700 dark:text-emerald-400',
          borderClass: 'border-emerald-500/30'
        };
      case 'warning':
        return {
          icon: 'shield',
          badgeBg: 'bg-amber-500/15',
          textClass: 'text-amber-700 dark:text-amber-400',
          borderClass: 'border-amber-500/30'
        };
      case 'alert':
        return {
          icon: 'notifications_active',
          badgeBg: 'bg-rose-500/15',
          textClass: 'text-rose-700 dark:text-rose-400',
          borderClass: 'border-rose-500/30'
        };
      case 'info':
      default:
        return {
          icon: 'bolt',
          badgeBg: 'bg-sky-500/15',
          textClass: 'text-sky-700 dark:text-sky-400',
          borderClass: 'border-sky-500/30'
        };
    }
  };

  const style = getIconInfo(latestUnread.type);

  return (
    <div
      role="alert"
      aria-live="polite"
      className="no-print fixed top-20 right-4 sm:right-6 z-[60] max-w-sm sm:max-w-md w-[calc(100vw-2rem)] bg-surface-container-lowest/98 backdrop-blur-xl border border-primary/25 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] p-4 animate-in slide-in-from-top-4 duration-300 select-none"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Pulsing Alert Icon */}
        <div className={`w-10 h-10 rounded-xl ${style.badgeBg} ${style.textClass} flex items-center justify-center shrink-0 border ${style.borderClass} shadow-xs`}>
          <span className="material-symbols-outlined text-[22px]">
            {latestUnread.icon || style.icon}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              New System Update
            </span>
            <span className="text-[11px] text-secondary font-medium">
              {latestUnread.timestamp || 'Just now'}
            </span>
          </div>

          <h4 className="font-headline-sm text-sm font-bold text-on-surface leading-snug line-clamp-2">
            {latestUnread.title}
          </h4>
          <p className="text-xs text-secondary mt-1 line-clamp-2 leading-relaxed">
            {latestUnread.description}
          </p>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-surface-container-high/60">
            <button
              type="button"
              onClick={handleAction}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary text-surface-container-lowest font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <span>View Update</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-secondary hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Dismiss update popup"
          className="w-7 h-7 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container-high flex items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
