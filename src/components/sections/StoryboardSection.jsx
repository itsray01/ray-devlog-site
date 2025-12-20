import { useState } from 'react';
import ScrollSection, { ScrollReveal } from '../ScrollSection';
import TextReveal from '../TextReveal';
import Lightbox from '../Lightbox';
import { handleImageError } from '../../utils/imageUtils';
import storyboardData from '../../../data/storyboard.json';

/**
 * Storyboard section component - Shot planning frames
 * Now uses GSAP ScrollTrigger for animations
 */
const StoryboardSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <ScrollSection
        id="storyboard"
        className="content-section"
        preset="fadeUp"
        duration={0.8}
      >
        <ScrollReveal className="card" preset="fadeUp">
          <TextReveal
            text="Storyboard"
            as="h2"
            splitBy="words"
            preset="fadeUp"
            stagger={0.08}
          />
          <p className="muted">
            Shot planning frames for key beats in the maze. Rough compositions that define blocking,
            lighting direction, and emotional pacing across the path.
          </p>
        </ScrollReveal>
        
        <ScrollReveal className="card" preset="scaleIn" delay={0.15}>
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
        </ScrollReveal>
      </ScrollSection>

      <Lightbox lightboxImage={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};

export default StoryboardSection;
