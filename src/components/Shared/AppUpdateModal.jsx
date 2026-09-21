import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { APP_VERSION, RELEASE_DATE, CURRENT_RELEASE_CHANGELOG } from '../../config/version';

export const CURRENT_APP_VERSION = `v${APP_VERSION}`;

export default function AppUpdateModal() {
  const { addNotification } = useApp();

  useEffect(() => {
    // Check if new version installed
    const savedVersion = localStorage.getItem('sunvine_installed_version');

    if (savedVersion && savedVersion !== CURRENT_APP_VERSION) {
      // Auto-update: dispatch changelog to Notification Panel
      if (addNotification) {
        addNotification({
          title: `System Updated to ${CURRENT_APP_VERSION}`,
          description: `${CURRENT_RELEASE_CHANGELOG.title} (${RELEASE_DATE}). Highlights: ${CURRENT_RELEASE_CHANGELOG.highlights.join(' | ')}`,
          type: 'success',
          icon: 'system_update',
          audience: 'all'
        });
      }
      localStorage.setItem('sunvine_installed_version', CURRENT_APP_VERSION);
    } else if (!savedVersion) {
      localStorage.setItem('sunvine_installed_version', CURRENT_APP_VERSION);
    }

    // Auto-update Service Worker in background without blocking modal
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  installingWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              }
            });
          }
        });
      }).catch(() => {});
    }
  }, [addNotification]);

  // Zero blocking modal window
  return null;
}
