import { motion } from 'framer-motion';

/**
 * FeatureGrid - Responsive grid container for FeatureCards
 * 
 * @param {number} columns - Number of columns (1-4), default 3
 * @param {string} gap - Gap size ('sm' | 'md' | 'lg'), default 'md'
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - FeatureCard children
 */
const FeatureGrid = ({ 
  columns = 3, 
  gap = 'md',
  className = '',
  children 
}) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className={`feature-grid feature-grid--cols-${columns} feature-grid--gap-${gap} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  );
};

export default FeatureGrid;
