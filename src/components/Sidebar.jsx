import { useMemo, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sidebarVariants } from '../constants/animations';
import useViewport from '../hooks/useViewport';
import NavMenu from './NavMenu';
import { useNavigationActions, useNavigationScroll, useNavigationState } from '../context/NavigationContext';

const researchSections = [
  { id: 'research-framework', title: 'Research Framework' },
  { id: 'ai-ethics', title: 'AI & Ethics' },
  { id: 'interactive-media', title: 'Interactive Media Theory' },
  { id: 'influences', title: 'Influences' },
  { id: 'course-connection', title: 'Course Connection' }
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
  const { isDocked, sections, supportsOverlay } = useNavigationState();
  const { activeSectionId } = useNavigationScroll();
  const { scrollToSection } = useNavigationActions();
  const logoRef = useRef(null);

  // Don't render sidebar on mobile (Layout handles mobile navigation)
  if (isMobile) return null;

  // Memoize page checks
  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);
  const isProcessPage = useMemo(() => location.pathname === '/process', [location.pathname]);
  const isDiaryPage = useMemo(() => location.pathname === '/diary', [location.pathname]);
  const isResearchPage = useMemo(() => location.pathname === '/research', [location.pathname]);

  // Show docked section nav when on overlay pages and docked
  const showDockedNav = isDocked && supportsOverlay && sections.length > 0;

  // Handler for theories sections (not part of overlay system)
  const handleResearchSectionClick = useCallback((sectionId) => {
    if (!isResearchPage) {
      window.location.href = `/research#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [isResearchPage]);

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
              {isHomePage ? 'Home' : isProcessPage ? 'Process' : isDiaryPage ? 'Diary' : 'Sections'}
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
            <SimpleNavLink to="/" isActive={isHomePage}>
              Home
            </SimpleNavLink>

            <SimpleNavLink to="/process" isActive={isProcessPage}>
              Process
            </SimpleNavLink>

            <SimpleNavLink to="/diary" isActive={isDiaryPage}>
              Diary
            </SimpleNavLink>

            <div className="nav-item-container">
              <SimpleNavLink to="/research" isActive={isResearchPage}>
                Research
              </SimpleNavLink>

              <div className="nav-dropdown">
                <div className="dropdown-content">
                  {researchSections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      className="dropdown-item"
                      onClick={() => handleResearchSectionClick(section.id)}
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

            <SimpleNavLink
              to="/archive"
              isActive={location.pathname === '/archive'}
            >
              Archive
            </SimpleNavLink>

            <SimpleNavLink
              to="/timeline"
              isActive={location.pathname === '/timeline'}
            >
              Timeline
            </SimpleNavLink>
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
