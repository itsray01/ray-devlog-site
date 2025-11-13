import { memo } from 'react';
import { motion } from 'framer-motion';
import EntryVideo from './EntryVideo';

// Move animation variants outside to prevent recreation
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: (index) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1, // Stagger animation based on index
      ease: "easeOut"
    }
  })
};

/**
 * DevlogCard component for displaying individual devlog entries
 * Simplified design with date, title, and task
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const DevlogCard = ({ entry, index = 0 }) => {
  const hasMedia = entry.videos && Array.isArray(entry.videos) && entry.videos.length > 0;

  return (
    <motion.article
      className="card note"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <h3>{entry.title}</h3>
      <small className="meta">{entry.date}</small>
      
      <p className="task-content">{entry.task}</p>

      {/* Media from this phase */}
      {hasMedia && (
        <div className="entry-media-section">
          <h4>Media from this phase</h4>
          <div className="entry-media-grid">
            {entry.videos.map((video, videoIndex) => (
              <EntryVideo
                key={videoIndex}
                title={video.title}
                url={video.url}
                type={video.type}
              />
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default memo(DevlogCard);
