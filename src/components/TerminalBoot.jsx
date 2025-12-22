import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TerminalBoot - Boot sequence animation component
 * 
 * Displays terminal-style typewriter text with subtle glitch effects.
 * Calls onComplete() after boot sequence finishes.
 * 
 * Features:
 * - Typewriter reveal of terminal lines
 * - Subtle flicker/glitch during boot
 * - Fail-open: if anything errors, calls onComplete immediately
 * - prefers-reduced-motion: skips boot and calls onComplete instantly
 */

const BOOT_LINES = [
  { text: 'SYSTEM: HELIO-9', delay: 300 },
  { text: 'Authenticating...', delay: 700 },
  { text: 'Loading logbook modules...', delay: 1200 },
  { text: 'Access granted.', delay: 800, isSuccess: true }
];

const TOTAL_BOOT_TIME = 4500; // ms before onComplete (includes pause after Access granted)

const TerminalBoot = ({ onComplete, bootDuration = TOTAL_BOOT_TIME }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);
  const completedRef = useRef(false);
  const timeoutsRef = useRef([]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Safe completion handler - only call once
  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  // Boot sequence logic
  useEffect(() => {
    // Fail-open: if reduced motion, skip immediately
    if (prefersReducedMotion) {
      handleComplete();
      return;
    }

    try {
      // Schedule each line to appear
      let cumulativeDelay = 0;
      
      BOOT_LINES.forEach((line, index) => {
        cumulativeDelay += line.delay;
        
        const timeout = setTimeout(() => {
          setVisibleLines(prev => [...prev, { ...line, index }]);
          setCurrentLineIndex(index);
          
          // Trigger flicker on each line
          setIsFlickering(true);
          setTimeout(() => setIsFlickering(false), 50);
        }, cumulativeDelay);
        
        timeoutsRef.current.push(timeout);
      });

      // Complete after total boot time
      const completeTimeout = setTimeout(() => {
        handleComplete();
      }, bootDuration);
      
      timeoutsRef.current.push(completeTimeout);

    } catch (err) {
      // Fail-open: if anything errors, show menu immediately
      console.error('[TerminalBoot] Error during boot sequence:', err);
      handleComplete();
    }
  }, [prefersReducedMotion, bootDuration, handleComplete]);

  // Random glitch effect on flicker
  const glitchStyle = isFlickering ? {
    transform: `translateX(${Math.random() * 2 - 1}px)`,
    opacity: 0.8 + Math.random() * 0.2
  } : {};

  // Skip render entirely if reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="terminal-boot" style={glitchStyle}>
      <div className="terminal-boot__lines">
        <AnimatePresence mode="sync">
          {visibleLines.map((line, idx) => (
            <motion.div
              key={idx}
              className={`terminal-boot__line ${line.isSuccess ? 'terminal-boot__line--success' : ''}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <TerminalLineTypewriter 
                text={line.text} 
                isSuccess={line.isSuccess}
                isActive={idx === currentLineIndex}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Blinking cursor at end of last line */}
      {visibleLines.length > 0 && (
        <motion.span 
          className="terminal-boot__cursor"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          _
        </motion.span>
      )}
    </div>
  );
};

/**
 * TerminalLineTypewriter - Single line with typewriter effect
 */
const TerminalLineTypewriter = ({ text, isSuccess, isActive }) => {
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0);
  
  useEffect(() => {
    if (!isActive) {
      // If not active, just show full text
      setDisplayText(text);
      return;
    }
    
    // Reset for new line
    indexRef.current = 0;
    setDisplayText('');
    
    const typeInterval = setInterval(() => {
      indexRef.current += 1;
      setDisplayText(text.slice(0, indexRef.current));
      
      if (indexRef.current >= text.length) {
        clearInterval(typeInterval);
      }
    }, 40); // Slower typewriter speed for dramatic effect
    
    return () => clearInterval(typeInterval);
  }, [text, isActive]);

  return (
    <span className={isSuccess ? 'terminal-boot__text--success' : ''}>
      {displayText}
    </span>
  );
};

export default TerminalBoot;
