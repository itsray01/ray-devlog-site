import ScrollSection, { ScrollReveal } from '../ScrollSection';
import PlaceholderCard from '../PlaceholderCard';
import { ASSET_ITEMS } from '../../config/assetsContent';

const AssetsSection = () => {
  return (
    <ScrollSection id="assets" title="Assets">
      <ScrollReveal preset="fadeUp">
        <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
          Project assets, media, and resources
        </p>
      </ScrollReveal>

      <div className="assets-grid">
        {ASSET_ITEMS.map((item, index) => (
          <ScrollReveal key={item.title} preset="fadeUp" delay={index * 0.05}>
            <PlaceholderCard
              title={item.title}
              description={item.description}
            />
          </ScrollReveal>
        ))}
      </div>
    </ScrollSection>
  );
};

export default AssetsSection;
