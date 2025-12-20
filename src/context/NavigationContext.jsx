import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollSpy from '../hooks/useScrollSpy';

const NavigationContext = createContext(null);

// Storage key for persisting docked state
const STORAGE_KEY = 'devlog_nav_docked';

// Pages that support the TOC overlay behavior
const OVERLAY_PAGES = ['/', '/my-journey'];

/**
 * NavigationProvider - Manages navigation state for TOC overlay/dock behavior
 * 
 * Provides:
 * - isDocked: whether the nav has been docked to sidebar
 * - setDocked: function to dock/undock the nav
 * - activeSectionId: currently visible section
 * - scrollToSection: function to scroll to a section
 * - sections: current page's sections
 * - supportsOverlay: whether current page supports overlay mode
 */
export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [isDocked, setIsDocked] = useState(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) === '1';
    }
    return false;
  });

  const [sections, setSections] = useState([]);

  // Check if current page supports overlay mode
  const supportsOverlay = useMemo(() => 
    OVERLAY_PAGES.includes(location.pathname),
    [location.pathname]
  );

  // Get section IDs for scroll spy
  const sectionIds = useMemo(() => 
    sections.map(s => s.id),
    [sections]
  );

  // Use scroll spy hook
  const { activeSectionId, scrollToSection, setActiveSectionId } = useScrollSpy(sectionIds);

  // Persist docked state
  const setDocked = useCallback((value) => {
    setIsDocked(value);
    if (typeof window !== 'undefined') {
      if (value) {
        localStorage.setItem(STORAGE_KEY, '1');
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Handle section selection (dock + scroll)
  const handleSelectSection = useCallback((id) => {
    scrollToSection(id);
    if (!isDocked && supportsOverlay) {
      setDocked(true);
    }
  }, [scrollToSection, isDocked, supportsOverlay, setDocked]);

  // Reset docked state when navigating away from overlay pages
  useEffect(() => {
    if (!supportsOverlay) {
      // Don't reset - keep docked preference for when user returns
    }
  }, [supportsOverlay]);

  const value = useMemo(() => ({
    isDocked,
    setDocked,
    activeSectionId,
    scrollToSection: handleSelectSection,
    setActiveSectionId,
    sections,
    setSections,
    supportsOverlay
  }), [isDocked, setDocked, activeSectionId, handleSelectSection, setActiveSectionId, sections, supportsOverlay]);

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
