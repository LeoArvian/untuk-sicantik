import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Request kamu: Jalan di localhost:3000
    host: true, // Biar bisa diakses dari HP via IP Network (opsional tapi berguna)
  }
})