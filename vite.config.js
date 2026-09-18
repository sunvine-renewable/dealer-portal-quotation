import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'sunvine_logo_transparent.png', 'sunvine_logo_white.png'],
      manifest: {
        name: 'Sunvine Solar EPC Portal',
        short_name: 'Sunvine Solar',
        description: 'Sunvine Renewable Energy - Solar EPC Dealer & Admin Quotation Portal',
        theme_color: '#0F1B2E',
        background_color: '#0F1B2E',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        icons: [
          {
            src: '/sunvine_logo_transparent.png',
            sizes: '250x54',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/sunvine_logo_transparent.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
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
