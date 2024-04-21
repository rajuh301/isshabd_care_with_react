import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Output directory for the build
    assetsDir: 'assets',  // Directory for static assets
    rollupOptions: {
      input: {
        main: './src/main.jsx'  // Entry point for your React app
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {}
  }
});
