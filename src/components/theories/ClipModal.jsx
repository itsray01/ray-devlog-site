import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useSfx } from './SfxController';

/**
 * ClipModal - Full-screen video playback modal
 *
 * Focused on the clip itself + its linked theory quote.
 * Full Claim/Evidence/Reasoning/So What breakdown lives in the drawer.
 */
const ClipModal = ({ connection, isOpen, onClose }) => {
  const { playConfirm, playDown } = useSfx();
  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const hasPlayedOpenSound = useRef(false);

  useEffect(() => {
    if (isOpen && !hasPlayedOpenSound.current) {
      playConfirm();
      hasPlayedOpenSound.current = true;
    } else if (!isOpen) {
      hasPlayedOpenSound.current = false;
    }
  }, [isOpen, playConfirm]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    if (modalRef.current) modalRef.current.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = useCallback(() => {
    playDown();
    if (videoRef.current) videoRef.current.pause();
    onClose();
  }, [onClose, playDown]);

  const getProviderClass = (provider) => {
    const p = provider.toLowerCase();
    if (p.includes('kling')) return 'modal__provider-tag--kling';
    if (p.includes('sora')) return 'modal__provider-tag--sora';
    if (p.includes('veo')) return 'modal__provider-tag--veo';
    return '';
  };

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
    }, 300);
  };

  if (!connection) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            className="modal__container modal__container--playback"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            {/* Signal lock scanline effect */}
            <div className="modal__signal-line" aria-hidden="true" />

            {/* Header */}
            <header className="modal__header">
              <div className="modal__title-area">
                <span className={`modal__provider-tag ${getProviderClass(connection.clip.provider)}`}>
                  {connection.clip.provider}
                </span>
                <h2 id="modal-title" className="modal__clip-title">
                  {connection.clip.title}
                </h2>
              </div>
              <button
                className="modal__close-btn"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </header>

            {/* Video */}
            <div className="modal__video-section">
              <div className="modal__video-wrapper">
                <video
                  ref={videoRef}
                  className="modal__video"
                  controls
                  playsInline
                  poster={connection.clip.poster}
                  preload="metadata"
                >
                  <source src={connection.clip.srcMp4} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Linked theory — lightweight context strip */}
            <div className="modal__theory-strip">
              <blockquote className="modal__theory-quote">
                "{connection.libraryRef.quote}"
              </blockquote>
              <p className="modal__theory-citation">
                — {connection.libraryRef.author} ({connection.libraryRef.year}),{' '}
                {connection.libraryRef.shortTitle}
              </p>

              <div className="modal__footer">
                <button
                  className="modal__action-btn modal__action-btn--primary"
                  onClick={scrollToLibrary}
                >
                  <ExternalLink size={14} />
                  Jump to Library
                </button>
                <button
                  className="modal__action-btn modal__action-btn--secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClipModal;
