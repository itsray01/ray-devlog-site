/**
 * ScrollSection - GSAP ScrollTrigger animated section wrapper
 * Replaces Framer Motion whileInView with more powerful GSAP animations
 */
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, animationPresets, defaultScrollTriggerConfig } from '../utils/gsap';

/**
 * ScrollSection Component
 * Wraps content in a scroll-triggered animated container
 * 
 * @param {string} id - Section ID for navigation
 * @param {string} className - Additional CSS classes
 * @param {string} preset - Animation preset: 'fadeUp', 'fadeLeft', 'fadeRight', 'scaleIn', 'fadeIn', 'revealUp'
 * @param {number} duration - Animation duration in seconds
 * @param {number} delay - Animation delay in seconds
 * @param {string} staggerChildren - CSS selector for children to stagger (e.g., '.card', 'p')
 * @param {number} staggerDelay - Delay between staggered children
 * @param {object} scrollTrigger - Custom ScrollTrigger options
 * @param {boolean} scrub - Enable scrub mode (animation follows scroll)
 * @param {boolean} pin - Pin section while scrolling
 * @param {string} as - HTML element type (default: 'section')
 * @param {object} style - Inline styles
 * @param {ReactNode} children - Content to render
 */
const ScrollSection = ({
  id,
  className = '',
  preset = 'fadeUp',
  duration = 1,
  delay = 0,
  staggerChildren,
  staggerDelay = 0.1,
  scrollTrigger = {},
  scrub = false,
  pin = false,
  as: Component = 'section',
  style = {},
  children,
  ...props
}) => {
  const sectionRef = useRef(null);
  const animationRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const presetConfig = animationPresets[preset] || animationPresets.fadeUp;

    // Build ScrollTrigger configuration
    const triggerConfig = {
      trigger: section,
      ...defaultScrollTriggerConfig,
      ...scrollTrigger
    };

    // Add scrub if enabled
    if (scrub) {
      triggerConfig.scrub = typeof scrub === 'number' ? scrub : 1;
      triggerConfig.toggleActions = undefined; // Not used with scrub
    }

    // Add pin if enabled
    if (pin) {
      triggerConfig.pin = true;
      triggerConfig.pinSpacing = true;
    }

    // If staggering children, animate them instead of the section itself
    if (staggerChildren) {
      const children = section.querySelectorAll(staggerChildren);
      
      if (children.length > 0) {
        // Set initial state on children
        gsap.set(children, presetConfig.from);
        
        animationRef.current = gsap.to(children, {
          ...presetConfig.to,
          duration,
          delay,
          stagger: staggerDelay,
          ease: 'power3.out',
          scrollTrigger: triggerConfig
        });
      }
    } else {
      // Animate the section itself
      gsap.set(section, presetConfig.from);
      
      animationRef.current = gsap.to(section, {
        ...presetConfig.to,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: triggerConfig
      });
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, { scope: sectionRef, dependencies: [preset, duration, delay, staggerChildren, staggerDelay, scrub, pin] });

  // Merge scroll-margin-top into style for proper anchor scroll offset
  const mergedStyle = {
    scrollMarginTop: '100px',
    ...style
  };

  return (
    <Component
      ref={sectionRef}
      id={id}
      className={`scroll-section ${className}`}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * ScrollReveal - Simpler component for basic reveal animations
 * Good for individual elements like cards, paragraphs, etc.
 */
export const ScrollReveal = ({
  children,
  preset = 'fadeUp',
  duration = 0.8,
  delay = 0,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const elementRef = useRef(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    const presetConfig = animationPresets[preset] || animationPresets.fadeUp;

    gsap.set(element, presetConfig.from);
    
    gsap.to(element, {
      ...presetConfig.to,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: elementRef });

  return (
    <Component 
      ref={elementRef} 
      className={className} 
      style={{ scrollMarginTop: '100px', ...props.style }}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * PinnedSection - Section that pins while content scrolls through
 * Great for hero sections or feature showcases
 */
export const PinnedSection = ({
  children,
  id,
  className = '',
  pinDuration = '100%',
  ...props
}) => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${pinDuration}`,
      pin: true,
      pinSpacing: true
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id={id} className={`pinned-section ${className}`} {...props}>
      {children}
    </section>
  );
};

export default ScrollSection;

