import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows access from the local network
    port: 5173, // Optional: specify port (default is 5173)
  },
})
