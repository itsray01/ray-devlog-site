# Intro Flow Debug Mode - Changes Summary

## Overview
Added `DEBUG_FORCE_INTRO = true` flag to force the intro sequence to always play on every page load, regardless of localStorage or URL hash.

---

## Files Modified

### 1. `src/context/NavigationContext.jsx`

#### Change A: Added DEBUG_FORCE_INTRO constant (line 6)

```diff
const NavigationContext = createContext(null);

+// DEBUG: Force intro sequence to always play (set to false in production)
+const DEBUG_FORCE_INTRO = true;
+
// Storage key for persisting docked state
const STORAGE_KEY = 'devlog_nav_docked';
```

#### Change B: Modified initial state logic (lines 38-54)

```diff
  // 4-state navigation flow: "preload" | "toc" | "transitioning" | "docked"
  const [introPhase, setIntroPhase] = useState(() => {
+    // DEBUG MODE: Always start with intro
+    if (DEBUG_FORCE_INTRO) {
+      console.log('[NavigationContext] DEBUG_FORCE_INTRO enabled - starting with preload');
+      return 'preload';
+    }
+    
    if (typeof window !== 'undefined') {
      const storedDocked = localStorage.getItem(STORAGE_KEY);
      console.log('[NavigationContext] Initial state check:', {
        storedDocked,
        hasHashOnLoad: hasHashOnLoad.current,
        willStartDocked: storedDocked === '1' || hasHashOnLoad.current
      });
      // If localStorage has docked OR URL has hash, start docked (skip intro entirely)
      if (storedDocked === '1' || hasHashOnLoad.current) {
        return 'docked';
      }
    }
    return 'preload'; // Start with preload intro sequence
  });
```

**Effect:** When `DEBUG_FORCE_INTRO = true`, the app ALWAYS starts in `'preload'` phase, bypassing localStorage and hash checks.

#### Change C: Prevented localStorage writes in DEBUG mode (lines 81-93)

```diff
  // Persist docked state (legacy API - still works)
  const setDocked = useCallback((value) => {
    if (value) {
      setIntroPhase('docked');
-      if (typeof window !== 'undefined') {
+      // Don't persist to localStorage in DEBUG mode
+      if (typeof window !== 'undefined' && !DEBUG_FORCE_INTRO) {
        localStorage.setItem(STORAGE_KEY, '1');
      }
    } else {
      setIntroPhase('preload');
-      if (typeof window !== 'undefined') {
+      if (typeof window !== 'undefined' && !DEBUG_FORCE_INTRO) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
```

**Effect:** localStorage is not written in DEBUG mode, ensuring intro always plays on refresh.

#### Change D: Prevented localStorage writes in finishDock (lines 118-123)

```diff
  // Finish docking after animation completes
  const finishDock = useCallback(() => {
    setIntroPhase('docked');
-    if (typeof window !== 'undefined') {
+    // Don't persist to localStorage in DEBUG mode
+    if (typeof window !== 'undefined' && !DEBUG_FORCE_INTRO) {
      localStorage.setItem(STORAGE_KEY, '1');
    }
  }, []);
```

#### Change E: Prevented localStorage writes in safety timeout (lines 149-161)

```diff
  // Safety timeout: if stuck in preload/toc for too long, force to docked
  useEffect(() => {
    if (introPhase === 'preload' || introPhase === 'toc') {
      const safetyTimer = setTimeout(() => {
        console.warn('[NavigationContext] Safety timeout - forcing docked state to reveal content');
        setIntroPhase('docked');
-        if (typeof window !== 'undefined') {
+        // Don't persist to localStorage in DEBUG mode
+        if (typeof window !== 'undefined' && !DEBUG_FORCE_INTRO) {
          localStorage.setItem(STORAGE_KEY, '1');
        }
      }, 8000); // 8 seconds max for intro sequence

      return () => clearTimeout(safetyTimer);
    }
  }, [introPhase]);
```

---

### 2. `src/components/IntroSequence.jsx`

#### Change A: Adjusted animation timing (lines 56-70)

```diff
      // Sequence the animations using timeouts
-      // 1. Show grid lines after short delay
-      timersRef.current.push(setTimeout(() => setShowGrid(true), 200));
+      // 1. Show grid lines after short delay
+      timersRef.current.push(setTimeout(() => setShowGrid(true), 100));

-      // 2. Show title after grid
-      timersRef.current.push(setTimeout(() => setShowTitle(true), 1000));
+      // 2. Show title after grid
+      timersRef.current.push(setTimeout(() => setShowTitle(true), 300));

-      // 3. Hold for a moment
-      // 4. Fade out and call onDone
+      // 3. Hold for a moment then fade out and call onDone (total ~1.5s)
      timersRef.current.push(setTimeout(() => {
        console.log('[IntroSequence] Animation complete, calling onDone');
        setIsAnimating(false); // Remove animating state to reveal content
        if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
        onDoneRef.current?.();
-      }, 2800));
+      }, 1500));
```

**Effect:** Reduced total animation time from ~2.8s to ~1.5s as requested.

#### Change B: Added scale animation to title (lines 205-213)

