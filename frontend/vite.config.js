import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': 'https://smartshopperapi.vercel.app/'
    }
  }
})

// https://smartshopperapi.vercel.app

//http://localhost:4000