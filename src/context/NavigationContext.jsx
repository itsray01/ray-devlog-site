import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollSpy from '../hooks/useScrollSpy';

const NavigationContext = createContext(null);

// DEBUG: Force intro sequence to always play on HOME
// Only enabled in development (never in production builds)
const DEBUG_FORCE_INTRO = import.meta.env.DEV && import.meta.env.VITE_DEBUG_FORCE_INTRO === 'true';

// Helper to check if we're in development mode
const isDev = import.meta.env.DEV;

// Storage key for persisting docked state
const STORAGE_KEY = 'devlog_nav_docked';

// Pages that support the docked TOC sidebar behavior
const OVERLAY_PAGES = ['/', '/my-journey', '/theories', '/assets', '/about', '/extras'];

// Only the home page gets the full boot/menu intro overlay
const HOME_PATH = '/';

/**
 * NavigationProvider - Manages navigation state for TOC overlay/dock behavior
 * 
 * Provides:
 * - isDocked: whether the nav has been docked to sidebar (legacy compatibility)
 * - introPhase: "preload" | "toc" | "transitioning" | "docked" - 4-state flow
 * - setDocked: function to dock/undock the nav
 * - finishIntro: transition from preload to toc phase
 * - beginDockTransition: start the fly-out animation
 * - finishDock: complete the docking after animation
 * - pendingTargetId: section to scroll to after docking
 * - activeSectionId: currently visible section
 * - scrollToSection: function to scroll to a section
 * - sections: current page's sections
 * - supportsOverlay: whether current page supports docked sidebar
 * - supportsHomeIntro: whether current page is HOME and gets the full intro
 */
