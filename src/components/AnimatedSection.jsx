import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Animated section component with scroll-triggered animations
 * Adds smooth reveal effects when sections come into view
 */
const AnimatedSection = ({ id, dataTitle, children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom easing
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      data-title={dataTitle}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;

