import { useNavigationActions } from '../../context/NavigationContext';
import { Play, BookOpen, Film } from 'lucide-react';

/**
 * MissionBrief - Terminal-style mission briefing panel
 * Displays project overview and primary CTAs
 */
const MissionBrief = () => {
  const { scrollToSection } = useNavigationActions();

  const handleEnterLogbook = () => {
    scrollToSection('overview');
  };

  return (
    <div className="home-hub__panel mission-brief">
      <div className="mission-brief__header">
        <span className="mission-brief__label">MISSION BRIEF</span>
        <span className="mission-brief__build">BUILD v0.7</span>
      </div>

      <div className="mission-brief__content">
        <div className="mission-brief__field">
          <span className="mission-brief__key">PROJECT:</span>
          <span className="mission-brief__value">Interactive Dystopian Film</span>
        </div>

        <div className="mission-brief__field">
          <span className="mission-brief__key">OBJECTIVE:</span>
          <span className="mission-brief__value">
            Document AI-assisted filmmaking journey from concept to production
          </span>
        </div>

        <div className="mission-brief__field">
          <span className="mission-brief__key">STATUS:</span>
          <span className="mission-brief__value mission-brief__value--ok">
            IN DEVELOPMENT
          </span>
        </div>
      </div>

      <div className="mission-brief__actions">
        <button
          onClick={handleEnterLogbook}
          className="mission-brief__btn mission-brief__btn--primary"
          aria-label="Enter logbook"
        >
          <BookOpen size={18} />
          <span>ENTER LOGBOOK</span>
        </button>

        <a
          href="/my-journey"
          className="mission-brief__btn mission-brief__btn--secondary"
          aria-label="Watch trailer"
        >
          <Film size={18} />
          <span>VIEW JOURNEY</span>
        </a>

        <a
          href="/extras"
          className="mission-brief__btn mission-brief__btn--secondary"
          aria-label="Play prototype"
        >
          <Play size={18} />
          <span>EXTRAS</span>
        </a>
      </div>
    </div>
  );
};

export default MissionBrief;
