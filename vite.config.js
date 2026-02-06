import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
    proxy: {
      '/catalog': {
        target: 'https://epanelapi.wmbyazilim.com',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'https://epanelapi.wmbyazilim.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
