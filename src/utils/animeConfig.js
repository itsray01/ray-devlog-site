/**
 * Anime.js Animation Configuration & Utilities
 * Cyberpunk/Futuristic premium animations with accessibility support
 * 
 * This wrapper handles animejs v4 which uses named exports (no default export)
 */

// Import named exports from animejs v4
import { 
  animate, 
  createTimeline, 
  stagger as animeStagger,
  onScroll,
  eases,
  utils 
} from 'animejs';

// Export animate as default so existing code can use: anime(...)
export default animate;

// Re-export named functions for explicit imports
export { 
  animate,
  createTimeline, 
  animeStagger as stagger,
  onScroll,
  eases,
  utils
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base easing functions - smooth cyberpunk feel
export const EASING = {
  smooth: 'out-cubic',           // Smooth deceleration
  elastic: 'out-elastic(1, 0.5)', // Subtle bounce
  cyber: 'in-out-back(1.7)',     // Cyberpunk overshoot
  soft: 'out-quad',              // Gentle deceleration
};

// Duration presets (in ms)
export const DURATION = {
  fast: 250,
  normal: 400,
  slow: 600,
  verySlow: 800,
};

/**
 * Safe anime wrapper - respects reduced motion preference
 * If reduced motion is on, returns animations with ~0 duration
 * 
 * IMPORTANT: animejs v4 API requires: animate(target, config)
 * NOT: animate({ targets: ..., ...config })
 */
export const safeAnimate = (config) => {
  // Extract targets from config (v4 API requires separate arguments)
  const { targets, ...animConfig } = config;
  
  if (!targets) {
    console.warn('[safeAnimate] No targets provided, skipping animation');
    return { finished: Promise.resolve() };
  }

  // If reduced motion is preferred, drastically reduce duration and disable transforms
  if (prefersReducedMotion()) {
    return animate(targets, {
      ...animConfig,
      duration: 50, // Ultra-fast, essentially instant
      delay: 0,
      ease: 'linear',
      // Remove movement transforms if present
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
    });
  }

  return animate(targets, animConfig);
};

/**
 * Scroll reveal animation variants
 * Apply to elements with data-animate attribute
 */
export const REVEAL_VARIANTS = {
  // Fade up from below (default)
  reveal: {
    opacity: [0, 1],
    y: [24, 0],
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
  
  // Slide from left
  'reveal-left': {
    opacity: [0, 1],
    x: [-32, 0],
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
  
  // Slide from right
  'reveal-right': {
    opacity: [0, 1],
    x: [32, 0],
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
  
  // Scale up (for cards/images)
  'reveal-scale': {
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: DURATION.slow,
    ease: EASING.soft,
  },
  
  // Subtle glow effect (for highlights)
  'reveal-glow': {
    opacity: [0, 1],
    duration: DURATION.slow,
    ease: EASING.smooth,
  },
};

/**
 * Stagger children animation
 * Use for lists, grids, table rows
 */
export const staggerReveal = (parentElement, variant = 'reveal', options = {}) => {
  if (!parentElement) return;
  
  const children = Array.from(parentElement.children);
  if (children.length === 0) return;
  
  const config = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.reveal;
  
  return safeAnimate({
    targets: children,
    ...config,
    delay: animeStagger(80, options.startDelay || 0), // 80ms between each child
    ...options,
  });
};

/**
 * Page load timeline - runs once on first visit
 * Animates nav, title, hero elements
 */
export const pageLoadTimeline = (elements) => {
  const { navItems, title, subtitle, mainContent } = elements;
  
  const timeline = createTimeline({
    ease: EASING.smooth,
    duration: DURATION.normal,
  });
  
  // If reduced motion, return empty timeline
  if (prefersReducedMotion()) {
    return timeline;
  }
  
  // Nav items stagger down
  if (navItems?.length > 0) {
    timeline.add(navItems, {
      opacity: [0, 1],
      y: [-12, 0],
      delay: animeStagger(60),
      duration: DURATION.fast,
    }, 0);
  }
  
  // Title scale + fade
  if (title) {
    timeline.add(title, {
      opacity: [0, 1],
      scale: [0.96, 1],
      duration: DURATION.slow,
    }, 100);
  }
  
  // Subtitle fade in
  if (subtitle) {
    timeline.add(subtitle, {
      opacity: [0, 1],
      y: [8, 0],
      duration: DURATION.normal,
    }, 200);
  }
  
  // Main content gentle fade
  if (mainContent) {
    timeline.add(mainContent, {
      opacity: [0, 1],
      duration: DURATION.slow,
    }, 300);
  }
  
  return timeline;
};

/**
 * Micro-interaction: Card hover lift
 * Apply via JS event listeners
 */
export const cardHoverIn = (element) => {
  if (!element || prefersReducedMotion()) return;
  
  return safeAnimate({
    targets: element,
    scale: 1.03,
    y: -4,
    duration: DURATION.fast,
    ease: EASING.smooth,
  });
};

export const cardHoverOut = (element) => {
  if (!element || prefersReducedMotion()) return;
  
  return safeAnimate({
    targets: element,
    scale: 1,
    y: 0,
    duration: DURATION.fast,
    ease: EASING.smooth,
  });
};

/**
 * Grid shimmer effect (subtle)
 * Add to background grid overlays
 */
export const gridShimmer = (element) => {
  if (!element || prefersReducedMotion()) return;
  
  return safeAnimate({
    targets: element,
    opacity: [0.05, 0.15, 0.05],
    duration: 4000,
    ease: 'linear',
    loop: true,
  });
};



