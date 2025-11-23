import { motion } from 'framer-motion';

/**
 * PlaceholderCard - Reusable card component for "Coming Soon" content
 * Used in Assets and Extras pages
 * 
 * @param {string} title - Card heading
 * @param {string} description - Card description text
 * @param {string} icon - Optional emoji icon
 * @param {number} delay - Animation delay for staggered entrance
 */
const PlaceholderCard = ({ title, description, icon, delay = 0 }) => {
  return (
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
      {icon && <div className="extra-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="asset-placeholder">Coming Soon</div>
    </motion.div>
  );
};

export default PlaceholderCard;



