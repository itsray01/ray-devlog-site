import { useRef, useEffect, useState, useCallback } from 'react';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const cssLengthToPx = (value, { rootFontSizePx, viewportWidthPx, viewportHeightPx }) => {
  if (value == null) return 0;
  const raw = String(value).trim();
  if (!raw) return 0;

  // Handle plain number (assume px)
  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);

  // Quick path for px
  if (raw.endsWith('px')) return parseFloat(raw) || 0;
  if (raw.endsWith('vh')) return ((parseFloat(raw) || 0) / 100) * viewportHeightPx;
  if (raw.endsWith('vw')) return ((parseFloat(raw) || 0) / 100) * viewportWidthPx;
  if (raw.endsWith('rem')) return (parseFloat(raw) || 0) * rootFontSizePx;

  // Unsupported / complex values like calc(): best-effort fallback to 0
  return 0;
};

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
 * @param {string} description - Description text to display above frames
 * @param {Array} items - Array of items to render
 * @param {Function} renderItem - Function to render each item
 * @param {string} id - Section ID for anchoring
 */
const ScrollDrivenFilmstrip = ({ title, description, items = [], renderItem, id }) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const stickyRef = useRef(null);
  const viewportRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(null);

  // Compute the required section height based on horizontal scroll distance
  const computeHeight = useCallback(() => {
    const scroller = scrollerRef.current;
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    if (!scroller || !viewport || !sticky) return;

    // Skip dynamic height on mobile or reduced motion
    if (isMobile || isReducedMotion) {
      setSectionHeight(null);
      scroller.style.removeProperty('--filmstrip-pad-left');
      scroller.style.removeProperty('--filmstrip-pad-right');
      return;
    }

    // Calculate side padding to center first/last frames.
    // Frames can have different widths, so compute left/right separately.
    const frames = scroller.querySelectorAll('.scroll-driven-filmstrip__frame');
    const firstFrame = frames?.[0];
    const lastFrame = frames?.[frames.length - 1];
    if (!firstFrame || !lastFrame) return;

    // Use the visible filmstrip viewport width (NOT the sticky wrapper)
    const viewportWidth = viewport.clientWidth;
    const firstFrameWidth = firstFrame.offsetWidth;
    const lastFrameWidth = lastFrame.offsetWidth;

    const padLeft = Math.max(0, (viewportWidth - firstFrameWidth) / 2);
    const padRight = Math.max(0, (viewportWidth - lastFrameWidth) / 2);
    scroller.style.setProperty('--filmstrip-pad-left', `${padLeft}px`);
    scroller.style.setProperty('--filmstrip-pad-right', `${padRight}px`);

    // Force a reflow before measuring scrollWidth (padding affects scrollWidth)
    scroller.getBoundingClientRect();

    // Measure horizontal travel distance AFTER padding is applied (padding changes scrollWidth)
    const maxScroll = scroller.scrollWidth - viewportWidth;
    
    // Height math: keep pinned until last frame
    // stickyRange = sectionHeight - stickyHeight - stickyTopPx
    // We need: stickyRange == maxScroll  => sectionHeight = maxScroll + stickyHeight + stickyTopPx
    const rootFontSizePx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const stickyTop = getComputedStyle(sticky).top;
    const stickyTopPx = cssLengthToPx(stickyTop, {
      rootFontSizePx,
      viewportWidthPx: window.innerWidth,
      viewportHeightPx: window.innerHeight,
    });
    const stickyHeightPx = sticky.getBoundingClientRect().height;

    const newHeight = maxScroll + stickyHeightPx + stickyTopPx;
    
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
    const viewport = viewportRef.current;
    const sticky = stickyRef.current;
    if (!scroller || !viewport || !sticky) return;

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
      resizeObserver.observe(viewport);
      resizeObserver.observe(sticky);
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
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    if (!container || !scroller || !viewport || !sticky) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();

        // Measure maxScroll AFTER padding is applied
        const maxScroll = scroller.scrollWidth - viewport.clientWidth;
        if (maxScroll <= 0) {
          scroller.style.transform = 'translateX(0px)';
          rafId = null;
          return;
        }

        // Progress starts when container top reaches stickyTopPx (pinned start)
        const rootFontSizePx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const stickyTop = getComputedStyle(sticky).top;
        const stickyTopPx = cssLengthToPx(stickyTop, {
          rootFontSizePx,
          viewportWidthPx: window.innerWidth,
          viewportHeightPx: window.innerHeight,
        });

        // raw = (stickyTopPx - containerTop) / maxScroll
        const raw = (stickyTopPx - containerRect.top) / maxScroll;
        const progress = clamp(raw, 0, 1);

        // Translate scroller horizontally based on progress
        const clampedTranslateX = -clamp(progress * maxScroll, 0, maxScroll);
        scroller.style.transform = `translateX(${clampedTranslateX}px)`;

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

  return (
    <section
      id={id}
      className="scroll-driven-filmstrip"
      ref={containerRef}
      style={sectionHeight ? { minHeight: `${sectionHeight}px` } : undefined}
    >
      <div className="scroll-driven-filmstrip__sticky" ref={stickyRef}>
        <div className="scroll-driven-filmstrip__headerArea">
          <h2 className="scroll-driven-filmstrip__title">{title}</h2>
          {description && <p className="scroll-driven-filmstrip__caption">{description}</p>}
        </div>

        <div className="scroll-driven-filmstrip__viewport" ref={viewportRef}>
          {/* Horizontal scroller with frames */}
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
      </div>
    </section>
  );
};

export default ScrollDrivenFilmstrip;
