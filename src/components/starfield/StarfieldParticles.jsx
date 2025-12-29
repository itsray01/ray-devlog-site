import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

/**
 * StarfieldParticles - Layered particle system for deep space effect
 *
 * Supports two variants:
 * - "stars": Many tiny twinkling points (main starfield)
 * - "dust": Fewer, larger, slower drifting particles (space dust layer)
 *
 * @param {string} variant - "stars" or "dust"
 */
const StarfieldParticles = ({ variant = 'stars' }) => {
  const [init, setInit] = useState(false);
  const [perfProfile, setPerfProfile] = useState({ isMobile: false, isLowPower: false });

  // Initialize particles engine once (shared across both variants)
  useEffect(() => {
    // Check if already initialized globally
    if (typeof window !== 'undefined' && window.__particlesEngineInitialized) {
      setInit(true);
      return;
    }

    initParticlesEngine(async (engine) => {
      // Load slim bundle for better performance
      await loadSlim(engine);
    }).then(() => {
      if (typeof window !== 'undefined') {
        window.__particlesEngineInitialized = true;
      }
      setInit(true);
    }).catch(err => {
      console.error('[Starfield] Failed to init particles:', err);
    });
  }, []);

  // Lightweight perf profile (mobile/low-power) for particle caps
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const compute = () => {
      const isMobile = window.innerWidth < 768;
      const isLowPower =
        isMobile ||
        (typeof navigator !== 'undefined' &&
          ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
            (navigator.deviceMemory && navigator.deviceMemory <= 4)));

      setPerfProfile({ isMobile, isLowPower });
    };

    compute();
    window.addEventListener('resize', compute, { passive: true });
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Particle configuration - different for stars vs dust
  const options = useMemo(() => {
    const { isMobile, isLowPower } = perfProfile;
    const baseConfig = {
      fullScreen: false,
      fpsLimit: isLowPower ? 40 : 60,
      detectRetina: true,
      background: {
        color: 'transparent',
      },
      smooth: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    };

    // Stars variant: many tiny twinkling points
    if (variant === 'stars') {
      return {
        ...baseConfig,
        particles: {
          number: {
            value: isLowPower ? 110 : 200,
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
          },
          color: {
            value: ['#ffffff', '#e0e7ff', '#c7d2fe'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: { min: 0.2, max: 1 },
            animation: {
              enable: true,
              speed: 0.8,
              sync: false,
              minimumValue: 0.1,
            },
          },
          size: {
            value: { min: 0.3, max: 1.5 },
          },
          move: {
            enable: true,
            speed: 0.1,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out',
            },
          },
          links: {
            enable: false,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: false,
            },
            onClick: {
              enable: false,
            },
            resize: {
              enable: true,
            },
          },
        },
      };
    }

    // Dust variant: fewer, larger, slower particles
    return {
      ...baseConfig,
      particles: {
        number: {
          value: isLowPower ? 24 : 50,
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
        },
        color: {
          value: ['#a5b4fc', '#8b5cf6', '#c084fc'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.05, max: 0.25 },
          animation: {
            enable: true,
            speed: 0.2,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          enable: true,
          speed: 0.15,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'out',
          },
        },
        links: {
          enable: false,
        },
      },
      interactivity: {
        events: {
          onHover: isMobile
            ? { enable: false }
            : {
                enable: true,
                mode: 'bubble',
                parallax: {
                  enable: true,
                  force: 3,
                  smooth: 10,
                },
              },
          onClick: {
            enable: false,
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          bubble: {
            distance: 150,
            size: 4,
            duration: 2,
            opacity: 0.35,
          },
        },
      },
    };
  }, [variant, perfProfile]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If reduced motion, show static overlay instead
  if (prefersReducedMotion) {
    return (
      <div
        className={`starfield-particles starfield-particles--static starfield-particles--${variant}`}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: variant === 'stars' ? 0.4 : 0.15,
          background: variant === 'stars'
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(139, 92, 246, 0.02) 50%, transparent 100%)',
        }}
      />
    );
  }

  // Don't render until initialized
  if (!init) {
    return null;
  }

  return (
    <div className={`starfield-particles starfield-particles--${variant}`}>
      <Particles
        id={`tsparticles-${variant}`}
        options={options}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default StarfieldParticles;
