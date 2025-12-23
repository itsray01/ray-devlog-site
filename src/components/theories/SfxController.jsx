import { useState, useCallback, useRef, createContext, useContext } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * SFX Controller using Web Audio oscillator
 * No audio files needed - generates tones programmatically
 * Respects user gesture requirement for AudioContext
 */

const SfxContext = createContext(null);

export const useSfx = () => {
  const context = useContext(SfxContext);
  return context || { enabled: false, playTick: () => {}, playConfirm: () => {}, playDown: () => {} };
};

export const SfxProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Initialize AudioContext on first user interaction
  const initAudio = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        hasInteractedRef.current = true;
      } catch (e) {
        console.warn('Web Audio not supported');
      }
    }
    return audioContextRef.current;
  }, []);

  // Play a tone with given frequency and duration
  const playTone = useCallback((frequency, duration, type = 'sine', volume = 0.08) => {
    if (!enabled) return;
    
    const ctx = audioContextRef.current;
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Quick attack, smooth decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignore audio errors silently
    }
  }, [enabled]);

  // Hover tick - soft high click
  const playTick = useCallback(() => {
    playTone(800, 0.05, 'square', 0.04);
  }, [playTone]);

  // Confirm beep - pleasant rising tone
  const playConfirm = useCallback(() => {
    if (!enabled || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      
      // Rising chord
      osc1.frequency.setValueAtTime(440, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.15);
      osc2.frequency.setValueAtTime(554, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(1108, ctx.currentTime + 0.15);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.2);
      osc2.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Ignore
    }
  }, [enabled]);

  // Down tick - soft falling tone
  const playDown = useCallback(() => {
    if (!enabled || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Ignore
    }
  }, [enabled]);

  const toggleSfx = useCallback(() => {
    // Initialize audio on first enable
    if (!enabled) {
      initAudio();
    }
    setEnabled(prev => !prev);
  }, [enabled, initAudio]);

  const value = {
    enabled,
    toggleSfx,
    playTick,
    playConfirm,
    playDown
  };

  return (
    <SfxContext.Provider value={value}>
      {children}
    </SfxContext.Provider>
  );
};

/**
 * SFX Toggle Button for HUD
 */
export const SfxToggle = () => {
  const { enabled, toggleSfx } = useSfx();

  return (
    <button
      className={`theories__sfx-toggle ${enabled ? 'theories__sfx-toggle--on' : ''}`}
      onClick={toggleSfx}
      aria-label={`Sound effects ${enabled ? 'on' : 'off'}`}
    >
      {enabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
      <span className="theories__sfx-label">SFX:</span>
      <span className="theories__sfx-status">{enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
};

export default SfxProvider;

