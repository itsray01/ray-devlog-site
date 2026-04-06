import { Link } from 'react-router-dom';
import { useNavigationActions } from '../../context/NavigationContext';
import { Play, BookOpen, Film, PenLine } from 'lucide-react';

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
        <span className="mission-brief__build">FINAL RELEASE</span>
      </div>

      {/* Status chips row */}
      <div className="mission-brief__status-row">
        <div className="mission-brief__status-chip mission-brief__status-chip--ok">
          <span className="mission-brief__status-dot"></span>
          <span>FINAL RELEASE</span>
        </div>
        <div className="mission-brief__status-chip">
          <span>LAST UPDATED: APR 2026</span>
        </div>
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
            COMPLETED
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
          href="/process"
          className="mission-brief__btn mission-brief__btn--secondary"
          aria-label="View process"
        >
          <Film size={18} />
          <span>PROCESS</span>
        </a>

        <a
          href="/timeline"
          className="mission-brief__btn mission-brief__btn--secondary"
          aria-label="View evolution"
        >
          <Play size={18} />
          <span>EVOLUTION</span>
        </a>

        <Link
          to="/diary"
          className="mission-brief__btn mission-brief__btn--primary mission-brief__btn--diary"
          aria-label="Open development diary"
        >
          <PenLine size={18} aria-hidden />
          <span>DIARY</span>
        </Link>
      </div>
    </div>
  );
};

export default MissionBrief;
