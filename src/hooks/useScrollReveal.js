/**
 * useScrollReveal Hook
 * Automatically animates elements with data-animate attribute when they enter viewport
 * Uses IntersectionObserver for performance
 */
import { useEffect, useRef } from 'react';
import { safeAnimate, REVEAL_VARIANTS, prefersReducedMotion } from '../utils/animeConfig';

/**
 * Hook to enable scroll-reveal animations on a container and its children
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether animations are enabled (default: true)
 * @param {number} options.threshold - Intersection threshold (0-1, default: 0.1)
 * @param {string} options.rootMargin - Root margin for intersection (default: '0px 0px -100px 0px')
 * @param {boolean} options.once - Trigger animation only once (default: true)
 * 
 * @returns {Function} ref - Callback ref to attach to container element
 * 
 * Usage:
 * const revealRef = useScrollReveal();
 * return <div ref={revealRef}><div data-animate="reveal">Content</div></div>
 */
const useScrollReveal = (options = {}) => {
  const {
    enabled = true,
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    once = true,
  } = options;

  const observerRef = useRef(null);
  const animatedElementsRef = useRef(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    // Don't set up if disabled or animations not supported
    if (!enabled || typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // If reduced motion is preferred, still observe but use instant animations
    const shouldAnimate = !prefersReducedMotion();

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only animate when entering viewport
          if (!entry.isIntersecting) return;

          const element = entry.target;
          
          // Skip if already animated (and once is true)
          if (once && animatedElementsRef.current.has(element)) return;

          // Get animation variant from data-animate attribute
          const variant = element.getAttribute('data-animate') || 'reveal';
          const animConfig = REVEAL_VARIANTS[variant];

          if (!animConfig) {
            console.warn(`[useScrollReveal] Unknown variant: ${variant}`);
            return;
          }

          // Mark as animated
          animatedElementsRef.current.add(element);

          // Apply animation
          if (shouldAnimate) {
            try {
              // Ensure element starts hidden (but briefly)
              element.style.opacity = '0';
              
              // Run animation with error handling
              safeAnimate({
                targets: element,
                ...animConfig,
                complete: () => {
                  // Clean up inline styles after animation
                  element.style.opacity = '';
                  element.style.transform = '';
                },
              });
              
              // Safety timeout: if animation doesn't start within 100ms, reveal element
              setTimeout(() => {
                if (element.style.opacity === '0') {
                  console.warn('[useScrollReveal] Animation timeout, forcing reveal');
                  element.style.opacity = '1';
                  element.style.transform = 'none';
                }
              }, 100);
            } catch (error) {
              // If animation fails, ensure element is visible
              console.warn('[useScrollReveal] Animation failed, revealing element:', error);
              element.style.opacity = '1';
              element.style.transform = 'none';
            }
          } else {
            // Reduced motion: just reveal immediately
            element.style.opacity = '1';
            element.style.transform = 'none';
          }

          // Unobserve if only triggering once
          if (once) {
            observerRef.current.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe all elements with data-animate in the container
    const observeElements = () => {
      if (!containerRef.current || !observerRef.current) return;

      const elements = containerRef.current.querySelectorAll('[data-animate]');
      elements.forEach((element) => {
        // Don't observe if already animated
        if (once && animatedElementsRef.current.has(element)) return;
        
        observerRef.current.observe(element);
      });
    };

    // Initial observation
    if (containerRef.current) {
      observeElements();
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      animatedElementsRef.current.clear();
    };
  }, [enabled, threshold, rootMargin, once]);

  // Return callback ref to attach to container
  const callbackRef = (element) => {
    if (element) {
      containerRef.current = element;
      
      // Re-observe elements when container changes
      if (observerRef.current) {
        const elements = element.querySelectorAll('[data-animate]');
        elements.forEach((el) => {
          if (!once || !animatedElementsRef.current.has(el)) {
            observerRef.current.observe(el);
          }
        });
      }
    }
  };

  return callbackRef;
};

export default useScrollReveal;
