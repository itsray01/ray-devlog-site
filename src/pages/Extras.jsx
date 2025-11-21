import { memo } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import PlaceholderCard from '../components/PlaceholderCard';
import { EXTRA_ITEMS } from '../config/extrasContent';

/**
 * Extras page - bonus content and additional resources
 * Optimized with React.memo and static data
 */
const Extras = () => {

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
        id="extras"
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
          <h1>Extras</h1>
          <p className="page-subtitle">Bonus content, experiments, and explorations</p>
        </motion.header>

      <motion.section
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        aria-label="Extras content categories"
      >
        <div className="content-grid">
        {EXTRA_ITEMS.map((item, index) => (
          <PlaceholderCard
            key={item.title}
            title={item.title}
            description={item.desc}
            icon={item.icon}
            delay={0.3 + index * 0.1}
          />
        ))}

        <motion.div
          className="card cta-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 40px rgba(138, 43, 226, 0.4)",
            transition: { duration: 0.2 }
          }}
          role="note"
          aria-label="Future content announcement"
        >
          <h2>More to Come</h2>
          <p>
            This section will be continuously updated with additional content, experimental pieces,
            and deep dives into specific aspects of the project. Check back regularly for new additions.
          </p>
        </motion.div>
        </div>
      </motion.section>
      </motion.div>
    </>
  );
};

export default memo(Extras);
