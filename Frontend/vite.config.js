import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,  // Use Render's provided port or fall back to 3000
    host: true,                      // Expose the server to external connections
  }
})
