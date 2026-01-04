import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * ScrollDrivenFilmstrip - Completely rewritten for reliability
 * 
 * Simpler approach:
 * - Section has dynamic height = viewport height + (total frames width - viewport width)
 * - Content is position: sticky at top
 * - As you scroll DOWN, frames translate LEFT
 * - Direct 1:1 mapping: vertical scroll → horizontal translate
 */

const ScrollDrivenFilmstrip = ({ title, description, items = [], renderItem, id }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const scrollerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sectionHeight, setSectionHeight] = useState('auto');

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate section height and handle scroll animation
  const setupScroll = useCallback(() => {
    if (isMobile) {
      setSectionHeight('auto');
      return;
    }

    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    if (!section || !scroller) return;

    // Calculate how much horizontal space we need to scroll through
    const viewportWidth = window.innerWidth;
    const scrollerWidth = scroller.scrollWidth;
    const horizontalScrollDistance = scrollerWidth - viewportWidth;

    if (horizontalScrollDistance <= 0) {
      setSectionHeight('auto');
      return;
    }

    // Section height = viewport height + horizontal scroll distance
    // This gives us enough vertical scroll space to drive the horizontal animation
    const viewportHeight = window.innerHeight;
    const newHeight = viewportHeight + horizontalScrollDistance;
    setSectionHeight(`${newHeight}px`);
  }, [isMobile]);

  // Setup on mount and when content changes
  useEffect(() => {
    setupScroll();

    // Recalculate when images load
    const scroller = scrollerRef.current;
    if (scroller) {
      const images = scroller.querySelectorAll('img');
      images.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', setupScroll);
        }
      });
      
      return () => {
        images.forEach(img => {
          img.removeEventListener('load', setupScroll);
        });
      };
    }
  }, [setupScroll, items]);

  // Handle scroll animation
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const content = contentRef.current;
    const scroller = scrollerRef.current;
    if (!section || !content || !scroller) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sectionRect = section.getBoundingClientRect();
          const sectionTop = sectionRect.top;
          const sectionHeight = sectionRect.height;
          const viewportHeight = window.innerHeight;

          // When section top reaches 60px (nav height), start translating
          const scrollStart = 60;
          
          // Calculate if we're in the active scrolling zone
          if (sectionTop <= scrollStart && sectionTop > scrollStart - sectionHeight) {
            // We're in the scrolling zone - FIX THE POSITION
            content.style.position = 'fixed';
            content.style.top = '60px';
            content.style.left = `${sectionRect.left}px`;
            content.style.width = `${sectionRect.width}px`;
            content.style.visibility = 'visible';
            // Use section ID to determine z-index (storyboard should be above moodboard)
            const zIndex = id === 'storyboard' ? '101' : '100';
            content.style.zIndex = zIndex;
            
            // Calculate scroll progress
            // scrollProgress = how far we've scrolled into the section
            const scrollProgress = Math.max(0, scrollStart - sectionTop);
            const scrollerWidth = scroller.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxTranslate = scrollerWidth - viewportWidth;
            
            // Map scroll progress to horizontal translation
            // The section has height = viewportHeight + maxTranslate
            // So we need to scroll through maxTranslate distance to complete the horizontal scroll
            const translateX = Math.min(scrollProgress, maxTranslate);
            
            scroller.style.transform = `translateX(-${translateX}px)`;
          } else if (sectionTop > scrollStart) {
            // Before section - reset to start (Frame 1)
            content.style.position = 'sticky';
            content.style.left = '';
            content.style.width = '';
            content.style.zIndex = '';
            content.style.visibility = 'visible';
            scroller.style.transform = 'translateX(0)';
          } else {
            // After section - hide it to prevent layering with next section
            content.style.position = 'absolute';
            content.style.top = '0';
            content.style.left = '';
            content.style.width = '';
            content.style.zIndex = '';
            content.style.visibility = 'hidden';
            const scrollerWidth = scroller.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxTranslate = scrollerWidth - viewportWidth;
            scroller.style.transform = `translateX(-${maxTranslate}px)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  if (isMobile) {
    // Mobile: simple horizontal scroll
    return (
      <section id={id} className="scroll-driven-filmstrip" data-mode="mobile">
        <div className="scroll-driven-filmstrip__pinned">
          <div className="scroll-driven-filmstrip__headerArea">
            <h2 className="scroll-driven-filmstrip__title">{title}</h2>
            {description && <p className="scroll-driven-filmstrip__caption">{description}</p>}
          </div>
          <div ref={scrollerRef} className="scroll-driven-filmstrip__scroller">
            {items.map((item) => (
              <div key={item.id} className="scroll-driven-filmstrip__frame">
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: scroll-driven horizontal
  return (
    <section
      id={id}
      ref={sectionRef}
      className="scroll-driven-filmstrip"
      style={{ height: sectionHeight, position: 'relative' }}
      data-mode="desktop"
    >
      <div
        ref={contentRef}
        className="scroll-driven-filmstrip__pinned"
        style={{
          position: 'sticky',
          top: '60px',
          height: 'calc(100vh - 60px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: '2rem',
          paddingTop: '4rem',
          paddingLeft: '2rem',
          overflow: 'visible',
          width: '100%'
        }}
      >
        <div className="scroll-driven-filmstrip__headerArea" style={{ width: '100%', textAlign: 'center' }}>
          <h2 className="scroll-driven-filmstrip__title">{title}</h2>
          {description && <p className="scroll-driven-filmstrip__caption">{description}</p>}
        </div>
        <div
          ref={scrollerRef}
          className="scroll-driven-filmstrip__scroller"
          style={{
            display: 'flex',
            gap: '4rem',
            alignItems: 'center',
            willChange: 'transform',
            transition: 'none',
            justifyContent: 'flex-start',
            width: 'auto',
            marginLeft: 0,
            marginRight: 0
          }}
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
