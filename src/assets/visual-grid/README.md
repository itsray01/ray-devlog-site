# Visual Grid Source Images

This directory contains the source images for the Visual Reference Grid's cinematic video loops.

## Purpose

These static JPG/PNG images are processed by the FFmpeg generation script to create:
- Subtle Ken Burns pan/zoom video loops
- MP4 and WebM formats for web delivery
- Output: `public/visual-grid/loops/`

## Current Images (9 references)

1. **black-mirror.jpg** - Black Mirror: Bandersnatch
2. **blade-runner.jpg** - Blade Runner (1982)
3. **control.jpg** - Control
4. **cyberpunk.jpg** - Cyberpunk UI Design
5. **detroit.jpg** - Detroit: Become Human
6. **ex-machina.jpg** - Ex Machina (2014)
7. **portal.jpg** - Portal / Portal 2
8. **soma.jpg** - SOMA
9. **stanley-parable.jpg** - The Stanley Parable

## Adding New References

### 1. Add image to this directory
```
src/assets/visual-grid/your-new-reference.jpg
```

**Requirements:**
- Format: JPG or PNG
- Recommended resolution: 1920x1080 or higher
- Will be cropped to 16:9 (1280x720)

### 2. Generate video loops
```bash
npm run visualgrid:gen
```

This will create:
- `public/visual-grid/loops/your-new-reference.mp4`
- `public/visual-grid/loops/your-new-reference.webm`

### 3. Copy to public
```bash
Copy-Item src\assets\visual-grid\your-new-reference.jpg public\img\
```

### 4. Update data file
Edit `data/inspiration.json`:

```json
{
  "design": [
    {
      "title": "Your New Reference",
      "designer": "Author Name",
      "influence": "Why this inspires the project",
      "image": "/img/your-new-reference.jpg"
    }
  ]
}
```

The component will automatically:
- Extract the filename from `image` path
- Look for videos in `/visual-grid/loops/{filename}.{mp4,webm}`
- Fall back to poster image if videos not found

## Regenerating Videos

To regenerate all videos (e.g., after changing settings):

```bash
npm run visualgrid:gen:force
```

This will overwrite all existing video loops.

## Video Specifications

- **Duration:** 2.8 seconds (seamless loop)
- **Resolution:** 1280x720 (16:9)
- **Frame rate:** 30fps
- **Animation:** Slow zoom 1.0x → 1.15x with gentle pan
- **Output formats:** MP4 (H.264) + WebM (VP9)
- **File size:** ~100-300KB per video

## See Also

- `VISUAL_GRID_QUICKSTART.md` - Quick start guide
- `VISUAL_GRID_VIDEO_LOOPS.md` - Full documentation
- `scripts/generateVisualGridLoops.bat` - Generation script



