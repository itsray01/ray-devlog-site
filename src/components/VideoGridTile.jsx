import { useEffect, useRef, useState } from 'react';
import { handleImageError } from '../utils/imageUtils';

/**
 * VideoGridTile - Animated grid tile with auto-playing video loop
 * 
 * Features:
 * - Auto-plays subtle video loop when in viewport
 * - Falls back to static poster image on error
 * - Respects prefers-reduced-motion
 * - Uses IntersectionObserver for performance
 * - Lazy loads video when near viewport
 * 
 * @param {string} poster - Static image path (JPG/PNG)
 * @param {string} videoSrc - Base video path without extension (e.g., "/visual-grid/loops/blade-runner")
 * @param {string} title - Item title
 * @param {string} subtitle - Item subtitle (year/designer)
 * @param {Function} onClick - Click handler
 * @param {Function} onVideoStateChange - Callback when video play state changes
 */
const VideoGridTile = ({ poster, videoSrc, title, subtitle, onClick, onVideoStateChange }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver to detect when video is near viewport
  useEffect(() => {
    if (!videoRef.current || prefersReducedMotion || hasError) return;

    const video = videoRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            // Video is visible - attempt to play
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  // Notify parent that this video is playing
                  onVideoStateChange?.(video, true);
                })
                .catch((err) => {
                  // Auto-play prevented (shouldn't happen with muted videos, but handle it)
                  console.debug('Video play prevented:', err);
                });
            }
          } else {
            // Video left viewport - pause to save resources
            video.pause();
            onVideoStateChange?.(video, false);
          }
        });
      },
      {
        // Start loading/playing when video is 200px from entering viewport
        rootMargin: '200px',
        threshold: 0.1
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [prefersReducedMotion, hasError, onVideoStateChange]);

  // Handle video errors - fall back to static image
  const handleVideoError = () => {
    console.debug(`Video failed to load: ${videoSrc}`);
    setHasError(true);
  };

  // If reduced motion or video error, show static image only
  if (prefersReducedMotion || hasError || !videoSrc) {
    return (
      <figure className="grid-tile" onClick={onClick} style={{ cursor: 'pointer' }}>
        <img
          src={poster}
          alt={title}
          loading="lazy"
          onError={handleImageError}
          className="grid-tile-media"
        />
        <figcaption>
          <strong>{title}</strong>
          <br />
          <span className="muted" style={{ fontSize: '0.85rem' }}>{subtitle}</span>
        </figcaption>
      </figure>
    );
  }

  // Show video as primary element (clickable)
  // When clicked, lightbox opens with static poster image
  return (
    <figure className="grid-tile" onClick={onClick} style={{ cursor: 'pointer' }}>
      <video
        ref={videoRef}
        className="grid-tile-media grid-tile-video"
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        onError={handleVideoError}
        aria-label={`${title} animated loop`}
      >
        {/* WebM first (better compression) */}
        <source src={`${videoSrc}.webm`} type="video/webm" />
        {/* MP4 fallback (broader support) */}
        <source src={`${videoSrc}.mp4`} type="video/mp4" />
      </video>
      
      <figcaption>
        <strong>{title}</strong>
        <br />
        <span className="muted" style={{ fontSize: '0.85rem' }}>{subtitle}</span>
      </figcaption>
    </figure>
  );
};

export default VideoGridTile;

