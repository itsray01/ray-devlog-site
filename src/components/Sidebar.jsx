import { useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sidebarVariants } from '../constants/animations';
import useViewport from '../hooks/useViewport';
import NavMenu from './NavMenu';
import { useNavigation } from '../context/NavigationContext';

// Static data for theories sections (not part of overlay system)
const theoriesSections = [
  { id: 'research-framework', title: 'Research Framework' },
  { id: 'ai-ethics', title: 'AI & Ethics' },
  { id: 'interactive-media', title: 'Interactive Media Theory' },
  { id: 'influences', title: 'Influences' },
  { id: 'course-connection', title: 'Course Connection' }
];

const otherPages = [
  { path: '/about', title: 'About' },
  { path: '/assets', title: 'Assets' },
  { path: '/extras', title: 'Extras' }
];

/**
 * Sidebar component with navigation
 * When on Home/MyJourney and docked, shows the section navigation
 * Otherwise shows hover dropdown navigation
 */
const Sidebar = () => {
  const location = useLocation();
  const { isMobile } = useViewport();
  const { 
    isDocked, 
    sections, 
    activeSectionId, 
    scrollToSection,
    supportsOverlay 
  } = useNavigation();
  
  // Don't render sidebar on mobile (Layout handles mobile navigation)
  if (isMobile) return null;

  // Memoize page checks
  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);
  const isJourneyPage = useMemo(() => location.pathname === '/my-journey', [location.pathname]);
  const isTheoriesPage = useMemo(() => location.pathname === '/theories', [location.pathname]);

  // Show docked section nav when on overlay pages and docked
  const showDockedNav = isDocked && supportsOverlay && sections.length > 0;

  // Handler for theories sections (not part of overlay system)
  const handleTheoriesSectionClick = useCallback((sectionId) => {
    if (!isTheoriesPage) {
      window.location.href = `/theories#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [isTheoriesPage]);

  return (
    <motion.aside 
      className="sidebar"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <div className="sidebar-content">
        {/* Logo */}
        <Link to="/" className="sidebar-logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RAY'S DIGITAL LOGBOOK
          </motion.div>
        </Link>

        {/* Docked Section Navigation (when on Home/MyJourney and docked) */}
        {showDockedNav && (
          <div className="sidebar-docked-nav">
            <div className="sidebar-docked-label">
              {isHomePage ? 'Home' : isJourneyPage ? 'My Journey' : 'Sections'}
            </div>
            <NavMenu
              sections={sections}
              activeSectionId={activeSectionId}
              onSelect={scrollToSection}
              mode="docked"
            />
          </div>
        )}

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            {/* Home Link */}
            <Link
              to="/"
              className={`nav-item nav-item-main ${isHomePage ? 'active' : ''}`}
            >
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%' }}
              >
                <span className="nav-item-text">Home</span>
              </motion.div>
            </Link>

            {/* My Journey Link */}
            <Link
              to="/my-journey"
              className={`nav-item nav-item-main ${isJourneyPage ? 'active' : ''}`}
            >
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%' }}
              >
                <span className="nav-item-text">My Journey</span>
              </motion.div>
            </Link>

            {/* Theories with hover dropdown */}
            <div className="nav-item-container">
              <Link
                to="/theories"
                className={`nav-item nav-item-main ${isTheoriesPage ? 'active' : ''}`}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%' }}
                >
                  <span className="nav-item-text">Theories</span>
                </motion.div>
              </Link>
              
              {/* Hover dropdown */}
              <div className="nav-dropdown">
                <div className="dropdown-content">
                  {theoriesSections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      className="dropdown-item"
                      onClick={() => handleTheoriesSectionClick(section.id)}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="dropdown-bullet">•</span>
                      <span className="dropdown-text">{section.title}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Pages */}
            {otherPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`nav-item nav-item-main ${location.pathname === page.path ? 'active' : ''}`}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%' }}
                >
                  <span className="nav-item-text">{page.title}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer in sidebar */}
        <div className="sidebar-footer">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>© 2025 Digital Project</p>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="sidebar-gradient"></div>
    </motion.aside>
  );
};

export default Sidebar;
