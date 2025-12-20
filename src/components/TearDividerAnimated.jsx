import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TearDividerAnimated - Premium animated divider using CSS + GSAP
 * No WebGL/Three.js - pure CSS animations with scroll-triggered reveal
 * 
 * @param {string} nextSectionId - ID of the next section to trigger animation
 * @param {number} height - Height of the divider in pixels (default: 100)
 * @param {string} className - Additional CSS classes
 */
export default function TearDividerAnimated({
  nextSectionId,
  height = 100,
  className = '',
}) {
  const dividerRef = useRef(null);
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    if (!nextSectionId || !dividerRef.current) return;

    const triggerElement = document.getElementById(nextSectionId);
    if (!triggerElement) return;

    const ctx = gsap.context(() => {
      // Create the reveal animation timeline
      const tl = gsap.timeline({ paused: true });
      
      // Line draws from center outward
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
      
      // Glow pulses in
      tl.fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 85%',
        end: 'top 35%',
        onEnter: () => {
          tl.play();
          setIsRevealed(true);
        },
        onLeaveBack: () => {
          tl.reverse();
          setIsRevealed(false);
        },
        onEnterBack: () => {
          tl.play();
          setIsRevealed(true);
        },
      });
    }, dividerRef);

    return () => ctx.revert();
  }, [nextSectionId, prefersReducedMotion]);

  return (
    <div
      ref={dividerRef}
      className={`tear-divider-animated ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={{
        width: '100%',
        height: height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-hidden="true"
      role="separator"
    >
      {/* Animated glow layer */}
      <div
        ref={glowRef}
        className="tear-glow"
        style={{
          position: 'absolute',
          width: '60%',
          height: '40px',
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: prefersReducedMotion ? 0.5 : 0,
        }}
      />
      
      {/* Main line with gradient */}
      <div
        ref={lineRef}
        className="tear-line"
        style={{
          width: '80%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, var(--accent-primary, #8b5cf6) 15%, var(--accent-secondary, #06b6d4) 50%, var(--accent-primary, #8b5cf6) 85%, transparent 100%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)',
          transformOrigin: 'center',
          transform: prefersReducedMotion ? 'scaleX(1)' : 'scaleX(0)',
          opacity: prefersReducedMotion ? 0.7 : 0,
        }}
      />
      
      {/* Scanline texture overlay */}
      <div
        className="tear-scanlines"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
          pointerEvents: 'none',
          opacity: isRevealed ? 0.5 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
      
      {/* Edge particles/dots */}
      <div
        className="tear-particles"
        style={{
          position: 'absolute',
          width: '90%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: isRevealed ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: i % 2 === 0 ? 'var(--accent-primary, #8b5cf6)' : 'var(--accent-secondary, #06b6d4)',
              boxShadow: `0 0 6px ${i % 2 === 0 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(6, 182, 212, 0.8)'}`,
              animation: isRevealed && !prefersReducedMotion ? `pulse ${1.5 + i * 0.2}s ease-in-out infinite` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
