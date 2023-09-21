/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: "./src/test/setup.ts",
    css: true,
    globals: true,
    coverage: {
      provider: 'istanbul',
      enabled: true,
      reporter: ['html'] 
    },
  },
})
