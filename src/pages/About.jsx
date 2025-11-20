import { memo } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import Timeline from '../components/Timeline';
import timelineData from '../../data/timeline.json';

/**
 * About page - project and creator information
 * Optimized with React.memo and static animation variants
 */
const About = () => {

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page-container"
      id="about"
    >
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>About This Project</h1>
        <p className="page-subtitle">The story behind the logbook</p>
      </motion.div>

      {/* Project Timeline Section */}
      <motion.section
        id="timeline"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="card">
          <h2>Project Timeline</h2>
          <p className="page-subtitle" style={{ marginBottom: '1.5rem' }}>
            Key milestones and development phases
          </p>
          <Timeline entries={timelineData} />
        </div>
      </motion.section>

      <motion.div
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="card"
          whileHover={{ 
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h2>The Vision</h2>
          <p>
            This digital logbook documents the creation of an interactive dystopian film exploring
            themes of AI dominance, human agency, and moral choice in a world ruled by machines.
          </p>
          <p>
            The project combines cutting-edge AI video generation tools with traditional storytelling
            techniques to create an immersive, branching narrative experience that challenges viewers
            to navigate difficult ethical dilemmas.
          </p>
        </motion.div>

        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ 
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h2>The Process</h2>
          <p>
            Every step of this journey is documented here—from initial concept sketches to current
            production milestones. This logbook serves as both a creative diary and a technical reference
            for my experiments with AI-assisted filmmaking.
          </p>
          <p>
            The goal is transparency: showing the messy, iterative reality of creative work with tools
            that are still evolving and workflows that are still being figured out.
          </p>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default memo(About);
