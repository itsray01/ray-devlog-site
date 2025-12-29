import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, Copy, Check, Film, Image as ImageIcon, FileText, Music } from 'lucide-react';

/**
 * AssetModal - Cinematic full-screen modal for asset previews
 * Features:
 * - Left: Large preview (image/video) or placeholder
 * - Right: Metadata panel with details
 * - Bottom: Action buttons
 * - ESC closes, backdrop closes
 * - Smooth animations, locks body scroll
 * - Subtle scanline overlay
 * 
 * @param {object} asset - Asset data object
 * @param {boolean} isOpen - Modal open state
 * @param {function} onClose - Close callback
 */
const AssetModal = ({ asset, isOpen, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // ESC key handler
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Copy link to clipboard
  const handleCopyLink = async () => {
    const linkToCopy = asset.link || asset.preview || window.location.href;
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(linkToCopy);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = linkToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Get icon based on type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Film;
      case 'image': return ImageIcon;
      case 'audio': return Music;
      case 'doc': return FileText;
      default: return FileText;
    }
  };

  const TypeIcon = getTypeIcon(asset?.type);
  const hasPreview = asset?.preview && !imageError;

  if (!asset) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="asset-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="asset-modal-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Always Visible */}
            <button
              className="asset-modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="asset-modal__content">
              {/* LEFT: Preview Area */}
              <div className="asset-modal__preview">
                {hasPreview ? (
                  asset.type === 'video' ? (
                    <video
                      src={asset.preview}
                      className="asset-modal__preview-video"
                      controls
                      autoPlay
                      loop
                      playsInline
                      preload="metadata"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <img
                      src={asset.preview}
                      alt={asset.title}
                      className="asset-modal__preview-image"
                      loading="lazy"
                      decoding="async"
                      onError={() => setImageError(true)}
                    />
                  )
                ) : (
                  <div className="asset-modal__preview-placeholder">
                    <TypeIcon size={120} strokeWidth={1} />
                    <p>No preview available</p>
                  </div>
                )}
                
                {/* Subtle Scanline Overlay */}
                <div className="asset-modal__scanline" aria-hidden="true"></div>
              </div>

              {/* RIGHT: Metadata Panel */}
              <div className="asset-modal__metadata">
                {/* Header */}
                <div className="asset-modal__header">
                  <span className="asset-modal__category">{asset.category}</span>
                  <h2 className="asset-modal__title">{asset.title}</h2>
                </div>

                {/* Details */}
                <div className="asset-modal__details">
                  <dl className="asset-modal__info">
                    <div className="asset-modal__info-row">
                      <dt>Type</dt>
                      <dd>
                        <span className="asset-modal__type-badge">
                          <TypeIcon size={14} />
                          {asset.type}
                        </span>
                      </dd>
                    </div>
                    
                    <div className="asset-modal__info-row">
                      <dt>Tool/Engine</dt>
                      <dd>{asset.tool}</dd>
                    </div>
                    
                    <div className="asset-modal__info-row">
                      <dt>Date</dt>
                      <dd>{asset.date}</dd>
                    </div>
                    
                    {asset.tags && asset.tags.length > 0 && (
                      <div className="asset-modal__info-row asset-modal__info-row--tags">
                        <dt>Tags</dt>
                        <dd>
                          <div className="asset-modal__tags">
                            {asset.tags.map((tag, index) => (
                              <span key={index} className="asset-modal__tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </dd>
                      </div>
                    )}
                  </dl>

                  {/* Description */}
                  <div className="asset-modal__description">
                    <h3>Description</h3>
                    <p>{asset.description}</p>
                  </div>

                  {/* Notes */}
                  {asset.notes && (
                    <div className="asset-modal__notes">
                      <h3>Notes</h3>
                      <p>{asset.notes}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="asset-modal__actions">
                  {asset.link && (
                    <motion.a
                      href={asset.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="asset-modal__button asset-modal__button--primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      <span>Open</span>
                    </motion.a>
                  )}
                  
                  {asset.preview && (
                    <motion.a
                      href={asset.preview}
                      download
                      className="asset-modal__button asset-modal__button--secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download size={18} />
                      <span>Download</span>
                    </motion.a>
                  )}
                  
                  <motion.button
                    onClick={handleCopyLink}
                    className="asset-modal__button asset-modal__button--secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copySuccess ? <Check size={18} /> : <Copy size={18} />}
                    <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssetModal;




