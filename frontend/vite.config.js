// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/

/**
 * @type {import('vite-plugin-pwa').VitePWAOptions}
 */
const pwaOptions = {
  registerType: 'autoUpdate',
  manifest: {
    name: 'Sailor Moon',
    start_url: '/',
    scope: '/',
    short_name: 'ShravsApp',
    description: 'Track lunar phases and play a moon-themed game!',
    theme_color: "#0D0E26",
    background_color: "#1B1F3B",
    icons: [
      {
        src: 'home-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'splash-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    display: "standalone"
  },
  workbox: {
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    globPatterns: ['**/*.{js,css,html,png,svg}'],
  }
};


export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],})
