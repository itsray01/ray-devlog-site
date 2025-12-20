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

/**
 * Fly nav items from overlay to dock with curved trajectory
 * Creates DOM clones that animate along a bezier-like path
 * 
 * @param {Object} options
 * @param {HTMLElement} options.overlayRootEl - Container with overlay nav items
 * @param {HTMLElement} options.dockRootEl - Container with dock nav items
 * @param {Function} options.onComplete - Callback when all animations complete
 */
export function flyNavItemsToDock({ overlayRootEl, dockRootEl, onComplete }) {
  if (!overlayRootEl || !dockRootEl) {
    onComplete?.();
    return;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    onComplete?.();
    return;
  }

  const overlayItems = overlayRootEl.querySelectorAll('[data-nav-item]');
  const dockItems = dockRootEl.querySelectorAll('[data-nav-item]');

  if (overlayItems.length === 0) {
    onComplete?.();
    return;
  }

  // Create a container for flying clones
  const flyContainer = document.createElement('div');
  flyContainer.className = 'nav-fly-container';
  flyContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;';
  document.body.appendChild(flyContainer);

  const clones = [];
  const itemCount = overlayItems.length;
  const duration = 0.85;
  const stagger = 0.05;
  const totalDuration = duration + (itemCount - 1) * stagger;

  overlayItems.forEach((overlayItem, i) => {
    const key = overlayItem.getAttribute('data-nav-key');
    const dockItem = Array.from(dockItems).find(
      item => item.getAttribute('data-nav-key') === key
    );

    if (!dockItem) return;

    // Get bounding rects
    const startRect = overlayItem.getBoundingClientRect();
    const endRect = dockItem.getBoundingClientRect();

    // Create clone
    const clone = overlayItem.cloneNode(true);
    clone.style.cssText = `
      position: fixed;
      left: ${startRect.left}px;
      top: ${startRect.top}px;
      width: ${startRect.width}px;
      height: ${startRect.height}px;
      margin: 0;
      z-index: 10000;
      pointer-events: none;
      background: rgba(22, 26, 35, 0.95);
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: 8px;
    `;
    flyContainer.appendChild(clone);
    clones.push(clone);

    // Hide original items during flight
    overlayItem.style.opacity = '0';
    dockItem.style.opacity = '0';

    // Calculate deltas and midpoints for curved path
    const dx = endRect.left - startRect.left;
    const dy = endRect.top - startRect.top;
    
    // Curved path midpoint - offset to create arc
    const midX = dx * 0.55 - 120;
    const midY = dy * 0.45 - 80;

    // Animate with keyframes for curved path
    gsap.to(clone, {
      keyframes: [
        { 
          x: midX, 
          y: midY, 
          rotation: -2,
          scale: 0.95,
          ease: 'power2.out',
          duration: duration * 0.5
        },
        { 
          x: dx, 
          y: dy, 
          rotation: 0,
          scale: 1,
          width: endRect.width,
          height: endRect.height,
          ease: 'power3.out',
          duration: duration * 0.5
        }
      ],
      delay: i * stagger,
      onComplete: () => {
        // Restore dock item visibility
        dockItem.style.opacity = '1';
        // Remove clone
        clone.remove();
      }
    });
  });

  // Call onComplete after all animations finish
  gsap.delayedCall(totalDuration + 0.1, () => {
    // Cleanup
    flyContainer.remove();
    // Restore overlay items (overlay will unmount anyway)
    overlayItems.forEach(item => {
      item.style.opacity = '1';
    });
    onComplete?.();
  });
}

export { gsap, ScrollTrigger };
export default gsap;

