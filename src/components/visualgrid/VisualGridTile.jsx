import { useEffect, useRef, useState } from 'react';
import { handleImageError } from '../../utils/imageUtils';

/**
 * VisualGridTile - Lazy-loading grid tile with video loop
 * 
 * Features:
 * - Lazy loads video source only when entering viewport
 * - Pauses and unloads video when leaving viewport to reduce memory/lag
 * - Uses only WebM format (user requirement)
 * - Respects prefers-reduced-motion
 * - Falls back to poster image on error
 * 
 * @param {string} id - Stable video ID matching /visual-grid/loops/{id}.webm
 * @param {string} poster - Static image path (JPG/PNG) for thumbnail
 * @param {string} title - Item title
 * @param {string} subtitle - Item subtitle (optional)
 * @param {Function} onClick - Click handler (optional)
 */
const VisualGridTile = ({ id, poster, title, subtitle, onClick }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver for lazy loading and auto pause/unload
  useEffect(() => {
    if (!videoRef.current || prefersReducedMotion || hasError) return;

    const video = videoRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entering viewport - load and play
            setShouldLoad(true);
          } else {
            // Leaving viewport - pause and unload to reduce lag/memory
            if (video) {
              video.pause();
              // Unload video sources
              video.removeAttribute('src');
              while (video.firstChild) {
                video.removeChild(video.firstChild);
              }
              video.load();
            }
            setShouldLoad(false);
          }
        });
      },
      {
        rootMargin: '200px 0px', // Start loading 200px before entering viewport
        threshold: 0.15
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      if (video) {
        video.pause();
      }
    };
  }, [prefersReducedMotion, hasError, id]);

  // Load and play video when shouldLoad becomes true
  useEffect(() => {
    if (!shouldLoad || !videoRef.current || prefersReducedMotion || hasError) return;

    const video = videoRef.current;
    const videoUrl = `/visual-grid/loops/${id}.webm`;

    // Create and add source element
    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = 'video/webm';
    video.appendChild(source);

    // Load and play
    video.load();
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Silently handle autoplay errors
        console.debug(`[VisualGridTile] Play prevented for ${id}:`, err);
      });
    }
  }, [shouldLoad, id, prefersReducedMotion, hasError]);

  // Handle video errors - fall back to static image
  const handleVideoError = (e) => {
    const video = videoRef.current;
    console.warn('[VisualGridTile] video failed', { 
      id, 
      url: `/visual-grid/loops/${id}.webm`,
      error: video?.error 
    });
    setHasError(true);
  };

  // If reduced motion or video error, show static image only
  if (prefersReducedMotion || hasError) {
    return (
      <figure className="grid-tile" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <img
          src={poster}
          alt={title}
          loading="lazy"
          onError={handleImageError}
          className="grid-tile-media"
        />
        <figcaption>
          <strong>{title}</strong>
          {subtitle && (
            <>
              <br />
              <span className="muted" style={{ fontSize: '0.85rem' }}>{subtitle}</span>
            </>
          )}
        </figcaption>
      </figure>
    );
  }

  // Render video element with lazy loading
  return (
    <figure className="grid-tile" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <video
        ref={videoRef}
        className="grid-tile-media grid-tile-video"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        controls={false}
        onError={handleVideoError}
        aria-label={`${title} animated loop`}
      >
        {/* Source is dynamically added by lazy loading logic */}
      </video>
      
      <figcaption>
        <strong>{title}</strong>
        {subtitle && (
          <>
            <br />
            <span className="muted" style={{ fontSize: '0.85rem' }}>{subtitle}</span>
          </>
        )}
      </figcaption>
    </figure>
  );
};

export default VisualGridTile;



