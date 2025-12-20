/**
 * GSAP Configuration and ScrollTrigger Setup
 * Registers plugins and exports animation utilities
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Default animation settings
export const defaultEase = 'power3.out';
export const defaultDuration = 1;

// Animation presets for scroll-triggered animations
export const animationPresets = {
  // Fade up from below
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 }
  },
  // Fade in from left
  fadeLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 }
  },
  // Fade in from right
  fadeRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 }
  },
  // Scale up
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 }
  },
  // Fade only
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  // Reveal from bottom with clip
  revealUp: {
    from: { opacity: 0, y: 100, clipPath: 'inset(100% 0% 0% 0%)' },
    to: { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }
  }
};

// ScrollTrigger default configuration
export const defaultScrollTriggerConfig = {
  start: 'top 85%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse'
};

// Create a scroll-triggered animation
export const createScrollAnimation = (element, options = {}) => {
  const {
    preset = 'fadeUp',
    duration = defaultDuration,
    ease = defaultEase,
    delay = 0,
    stagger = 0,
    scrollTrigger = {},
    ...customProps
  } = options;

  const presetConfig = animationPresets[preset] || animationPresets.fadeUp;

  return gsap.fromTo(
    element,
    { ...presetConfig.from, ...customProps.from },
    {
      ...presetConfig.to,
      ...customProps.to,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: {
        trigger: element,
        ...defaultScrollTriggerConfig,
        ...scrollTrigger
      }
    }
  );
};

// Create staggered animation for child elements
export const createStaggerAnimation = (parent, childSelector, options = {}) => {
  const {
    preset = 'fadeUp',
    duration = 0.8,
    ease = defaultEase,
    stagger = 0.1,
    scrollTrigger = {},
    ...customProps
  } = options;

  const presetConfig = animationPresets[preset] || animationPresets.fadeUp;
  const children = parent.querySelectorAll(childSelector);

  if (children.length === 0) return null;

  return gsap.fromTo(
    children,
    { ...presetConfig.from, ...customProps.from },
    {
      ...presetConfig.to,
      ...customProps.to,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: parent,
        ...defaultScrollTriggerConfig,
        ...scrollTrigger
      }
    }
  );
};

// Parallax effect utility
export const createParallax = (element, speed = 0.5, options = {}) => {
  const {
    scrollTrigger = {},
    ...customProps
  } = options;

  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    ...customProps,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...scrollTrigger
    }
  });
};

// Text split animation utility
export const splitTextToSpans = (element, splitBy = 'words') => {
  const text = element.textContent;
  element.innerHTML = '';
  
  if (splitBy === 'words') {
    const words = text.split(' ');
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'split-word';
      span.style.display = 'inline-block';
      span.textContent = word;
      element.appendChild(span);
      if (i < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
  } else if (splitBy === 'chars') {
    const chars = text.split('');
    chars.forEach((char) => {
      const span = document.createElement('span');
      span.className = 'split-char';
      span.style.display = 'inline-block';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  } else if (splitBy === 'lines') {
    // For lines, we wrap each line in a span
    const wrapper = document.createElement('div');
    wrapper.className = 'split-line';
    wrapper.style.display = 'block';
    wrapper.style.overflow = 'hidden';
    wrapper.innerHTML = `<span style="display:inline-block">${text}</span>`;
    element.appendChild(wrapper);
  }
  
  return element;
};

// Refresh ScrollTrigger (useful after dynamic content changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

// Kill all ScrollTrigger instances
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export { gsap, ScrollTrigger };
export default gsap;

