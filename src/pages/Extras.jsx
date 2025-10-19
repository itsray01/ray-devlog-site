import { memo, useMemo } from 'react';
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

// Static data moved outside component
const EXTRA_ITEMS = [
  {
    title: "Behind the Scenes",
    desc: "Process videos, tool comparisons, and creative decisions.",
    icon: "🎬"
  },
  {
    title: "Research & Reading",
    desc: "Articles, papers, and media that influenced the project.",
    icon: "📚"
  },
  {
    title: "Interactive Prototypes",
    desc: "Early branching narrative experiments and UI tests.",
    icon: "🎮"
  },
  {
    title: "Outtakes & Experiments",
    desc: "Failed experiments, interesting accidents, and alternative directions.",
    icon: "✨"
  }
];

/**
 * Extras page - bonus content and additional resources
 * Optimized with React.memo and static data
 */
const Extras = () => {

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page-container"
      id="extras"
    >
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Extras</h1>
        <p className="page-subtitle">Bonus content, experiments, and explorations</p>
      </motion.div>

      <motion.section
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="content-grid">
        {EXTRA_ITEMS.map((item, index) => (
          <motion.div
            key={item.title}
            className="card extra-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
              transition: { duration: 0.2 }
            }}
          >
            <div className="extra-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="extra-placeholder">Coming Soon</div>
          </motion.div>
        ))}
      </motion.div>

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
  );
};

export default memo(Extras);
