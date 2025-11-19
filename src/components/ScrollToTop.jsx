import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Scrolls to top of page whenever route changes
 * Also handles initial page load to prevent browser scroll restoration
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  // Also scroll to top on initial mount
  useEffect(() => {
    // Disable browser scroll restoration on mount
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Ensure we're at the top on initial load
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTop;

