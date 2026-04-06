import { Link } from 'react-router-dom';
import { PenLine, ArrowRight } from 'lucide-react';
import { DIARY_ENTRIES } from '../../config/journalContent';

/**
 * DiaryPreviewCard — replaces the old ContinueCard / save-file panel.
 * Shows a compact preview of the development diary entries with a CTA to /diary.
 */
const DiaryPreviewCard = () => {
  const entryCount = DIARY_ENTRIES.length;
  const preview = DIARY_ENTRIES.slice(0, 3);

  return (
    <div className="home-hub__panel diary-preview">
      <div className="diary-preview__header">
        <PenLine size={16} aria-hidden />
        <span className="diary-preview__label">DEVELOPMENT DIARY</span>
        <span className="diary-preview__count">{entryCount} entries</span>
      </div>

      <div className="diary-preview__entries">
        {preview.map((entry, i) => (
          <div key={entry.id} className="diary-preview__entry">
            <span className="diary-preview__number">{String(i + 1).padStart(2, '0')}</span>
            <div className="diary-preview__text">
              <span className="diary-preview__title">{entry.title}</span>
              <span className="diary-preview__date">{entry.date}</span>
            </div>
            {entry.kind === 'opening' && (
              <span className="diary-preview__badge">OPENING</span>
            )}
          </div>
        ))}

        {entryCount > 3 && (
          <div className="diary-preview__more">
            + {entryCount - 3} more {entryCount - 3 === 1 ? 'entry' : 'entries'}
          </div>
        )}
      </div>

      <Link to="/diary" className="diary-preview__cta">
        <span>View My Entries</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default DiaryPreviewCard;
