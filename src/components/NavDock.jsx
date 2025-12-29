import { useRef } from 'react';
import NavMenu from './NavMenu';
import { useNavigationActions, useNavigationScroll, useNavigationState } from '../context/NavigationContext';
import useSfx from '../hooks/useSfx';

/**
 * NavDock - Bottom-left docked navigation component
 * Displayed after TOC overlay transitions to docked state
 * Always mounted on overlay pages so we can measure end positions for GSAP flight
 * 
 * Style: Hybrid A+C - Terminal structure with sliding selector bar
 */
const NavDock = () => {
  const dockRef = useRef(null);
  const { introPhase, sections, supportsOverlay } = useNavigationState();
  const { activeSectionId } = useNavigationScroll();
  const { scrollToSection } = useNavigationActions();

  // SFX hook for hover sounds
  const { playHover } = useSfx();

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
      className={`nav-dock nav-dock--terminal ${isVisible ? 'nav-dock--visible' : 'nav-dock--hidden'} ${isTransitioning ? 'nav-dock--transitioning' : ''}`}
      data-nav-dock-root
    >
      {/* Subtle scanline overlay */}
      <div className="nav-dock__scanlines" aria-hidden="true" />
      
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
        <div className="nav-dock__header">
          <h3 className="nav-dock__label">CONTENTS</h3>
        </div>
        
        <NavMenu
          sections={sections}
          activeSectionId={activeSectionId}
          onSelect={scrollToSection}
          onHover={playHover}
          mode="docked"
        />
      </div>
    </div>
  );
};

export default NavDock;
