import { memo } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';

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
        <div className="assets-grid">
          {/* Row 1 */}
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

          {/* Row 2 */}
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

          {/* Row 3 */}
          <motion.div 
            className="card asset-card"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
              transition: { duration: 0.2 }
            }}
          >
            <h3>Additional Assets</h3>
            <p>Future project resources and materials.</p>
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
            <h3>Archive</h3>
            <p>Historical project files and documentation.</p>
            <div className="asset-placeholder">Coming Soon</div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default memo(Assets);
