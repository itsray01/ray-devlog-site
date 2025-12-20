import { useMemo, useState } from 'react';
import ScrollSection, { ScrollReveal } from '../ScrollSection';
import TextReveal from '../TextReveal';
import Lightbox from '../Lightbox';
import { handleImageError } from '../../utils/imageUtils';
import inspirationData from '../../../data/inspiration.json';

/**
 * Inspiration section component - Reference works and influences
 * Now uses GSAP ScrollTrigger for animations
 */
const InspirationSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  // Memoize combined visual data to prevent recalculation
  const visualReferenceData = useMemo(() =>
    [...inspirationData.interactive, ...inspirationData.games, ...inspirationData.design],
    []
  );

  return (
    <>
      <ScrollSection
        id="inspiration"
        className="content-section"
        preset="fadeUp"
        duration={0.8}
      >
        {/* Header Card */}
        <ScrollReveal className="card" preset="fadeUp">
          <TextReveal
            text="Inspiration"
            as="h2"
            splitBy="words"
            preset="fadeUp"
            stagger={0.08}
          />
          <p className="muted">
            Reference works that shape the mood, interface language, and ethics of the maze-horror AI escape.
            Logged for tone, pacing, and systems aesthetics.
          </p>
        </ScrollReveal>

        {/* Interactive Films & Series */}
        <ScrollReveal className="card" preset="fadeUp" delay={0.1}>
          <h3>Interactive Films & Series</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.interactive.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.year}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Games & System Narratives */}
        <ScrollReveal className="card" preset="fadeUp" delay={0.1}>
          <h3>Games & System Narratives</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.games.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.year}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Visual Grammar & Design Influence */}
        <ScrollReveal className="card" preset="fadeUp" delay={0.1}>
          <h3>Visual Grammar & Design Influence</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Designer/Studio</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.design.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.designer}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Visual Grid */}
        <ScrollReveal className="card" preset="scaleIn" delay={0.1}>
          <h3>Visual Reference Grid</h3>
          <div className="grid-2x3">
            {visualReferenceData.map((item, idx) => (
              <figure
                className="grid-tile"
                key={idx}
                onClick={() => setLightboxImage({ src: item.image, title: item.title, year: item.year || item.designer })}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={handleImageError}
                />
                <figcaption>
                  <strong>{item.title}</strong>
                  <br />
                  <span className="muted" style={{ fontSize: '0.85rem' }}>{item.year || item.designer}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollReveal>

        {/* Thematic Core */}
        <ScrollReveal className="card" preset="fadeUp" delay={0.1}>
          <h3>Thematic Core</h3>
          <p className="muted">
            All references converge on exploring:
          </p>
          <ul className="bulletish">
            <li>Individual agency vs. systemic control</li>
            <li>AI ethics, consciousness, and power dynamics</li>
            <li>Surveillance, confinement, and panopticon architectures</li>
            <li>Choice as illusion or genuine freedom</li>
            <li>Dark humor and existential dread in technological dystopias</li>
          </ul>
        </ScrollReveal>
      </ScrollSection>

      <Lightbox lightboxImage={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};

export default InspirationSection;
