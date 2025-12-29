import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Film, Image as ImageIcon, FileText, Music } from 'lucide-react';

/**
 * AssetCard - Premium grid card with uniform layout
 * Features:
 * - Thumbnail area (image or gradient placeholder)
 * - Title clamped to 1 line
 * - Description clamped to 2 lines
 * - Tags row (1 line)
 * - Footer actions pinned to bottom
 * 
 * @param {object} asset - Asset data object
 * @param {function} onView - Callback when card is clicked
 * @param {number} delay - Animation delay
 */
const AssetCard = ({ asset, onView, delay = 0 }) => {
  const [imageError, setImageError] = useState(false);
  
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

  const TypeIcon = getTypeIcon(asset.type);
  const hasPreview = asset.preview && !imageError;

  return (
    <motion.div
      className="asset-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      onClick={onView}
    >
      {/* Thumbnail Area */}
      <div className="asset-card__thumbnail">
        {hasPreview ? (
          asset.type === 'video' ? (
            <video
              src={asset.preview}
              className="asset-card__thumbnail-video"
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
              onError={() => setImageError(true)}
            />
          ) : (
            <img
              src={asset.preview}
              alt={asset.title}
              className="asset-card__thumbnail-image"
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
          )
        ) : (
          <div className="asset-card__thumbnail-placeholder">
            <TypeIcon size={48} strokeWidth={1.5} />
          </div>
        )}
        
        {/* Type Badge */}
        <div className="asset-card__type-badge">
          <TypeIcon size={14} />
          <span>{asset.type}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="asset-card__body">
        {/* Category */}
        <span className="asset-card__category">{asset.category}</span>
        
        {/* Title - clamp 1 line */}
        <h3 className="asset-card__title">{asset.title}</h3>
        
        {/* Description - clamp 2 lines */}
        <p className="asset-card__description">{asset.description}</p>
        
        {/* Tags - 1 line */}
        <div className="asset-card__tags">
          {asset.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="asset-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions - pinned to bottom */}
      <div className="asset-card__actions">
        <motion.button
          className="asset-card__button asset-card__button--primary"
          onClick={(e) => { e.stopPropagation(); onView(); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye size={16} />
          <span>View Details</span>
        </motion.button>
        
        <span className="asset-card__tool">{asset.tool}</span>
      </div>
    </motion.div>
  );
};

export default AssetCard;




