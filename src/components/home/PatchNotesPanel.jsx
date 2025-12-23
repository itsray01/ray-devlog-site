import { useNavigation } from '../../context/NavigationContext';
import patchNotes from '../../content/patchNotes';
import { ArrowRight } from 'lucide-react';

const MAX_NOTES = 4;

/**
 * PatchNotesPanel - Latest development updates
 * Shows recent patch notes with optional jump-to links
 */
const PatchNotesPanel = () => {
  const { scrollToSection } = useNavigation();

  const latestNotes = patchNotes.slice(0, MAX_NOTES);

  const handleJump = (sectionId) => {
    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <div className="home-hub__panel patch-notes-panel">
      <div className="patch-notes-panel__header">
        <span className="patch-notes-panel__label">PATCH NOTES</span>
        <span className="patch-notes-panel__subtitle">Latest Updates</span>
      </div>

      <div className="patch-notes-panel__list">
        {latestNotes.map((note, index) => (
          <div
            key={`${note.build}-${index}`}
            className="patch-note"
          >
            <div className="patch-note__header">
              <div className="patch-note__meta">
                <span className="patch-note__build">{note.build}</span>
                <span className="patch-note__date">{note.date}</span>
              </div>
              {note.tags && note.tags.length > 0 && (
                <div className="patch-note__tags">
                  {note.tags.map((tag) => (
                    <span key={tag} className="patch-note__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h3 className="patch-note__title">{note.title}</h3>

            {note.bullets && note.bullets.length > 0 && (
              <ul className="patch-note__bullets">
                {note.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}

            {note.jumpTo && (
              <button
                onClick={() => handleJump(note.jumpTo)}
                className="patch-note__jump"
                aria-label={`Jump to ${note.jumpTo} section`}
              >
                <span>Jump to section</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatchNotesPanel;
