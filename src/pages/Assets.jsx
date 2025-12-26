import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import AssetCard from '../components/AssetCard';
import AssetModal from '../components/AssetModal';
import { useNavigation } from '../context/NavigationContext';
import { ASSETS_DATA, ASSETS_SECTIONS } from '../config/assetsContent';

/**
 * Assets page - Premium grid layout with cinematic modal previews
 * Features:
 * - Wider content column (1600-1800px)
 * - Uniform card layout with aligned buttons
 * - Full-screen modal for detailed previews
 * - Premium game UI aesthetic
 */
const Assets = () => {
  const { setSections } = useNavigation();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Register sections with navigation context
  useEffect(() => {
    setSections(ASSETS_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  // Handle asset card click
  const handleViewAsset = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay before clearing selected asset to allow exit animation
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
        id="assets"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>
        
        {/* Page Header */}
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Assets</h1>
          <p className="page-subtitle">Project assets, media, and production resources</p>
        </motion.header>

        {/* Asset Sections */}
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
            {/* Section Header */}
            <div className="asset-section__header">
              <h2 className="asset-section__title">{section.title}</h2>
              <p className="asset-section__subtitle">{section.description}</p>
            </div>

            {/* Asset Grid */}
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

      {/* Asset Modal */}
      <AssetModal
        asset={selectedAsset}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default memo(Assets);
