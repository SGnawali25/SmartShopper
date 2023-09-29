import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': 'https://smartshopperapi.sandeshgnawali.com.np'
    }
  }
})

// https://smartshopperapi.vercel.app

//http://localhost:4000

//https://smartshopperapi.sandeshgnawali.com.np