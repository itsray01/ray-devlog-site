import { memo } from 'react';

/**
 * EntryVideo component for displaying video media in devlog entries
 * Supports both MP4 files and embedded videos (YouTube, Vimeo, etc.)
 */
const EntryVideo = ({ title, url, type }) => {
  if (type === 'mp4') {
    return (
      <div className="entry-video">
        {title && <h5 className="video-title">{title}</h5>}
        <video 
          controls 
          className="video-player"
          preload="metadata"
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (type === 'embed') {
    // Extract video ID from common URL patterns
    const getEmbedUrl = (videoUrl) => {
      // YouTube patterns
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const youtubeMatch = videoUrl.match(youtubeRegex);
      if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      }

      // Vimeo patterns
      const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
      const vimeoMatch = videoUrl.match(vimeoRegex);
      if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
      }

      // If already an embed URL, return as-is
      if (videoUrl.includes('/embed/')) {
        return videoUrl;
      }

      // Fallback: return original URL
      return videoUrl;
    };

    const embedUrl = getEmbedUrl(url);

    return (
      <div className="entry-video">
        {title && <h5 className="video-title">{title}</h5>}
        <div className="video-embed-wrapper">
          <iframe
            src={embedUrl}
            className="video-embed"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || 'Embedded video'}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default memo(EntryVideo);

