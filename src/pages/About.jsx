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
            Every step of this journey is documented here—from initial concept sketches to final
            production. This logbook serves as both a creative diary and a technical reference,
            tracking experiments with various AI tools, narrative iterations, and production decisions.
          </p>
          <p>
            The goal is transparency: showing the messy, iterative reality of creative work in an
            emerging medium where tools and techniques are still being discovered.
          </p>
        </motion.div>

        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ 
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h2>Contact & Collaboration</h2>
          <p>
            Interested in following along or collaborating? This logbook will be regularly updated
            with new experiments, insights, and milestones.
          </p>
          <div className="contact-placeholder">
            <p>Contact information and collaboration details coming soon.</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default memo(About);
