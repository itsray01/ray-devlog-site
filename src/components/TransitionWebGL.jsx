import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Configuration for easy intensity tweaking
 */
const CONFIG = {
  // Transition timing
  duration: 0.75,              // Transition duration in seconds (0.6-0.9)
  ease: 'power3.inOut',        // GSAP easing
  
  // Seam appearance
  noiseScale: 4.0,             // Noise frequency for edge (3-6)
  edgeSoftness: 0.15,          // Edge blur/softness (0.1-0.25)
  edgeWidth: 0.03,             // Glow seam width (0.02-0.05)
  
  // Colors (accent colors from CSS vars)
  seamColor: [167, 139, 250],   // --accent-primary: #a78bfa
  glowColor: [124, 58, 237],    // --accent-secondary: #7c3aed
  glowIntensity: 0.6,           // Glow brightness (0.4-0.8)
  
  // Screen veil
  veilOpacity: 0.12,            // Semi-transparent overlay during transition (0.08-0.2)
  veilColor: [10, 14, 39],      // --bg color
};

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - premium horizontal wipe with noisy edge
const fragmentShader = `
  uniform float uProgress;       // 0..1 transition progress
  uniform float uDirection;      // 1 = down, -1 = up
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uNoiseScale;
  uniform float uEdgeSoftness;
  uniform float uEdgeWidth;
  uniform vec3 uSeamColor;
  uniform vec3 uGlowColor;
  uniform float uGlowIntensity;
  uniform vec3 uVeilColor;
  uniform float uVeilOpacity;
  uniform float uActive;         // 1 = transitioning, 0 = idle
  
  varying vec2 vUv;
  
  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    // Early exit if not active (fully transparent)
    if (uActive < 0.5) {
      gl_FragColor = vec4(0.0);
      return;
    }
    
    vec2 uv = vUv;
    
    // Calculate seam position based on progress and direction
    // For direction 1 (scrolling down), seam sweeps from top (y=1) to bottom (y=0)
    // For direction -1 (scrolling up), seam sweeps from bottom (y=0) to top (y=1)
    float seamY;
    if (uDirection > 0.0) {
      seamY = 1.0 - uProgress;  // Top to bottom
    } else {
      seamY = uProgress;        // Bottom to top
    }
    
    // Add noise to seam edge for organic feel
    float noise = snoise(vec2(uv.x * uNoiseScale * 8.0, uTime * 0.5)) * 0.03;
    noise += snoise(vec2(uv.x * uNoiseScale * 16.0, uTime * 0.3)) * 0.015;
    
    // Distance from seam line with noise displacement
    float distFromSeam = uv.y - (seamY + noise);
    
    // Create the seam edge glow
    // Thin bright line at the exact seam
    float seamLine = 1.0 - smoothstep(0.0, uEdgeWidth, abs(distFromSeam));
    
    // Wider soft glow around the seam
    float glowArea = 1.0 - smoothstep(0.0, uEdgeSoftness, abs(distFromSeam));
    
    // Calculate progress-based intensity (fade in/out at start/end)
    float progressFade = sin(uProgress * 3.14159);
    
    // Mix seam colors
    vec3 seamColorNorm = uSeamColor / 255.0;
    vec3 glowColorNorm = uGlowColor / 255.0;
    
    // Combine seam line and glow
    vec3 edgeColor = mix(glowColorNorm, seamColorNorm, seamLine);
    float edgeAlpha = (seamLine * 0.9 + glowArea * uGlowIntensity * 0.5) * progressFade;
    
    // Add subtle veil effect during transition
    vec3 veilColorNorm = uVeilColor / 255.0;
    float veilAlpha = uVeilOpacity * progressFade * 0.5;
    
    // Final composite
    vec3 finalColor = edgeColor;
    float finalAlpha = max(edgeAlpha, veilAlpha);
    
    // Add subtle scanline texture for premium feel
    float scanline = sin(uv.y * uResolution.y * 0.5) * 0.02;
    finalColor += scanline;
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

/**
 * TransitionWebGL - Screen-space transition overlay for section changes
 * 
 * Features:
 * - Scroll-driven trigger (NOT timed)
 * - Premium noisy seam with soft glow
 * - Direction-aware animation (up/down scroll)
 * - Only renders during transitions (pauses rAF when idle)
 * - Uses imperative API for GSAP control
 */
const TransitionWebGL = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const animationRef = useRef(null);
  const tweenRef = useRef(null);
  const isActiveRef = useRef(false);
  
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLAvailable(!!gl);
    } catch (e) {
      setIsWebGLAvailable(false);
    }
  }, []);

  // Check reduced motion
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);

    const handleChange = (e) => setPrefersReducedMotion(!!e?.matches);

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', handleChange);
      return () => query.removeEventListener('change', handleChange);
    }

    // Safari < 14
    if (typeof query.addListener === 'function') {
      query.addListener(handleChange);
      return () => query.removeListener(handleChange);
    }

    return undefined;
  }, []);

  // Start animation loop
  const startLoop = useCallback(() => {
    if (animationRef.current || !rendererRef.current) return;
    
    let startTime = Date.now();
    const animate = () => {
      if (!isActiveRef.current) {
        animationRef.current = null;
        return;
      }
      
      const elapsed = (Date.now() - startTime) / 1000;
      
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = elapsed;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, []);

  // Stop animation loop
  const stopLoop = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Pause render loop when tab is hidden (extra safety beyond "only active while transitioning")
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const onVisibility = () => {
      if (document.hidden) {
        isActiveRef.current = false;
        stopLoop();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [stopLoop]);

  // Play transition - exposed via ref
  const play = useCallback(({ direction = 1 } = {}) => {
    if (prefersReducedMotion || !materialRef.current) return;
    
    // Kill any existing tween
    if (tweenRef.current) {
      tweenRef.current.kill();
    }
    
    // Reset and activate
    const uniforms = materialRef.current.uniforms;
    uniforms.uProgress.value = 0;
    uniforms.uDirection.value = direction;
    uniforms.uActive.value = 1.0;
    
    isActiveRef.current = true;
    startLoop();
    
    // Animate progress
    tweenRef.current = gsap.to(uniforms.uProgress, {
      value: 1,
      duration: CONFIG.duration,
      ease: CONFIG.ease,
      onComplete: () => {
        // Deactivate when complete
        uniforms.uActive.value = 0.0;
        isActiveRef.current = false;
        stopLoop();
        
        // Clear canvas
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    });
  }, [prefersReducedMotion, startLoop, stopLoop]);

  // Expose play method via ref
  useImperativeHandle(ref, () => ({
    play
  }), [play]);

  // Initialize Three.js
  useEffect(() => {
    if (!isWebGLAvailable || !canvasRef.current) return;

    const canvas = canvasRef.current;

    let renderer;
    let scene;
    let camera;
    let material;
    let geometry;

    try {
      // Create renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // Create scene
      scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create orthographic camera
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;
      cameraRef.current = camera;

      // Create shader material
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uProgress: { value: 0 },
          uDirection: { value: 1 },
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uNoiseScale: { value: CONFIG.noiseScale },
          uEdgeSoftness: { value: CONFIG.edgeSoftness },
          uEdgeWidth: { value: CONFIG.edgeWidth },
          uSeamColor: { value: new THREE.Vector3(...CONFIG.seamColor) },
          uGlowColor: { value: new THREE.Vector3(...CONFIG.glowColor) },
          uGlowIntensity: { value: CONFIG.glowIntensity },
          uVeilColor: { value: new THREE.Vector3(...CONFIG.veilColor) },
          uVeilOpacity: { value: CONFIG.veilOpacity },
          uActive: { value: 0 },
        },
        transparent: true,
        blending: THREE.NormalBlending,
        depthTest: false,
        depthWrite: false,
      });
      materialRef.current = material;

      // Create fullscreen quad
      geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Initial render (transparent)
      renderer.render(scene, camera);
    } catch (err) {
      console.error('[TransitionWebGL] Failed to init WebGL overlay:', err);
      setIsWebGLAvailable(false);
      try {
        geometry?.dispose?.();
        material?.dispose?.();
        renderer?.dispose?.();
      } catch (e) {
        // ignore cleanup
      }
      return undefined;
    }

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      stopLoop();
      
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isWebGLAvailable, stopLoop]);

  // Don't render anything if WebGL unavailable or reduced motion
  if (!isWebGLAvailable || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="transition-webgl"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
});

TransitionWebGL.displayName = 'TransitionWebGL';

export default TransitionWebGL;

/**
 * TUNING KNOBS (in CONFIG object):
 * 
 * duration: 0.75              - Transition duration in seconds (0.6-0.9)
 * ease: 'power3.inOut'        - GSAP easing curve
 * noiseScale: 4.0             - Edge noise frequency (3-6, higher = more detail)
 * edgeSoftness: 0.15          - Edge glow spread (0.1-0.25)
 * edgeWidth: 0.03             - Bright seam line width (0.02-0.05)
 * glowIntensity: 0.6          - Glow brightness (0.4-0.8)
 * veilOpacity: 0.12           - Background dim during transition (0.08-0.2)
 * 
 * USAGE:
 * const transitionRef = useRef(null);
 * 
 * // Trigger on section change
 * transitionRef.current?.play({ direction: scrollingDown ? 1 : -1 });
 * 
 * <TransitionWebGL ref={transitionRef} />
 */





