/**
 * Anime.js v4 utilities used by UI components.
 *
 * IMPORTANT: animejs v4 uses named exports (no default export).
 * We keep this file small and defensive so animations never crash the UI.
 */
import { animate, stagger, cubicBezier } from 'animejs';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return true;
  try {
    return !!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  } catch {
    return true;
  }
};

/**
 * tocStaggerIn
 * Terminal-style stagger for TOC/menu items.
 */
export function tocStaggerIn(containerEl, options = {}) {
  if (!containerEl || prefersReducedMotion()) return null;

  const { staggerDelay = 40, duration = 600 } = options;
  const items = containerEl.querySelectorAll('.nav-menu__item, .nav-menu__item-wrapper');
  if (!items || items.length === 0) return null;

  items.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
  });

  return animate(Array.from(items), {
    opacity: [0, 1],
    translateY: [10, 0],
    duration,
    delay: stagger(staggerDelay),
    ease: cubicBezier(0.4, 0, 0.2, 1),
  });
}

/**
 * ctaPulse
 * Subtle looping pulse for CTA buttons (stops on interaction).
 */
export function ctaPulse(buttonEl, options = {}) {
  if (!buttonEl || prefersReducedMotion()) return null;

  const { duration = 2000, intensity = 1.0 } = options;

  const baseGlow = '0 0 20px rgba(167, 139, 250, 0.4)';
  const pulseGlow = `0 0 ${30 * intensity}px rgba(167, 139, 250, ${0.7 * intensity})`;

  return animate(buttonEl, {
    boxShadow: [baseGlow, pulseGlow, baseGlow],
    opacity: [1, 0.9, 1],
    duration,
    loop: true,
    ease: 'inOutSine',
  });
}

/**
 * stopAnimation
 * Defensive stop helper for anime instances.
 */
export function stopAnimation(animeInstance) {
  if (!animeInstance) return;
  if (typeof animeInstance.cancel === 'function') animeInstance.cancel();
  if (typeof animeInstance.pause === 'function') animeInstance.pause();
}
