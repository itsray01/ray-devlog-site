import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from '../Lightbox';
import { handleImageError } from '../../utils/imageUtils';
import moodboardData from '../../../data/moodboard.json';

/**
 * Moodboard section component - Visual tone references
 */
const MoodboardSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <motion.section
        id="moodboard"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="card">
          <h2>Moodboard</h2>
          <p className="muted">
            Visual tone-setter for Echo Maze Protocol — cold, industrial labyrinth lit by emergency amber and server blues.
            Palette, textures, and lighting references that guide shots, UI, and VFX.
          </p>
        </div>
        <div className="card">
          <div className="grid-2x3">
            {moodboardData.map(item => (
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

export default MoodboardSection;
