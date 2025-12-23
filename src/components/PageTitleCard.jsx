import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageTitleCard - Quick title card transition for non-home pages
 * 
 * Shows a centered translucent panel with the page name that fades in/out.
 * Does NOT block interaction (pointer-events: none).
 * Respects prefers-reduced-motion.
 */

// Map pathname to display title
const PAGE_TITLES = {
  '/my-journey': 'MY JOURNEY',
  '/theories': 'THEORIES',
  '/assets': 'ASSETS',
  '/about': 'ABOUT',
  '/extras': 'EXTRAS'
};

const DISPLAY_DURATION = 650; // ms visible
const ANIMATION_DURATION = 0.25; // seconds for fade

const PageTitleCard = () => {
  const location = useLocation();
  const [showCard, setShowCard] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  }, []);

  // Get title for current path
  const title = PAGE_TITLES[location.pathname];

  // Trigger card on route change (non-home pages only)
  useEffect(() => {
    // Skip if home page, no title, or reduced motion
    if (location.pathname === '/' || !title || prefersReducedMotion) {
      setShowCard(false);
      return;
    }

    // Show the card
    setCurrentTitle(title);
    setShowCard(true);

    // Hide after duration
    const hideTimer = setTimeout(() => {
      setShowCard(false);
    }, DISPLAY_DURATION);

    return () => clearTimeout(hideTimer);
  }, [location.pathname, title, prefersReducedMotion]);

  // Don't render anything if reduced motion or no title
  if (prefersReducedMotion || !currentTitle) {
    return null;
  }

  return (
    <AnimatePresence>
      {showCard && (
        <motion.div
          className="page-title-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATION, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <motion.div
            className="page-title-card__panel"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: ANIMATION_DURATION, ease: 'easeOut' }}
          >
            <h1 className="page-title-card__text">{currentTitle}</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTitleCard;
