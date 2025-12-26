import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Configuration for easy intensity tweaking
 */
const CONFIG = {
  // Mouse drift settings
  mouseDriftStrength: 0.02,    // UV offset strength (0.01-0.05)
  mouseSmoothing: 0.08,        // Lerp factor for mouse smoothing
  
  // Scroll parallax
  scrollParallax: 0.15,        // Scroll-driven UV offset (0.1-0.3)
  
  // Noise distortion
  noiseScale: 3.0,             // Noise frequency (2-5)
  noiseStrength: 0.008,        // Noise amplitude - very subtle (0.005-0.015)
  noiseSpeed: 0.3,             // Time-based noise evolution
  
  // Vignette
  vignetteStrength: 0.4,       // Vignette darkness (0.3-0.6)
  vignetteRadius: 0.6,         // Vignette start radius (0.4-0.8)
  
  // Colors (from CSS variables)
  overlayColor: [10, 14, 39],  // --bg: #0a0e27
  overlayOpacity: 0.75,        // Base overlay opacity
};

// Vertex shader - simple fullscreen quad
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - background with drift, parallax, noise, and vignette
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;           // Normalized mouse position (-0.5 to 0.5)
  uniform float uScroll;         // Scroll progress (0 to 1)
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uMouseDrift;
  uniform float uScrollParallax;
  uniform float uNoiseScale;
  uniform float uNoiseStrength;
  uniform float uVignetteStrength;
  uniform float uVignetteRadius;
  uniform vec3 uOverlayColor;
  uniform float uOverlayOpacity;
  uniform float uReducedMotion;  // 1.0 = reduced motion, 0.0 = normal
  
  varying vec2 vUv;
  
  // Simplex noise for subtle distortion
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
    vec2 uv = vUv;
    
    // Apply effects only if not reduced motion
    if (uReducedMotion < 0.5) {
      // Mouse-driven drift (subtle UV offset opposite to mouse)
      vec2 mouseDrift = uMouse * uMouseDrift * -1.0;
      
      // Scroll-driven parallax
      float scrollOffset = uScroll * uScrollParallax;
      
      // Subtle noise distortion
      float noise = snoise(uv * uNoiseScale + uTime * 0.1) * uNoiseStrength;
      float noise2 = snoise(uv * uNoiseScale * 2.0 - uTime * 0.08) * uNoiseStrength * 0.5;
      
      // Combine all offsets
      uv += mouseDrift;
      uv.y -= scrollOffset;
      uv += vec2(noise, noise2);
    }
    
    // Sample background texture
    vec4 texColor = texture2D(uTexture, uv);
    
    // Apply vignette
    vec2 center = vUv - 0.5;
    float dist = length(center);
    float vignette = smoothstep(uVignetteRadius, uVignetteRadius + 0.4, dist);
    vignette *= uVignetteStrength;
    
    // Apply dark overlay gradient (stronger at bottom)
    float gradientY = vUv.y;
    float overlayStrength = mix(uOverlayOpacity, uOverlayOpacity + 0.15, 1.0 - gradientY);
    overlayStrength = max(overlayStrength, vignette);
    
    // Blend overlay color
    vec3 overlayNorm = uOverlayColor / 255.0;
    vec3 finalColor = mix(texColor.rgb, overlayNorm, overlayStrength);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

/**
 * BackgroundWebGL - Three.js shader-based background with subtle drift and parallax
 * 
 * Features:
 * - Mouse-driven subtle UV drift
 * - Scroll-driven parallax offset
 * - Subtle noise distortion
 * - Vignette overlay
 * - Respects prefers-reduced-motion
 */
const BackgroundWebGL = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);
  const isIdleRef = useRef(true);
  const lastActivityRef = useRef(Date.now());
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);

  // Check for reduced motion preference
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

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

  // Mark activity for idle detection
  const markActivity = useCallback(() => {
    isIdleRef.current = false;
    lastActivityRef.current = Date.now();
  }, []);

  // Initialize Three.js
  useEffect(() => {
    if (!isWebGLAvailable || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: false,
      powerPreference: 'low-power'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create orthographic camera for fullscreen quad
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/img/bg.png', (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      // Create shader material
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uScroll: { value: 0 },
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uMouseDrift: { value: CONFIG.mouseDriftStrength },
          uScrollParallax: { value: CONFIG.scrollParallax },
          uNoiseScale: { value: CONFIG.noiseScale },
          uNoiseStrength: { value: CONFIG.noiseStrength },
          uVignetteStrength: { value: CONFIG.vignetteStrength },
          uVignetteRadius: { value: CONFIG.vignetteRadius },
          uOverlayColor: { value: new THREE.Vector3(...CONFIG.overlayColor) },
          uOverlayOpacity: { value: CONFIG.overlayOpacity },
          uReducedMotion: { value: prefersReducedMotion ? 1.0 : 0.0 }
        }
      });
      materialRef.current = material;

      // Create fullscreen quad
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Start animation loop
      let startTime = Date.now();
      let isDisposed = false;
      
      const animate = () => {
        // Stop if disposed
        if (isDisposed) return;
        
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        
        // Check if idle (no activity for 2 seconds)
        if (now - lastActivityRef.current > 2000) {
          isIdleRef.current = true;
        }

        // Smooth mouse interpolation
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * CONFIG.mouseSmoothing;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * CONFIG.mouseSmoothing;

        // Update uniforms only if material still valid
        if (materialRef.current && !isDisposed) {
          materialRef.current.uniforms.uTime.value = elapsed;
          materialRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
          materialRef.current.uniforms.uScroll.value = scrollRef.current;
          materialRef.current.uniforms.uReducedMotion.value = prefersReducedMotion ? 1.0 : 0.0;
        }

        // Render
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
      
      // Store dispose callback for cleanup
      materialRef.current._dispose = () => { isDisposed = true; };
    });

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Handle mouse move
    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      markActivity();
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle scroll
    const handleScroll = () => {
      markActivity();
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      
      // Signal disposal to stop animation loop
      if (materialRef.current?._dispose) {
        materialRef.current._dispose();
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      if (materialRef.current) {
        if (materialRef.current.uniforms?.uTexture?.value) {
          materialRef.current.uniforms.uTexture.value.dispose();
        }
        materialRef.current.dispose();
        materialRef.current = null;
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, [isWebGLAvailable, prefersReducedMotion, markActivity]);

  // Fallback for no WebGL
  if (!isWebGLAvailable) {
    return (
      <div
        ref={containerRef}
        className="background-webgl background-webgl--fallback"
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -10,
          pointerEvents: 'none',
          backgroundImage: 'url(/img/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.7) 0%, rgba(10, 14, 39, 0.85) 50%, rgba(10, 14, 39, 0.95) 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="background-webgl"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
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
};

export default BackgroundWebGL;

/**
 * TUNING KNOBS (in CONFIG object):
 * 
 * mouseDriftStrength: 0.02    - How much the background shifts with mouse (0.01-0.05)
 * mouseSmoothing: 0.08        - Mouse movement smoothing (0.05-0.15, lower = smoother)
 * scrollParallax: 0.15        - Scroll-driven vertical offset (0.1-0.3)
 * noiseScale: 3.0             - Noise pattern frequency (2-5)
 * noiseStrength: 0.008        - Noise distortion amount (0.005-0.015)
 * vignetteStrength: 0.4       - Edge darkening intensity (0.3-0.6)
 * vignetteRadius: 0.6         - Where vignette starts from center (0.4-0.8)
 * overlayOpacity: 0.75        - Base dark overlay (0.6-0.85)
 */


