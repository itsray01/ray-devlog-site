import { useMemo, useCallback, useRef } from 'react';
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
 * Simple NavLink without animations
 */
const SimpleNavLink = ({ to, isActive, children }) => {
  const linkRef = useRef(null);

  return (
    <Link
      ref={linkRef}
      to={to}
      className={`nav-item nav-item-main ${isActive ? 'active' : ''}`}
    >
      <motion.div
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%' }}
      >
        <span className="nav-item-text">{children}</span>
      </motion.div>
    </Link>
  );
};

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
  const logoRef = useRef(null);

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
            ref={logoRef}
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
            <SimpleNavLink to="/" isActive={isHomePage}>
              Home
            </SimpleNavLink>

            {/* My Journey Link */}
            <SimpleNavLink to="/my-journey" isActive={isJourneyPage}>
              My Journey
            </SimpleNavLink>

            {/* Theories with hover dropdown */}
            <div className="nav-item-container">
              <SimpleNavLink to="/theories" isActive={isTheoriesPage}>
                Theories
              </SimpleNavLink>

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
              <SimpleNavLink
                key={page.path}
                to={page.path}
                isActive={location.pathname === page.path}
              >
                {page.title}
              </SimpleNavLink>
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
