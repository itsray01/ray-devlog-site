import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, FileText } from 'lucide-react';

/**
 * AssetCard - Interactive card component for assets
 * Opens a modal with detailed information and images
 * 
 * @param {string} category - Asset category label (e.g., "Visual Development")
 * @param {string} title - Asset title
 * @param {string} description - Short description
 * @param {object} details - Detailed info { writeup: string, images: string[], status: string }
 * @param {number} delay - Animation delay
 */
const AssetCard = ({ category, title, description, details, delay = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle escape key to close modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  return (
    <>
      {/* Asset Card */}
      <motion.div
        className="card asset-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="asset-card-header">
          <span className="asset-category">{category}</span>
        </div>
        <h3 className="asset-title">{title}</h3>
        <p className="asset-description">{description}</p>
        
        <motion.button
          className="asset-view-button"
          onClick={openModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText size={18} />
          <span>View Details</span>
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="asset-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="asset-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                className="asset-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Modal Header */}
              <div className="asset-modal-header">
                <span className="asset-category">{category}</span>
                <h2 id="modal-title">{title}</h2>
              </div>

              {/* Modal Content */}
              <div className="asset-modal-content">
                {/* Status Badge */}
                <div className={`asset-status-badge asset-status-${details.status}`}>
                  {details.status === 'available' ? '✓ Available' : 
                   details.status === 'in-progress' ? '⏳ In Progress' : 
                   '📅 Coming Soon'}
                </div>

                {/* Write-up */}
                <div className="asset-modal-writeup">
                  <h3>About This Collection</h3>
                  <p>{details.writeup}</p>
                </div>

                {/* Images Preview */}
                {details.images && details.images.length > 0 && (
                  <div className="asset-modal-images">
                    <h3>Preview Gallery</h3>
                    <div className="asset-image-grid">
                      {details.images.map((img, index) => (
                        <div key={index} className="asset-image-placeholder">
                          <Image size={32} />
                          <span>{img}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AssetCard;
