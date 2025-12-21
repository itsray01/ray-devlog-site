import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * IntroSequence - Shopify Editions-style fullscreen intro
 * Stage 1: Black screen with geometric lines, drawing rectangle, and title
 * Auto-transitions to Stage 2 (TOC overlay) via onDone callback
 */
const IntroSequence = ({ onDone }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const arcsRef = useRef(null);
  const hasAnimated = useRef(false);
  const onDoneRef = useRef(onDone);

  // Keep onDone ref up to date
  useLayoutEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useLayoutEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Safety timeout - if animation fails for any reason, still call onDone
    const safetyTimeout = setTimeout(() => {
      console.warn('[IntroSequence] Safety timeout triggered - forcing transition');
      onDoneRef.current?.();
    }, 5000); // 5 second fallback

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animation, show title briefly then exit
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
      }
      clearTimeout(safetyTimeout);
      setTimeout(() => onDoneRef.current?.(), 100);
      return;
    }

    // Use requestAnimationFrame to ensure refs are ready
    requestAnimationFrame(() => {
      const container = containerRef.current;
      const title = titleRef.current;
      const grid = gridRef.current;
      const arcs = arcsRef.current;

      if (!container || !title) {
        console.error('[IntroSequence] Refs not ready:', { container, title });
        clearTimeout(safetyTimeout);
        onDoneRef.current?.(); // Call onDone even if refs failed
        return;
      }

      // Set initial states
      gsap.set(title, { opacity: 0 });
      gsap.set(grid, { opacity: 0 });
      gsap.set(arcs, { opacity: 0 });

      // Create animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          console.log('[IntroSequence] Animation complete, calling onDone');
          clearTimeout(safetyTimeout); // Clear safety timeout on success
          onDoneRef.current?.();
        }
      });

      // Animation sequence (no rectangle, just grid and title)
      tl
        // 1. Grid lines fade in - more visible like Shopify
        .to([grid, arcs], {
          opacity: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        })
        // 2. Title fades in
        .to(title, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.4')
        // 3. Hold for 0.6s
        .to({}, { duration: 0.6 })
        // 4. Fade out entire overlay
        .to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in'
        });
    }); // Close requestAnimationFrame

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [onDone]);

  // Calculate grid lines - MORE LINES spanning entire screen
  const gridLines = [];
  // Horizontal lines - increase count for more coverage
  for (let i = 1; i <= 12; i++) {
    const y = (i / 13) * 100;
    gridLines.push(
      <line
        key={`h-${i}`}
        x1="0"
        y1={`${y}%`}
        x2="100%"
        y2={`${y}%`}
        stroke="white"
        strokeWidth="0.5"
        opacity="0.15"
      />
    );
  }
  // Vertical lines - increase count for more coverage
  for (let i = 1; i <= 16; i++) {
    const x = (i / 17) * 100;
    gridLines.push(
      <line
        key={`v-${i}`}
        x1={`${x}%`}
        y1="0"
        x2={`${x}%`}
        y2="100%"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.15"
      />
    );
  }

  return (
    <div ref={containerRef} className="intro-sequence is-animating">
      {/* Background geometric layer */}
      <svg 
        ref={gridRef}
        className="intro-sequence__grid" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {gridLines}
      </svg>

      {/* Curved arcs at corners */}
      <svg 
        ref={arcsRef}
        className="intro-sequence__arcs"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Top-left arc */}
        <path
          d="M 0 25 Q 0 0 25 0"
          fill="none"
          stroke="white"
          strokeWidth="0.3"
        />
        {/* Top-right arc */}
        <path
          d="M 75 0 Q 100 0 100 25"
          fill="none"
          stroke="white"
          strokeWidth="0.3"
        />
        {/* Bottom-left arc */}
        <path
          d="M 0 75 Q 0 100 25 100"
          fill="none"
          stroke="white"
          strokeWidth="0.3"
        />
        {/* Bottom-right arc */}
        <path
          d="M 75 100 Q 100 100 100 75"
          fill="none"
          stroke="white"
          strokeWidth="0.3"
        />
        {/* Large decorative arc */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          strokeDasharray="5 10"
        />
      </svg>

      {/* Center title (no frame) */}
      <div className="intro-sequence__center">
        <h1 ref={titleRef} className="intro-sequence__title">
          Digital Project Logbook
        </h1>
      </div>
    </div>
  );
};

export default IntroSequence;
