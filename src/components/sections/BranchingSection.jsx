import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';

// Lazy load the heavy StoryTimeline component
const StoryTimeline = lazy(() => import('../StoryTimeline'));

/**
 * Branching Narrative section - Interactive story flow
 * Using Framer Motion for interactive animations
 */
const BranchingSection = () => {
  const [branchingExpanded, setBranchingExpanded] = useState(false);
  const sectionRef = useRef(null);

  const toggleBranching = useCallback(() => {
    setBranchingExpanded(prev => !prev);
  }, []);

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="branching"
      className="content-section scroll-section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={toggleBranching}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleBranching();
            }
          }}
          tabIndex={0}
          role="button"
          aria-expanded={branchingExpanded}
          aria-label={branchingExpanded ? "Collapse branching narrative" : "Expand branching narrative"}
        >
          <div>
            <motion.h2
              animate={{
                backgroundImage: branchingExpanded
                  ? 'linear-gradient(135deg, var(--ink), var(--ink))'
                  : [
                      'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)',
                      'linear-gradient(135deg, #b794f6, #c9a9ff, #b794f6)',
                      'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)'
                    ],
                textShadow: branchingExpanded
                  ? '0 0 0px rgba(138, 43, 226, 0)'
                  : ['0 0 10px rgba(138, 43, 226, 0.6)', '0 0 25px rgba(183, 148, 246, 1)', '0 0 10px rgba(138, 43, 226, 0.6)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                margin: 0,
                marginBottom: '0.5rem',
                position: 'relative',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: branchingExpanded ? 'var(--ink)' : 'transparent'
              }}
            >
              Branching Narrative Flow
            </motion.h2>
            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              Interactive story paths with multiple decision points and alternative routes.
              Click on any node to explore the narrative structure.
            </p>
          </div>
          <motion.span
            animate={{
              rotate: branchingExpanded ? 180 : 0,
              backgroundImage: branchingExpanded
                ? 'linear-gradient(135deg, var(--accent), var(--accent))'
                : [
                    'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)',
                    'linear-gradient(135deg, #b794f6, #c9a9ff, #b794f6)',
                    'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)'
                  ],
              filter: branchingExpanded
                ? 'drop-shadow(0 0 8px rgba(138, 43, 226, 0.6))'
                : ['drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))', 'drop-shadow(0 0 20px rgba(183, 148, 246, 1))', 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))']
            }}
            transition={{
              rotate: { duration: 0.3 },
              backgroundImage: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              fontSize: '1.5rem',
              marginLeft: '1rem',
              flexShrink: 0,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: branchingExpanded ? 'var(--accent)' : 'transparent',
              textShadow: '0 0 10px rgba(138, 43, 226, 0.8)'
            }}
          >
            ▼
          </motion.span>
        </div>
        <AnimatePresence>
          {branchingExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ marginTop: '1.5rem' }}>
                <Suspense fallback={
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>
                    Loading story timeline...
                  </div>
                }>
                  <StoryTimeline />
                </Suspense>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default BranchingSection;
