import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Map, BookOpen, Info, Package, Sparkles } from 'lucide-react';
import NavMenu from './NavMenu';
import { useNavigation } from '../context/NavigationContext';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/my-journey', label: 'My Journey', icon: Map },
  { path: '/theories', label: 'Theories', icon: BookOpen },
  { path: '/about', label: 'About', icon: Info },
  { path: '/assets', label: 'Assets', icon: Package },
  { path: '/extras', label: 'Extras', icon: Sparkles }
];

/**
 * SimpleMobileLink - Mobile link without magnetic effect
 */
const SimpleMobileLink = ({ to, isActive, icon: Icon, label, onClick, className }) => {
  const linkRef = useRef(null);

  return (
    <Link
      ref={linkRef}
      to={to}
      className={`${className} ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {Icon && <Icon size={20} />}
      {label && <span>{label}</span>}
    </Link>
  );
};

/**
 * MobileNav - Bottom navigation bar + slide-out menu for mobile
 */
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {
    sections,
    activeSectionId,
    scrollToSection,
    supportsOverlay,
    setDocked
  } = useNavigation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Handle escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  // Handle section selection from mobile menu
  const handleSectionSelect = (id) => {
    scrollToSection(id);
    setDocked(true);
    setIsOpen(false);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      x: '-100%',
      transition: { type: 'spring', damping: 30, stiffness: 300 }
    },
    open: {
      x: 0,
      transition: { type: 'spring', damping: 30, stiffness: 300 }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="mobile-nav-bar" aria-label="Mobile navigation">
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
        >
          <Menu size={24} />
          <span>Menu</span>
        </button>

        {/* Quick links */}
        <div className="mobile-nav-quick">
          {navLinks.slice(0, 3).map((link) => (
            <SimpleMobileLink
              key={link.path}
              to={link.path}
              isActive={location.pathname === link.path}
              icon={link.icon}
              className="mobile-nav-quick-link"
            />
          ))}
        </div>
      </nav>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-nav-backdrop"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="mobile-nav-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Header */}
              <div className="mobile-nav-header">
                <span className="mobile-nav-title">Navigation</span>
                <button
                  type="button"
                  className="mobile-nav-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Page Links */}
              <div className="mobile-nav-links">
                {navLinks.map((link) => (
                  <SimpleMobileLink
                    key={link.path}
                    to={link.path}
                    isActive={location.pathname === link.path}
                    icon={link.icon}
                    label={link.label}
                    onClick={() => setIsOpen(false)}
                    className="mobile-nav-link"
                  />
                ))}
              </div>

              {/* Section Navigation (if on overlay page) */}
              {supportsOverlay && sections.length > 0 && (
                <div className="mobile-nav-sections">
                  <div className="mobile-nav-sections-label">Sections</div>
                  <NavMenu
                    sections={sections}
                    activeSectionId={activeSectionId}
                    onSelect={handleSectionSelect}
                    mode="docked"
                  />
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
