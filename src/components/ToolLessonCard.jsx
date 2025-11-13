import { motion } from 'framer-motion';

/**
 * ToolLessonCard - Card component for AI tool lessons with video at top
 * @param {string} title - The heading for the tool
 * @param {React.ReactNode} children - The content (paragraphs, lists, etc.)
 * @param {string} videoUrl - URL to the video (MP4 or embed URL)
 * @param {"mp4" | "embed"} videoType - Type of video (mp4 for direct video, embed for iframe)
 * @param {number} delay - Animation delay for framer-motion
 */
const ToolLessonCard = ({ title, children, videoUrl, videoType = "mp4", delay = 0 }) => {
  return (
    <motion.article 
      className="card note"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {/* Video Container - 16:9 aspect ratio */}
      <div className="tool-video-container">
        {/* Placeholder - always visible by default */}
        <div className="video-placeholder">
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>▶</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Video placeholder</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.5rem' }}>Add video at: {videoUrl}</div>
        </div>
        
        {/* Video - positioned on top, will cover placeholder if it loads */}
        {videoType === "mp4" ? (
          <video 
            controls 
            src={videoUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              position: 'relative',
              zIndex: 2
            }}
            onLoadedData={(e) => {
              // Hide placeholder when video loads successfully
              const placeholder = e.target.parentElement.querySelector('.video-placeholder');
              if (placeholder) placeholder.style.display = 'none';
            }}
            onError={(e) => {
              // Keep placeholder visible if video fails
              e.target.style.display = 'none';
            }}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            src={videoUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              position: 'relative',
              zIndex: 2
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            onLoad={(e) => {
              // Hide placeholder when iframe loads successfully
              const placeholder = e.target.parentElement.querySelector('.video-placeholder');
              if (placeholder) placeholder.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Heading */}
      <h3>{title}</h3>

      {/* Content */}
      {children}
    </motion.article>
  );
};

export default ToolLessonCard;

