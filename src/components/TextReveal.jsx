/**
 * TextReveal - Cinematic text animation components
 * Creates word-by-word and character-by-character reveal effects
 */
import { useRef, useEffect, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../utils/gsap';

/**
 * TextReveal Component
 * Animates text revealing word by word or character by character
 * 
 * @param {string} text - Text to animate
 * @param {string} as - HTML element type (h1, h2, p, etc.)
 * @param {string} splitBy - How to split text: 'words', 'chars', or 'lines'
 * @param {number} duration - Animation duration per element
 * @param {number} stagger - Delay between each element
 * @param {string} preset - Animation preset: 'fadeUp', 'fadeIn', 'slideUp', 'typewriter'
 * @param {boolean} scrub - Tie animation to scroll position
 * @param {string} className - Additional CSS classes
 */
const TextReveal = ({
  text,
  as: Component = 'h2',
  splitBy = 'words',
  duration = 0.6,
  stagger = 0.05,
  preset = 'fadeUp',
  scrub = false,
  className = '',
  style = {},
  ...props
}) => {
  const containerRef = useRef(null);

  // Split text into elements
  const elements = useMemo(() => {
    if (splitBy === 'words') {
      return text.split(' ');
    } else if (splitBy === 'chars') {
      return text.split('');
    } else if (splitBy === 'lines') {
      return text.split('\n');
    }
    return [text];
  }, [text, splitBy]);

  // Animation presets
  const getAnimationConfig = (preset) => {
    switch (preset) {
      case 'fadeUp':
        return {
          from: { opacity: 0, y: 30, rotateX: -45 },
          to: { opacity: 1, y: 0, rotateX: 0 }
        };
      case 'fadeIn':
        return {
          from: { opacity: 0 },
          to: { opacity: 1 }
        };
      case 'slideUp':
        return {
          from: { y: '100%', opacity: 0 },
          to: { y: '0%', opacity: 1 }
        };
      case 'typewriter':
        return {
          from: { opacity: 0, x: -10 },
          to: { opacity: 1, x: 0 }
        };
      case 'glitch':
        return {
          from: { opacity: 0, x: () => gsap.utils.random(-20, 20), skewX: 10 },
          to: { opacity: 1, x: 0, skewX: 0 }
        };
      case 'scale':
        return {
          from: { opacity: 0, scale: 0.5 },
          to: { opacity: 1, scale: 1 }
        };
      default:
        return {
          from: { opacity: 0, y: 20 },
          to: { opacity: 1, y: 0 }
        };
    }
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll('.text-reveal-item');
    if (spans.length === 0) return;

    const config = getAnimationConfig(preset);

    gsap.set(spans, config.from);

    const animation = gsap.to(spans, {
      ...config.to,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        end: scrub ? 'bottom 60%' : undefined,
        scrub: scrub ? 1 : false,
        toggleActions: scrub ? undefined : 'play none none reverse'
      }
    });

    return () => animation.kill();
  }, { scope: containerRef, dependencies: [text, preset, duration, stagger, scrub] });

  return (
    <Component
      ref={containerRef}
      className={`text-reveal ${className}`}
      style={{
        perspective: '1000px',
        ...style
      }}
      {...props}
    >
      {elements.map((element, index) => (
        <span
          key={index}
          className="text-reveal-item"
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
            transformStyle: 'preserve-3d'
          }}
        >
          {splitBy === 'chars' && element === ' ' ? '\u00A0' : element}
          {splitBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Component>
  );
};

/**
 * LineReveal - Reveals text line by line with a clip effect
 * Creates a cinematic "unveiling" effect
 */
export const LineReveal = ({
  children,
  as: Component = 'div',
  duration = 0.8,
  delay = 0,
  className = '',
  ...props
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = container.querySelectorAll('.line-reveal-content');
    
    gsap.set(lines, { 
      y: '100%',
      opacity: 0 
    });

    gsap.to(lines, {
      y: '0%',
      opacity: 1,
      duration,
      delay,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: containerRef });

  return (
    <Component ref={containerRef} className={`line-reveal ${className}`} {...props}>
      <div className="line-reveal-wrapper" style={{ overflow: 'hidden' }}>
        <div className="line-reveal-content" style={{ willChange: 'transform' }}>
          {children}
        </div>
      </div>
    </Component>
  );
};

/**
 * GlowText - Text that glows/pulses on scroll
 * Perfect for cyberpunk aesthetic headings
 */
export const GlowText = ({
  children,
  as: Component = 'span',
  glowColor = 'rgba(139, 92, 246, 0.8)',
  intensity = 1,
  className = '',
  ...props
}) => {
  const textRef = useRef(null);

  useGSAP(() => {
    const text = textRef.current;
    if (!text) return;

    // Initial state
    gsap.set(text, {
      textShadow: `0 0 0px ${glowColor}, 0 0 0px ${glowColor}`
    });

    // Glow animation on scroll
    gsap.to(text, {
      textShadow: `0 0 ${20 * intensity}px ${glowColor}, 0 0 ${40 * intensity}px ${glowColor}, 0 0 ${60 * intensity}px ${glowColor}`,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: textRef });

  return (
    <Component
      ref={textRef}
      className={`glow-text ${className}`}
      style={{ transition: 'text-shadow 0.3s ease' }}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * CountUp - Animated number counter
 * Great for statistics or metrics
 */
export const CountUp = ({
  end,
  start = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  ...props
}) => {
  const numberRef = useRef(null);

  useGSAP(() => {
    const element = numberRef.current;
    if (!element) return;

    const obj = { value: start };

    gsap.to(obj, {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        element.textContent = prefix + obj.value.toFixed(decimals) + suffix;
      }
    });
  }, { scope: numberRef });

  return (
    <span ref={numberRef} className={`count-up ${className}`} {...props}>
      {prefix}{start}{suffix}
    </span>
  );
};

/**
 * TypewriterText - Typewriter effect with cursor
 */
export const TypewriterText = ({
  text,
  speed = 0.05,
  cursorChar = '|',
  showCursor = true,
  className = '',
  ...props
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(() => {
    const textElement = textRef.current;
    const cursorElement = cursorRef.current;
    if (!textElement) return;

    const chars = text.split('');
    textElement.textContent = '';

    // Typing animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    chars.forEach((char, i) => {
      tl.to(textElement, {
        duration: speed,
        onComplete: () => {
          textElement.textContent += char;
        }
      }, i * speed);
    });

    // Cursor blink
    if (cursorElement) {
      gsap.to(cursorElement, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, { scope: containerRef, dependencies: [text] });

  return (
    <span ref={containerRef} className={`typewriter ${className}`} {...props}>
      <span ref={textRef}></span>
      {showCursor && (
        <span ref={cursorRef} className="typewriter-cursor" style={{ color: 'var(--accent-primary)' }}>
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TextReveal;

