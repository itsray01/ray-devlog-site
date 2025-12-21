import { useRef, useEffect, useState } from 'react';

/**
 * ScrollDrivenFilmstrip - Vertical scroll drives horizontal movement (pinned)
 * 
 * Desktop: Pins container and translates frames horizontally based on scroll progress
 * Mobile: Falls back to overflow-x scroll-snap
 * 
 * @param {string} title - Section title
 * @param {Array} items - Array of items to render
 * @param {Function} renderItem - Function to render each item
 * @param {string} id - Section ID for anchoring
 */
const ScrollDrivenFilmstrip = ({ title, items = [], renderItem, id }) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile and reduced motion
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

  useEffect(() => {
    // Skip pinning on mobile or if reduced motion
    if (isMobile || isReducedMotion) return;

    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const scrollerWidth = scroller.scrollWidth;
        const viewportWidth = scroller.offsetWidth;
        const maxScroll = scrollerWidth - viewportWidth;

        // Calculate progress: when container enters viewport until it leaves
        // Container is "pinned" when rect.top <= 0 and rect.bottom > window.innerHeight
        const start = 0;
        const end = containerHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, (start - rect.top) / end));

        // Translate scroller horizontally based on progress
        const translateX = -(progress * maxScroll);
        scroller.style.transform = `translateX(${translateX}px)`;

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile, isReducedMotion]);

  return (
    <section id={id} className="scroll-driven-filmstrip" ref={containerRef}>
      <div className="scroll-driven-filmstrip__header">
        <h2>{title}</h2>
      </div>

      <div className="scroll-driven-filmstrip__viewport">
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
