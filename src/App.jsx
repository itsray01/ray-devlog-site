import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { SfxProvider } from './components/theories';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.jsx'));
const Process = lazy(() => import('./pages/Process.jsx'));
const Research = lazy(() => import('./pages/Research.jsx'));
const Timeline = lazy(() => import('./pages/Timeline.jsx'));
const Diary = lazy(() => import('./pages/Diary.jsx'));

// Loading fallback component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    color: 'var(--muted)'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        border: '6px solid rgba(138, 43, 226, 0.2)',
        borderTop: '6px solid #8a2be2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '2rem'
      }} />
      <p style={{ fontSize: '1.3rem' }}>Loading...</p>
    </div>
  </div>
);

/**
 * Main App component with routing
 * Sets up routes for all pages with the sidebar layout
 * Uses lazy loading for better performance and code splitting
 */
const App = () => {
  // Preload common routes after first paint (keeps initial load lean, makes nav feel instant).
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preload = () => {
      import('./pages/Process.jsx');
      import('./pages/Research.jsx');
      import('./pages/Diary.jsx');
    };

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(id);
    }

    const t = window.setTimeout(preload, 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <SfxProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={(
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            )}
          />
          <Route
            path="process"
            element={(
              <Suspense fallback={<PageLoader />}>
                <Process />
              </Suspense>
            )}
          />
          <Route
            path="research"
            element={(
              <Suspense fallback={<PageLoader />}>
                <Research />
              </Suspense>
            )}
          />
          <Route
            path="timeline"
            element={(
              <Suspense fallback={<PageLoader />}>
                <Timeline />
              </Suspense>
            )}
          />
          <Route
            path="diary"
            element={(
              <Suspense fallback={<PageLoader />}>
                <Diary />
              </Suspense>
            )}
          />
          {/* Redirects from old routes */}
          <Route path="my-journey" element={<Navigate to="/process" replace />} />
          <Route path="theories" element={<Navigate to="/research" replace />} />
          <Route path="assets" element={<Navigate to="/process" replace />} />
          <Route path="about" element={<Navigate to="/timeline" replace />} />
          <Route path="journal" element={<Navigate to="/diary" replace />} />
          <Route path="extras" element={<Navigate to="/process" replace />} />
        </Route>
      </Routes>
    </Router>
    </SfxProvider>
  );
};

export default App;
