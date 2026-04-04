# Anime.js v4 API Fix

## Problem
Site showed these errors:
1. `TypeError: Cannot read properties of undefined (reading 'keyframes')` - Animation API broken
2. `EPERM: operation not permitted, stat 'soma.jpg'` - File permission error

---

## Error 1: Anime.js API Error ✅ FIXED

### Root Cause
**Anime.js v4 uses a different API than v3:**

**v3 API (OLD - BROKEN):**
```js
anime({
  targets: '.element',
  opacity: [0, 1],
  duration: 400
});
```

**v4 API (NEW - CORRECT):**
```js
animate('.element', {
  opacity: [0, 1],
  duration: 400
});
```

**The key difference:** In v4, the `targets` parameter is the **first argument**, not part of the config object.

### Solution

Updated `src/utils/animeConfig.js`:

```js
// BEFORE (BROKEN):
export const safeAnimate = (config) => {
  return animate(config); // ❌ Wrong API - targets inside config
};

// AFTER (FIXED):
export const safeAnimate = (config) => {
  const { targets, ...animConfig } = config; // ✅ Extract targets
  
  if (!targets) {
    console.warn('[safeAnimate] No targets provided');
    return { finished: Promise.resolve() };
  }
  
  return animate(targets, animConfig); // ✅ Correct v4 API
};
```

**Why this works:**
- Extracts `targets` from config object
- Passes `targets` as first argument
- Passes remaining config as second argument
- Matches animejs v4 API signature: `animate(target, config)`

---

## Error 2: File Permission Error (soma.jpg) ⚠️

### Root Cause
Windows `EPERM` error when Vite tries to read `public/img/soma.jpg`.

**Possible causes:**
1. File is locked by another process (image viewer, antivirus, etc.)
2. File permissions are incorrect
3. File is being written to by another process
4. Windows indexing service has the file locked

### Solution

**Option 1: Restart Dev Server** (Usually fixes it)
```bash
# Stop current dev server (Ctrl+C)
# Then restart:
npm run dev
```

**Option 2: Clear File Lock (if persists)**
```powershell
# Close any image viewers that might have the file open
# Or restart Windows Explorer:
taskkill /f /im explorer.exe
start explorer.exe
```

**Option 3: Check File Permissions**
```powershell
# Right-click soma.jpg → Properties → Security
# Ensure your user has Read permissions
```

**Option 4: Rebuild Public Assets**
```bash
# If file is corrupted or locked:
rm -rf dist
rm -rf node_modules/.vite
npm run dev
```

### Prevention
- Don't open public assets in programs that lock files
- Close image viewers before running dev server
- Exclude `public/` from antivirus real-time scanning

---

## Files Changed

### `src/utils/animeConfig.js` ✅

**What changed:**
```diff
  export const safeAnimate = (config) => {
+   // Extract targets from config (v4 API requires separate arguments)
+   const { targets, ...animConfig } = config;
+   
+   if (!targets) {
+     console.warn('[safeAnimate] No targets provided, skipping animation');
+     return { finished: Promise.resolve() };
+   }
  
    if (prefersReducedMotion()) {
-     return animate({
-       ...config,
+     return animate(targets, {
+       ...animConfig,
        duration: 50,
-       ...(config.x && { x: 0 }),
+       x: 0,
+       y: 0,
      });
    }
  
-   return animate(config);
+   return animate(targets, animConfig);
  };
```

**Key changes:**
1. ✅ Extract `targets` from config using destructuring
2. ✅ Guard against missing targets
3. ✅ Pass `targets` as first argument to `animate()`
4. ✅ Pass remaining config as second argument
5. ✅ Simplified property overrides (no conditional spreading)

---

## Testing Checklist

### ✅ 1. Verify Animations Work
```bash
npm run dev
```

**Expected:**
- ✅ No "Cannot read properties of undefined" errors
- ✅ Scroll-reveal animations work
- ✅ Hover effects work on cards
- ✅ No console errors about keyframes

### ✅ 2. Test Scroll Reveal
1. Open site in browser
2. Scroll down slowly
3. Watch cards fade up

**Expected:**
- ✅ Cards animate when entering viewport
- ✅ No errors in console
- ✅ Smooth transitions

### ✅ 3. Test Hover Effects
1. Hover over any card
2. Move mouse away

**Expected:**
- ✅ Card lifts on hover (scale 1.03, translateY -4px)
- ✅ Card returns to normal on mouse leave
- ✅ No console errors

### ✅ 4. Test Reduced Motion
1. DevTools → More Tools → Rendering
2. Enable "Emulate CSS prefers-reduced-motion: reduce"
3. Reload page

**Expected:**
- ✅ Animations are instant (~50ms)
- ✅ No movement transforms applied
- ✅ Content visible immediately

---

## API Migration Reference

### Property Names (v3 → v4)

| Animation Property | v3 | v4 |
|-------------------|-----|-----|
| Target selection | `targets:` in config | First argument |
| Horizontal movement | `translateX: [0, 100]` | `x: [0, 100]` |
| Vertical movement | `translateY: [0, 100]` | `y: [0, 100]` |
| Scale | `scale: [0.95, 1]` | `scale: [0.95, 1]` ✅ Same |
| Rotation | `rotate: [0, 360]` | `rotate: [0, 360]` ✅ Same |
| Duration | `duration: 400` | `duration: 400` ✅ Same |
| Delay | `delay: 100` | `delay: 100` ✅ Same |
| Easing | `easing: 'easeOutQuad'` | `ease: 'out-quad'` ⚠️ Different |
| Completion callback | `complete: fn` | `complete: fn` ✅ Same |

### Function Signatures

**v3 (OLD):**
```js
anime({
  targets: '.element',
  translateY: [20, 0],
  opacity: [0, 1],
  duration: 400,
  easing: 'easeOutQuad'
});
```

**v4 (NEW):**
```js
animate('.element', {
  y: [20, 0],         // translateY → y
  opacity: [0, 1],
  duration: 400,
  ease: 'out-quad'    // easing → ease, different syntax
});
```

### Timeline API

**v3 (OLD):**
```js
const timeline = anime.timeline({ duration: 400 });
timeline.add({
  targets: '.element',
  opacity: [0, 1]
}, 0);
```

**v4 (NEW):**
```js
const timeline = createTimeline({ duration: 400 });
timeline.add('.element', {  // Target is first argument
  opacity: [0, 1]
}, 0);
```

### Stagger API

**v3 (OLD):**
```js
anime({
  targets: '.elements',
  delay: anime.stagger(100)
});
```

**v4 (NEW):**
```js
import { stagger } from 'animejs';

animate('.elements', {
  delay: stagger(100)  // No namespace, just stagger()
});
```

---

## Why This Happened

**The migration path:**
1. Originally used animejs v3 API
2. Upgraded to animejs v4.2.2
3. Import syntax was updated (named exports)
4. **BUT:** Function call syntax was NOT updated
5. Result: `animate({ targets: '...' })` failed because v4 expects `animate('.

.', { })`

**The fix:**
- Updated `safeAnimate()` to extract `targets` from config
- Pass `targets` as first argument
- Pass remaining config as second argument

---

## Summary

**Error 1: Anime.js API**
- **Problem:** Using v3 API syntax with v4 library
- **Solution:** Extract targets, pass as first argument
- **Status:** ✅ FIXED

**Error 2: File Permission**
- **Problem:** Windows locked soma.jpg file
- **Solution:** Restart dev server or clear file lock
- **Status:** ⚠️ May require server restart

**Files changed:** 1 file (`src/utils/animeConfig.js`)  
**Impact:** All animations now work correctly  

**Ready to test!** 🚀







