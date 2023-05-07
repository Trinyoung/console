import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import styleImport, {AntResolve} from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    styleImport({
      resolves: [AntResolve()]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
})
