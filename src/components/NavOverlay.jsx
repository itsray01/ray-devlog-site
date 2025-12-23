import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import useViewport from '../hooks/useViewport';
import useSfx from '../hooks/useSfx';
import TerminalBoot from './TerminalBoot';
import NavMenu from './NavMenu';

// Define the pages to show in the navigation overlay
const PAGES = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'my-journey', title: 'My Journey', path: '/my-journey' },
  { id: 'theories', title: 'Theories', path: '/theories' },
  { id: 'assets', title: 'Assets', path: '/assets' },
  { id: 'about', title: 'About', path: '/about' },
  { id: 'extras', title: 'Extras', path: '/extras' }
];

// HUD Metadata
const HUD_DATA = {
  build: 'v0.7',
  buildLabel: 'Prototype',
  engine: 'Twine',
  checksum: '4F2A-91B0'
};

/**
 * NavOverlay - Terminal Main Menu / TOC Overlay
 * 
 * Displayed after intro sequence, before docking.
 * Features:
 * - Boot sequence with typewriter terminal lines
 * - HUD metadata display
 * - Parallax on mouse movement
 * - Scanlines and noise overlays
 * - CRT curvature effect
 * - Title micro-glitch
 * - Keyboard navigation
 * - SFX (toggleable)
 * - Sliding selector bar
 */
