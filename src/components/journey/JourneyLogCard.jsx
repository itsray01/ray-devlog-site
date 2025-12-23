import { Calendar, Target, Wrench, Star, DollarSign, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

/**
 * JourneyLogCard - Individual experiment log entry
 * Displays tool, goal, failures, fix, score, and metrics
 */
const JourneyLogCard = ({ log }) => {
  const {
    date,
    tool,
    goal,
    failures = [],
    fix,
    resultScore,
    usable,
    creditsSpent,
    timeSpentMin,
    clipUrls = []
  } = log;

  // Render score stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < resultScore ? 'currentColor' : 'none'}
        className={i < resultScore ? 'journey-log__star--filled' : 'journey-log__star'}
      />
    ));
  };

  return (
    <div className="journey-log-card">
      {/* Header */}
      <div className="journey-log__header">
        <div className="journey-log__meta">
          <span className="journey-log__tool">{tool}</span>
          <div className="journey-log__date">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
        </div>

        <div className="journey-log__badges">
          {usable ? (
            <span className="journey-log__badge journey-log__badge--success">
              <CheckCircle size={12} />
              <span>Usable</span>
            </span>
          ) : (
            <span className="journey-log__badge journey-log__badge--error">
              <XCircle size={12} />
              <span>Unusable</span>
            </span>
          )}
        </div>
      </div>

      {/* Goal */}
      <div className="journey-log__section">
        <div className="journey-log__label">
          <Target size={14} />
          <span>Goal</span>
        </div>
        <p className="journey-log__text">{goal}</p>
      </div>

      {/* Failures */}
      {failures.length > 0 && (
        <div className="journey-log__section">
          <div className="journey-log__label">
            <AlertTriangle size={14} />
            <span>Failures</span>
          </div>
          <div className="journey-log__tags">
            {failures.map((failure, i) => (
              <span key={i} className="journey-log__tag journey-log__tag--failure">
                {failure}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Fix */}
      <div className="journey-log__section">
        <div className="journey-log__label">
          <Wrench size={14} />
          <span>Fix</span>
        </div>
        <p className="journey-log__text">{fix}</p>
      </div>

      {/* Score */}
      <div className="journey-log__section">
        <div className="journey-log__label">
          <span>Result Score</span>
        </div>
        <div className="journey-log__stars">
          {renderStars()}
          <span className="journey-log__score-text">{resultScore}/5</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="journey-log__metrics">
        <div className="journey-log__metric">
          <DollarSign size={14} />
          <span>{creditsSpent} credits</span>
        </div>
        <div className="journey-log__metric">
          <Clock size={14} />
          <span>{timeSpentMin}m</span>
        </div>
      </div>

      {/* Clip URLs */}
      {clipUrls.length > 0 && (
        <div className="journey-log__clips">
          {clipUrls.map((clip, i) => (
            <a
              key={i}
              href={clip.url}
              className="journey-log__clip-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {clip.label || `Clip ${i + 1}`}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default JourneyLogCard;
