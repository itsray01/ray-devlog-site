import { useEffect, useRef } from 'react';

/**
 * useParallax - GPU-accelerated scroll + mouse parallax via CSS custom properties
 * 
 * Drives ONE requestAnimationFrame loop for all parallax effects.
 * No React re-renders from mousemove/scroll - uses refs + RAF only.
 * 
 * CSS Variables written:
 * - --pScroll: scroll-based parallax offset (px)
 * - --mxPx: mouse X offset in pixels
 * - --myPx: mouse Y offset in pixels
 * 
 * @param {React.RefObject} containerRef - Ref to the parallax container element
 * @param {Object} options - Configuration options
 */
export function useParallax(containerRef, options = {}) {
  const {
    scrollFactor = 0.3,
    mouseRangeX = 40, // Max pixels of mouse parallax X
    mouseRangeY = 25, // Max pixels of mouse parallax Y
    lerpFactor = 0.06, // Smoother lerp
    scrollDebounce = 150,
  } = options;

  // All state in refs to avoid re-renders
  const stateRef = useRef({
    // Scroll parallax
    targetScrollY: 0,
    currentScrollY: 0,
    // Mouse parallax (normalized -1 to 1)
    targetMouseX: 0,
    targetMouseY: 0,
    currentMouseX: 0,
    currentMouseY: 0,
    // Control
    rafId: null,
    scrollTimeout: null,
    isRunning: false,
    prefersReducedMotion: false,
    isTouchDevice: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const state = stateRef.current;

    // Check for reduced motion preference
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    state.prefersReducedMotion = motionQuery?.matches ?? false;

    // Detect touch device (disable mouse parallax on touch)
    state.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // If reduced motion, disable all parallax
    if (state.prefersReducedMotion) {
      container.style.setProperty('--pScroll', '0');
      container.style.setProperty('--mxPx', '0');
      container.style.setProperty('--myPx', '0');
      container.dataset.reducedMotion = 'true';
      return;
    }

    // Linear interpolation helper
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Single animation loop - drives ALL parallax (scroll + mouse)
    const animate = () => {
      // Lerp scroll position
      state.currentScrollY = lerp(state.currentScrollY, state.targetScrollY, lerpFactor);

      // Lerp mouse position (only if not touch device)
      if (!state.isTouchDevice) {
        state.currentMouseX = lerp(state.currentMouseX, state.targetMouseX, lerpFactor);
        state.currentMouseY = lerp(state.currentMouseY, state.targetMouseY, lerpFactor);
      }

      // Write CSS custom properties (drives GPU transforms in CSS)
      container.style.setProperty('--pScroll', (state.currentScrollY * scrollFactor).toFixed(2));
      container.style.setProperty('--mxPx', (state.currentMouseX * mouseRangeX).toFixed(2));
      container.style.setProperty('--myPx', (state.currentMouseY * mouseRangeY).toFixed(2));

      // Continue animation loop
      state.rafId = requestAnimationFrame(animate);
    };

    // Scroll handler - passive for performance
    const onScroll = () => {
      state.targetScrollY = window.scrollY;

      // Mark as actively scrolling (pauses CSS animations via data attribute)
      container.dataset.scrolling = 'true';

      // Debounce scroll end detection
      clearTimeout(state.scrollTimeout);
      state.scrollTimeout = setTimeout(() => {
        container.dataset.scrolling = 'false';
      }, scrollDebounce);
    };

    // Mouse/pointer handler (desktop only) - NO setState, just refs
    const onPointerMove = (e) => {
      // Skip on touch devices or touch pointer types
      if (state.isTouchDevice || e.pointerType === 'touch') return;

      // Normalize mouse position to -1..1 from viewport center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      state.targetMouseX = (e.clientX - centerX) / centerX; // -1 to 1
      state.targetMouseY = (e.clientY - centerY) / centerY; // -1 to 1
    };

    // Handle pointer leaving window - ease back to center
    const onPointerLeave = () => {
      state.targetMouseX = 0;
      state.targetMouseY = 0;
    };

    // Handle reduced motion changes
    const onMotionChange = (e) => {
      state.prefersReducedMotion = e.matches;
      if (e.matches) {
        cancelAnimationFrame(state.rafId);
        container.style.setProperty('--pScroll', '0');
        container.style.setProperty('--mxPx', '0');
        container.style.setProperty('--myPx', '0');
        container.dataset.reducedMotion = 'true';
      } else {
        container.dataset.reducedMotion = 'false';
        state.rafId = requestAnimationFrame(animate);
      }
    };

    // Initialize state
    state.targetScrollY = window.scrollY;
    state.currentScrollY = window.scrollY;
    state.targetMouseX = 0;
    state.targetMouseY = 0;
    state.currentMouseX = 0;
    state.currentMouseY = 0;
    container.dataset.scrolling = 'false';
    container.dataset.reducedMotion = 'false';
    container.dataset.touchDevice = state.isTouchDevice ? 'true' : 'false';

    // Start listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Only add mouse listeners on non-touch devices
    if (!state.isTouchDevice) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }

    if (motionQuery?.addEventListener) {
      motionQuery.addEventListener('change', onMotionChange);
    }

    // Start single animation loop
    state.isRunning = true;
    state.rafId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      state.isRunning = false;
      cancelAnimationFrame(state.rafId);
      clearTimeout(state.scrollTimeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      if (motionQuery?.removeEventListener) {
        motionQuery.removeEventListener('change', onMotionChange);
      }
    };
  }, [containerRef, scrollFactor, mouseRangeX, mouseRangeY, lerpFactor, scrollDebounce]);
}

export default useParallax;
