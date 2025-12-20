import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Vertex shader - simple UV pass-through
const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment shader - premium cyberpunk tear band effect
const FRAG = `
precision highp float;

uniform float uTime;
uniform float uProgress;
uniform vec3  uAccentA;
uniform vec3  uAccentB;
uniform float uOpacity;

varying vec2 vUv;

// Hash / noise functions
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

float easeInOut(float t) {
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  float t = clamp(uProgress, 0.0, 1.0);
  float e = easeInOut(t);

  // Subtle scanline (very light)
  float scan = 0.012 * sin((vUv.y * 80.0) + uTime * 1.8);

  // Noise field along x, animated slowly
  float n = fbm(vec2(vUv.x * 6.5, uTime * 0.15));
  float n2 = fbm(vec2(vUv.x * 16.0, uTime * 0.3));

  // The tear band centerline "wiggles" with noise
  float amp = mix(0.005, 0.14, e);
  float center = 0.5 + (n - 0.5) * amp;

  // Band thickness grows with progress
  float thick = mix(0.0, 0.16, e);

  // Softness around edges
  float soft = mix(0.04, 0.025, e);

  // Distance to noisy centerline
  float d = abs(vUv.y - center);

  // Wipe reveal across X (left to right) as progress increases
  float wipe = smoothstep(0.0, 1.0, (vUv.x - (1.0 - e)) / 0.25);
  wipe = clamp(wipe, 0.0, 1.0);

  // Tear band alpha (filled region, not a line)
  float band = 1.0 - smoothstep(thick, thick + soft, d);
  band *= wipe;

  // Edge highlight: a thin rim near the band boundary
  float edge = smoothstep(thick + 0.008, thick - 0.008, d);
  edge *= wipe;

  // Add micro "sparkle" / jitter only when active
  float grit = mix(0.0, 0.1, e) * (n2 - 0.5);

  // Color blend: subtle, with edge carrying accent
  vec3 baseCol = mix(uAccentA, uAccentB, n);
  baseCol += scan;
  baseCol += grit * 0.12;

  vec3 edgeCol = mix(uAccentB, uAccentA, n);
  edgeCol += 0.03;

  // Final alpha: keep low for tasteful effect
  float alpha = (band * uOpacity) + (edge * (uOpacity * 0.85));

  // Combine: boost edge slightly without thick glow
  vec3 col = baseCol * (band * 0.5) + edgeCol * (edge * 0.8);

  gl_FragColor = vec4(col, alpha);
}
`;

/**
 * TearPlane - The actual WebGL plane mesh with shader material
 * Exposes material ref via callback for external animation control
 */
function TearPlane({ accentA, accentB, opacity, onMaterialReady }) {
  const matRef = useRef();
  const hasCalledBack = useRef(false);

  // Update time uniform every frame
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  // Notify parent when material is ready
  useEffect(() => {
    if (matRef.current && !hasCalledBack.current && onMaterialReady) {
      onMaterialReady(matRef.current);
      hasCalledBack.current = true;
    }
  }, [onMaterialReady]);

  return (
    <mesh>
      <planeGeometry args={[2, 1, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uAccentA: { value: new THREE.Color(accentA) },
          uAccentB: { value: new THREE.Color(accentB) },
          uOpacity: { value: opacity },
        }}
      />
    </mesh>
  );
}

/**
 * Fallback CSS divider for reduced motion / WebGL failure
 */
function FallbackDivider({ height }) {
  return (
    <div
      className="tear-divider-fallback"
      style={{
        width: '100%',
        height: height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, var(--accent-primary) 20%, var(--accent-secondary) 50%, var(--accent-primary) 80%, transparent 100%)',
          opacity: 0.4,
        }}
      />
    </div>
  );
}

/**
 * TearDividerGL - Premium WebGL tear divider with scroll-triggered animation
 * 
 * @param {string} nextSectionId - ID of the next section to trigger animation on scroll
 * @param {number} height - Height of the divider in pixels (default: 120)
 * @param {string} accentA - Primary accent color hex (default: theme purple)
 * @param {string} accentB - Secondary accent color hex (default: theme cyan)
 * @param {number} opacity - Base opacity 0-1 (default: 0.22)
 * @param {string} className - Additional CSS classes
 */
export default function TearDividerGL({
  nextSectionId,
  height = 120,
  accentA = '#8b5cf6',
  accentB = '#06b6d4',
  opacity = 0.22,
  className = '',
}) {
  const wrapRef = useRef(null);
  const matRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);
  
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Handle material ready callback
  const handleMaterialReady = useCallback((material) => {
    matRef.current = material;
    
    // If reduced motion, set progress to 1 immediately (static visible state)
    if (prefersReducedMotion) {
      material.uniforms.uProgress.value = 1;
      return;
    }

    // Setup ScrollTrigger once material is ready
    if (nextSectionId && !scrollTriggerRef.current) {
      const triggerElement = document.getElementById(nextSectionId);
      
      if (triggerElement) {
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: triggerElement,
          start: 'top 85%',
          end: 'top 35%',
          onEnter: () => {
            gsap.to(material.uniforms.uProgress, {
              value: 1,
              duration: 0.8,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(material.uniforms.uProgress, {
              value: 0,
              duration: 0.5,
              ease: 'power2.inOut',
            });
          },
          onEnterBack: () => {
            gsap.to(material.uniforms.uProgress, {
              value: 1,
              duration: 0.6,
              ease: 'power2.out',
            });
          },
          onLeave: () => {
            // Keep at 1 when scrolling past
          },
        });
      }
    }
  }, [nextSectionId, prefersReducedMotion]);

  // Cleanup ScrollTrigger on unmount
  useEffect(() => {
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  // Handle WebGL context loss / failure
  const handleCreated = useCallback(({ gl }) => {
    gl.canvas.addEventListener('webglcontextlost', () => {
      setWebglFailed(true);
    });
  }, []);

  // Show fallback for reduced motion or WebGL failure
  if (prefersReducedMotion || webglFailed) {
    return <FallbackDivider height={height} />;
  }

  return (
    <div
      ref={wrapRef}
      className={`tear-divider-gl ${className}`}
      style={{
        width: '100%',
        height: height,
        pointerEvents: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-hidden="true"
      role="separator"
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 2], zoom: 100 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: true,
        }}
        style={{ width: '100%', height: '100%' }}
        onCreated={handleCreated}
        onError={() => setWebglFailed(true)}
      >
        <TearPlane
          accentA={accentA}
          accentB={accentB}
          opacity={opacity}
          onMaterialReady={handleMaterialReady}
        />
      </Canvas>
    </div>
  );
}
