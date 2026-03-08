import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Necesitas importar esto

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})