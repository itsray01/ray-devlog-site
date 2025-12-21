import ScrollSection, { ScrollReveal } from '../ScrollSection';
import PlaceholderCard from '../PlaceholderCard';
import { EXTRA_ITEMS } from '../../config/extrasContent';

const ExtrasSection = () => {
  return (
    <ScrollSection id="extras" title="Extras">
      <ScrollReveal preset="fadeUp">
        <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
          Bonus content, experiments, and explorations
        </p>
      </ScrollReveal>

      <div className="content-grid">
        {EXTRA_ITEMS.map((item, index) => (
          <ScrollReveal key={item.title} preset="fadeUp" delay={index * 0.1}>
            <PlaceholderCard
              title={item.title}
              description={item.desc}
              icon={item.icon}
            />
          </ScrollReveal>
        ))}

        <ScrollReveal preset="fadeUp" delay={0.5}>
          <div className="card cta-card">
            <h3>More to Come</h3>
            <p>
              This section will be continuously updated with additional content, experimental pieces,
              and deep dives into specific aspects of the project. Check back regularly for new additions.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </ScrollSection>
  );
};

export default ExtrasSection;
