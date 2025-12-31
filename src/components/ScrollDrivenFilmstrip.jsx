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
 * ScrollDrivenFilmstrip - JS-driven pinned horizontal scroller
 * 
 * Desktop: Uses position: fixed pinning to truly "hold" the section.
 * Vertical scroll drives horizontal translateX without visible vertical movement.
 * Page does NOT continue down until horizontal completes (progress = 1.0).
 * 
 * Mobile: Falls back to overflow-x scroll-snap
 * 
 * Pinning states:
 * - Before section: position absolute, top 0
 * - During scroll: position fixed, top 60px (pinned)
 * - After complete: position absolute, top maxTranslate px
 * 
 * @param {string} title - Section title
 * @param {string} description - Description text to display above frames
 * @param {Array} items - Array of items to render
 * @param {Function} renderItem - Function to render each item
 * @param {string} id - Section ID for anchoring
 */

const TOP_OFFSET = 60; // TopNavBar height
const RELEASE_BUFFER_RATIO = 0.15; // 15vh release buffer for smooth transition

const ScrollDrivenFilmstrip = ({ title, description, items = [], renderItem, id }) => {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const scrollerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(null);
  const lastDebugTime = useRef(0);
  const metricsRef = useRef({
    maxTranslate: 0,
    pinnedHeight: 0,
    scrollRange: 0,
    startY: 0,
    endY: 0
  });

  // Compute section height and metrics for pinning
  const computeMetrics = useCallback(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    const scroller = scrollerRef.current;
    if (!container || !pinned || !scroller) return;

    // Skip dynamic height on mobile or reduced motion
    if (isMobile || isReducedMotion) {
      setSectionHeight(null);
      // Reset pinned positioning
      if (pinned) {
        pinned.style.position = '';
        pinned.style.top = '';
        pinned.style.left = '';
        pinned.style.width = '';
      }
      return;
    }

    // Measure horizontal overflow
    // Use container width (section element) rather than pinned width,
    // because pinned may expand with content when position changes
    const containerWidth = container.clientWidth;
    const scrollerWidth = scroller.scrollWidth;
    const maxTranslate = scrollerWidth - containerWidth;

    if (maxTranslate <= 0) {
      // No horizontal overflow - disable pinned behavior
      setSectionHeight(null);
      metricsRef.current = { maxTranslate: 0, pinnedHeight: 0, scrollRange: 0, startY: 0, endY: 0 };
      return;
    }

    // Use actual pinned wrapper height instead of window.innerHeight
    const pinnedHeight = pinned.getBoundingClientRect().height;
    
    // Add a small release buffer (15vh) to prevent harsh snap at section end
    const releaseBuffer = Math.round(window.innerHeight * RELEASE_BUFFER_RATIO);
    
    // Section height = pinned content height + horizontal scroll budget + release buffer
    const newHeight = pinnedHeight + maxTranslate + releaseBuffer;
    
    // Calculate scroll range (how much vertical scroll drives horizontal)
    // scrollRange = sectionHeight - pinnedHeight = maxTranslate + releaseBuffer
    const scrollRange = maxTranslate + releaseBuffer;

    // Calculate scroll boundaries
    const containerRect = container.getBoundingClientRect();
    const startY = window.scrollY + containerRect.top - TOP_OFFSET;
    const endY = startY + scrollRange;

    // Store metrics for scroll handler
    metricsRef.current = { maxTranslate, pinnedHeight, scrollRange, startY, endY };

    setSectionHeight(newHeight);
  }, [isMobile, isReducedMotion]);

  // Check for mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width <= 768;
      setIsMobile(mobile);
    };
    
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile, { passive: true });
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (motionQuery) {
      if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', checkReducedMotion);
      } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(checkReducedMotion);
      }
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (motionQuery) {
        if (typeof motionQuery.removeEventListener === 'function') {
          motionQuery.removeEventListener('change', checkReducedMotion);
        } else if (typeof motionQuery.removeListener === 'function') {
          motionQuery.removeListener(checkReducedMotion);
        }
      }
    };
  }, []);

  // Compute metrics on mount, resize, and when content size changes
  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    const scroller = scrollerRef.current;
    if (!container || !pinned || !scroller) return;

    // Initial computation
    computeMetrics();

    // Recompute on window resize
    const handleResize = () => {
      computeMetrics();
    };
    window.addEventListener('resize', handleResize);

    // Use ResizeObserver to detect size changes (e.g., images loading)
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        computeMetrics();
      });
      resizeObserver.observe(container);
      resizeObserver.observe(pinned);
      resizeObserver.observe(scroller);
    }

    // Also recompute after a short delay to catch late image layout
    const delayedCompute = setTimeout(computeMetrics, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout(delayedCompute);
    };
  }, [computeMetrics, items]);

  // Handle image load events to recompute metrics
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleImageLoad = () => {
      computeMetrics();
    };

    // Listen for load events on images within the scroller
    scroller.addEventListener('load', handleImageLoad, true);

    return () => {
      scroller.removeEventListener('load', handleImageLoad, true);
    };
  }, [computeMetrics]);

  // Main scroll-driven pinning and animation effect
  useEffect(() => {
    // Skip pinning on mobile or if reduced motion
    if (isMobile || isReducedMotion) return;

    const container = containerRef.current;
    const pinned = pinnedRef.current;
    const scroller = scrollerRef.current;
    if (!container || !pinned || !scroller) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const { maxTranslate, scrollRange, startY, endY } = metricsRef.current;

        if (maxTranslate <= 0) {
          // No horizontal overflow - reset positioning
          pinned.style.position = '';
          pinned.style.top = '';
          pinned.style.left = '';
          pinned.style.width = '';
          scroller.style.transform = '';
          rafId = null;
          return;
        }

        const scrollY = window.scrollY;
        const containerRect = container.getBoundingClientRect();

        // Calculate horizontal progress based on maxTranslate (not scrollRange)
        // This ensures the horizontal scroll completes exactly when we've scrolled maxTranslate
        // The release buffer provides extra scroll room AFTER horizontal is complete
        const scrollProgress = scrollY - startY;
        const translateX = clamp(scrollProgress, 0, maxTranslate);

        // Apply horizontal transform
        scroller.style.transform = `translate3d(${-translateX}px, 0, 0)`;

        // Determine pinning mode and apply positioning
        let pinnedMode = '';
        
        if (scrollY < startY) {
          // A) Before section enters
          pinnedMode = 'before';
          pinned.style.position = 'absolute';
          pinned.style.top = '0px';
          pinned.style.left = '';
          pinned.style.width = '';
        } else if (scrollY <= endY) {
          // B) During pinned scroll (the magic happens here)
          pinnedMode = 'pinned';
          pinned.style.position = 'fixed';
          pinned.style.top = `${TOP_OFFSET}px`;
          pinned.style.left = `${containerRect.left}px`;
          pinned.style.width = `${containerRect.width}px`;
        } else {
          // C) After section completes - position at the end of scroll range
          pinnedMode = 'after';
          pinned.style.position = 'absolute';
          pinned.style.top = `${scrollRange}px`;
          pinned.style.left = '';
          pinned.style.width = '';
        }

        // Debug logging (throttled to ~1 second)
        const now = Date.now();
        if (now - lastDebugTime.current > 1000) {
          console.log('[ScrollDrivenFilmstrip] Debug:', {
            startY: Math.round(startY),
            endY: Math.round(endY),
            scrollRange: Math.round(scrollRange),
            maxTranslate: Math.round(maxTranslate),
            translateX: Math.round(translateX),
            progress: (translateX / maxTranslate).toFixed(3),
            pinnedMode,
            scrollY: Math.round(scrollY)
          });
          lastDebugTime.current = now;
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      
      // Cleanup positioning on unmount
      if (pinned) {
        pinned.style.position = '';
        pinned.style.top = '';
        pinned.style.left = '';
        pinned.style.width = '';
      }
    };
  }, [isMobile, isReducedMotion]);

  const mode = isMobile || isReducedMotion ? 'mobile' : 'desktop';

  return (
    <section
      id={id}
      className="scroll-driven-filmstrip"
      ref={containerRef}
      style={sectionHeight ? { 
        height: `${sectionHeight}px`,
        position: 'relative'
      } : undefined}
      data-mode={mode}
    >
      <div 
        className="scroll-driven-filmstrip__pinned" 
        ref={pinnedRef}
        style={!(isMobile || isReducedMotion) ? { willChange: 'position, top, left, width' } : undefined}
      >
        <div className="scroll-driven-filmstrip__headerArea">
          <h2 className="scroll-driven-filmstrip__title">{title}</h2>
          {description && <p className="scroll-driven-filmstrip__caption">{description}</p>}
        </div>

        {/* Horizontal scroller with frames */}
        <div
          ref={scrollerRef}
          className="scroll-driven-filmstrip__scroller"
          style={!(isMobile || isReducedMotion) ? { willChange: 'transform' } : undefined}
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
