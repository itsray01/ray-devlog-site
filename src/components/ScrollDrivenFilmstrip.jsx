import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * ScrollDrivenFilmstrip - Auto-advancing image gallery
 * 
 * Automatically slides between photos every few seconds.
 * Pauses on hover and supports manual navigation via dots.
 */

const ScrollDrivenFilmstrip = ({ title, description, items = [], renderItem, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  
  const SLIDE_INTERVAL = 4000; // 4 seconds between slides

  // Auto-advance slides
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Setup auto-advance interval
  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    intervalRef.current = setInterval(nextSlide, SLIDE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items.length, isPaused, nextSlide]);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Reset the interval when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextSlide, SLIDE_INTERVAL);
    }
  };

  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-driven-filmstrip">
      <div className="scroll-driven-filmstrip__pinned">
        <div className="scroll-driven-filmstrip__headerArea">
          <h2 className="scroll-driven-filmstrip__title">{title}</h2>
          {description && <p className="scroll-driven-filmstrip__caption">{description}</p>}
        </div>
        
        {/* Slideshow container */}
        <div 
          className="scroll-driven-filmstrip__slideshow"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides track */}
          <div 
            className="scroll-driven-filmstrip__track"
            style={{
              display: 'flex',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {items.map((item) => (
              <div 
                key={item.id} 
                className="scroll-driven-filmstrip__slide"
                style={{
                  flex: '0 0 100%',
                  width: '100%',
                  minWidth: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxSizing: 'border-box'
                }}
              >
                <div className="scroll-driven-filmstrip__slideInner">
                  {renderItem(item)}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div 
            className="scroll-driven-filmstrip__dots"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '1.5rem',
              paddingBottom: '1rem'
            }}
          >
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: index === currentIndex ? '2rem' : '0.75rem',
                  height: '0.75rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  background: index === currentIndex 
                    ? 'rgba(167, 139, 250, 1)' 
                    : 'rgba(167, 139, 250, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              background: 'rgba(167, 139, 250, 0.6)',
              width: isPaused ? `${((currentIndex + 1) / items.length) * 100}%` : '0%',
              animation: isPaused ? 'none' : `slideProgress ${SLIDE_INTERVAL}ms linear`,
              animationIterationCount: 'infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ScrollDrivenFilmstrip;
