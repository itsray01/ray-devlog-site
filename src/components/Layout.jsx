import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import useViewport from '../hooks/useViewport';

/**
 * Layout component that wraps all pages
 * Provides consistent sidebar navigation with responsive viewport detection
 * Auto-adjusts layout based on screen size for optimal viewing experience
 */
const Layout = () => {
  const { isMobile, isTablet, isDesktop, width } = useViewport();

  // Calculate dynamic dimensions based on viewport
  const sidebarWidth = isMobile ? 0 : 200;
  const contentPadding = isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem';
  const maxContentWidth = isDesktop ? '1400px' : '100%';

  return (
    <div className="app-container">
      {!isMobile && <Sidebar />}
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
      
      {/* Mobile indicator - can be replaced with mobile nav later */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--panel-glass)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--glass-border)',
          padding: '0.75rem',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.85rem',
          color: 'var(--muted)',
          gap: '0.5rem'
        }}>
          <span>📱</span>
          <span>Mobile View ({width}px)</span>
        </div>
      )}
    </div>
  );
};

export default Layout;
