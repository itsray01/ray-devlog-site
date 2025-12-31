# Anime.js Animation System Documentation

## Overview

This site uses **Anime.js** for premium, accessible animations with a cyberpunk/futuristic feel. The animation system is built with three core principles:

1. **Safe Reveal Pattern**: Content is visible by default. Animations enhance, not hide.
2. **Accessibility First**: Respects `prefers-reduced-motion` preference
3. **Performance**: Uses `transform` and `opacity` only, with efficient IntersectionObserver

---

## Quick Start: Adding Animations

### 1. Scroll-Reveal Animations

Add the `data-animate` attribute to any element to animate it when scrolling into view:

```jsx
// Basic fade-up reveal
<div className="card" data-animate="reveal">
  Your content here
</div>

// Slide from left
<section data-animate="reveal-left">
  Content slides in from left
</section>

// Slide from right
<div data-animate="reveal-right">
  Content slides in from right
</div>

// Scale up (good for images/cards)
<figure data-animate="reveal-scale">
  <img src="..." />
</figure>
```

**Available Variants:**
- `reveal` - Default fade-up from below (24px translateY)
- `reveal-left` - Slide from left (32px translateX)
- `reveal-right` - Slide from right (32px translateX)
- `reveal-scale` - Scale up from 95% to 100%
- `reveal-glow` - Fade in with subtle glow effect

### 2. Enable Animations on a Page

In your React component, use the `useScrollReveal` hook:

```jsx
import useScrollReveal from '../hooks/useScrollReveal';

const YourPage = () => {
  // Enable scroll-reveal for all data-animate elements
  const scrollRevealRef = useScrollReveal({
    threshold: 0.1,           // Trigger when 10% visible
    rootMargin: '0px 0px -80px 0px', // Start animation 80px before entering viewport
    once: true,               // Animate only once
  });

  return (
    <div ref={scrollRevealRef}>
      <div className="card" data-animate="reveal">
        This will animate when scrolling!
      </div>
    </div>
  );
};
```

### 3. Add Hover Micro-Interactions

Use the `useAnimeHover` hook to add hover effects to cards:

```jsx
import useAnimeHover from '../hooks/useAnimeHover';

const YourPage = () => {
  const hoverRef = useAnimeHover();

  return (
    <div ref={hoverRef}>
      <div className="card">
        This will have a subtle lift on hover!
      </div>
    </div>
  );
};
```

**Default hover targets:**
- `.card`
- `.grid-tile`
- `.feature-card`
- `.filmstrip-frame__figure`

### 4. Combine Multiple Effects

You can use both hooks together:

```jsx
const YourPage = () => {
  const scrollRevealRef = useScrollReveal();
  const hoverRef = useAnimeHover();

  return (
    <div ref={(el) => {
      scrollRevealRef(el);
      hoverRef(el);
    }}>
      <div className="card" data-animate="reveal">
        Animates on scroll AND has hover effects!
      </div>
    </div>
  );
};
```

---

## Animation Utilities

### `animeConfig.js`

Core animation configuration and utilities.

#### `safeAnime(config)`

Wrapper around `anime()` that respects `prefers-reduced-motion`:

```js
import { safeAnime, DURATION, EASING } from '../utils/animeConfig';

safeAnime({
  targets: '.my-element',
  opacity: [0, 1],
  translateY: [20, 0],
  duration: DURATION.normal,
  easing: EASING.smooth,
});
```

If user prefers reduced motion, animation runs with ~0 duration and no transforms.

#### Duration Presets

```js
import { DURATION } from '../utils/animeConfig';

DURATION.fast      // 250ms
DURATION.normal    // 400ms
DURATION.slow      // 600ms
DURATION.verySlow  // 800ms
```

#### Easing Functions

```js
import { EASING } from '../utils/animeConfig';

EASING.smooth   // Material Design easing
EASING.elastic  // Subtle bounce
EASING.cyber    // Cyberpunk overshoot
EASING.soft     // Gentle deceleration
```

#### Stagger Children

Animate multiple children with delays:

```js
import { staggerReveal } from '../utils/animeConfig';

const parent = document.querySelector('.my-container');
staggerReveal(parent, 'reveal', {
  startDelay: 200,  // Wait 200ms before starting
});
```

---

## Custom Animations

### Create a Custom Timeline

```jsx
import anime from 'animejs';
import { DURATION, EASING, safeAnime } from '../utils/animeConfig';

// Create timeline
const timeline = anime.timeline({
  easing: EASING.smooth,
  duration: DURATION.normal,
});

// Add animations
timeline
  .add({
    targets: '.element-1',
    opacity: [0, 1],
    translateY: [-20, 0],
  }, 0) // Start at 0ms
  .add({
    targets: '.element-2',
    opacity: [0, 1],
    scale: [0.95, 1],
  }, 100); // Start at 100ms
```

