import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavOverlay from './NavOverlay';
import MobileNav from './MobileNav';
import { NavigationProvider } from '../context/NavigationContext';
import useViewport from '../hooks/useViewport';

/**
 * Layout component that wraps all pages
 * Provides consistent sidebar navigation with responsive viewport detection
 * Auto-adjusts layout based on screen size for optimal viewing experience
 */
const Layout = () => {
  const { isMobile, isTablet, isDesktop, width } = useViewport();

  // Calculate dynamic dimensions based on viewport
  const sidebarWidth = isMobile ? 0 : 260;
  const contentPadding = isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem';
  const maxContentWidth = isDesktop ? '1400px' : '100%';

  return (
    <NavigationProvider>
      <div className="app-container">
        {!isMobile && <Sidebar />}
        
        {/* TOC Overlay - shows on Home/MyJourney initial load */}
        <NavOverlay />
        
        <div 
          className="main-content"
          style={{
            marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
            width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
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
    </NavigationProvider>
  );
};

export default Layout;
