import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NavMenu - Shared navigation menu component
 * Used in both overlay (TOC) and docked (Sidebar/NavDock/Mobile) modes
 *
 * Features:
 * - Keyboard navigation (Up/Down/Enter/Home/End)
 * - Sliding selector highlight bar (layoutId)
 * - Hover and focus states
 * - SFX integration via callbacks
 *
 * @param {Array} sections - Array of { id, title } objects
 * @param {string} activeSectionId - Currently active section ID
 * @param {function} onSelect - Callback when a section is selected
 * @param {string} mode - 'overlay' | 'docked'
 * @param {string} className - Additional CSS classes
 * @param {function} onHover - Callback for hover (for SFX)
 * @param {function} onConfirm - Callback for selection (for SFX)
 * @param {boolean} disabled - Disable interactions (during boot sequence)
 */
const NavMenu = ({
  sections = [],
  activeSectionId = '',
  onSelect,
  mode = 'overlay',
  className = '',
  onHover,
  onConfirm,
  disabled = false
}) => {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  
  // Selection index for keyboard nav and highlight bar
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const activeIdx = sections.findIndex(s => s.id === activeSectionId);
    return activeIdx >= 0 ? activeIdx : 0;
  });

  // Update selected index when activeSectionId changes externally
  useEffect(() => {
    const activeIdx = sections.findIndex(s => s.id === activeSectionId);
    if (activeIdx >= 0) {
      setSelectedIndex(activeIdx);
    }
  }, [activeSectionId, sections]);

  // Handle selection (click or Enter)
  const handleSelect = useCallback((index) => {
    if (disabled) return;
    
    const section = sections[index];
    if (!section) return;
    
    onConfirm?.();
    onSelect?.(section.id);
  }, [sections, onSelect, onConfirm, disabled]);

  // Handle hover - disabled in overlay mode to prevent conflict with keyboard nav
  const handleHover = useCallback((index) => {
    if (disabled || mode === 'overlay') return;
    
    setSelectedIndex(index);
    onHover?.();
  }, [onHover, disabled, mode]);

  // Handle keyboard navigation (only on the button level to avoid double-firing)
  const handleItemKeyDown = useCallback((e, index) => {
    if (disabled) return;
    
    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        const nextIndex = (index + 1) % sections.length;
        setSelectedIndex(nextIndex);
        itemRefs.current[nextIndex]?.focus();
        onHover?.();
        break;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        const prevIndex = (index - 1 + sections.length) % sections.length;
        setSelectedIndex(prevIndex);
        itemRefs.current[prevIndex]?.focus();
        onHover?.();
        break;
      case 'Home':
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex(0);
        itemRefs.current[0]?.focus();
        onHover?.();
        break;
      case 'End':
        e.preventDefault();
        e.stopPropagation();
        const lastIdx = sections.length - 1;
        setSelectedIndex(lastIdx);
        itemRefs.current[lastIdx]?.focus();
        onHover?.();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        e.stopPropagation();
        handleSelect(index);
        break;
      default:
        break;
    }
  }, [sections, handleSelect, onHover, disabled]);

  // Focus first item when overlay opens
  useEffect(() => {
    if (mode === 'overlay' && !disabled && itemRefs.current[selectedIndex]) {
      // Small delay to ensure animation has started
      const timer = setTimeout(() => {
        itemRefs.current[selectedIndex]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mode, disabled, selectedIndex]);

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

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
      {sections.map((section, index) => {
        const isSelected = index === selectedIndex;
        const isActive = activeSectionId === section.id;
        
        return (
          <motion.li
            key={section.id}
            variants={itemVariants}
            role="none"
            className="nav-menu__item-wrapper"
          >
            {/* Sliding selector highlight bar - only in overlay mode */}
            {mode === 'overlay' && isSelected && !prefersReducedMotion && (
              <motion.div
                className="nav-menu__selector"
                layoutId="nav-selector"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35
                }}
              />
            )}
            
            <button
              ref={el => itemRefs.current[index] = el}
              type="button"
              className={`nav-menu__item ${isActive ? 'nav-menu__item--active' : ''} ${isSelected ? 'nav-menu__item--selected' : ''}`}
              onClick={() => handleSelect(index)}
              onKeyDown={(e) => handleItemKeyDown(e, index)}
              role="menuitem"
              aria-current={isActive ? 'location' : undefined}
              tabIndex={isSelected ? 0 : -1}
              disabled={disabled}
              data-nav-item
              data-nav-key={section.id}
              data-nav-index={index}
            >
              <span className="nav-menu__indicator" aria-hidden="true" />
              <span className="nav-menu__text">{section.title}</span>
            </button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default NavMenu;
