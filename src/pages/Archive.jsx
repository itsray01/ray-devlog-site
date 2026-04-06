import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import AssetCard from '../components/AssetCard';
import AssetModal from '../components/AssetModal';
import { useNavigationActions } from '../context/NavigationContext';
import { ASSETS_DATA, ASSETS_SECTIONS } from '../config/assetsContent';

const Archive = () => {
  const { setSections } = useNavigationActions();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSections(ASSETS_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  const handleViewAsset = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAsset(null), 300);
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-container page--assets"
        id="archive"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>
        
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Archive</h1>
          <p className="page-subtitle">Evidence, assets, and supporting materials</p>
          <p>
            This archive collects the primary outputs and supporting evidence for the decisions
            documented across the devlog. Each item here corresponds to a stage in the process —
            moodboards that set the visual brief, storyboards that preceded generation, video clips
            that proved or disproved a workflow assumption, and interface screenshots that show
            how the Twine artefact evolved. Read alongside the <a href="/process">Process</a> and{' '}
            <a href="/timeline">Timeline</a> pages, these materials make the argument concrete:
            this is what the iteration actually produced.
          </p>
        </motion.header>

        {Object.values(ASSETS_DATA).map((section, sectionIndex) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="content-section asset-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + sectionIndex * 0.1 }}
            aria-label={section.title}
          >
            <div className="asset-section__header">
              <h2 className="asset-section__title">{section.title}</h2>
              <p className="asset-section__subtitle">{section.description}</p>
            </div>

            <div className="asset-grid">
              {section.items.map((item, itemIndex) => (
                <AssetCard
                  key={item.id}
                  asset={item}
                  onView={() => handleViewAsset(item)}
                  delay={0.4 + sectionIndex * 0.1 + itemIndex * 0.05}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>

      <AssetModal
        asset={selectedAsset}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default memo(Archive);
