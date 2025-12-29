import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

// Disable browser scroll restoration to prevent auto-scrolling on page load
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Ensure page starts at top on initial load
window.scrollTo(0, 0);

// Dev-only perf metrics (LCP/CLS/INP) in console for quick triage.
if (import.meta.env.DEV) {
  import('./utils/webVitals.js')
    .then(({ initWebVitals }) => initWebVitals())
    .catch(() => {});
}

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  )
} catch (error) {
  console.error('Failed to mount React app:', error);
}
