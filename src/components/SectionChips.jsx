import { useState, useEffect } from 'react';

/**
 * SectionChips component for navigation between sections
 * Replicates the functionality from the original home.js
 */
const SectionChips = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState('');

  // Smooth scroll to section and update active state
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      setActiveSection(sectionId);
      
      // Update URL hash without triggering page reload
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  // Intersection Observer for scrollspy functionality
  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-40% 0px -50% 0px', 
        threshold: 0.01 
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle initial hash if present in URL
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'instant' });
          setActiveSection(hash);
        }, 0);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return (
    <div id="sections-bar">
      <div className="sections-wrap" id="section-chips">
        {sections.map((section) => {
          // Get section title from data-title attribute or h2 text
          const element = document.getElementById(section.id);
          const title = element?.getAttribute('data-title') || 
                       element?.querySelector('h2')?.textContent || 
                       section.id;

          return (
            <button
              key={section.id}
              className={`section-chip ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionChips;
