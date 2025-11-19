import { memo } from 'react';
import { motion } from 'framer-motion';
import Timeline from '../components/Timeline';
import timelineData from '../../data/timeline.json';
import { pageVariants, pageTransition } from '../constants/animations';

/**
 * Timeline page - displays project timeline
 * Shows the full timeline with scroll and reveal effects
 */
const TimelinePage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page-container"
      id="timeline"
    >
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Project Timeline</h1>
        <p className="page-subtitle">Chronological documentation of development milestones and key decisions</p>
      </motion.div>

      <motion.section
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="card">
          <Timeline entries={timelineData} />
        </div>
      </motion.section>
    </motion.div>
  );
};

export default memo(TimelinePage);

