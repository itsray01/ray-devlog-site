import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from '../Lightbox';
import { handleImageError } from '../../utils/imageUtils';
import storyboardData from '../../../data/storyboard.json';

/**
 * Storyboard section component - Shot planning frames
 */
const StoryboardSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

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

      <Lightbox lightboxImage={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};

export default StoryboardSection;
