import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use automatic JSX runtime
      jsxRuntime: 'automatic',
      // Ensure React is available
      jsxImportSource: 'react'
    })
  ],
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
      },
      format: {
        comments: false
      }
    },
    sourcemap: false,
    // Enable gzip compression
    reportCompressedSize: true,
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks - be more specific with paths
          if (id.includes('node_modules')) {
            // CRITICAL: Keep React and ReactDOM together in one chunk
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'react-core';
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
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            // Other node_modules
            return 'vendor';
          }
        }
      }
    },
    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies - ensure React is pre-bundled
  optimizeDeps: {
    include: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime', 
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'framer-motion'
    ],
    esbuildOptions: {
      target: 'es2015'
    }
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})
