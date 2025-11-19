import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { timelineVariants, itemVariants } from '../constants/animations';

/**
 * Timeline component with scroll and hover-based expand/collapse behavior
 * Shows date badges that expand to reveal full entry details on scroll or hover
 * Only 3 entries visible at a time (center entry + 1 above + 1 below)
 */
const Timeline = ({ entries = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleEntries, setVisibleEntries] = useState(new Set([0, 1]));
  const entryRefs = useRef([]);

  // Scroll observer for expand/collapse behavior
  useEffect(() => {
    if (entries.length === 0) return;

    // Initialize first entries as visible on mount
    const initialVisible = new Set([0]);
    if (entries.length > 1) initialVisible.add(1);
    setVisibleEntries(initialVisible);
    setExpandedIndex(0);

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

  return (
    <div className="timeline-container-new">
      <motion.div
        className="timeline-new"
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
      >
        {entries.map((entry, index) => {
          const isExpanded = expandedIndex === index || hoveredIndex === index;
          const isLast = index === entries.length - 1;

          const isVisible = visibleEntries.has(index) || hoveredIndex === index;

          return (
            <motion.div
              key={index}
              ref={(el) => (entryRefs.current[index] = el)}
              data-index={index}
              className="timeline-entry"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: (isVisible || hoveredIndex === index) ? 1 : 0.15
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Date Badge + Timeline Line */}
              <div className="timeline-left">
                <motion.div
                  className={`date-badge ${isExpanded ? 'expanded' : ''} ${entry.locked ? 'locked' : ''}`}
                  animate={{
                    scale: isExpanded ? 1.0 : 0.85,
                    backgroundColor: entry.locked
                      ? 'rgba(100, 100, 100, 0.3)'
                      : isExpanded
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(16, 18, 24, 0.8)'
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => !entry.locked && setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: entry.locked ? 'not-allowed' : 'pointer', opacity: entry.locked ? 0.6 : 1 }}
                >
                  <span className="date-text">{entry.date}</span>
                  {entry.locked && <span style={{ fontSize: '0.7rem', marginLeft: '5px', opacity: 0.7 }}>🔒</span>}
                </motion.div>
                {!isLast && <div className="timeline-connector" />}
              </div>

              {/* Content that expands/collapses */}
              <div className="timeline-right">
                <motion.div
                  className={`entry-details ${entry.locked ? 'locked-entry' : ''}`}
                  animate={{ 
                    opacity: isVisible ? 1 : 0,
                    x: isVisible ? 0 : -20,
                    height: isVisible ? 'auto' : 0,
                    marginTop: isVisible ? 0 : 0,
                    marginBottom: isVisible ? 0 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ 
                    overflow: 'hidden',
                    ...(entry.locked ? { opacity: 0.5, filter: 'grayscale(0.5)' } : {}),
                    ...(!isVisible ? { pointerEvents: 'none' } : {})
                  }}
                >
                  <h4>{entry.title}</h4>
                  <p className="task-text">
                    {entry.locked ? (
                      <em style={{ color: 'var(--muted)' }}>[Locked - Future content]</em>
                    ) : (
                      entry.task
                    )}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Timeline;
