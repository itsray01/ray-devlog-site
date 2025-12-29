import { useState, useEffect, useCallback } from 'react';

/**
 * ShootingStars - Rare shooting star streaks across the background
 *
 * Spawns shooting stars at random intervals (6-14 seconds) with random
 * start positions and trajectories. Uses CSS animations for smooth performance.
 * Automatically removes stars after animation completes.
 */
const ShootingStars = () => {
  const [stars, setStars] = useState([]);

  // Generate random shooting star properties
  const createShootingStar = useCallback(() => {
    const id = Date.now() + Math.random();
    const startX = Math.random() * 100; // 0-100%
    const startY = Math.random() * 60; // Top 60% of screen
    const duration = 0.8 + Math.random() * 0.4; // 0.8-1.2s
    const angle = 30 + Math.random() * 30; // 30-60 degrees
    const length = 60 + Math.random() * 80; // 60-140px trail
    const brightness = 0.6 + Math.random() * 0.4; // 0.6-1.0 opacity

    return {
      id,
      startX,
      startY,
      duration,
      angle,
      length,
      brightness,
    };
  }, []);

  // Spawn shooting stars at random intervals
  useEffect(() => {
    const spawnStar = () => {
      const newStar = createShootingStar();
      setStars((prev) => [...prev, newStar]);

      // Remove star after animation completes
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, newStar.duration * 1000 + 100);
    };

    // Initial delay before first star
    const initialDelay = Math.random() * 3000 + 2000; // 2-5s

    const initialTimeout = setTimeout(() => {
      spawnStar();

      // Schedule recurring stars at random intervals
      const scheduleNext = () => {
        const delay = Math.random() * 8000 + 6000; // 6-14s
        return setTimeout(() => {
          spawnStar();
          scheduleNext();
        }, delay);
      };

      scheduleNext();
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, [createShootingStar]);

  return (
    <div className="shooting-stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            '--start-x': `${star.startX}%`,
            '--start-y': `${star.startY}%`,
            '--duration': `${star.duration}s`,
            '--angle': `${star.angle}deg`,
            '--length': `${star.length}px`,
            '--brightness': star.brightness,
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
