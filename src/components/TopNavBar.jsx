import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigation } from '../context/NavigationContext';

/**
 * SimpleLink - Link without magnetic effect
 */
const SimpleLink = ({ to, className, isActive, children }) => {
  const linkRef = useRef(null);

  return (
    <Link
      ref={linkRef}
      to={to}
      className={`top-nav-link ${isActive ? 'active' : ''}`}
    >
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.div>
    </Link>
  );
};

/**
 * TopNavBar - Persistent top navigation bar
 * Always visible across all pages to show available site navigation
 * Minimal and semi-transparent to not compete with page content
 */
const TopNavBar = () => {
  const location = useLocation();
  const { introPhase } = useNavigation();
  const logoRef = useRef(null);

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/my-journey', label: 'My Journey' },
    { path: '/theories', label: 'Theories' },
    { path: '/assets', label: 'Assets' },
    { path: '/about', label: 'About' },
    { path: '/extras', label: 'Extras' }
  ];

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Dim the bar slightly during TOC overlay to keep focus on the overlay
  const isDimmed = introPhase === 'toc';

  // Animation variants
  const barVariants = {
    hidden: {
      y: -80,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: isDimmed ? 0.6 : 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        delay: 0.2
      }
    }
  };

  return (
    <motion.nav
      className="top-nav-bar"
      variants={barVariants}
      initial="hidden"
      animate="visible"
      style={{
        opacity: isDimmed ? 0.6 : 1,
        transition: 'opacity 0.3s ease'
      }}
    >
      <div className="top-nav-content">
        {/* Logo */}
        <Link to="/" className="top-nav-logo">
          <motion.div
            ref={logoRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RAY'S DIGITAL LOGBOOK
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <div className="top-nav-links">
          {navLinks.map((link) => (
            <SimpleLink
              key={link.path}
              to={link.path}
              isActive={isActive(link.path)}
            >
              {link.label}
            </SimpleLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNavBar;
