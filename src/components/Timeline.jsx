import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Timeline component with scroll and hover-based expand/collapse behavior
 * Shows date badges that expand to reveal full entry details on scroll or hover
 * Only 3 entries visible at a time (center entry + 1 above + 1 below)
 */
const Timeline = ({ entries = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleEntries, setVisibleEntries] = useState(new Set());
  const entryRefs = useRef([]);

  // Scroll observer for expand/collapse behavior
  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        observerEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setExpandedIndex(index);
            
            // Show current entry + 1 before + 1 after (total 3 visible)
            const newVisible = new Set();
            if (index > 0) newVisible.add(index - 1); // Entry above
            newVisible.add(index); // Current entry
            if (index < entries.length - 1) newVisible.add(index + 1); // Entry below
            
            setVisibleEntries(newVisible);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Center detection zone
        threshold: 0.5
      }
    );

    entryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [entries.length]);

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="timeline-container-new">
      <h3>Project Timeline</h3>
      <motion.div
        className="timeline-new"
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
      >
        {entries.map((entry, index) => {
          const isExpanded = expandedIndex === index || hoveredIndex === index;
          const isLast = index === entries.length - 1;

          const isVisible = visibleEntries.has(index);

          return (
            <motion.div
              key={index}
              ref={(el) => (entryRefs.current[index] = el)}
              data-index={index}
              className="timeline-entry"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isVisible ? 1 : 0.15
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Date Badge + Timeline Line */}
              <div className="timeline-left">
                <motion.div
                  className={`date-badge ${isExpanded ? 'expanded' : ''}`}
                  animate={{
                    scale: isExpanded ? 1.1 : 1,
                    backgroundColor: isExpanded
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(16, 18, 24, 0.8)'
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="date-text">{entry.date}</span>
                </motion.div>
                {!isLast && <div className="timeline-connector" />}
              </div>

              {/* Content that expands/collapses */}
              <div className="timeline-right">
                <AnimatePresence mode="wait">
                  {isVisible && (
                    <motion.div
                      className="entry-details"
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <h4>{entry.title}</h4>
                      <p className="task-text">{entry.task}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Timeline;
