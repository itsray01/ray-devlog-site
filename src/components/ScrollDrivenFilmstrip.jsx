import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * ScrollDrivenFilmstrip - Vertical scroll drives horizontal movement (pinned)
 * 
 * Desktop: Pins container and translates frames horizontally based on scroll progress
 * Mobile: Falls back to overflow-x scroll-snap
 * 
 * The section height is computed DYNAMICALLY so that the vertical scroll "budget"
 * exactly matches the horizontal scroll distance, allowing progress to reach 1.0.
 * 
 * @param {string} title - Section title
 * @param {Array} items - Array of items to render
 * @param {Function} renderItem - Function to render each item
 * @param {string} id - Section ID for anchoring
 */
const ScrollDrivenFilmstrip = ({ title, items = [], renderItem, id }) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const viewportRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(null);

  // Compute the required section height based on horizontal scroll distance
  const computeHeight = useCallback(() => {
    const scroller = scrollerRef.current;
    const viewport = viewportRef.current;
    if (!scroller || !viewport) return;

    // Skip dynamic height on mobile or reduced motion
    if (isMobile || isReducedMotion) {
      setSectionHeight(null);
      return;
    }

    // Measure horizontal travel distance
    // Use viewport.clientWidth for the visible area, scroller.scrollWidth for total content
    const horizontalDistance = scroller.scrollWidth - viewport.clientWidth;
    
    // Set section height so vertical scroll budget matches horizontal distance
    // Formula: sectionHeight = horizontalDistance + window.innerHeight
    // This ensures: scrollRange (containerHeight - windowHeight) == horizontalDistance
    const newHeight = horizontalDistance + window.innerHeight;
    
    setSectionHeight(newHeight > window.innerHeight ? newHeight : null);
  }, [isMobile, isReducedMotion]);

  // Check for mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Compute height on mount, resize, and when scroller size changes
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Initial computation
    computeHeight();

    // Recompute on window resize
    const handleResize = () => {
      computeHeight();
    };
    window.addEventListener('resize', handleResize);

    // Use ResizeObserver to detect scroller size changes (e.g., images loading)
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        computeHeight();
      });
      resizeObserver.observe(scroller);
    }

    // Also recompute after a short delay to catch late image layout
    const delayedCompute = setTimeout(computeHeight, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout(delayedCompute);
    };
  }, [computeHeight, items]);

  // Handle image load events to recompute height
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleImageLoad = () => {
      computeHeight();
    };

    // Listen for load events on images within the scroller
    scroller.addEventListener('load', handleImageLoad, true);

    return () => {
      scroller.removeEventListener('load', handleImageLoad, true);
    };
  }, [computeHeight]);

  // Main scroll-driven animation effect
  useEffect(() => {
    // Skip pinning on mobile or if reduced motion
    if (isMobile || isReducedMotion) return;

    const container = containerRef.current;
    const scroller = scrollerRef.current;
    const viewport = viewportRef.current;
    if (!container || !scroller || !viewport) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const scrollerWidth = scroller.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        const maxScroll = scrollerWidth - viewportWidth;
        const windowHeight = window.innerHeight;

        // The scroll "budget" is the extra height beyond the viewport
        const scrollBudget = containerHeight - windowHeight;

        // Handle edge cases
        if (scrollBudget <= 0 || maxScroll <= 0) {
          scroller.style.transform = 'translateX(0px)';
          rafId = null;
          return;
        }

        // Calculate progress based on how much the section top has scrolled past viewport top
        // rect.top = 0 means section top is at viewport top (progress = 0)
        // rect.top = -scrollBudget means we've scrolled through the full budget (progress = 1)
        const rawProgress = -rect.top / scrollBudget;
        const progress = Math.max(0, Math.min(1, rawProgress));

        // Translate scroller horizontally based on progress
        const translateX = -(progress * maxScroll);
        scroller.style.transform = `translateX(${translateX}px)`;

        rafId = null;
      });
    };

    // Listen on BOTH window and document.body to handle different scroll container setups
    // Some pages have body as the scroll container (overflow-y: auto on body)
    // Others use the default window/document scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile, isReducedMotion]);

  // Inline style for dynamic section height (overrides CSS min-height)
  const sectionStyle = sectionHeight
    ? { minHeight: `${sectionHeight}px` }
    : undefined;

  return (
    <section
      id={id}
      className="scroll-driven-filmstrip"
      ref={containerRef}
      style={sectionStyle}
    >
      <div className="scroll-driven-filmstrip__header">
        <h2>{title}</h2>
      </div>

      <div className="scroll-driven-filmstrip__viewport" ref={viewportRef}>
        <div
          ref={scrollerRef}
          className="scroll-driven-filmstrip__scroller"
          style={isMobile || isReducedMotion ? {} : { willChange: 'transform' }}
        >
          {items.map((item) => (
            <div key={item.id} className="scroll-driven-filmstrip__frame">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollDrivenFilmstrip;