### Manual Scroll-Reveal

If you need more control than the hook provides:

```jsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          safeAnime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 400,
            easing: 'cubicBezier(0.4, 0, 0.2, 1)',
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const element = document.querySelector('.my-element');
  if (element) observer.observe(element);

  return () => observer.disconnect();
}, []);
```

---

## Accessibility

### Reduced Motion Support

The system **automatically respects** `prefers-reduced-motion`:

- Animations run with ~50ms duration (essentially instant)
- No `translateX/Y/Z`, `scale`, or `rotate` transforms applied
- Opacity changes still happen (for fade-ins)

Test it:

```js
// In DevTools Console
matchMedia('(prefers-reduced-motion: reduce)').matches = true;
```

### CSS Fallback

```css
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### Focus Visible

Hover effects respect keyboard navigation:

```js
const hoverRef = useAnimeHover({
  addFocusEffect: true, // Default: true
});
```

---

## CSS Classes

### `.anime-hover`

Automatically applied to elements with hover effects:

```css
.anime-hover {
  will-change: transform;
  transition: box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### `.cyber-glow`

Add cyberpunk glow effect:

```jsx
<div className="card cyber-glow">
  Glowing card
</div>
```

### `.grid-shimmer`

Subtle pulsing effect for backgrounds:

```jsx
<div className="grid-shimmer" aria-hidden="true" />
```

---

## Performance Tips

1. **Use `transform` and `opacity` only** - these don't trigger layout/paint
2. **Avoid animating many elements simultaneously** - use stagger
3. **Set `once: true`** in scroll-reveal to prevent re-animation
4. **Don't add `will-change` globally** - it's added automatically during animations

---

## Troubleshooting

### Animations not triggering?

1. Check if `useScrollReveal` ref is attached to parent container
2. Ensure `data-animate` attribute is present
3. Check browser console for warnings
4. Verify element is actually entering viewport

### Element flashes before animating?

This is intended - content is visible by default (safe reveal pattern). The hook sets `opacity: 0` inline right before animating.

### Hover effects not working?

1. Element must have `cursor: pointer` or be a link/button
2. Check if `useAnimeHover` ref is attached to parent
3. Ensure element has one of the default classes (`.card`, `.grid-tile`, etc.)

### Animations too fast/slow?

Adjust in `animeConfig.js`:

```js
export const DURATION = {
  fast: 200,      // Adjust these
  normal: 350,
  slow: 500,
  verySlow: 700,
};
```

---

## Examples

### Animated Section

```jsx
import useScrollReveal from '../hooks/useScrollReveal';
import useAnimeHover from '../hooks/useAnimeHover';

const MySection = () => {
  const scrollRevealRef = useScrollReveal();
  const hoverRef = useAnimeHover();

  return (
    <section 
      id="my-section" 
      className="content-section"
      ref={(el) => {
        scrollRevealRef(el);
        hoverRef(el);
      }}
    >
      <div className="card" data-animate="reveal">
        <h2>Title animates on scroll</h2>
        <p>And has hover effects!</p>
      </div>

      <div className="card" data-animate="reveal-left">
        <h3>Slides from left</h3>
      </div>

      <div className="grid-2x3">
        {items.map((item, i) => (
          <figure 
            key={i} 
            className="grid-tile" 
            data-animate="reveal-scale"
          >
            <img src={item.image} alt={item.title} />
          </figure>
        ))}
      </div>
    </section>
  );
};
```

---

## Architecture

```
src/
├── utils/
│   └── animeConfig.js         # Core anime.js config & utilities
├── hooks/
│   ├── useScrollReveal.js     # IntersectionObserver hook
│   └── useAnimeHover.js       # Hover micro-interactions hook
├── components/
│   └── PageLoadAnimation.jsx  # First-load timeline animation
└── index.css                  # Animation support styles
```

---

## Future Enhancements

To add new animation variants, edit `REVEAL_VARIANTS` in `animeConfig.js`:

```js
export const REVEAL_VARIANTS = {
  // ... existing variants
  
  'my-custom-variant': {
    opacity: [0, 1],
    translateX: [50, 0],
    rotate: ['5deg', '0deg'],
    duration: DURATION.slow,
    easing: EASING.cyber,
  },
};
```

Then use it:

```jsx
<div data-animate="my-custom-variant">
  Custom animation!
</div>
```

---

## Credits

- **Anime.js** by Julian Garnier: https://animejs.com/
- **Animation System** built for raysdevlog.page with accessibility & performance in mind



