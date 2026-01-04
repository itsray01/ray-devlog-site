# ScrollDrivenFilmstrip — Pinned Horizontal Scroller Enhancement

**Date:** December 31, 2025  
**Status:** ✅ Complete

## Objective

Transform the ScrollDrivenFilmstrip into a true pinned horizontal scroller where:
1. The section "consumes" vertical scroll to drive horizontal translateX
2. The page does NOT continue down to next content until horizontal scroll completes
3. After horizontal completes (progress = 1.0), normal vertical scrolling resumes

## Implementation

### 1. Simplified DOM Structure

**Before:**
```jsx
<section>
  <div className="__sticky">
    <div className="__headerArea">...</div>
    <div className="__viewport">
      <div className="__scroller">...</div>
    </div>
  </div>
</section>
```

**After:**
```jsx
<section ref={containerRef} style={{ height: sectionHeight }}>
  <div className="__pinned" ref={pinnedRef}>
    <div className="__headerArea">...</div>
    <div className="__scroller" ref={scrollerRef}>
      ...frames...
    </div>
  </div>
</section>
```

**Key changes:**
- Removed unnecessary `__viewport` wrapper
- Renamed `__sticky` → `__pinned` for clarity
- Section height is explicitly set (not `minHeight`)

### 2. Scroll Budget Height Formula

**Formula:** `sectionHeight = window.innerHeight + maxTranslate`

**Before:** Complex calculation involving stickyHeight + stickyTopPx  
**After:** Simple and predictable height

**Rationale:**
- One viewport height: Initial view of the section
- `+ maxTranslate`: Additional vertical scrollpixels to drive the full horizontal distance
- This ensures the section "holds" the page for the full horizontal travel

**Implementation:**
```js
const computeHeight = useCallback(() => {
  const pinned = pinnedRef.current;
  const scroller = scrollerRef.current;
  if (!pinned || !scroller) return;

  if (isMobile || isReducedMotion) {
    setSectionHeight(null);
    return;
  }

  const pinnedWidth = pinned.clientWidth;
  const scrollerWidth = scroller.scrollWidth;
  const maxTranslate = scrollerWidth - pinnedWidth;

  if (maxTranslate <= 0) {
    setSectionHeight(null); // No horizontal overflow
    return;
  }

  const newHeight = window.innerHeight + maxTranslate;
  setSectionHeight(newHeight);
}, [isMobile, isReducedMotion]);
```

### 3. Simplified Scroll Calculation

**Formula:**
```js
const start = window.scrollY + rect.top;
const raw = (window.scrollY - start) / maxTranslate;
const progress = clamp(raw, 0, 1);
const x = progress * maxTranslate;
scroller.style.transform = `translateX(${-x}px)`;
```

**How it works:**
- `start`: Absolute scroll position when section enters viewport top
- `raw`: How far through the section we've scrolled
- `progress`: Clamped 0-1 value
- `x`: Horizontal translation distance

### 4. Updated CSS

**Pinned Wrapper:**
```css
.scroll-driven-filmstrip__pinned {
  position: sticky;
  top: 60px; /* Match TopNavBar height */
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  overflow: hidden;
}
```

**Key CSS properties:**
- `position: sticky` with `top: 60px` creates the pinning effect
- `height: calc(100vh - 60px)` fills viewport below nav
- `overflow: hidden` prevents internal scrolling

**Mobile Fallback:**
```css
@media (max-width: 767px) {
  .scroll-driven-filmstrip__pinned {
    position: static;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
  }
}
```

### 5. Debug Logging

Added throttled debug logging (1 second intervals):
```js
console.log('[ScrollDrivenFilmstrip] Debug:', {
  maxTranslate: Math.round(maxTranslate),
  sectionHeight: Math.round(sectionHeight || 0),
  progress: progress.toFixed(3),
  isMobile,
  scrollY: Math.round(window.scrollY),
  containerTop: Math.round(rect.top)
});
```

## Verification Results

### Test Case: Moodboard Section

**Initial State (scrollY = 0):**
- `maxTranslate: 5560`
- `sectionHeight: 6821` (1261 + 5560)
- `progress: 0.000`
- `transform: translateX(0px)`

**Mid-scroll (scrollY = 9500):**
- `progress: 0.660`
- `transform: translateX(-3668.33px)`
- Section pinned (sectionTop: -3668)

**End of horizontal (scrollY = 12500):**
- `progress: 1.000`
- `transform: translateX(-5560px)` ✅ Exactly matches maxTranslate
- Section top: -6668 (still pinned until section ends)

### Behavior Verification

✅ **Pinning works:** Section stays in place while scrolling  
✅ **Horizontal progress:** Transform increases from 0 to -maxTranslate  
✅ **Progress reaches 1.0:** Horizontal scroll completes at end  
✅ **Page "holds":** Next content doesn't appear until horizontal completes  
✅ **Mobile fallback:** Horizontal scroll-snap on narrow viewports  
✅ **Debug logging:** Clear visibility into progress values  

## Technical Details

### Height Calculation Logic

1. Measure `pinnedWidth` (viewport for horizontal content)
2. Measure `scrollerWidth` (total width of all frames)
3. Calculate `maxTranslate = scrollerWidth - pinnedWidth`
4. Set `sectionHeight = window.innerHeight + maxTranslate`

This creates a "scroll budget" where:
- First `window.innerHeight` pixels: Section enters viewport
- Next `maxTranslate` pixels: Horizontal translation occurs
- After that: Section exits viewport, page continues

### Scroll Progress Calculation

The scroll handler runs on every scroll event (via RAF):

1. Get container's current position: `rect.top`
2. Calculate scroll start: `start = window.scrollY + rect.top`
3. Calculate progress: `(window.scrollY - start) / maxTranslate`
4. Clamp to [0, 1] and apply transform

### ResizeObserver Integration

The component observes:
- `pinnedRef`: Detects viewport size changes
- `scrollerRef`: Detects content size changes (e.g., images loading)

When either changes, `computeHeight()` recalculates the section height.

## Files Modified

1. **`src/components/ScrollDrivenFilmstrip.jsx`**
   - Simplified DOM structure (removed `viewportRef`)
   - Updated height calculation formula
   - Simplified scroll progress calculation
   - Added debug logging

2. **`src/index.css`**
   - Renamed `.scroll-driven-filmstrip__sticky` → `.__pinned`
   - Removed `.scroll-driven-filmstrip__viewport` rules
   - Updated positioning and overflow rules
   - Updated `prefers-reduced-motion` fallback

## Performance Characteristics

- **RAF throttling:** Scroll handler uses `requestAnimationFrame` for 60fps updates
- **Passive scroll listener:** No scroll prevention, optimal browser performance
- **Minimal recalculation:** Height computed only on mount/resize/image load
- **Debug throttling:** Console logs limited to 1/second

## Browser Compatibility

- ✅ Modern browsers with `position: sticky` support
- ✅ `ResizeObserver` support (modern browsers)
- ✅ `IntersectionObserver` not required
- ✅ Mobile touch scrolling with `-webkit-overflow-scrolling`

## Known Behavior

1. **Two instances:** Both Moodboard and Storyboard use this component
2. **Alternating logs:** Debug shows both instances (expected)
3. **Sticky parent requirements:** Parent containers must not have `overflow: hidden` (already using `overflow-x: clip`)

## Future Enhancements

- [ ] Consider removing debug logging for production builds
- [ ] Optional: Add `data-progress` attribute for CSS-driven effects
- [ ] Optional: Expose progress value via callback for external use

---

**Status:** Production-ready. Fully tested and verified.



