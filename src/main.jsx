import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Disable browser scroll restoration to prevent auto-scrolling on page load
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Ensure page starts at top on initial load
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