export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  
  // Check if URL has hash on initial load - if so, start docked
  const hasHashOnLoad = useRef(
    typeof window !== 'undefined' && window.location.hash.length > 1
  );

  // Only HOME page gets the full intro overlay
  const isHomePage = location.pathname === HOME_PATH;
  
  // 4-state navigation flow: "preload" | "toc" | "transitioning" | "docked"
  const [introPhase, setIntroPhase] = useState(() => {
    // Non-home pages ALWAYS start docked (no intro overlay)
    if (typeof window !== 'undefined' && window.location.pathname !== HOME_PATH) {
      return 'docked';
    }
    
    // HOME PAGE: Apply intro logic
    // DEBUG MODE: Always start with intro on home
    if (DEBUG_FORCE_INTRO) {
      if (isDev) {
        console.log('[NavigationContext] DEBUG_FORCE_INTRO enabled - starting with preload (home)');
      }
      return 'preload';
    }
    
    if (typeof window !== 'undefined') {
      const storedDocked = localStorage.getItem(STORAGE_KEY);
      if (isDev) {
        console.log('[NavigationContext] Initial state check:', {
          storedDocked,
          hasHashOnLoad: hasHashOnLoad.current,
          willStartDocked: storedDocked === '1' || hasHashOnLoad.current
        });
      }
      // If localStorage has docked OR URL has hash, start docked (skip intro entirely)
      if (storedDocked === '1' || hasHashOnLoad.current) {
        return 'docked';
      }
    }
    return 'preload'; // Start with preload intro sequence
  });
  
  // Pending target section to scroll to after docking completes
  const [pendingTargetId, setPendingTargetId] = useState(null);

  // Legacy isDocked computed from introPhase for backward compatibility
  const isDocked = introPhase === 'docked';
  
  // Legacy navState alias for backward compatibility (maps to introPhase)
  const navState = introPhase;

  const [sections, setSections] = useState([]);

  // Check if current page supports docked sidebar mode
  const supportsOverlay = useMemo(() => 
    OVERLAY_PAGES.includes(location.pathname),
    [location.pathname]
  );

  // Only HOME page supports the full intro overlay (boot sequence + TOC menu)
  const supportsHomeIntro = useMemo(() => 
    location.pathname === HOME_PATH,
    [location.pathname]
  );

  // When navigating to a non-home page, force docked state immediately
  useEffect(() => {
    if (!isHomePage && introPhase !== 'docked') {
      if (isDev) {
        console.log('[NavigationContext] Non-home page detected, forcing docked state');
      }
      setIntroPhase('docked');
    }
  }, [isHomePage, introPhase]);

  // Get section IDs for scroll spy
  const sectionIds = useMemo(() => 
    sections.map(s => s.id),
    [sections]
  );

  // Use scroll spy hook
  const { activeSectionId, scrollToSection, setActiveSectionId } = useScrollSpy(sectionIds);

  // Persist docked state (legacy API - still works)
  const setDocked = useCallback((value) => {
    if (value) {
      setIntroPhase('docked');
      // Don't persist to localStorage in DEBUG mode
      if (typeof window !== 'undefined' && !DEBUG_FORCE_INTRO) {
        localStorage.setItem(STORAGE_KEY, '1');
      }
    } else {
      setIntroPhase('preload');
      if (typeof window !== 'undefined' && !DEBUG_FORCE_INTRO) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Finish intro sequence - transition from preload to toc phase
  // Transitions immediately - NavOverlay will wait for sections if needed
  const finishIntro = useCallback(() => {
    if (isDev) {
      console.log('[NavigationContext] finishIntro called, current phase:', introPhase);
    }
    if (introPhase === 'preload') {
      if (isDev) {
        console.log('[NavigationContext] Transitioning to toc phase');
      }
      setIntroPhase('toc');
    } else {
      if (isDev) {
        console.warn('[NavigationContext] finishIntro called but phase is not preload:', introPhase);
      }
    }
  }, [introPhase]);

  // Begin the dock transition (fly-out animation)
  // Only works when user clicks a TOC item during toc phase
  const beginDockTransition = useCallback((targetId = null) => {
    // Only transition if currently in toc state (user must click TOC item)
    if (introPhase !== 'toc') return;
    
    setPendingTargetId(targetId);
    setIntroPhase('transitioning');
  }, [introPhase]);

  // Finish docking after animation completes
  const finishDock = useCallback(() => {
    setIntroPhase('docked');
    // Don't persist to localStorage in DEBUG mode
    if (typeof window !== 'undefined' && !DEBUG_FORCE_INTRO) {
      localStorage.setItem(STORAGE_KEY, '1');
    }
  }, []);

  // Handle section selection (scroll only - docking is handled separately now)
  const handleSelectSection = useCallback((id) => {
    scrollToSection(id);
    // Clear pending target after scrolling
    if (pendingTargetId === id) {
      setPendingTargetId(null);
    }
  }, [scrollToSection, pendingTargetId]);

  // Handle hash scrolling on initial load
  useEffect(() => {
    if (hasHashOnLoad.current && sections.length > 0) {
      const hash = window.location.hash.slice(1);
      if (hash) {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
          scrollToSection(hash);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [sections, scrollToSection]);

  // Safety timeout: if stuck in preload for too long, force to toc
  // (TOC phase has no timeout - waits for user to click)
  // Only triggers if actually in preload phase (intro overlay is mounted)
  useEffect(() => {
    if (introPhase === 'preload' && isHomePage) {
      const safetyTimer = setTimeout(() => {
        if (isDev) {
          console.warn('[NavigationContext] Safety timeout (7s) - forcing toc phase to reveal TOC');
        }
        setIntroPhase('toc');
      }, 7000); // 7 seconds max for preload - only if intro overlay is actually mounted

      return () => clearTimeout(safetyTimer);
    }
  }, [introPhase, isHomePage]);

  // Reset docked state when navigating away from overlay pages
  useEffect(() => {
    if (!supportsOverlay) {
      // Don't reset - keep docked preference for when user returns
    }
  }, [supportsOverlay]);

  const value = useMemo(() => ({
    // Legacy API (kept for backward compatibility)
    isDocked,
    setDocked,
    navState, // Alias for introPhase
    // New 4-state flow
    introPhase,
    finishIntro,
    beginDockTransition,
    finishDock,
    pendingTargetId,
    // Sections and scroll
    activeSectionId,
    scrollToSection: handleSelectSection,
    setActiveSectionId,
    sections,
    setSections,
    supportsOverlay,
    supportsHomeIntro
  }), [isDocked, setDocked, navState, introPhase, finishIntro, beginDockTransition, finishDock, pendingTargetId, activeSectionId, handleSelectSection, setActiveSectionId, sections, supportsOverlay, supportsHomeIntro]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * Hook to access navigation context
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export default NavigationContext;
