/**
 * Shared animation variants and transitions
 * Extracted to prevent recreation on every render
 */

export const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.05 }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

export const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: (index) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut"
    }
  })
};

export const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export const dropdownVariants = {
  hidden: { 
    x: -20, 
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    x: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: { 
    x: -20, 
    opacity: 0,
    scale: 0.95,
    transition: { 
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

export const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};


