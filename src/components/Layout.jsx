import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavOverlay from './NavOverlay';
import NavDock from './NavDock';
import IntroSequence from './IntroSequence';
import IntroErrorBoundary from './IntroErrorBoundary';
import RouteErrorBoundary from './RouteErrorBoundary';
import MobileNav from './MobileNav';
import TopNavBar from './TopNavBar';
import PageLoadAnimation from './PageLoadAnimation';
import PageTitleCard from './PageTitleCard';
import { NavigationProvider, useNavigationActions, useNavigationState } from '../context/NavigationContext';
import useViewport from '../hooks/useViewport';

/**
 * LayoutContent - Inner component that uses navigation context
 * Separated to access context after NavigationProvider is mounted
 */
const LayoutContent = () => {
  const location = useLocation();
  const { isMobile, isTablet, isDesktop } = useViewport();
  const { supportsOverlay, supportsHomeIntro, introPhase } = useNavigationState();
  const { finishIntro } = useNavigationActions();

  // Log introPhase changes for debugging (dev only)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[Layout] introPhase changed to:', introPhase);
    }
  }, [introPhase]);

  // Global safety: ensure content is visible on mount (fallback for animation failures)
  useEffect(() => {
    // Wait a moment for animations to initialize
    const revealTimer = setTimeout(() => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        const computedStyle = window.getComputedStyle(mainContent);
        const isHidden = computedStyle.opacity === '0';
        const isIntroPhase = introPhase === 'preload' || introPhase === 'toc';
        
        if (isHidden && !isIntroPhase) {
          if (import.meta.env.DEV) {
            console.warn('[Layout] Content hidden but not in intro phase - forcing visibility');
          }
          mainContent.style.opacity = '1';
          mainContent.style.visibility = 'visible';
          mainContent.style.pointerEvents = 'auto';
        }
      }
    }, 100);

    return () => clearTimeout(revealTimer);
  }, [introPhase]);

  // Calculate dynamic dimensions based on viewport
  // When on overlay pages, hide sidebar to make room for dock
  const sidebarWidth = isMobile || supportsOverlay ? 0 : 260;
  const contentPadding = isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem';
  const maxContentWidth = isDesktop ? '1400px' : '100%';

  return (
    <div className="app-container">
      {/* Page load animation controller */}
      <PageLoadAnimation />
      
      {/* Quick title card for non-home pages */}
      <PageTitleCard />
      
      {/* Top Navigation Bar - always visible on desktop */}
      {!isMobile && <TopNavBar />}

      {/* Stage 1: Preload intro sequence - HOME ONLY */}
      {supportsHomeIntro && introPhase === 'preload' && (
        <IntroErrorBoundary 
          onError={(error) => {
            if (import.meta.env.DEV) {
              console.error('[Layout] IntroSequence crashed, forcing content visible:', error);
            }
            // Force intro to finish and show content
            finishIntro();
          }}
        >
          <IntroSequence onDone={finishIntro} />
        </IntroErrorBoundary>
      )}

      {/* Traditional Sidebar - only shown on non-overlay pages */}
      {!isMobile && !supportsOverlay && <Sidebar />}

      {/* Stage 2: TOC Overlay - HOME ONLY, shows after intro, before docking */}
      {supportsHomeIntro && <NavOverlay />}

      {/* Stage 3: Nav Dock - always mounted on overlay pages for GSAP targeting */}
      {supportsOverlay && <NavDock />}

      <div
        className="main-content"
        style={{
          marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
          marginTop: isMobile ? 0 : '60px', // Account for top nav bar height
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
          minHeight: isMobile ? '100vh' : 'calc(100vh - 60px)',
          padding: contentPadding,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <main style={{
          width: '100%',
          maxWidth: maxContentWidth,
          margin: '0 auto',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <RouteErrorBoundary resetKey={location.pathname}>
            <Outlet />
          </RouteErrorBoundary>
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobile && <MobileNav />}
    </div>
  );
};

/**
 * Layout component that wraps all pages
 * Provides consistent sidebar navigation with responsive viewport detection
 * Auto-adjusts layout based on screen size for optimal viewing experience
 */
const Layout = () => {
  return (
    <NavigationProvider>
      <LayoutContent />
    </NavigationProvider>
  );
};

export default Layout;
