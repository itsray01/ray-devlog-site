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
        {videoType === "mp4" ? (
          <video 
            controls 
            src={videoUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
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
              display: 'block'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
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

