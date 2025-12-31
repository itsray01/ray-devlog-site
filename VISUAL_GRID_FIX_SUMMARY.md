# Visual Reference Grid - Bug Fix & Performance Optimization

**Date:** December 30, 2025  
**Status:** ✅ Complete

## Problem Summary

The Visual Reference Grid had two critical issues:
1. **Missing Videos (6/9 loading):** Video URLs were derived from poster image paths, which Vite hashes during build, causing mismatches with actual video filenames
2. **Performance Lag:** All videos loaded immediately on page load, causing lag on the Home page

## Solution Implemented

### A) Data Structure Update (`data/inspiration.json`)

Added explicit stable `id` fields to all items that match the exact video filenames:

```json
{
  "interactive": [
    { "id": "black-mirror", "title": "Black Mirror: Bandersnatch", ... },
    { "id": "detroit", "title": "Detroit: Become Human", ... },
    { "id": "stanley-parable", "title": "The Stanley Parable", ... }
  ],
  "games": [
    { "id": "portal", "title": "Portal / Portal 2", ... },
    { "id": "soma", "title": "SOMA", ... },
    { "id": "control", "title": "Control", ... }
  ],
  "design": [
    { "id": "blade-runner", "title": "Blade Runner (1982)", ... },
    { "id": "ex-machina", "title": "Ex Machina (2014)", ... },
    { "id": "cyberpunk", "title": "Cyberpunk UI Design", ... }
  ]
}
```

### B) New Component (`src/components/visualgrid/VisualGridTile.jsx`)

Created a new lazy-loading video tile component with:

**Features:**
- ✅ Lazy loads video sources only when entering viewport (200px margin)
- ✅ Pauses and unloads videos when leaving viewport to reduce memory/lag
- ✅ Uses **only WebM format** (as requested)
- ✅ Respects `prefers-reduced-motion` (falls back to static image)
- ✅ Proper error handling with console warnings
- ✅ Poster image as thumbnail while loading

**Video Attributes:**
```jsx
<video
  muted
  loop
  playsInline
  preload="none"
  disablePictureInPicture
  controls={false}
/>
```

**Lazy Loading Logic:**
- Uses `IntersectionObserver` with `rootMargin: '200px 0px'` and `threshold: 0.15`
- Dynamically adds/removes `<source>` elements based on viewport visibility
- Calls `video.load()` after removing sources to free memory

### C) Updated InspirationSection (`src/components/sections/InspirationSection.jsx`)

**Changes:**
- Removed `getFilenameFromPath` slug utility import
- Removed complex video state management (playingVideosRef, handleVideoStateChange)
- Removed DEV-only video file check
- Simplified to use stable IDs directly from data

**Before:**
```jsx
const videoFilename = getFilenameFromPath(item.image);
const videoBasePath = `/visual-grid/loops/${videoFilename}`;
```

**After:**
```jsx
<VisualGridTile
  key={item.id}
  id={item.id}
  poster={item.image}
  title={item.title}
  subtitle={item.year || item.designer}
  onClick={() => setLightboxImage({ ... })}
/>
```

## Testing Results

### ✅ All 9 Videos Load Successfully

Network requests show all webm files loading:
- `black-mirror.webm`
- `detroit.webm`
- `stanley-parable.webm`
- `portal.webm`
- `soma.webm`
- `control.webm`
- `blade-runner.webm`
- `ex-machina.webm`
- `cyberpunk.webm`

### ✅ No 404 Errors

All video requests return successfully from `/visual-grid/loops/*.webm`

### ✅ Lazy Loading Works

- Videos only load when scrolling to the Inspiration section
- Videos unload when scrolling away
- Videos reload when scrolling back

### ✅ Performance Improved

- No lag on initial page load
- Only 1-3 videos playing at once (those in viewport)
- Memory usage reduced by unloading offscreen videos

## File Changes

### Modified Files:
1. `data/inspiration.json` - Added stable `id` fields
2. `src/components/sections/InspirationSection.jsx` - Simplified, removed slug utils
3. `src/components/visualgrid/VisualGridTile.jsx` - **NEW** lazy-loading component

### Removed Dependencies:
- No longer uses `getFilenameFromPath` from `slugUtils.js` for visual grid
- Removed complex video state management from InspirationSection

## Key Benefits

1. **Stable Video URLs:** IDs match exact filenames, no more hash mismatches
2. **Reduced Memory Usage:** Videos unload when offscreen
3. **Better Performance:** Lazy loading prevents initial page lag
4. **WebM Only:** Smaller file sizes, better compression
5. **Cleaner Code:** Simpler data flow, less state management
6. **Accessibility:** Respects motion preferences

## Notes

- Grid layout and tile sizing remain unchanged
- Poster images (JPG/PNG) still used as thumbnails
- Lightbox functionality preserved
- Old `VideoGridTile.jsx` component can be removed if not used elsewhere

