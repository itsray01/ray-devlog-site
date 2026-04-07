import { motion } from 'framer-motion';
import { useSfx } from './SfxController';

/**
 * TheoryClipCard — theory-to-clip connection card
 *
 * Card click opens the full CER/So What drawer.
 * Play and "View connection" buttons removed — passage section replaces them.
 */
const TheoryClipCard = ({ connection, onOpenDrawer, index = 0 }) => {
  const { playTick } = useSfx();

  const getStrengthClass = (strength) => {
    const s = strength.toLowerCase();
    if (s === 'high') return 'clip-card__strength--high';
    if (s === 'medium') return 'clip-card__strength--medium';
    return 'clip-card__strength--low';
  };

  const handleCardClick = () => {
    playTick();
    onOpenDrawer(connection);
  };

  return (
    <motion.article
      className="clip-card"
      id={connection.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      onClick={handleCardClick}
      onMouseEnter={playTick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      aria-label={`View connection details for ${connection.theoryTitle}`}
    >
      {/* Scanline overlay */}
      <div className="clip-card__scanlines" aria-hidden="true" />

      {/* Header: Theory title + strength */}
      <header className="clip-card__header">
        <h3 className="clip-card__title">{connection.theoryTitle}</h3>
        <div className={`clip-card__strength ${getStrengthClass(connection.strength)}`}>
          <span className="clip-card__strength-led" aria-hidden="true" />
          <span className="clip-card__strength-label">{connection.strength}</span>
        </div>
      </header>

      {/* Summary */}
      <p className="clip-card__summary">{connection.theorySummary}</p>

      {/* Quote Block */}
      <blockquote className="clip-card__quote">
        <p className="clip-card__quote-text">"{connection.libraryRef.quote}"</p>
        <cite className="clip-card__citation">
          {connection.libraryRef.author}, {connection.libraryRef.year}
        </cite>
      </blockquote>

      {/* Clip Row — pipeline badge + scene title (single line) */}
      <div className="clip-card__clip-row">
        <span className="clip-card__provider clip-card__provider--kling">
          {connection.clip.provider}
        </span>
        <span className="clip-card__clip-title">{connection.clip.title}</span>
      </div>

      {/* Story Passage Section */}
      {connection.clip.passage && (
        <div className="clip-card__passage">
          <div className="clip-card__passage-header">
            <span className="clip-card__passage-label">Twine passage</span>
            <code className="clip-card__passage-name">{connection.clip.passage.name}</code>
          </div>
          <p className="clip-card__passage-text">{connection.clip.passage.subtitle}</p>
          {connection.clip.passage.choices && (
            <div className="clip-card__passage-choices">
              {connection.clip.passage.choices.map((c) => (
                <span key={c.label} className="clip-card__passage-choice">
                  {c.label}
                  <span className="clip-card__passage-arrow" aria-hidden="true"> →</span>
                  <span className="clip-card__passage-target">{c.target}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

    </motion.article>
  );
};

export default TheoryClipCard;
