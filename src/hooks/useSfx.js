import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * useSfx - Web Audio API sound effects hook
 * 
 * Generates short synthesized sounds for hover/click interactions.
 * NO external mp3s needed. Only initializes AudioContext on user interaction.
 * 
 * Features:
 * - Hover tick: short high-pitch blip
 * - Confirm click: slightly lower pitch with longer decay
 * - User must explicitly enable via toggle
 * - Respects reduced motion preference
 */
const useSfx = () => {
  const audioContextRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasInteractedRef = useRef(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Initialize AudioContext (only after user interaction)
  const initAudioContext = useCallback(() => {
    if (audioContextRef.current || prefersReducedMotion) return true;
    
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('[useSfx] Web Audio API not supported');
        return false;
      }
      
      audioContextRef.current = new AudioContextClass();
      setIsInitialized(true);
      return true;
    } catch (err) {
      console.warn('[useSfx] Failed to create AudioContext:', err);
      return false;
    }
  }, [prefersReducedMotion]);

  // Resume AudioContext if suspended (browser autoplay policy)
  const ensureAudioContextResumed = useCallback(async () => {
    const ctx = audioContextRef.current;
    if (ctx && ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch (err) {
        console.warn('[useSfx] Failed to resume AudioContext:', err);
      }
    }
  }, []);

  // Play a synthesized beep/tick sound
  const playTone = useCallback(async (frequency = 800, duration = 0.05, volume = 0.15, type = 'square') => {
    if (prefersReducedMotion) return;
    
    // Initialize AudioContext on first user interaction (required by browsers)
    if (!audioContextRef.current) {
      initAudioContext();
    }
    
    if (!audioContextRef.current) return;
    
    await ensureAudioContextResumed();
    
    const ctx = audioContextRef.current;
    if (ctx.state !== 'running') return;

    try {
      // Create oscillator
      const oscillator = ctx.createOscillator();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Create gain node for volume envelope
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      // Connect and play
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
      
      // Cleanup
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (err) {
      // Silently fail - audio glitches shouldn't break the UI
    }
  }, [prefersReducedMotion, ensureAudioContextResumed, initAudioContext]);

  // Hover tick: short, high pitch
  const playHover = useCallback(() => {
    playTone(1200, 0.03, 0.08, 'square');
  }, [playTone]);

  // Confirm click: lower pitch, slightly longer
  const playConfirm = useCallback(() => {
    // Play two quick tones for a "confirm" feel
    playTone(600, 0.06, 0.12, 'square');
    setTimeout(() => playTone(800, 0.08, 0.10, 'sine'), 60);
  }, [playTone]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, []);

  return {
    isInitialized,
    playHover,
    playConfirm,
    prefersReducedMotion
  };
};

export default useSfx;
