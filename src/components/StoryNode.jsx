import React from 'react';
import { motion } from 'framer-motion';

const StoryNode = ({ 
  node, 
  isSelected, 
  isHovered, 
  onClick, 
  onMouseEnter, 
  onMouseLeave,
  scale = 1,
  style = {}
}) => {
  const { id, type, title, act } = node;
  
  const isEnding = type === 'ending';
  const isChoice = type === 'choice';
  const isBeat = type === 'beat';
  
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: scale, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      }
    },
    hover: { 
      scale: scale * 1.05,
      transition: { duration: 0.15 }
    },
    selected: { 
      scale: scale * 1.02,
      transition: { duration: 0.15 }
    }
  };

  const getNodeColor = () => {
    if (isSelected) return '#f59e0b'; // Amber when selected
    if (isHovered) return '#fbbf24'; // Lighter amber on hover
    if (isEnding) return '#10b981'; // Green for endings
    if (isChoice) return '#3b82f6'; // Blue for choices
    return '#6b7280'; // Gray for beats
  };

  const getNodeSize = () => {
    if (isEnding) return 50; // Larger for endings
    return 40; // Standard size for beats and choices
  };

  const size = getNodeSize();
  const color = getNodeColor();

  return (
    <motion.div
      className="story-node"
      variants={nodeVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="selected"
      onClick={() => onClick(node)}
      onMouseEnter={() => onMouseEnter(node)}
      onMouseLeave={() => onMouseLeave(node)}
      style={{
        width: size,
        height: size,
        cursor: 'pointer',
        ...style
      }}
    >
      {/* Node shape */}
      <motion.div
        className={`node-shape ${isEnding ? 'diamond' : 'circle'}`}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: color,
          borderRadius: isEnding ? '4px' : '50%',
          transform: isEnding ? 'rotate(45deg)' : 'none',
          boxShadow: isSelected || isHovered 
            ? `0 0 15px ${color}60`
            : '0 0 8px rgba(0,0,0,0.3)',
          border: `2px solid ${isSelected ? '#f59e0b' : 'rgba(255,255,255,0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Node content */}
        <div
          style={{
            transform: isEnding ? 'rotate(-45deg)' : 'none',
            fontSize: isEnding ? '12px' : '10px',
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '0 0 4px rgba(0,0,0,0.8)',
            textAlign: 'center',
            lineHeight: 1
          }}
        >
          {isEnding ? '★' : (isChoice ? '?' : '●')}
        </div>
      </motion.div>

      {/* Node label */}
      <motion.div
        className="node-label"
        style={{
          position: 'absolute',
          left: size + 10,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '12px',
          color: isSelected ? '#f59e0b' : '#9aa0a6',
          fontWeight: '500',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          opacity: isHovered || isSelected ? 1 : 0.7,
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          maxWidth: '200px'
        }}
        animate={{
          opacity: isHovered || isSelected ? 1 : 0.7,
          color: isSelected ? '#f59e0b' : '#9aa0a6'
        }}
      >
        {title}
      </motion.div>

      {/* Act indicator */}
      <motion.div
        className="act-indicator"
        style={{
          position: 'absolute',
          top: -25,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          color: '#6b7280',
          fontWeight: '600',
          textAlign: 'center',
          opacity: isHovered || isSelected ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
          backgroundColor: 'rgba(10, 11, 13, 0.8)',
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}
        animate={{
          opacity: isHovered || isSelected ? 1 : 0.5
        }}
      >
        Act {act}
      </motion.div>
    </motion.div>
  );
};

export default StoryNode;
