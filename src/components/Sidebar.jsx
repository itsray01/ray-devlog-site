import { useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarVariants, dropdownVariants } from '../constants/animations';

// Fixed import error - useMemo and useCallback must come from 'react', not 'react-router-dom'

// Static data - moved outside component to prevent recreation
const homeSections = [
  { id: 'overview', title: 'Project Overview' },
  { id: 'inspiration', title: 'Inspiration' },
  { id: 'moodboard', title: 'Moodboard' },
  { id: 'storyboard', title: 'Storyboard' },
  { id: 'timeline', title: 'Project Timeline' },
  { id: 'story-development', title: 'Story Development' },
  { id: 'branching', title: 'Branching Narrative' },
  { id: 'experiments', title: 'Technical Experiments' },
  { id: 'audience', title: 'Audience & Accessibility' },
  { id: 'production', title: 'Production & Reflection' },
  { id: 'references', title: 'References' }
];

const otherPages = [
  { path: '/assets', title: 'Assets' },
  { path: '/about', title: 'About' },
  { path: '/extras', title: 'Extras' }
];

/**
 * Sidebar component with hover dropdown navigation
 * Shows page links with hover dropdown for Home sections
 * Optimized with useMemo and useCallback
 */
const Sidebar = () => {
  const location = useLocation();

  // Memoize home page check
  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);

  // Memoize section click handler
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
            DIGITAL LOGBOOK
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

