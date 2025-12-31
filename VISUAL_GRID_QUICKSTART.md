# 🎬 Visual Grid - Quick Start Guide

## What You Just Got

Your Visual Reference Grid now features **cinematic auto-playing video loops** that make static thumbnails feel alive. Videos automatically play when scrolled into view with a subtle Ken Burns pan/zoom effect.

## 📦 What Was Installed

### New Files Created:
- ✅ `src/components/VideoGridTile.jsx` - Smart video component with IntersectionObserver
- ✅ `scripts/generateVisualGridLoops.bat` - FFmpeg video generation script for Windows
- ✅ `VISUAL_GRID_VIDEO_LOOPS.md` - Comprehensive documentation

### Files Modified:
- ✅ `src/components/sections/InspirationSection.jsx` - Now uses VideoGridTile
- ✅ `src/index.css` - Added video grid styling
- ✅ `package.json` - Added npm scripts

### Directories Created:
- ✅ `src/assets/visual-grid/` - Input images (9 reference images copied)
- ✅ `public/visual-grid/loops/` - Output video loops

## 🚀 Generate Your Video Loops (REQUIRED)

**The videos are NOT generated yet.** You need to run the generation script once:

```bash
npm run visualgrid:gen
```

This will:
1. Process all 9 images in `src/assets/visual-grid/`
2. Generate MP4 and WebM video loops with Ken Burns effect
3. Save them to `public/visual-grid/loops/`
4. Take approximately 1-2 minutes (FFmpeg processing)

**Expected output:**
```
============================================================
Visual Grid Loop Generator
============================================================
Found 9 image(s) to process.

[PROCESSING] black-mirror...
[SUCCESS] Generated loops for black-mirror
[PROCESSING] detroit...
[SUCCESS] Generated loops for detroit
...
============================================================
Generation Complete
============================================================
Processed: 9
Skipped:   0
Errors:    0
Total:     9
============================================================
```

## ✅ Verify Installation

After running the generation script, check that videos were created:

```bash
# PowerShell - list generated videos
Get-ChildItem public\visual-grid\loops\
```

You should see 18 files (9 MP4 + 9 WebM):
- `black-mirror.mp4` / `black-mirror.webm`
- `blade-runner.mp4` / `blade-runner.webm`
- `control.mp4` / `control.webm`
- `cyberpunk.mp4` / `cyberpunk.webm`
- `detroit.mp4` / `detroit.webm`
- `ex-machina.mp4` / `ex-machina.webm`
- `portal.mp4` / `portal.webm`
- `soma.mp4` / `soma.webm`
- `stanley-parable.mp4` / `stanley-parable.webm`

## 🎯 How It Works

### Component Features:
- **Auto-play on scroll** - Videos play when entering viewport, pause when leaving
- **Performance optimized** - Max 6 videos playing simultaneously
- **Accessibility first** - Respects `prefers-reduced-motion` (shows static image only)
- **Graceful fallback** - Shows poster image if video fails to load
- **Mobile ready** - Works on all modern browsers with `playsInline`

### Video Specs:
- **Duration:** 2.8 seconds (seamless loop)
- **Resolution:** 1280x720 (16:9)
- **Animation:** Subtle zoom 1.0x → 1.15x with gentle pan
- **File size:** ~100-300KB per video (compressed)

## 🔧 Troubleshooting

### FFmpeg Not Found?

Install FFmpeg on Windows:

```bash
# Option 1: Using winget (Windows 11+)
winget install FFmpeg

# Option 2: Using Chocolatey
choco install ffmpeg

# Option 3: Manual download
# Download from: https://ffmpeg.org/download.html
# Extract and add to PATH
```

Verify installation:

```bash
ffmpeg -version
```

### Videos Not Showing?

1. **Check generation completed:** Run `npm run visualgrid:gen` and verify no errors
2. **Check file paths:** Ensure videos exist in `public/visual-grid/loops/`
3. **Hard refresh browser:** Ctrl+F5 or Cmd+Shift+R
4. **Check browser console:** Look for 404 errors

### Still Using Static Images?

The component automatically falls back to static images if:
- User has `prefers-reduced-motion` enabled
- Video fails to load
- Videos haven't been generated yet

## 📝 Adding New References

### Step 1: Add image
```bash
# Add your-image.jpg to:
src/assets/visual-grid/
```

### Step 2: Generate video
```bash
npm run visualgrid:gen
```

### Step 3: Update data
Edit `data/inspiration.json`:
```json
{
  "design": [
    {
      "title": "Your Reference",
      "designer": "Author",
      "influence": "Why it matters",
      "image": "/img/your-image.jpg"
    }
  ]
}
```

### Step 4: Copy to public
```bash
Copy-Item src\assets\visual-grid\your-image.jpg public\img\
```

## 🎨 Customization

### Change animation duration
Edit `scripts/generateVisualGridLoops.bat`:
```batch
set DURATION=2.8    REM Change to 3.0, 4.0, etc.
```

### Change zoom intensity
Edit the `zoompan` filter in the script:
```batch
zoompan=z='min(zoom+0.0015,1.15)'    REM Change 1.15 to 1.20 for more zoom
```

### Change max simultaneous videos
Edit `src/components/sections/InspirationSection.jsx`:
```javascript
const MAX_PLAYING_VIDEOS = 6;    // Change to 4, 8, etc.
```

## 📚 Full Documentation

See `VISUAL_GRID_VIDEO_LOOPS.md` for complete documentation including:
- Technical architecture
- Performance considerations
- Browser compatibility
- Detailed troubleshooting

## 🚦 Next Steps

1. **Generate videos:** `npm run visualgrid:gen` (REQUIRED)
2. **Test locally:** `npm run dev` and visit the Inspiration section
3. **Verify performance:** Check that only visible videos play
4. **Test accessibility:** Enable reduced motion and verify static images show
5. **Build for production:** `npm run build` (includes generated videos)

## 📦 What Gets Deployed

The `public/visual-grid/loops/` directory should be committed to git and will be deployed with your site. Videos are optimized for web delivery with fast-start enabled.

## ✨ Result

Your Visual Reference Grid now has:
- ✅ Cinematic auto-playing loops
- ✅ Scroll-driven activation
- ✅ Performance optimization (max 6 playing)
- ✅ Accessibility support (reduced motion)
- ✅ Graceful fallbacks (static images)
- ✅ Cross-browser compatibility

Enjoy your living, breathing reference grid! 🎬✨

