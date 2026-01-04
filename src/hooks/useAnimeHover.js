/**
 * useAnimeHover Hook
 * Adds tasteful hover micro-interactions using Anime.js
 * Respects prefers-reduced-motion
 */
import { useEffect, useRef } from 'react';
import { cardHoverIn, cardHoverOut, prefersReducedMotion } from '../utils/animeConfig';

/**
 * Hook to add anime.js hover effects to elements
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.selector - CSS selector for elements to animate (default: '.card, .grid-tile, .feature-card')
 * @param {boolean} options.enabled - Whether effects are enabled (default: true)
 * @param {boolean} options.addFocusEffect - Also trigger on keyboard focus (default: true)
 * 
 * @returns {Function} ref - Callback ref to attach to container element
 * 
 * Usage:
 * const hoverRef = useAnimeHover();
 * return <div ref={hoverRef}><div className="card">...</div></div>
 */
const useAnimeHover = (options = {}) => {
  const {
    selector = '.card, .grid-tile, .feature-card, .filmstrip-frame__figure',
    enabled = true,
    addFocusEffect = true,
  } = options;

  const containerRef = useRef(null);
  const animatingElements = useRef(new WeakSet());

  useEffect(() => {
    // Don't set up if disabled or reduced motion preferred
    if (!enabled || prefersReducedMotion() || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const elements = container.querySelectorAll(selector);

    // Handler functions
    const handleMouseEnter = (e) => {
      const element = e.currentTarget;
      if (animatingElements.current.has(element)) return;
      
      animatingElements.current.add(element);
      cardHoverIn(element);
    };

    const handleMouseLeave = (e) => {
      const element = e.currentTarget;
      cardHoverOut(element);
      animatingElements.current.delete(element);
    };

    const handleFocus = (e) => {
      if (!addFocusEffect) return;
      handleMouseEnter(e);
    };

    const handleBlur = (e) => {
      if (!addFocusEffect) return;
      handleMouseLeave(e);
    };

    // Add event listeners to all matching elements
    elements.forEach((element) => {
      // Only add if element is interactive or has cursor: pointer
      const style = window.getComputedStyle(element);
      const isInteractive = style.cursor === 'pointer' || 
                           element.tagName === 'A' || 
                           element.tagName === 'BUTTON' ||
                           element.hasAttribute('tabindex');

      if (isInteractive || element.classList.contains('card')) {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        
        if (addFocusEffect) {
          element.addEventListener('focus', handleFocus);
          element.addEventListener('blur', handleBlur);
        }
        
        // Add class for CSS enhancements
        element.classList.add('anime-hover');
      }
    });

    // Cleanup
    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('focus', handleFocus);
        element.removeEventListener('blur', handleBlur);
        element.classList.remove('anime-hover');
      });
      animatingElements.current = new WeakSet();
    };
  }, [enabled, selector, addFocusEffect]);

  // Return callback ref to attach to container
  const callbackRef = (element) => {
    if (element) {
      containerRef.current = element;
    }
  };

  return callbackRef;
};

export default useAnimeHover;





