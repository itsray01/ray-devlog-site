import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import PlaceholderCard from '../components/PlaceholderCard';
import { EXTRA_ITEMS } from '../config/extrasContent';
import { useNavigation } from '../context/NavigationContext';

// Table of Contents sections for Extras page
export const EXTRAS_SECTIONS = [
  { id: 'behind-the-scenes', title: 'Behind the Scenes' },
  { id: 'experiments', title: 'Experiments' },
  { id: 'blog-reflections', title: 'Blog & Reflections' }
];

// Organized extras sections
const EXTRAS_SECTIONS_DATA = [
  {
    id: 'behind-the-scenes',
    title: 'Behind the Scenes',
    description: 'Process documentation, development notes, and workflow insights',
    items: [EXTRA_ITEMS[0]] // Production Diary
  },
  {
    id: 'experiments',
    title: 'Experiments',
    description: 'Creative explorations, failed attempts, and learning moments',
    items: [EXTRA_ITEMS[1], EXTRA_ITEMS[2]] // Technical Experiments, Unused Scenes
  },
  {
    id: 'blog-reflections',
    title: 'Blog & Reflections',
    description: 'Thoughts on the creative process and AI-assisted filmmaking',
    items: [EXTRA_ITEMS[3]] // Dev Blog
  }
];

/**
 * Extras page - bonus content and additional resources
 * Optimized with React.memo and static data
 */
const Extras = () => {
  const { setSections } = useNavigation();

  // Register sections with navigation context
  useEffect(() => {
    setSections(EXTRAS_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  return (
    <>
      {/* Skip Link for Accessibility */}

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

        {/* Extras Sections */}
        {EXTRAS_SECTIONS_DATA.map((section, sectionIndex) => (
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
            <div className="asset-section-header">
              <h2 className="section-subtitle">{section.title}</h2>
              <p className="section-description">{section.description}</p>
            </div>

            {/* Section Items Grid */}
            <div className="asset-items-grid">
              {section.items.map((item, itemIndex) => (
                <PlaceholderCard
                  key={item.title}
                  title={item.title}
                  description={item.desc}
                  icon={item.icon}
                  delay={0.3 + sectionIndex * 0.1 + itemIndex * 0.05}
                />
              ))}
            </div>
          </motion.section>
        ))}

        {/* More to Come CTA */}
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
      </motion.div>
    </>
  );
};

export default memo(Extras);
