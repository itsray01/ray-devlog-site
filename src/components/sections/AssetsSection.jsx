import PlaceholderCard from '../PlaceholderCard';
import { ASSET_ITEMS } from '../../config/assetsContent';

const AssetsSection = () => {
  return (
    <section id="assets" title="Assets">
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Project assets, media, and resources
      </p>

      <div className="assets-grid">
        {ASSET_ITEMS.map((item, index) => (
          <PlaceholderCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default AssetsSection;
