# Visual Reference Grid - Cinematic Video Loops

## Overview

The Visual Reference Grid displays film and game references with subtle auto-playing video loops that create a "living poster" effect. Each thumbnail appears as a static image but comes alive with a gentle Ken Burns pan/zoom animation when scrolled into view.

## Features

- **Auto-playing video loops** - Videos play automatically when in viewport, pause when offscreen
- **Performance optimized** - IntersectionObserver ensures only visible videos load/play
- **Cap on simultaneous videos** - Maximum 6 videos playing at once to preserve performance
- **Static poster fallback** - Shows static JPG/PNG if video fails or reduced motion is enabled
- **Respects accessibility** - Honors `prefers-reduced-motion` setting
- **Lightweight** - Compressed video loops (typically 100-300KB per loop)
- **Multi-format support** - WebM (VP9) for compression, MP4 (H.264) for compatibility

## Directory Structure

```
src/assets/visual-grid/          # Input: Original JPG/PNG images
public/visual-grid/loops/         # Output: Generated MP4/WebM loops
```

## How to Add New References

### Step 1: Add Your Image

Place your reference image in `src/assets/visual-grid/`:

```
src/assets/visual-grid/
  ├── blade-runner.jpg
  ├── ex-machina.jpg
  ├── your-new-reference.jpg    ← Add here
  └── ...
```

**Image requirements:**
- Format: JPG or PNG
- Recommended: 1920x1080 or higher
- Will be cropped to 16:9 aspect ratio (1280x720)

### Step 2: Generate Video Loops

Run the video generator script:

```bash
# Generate loops for all new images (skips existing)
npm run visualgrid:gen

# Force regenerate all loops
npm run visualgrid:gen:force
```

The script will:
1. Process all images in `src/assets/visual-grid/`
2. Generate MP4 and WebM loops with subtle Ken Burns effect
3. Save to `public/visual-grid/loops/`
4. Skip images that already have generated videos (unless `--force`)

**Output:** `public/visual-grid/loops/your-new-reference.{mp4,webm}`

### Step 3: Add to Data File

Update `data/inspiration.json` to include your reference:

```json
{
  "interactive": [ ... ],
  "games": [ ... ],
  "design": [
    {
      "title": "Your New Reference",
      "designer": "Director Name",
      "influence": "Why this influences your project",
      "image": "/img/your-new-reference.jpg"
    }
  ]
}
```

**Important:** The `image` path should match the public image location. The video paths are automatically generated from the filename.

### Step 4: Copy Image to Public

Copy the image to the public folder so it can be served:

```bash
# PowerShell
Copy-Item src\assets\visual-grid\your-new-reference.jpg public\img\
```

Or manually copy from `src/assets/visual-grid/` to `public/img/`.

## Technical Details

### Video Generation Settings

- **Duration:** 2.8 seconds (seamless loop)
- **Resolution:** 1280x720 (16:9)
- **Frame rate:** 30fps
- **Animation:** Slow zoom from 1.0x to 1.15x scale with subtle pan
- **Compression:** 
  - MP4: H.264, CRF 28, yuv420p, faststart
  - WebM: VP9, 800kbps, quality=good

### Component Architecture

The grid uses a specialized `VideoGridTile` component that:

1. **Lazy loads** videos using IntersectionObserver (200px margin)
2. **Auto-plays** when entering viewport
3. **Pauses** when leaving viewport to save resources
4. **Falls back** to static poster on error
5. **Respects reduced motion** - shows static image only if user prefers reduced motion

### Performance Considerations

- **Max 6 simultaneous playing videos** - Older videos pause when limit reached
- **Preload metadata only** - Full video loads when near viewport
- **Compressed formats** - WebM served first (better compression), MP4 fallback
- **Poster images** - Static image shown while video loads

## Troubleshooting

### Videos not playing

1. **Check file paths:** Ensure videos exist in `public/visual-grid/loops/`
2. **Check browser console:** Look for 404 errors or video load failures
3. **Verify formats:** Both MP4 and WebM should be generated
4. **Test in incognito:** Some browser extensions block autoplay

### Generation script fails

1. **Check FFmpeg:** Run `ffmpeg -version` to verify installation
2. **Install FFmpeg:** `winget install FFmpeg` (Windows)
3. **Check input images:** Ensure images exist in `src/assets/visual-grid/`
4. **Check permissions:** Ensure write access to `public/visual-grid/loops/`

### Videos not animating

1. **Check reduced motion:** System accessibility settings may disable animations
2. **Check viewport:** Videos only play when visible on screen
3. **Check video quality:** Some browsers may refuse to play corrupted videos

## Browser Support

- ✅ Chrome/Edge (excellent)
- ✅ Firefox (excellent)
- ✅ Safari (good - MP4 fallback)
- ✅ Mobile browsers (good with `playsInline` attribute)

## Files Modified

- `src/components/VideoGridTile.jsx` - New component for video grid items
- `src/components/sections/InspirationSection.jsx` - Updated to use VideoGridTile
- `src/index.css` - Added video grid styling
- `scripts/generateVisualGridLoops.bat` - FFmpeg video generation script
- `package.json` - Added npm scripts

## Commands Reference

```bash
# Generate video loops (skip existing)
npm run visualgrid:gen

# Force regenerate all loops
npm run visualgrid:gen:force

# Run generation script directly with options
scripts\generateVisualGridLoops.bat
scripts\generateVisualGridLoops.bat --force
```

## Notes

- Videos are muted by default (required for autoplay)
- The Ken Burns effect is subtle - just 15% zoom over 2.8 seconds
- Videos loop seamlessly (starting frame matches ending frame)
- Generated videos are optimized for web (faststart flag for MP4)
- Component automatically handles video cleanup on unmount

