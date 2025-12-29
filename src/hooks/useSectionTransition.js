import { useEffect, useRef, useCallback } from 'react';

/**
 * Configuration
 */
const CONFIG = {
  debounceMs: 150,  // Debounce to prevent rapid fire on tiny scrolls
};

/**
 * useSectionTransition - Detects section changes and triggers screen-space transition
 * 
 * @param {string} activeSectionId - Currently active section ID from scroll spy
 * @param {React.RefObject} transitionRef - Ref to TransitionWebGL component
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether transitions are enabled
 * @returns {Object} { previousSectionId }
 */
const useSectionTransition = (activeSectionId, transitionRef, options = {}) => {
  const { enabled = true } = options;
  
  const previousSectionIdRef = useRef(null);
  const previousScrollYRef = useRef(0);
  const debounceTimerRef = useRef(null);
  const lastTransitionTimeRef = useRef(0);

  // Determine scroll direction
  const getScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > previousScrollYRef.current ? 1 : -1;
    previousScrollYRef.current = currentScrollY;
    return direction;
  }, []);

  // Handle section change
  useEffect(() => {
    // Skip if not enabled or no transition ref
    if (!enabled || !transitionRef?.current) return;
    
    // Skip initial mount (no previous section)
    if (previousSectionIdRef.current === null) {
      previousSectionIdRef.current = activeSectionId;
      previousScrollYRef.current = window.scrollY;
      return;
    }
    
    // Skip if section hasn't changed
    if (activeSectionId === previousSectionIdRef.current) return;
    
    // Clear any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Debounce to prevent rapid transitions
    debounceTimerRef.current = setTimeout(() => {
      const now = Date.now();
      
      // Prevent too-rapid transitions (min 400ms apart)
      if (now - lastTransitionTimeRef.current < 400) {
        previousSectionIdRef.current = activeSectionId;
        return;
      }
      
      // Get scroll direction
      const direction = getScrollDirection();
      
      // Trigger transition
      transitionRef.current?.play({ direction });
      
      // Update refs
      lastTransitionTimeRef.current = now;
      previousSectionIdRef.current = activeSectionId;
      
    }, CONFIG.debounceMs);
    
    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [activeSectionId, transitionRef, enabled, getScrollDirection]);

  // Track scroll position continuously
  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        previousScrollYRef.current = window.scrollY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    previousSectionId: previousSectionIdRef.current
  };
};

export default useSectionTransition;

/**
 * USAGE:
 * 
 * const transitionRef = useRef(null);
 * const { activeSectionId } = useNavigation();
 * 
 * useSectionTransition(activeSectionId, transitionRef, {
 *   enabled: true // set to false to disable transitions
 * });
 * 
 * return (
 *   <>
 *     <TransitionWebGL ref={transitionRef} />
 *     {children}
 *   </>
 * );
 */





