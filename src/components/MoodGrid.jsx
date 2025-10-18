import { motion } from 'framer-motion';

/**
 * MoodGrid component for displaying moodboard images
 * Animated grid layout with hover effects
 */
const MoodGrid = () => {
  // Moodboard images - these would typically come from props or API
  const moodImages = [
    'img/mood-01.png',
    'img/mood-02.png', 
    'img/mood-03.png',
    'img/mood-04.png',
    'img/mood-05.png',
    'img/mood-06.png'
  ];

  // Animation variants for staggered grid entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -90
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="mood-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {moodImages.map((imagePath, index) => (
        <motion.div
          key={index}
          className="mood-item"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={imagePath} 
            alt={`Mood reference ${index + 1}`}
            loading="lazy"
          />
          <div className="mood-overlay">
            <span>Mood {index + 1}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MoodGrid;
