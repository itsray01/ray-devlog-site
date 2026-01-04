/**
 * PageLoadAnimation - Runs once when page content first appears (after intro)
 * Animates nav items, page title, and initial content
 * Uses session storage to prevent re-running on navigation
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import { pageLoadTimeline, prefersReducedMotion } from '../utils/animeConfig';

// Note: pageLoadTimeline is imported from animeConfig which handles anime.js imports correctly

/**
 * Hook to run page load animation once per session
 * Triggers when content becomes visible (intro phase is 'docked')
 */
const usePageLoadAnimation = () => {
  const location = useLocation();
  const { introPhase } = useNavigation();
  const hasAnimated = useRef(false);
  const SESSION_KEY = 'devlog_page_load_animated';

  useEffect(() => {
    // Only run once per session and only after intro completes
    if (hasAnimated.current || introPhase !== 'docked') return;
    
    // Check if already animated this session
    if (typeof window !== 'undefined') {
      const alreadyAnimated = sessionStorage.getItem(SESSION_KEY);
      if (alreadyAnimated) {
        hasAnimated.current = true;
        return;
      }
    }
    
    // Skip if reduced motion
    if (prefersReducedMotion()) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, 'true');
      }
      hasAnimated.current = true;
      return;
    }

    // Wait for elements to be available
    const timer = setTimeout(() => {
      try {
        // Select elements to animate
        const navItems = document.querySelectorAll('.top-nav-link');
        const title = document.querySelector('.page-header h1');
        const subtitle = document.querySelector('.page-subtitle');
        const mainContent = document.querySelector('.page-container');

        // Run animation if elements exist
        if (title || navItems.length > 0) {
          pageLoadTimeline({
            navItems: Array.from(navItems),
            title,
            subtitle,
            // Don't animate main content - let scroll reveal handle it
          });

          // Mark as animated
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(SESSION_KEY, 'true');
          }
          hasAnimated.current = true;
        }
      } catch (error) {
        console.warn('[PageLoadAnimation] Timeline failed, elements remain visible:', error);
        
        // Ensure all elements are visible on error
        const navItems = document.querySelectorAll('.top-nav-link');
        const title = document.querySelector('.page-header h1');
        const subtitle = document.querySelector('.page-subtitle');
        
        navItems.forEach(item => {
          item.style.opacity = '1';
          item.style.transform = 'none';
        });
        
        if (title) {
          title.style.opacity = '1';
          title.style.transform = 'none';
        }
        
        if (subtitle) {
          subtitle.style.opacity = '1';
          subtitle.style.transform = 'none';
        }
      }
    }, 100); // Small delay to ensure elements are rendered

    return () => clearTimeout(timer);
  }, [introPhase, location.pathname]);
};

/**
 * PageLoadAnimation Component
 * Add this to your layout/page to enable page load animations
 */
const PageLoadAnimation = () => {
  usePageLoadAnimation();
  return null; // This component doesn't render anything
};

export default PageLoadAnimation;
export { usePageLoadAnimation };





