import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import NavMenu from './NavMenu';
import { useNavigation } from '../context/NavigationContext';
import useViewport from '../hooks/useViewport';

/**
 * NavOverlay - Full-screen/centered TOC overlay
 * Displayed on initial page load for Home/MyJourney pages
 * Transitions to docked sidebar when user selects a section
 */
const NavOverlay = () => {
  const { 
    isDocked, 
    setDocked, 
    sections, 
    activeSectionId, 
    scrollToSection,
    supportsOverlay 
  } = useNavigation();
  
  const { isMobile } = useViewport();

  // Handle escape key to close overlay
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && !isDocked) {
      setDocked(true);
    }
  }, [isDocked, setDocked]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  // Lock body scroll when overlay is open on mobile
  useEffect(() => {
    if (!isDocked && isMobile && supportsOverlay) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isDocked, isMobile, supportsOverlay]);

  // Don't render if not on a supported page or already docked
  if (!supportsOverlay || isDocked || sections.length === 0) {
    return null;
  }

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const panelVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="nav-overlay"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={() => setDocked(true)}
        aria-modal="true"
        role="dialog"
        aria-label="Table of Contents"
      >
        <motion.div
          className={`nav-overlay__panel ${isMobile ? 'nav-overlay__panel--mobile' : ''}`}
          variants={panelVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="nav-overlay__header">
            <h2 className="nav-overlay__title">Contents</h2>
            <button
              type="button"
              className="nav-overlay__close"
              onClick={() => setDocked(true)}
              aria-label="Close table of contents"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Menu */}
          <NavMenu
            sections={sections}
            activeSectionId={activeSectionId}
            onSelect={scrollToSection}
            mode="overlay"
          />

          {/* Footer hint */}
          <div className="nav-overlay__hint">
            Click any section to begin reading
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavOverlay;
