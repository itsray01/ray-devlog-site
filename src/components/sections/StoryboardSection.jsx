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
      <ScrollDrivenFilmstrip
        title="STORYBOARD"
        description="Key moments from the film as stills—quick guides for layout and mood before final shots."
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

export default StoryboardSection;
