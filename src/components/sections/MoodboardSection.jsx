import { useState } from 'react';
import ScrollSection, { ScrollReveal } from '../ScrollSection';
import TextReveal from '../TextReveal';
import Lightbox from '../Lightbox';
import { handleImageError } from '../../utils/imageUtils';
import moodboardData from '../../../data/moodboard.json';

/**
 * Moodboard section component - Visual tone references
 * Now uses GSAP ScrollTrigger for animations
 */
const MoodboardSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <ScrollSection
        id="moodboard"
        className="content-section"
        preset="fadeUp"
        duration={0.8}
      >
        <ScrollReveal className="card" preset="fadeUp">
          <TextReveal
            text="Moodboard"
            as="h2"
            splitBy="words"
            preset="fadeUp"
            stagger={0.08}
          />
          <p className="muted">
            Visual tone-setter for Echo Maze Protocol — cold, industrial labyrinth lit by emergency amber and server blues.
            Palette, textures, and lighting references that guide shots, UI, and VFX.
          </p>
        </ScrollReveal>
        
        <ScrollReveal className="card" preset="scaleIn" delay={0.15}>
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
        </ScrollReveal>
      </ScrollSection>

      <Lightbox lightboxImage={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};

export default MoodboardSection;
