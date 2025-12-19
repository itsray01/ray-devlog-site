import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/**
 * Reusable Lightbox component for image galleries
 * @param {Object} lightboxImage - { src, title, year? }
 * @param {Function} onClose - Callback to close lightbox
 */
const Lightbox = ({ lightboxImage, onClose }) => {
  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImage]);

  if (!lightboxImage) return null;

  return createPortal(
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close lightbox"
        >
          <X size={20} strokeWidth={2} />
        </button>
        <img src={lightboxImage.src} alt={lightboxImage.title} />
      </div>
      <div className="lightbox-caption">
        <strong>{lightboxImage.title}</strong>
        {lightboxImage.year && (
          <>
            <br />
            <span className="muted">{lightboxImage.year}</span>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;
