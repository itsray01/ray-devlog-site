import { useRef, useEffect, Component } from 'react';
import { useLocation } from 'react-router-dom';
import './galaxy.css';

/**
 * Error Boundary for Galaxy Background
 */
class GalaxyErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[GalaxyBackground] Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/**
 * GalaxyBackground - CSS-only galaxy with radial-gradient stars
 * 
 * Uses radial-gradient for ROUND stars (not box-shadow squares).
 * Covers entire viewport with fixed positioning.
 * Parallax via transform: translate3d with overscan (inset: -20%).
 * 
 * Layers (back to front):
 * 1. Nebula (colorful gradients)
 * 2. Small stars (many, faint)
 * 3. Medium stars (fewer, brighter)
 * 4. Big stars (few, brightest)
 */
const GalaxyBackground = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const starsSmallRef = useRef(null);
  const starsMedRef = useRef(null);
  const starsBigRef = useRef(null);
  const nebulaRef = useRef(null);

  // Parallax controller - single RAF loop, no React re-renders
  useEffect(() => {
    const container = containerRef.current;
    const starsSmall = starsSmallRef.current;
    const starsMed = starsMedRef.current;
    const starsBig = starsBigRef.current;
    const nebula = nebulaRef.current;
    
    if (!container) return;

    // Check for reduced motion
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (motionQuery?.matches) {
      container.dataset.reducedMotion = 'true';
      return;
    }

    // Check for touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    container.dataset.touchDevice = isTouchDevice ? 'true' : 'false';

    // State in closure (no React state)
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let rafId = null;
    let scrollTimeout = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Single RAF loop drives all parallax
    const animate = () => {
      currentScrollY = lerp(currentScrollY, targetScrollY, 0.06);
      
      if (!isTouchDevice) {
        currentMouseX = lerp(currentMouseX, targetMouseX, 0.06);
        currentMouseY = lerp(currentMouseY, targetMouseY, 0.06);
      }

      // Calculate pixel offsets for each layer
      const scrollPx = currentScrollY * 0.25;
      const mouseXPx = currentMouseX * 40;
      const mouseYPx = currentMouseY * 25;

      // Apply transforms directly to elements (no React re-render)
      if (nebula) {
        nebula.style.transform = `translate3d(${mouseXPx * 0.15}px, ${scrollPx * 0.2 + mouseYPx * 0.15}px, 0)`;
      }
      if (starsSmall) {
        starsSmall.style.transform = `translate3d(${mouseXPx * 0.3}px, ${scrollPx * 0.35 + mouseYPx * 0.3}px, 0)`;
      }
      if (starsMed) {
        starsMed.style.transform = `translate3d(${mouseXPx * 0.55}px, ${scrollPx * 0.5 + mouseYPx * 0.55}px, 0)`;
      }
      if (starsBig) {
        starsBig.style.transform = `translate3d(${mouseXPx * 0.85}px, ${scrollPx * 0.7 + mouseYPx * 0.85}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    // Scroll handler
    const onScroll = () => {
      targetScrollY = window.scrollY;
      container.dataset.scrolling = 'true';
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        container.dataset.scrolling = 'false';
      }, 150);
    };

    // Mouse handler (desktop only)
    const onPointerMove = (e) => {
      if (isTouchDevice || e.pointerType === 'touch') return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetMouseX = (e.clientX - centerX) / centerX; // -1 to 1
      targetMouseY = (e.clientY - centerY) / centerY;
    };

    const onPointerLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    // Start listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!isTouchDevice) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }

    // Start animation loop
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  // Only render on Home page
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <GalaxyErrorBoundary>
      <div 
        ref={containerRef}
        className="bgFx"
        aria-hidden="true"
        data-scrolling="false"
        data-reduced-motion="false"
      >
        {/* Layer 1: Nebula (colorful gradients) */}
        <div ref={nebulaRef} className="nebula" />

        {/* Layer 2: Small stars (many, faint) */}
        <div ref={starsSmallRef} className="stars stars--small" />

        {/* Layer 3: Medium stars (fewer, brighter) */}
        <div ref={starsMedRef} className="stars stars--med" />

        {/* Layer 4: Big stars (few, brightest) */}
        <div ref={starsBigRef} className="stars stars--big" />

        {/* Layer 5: Vignette */}
        <div className="bgFx__vignette" />
      </div>
    </GalaxyErrorBoundary>
  );
};

export default GalaxyBackground;
