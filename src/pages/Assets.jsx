import { memo } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import PlaceholderCard from '../components/PlaceholderCard';
import { ASSET_ITEMS } from '../config/assetsContent';

/**
 * Assets page - displays project assets
 * Optimized with React.memo and static animation variants
 */
const Assets = () => {

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-container"
        id="assets"
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
          <h1>Assets</h1>
          <p className="page-subtitle">Project assets, media, and resources</p>
        </motion.header>

      <motion.section
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        aria-label="Asset categories"
      >
        <div className="assets-grid">
          {ASSET_ITEMS.map((item, index) => (
            <PlaceholderCard
              key={item.title}
              title={item.title}
              description={item.description}
              delay={0.3 + index * 0.05}
            />
          ))}
        </div>
      </motion.section>
      </motion.div>
    </>)
  );
};

export default memo(Assets);
