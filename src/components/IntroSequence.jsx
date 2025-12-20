import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * IntroSequence - Shopify Editions-style fullscreen intro
 * Stage 1: Black screen with geometric lines, drawing rectangle, and title
 * Auto-transitions to Stage 2 (TOC overlay) via onDone callback
 */
const IntroSequence = ({ onDone }) => {
  const containerRef = useRef(null);
  const rectRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const arcsRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation, show title briefly then exit
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
      }
      setTimeout(() => onDone?.(), 100);
      return;
    }

    const container = containerRef.current;
    const rect = rectRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    const arcs = arcsRef.current;

    if (!container || !rect || !title) return;

    // Get the rect's perimeter for stroke animation
    const rectElement = rect;
    const perimeter = 2 * (280 + 120); // width + height of rect
    
    // Set initial states
    gsap.set(rectElement, {
      strokeDasharray: perimeter,
      strokeDashoffset: perimeter
    });
    gsap.set(title, { opacity: 0 });
    gsap.set(grid, { opacity: 0 });
    gsap.set(arcs, { opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        onDone?.();
      }
    });

    // Animation sequence
    tl
      // 1. Grid lines fade in
      .to([grid, arcs], {
        opacity: 0.08,
        duration: 0.4,
        ease: 'power2.out'
      })
      // 2. Rectangle stroke draws
      .to(rectElement, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.1')
      // 3. Title fades in (starts 0.3s after rect begins)
      .to(title, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.5')
      // 4. Hold for 0.3s
      .to({}, { duration: 0.3 })
      // 5. Fade out entire overlay
      .to(container, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });

    return () => {
      tl.kill();
    };
  }, [onDone]);

  // Calculate grid lines
  const gridLines = [];
  // Horizontal lines
  for (let i = 1; i <= 6; i++) {
    const y = (i / 7) * 100;
    gridLines.push(
      <line
        key={`h-${i}`}
        x1="0"
        y1={`${y}%`}
        x2="100%"
        y2={`${y}%`}
        stroke="white"
        strokeWidth="0.5"
      />
    );
  }
  // Vertical lines
  for (let i = 1; i <= 8; i++) {
    const x = (i / 9) * 100;
    gridLines.push(
      <line
        key={`v-${i}`}
        x1={`${x}%`}
        y1="0"
        x2={`${x}%`}
        y2="100%"
        stroke="white"
        strokeWidth="0.5"
      />
    );
  }

  return (
    <div ref={containerRef} className="intro-sequence">
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

      {/* Center frame with title */}
      <div className="intro-sequence__center">
        <svg 
          className="intro-sequence__frame" 
          width="280" 
          height="120"
          viewBox="0 0 280 120"
        >
          <rect
            ref={rectRef}
            x="1"
            y="1"
            width="278"
            height="118"
            fill="none"
            stroke="white"
            strokeWidth="1"
            rx="2"
            ry="2"
          />
        </svg>
        <h1 ref={titleRef} className="intro-sequence__title">
          Digital Project Logbook
        </h1>
      </div>
    </div>
  );
};

export default IntroSequence;
