import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0', // Listen on all interfaces (IPv4 + IPv6)
    port: 3000,
    open: true
  },
  build: {
    // Use more compatible target for production
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console.logs for debugging
        drop_debugger: true
      }
    },
    sourcemap: false,
    // Enable gzip compression
    reportCompressedSize: true,
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks
          if (id.includes('node_modules')) {
            // Keep React core together
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'react-router-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('chart.js') || id.includes('recharts')) {
              return 'chart-vendor';
            }
            // Other node_modules
            return 'vendor';
          }
          // Split large pages into separate chunks
          if (id.includes('pages/Home')) {
            return 'home-page';
          }
        }
      }
    },
    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
})
