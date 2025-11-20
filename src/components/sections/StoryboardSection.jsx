import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import storyboardData from '../../../data/storyboard.json';

// Image error handler - optimized to prevent recreation
const handleImageError = (e) => {
  e.target.style.border = '2px solid red';
  e.target.style.backgroundColor = '#ff000020';
};

/**
 * Storyboard section component - Shot planning frames
 */
const StoryboardSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

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

  return (
    <>
      <motion.section
        id="storyboard"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="card">
          <h2>Storyboard</h2>
          <p className="muted">
            Shot planning frames for key beats in the maze. Rough compositions that define blocking,
            lighting direction, and emotional pacing across the path.
          </p>
        </div>
        <div className="card">
          <div className="grid-2x3">
            {storyboardData.map(item => (
              <figure
                className="grid-tile"
                key={item.id}
                onClick={() => setLightboxImage({ src: item.src, title: item.title })}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  onError={handleImageError}
                />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
      {lightboxImage && createPortal(
        <div
          className="lightbox"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              aria-label="Close lightbox"
            >
              <X size={20} strokeWidth={2} />
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.title} />
          </div>
          <div className="lightbox-caption">
            <strong>{lightboxImage.title}</strong>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default StoryboardSection;
