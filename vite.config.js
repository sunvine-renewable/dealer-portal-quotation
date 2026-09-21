import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024
      },
      includeAssets: ['favicon.ico', 'sunvine_logo_transparent.png', 'sunvine_logo_white.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Sunvine Solar EPC Dealer Portal',
        short_name: 'Sunvine EPC',
        description: 'Sunvine Renewable Energy - Solar EPC Dealer & Admin Quotation Portal',
        theme_color: '#0F1B2E',
        background_color: '#0F1B2E',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        id: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    host: true
  }
});
