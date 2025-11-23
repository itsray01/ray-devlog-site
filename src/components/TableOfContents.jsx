import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';

// Offset in pixels from top of viewport for scroll positioning
const SCROLL_OFFSET = 140;

/**
 * Get the scroll container - either a custom container or window
 */
function getScrollContainer() {
  const el = document.querySelector('[data-scroll-root]');
  return el || window;
}

/**
 * Scroll to an element by ID with offset
 */
function scrollToId(id, options = {}) {
  console.log('[TOC] scrollToId', id);

  if (!id) return;
  const target = document.getElementById(id);
  if (!target) {
    console.warn('[TOC] no element with id', id);
    return;
  }

  const scrollContainer = getScrollContainer();
  const rect = target.getBoundingClientRect();

  // Use scrollIntoView (which works in this codebase) then adjust for offset
  console.log('[TOC] using scrollIntoView then adjusting by', -SCROLL_OFFSET);

  target.scrollIntoView({ behavior: 'instant', block: 'start' });

  // Adjust for the offset after scrollIntoView completes
  window.scrollBy(0, -SCROLL_OFFSET);

  console.log('[TOC] final scrollY:', window.scrollY);
}

/**
 * TableOfContents - Collapsible dropdown navigation for long pages
 *
 * @param {Array} sections - Array of {id, title} objects
 */
const TableOfContents = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Handle initial hash when the page first loads
  useEffect(() => {
    const initialHash = window.location.hash?.slice(1);
    if (initialHash) {
      console.log('[TOC] initial hash detected:', initialHash);
      // Wait for content to render
      const timer = setTimeout(() => {
        scrollToId(initialHash, { smooth: false });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle manual hash changes (if user edits URL)
  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash?.slice(1);
      console.log('[TOC] hash changed to:', id);
      scrollToId(id);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      }
    );

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleItemClick = (id) => {
    console.log('[TOC] click', id);

    // Update URL hash first
    const { pathname, search } = window.location;
    const newUrl = `${pathname}${search}#${id}`;
    window.history.replaceState(null, '', newUrl);

    // Scroll IMMEDIATELY before any state changes
    scrollToId(id);

    // Then close the dropdown
    setIsOpen(false);
  };

  return (
    <motion.nav
      className="table-of-contents toc-dropdown"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      aria-label="Table of contents"
    >
      <button
        type="button"
        className="toc-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="toc-list"
      >
        <span className="toc-toggle-text">Contents</span>
        <motion.span
          className="toc-toggle-icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <IconChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="toc-list"
            className="toc-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {sections.map(({ id, title }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`toc-link ${activeSection === id ? 'active' : ''}`}
                  onClick={() => handleItemClick(id)}
                  aria-current={activeSection === id ? 'location' : undefined}
                >
                  {title}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default TableOfContents;
