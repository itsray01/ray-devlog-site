import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';

/**
 * HorizontalStrip - Reusable horizontal scrolling container
 * 
 * Features:
 * - Scroll-snap for smooth card alignment
 * - Wheel-to-horizontal scroll (desktop)
 * - Drag-to-scroll (mouse)
 * - Native touch swipe (mobile)
 * - Gradient fade indicators at edges
 * - "Scroll →" hint that fades after first interaction
 * - Optional arrow navigation (hidden on mobile)
 * - Fully accessible with keyboard navigation
 * 
 * @param {string} title - Section title
 * @param {Array} items - Array of items to render
 * @param {Function} renderItem - Function to render each item
 * @param {string} id - Unique ID for the section (for TOC navigation)
 * @param {string} hintText - Optional hint text (default: "Scroll →")
 * @param {string} cardWidth - Optional CSS width for cards (uses responsive defaults if not provided)
 */
const HorizontalStrip = ({
  title,
  items = [],
  renderItem,
  id,
  hintText = 'Scroll →',
  cardWidth = null,
}) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if user has already scrolled this strip (session storage)
  useEffect(() => {
    if (sessionStorage.getItem(`scrolled-${id}`)) {
      setShowHint(false);
    }
  }, [id]);

  // Update fade indicators based on scroll position
  const updateFadeIndicators = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    setShowLeftFade(scrollLeft > 10);
    setShowRightFade(scrollLeft < maxScroll - 10);
  };

  // Handle scroll event (update fades and hide hint)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      updateFadeIndicators();
      
      // Hide hint after first scroll
      if (showHint && container.scrollLeft > 10) {
        setShowHint(false);
        sessionStorage.setItem(`scrolled-${id}`, 'true');
      }
    };

    container.addEventListener('scroll', handleScroll);
    
    // Initial check
    updateFadeIndicators();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [showHint, id]);

  // Wheel-to-horizontal scroll (desktop only, when cursor is inside strip)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const { deltaY } = e;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth;
      
      // Only prevent default and scroll horizontally if we can scroll in that direction
      if ((deltaY > 0 && canScrollRight) || (deltaY < 0 && canScrollLeft)) {
        e.preventDefault();
        container.scrollLeft += deltaY;
      }
    };

    // Use { passive: false } to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Drag-to-scroll handlers (desktop)
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = 'auto';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        scrollRef.current.style.cursor = 'grab';
        scrollRef.current.style.userSelect = 'auto';
      }
    }
  };

  // Arrow navigation handlers
  const scrollToDirection = (direction) => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const cardWidth = container.querySelector('.horizontal-strip__card')?.offsetWidth || 320;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Keyboard handlers for arrow buttons
  const handleArrowKeyDown = (e, direction) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToDirection(direction);
    }
  };

  return (
    <div className="horizontal-strip">
      {/* Header with title and hint */}
      <div className="horizontal-strip__header">
        <h2>{title}</h2>
        {showHint && (
          <div className="horizontal-strip__scroll-hint" aria-live="polite">
            <MoveRight size={16} />
            <span>{hintText}</span>
          </div>
        )}
      </div>

      {/* Scrollable container with cards */}
      <div className="horizontal-strip__wrapper">
        {/* Left arrow (desktop only) */}
        {!isMobile && showLeftFade && (
          <button
            className="horizontal-strip__arrow horizontal-strip__arrow--left"
            onClick={() => scrollToDirection('left')}
            onKeyDown={(e) => handleArrowKeyDown(e, 'left')}
            aria-label="Scroll left"
            tabIndex={0}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="horizontal-strip__scroll-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          role="region"
          aria-label={`${title} horizontal scroll area`}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="horizontal-strip__card"
              style={cardWidth ? { width: cardWidth } : undefined}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>

        {/* Right arrow (desktop only) */}
        {!isMobile && showRightFade && (
          <button
            className="horizontal-strip__arrow horizontal-strip__arrow--right"
            onClick={() => scrollToDirection('right')}
            onKeyDown={(e) => handleArrowKeyDown(e, 'right')}
            aria-label="Scroll right"
            tabIndex={0}
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Left fade gradient */}
        {showLeftFade && (
          <div className="horizontal-strip__fade horizontal-strip__fade--left" aria-hidden="true" />
        )}

        {/* Right fade gradient */}
        {showRightFade && (
          <div className="horizontal-strip__fade horizontal-strip__fade--right" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};

export default HorizontalStrip;
