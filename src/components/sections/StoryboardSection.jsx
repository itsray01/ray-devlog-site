import { useState } from 'react';
import Lightbox from '../Lightbox';
import ScrollDrivenFilmstrip from '../ScrollDrivenFilmstrip';
import { handleImageError } from '../../utils/imageUtils';
import storyboardData from '../../../data/storyboard.json';

/**
 * Storyboard section component - Brutalist filmstrip with scroll-driven horizontal
 */
const StoryboardSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <div className="brutalist-section-intro">
        <p className="brutalist-intro-text">
          Shot planning frames for key beats in the maze. Rough compositions that define blocking and emotional pacing.
        </p>
      </div>

      <ScrollDrivenFilmstrip
        title="STORYBOARD"
        items={storyboardData}
        id="storyboard"
        renderItem={(item) => (
          <figure
            className="filmstrip-frame__figure"
            onClick={() => setLightboxImage({ src: item.src, title: item.title })}
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
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

export default StoryboardSection;
