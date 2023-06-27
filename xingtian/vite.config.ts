import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacy from '@vitejs/plugin-legacy';
import commonjs from '@rollup/plugin-commonjs';
// import path from 'path';
export default defineConfig({
  plugins: [
    commonjs(),
    reactRefresh(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
  ],
  server: {
    port: 3001,
    hmr: { overlay: false }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  }
})
