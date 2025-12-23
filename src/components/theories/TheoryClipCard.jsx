import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Play } from 'lucide-react';
import { useSfx } from './SfxController';

/**
 * TheoryClipCard - Compact card for theory-to-clip connection
 * 
 * Shows essential info; full breakdown in drawer
 */
const TheoryClipCard = ({ connection, onOpenDrawer, onOpenClip, index = 0 }) => {
  const { playTick } = useSfx();

  const getProviderClass = (provider) => {
    const p = provider.toLowerCase();
    if (p.includes('sora')) return 'clip-card__provider--sora';
    if (p.includes('veo')) return 'clip-card__provider--veo';
    if (p.includes('kling')) return 'clip-card__provider--kling';
    return '';
  };

  const getStrengthClass = (strength) => {
    const s = strength.toLowerCase();
    if (s === 'high') return 'clip-card__strength--high';
    if (s === 'medium') return 'clip-card__strength--medium';
    return 'clip-card__strength--low';
  };

  const scrollToLibrary = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const element = document.getElementById(connection.libraryRef.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('library__highlight');
      setTimeout(() => element.classList.remove('library__highlight'), 2000);
    }
  };

  const handleCardClick = () => {
    playTick();
    onOpenDrawer(connection);
  };

  const handleOpenClip = (e) => {
    e.stopPropagation();
    onOpenClip(connection);
  };

  return (
    <motion.article
      className="clip-card"
      id={connection.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
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
      
      {/* Header: Title + Strength */}
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

      {/* Clip Row */}
      <div className="clip-card__clip-row">
        <span className={`clip-card__provider ${getProviderClass(connection.clip.provider)}`}>
          {connection.clip.provider}
        </span>
        <span className="clip-card__clip-title">{connection.clip.title}</span>
        <button
          className="clip-card__play-btn"
          onClick={handleOpenClip}
          aria-label={`Play clip: ${connection.clip.title}`}
        >
          <Play size={14} />
        </button>
      </div>

      {/* Footer Actions */}
      <footer className="clip-card__footer">
        <a
          href={`#${connection.libraryRef.id}`}
          className="clip-card__library-link"
          onClick={scrollToLibrary}
        >
          <ExternalLink size={12} />
          View in Library
        </a>
        <button
          className="clip-card__view-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          View connection
          <ArrowRight size={14} />
        </button>
      </footer>
    </motion.article>
  );
};

export default TheoryClipCard;

