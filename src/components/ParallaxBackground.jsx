/**
 * ParallaxBackground - Creates depth effect with scroll-driven parallax layers
 * Uses GSAP ScrollTrigger for smooth parallax scrolling
 */
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../utils/gsap';

/**
 * ParallaxBackground Component
 * Creates a multi-layer parallax background effect
 * 
 * @param {string} imageSrc - Main background image source
 * @param {number} speed - Parallax speed (0.1 = slow, 1 = normal scroll)
 * @param {string} overlayColor - Overlay gradient color
 * @param {number} overlayOpacity - Overlay opacity (0-1)
 * @param {boolean} fixed - Whether background is fixed or scrolls
 * @param {ReactNode} children - Content to render on top
 */
const ParallaxBackground = ({
  imageSrc = '/img/bg.png',
  speed = 0.3,
  overlayColor = 'rgba(13, 15, 18, 0.7)',
  overlayOpacity = 0.7,
  fixed = false,
  children
}) => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);

  useGSAP(() => {
    if (fixed) return; // Skip parallax for fixed backgrounds
    
    const background = backgroundRef.current;
    if (!background) return;

    // Create parallax effect
    gsap.to(background, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="parallax-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* Background Layer */}
      <div
        ref={backgroundRef}
        className="parallax-background"
        style={{
          position: fixed ? 'fixed' : 'absolute',
          top: fixed ? 0 : '-20%',
          left: 0,
          width: '100%',
          height: fixed ? '100%' : '140%',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2,
          willChange: 'transform'
        }}
      />
      
      {/* Overlay Layer */}
      <div
        className="parallax-overlay"
        style={{
          position: fixed ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, ${overlayColor} 0%, rgba(13, 15, 18, 0.85) 50%, rgba(13, 15, 18, 0.95) 100%)`,
          zIndex: -1
        }}
      />
      
      {/* Content */}
      <div className="parallax-content" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

/**
 * ParallaxLayer - Individual parallax layer for more complex effects
 * Stack multiple layers with different speeds for depth
 */
export const ParallaxLayer = ({
  children,
  speed = 0.5,
  className = '',
  style = {},
  ...props
}) => {
  const layerRef = useRef(null);

  useGSAP(() => {
    const layer = layerRef.current;
    if (!layer) return;

    gsap.to(layer, {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: layer.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: layerRef });

  return (
    <div
      ref={layerRef}
      className={`parallax-layer ${className}`}
      style={{
        willChange: 'transform',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * ScrollProgress - Visual indicator showing scroll progress
 * Can be used as a reading progress bar
 */
export const ScrollProgress = ({
  color = 'var(--accent-primary)',
  height = 3,
  position = 'top',
  zIndex = 9999
}) => {
  const progressRef = useRef(null);

  useGSAP(() => {
    const progress = progressRef.current;
    if (!progress) return;

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }, { scope: progressRef });

  return (
    <div
      ref={progressRef}
      className="scroll-progress"
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        width: '100%',
        height: `${height}px`,
        background: color,
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        zIndex,
        boxShadow: `0 0 10px ${color}`
      }}
    />
  );
};

/**
 * FloatingElement - Element that floats/bobs with scroll
 * Good for decorative elements
 */
export const FloatingElement = ({
  children,
  floatAmount = 20,
  duration = 2,
  className = '',
  ...props
}) => {
  const elementRef = useRef(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    // Continuous floating animation
    gsap.to(element, {
      y: floatAmount,
      duration,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    // Additional parallax on scroll
    gsap.to(element, {
      y: '+=50',
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={`floating-element ${className}`} {...props}>
      {children}
    </div>
  );
};

export default ParallaxBackground;

