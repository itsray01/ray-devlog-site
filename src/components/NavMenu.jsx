import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NavMenu - Shared navigation menu component
 * Used in both overlay (TOC) and docked (Sidebar/NavDock/Mobile) modes
 *
 * @param {Array} sections - Array of { id, title } objects
 * @param {string} activeSectionId - Currently active section ID
 * @param {function} onSelect - Callback when a section is selected
 * @param {string} mode - 'overlay' | 'docked'
 * @param {string} className - Additional CSS classes
 */
const NavMenu = ({
  sections = [],
  activeSectionId = '',
  onSelect,
  mode = 'overlay',
  className = ''
}) => {
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e, index) => {
    const items = itemRefs.current.filter(Boolean);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % items.length;
        items[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + items.length) % items.length;
        items[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect?.(sections[index].id);
        break;
      default:
        break;
    }
  }, [sections, onSelect]);

  // Focus first item when overlay opens
  useEffect(() => {
    if (mode === 'overlay' && itemRefs.current[0]) {
      // Small delay to ensure animation has started
      const timer = setTimeout(() => {
        itemRefs.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  // Animation variants based on mode
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === 'overlay' ? 0.05 : 0.03,
        delayChildren: mode === 'overlay' ? 0.1 : 0
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: mode === 'overlay' ? 0 : -10,
      y: mode === 'overlay' ? 10 : 0
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <motion.ul
      ref={listRef}
      className={`nav-menu nav-menu--${mode} ${className}`}
      variants={listVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="menu"
      aria-label="Page sections"
    >
      {sections.map((section, index) => (
        <motion.li
          key={section.id}
          variants={itemVariants}
          role="none"
        >
          <button
            ref={el => itemRefs.current[index] = el}
            type="button"
            className={`nav-menu__item ${activeSectionId === section.id ? 'nav-menu__item--active' : ''}`}
            onClick={() => onSelect?.(section.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="menuitem"
            aria-current={activeSectionId === section.id ? 'location' : undefined}
            tabIndex={0}
            data-nav-item
            data-nav-key={section.id}
            data-nav-index={index}
          >
            <span className="nav-menu__indicator" aria-hidden="true" />
            <span className="nav-menu__text">{section.title}</span>
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default NavMenu;