const NavOverlay = () => {
  const {
    introPhase,
    finishDock,
    supportsOverlay
  } = useNavigation();
  
  const navigate = useNavigate();
  const location = useLocation();

  const { isMobile } = useViewport();
  const panelRef = useRef(null);
  const frameRef = useRef(null);
  const hasNavigatedRef = useRef(false);
  
  // State
  const [frameReady, setFrameReady] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [isTitleGlitching, setIsTitleGlitching] = useState(false);
  
  // SFX hook - destructure to get stable references to memoized functions
  const { playHover, playConfirm } = useSfx();

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  }, []);

  // Handle page navigation
  const handlePageClick = useCallback((pageId) => {
    // Only allow navigation when in toc phase, boot done, and haven't navigated yet
    if (hasNavigatedRef.current || introPhase !== 'toc' || !bootDone) return;
    hasNavigatedRef.current = true;

    const page = PAGES.find(p => p.id === pageId);
    if (!page) return;

    console.log('[NavOverlay] Navigating to:', page.path);
    
    // Play confirm sound
    playConfirm();
    
    // Navigate to the page
    navigate(page.path);
    
    // Finish docking to reveal content
    setTimeout(() => {
      finishDock();
    }, 100);
  }, [introPhase, bootDone, navigate, finishDock, playConfirm]);

  // Lock body scroll when overlay is open (ONLY during toc or transitioning, NOT preload)
  useEffect(() => {
    const shouldLock = (introPhase === 'toc' || introPhase === 'transitioning') && supportsOverlay;

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

  // Reset navigation flag and boot state when overlay opens
  useEffect(() => {
    if (introPhase === 'toc') {
      hasNavigatedRef.current = false;
      setFrameReady(false);
      // If reduced motion, skip boot
      setBootDone(prefersReducedMotion);
    }
  }, [introPhase, prefersReducedMotion]);

  // Trigger frame drawing animation after panel mounts
  useEffect(() => {
    if (introPhase === 'toc') {
      // Small delay to ensure panel is rendered
      const timer = setTimeout(() => setFrameReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, [introPhase]);

  // Boot sequence complete handler
  const handleBootComplete = useCallback(() => {
    setBootDone(true);
  }, []);

  // Parallax effect on mouse movement
  useEffect(() => {
    if (prefersReducedMotion || isMobile || introPhase !== 'toc') return;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate offset from center (max ±8px)
      const offsetX = ((e.clientX - centerX) / centerX) * 8;
      const offsetY = ((e.clientY - centerY) / centerY) * 5;
      
      setParallaxOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, isMobile, introPhase]);

  // Title micro-glitch effect (every 6-10 seconds)
  useEffect(() => {
    if (prefersReducedMotion || introPhase !== 'toc' || !bootDone) return;

    const scheduleGlitch = () => {
      const delay = 6000 + Math.random() * 4000; // 6-10 seconds
      return setTimeout(() => {
        setIsTitleGlitching(true);
        // Glitch for 2 frames (~32ms)
        setTimeout(() => setIsTitleGlitching(false), 32);
        // Schedule next glitch
        glitchTimer = scheduleGlitch();
      }, delay);
    };

    let glitchTimer = scheduleGlitch();
    return () => clearTimeout(glitchTimer);
  }, [prefersReducedMotion, introPhase, bootDone]);

  // Keyboard shortcut: Escape (optional - does nothing or could close)
  useEffect(() => {
    if (introPhase !== 'toc') return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Currently does nothing - menu must be navigated
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [introPhase]);

  // Convert pages to sections format for NavMenu - memoized for stable reference
  // Must be called before conditional return to satisfy Rules of Hooks
  const sections = useMemo(() => 
    PAGES.map(p => ({ id: p.id, title: p.title })), 
  []);

  // Only render during toc phase
  if (introPhase !== 'toc') {
    return null;
  }

  // Get current page for highlighting
  const currentPath = location.pathname;
  const currentPageId = PAGES.find(p => p.path === currentPath)?.id || '';

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

  // SVG frame draw animation
  const frameVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: 'easeInOut' },
        opacity: { duration: 0.5 }
      }
    }
  };

  // Glitch style for title
  const titleGlitchStyle = isTitleGlitching ? {
    transform: `translateX(${Math.random() * 3 - 1.5}px) skewX(${Math.random() * 2 - 1}deg)`,
    textShadow: '2px 0 #ff0040, -2px 0 #00ffff'
  } : {};

  // Parallax styles
  const panelParallaxStyle = !prefersReducedMotion ? {
    transform: `translate3d(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px, 0)`
  } : {};
  
  const frameParallaxStyle = !prefersReducedMotion ? {
    transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`
  } : {};

  return (
    <AnimatePresence>
      <motion.div
        className="nav-overlay nav-overlay--terminal"
        data-phase={introPhase}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        aria-modal="true"
        role="dialog"
        aria-label="Navigation Terminal"
      >
        {/* Scanlines overlay */}
        {!prefersReducedMotion && <div className="terminal-scanlines" aria-hidden="true" />}
        
        {/* Noise overlay */}
        {!prefersReducedMotion && <div className="terminal-noise" aria-hidden="true" />}
        
        {/* CRT curvature/vignette overlay */}
        <div className="terminal-crt-vignette" aria-hidden="true" />

        <motion.div
          ref={panelRef}
          className={`nav-overlay__panel nav-overlay__panel--terminal ${isMobile ? 'nav-overlay__panel--mobile' : ''}`}
          variants={panelVariants}
          style={panelParallaxStyle}
          onClick={(e) => e.stopPropagation()}
        >
          {/* SVG Drawing Frame with parallax */}
          <svg
            ref={frameRef}
            className="nav-overlay__frame"
            style={frameParallaxStyle}
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
              stroke="rgba(167, 139, 250, 0.6)"
              strokeWidth="1.5"
              variants={prefersReducedMotion ? undefined : frameVariants}
              initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : 'hidden'}
              animate={frameReady ? 'visible' : 'hidden'}
            />
          </svg>

          {/* HUD Metadata (top-right) */}
          <div className="terminal-hud" aria-label="System status">
            <div className="terminal-hud__row">
              <span className="terminal-hud__label">BUILD:</span>
              <span className="terminal-hud__value">{HUD_DATA.build} ({HUD_DATA.buildLabel})</span>
            </div>
            <div className="terminal-hud__row">
              <span className="terminal-hud__label">ENGINE:</span>
              <span className="terminal-hud__value">{HUD_DATA.engine}</span>
            </div>
            <div className="terminal-hud__row">
              <span className="terminal-hud__label">STATUS:</span>
              <span className="terminal-hud__value terminal-hud__status">
                <span className="terminal-hud__status-dot" aria-hidden="true" />
                ONLINE
              </span>
            </div>
            <div className="terminal-hud__row terminal-hud__row--subtle">
              <span className="terminal-hud__label">CHK:</span>
              <span className="terminal-hud__value">{HUD_DATA.checksum}</span>
            </div>
          </div>

          {/* Header with glitch effect */}
          <div className="nav-overlay__header">
            <h2 
              className="nav-overlay__title nav-overlay__title--terminal"
              style={titleGlitchStyle}
            >
              LOGBOOK MODULES
            </h2>
          </div>

          {/* Boot Sequence OR Menu */}
          <div className="nav-overlay__content">
            {!bootDone ? (
              <TerminalBoot 
                onComplete={handleBootComplete}
                bootDuration={4500}
              />
            ) : (
              <NavMenu
                sections={sections}
                activeSectionId={currentPageId}
                onSelect={handlePageClick}
                onHover={playHover}
                onConfirm={playConfirm}
                mode="overlay"
                disabled={!bootDone}
              />
            )}
          </div>

          {/* Footer hint */}
          <div className="nav-overlay__hint nav-overlay__hint--terminal">
            {bootDone ? (
              <>Select a module to begin<span className="terminal-hint-arrow">↑↓</span> <span className="terminal-hint-key">Enter</span></>
            ) : (
              <span className="terminal-boot-hint">Initializing system...</span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavOverlay;
