import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const MyJourney = lazy(() => import('./pages/MyJourney'));
const Theories = lazy(() => import('./pages/Theories'));
const Assets = lazy(() => import('./pages/Assets'));
const About = lazy(() => import('./pages/About'));
const Extras = lazy(() => import('./pages/Extras'));

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
      // Most common next navigations
      import('./pages/MyJourney');
      import('./pages/Theories');
      import('./pages/Assets');
    };

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(id);
    }

    const t = window.setTimeout(preload, 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
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
            path="my-journey"
            element={(
              <Suspense fallback={<PageLoader />}>
                <MyJourney />
              </Suspense>
            )}
          />
          <Route
            path="theories"
            element={(
              <Suspense fallback={<PageLoader />}>
                <Theories />
              </Suspense>
            )}
          />
          <Route
            path="assets"
            element={(
              <Suspense fallback={<PageLoader />}>
                <Assets />
              </Suspense>
            )}
          />
          <Route
            path="about"
            element={(
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            )}
          />
          <Route
            path="extras"
            element={(
              <Suspense fallback={<PageLoader />}>
                <Extras />
              </Suspense>
            )}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
