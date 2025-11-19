import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import inspirationData from '../../../data/inspiration.json';

// Image error handler - optimized to prevent recreation
const handleImageError = (e) => {
  e.target.style.border = '2px solid red';
  e.target.style.backgroundColor = '#ff000020';
};

/**
 * Inspiration section component - Reference works and influences
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
      <motion.section
        id="inspiration"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Card */}
        <div className="card">
          <h2>Inspiration</h2>
          <p className="muted">
            Reference works that shape the mood, interface language, and ethics of the maze-horror AI escape.
            Logged for tone, pacing, and systems aesthetics.
          </p>
        </div>

        {/* Interactive Films & Series */}
        <div className="card">
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
        </div>

        {/* Games & System Narratives */}
        <div className="card">
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
        </div>

        {/* Visual Grammar & Design Influence */}
        <div className="card">
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
        </div>

        {/* Visual Grid */}
        <div className="card">
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
        </div>

        {/* Thematic Core */}
        <div className="card">
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
        </div>
      </motion.section>

      {/* Lightbox */}
      {lightboxImage && (
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
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              ×
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.title} />
            <div className="lightbox-caption">
              <strong>{lightboxImage.title}</strong>
              <br />
              <span className="muted">{lightboxImage.year}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InspirationSection;
