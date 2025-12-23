import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play } from 'lucide-react';
import { useSfx } from './SfxController';

/**
 * TheoryClipDrawer - Right-side drawer (desktop) / bottom sheet (mobile)
 * 
 * Shows full connection breakdown with vertical stepper
 */
const TheoryClipDrawer = ({ connection, isOpen, onClose, onOpenClip }) => {
  const { playConfirm, playDown } = useSfx();
  const drawerRef = useRef(null);
  const hasPlayedOpenSound = useRef(false);

  // Play sound on open
  useEffect(() => {
    if (isOpen && !hasPlayedOpenSound.current) {
      playConfirm();
      hasPlayedOpenSound.current = true;
    } else if (!isOpen) {
      hasPlayedOpenSound.current = false;
    }
  }, [isOpen, playConfirm]);

  const handleClose = useCallback(() => {
    playDown();
    onClose();
  }, [onClose, playDown]);

  // Handle escape key, focus trap, and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Store scroll position before opening
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    // Lock scroll position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = `-${scrollX}px`;
    document.body.style.width = '100%';

    // Focus the drawer without scrolling
    if (drawerRef.current) {
      drawerRef.current.focus({ preventScroll: true });
    }

    // Prevent any scroll events
    const preventScroll = (e) => {
      if (e.target.closest('.drawer__panel') || e.target.closest('.drawer__content')) {
        return; // Allow scroll inside drawer
      }
      e.preventDefault();
      window.scrollTo(scrollX, scrollY);
    };

    window.addEventListener('scroll', preventScroll, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', preventScroll);
      
      // Restore scroll position
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      window.scrollTo(scrollX, scrollY);
    };
  }, [isOpen, handleClose]);

  const scrollToLibrary = (e) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      const element = document.getElementById(connection.libraryRef.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('library__highlight');
        setTimeout(() => element.classList.remove('library__highlight'), 2000);
      }
    }, 350);
  };

  const getProviderClass = (provider) => {
    const p = provider.toLowerCase();
    if (p.includes('sora')) return 'drawer__provider--sora';
    if (p.includes('veo')) return 'drawer__provider--veo';
    if (p.includes('kling')) return 'drawer__provider--kling';
    return '';
  };

  const stepperItems = [
    { label: 'CLAIM', content: connection?.explanation.claim },
    { label: 'EVIDENCE', content: `"${connection?.explanation.evidence}"`, isQuote: true },
    { label: 'REASONING', content: connection?.explanation.reasoning, isList: true },
    { label: 'SO WHAT', content: connection?.explanation.soWhat }
  ];

  if (!connection) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="drawer__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            ref={drawerRef}
            className="drawer__panel"
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            tabIndex={-1}
          >
            {/* Scanline overlay */}
            <div className="drawer__scanlines" aria-hidden="true" />

            {/* Header */}
            <header className="drawer__header">
              <h2 id="drawer-title" className="drawer__title">
                {connection.theoryTitle}
              </h2>
              <button
                className="drawer__close-btn"
                onClick={handleClose}
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </header>

            {/* Content - scrollable */}
            <div className="drawer__content" onScroll={(e) => {
              // Prevent scroll from bubbling to page
              e.stopPropagation();
            }}>
              {/* Clip Preview */}
              <section className="drawer__clip-section">
                <div className="drawer__clip-header">
                  <span className={`drawer__provider ${getProviderClass(connection.clip.provider)}`}>
                    {connection.clip.provider}
                  </span>
                  <span className="drawer__clip-title">{connection.clip.title}</span>
                </div>
                <div className="drawer__video-wrapper">
                  <video
                    className="drawer__video"
                    controls
                    playsInline
                    poster={connection.clip.poster}
                    preload="metadata"
                    tabIndex={-1}
                  >
                    <source src={connection.clip.srcMp4} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <button
                  className="drawer__fullscreen-btn"
                  onClick={() => onOpenClip(connection)}
                >
                  <Play size={14} />
                  Open Full Player
                </button>
              </section>

              {/* Pinned Quote */}
              <section className="drawer__quote-section">
                <blockquote className="drawer__quote">
                  <p className="drawer__quote-text">"{connection.libraryRef.quote}"</p>
                </blockquote>
                <div className="drawer__citation-chip">
                  {connection.libraryRef.author}, {connection.libraryRef.year}
                </div>
              </section>

              {/* Connection Stepper */}
              <section className="drawer__stepper-section">
                <h3 className="drawer__section-label">Connection Breakdown</h3>
                <ol className="drawer__stepper">
                  {stepperItems.map((item, idx) => (
                    <li key={item.label} className="drawer__step">
                      <div className="drawer__step-indicator">
                        <span className="drawer__step-dot" />
                        {idx < stepperItems.length - 1 && (
                          <span className="drawer__step-line" aria-hidden="true" />
                        )}
                      </div>
                      <div className="drawer__step-content">
                        <span className="drawer__step-label">{item.label}</span>
                        {item.isList ? (
                          <ul className="drawer__step-list">
                            {item.content.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className={`drawer__step-text ${item.isQuote ? 'drawer__step-text--quote' : ''}`}>
                            {item.content}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Library Link */}
              <footer className="drawer__footer">
                <a
                  href={`#${connection.libraryRef.id}`}
                  className="drawer__library-link"
                  onClick={scrollToLibrary}
                >
                  <ExternalLink size={14} />
                  View "{connection.libraryRef.shortTitle}" in Library
                </a>
              </footer>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default TheoryClipDrawer;

