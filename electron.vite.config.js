import { defineConfig, splitVendorChunkPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const serverUrl = `http://127.0.0.1`;

export default defineConfig({
  publicDir: false,
  main: {},
  preload: {},
  renderer: {
    plugins: [react(), svgr(), splitVendorChunkPlugin()],
  },
  server: {
    proxy: {
      '/graphql': serverUrl,
      '/login': serverUrl,
      '/logout': serverUrl,
      '/auth': serverUrl,
    },
  },
});
