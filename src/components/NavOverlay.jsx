import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavMenu from './NavMenu';
import { useNavigation } from '../context/NavigationContext';
import useViewport from '../hooks/useViewport';

/**
 * NavOverlay - Centered TOC overlay (Stage 2)
 * Displayed after intro sequence, before docking
 * User MUST click a TOC item to trigger docking - no auto-dock
 */
const NavOverlay = () => {
  const {
    introPhase,
    beginDockTransition,
    finishDock,
    pendingTargetId,
    sections,
    activeSectionId,
    scrollToSection,
    supportsOverlay
  } = useNavigation();

  const { isMobile } = useViewport();
  const overlayMenuRef = useRef(null);
  const panelRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const [frameReady, setFrameReady] = useState(false);

  // Handle triggering the dock transition
  const triggerDockTransition = useCallback((targetId) => {
    // Only allow docking when user clicks a TOC item (targetId must be provided)
    if (!targetId || hasTriggeredRef.current || introPhase !== 'toc') return;
    hasTriggeredRef.current = true;

    beginDockTransition(targetId);
  }, [introPhase, beginDockTransition]);

  // Complete transition without GSAP animation
  useEffect(() => {
    if (introPhase !== 'transitioning') return;

    // Simple timeout to simulate transition
    const timer = setTimeout(() => {
      finishDock();
      // Scroll to pending target if any
      if (pendingTargetId) {
        setTimeout(() => {
          scrollToSection(pendingTargetId);
        }, 50);
      }
    }, 300); // Short delay for visual continuity

    return () => clearTimeout(timer);
  }, [introPhase, finishDock, pendingTargetId, scrollToSection]);

  // Lock body scroll when overlay is open (preload, toc, or transitioning)
  useEffect(() => {
    const shouldLock = (introPhase === 'preload' || introPhase === 'toc' || introPhase === 'transitioning') && supportsOverlay;

    if (shouldLock) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow || '';
      };
    } else {
      // Ensure scroll is unlocked when not in these phases
      document.body.style.overflow = '';
    }
  }, [introPhase, supportsOverlay]);

  // Reset trigger flag when navigating to new page
  useEffect(() => {
    hasTriggeredRef.current = false;
    setFrameReady(false);
  }, [supportsOverlay]);

  // Trigger frame drawing animation after panel mounts
  useEffect(() => {
    if (introPhase === 'toc') {
      // Small delay to ensure panel is rendered
      const timer = setTimeout(() => setFrameReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, [introPhase]);

  // Don't render if not on a supported page or not in toc/transitioning phase
  // FALLBACK: If sections haven't loaded yet but we're in toc phase, show a loading state
  console.log('[NavOverlay] Render check:', {
    supportsOverlay,
    introPhase,
    sectionsLength: sections.length,
    willRender: supportsOverlay && (introPhase === 'toc' || introPhase === 'transitioning')
  });

  if (!supportsOverlay || (introPhase !== 'toc' && introPhase !== 'transitioning')) {
    console.log('[NavOverlay] Returning null - not rendering');
    return null;
  }

  // If no sections yet, show loading overlay
  if (sections.length === 0) {
    return (
      <div
        className="nav-overlay"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(10, 12, 16, 0.95)'
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Loading sections...</p>
        </div>
      </div>
    );
  }

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  // SVG frame draw animation - VERY SLOW and clear like Shopify
  const frameVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: 'easeInOut' }, // Slow and smooth
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <AnimatePresence>
      {introPhase === 'toc' && (
        <motion.div
          className="nav-overlay"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-modal="true"
          role="dialog"
          aria-label="Table of Contents"
        >
          <motion.div
            ref={panelRef}
            className={`nav-overlay__panel ${isMobile ? 'nav-overlay__panel--mobile' : ''}`}
            variants={panelVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* SVG Drawing Frame */}
            <svg
              className="nav-overlay__frame"
              preserveAspectRatio="none"
            >
              <motion.rect
                x="0.5"
                y="0.5"
                width="calc(100% - 1px)"
                height="calc(100% - 1px)"
                rx="0"
                ry="0"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                variants={prefersReducedMotion ? undefined : frameVariants}
                initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : 'hidden'}
                animate={frameReady ? 'visible' : 'hidden'}
              />
            </svg>

            {/* Header - no close button, user must click TOC item */}
            <div className="nav-overlay__header">
              <h2 className="nav-overlay__title">Contents</h2>
            </div>

            {/* Navigation Menu - wrapped with ref for potential future use */}
            <div ref={overlayMenuRef}>
              <NavMenu
                sections={sections}
                activeSectionId={activeSectionId}
                onSelect={(id) => triggerDockTransition(id)}
                mode="overlay"
              />
            </div>

            {/* Footer hint */}
            <div className="nav-overlay__hint">
              Click a section to begin
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavOverlay;
