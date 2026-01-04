import { useState } from 'react';
import Lightbox from '../Lightbox';
import ScrollDrivenFilmstrip from '../ScrollDrivenFilmstrip';
import { handleImageError } from '../../utils/imageUtils';
import moodboardData from '../../../data/moodboard.json';

/**
 * Moodboard section component - Brutalist filmstrip with scroll-driven horizontal
 */
const MoodboardSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <ScrollDrivenFilmstrip
        title="MOODBOARD"
        description="Visual tone-setter for Echo Maze Protocol — cold, industrial labyrinth lit by emergency amber and server blues."
        items={moodboardData}
        id="moodboard"
        renderItem={(item) => (
          <figure
            className="filmstrip-frame__figure"
            onClick={() => setLightboxImage({ src: item.src, title: item.title })}
          >
            <img
              src={item.src}
              alt={item.title}
              fetchpriority="high"
              onError={handleImageError}
            />
            <figcaption>{item.title}</figcaption>
          </figure>
        )}
      />

      <Lightbox lightboxImage={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};

export default MoodboardSection;
