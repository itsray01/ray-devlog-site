import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * TableOfContents - Sticky navigation for long pages
 * Automatically highlights active section based on scroll position
 * 
 * @param {Array} sections - Array of {id, title} objects
 */
const TableOfContents = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset from top
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      className="table-of-contents"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      aria-label="Table of contents"
    >
      <h3>Contents</h3>
      <ul className="toc-list">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`toc-link ${activeSection === id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              aria-current={activeSection === id ? 'location' : undefined}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default TableOfContents;

