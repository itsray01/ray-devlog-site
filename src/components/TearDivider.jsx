import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * TearDivider - Cyberpunk glitch/tear divider between sections
 * Uses CSS masks and animations to create a "rip" effect as sections transition
 * 
 * @param {string} className - Additional CSS classes
 * @param {string} variant - 'default' | 'glitch' | 'scanline'
 * @param {boolean} animate - Whether to animate the reveal (default: true)
 */
const TearDivider = ({ 
  className = '', 
  variant = 'default',
  animate = true 
}) => {
  const dividerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // IntersectionObserver to trigger reveal animation
  useEffect(() => {
    if (!animate || prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
      }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => observer.disconnect();
  }, [animate, prefersReducedMotion]);

  // SVG pattern for jagged tear edge
  const tearPattern = (
    <svg 
      className="tear-divider__svg" 
      viewBox="0 0 1200 60" 
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient for neon glow effect */}
        <linearGradient id="tearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0" />
          <stop offset="20%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="1" />
          <stop offset="80%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="tearGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Jagged tear path */}
      <path
        className="tear-divider__path"
        d="M0,30 
           L40,28 L60,35 L80,25 L120,32 L140,22 L180,30 
           L220,35 L260,20 L300,33 L340,25 L380,38 L420,28 
           L460,35 L500,22 L540,30 L580,38 L620,25 L660,32 
           L700,28 L740,35 L780,22 L820,30 L860,38 L900,25 
           L940,33 L980,28 L1020,35 L1060,22 L1100,30 L1140,35 L1200,30"
        fill="none"
        stroke="url(#tearGradient)"
        strokeWidth="2"
        filter="url(#tearGlow)"
      />
      
      {/* Secondary glitch line (offset) */}
      <path
        className="tear-divider__path tear-divider__path--glitch"
        d="M0,30 
           L40,28 L60,35 L80,25 L120,32 L140,22 L180,30 
           L220,35 L260,20 L300,33 L340,25 L380,38 L420,28 
           L460,35 L500,22 L540,30 L580,38 L620,25 L660,32 
           L700,28 L740,35 L780,22 L820,30 L860,38 L900,25 
           L940,33 L980,28 L1020,35 L1060,22 L1100,30 L1140,35 L1200,30"
        fill="none"
        stroke="var(--accent-pink)"
        strokeWidth="1"
        strokeOpacity="0.5"
        transform="translate(2, 3)"
      />
    </svg>
  );

  // Scanline overlay for cyberpunk effect
  const scanlines = variant === 'scanline' || variant === 'glitch' ? (
    <div className="tear-divider__scanlines" aria-hidden="true" />
  ) : null;

  // Glitch effect elements
  const glitchEffects = variant === 'glitch' ? (
    <div className="tear-divider__glitch" aria-hidden="true">
      <div className="tear-divider__glitch-line tear-divider__glitch-line--1" />
      <div className="tear-divider__glitch-line tear-divider__glitch-line--2" />
      <div className="tear-divider__glitch-line tear-divider__glitch-line--3" />
    </div>
  ) : null;

  return (
    <motion.div
      ref={dividerRef}
      className={`tear-divider tear-divider--${variant} ${isRevealed ? 'is-revealed' : ''} ${className}`}
      initial={animate && !prefersReducedMotion ? { opacity: 0, scaleX: 0 } : false}
      animate={isRevealed ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      role="separator"
      aria-hidden="true"
    >
      {scanlines}
      {tearPattern}
      {glitchEffects}
    </motion.div>
  );
};

export default TearDivider;
