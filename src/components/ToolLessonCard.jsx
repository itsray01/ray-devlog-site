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
  // Ensure we always render the video container
  return (
    <motion.article 
      className="card note"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {/* TEST: This should appear before h3 */}
      <div style={{ 
        height: '300px', 
        width: '100%', 
        backgroundColor: 'rgba(138, 43, 226, 0.3)', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        border: '3px solid #8a2be2'
      }}>
        <div style={{ color: '#fff', fontSize: '1.5rem' }}>VIDEO CONTAINER TEST</div>
      </div>
      
      {/* Video Container - 16:9 aspect ratio - MUST BE VISIBLE */}
      <div 
        className="tool-video-container" 
        data-testid="video-container"
        style={{ 
          minHeight: '300px',
          height: '300px',
          width: '100%',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          border: '2px solid rgba(138, 43, 226, 0.5)'
        }}
      >
        {/* Placeholder - always visible by default */}
        <div 
          className="video-placeholder"
          style={{
            display: 'flex !important',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            visibility: 'visible !important',
            opacity: '1 !important'
          }}
        >
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
              position: 'absolute',
              top: 0,
              left: 0,
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
              position: 'absolute',
              top: 0,
              left: 0,
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

