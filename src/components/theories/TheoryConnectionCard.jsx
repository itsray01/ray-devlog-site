import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Play } from 'lucide-react';
import { useSfx } from './SfxController';

/**
 * TheoryConnectionCard - Individual card showing theory-to-clip connection
 * 
 * Features:
 * - Claim-Evidence-Reasoning-So What structure
 * - Connection strength meter
 * - Expandable explanation
 * - Hover effects with parallax
 * - Periodic glitch on title (respects reduced motion)
 */
const TheoryConnectionCard = ({ connection, onOpenClip, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const { playTick } = useSfx();
  const cardRef = useRef(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  );

  // Periodic glitch effect on title (only if motion allowed)
  useEffect(() => {
    if (prefersReducedMotion.current) return;
    
    // Random interval between 8-12 seconds
    const scheduleGlitch = () => {
      const delay = 8000 + Math.random() * 4000;
      return setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
        scheduleGlitch();
      }, delay);
    };
    
    // Stagger start based on card index
    const initialDelay = setTimeout(() => {
      scheduleGlitch();
    }, index * 2000);
    
    return () => clearTimeout(initialDelay);
  }, [index]);

  const handleMouseEnter = useCallback(() => {
    playTick();
  }, [playTick]);

  const getProviderClass = (provider) => {
    const p = provider.toLowerCase();
    if (p.includes('sora')) return 'connection__clip-provider--sora';
    if (p.includes('veo')) return 'connection__clip-provider--veo';
    if (p.includes('kling')) return 'connection__clip-provider--kling';
    return '';
  };

  const getStrengthClass = (strength) => {
    const s = strength.toLowerCase();
    if (s === 'high') return 'connection__strength--high';
    if (s === 'medium') return 'connection__strength--medium';
    return 'connection__strength--low';
  };

  const scrollToLibrary = (e, libraryId) => {
    e.preventDefault();
    const element = document.getElementById(libraryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add highlight effect
      element.classList.add('library__highlight');
      setTimeout(() => element.classList.remove('library__highlight'), 2000);
    }
  };

  return (
    <motion.article
      ref={cardRef}
      className="connection__card"
      id={connection.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onMouseEnter={handleMouseEnter}
    >
      {/* Highlight bar */}
      <div className="connection__highlight-bar" aria-hidden="true" />
      
      {/* Header */}
      <header className="connection__header">
        <h3 className={`connection__title ${isGlitching ? 'connection__title--glitch' : ''}`}>
          {connection.theoryTitle}
        </h3>
        <div className={`connection__strength ${getStrengthClass(connection.strength)}`}>
          <span className="connection__strength-dot" aria-hidden="true" />
          <span className="connection__strength-label">{connection.strength}</span>
        </div>
      </header>

      {/* Summary */}
      <p className="connection__summary">{connection.theorySummary}</p>

      {/* Quote block */}
      <div className="connection__quote-block">
        <blockquote className="connection__quote">
          "{connection.libraryRef.quote}"
        </blockquote>
        <div className="connection__citation">
          <span className="connection__citation-text">
            — {connection.libraryRef.author} ({connection.libraryRef.year})
          </span>
          <a
            href={`#${connection.libraryRef.id}`}
            className="connection__library-link"
            onClick={(e) => scrollToLibrary(e, connection.libraryRef.id)}
          >
            <ExternalLink size={12} />
            View in Library
          </a>
        </div>
      </div>

      {/* Clip info */}
      <div className="connection__clip-info">
        <span className={`connection__clip-provider ${getProviderClass(connection.clip.provider)}`}>
          {connection.clip.provider}
        </span>
        <span className="connection__clip-title">{connection.clip.title}</span>
        <button
          className="connection__clip-btn"
          onClick={() => onOpenClip(connection)}
          aria-label={`Open clip: ${connection.clip.title}`}
        >
          <Play size={12} />
          Open Clip
        </button>
      </div>

      {/* Expandable explanation */}
      <div className="connection__explanation">
        <button
          className={`connection__explanation-toggle ${isExpanded ? 'connection__explanation-toggle--open' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <ChevronDown size={16} />
          <span>Explicit Connection (Claim → Evidence → Reasoning → So What)</span>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="connection__explanation-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="connection__explanation-item">
                <div className="connection__explanation-label">Claim</div>
                <p className="connection__explanation-text">{connection.explanation.claim}</p>
              </div>
              
              <div className="connection__explanation-item">
                <div className="connection__explanation-label">Evidence</div>
                <p className="connection__explanation-text">"{connection.explanation.evidence}"</p>
              </div>
              
              <div className="connection__explanation-item">
                <div className="connection__explanation-label">Reasoning</div>
                <ul className="connection__explanation-list">
                  {connection.explanation.reasoning.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              
              <div className="connection__explanation-item">
                <div className="connection__explanation-label">So What</div>
                <p className="connection__explanation-text">{connection.explanation.soWhat}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};

export default TheoryConnectionCard;