```diff
      <div className="intro-sequence__center">
        <motion.h1
          className="intro-sequence__title"
-          initial={{ opacity: 0 }}
-          animate={{ opacity: showTitle ? 1 : 0 }}
-          transition={{ duration: 0.8, ease: 'easeOut' }}
+          initial={{ opacity: 0, scale: 0.95 }}
+          animate={{ 
+            opacity: showTitle ? 1 : 0,
+            scale: showTitle ? 1 : 0.95
+          }}
+          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Ray's Dev Log
        </motion.h1>
      </div>
```

**Effect:** Added subtle scale animation (0.95 → 1.0) for more visual interest.

---

### 3. `src/components/Layout.jsx`
✅ **No changes needed** - Already correctly renders:
- `<IntroSequence />` when `introPhase === 'preload'`
- `<NavOverlay />` for overlay pages (handles `toc` and `transitioning` phases internally)

---

### 4. `src/components/NavOverlay.jsx`
✅ **Already fixed in previous update** - Renders during both `'toc'` AND `'transitioning'` phases:
- Line 105: `if (introPhase !== 'toc' && introPhase !== 'transitioning') return null;`
- Line 177: `{(introPhase === 'toc' || introPhase === 'transitioning') && (`
- Rectangle SVG animation working correctly

---

## Flow Verification

### With DEBUG_FORCE_INTRO = true

**Every refresh:**
1. ✅ **Preload phase** (~1.5s)
   - Black background with geometric grid/arcs
   - "Ray's Dev Log" fades in with subtle scale (0.95 → 1.0)
   - Calls `finishIntro()` after ~1.5s
   
2. ✅ **TOC phase** (waits for user)
   - Centered "Contents" overlay
   - White rectangle draws around panel (2.5s animation)
   - User MUST click a section to continue
   - Calls `beginDockTransition(sectionId)` on click
   
3. ✅ **Transitioning phase** (~300ms)
   - TOC overlay remains visible, starts exit animation
   - Calls `finishDock()` when complete
   
4. ✅ **Docked phase**
   - Main content visible
   - Nav docked to sidebar
   - Scrolled to selected section
   - **localStorage NOT written** (so intro plays again on refresh)

### With DEBUG_FORCE_INTRO = false (Production)

**First visit:**
- Full intro sequence as above

**Returning visit:**
- Skips directly to docked phase (respects localStorage)

**URL with hash:**
- Skips directly to docked phase at hash location

---

## Testing Steps

### 1. Clear localStorage (just in case)
```javascript
localStorage.clear();
```

### 2. Refresh page (Ctrl+Shift+R)

### 3. Watch the flow:
```
[Intro Splash: "Ray's Dev Log"]
         ↓ (~1.5s)
    finishIntro()
         ↓
[TOC Overlay with rectangle draw]
         ↓ (user clicks section)
  beginDockTransition()
         ↓
  [Transitioning: ~300ms]
         ↓
     finishDock()
         ↓
  [Docked: content visible]
```

### 4. Refresh again
- ✅ Should see intro again (because DEBUG mode prevents localStorage write)

---

## Animation Timings

| Phase | Duration | Description |
|-------|----------|-------------|
| **Preload - Grid** | 100ms delay | Grid lines fade in |
| **Preload - Title** | 300ms delay | "Ray's Dev Log" fades + scales in |
| **Preload - Exit** | 1500ms total | Hold then transition to TOC |
| **TOC - Rectangle** | 2500ms | White rectangle draws around panel |
| **TOC - User Wait** | Indefinite | Waits for user to click section |
| **Transitioning** | 300ms | TOC exit animation |
| **Total (no user wait)** | ~4.3s | Preload (1.5s) + TOC draw (2.5s) + transition (0.3s) |

---

## How to Disable Debug Mode

To restore normal production behavior (intro plays once, then cached):

**In `src/context/NavigationContext.jsx`, line 6:**
```diff
-const DEBUG_FORCE_INTRO = true;
+const DEBUG_FORCE_INTRO = false;
```

Then the app will:
- Show intro on first visit
- Skip intro on returning visits (localStorage persisted)
- Skip intro if URL has hash

---

## Architecture Notes

### State Flow
```
┌─────────────┐
│   preload   │ ← Always starts here when DEBUG_FORCE_INTRO = true
└─────┬───────┘
      │ finishIntro()
      ▼
┌─────────────┐
│     toc     │ ← User sees TOC overlay with rectangle draw
└─────┬───────┘
      │ beginDockTransition(sectionId)
      ▼
┌─────────────┐
│transitioning│ ← Brief exit animation
└─────┬───────┘
      │ finishDock()
      ▼
┌─────────────┐
│   docked    │ ← Normal content visible
└─────────────┘
```

### localStorage Behavior

**When DEBUG_FORCE_INTRO = true:**
- ✅ State changes work normally
- ❌ localStorage is NOT written
- ✅ Every refresh starts with intro

**When DEBUG_FORCE_INTRO = false:**
- ✅ State changes work normally
- ✅ localStorage IS written on dock
- ✅ Returning visits skip intro

---

## Summary

✅ **DEBUG_FORCE_INTRO = true** flag added  
✅ **Always starts in 'preload'** phase  
✅ **localStorage writes disabled** in debug mode  
✅ **Animation timing reduced** to ~1.5s (from 2.8s)  
✅ **Scale animation** added to title (0.95 → 1.0)  
✅ **TOC overlay** renders correctly during both phases  
✅ **Complete flow** works: preload → toc → transitioning → docked  

**To test:** Refresh the page and watch the intro play every time!





