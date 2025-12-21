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
  const [showGrid, setShowGrid] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

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
      setShowTitle(true);
      clearTimeout(safetyTimeout);
      setTimeout(() => onDoneRef.current?.(), 100);
      return;
    }

    // Sequence the animations using timeouts
    const timers = [];

    // 1. Show grid lines after short delay
    timers.push(setTimeout(() => setShowGrid(true), 200));

    // 2. Show title after grid
    timers.push(setTimeout(() => setShowTitle(true), 1000));

    // 3. Hold for a moment
    // 4. Fade out and call onDone
    timers.push(setTimeout(() => {
      console.log('[IntroSequence] Animation complete, calling onDone');
      clearTimeout(safetyTimeout);
      onDoneRef.current?.();
    }, 2800));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
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
          initial={{ opacity: 0 }}
          animate={{ opacity: showTitle ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Digital Project Logbook
        </motion.h1>
      </div>
    </div>
  );
};

export default IntroSequence;
