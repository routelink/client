import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    cesium({
      rebuildCesium: true,
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    proxy: {
      // target временное решение
      // требуется для проксирования запросов на сервер
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup-test.js',
  },
});
