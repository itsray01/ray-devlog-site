import { useState, useEffect, useRef, Component } from 'react';
import { useLocation } from 'react-router-dom';
import StarfieldParticles from './StarfieldParticles';
import ShootingStars from './ShootingStars';
import './starfield.css';

/**
 * Error Boundary for Starfield
 * If particles crash, fail gracefully and let the page render
 */
class StarfieldErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Starfield crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fail silently - just show background gradient
      return null;
    }

    return this.props.children;
  }
}

/**
 * StarfieldBackground - Cinematic layered deep space background
 *
 * Renders ONLY on the Home page (/).
 * Layers:
 * 1. Nebula fog (CSS gradient with animation)
 * 2. Stars layer (main tsParticles)
 * 3. Space dust layer (secondary tsParticles)
 * 4. Shooting stars (CSS animated)
 * 5. Overlay (scanlines, grain, vignette)
 *
 * Features parallax on mouse movement (disabled on mobile/reduced-motion).
 * Respects prefers-reduced-motion and user toggle preferences.
 * Wrapped in ErrorBoundary so if it crashes, the page still renders.
 */
const StarfieldBackground = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check if starfield is enabled via localStorage
  useEffect(() => {
    const checkEnabled = () => {
      if (typeof window === 'undefined') return true;

      const starfieldEnabled = localStorage.getItem('starfield-enabled');
      const deepSpaceEnabled = localStorage.getItem('deepSpaceEnabled');

      // If either is explicitly set to 'false', respect that
      if (starfieldEnabled === 'false' || deepSpaceEnabled === 'false') {
        return false;
      }

      return true;
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    setIsEnabled(checkEnabled());
    setPrefersReducedMotion(checkReducedMotion());
    setIsReady(true);

    // Listen for storage changes (for toggle sync across tabs)
    const handleStorage = (e) => {
      if (e.key === 'starfield-enabled' || e.key === 'deepSpaceEnabled') {
        setIsEnabled(checkEnabled());
      }
    };

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setPrefersReducedMotion(!!e?.matches);

    window.addEventListener('storage', handleStorage);
    if (mediaQuery) {
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleMotionChange);
      } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleMotionChange);
      }
    }

    return () => {
      window.removeEventListener('storage', handleStorage);
      if (mediaQuery) {
        if (typeof mediaQuery.removeEventListener === 'function') {
          mediaQuery.removeEventListener('change', handleMotionChange);
        } else if (typeof mediaQuery.removeListener === 'function') {
          mediaQuery.removeListener(handleMotionChange);
        }
      }
    };
  }, []);

  // Parallax effect on mouse move (desktop only, disabled on reduced motion)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion || typeof window === 'undefined' || window.innerWidth < 768) return;

    let rafId = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isAnimating = false;

    // Smooth interpolation (lerp) for buttery smooth parallax
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      targetY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      // Start animation loop if not already running
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };

    // Animation loop - only runs when mouse moves
    const animate = () => {
      // Lerp towards target with 0.08 factor (smooth but responsive)
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);

      // Update CSS variables (max 40px offset)
      container.style.setProperty('--parallax-x', `${currentX * 40}px`);
      container.style.setProperty('--parallax-y', `${currentY * 40}px`);

      // Check if we're close enough to target (within 0.01)
      const diffX = Math.abs(currentX - targetX);
      const diffY = Math.abs(currentY - targetY);

      if (diffX > 0.01 || diffY > 0.01) {
        // Continue animating
        rafId = requestAnimationFrame(animate);
      } else {
        // Stop animation loop when reached target
        isAnimating = false;
        rafId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Only render on Home page
  if (location.pathname !== '/') {
    return null;
  }

  // Wait for capability checks
  if (!isReady) {
    return null;
  }

  // Check if disabled by user toggle
  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="starfield-container"
      aria-hidden="true"
    >
      <StarfieldErrorBoundary>
        {/* Layer 1: Nebula fog (CSS-based) */}
        <div className="starfield-nebula" />

        {/* Layer 2: Main stars */}
        <StarfieldParticles variant="stars" />

        {/* Layer 3: Space dust */}
        <StarfieldParticles variant="dust" />

        {/* Layer 4: Shooting stars */}
        {!prefersReducedMotion && <ShootingStars />}
      </StarfieldErrorBoundary>

      {/* Layer 5: Dystopian signal overlay */}
      <div className="starfield-overlay">
        <div className="starfield-overlay__scanlines" />
        <div className="starfield-overlay__vignette" />
        <div className="starfield-overlay__grain" />
      </div>
    </div>
  );
};

export default StarfieldBackground;
