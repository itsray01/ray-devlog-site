import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const TimelinePage = lazy(() => import('./pages/Timeline'));
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
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(138, 43, 226, 0.2)',
        borderTop: '4px solid #8a2be2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }} />
      <p>Loading...</p>
    </div>
  </div>
);

/**
 * Main App component with routing
 * Sets up routes for all pages with the sidebar layout
 * Uses lazy loading for better performance and code splitting
 */
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="assets" element={<Assets />} />
            <Route path="about" element={<About />} />
            <Route path="extras" element={<Extras />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
