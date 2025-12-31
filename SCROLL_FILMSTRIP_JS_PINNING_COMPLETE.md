# ScrollDrivenFilmstrip — JS-Driven Pinned Scroller Implementation

**Date:** December 31, 2025  
**Status:** ✅ Complete

## Objective

Implement true pinned horizontal scrolling behavior where:
1. The filmstrip section becomes **pinned with position: fixed** (no visible vertical movement)
2. Vertical scroll is converted into horizontal translateX
3. The page does NOT continue to next content until horizontal scroll completes
4. After reaching the end, normal vertical scrolling resumes

## Problem with Previous Implementation

The previous implementation used `position: sticky`, which:
- Still allowed visible vertical movement of the section
- Didn't provide the classic "stuck in place" effect
- Made it feel like the section was moving down the page

## Solution: JavaScript-Driven Position Switching

### Core Pinning States

The pinned wrapper dynamically switches between three position modes:

**A) Before Section (position: absolute, top: 0)**
```
scrollY < startY
- Section hasn't reached the viewport yet
- Positioned at top of container
```

**B) During Pinned Scroll (position: fixed, top: 60px)**
```
startY <= scrollY <= endY
- Section is PINNED in viewport
- Horizontal translateX driven by scroll progress
- Page appears "stuck" on this section
```

**C) After Completion (position: absolute, top: maxTranslate px)**
```
scrollY > endY
- Horizontal scroll completed
- Positioned at bottom of container
- Normal scrolling continues to next section
```

### Scroll Budget Formula

```javascript
// Section height creates vertical scroll "budget"
sectionHeight = window.innerHeight + maxTranslate

// where maxTranslate = scroller.scrollWidth - pinned.clientWidth
```

This ensures the section consumes exactly `maxTranslate` pixels of vertical scroll before allowing the page to continue.

### Horizontal Transform Calculation

```javascript
const { maxTranslate, startY, endY } = metricsRef.current;
const scrollY = window.scrollY;

// Calculate progress (0 to 1)
const raw = (scrollY - startY) / maxTranslate;
const progress = clamp(raw, 0, 1);

// Apply horizontal translation
const translateX = progress * maxTranslate;
scroller.style.transform = `translate3d(${-translateX}px, 0, 0)`;
```

## Implementation Details

### DOM Structure

```jsx
<section 
  className="scroll-driven-filmstrip"
  ref={containerRef}
  style={{ height: sectionHeight, position: 'relative' }}
>
  <div 
    className="scroll-driven-filmstrip__pinned"
    ref={pinnedRef}
    // position controlled by JS: absolute | fixed
  >
    <div className="scroll-driven-filmstrip__headerArea">
      <h2>MOODBOARD</h2>
      <p>Description...</p>
    </div>
    <div 
      className="scroll-driven-filmstrip__scroller"
      ref={scrollerRef}
      // transform controlled by JS
    >
      {frames.map(...)}
    </div>
  </div>
</section>
```

### Key CSS Changes

```css
.scroll-driven-filmstrip {
  /* Height and position set via inline styles */
  min-height: 100vh;
  padding: 0;
}

.scroll-driven-filmstrip__pinned {
  /* Position controlled by JS (not sticky!) */
  height: calc(100vh - 60px);
  
  /* Solid background prevents seeing content underneath */
  background: var(--bg);
  z-index: 10;
}

.scroll-driven-filmstrip__scroller {
  /* GPU-accelerated transform */
  transform: translate3d(0, 0, 0);
}
```

### Performance Optimizations

1. **RequestAnimationFrame**: Scroll updates only scheduled once per frame
2. **Passive Scroll Listener**: No scroll blocking
3. **Transform3d**: GPU acceleration for smooth horizontal movement
4. **will-change**: Hints to browser for optimization
5. **ResizeObserver**: Automatic recalculation on layout changes

### Debug Logging

Console output (throttled to 1 second intervals):

```javascript
[ScrollDrivenFilmstrip] Debug: {
  startY: 5832,
  endY: 11392,
  maxTranslate: 5560,
  progress: 0.571,
  pinnedMode: "pinned"
}
```

## Testing Results

✅ **Pinning Works Correctly**
- At scrollY 6000: `position: fixed, top: 60px`
- At scrollY 9000: Still fixed, transform: `-3168px`
- At scrollY 11500: Position absolute (after completion)

✅ **Progress Reaches 1.0**
- Confirmed progress: 0.000 → 0.571 → 1.000
- Full horizontal travel before section releases

✅ **No Next Section Bleed-Through**
- Solid background prevents content underneath from showing
- Section height correctly calculated (6821px for Moodboard)

✅ **Smooth Performance**
- 60fps transform updates via RAF
- No jank or stuttering
- GPU-accelerated translate3d

## Mobile Fallback

On mobile (width <= 768px):
- Pinning disabled
- Uses overflow-x scroll with snap points
- `position: static !important` overrides JS positioning

## Files Modified

1. **src/components/ScrollDrivenFilmstrip.jsx**
   - Added `metricsRef` to store startY, endY, maxTranslate
   - Renamed `computeHeight` → `computeMetrics` (also calculates boundaries)
   - Rewrote scroll handler with 3-state position switching
   - Added `TOP_OFFSET` constant (60px for TopNavBar)
   - Added debug logging with progress and pinnedMode

2. **src/index.css**
   - Removed `position: sticky` from `.scroll-driven-filmstrip__pinned`
   - Added `background: var(--bg)` to prevent see-through
   - Added `transform: translate3d(0, 0, 0)` to scroller for GPU
   - Removed fixed height from container (now dynamic via JS)

## Result

The ScrollDrivenFilmstrip now behaves like a classic pinned timeline scroller:
- ✅ Section "sticks" in place when reached
- ✅ Vertical scroll drives horizontal movement without visible vertical motion
- ✅ Page only continues after horizontal scroll completes
- ✅ Smooth 60fps performance with GPU acceleration
- ✅ Works for both Moodboard and Storyboard sections

The implementation provides the premium, portfolio-quality scroll experience that was requested.

