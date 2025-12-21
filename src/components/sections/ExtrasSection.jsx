import PlaceholderCard from '../PlaceholderCard';
import { EXTRA_ITEMS } from '../../config/extrasContent';

const ExtrasSection = () => {
  return (
    <section id="extras" title="Extras">
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Bonus content, experiments, and explorations
      </p>

      <div className="content-grid">
        {EXTRA_ITEMS.map((item, index) => (
          <PlaceholderCard
            key={item.title}
            title={item.title}
            description={item.desc}
            icon={item.icon}
          />
        ))}

        <div className="card cta-card">
          <h3>More to Come</h3>
          <p>
            This section will be continuously updated with additional content, experimental pieces,
            and deep dives into specific aspects of the project. Check back regularly for new additions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExtrasSection;
