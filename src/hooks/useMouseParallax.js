import { useEffect, useRef } from 'react';

/**
 * useMouseParallax - Lightweight mouse parallax for background elements
 *
 * Applies subtle mouse-driven parallax to the Home page nebula layer
 * Uses RAF for smooth 60fps updates without React re-renders
 *
 * @param {Object} options - Configuration
 * @param {number} options.intensity - Parallax strength (default: 0.015)
 * @param {boolean} options.enabled - Enable/disable (default: true)
 * @returns {Function} Ref callback to attach to container element
 */
const useMouseParallax = ({ intensity = 0.015, enabled = true } = {}) => {
  const containerRef = useRef(null);
  const rafIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      container.dataset.parallaxActive = 'false';
      return;
    }

    // Check for touch device (disable parallax on mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      container.dataset.parallaxActive = 'false';
      return;
    }

    container.dataset.parallaxActive = 'true';

    // Smooth lerp function
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Mouse move handler - update target values
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Normalize to -1 to 1 range
      targetRef.current.x = (e.clientX - centerX) / centerX;
      targetRef.current.y = (e.clientY - centerY) / centerY;
    };

    // Mouse leave handler - reset to center
    const handleMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    // RAF animation loop - smooth interpolation
    const animate = () => {
      // Lerp current values towards target
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.05);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.05);

      // Calculate pixel offsets (very subtle)
      const offsetX = currentRef.current.x * intensity * 100; // Max ~1.5px movement
      const offsetY = currentRef.current.y * intensity * 100;

      // Apply transform to ::before pseudo-element via CSS variable
      // Note: We'll use a different approach - apply transform directly to nebula layer
      // For now, we'll apply a subtle transform to the container's ::before via CSS custom property
      container.style.setProperty('--parallax-x', `${offsetX}px`);
      container.style.setProperty('--parallax-y', `${offsetY}px`);

      rafIdRef.current = requestAnimationFrame(animate);
    };

    // Start listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    rafIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [intensity, enabled]);

  // Return ref callback
  return (element) => {
    containerRef.current = element;
  };
};

export default useMouseParallax;
