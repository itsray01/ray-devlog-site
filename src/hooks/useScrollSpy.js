import { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook for scroll-spy functionality
 * Uses IntersectionObserver to track which section is currently in view
 * 
 * @param {Array} sectionIds - Array of section IDs to observe
 * @param {Object} options - Configuration options
 * @param {number} options.rootMargin - IntersectionObserver root margin (default: '-20% 0px -60% 0px')
 * @param {number} options.threshold - IntersectionObserver threshold (default: 0)
 * @returns {Object} { activeSectionId, scrollToSection }
 */
const useScrollSpy = (sectionIds = [], options = {}) => {
  const [activeSectionId, setActiveSectionId] = useState('');
  const observerRef = useRef(null);
  
  const {
    rootMargin = '-20% 0px -60% 0px',
    threshold = 0
  } = options;

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Scroll to a section by ID
  const scrollToSection = useCallback((id) => {
    if (!id) return;

    const element = document.getElementById(id);
    if (!element) {
      console.warn('[useScrollSpy] No element found with id:', id);
      return;
    }

    // Update URL hash without triggering scroll
    const { pathname, search } = window.location;
    const newUrl = `${pathname}${search}#${id}`;
    window.history.replaceState(null, '', newUrl);

    // Scroll to element - scroll-margin-top handles the offset
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
      block: 'start'
    });

    // Update active section immediately for responsive UI
    setActiveSectionId(id);

    // Refresh ScrollTrigger and progress animations after scrolling
    // Use a small delay to allow scroll to complete
    setTimeout(() => {
      ScrollTrigger.refresh();

      // Get all ScrollTriggers and check if they should be active
      ScrollTrigger.getAll().forEach(trigger => {
        // If the trigger's element is now in view but animation hasn't played,
        // force it to progress to completion
        if (trigger.isActive && trigger.animation) {
          trigger.animation.progress(1);
        }
      });

      console.log('[useScrollSpy] ScrollTrigger refreshed and animations progressed for:', id);
    }, prefersReducedMotion ? 50 : 500);
  }, [prefersReducedMotion]);

  // Set up IntersectionObserver
  useEffect(() => {
    if (sectionIds.length === 0) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        
        if (intersectingEntry) {
          setActiveSectionId(intersectingEntry.target.id);
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    // Handle initial hash on page load
    const initialHash = window.location.hash?.slice(1);
    if (initialHash && sectionIds.includes(initialHash)) {
      // Wait for content to render before scrolling
      const timer = setTimeout(() => {
        scrollToSection(initialHash);
      }, 100);
      return () => {
        clearTimeout(timer);
        observerRef.current?.disconnect();
      };
    }

    // Cleanup
    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, rootMargin, threshold, scrollToSection]);

  // Handle hash changes (if user edits URL manually)
  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash?.slice(1);
      if (id && sectionIds.includes(id)) {
        scrollToSection(id);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sectionIds, scrollToSection]);

  return {
    activeSectionId,
    scrollToSection,
    setActiveSectionId
  };
};

export default useScrollSpy;
