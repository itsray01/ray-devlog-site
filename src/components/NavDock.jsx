import { useRef } from 'react';
import NavMenu from './NavMenu';
import { useNavigation } from '../context/NavigationContext';

/**
 * NavDock - Bottom-left docked navigation component
 * Displayed after TOC overlay transitions to docked state
 * Always mounted on overlay pages so we can measure end positions for GSAP flight
 */
const NavDock = () => {
  const dockRef = useRef(null);
  const { 
    introPhase,
    sections, 
    activeSectionId, 
    scrollToSection,
    supportsOverlay 
  } = useNavigation();

  // Only render on overlay-supported pages with sections
  if (!supportsOverlay || sections.length === 0) {
    return null;
  }

  // Visibility: hidden during preload/toc, visible when docked or transitioning (for GSAP measurement)
  const isVisible = introPhase === 'docked';
  const isTransitioning = introPhase === 'transitioning';

  return (
    <div
      ref={dockRef}
      className={`nav-dock ${isVisible ? 'nav-dock--visible' : 'nav-dock--hidden'} ${isTransitioning ? 'nav-dock--transitioning' : ''}`}
      data-nav-dock-root
    >
      {/* Always render NavMenu so GSAP can measure positions during transition */}
      <div 
        className="nav-dock__inner"
        style={{ 
          // During transitioning, keep visible but let GSAP handle individual item opacity
          visibility: (isVisible || isTransitioning) ? 'visible' : 'hidden',
          // Keep layout for measurement but hide visually until docked
          opacity: isVisible ? 1 : 0 
        }}
      >
        <div className="nav-dock__label">Contents</div>
        <NavMenu
          sections={sections}
          activeSectionId={activeSectionId}
          onSelect={scrollToSection}
          mode="docked"
        />
      </div>
    </div>
  );
};

export default NavDock;
