import { motion } from 'framer-motion';

/**
 * ToolLessonCard - Card component for AI tool lessons with video at top
 * @param {string} title - The heading for the tool
 * @param {React.ReactNode} children - The content (paragraphs, lists, etc.)
 * @param {string} videoUrl - URL to the video (MP4 or embed URL)
 * @param {"mp4" | "embed"} videoType - Type of video (mp4 for direct video, embed for iframe)
 * @param {number} delay - Animation delay for framer-motion
 */
const ToolLessonCard = ({
  title,
  children,
  videoUrl,
  videoType = "mp4",
  delay = 0,
  presetNote,
  promptText
}) => {
  // Ensure we always render the video container
  return (
    <motion.article 
      className="card note"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {/* Video Container - 16:9 aspect ratio */}
      <div 
        className="tool-video-container" 
        style={{ 
          width: '100%',
          aspectRatio: '16 / 9',
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          marginBottom: '1.5rem'
        }}
      >
        {/* Placeholder - always visible by default */}
        <div 
          className="video-placeholder"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none'
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
            preload="metadata"
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

      {/* Preset Note */}
      <p style={{ 
        fontSize: '0.85rem', 
        color: 'var(--muted)', 
        fontStyle: 'italic',
        marginTop: '-0.5rem',
        marginBottom: '1rem',
        lineHeight: '1.6'
      }}>
        <strong>Note:</strong>{' '}
        {presetNote || (
          <>
            For this comparison, every model uses the same generated reference image and the same base prompt.
            A Start Frame or End Frame is mandatory, and Elements are also mandatory to lock character identity
            and scene continuity across outputs.
          </>
        )}
      </p>

      {promptText && (
        <div
          style={{
            marginTop: '-0.25rem',
            marginBottom: '1rem',
            border: '1px solid var(--glass-border)',
            background: 'var(--panel)',
            borderRadius: '8px',
            padding: '0.85rem'
          }}
          aria-label="Prompt used for cross-model comparison"
        >
          <p
            style={{
              margin: 0,
              marginBottom: '0.5rem',
              fontSize: '0.76rem',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
              fontWeight: 700
            }}
          >
            Shared test prompt
          </p>
          <pre
            style={{
              margin: 0,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              fontSize: '0.78rem',
              lineHeight: 1.55,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: 'var(--ink)'
            }}
          >
            {promptText}
          </pre>
        </div>
      )}

      {/* Heading */}
      <h3>{title}</h3>

      {/* Content */}
      {children}
    </motion.article>
  );
};

export default ToolLessonCard;

