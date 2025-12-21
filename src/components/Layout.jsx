import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavOverlay from './NavOverlay';
import NavDock from './NavDock';
import IntroSequence from './IntroSequence';
import MobileNav from './MobileNav';
import TopNavBar from './TopNavBar';
import { NavigationProvider, useNavigation } from '../context/NavigationContext';
import useViewport from '../hooks/useViewport';

/**
 * LayoutContent - Inner component that uses navigation context
 * Separated to access context after NavigationProvider is mounted
 */
const LayoutContent = () => {
  const { isMobile, isTablet, isDesktop } = useViewport();
  const { supportsOverlay, introPhase, finishIntro } = useNavigation();

  // Calculate dynamic dimensions based on viewport
  // When on overlay pages, hide sidebar to make room for dock
  const sidebarWidth = isMobile || supportsOverlay ? 0 : 260;
  const contentPadding = isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem';
  const maxContentWidth = isDesktop ? '1400px' : '100%';

  return (
    <div className="app-container">
      {/* Top Navigation Bar - always visible on desktop */}
      {!isMobile && <TopNavBar />}

      {/* Stage 1: Preload intro sequence - fullscreen black with geometric animation */}
      {supportsOverlay && introPhase === 'preload' && (
        <IntroSequence onDone={finishIntro} />
      )}

      {/* Traditional Sidebar - only shown on non-overlay pages */}
      {!isMobile && !supportsOverlay && <Sidebar />}

      {/* Stage 2: TOC Overlay - shows after intro, before docking */}
      {supportsOverlay && <NavOverlay />}

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
          <Outlet />
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
