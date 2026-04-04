import { Link } from 'react-router-dom';
import PlaceholderCard from '../PlaceholderCard';
import { JOURNAL_TEASERS } from '../../config/journalContent';

const JournalSection = () => {
  return (
    <section id="journal" title="Journal">
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Process notes, tools, Twine, hosting, and reflection—short posts that backfill how the project was made.
      </p>

      <div className="content-grid">
        {JOURNAL_TEASERS.map((item) => (
          <PlaceholderCard
            key={item.title}
            title={item.title}
            description={item.desc}
            icon={item.icon}
          />
        ))}

        <div className="card cta-card">
          <h3>
            <Link to="/journal" style={{ color: 'inherit', textDecoration: 'none' }}>
              Read the full journal →
            </Link>
          </h3>
          <p>
            Eight posts on renaming the project, the AI pipeline, model comparisons, furnace prompting, Twine + McKeown,
            GitHub media, mobile prototyping, and what the process taught me.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
