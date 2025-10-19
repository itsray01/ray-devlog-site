import { memo } from 'react';
import { motion } from 'framer-motion';

// Move animation variants outside component
const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.05 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

/**
 * Assets page - displays project assets
 * Optimized with React.memo and static animation variants
 */
const Assets = () => {

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page-container"
      id="assets"
    >
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Assets</h1>
        <p className="page-subtitle">Project assets, media, and resources</p>
      </motion.div>

      <motion.section
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="content-grid">
        <motion.div 
          className="card asset-card"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h3>Video Assets</h3>
          <p>Generated clips, test footage, and final renders from various AI video tools.</p>
          <div className="asset-placeholder">Coming Soon</div>
        </motion.div>

        <motion.div 
          className="card asset-card"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h3>Sound Design</h3>
          <p>Ambient tracks, sound effects, and voice-over recordings.</p>
          <div className="asset-placeholder">Coming Soon</div>
        </motion.div>

        <motion.div 
          className="card asset-card"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h3>Concept Art</h3>
          <p>Visual development, storyboards, and reference imagery.</p>
          <div className="asset-placeholder">Coming Soon</div>
        </motion.div>

        <motion.div 
          className="card asset-card"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h3>Technical Documents</h3>
          <p>Prompt logs, parameter settings, and generation notes.</p>
          <div className="asset-placeholder">Coming Soon</div>
        </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default memo(Assets);
