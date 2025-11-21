import { useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarVariants, dropdownVariants } from '../constants/animations';
import useViewport from '../hooks/useViewport';

// Fixed import error - useMemo and useCallback must come from 'react', not 'react-router-dom'

// Static data - moved outside component to prevent recreation
const homeSections = [
  { id: 'overview', title: 'Project Overview' },
  { id: 'inspiration', title: 'Inspiration' },
  { id: 'moodboard', title: 'Moodboard' },
  { id: 'storyboard', title: 'Storyboard' },
  { id: 'story-development', title: 'Story Development' },
  { id: 'branching', title: 'Branching Narrative' },
  { id: 'production', title: 'Production & Reflection' }
];

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
 * Sidebar component with hover dropdown navigation
 * Shows page links with hover dropdown for Home sections
 * Auto-hides on mobile devices (handled by Layout)
 * Optimized with useMemo and useCallback
 */
const Sidebar = () => {
  const location = useLocation();
  const { isMobile } = useViewport();
  
  // Don't render sidebar on mobile (Layout handles mobile navigation)
  if (isMobile) return null;

  // Memoize page checks
  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);
  const isTheoriesPage = useMemo(() => location.pathname === '/theories', [location.pathname]);

  // Memoize section click handler for Home sections
  const handleSectionClick = useCallback((sectionId) => {
    if (!isHomePage) {
      // Navigate to home first, then scroll
      window.location.href = '/';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [isHomePage]);

  // Memoize section click handler for Theories sections
  const handleTheoriesSectionClick = useCallback((sectionId) => {
    if (!isTheoriesPage) {
      // Navigate to theories first, then scroll
      window.location.href = `/theories#${sectionId}`;
    } else {
      // Just scroll
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
            Ray's Digital Logbook
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            {/* Home with hover dropdown */}
            <div className="nav-item-container">
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
              
              {/* Hover dropdown */}
              <div className="nav-dropdown">
                <div className="dropdown-content">
                  {homeSections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      className="dropdown-item"
                      onClick={() => handleSectionClick(section.id)}
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

            {/* My Journey Page */}
            <Link
              to="/my-journey"
              className={`nav-item nav-item-main ${location.pathname === '/my-journey' ? 'active' : ''}`}
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

