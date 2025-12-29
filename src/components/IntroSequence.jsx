import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * IntroSequence - Shopify Editions-style fullscreen intro
 * Stage 1: Black screen with geometric lines, drawing rectangle, and title
 * Auto-transitions to Stage 2 (TOC overlay) via onDone callback
 */
const IntroSequence = ({ onDone }) => {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const onDoneRef = useRef(onDone);
  const timersRef = useRef([]); // STABLE REF for timers
  const safetyTimeoutRef = useRef(null); // Track safety timeout
  const [showGrid, setShowGrid] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  // Keep onDone ref up to date
  useLayoutEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useLayoutEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Ensure content is visible if something goes wrong
    const revealContentSafety = () => {
      console.warn('[IntroSequence] Ensuring content is visible');
      setIsAnimating(false);
    };

    // Catch any errors during animation setup
    try {
      // Safety timeout - if animation fails for any reason, still call onDone
      safetyTimeoutRef.current = setTimeout(() => {
        console.warn('[IntroSequence] Safety timeout triggered - forcing transition');
        revealContentSafety();
        onDoneRef.current?.();
      }, 5000); // 5 second fallback

      // Check for reduced motion preference
      const prefersReducedMotion = !!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

      if (prefersReducedMotion) {
        // Skip animation, show title briefly then exit
        setShowTitle(true);
        setIsAnimating(false); // Ensure content is visible
        if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
        const reducedMotionTimer = setTimeout(() => onDoneRef.current?.(), 100);
        timersRef.current.push(reducedMotionTimer);
        return;
      }

      // Sequence the animations using timeouts
      // 1. Show grid lines after short delay
      timersRef.current.push(setTimeout(() => setShowGrid(true), 100));

      // 2. Show title after grid
      timersRef.current.push(setTimeout(() => setShowTitle(true), 300));

      // 3. Hold for a moment then fade out and call onDone (total ~1.5s)
      timersRef.current.push(setTimeout(() => {
        console.log('[IntroSequence] Animation complete, calling onDone');
        setIsAnimating(false); // Remove animating state to reveal content
        if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
        onDoneRef.current?.();
      }, 1500));

    } catch (error) {
      console.error('[IntroSequence] Animation setup error:', error);
      revealContentSafety();
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      onDoneRef.current?.();
    }

    // Cleanup function - SAFE to run even if nothing was scheduled
    return () => {
      // Clear all timers safely
      if (timersRef.current && timersRef.current.length > 0) {
        timersRef.current.forEach(timer => {
          try {
            clearTimeout(timer);
          } catch (e) {
            // Ignore cleanup errors
          }
        });
        timersRef.current = [];
      }
      
      // Clear safety timeout
      if (safetyTimeoutRef.current) {
        try {
          clearTimeout(safetyTimeoutRef.current);
          safetyTimeoutRef.current = null;
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

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
    <div ref={containerRef} className={`intro-sequence ${isAnimating ? 'is-animating' : ''}`}>
      {/* Background geometric layer */}
      <motion.svg
        className="intro-sequence__grid"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showGrid ? 0.15 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {gridLines}
      </motion.svg>

      {/* Curved arcs at corners */}
      <motion.svg
        className="intro-sequence__arcs"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showGrid ? 0.15 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
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
      </motion.svg>

      {/* Center title (no frame) */}
      <div className="intro-sequence__center">
        <motion.h1
          className="intro-sequence__title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: showTitle ? 1 : 0,
            scale: showTitle ? 1 : 0.95
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Ray's Dev Log
        </motion.h1>
      </div>
    </div>
  );
};

export default IntroSequence;
