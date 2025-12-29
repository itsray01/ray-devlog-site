import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze'
  const outDir = isAnalyze ? 'dist-analyze' : 'dist'

  return {
    plugins: [
      react(),
      ...(isAnalyze
        ? [
            visualizer({
              filename: `${outDir}/bundle-report.html`,
              gzipSize: true,
              brotliSize: true,
              open: false,
            }),
          ]
        : []),
    ],
    base: '/',
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
    },
    build: {
      outDir,
      // Windows can aggressively lock files in the output dir (Explorer/AV/etc).
      // For analyze builds we prefer a successful report over a clean directory.
      emptyOutDir: !isAnalyze,
      reportCompressedSize: true,
    },
    resolve: {
      // CRITICAL: Dedupe React to prevent multiple instances
      // This ensures all chunks share the same React instance,
      // preventing "Cannot read properties of undefined" errors
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      // Helps avoid Vite prebundle flakiness with ESM-heavy deps like tsParticles.
      include: ['@tsparticles/react', '@tsparticles/engine', '@tsparticles/slim'],
    },
  }
})
