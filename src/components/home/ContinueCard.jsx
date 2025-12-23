import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { RotateCcw, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'devlog_last_section';
const DEBOUNCE_DELAY = 600;

/**
 * ContinueCard - Save-file style card showing last visited section
 * Stores and retrieves from localStorage with debouncing
 */
const ContinueCard = () => {
  const { scrollToSection, activeSectionId, sections } = useNavigation();
  const [lastSection, setLastSection] = useState(null);
  const debounceTimerRef = useRef(null);

  // Load last section from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLastSection(parsed);
      }
    } catch (err) {
      console.warn('Failed to load last section from localStorage:', err);
    }
  }, []);

  // Update localStorage when active section changes (debounced)
  useEffect(() => {
    if (!activeSectionId || sections.length === 0) return;

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      const section = sections.find(s => s.id === activeSectionId);
      if (section) {
        const data = {
          id: section.id,
          label: section.title,
          ts: Date.now()
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setLastSection(data);
        } catch (err) {
          console.warn('Failed to save last section to localStorage:', err);
        }
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [activeSectionId, sections]);

  const handleContinue = () => {
    const targetId = lastSection?.id || 'overview';
    scrollToSection(targetId);
  };

  // Calculate relative time
  const getRelativeTime = (timestamp) => {
    if (!timestamp) return '';

    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const displayLabel = lastSection?.label || 'Start Logbook';
  const relativeTime = lastSection?.ts ? getRelativeTime(lastSection.ts) : '';

  return (
    <div className="home-hub__panel continue-card">
      <div className="continue-card__header">
        <RotateCcw size={16} />
        <span className="continue-card__label">SAVE FILE</span>
      </div>

      <div className="continue-card__content">
        <div className="continue-card__section">
          <span className="continue-card__key">CONTINUE:</span>
          <span className="continue-card__value">{displayLabel}</span>
        </div>

        {relativeTime && (
          <div className="continue-card__meta">
            Last visited: {relativeTime}
          </div>
        )}
      </div>

      <button
        onClick={handleContinue}
        className="continue-card__btn"
        aria-label={`Continue to ${displayLabel}`}
      >
        <span>RESUME</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default ContinueCard;
