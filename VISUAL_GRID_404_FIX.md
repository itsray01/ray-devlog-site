# 🔧 Visual Grid 404 Fix - Applied Changes

## Problem Identified
Videos returning 404 because they haven't been generated yet. The batch script and component now have consistent naming and better debugging.

---

## ✅ Changes Applied

### 1. Added Slug Utility (`src/utils/slugUtils.js`)
- `getFilenameFromPath()` - Extracts filename from image path
- Ensures consistent filename extraction between component and script

### 2. Updated InspirationSection (`src/components/sections/InspirationSection.jsx`)
- Now uses `getFilenameFromPath()` utility for consistent naming
- **Added DEV sanity check** that runs on page load:
  - Checks if `/visual-grid/loops/black-mirror.mp4` exists
  - If 404, prints clear warning in console:
    ```
    ⚠️ Visual Grid videos not found!
    Expected location: public/visual-grid/loops/
    Run: npm run visualgrid:gen
    This will generate MP4/WebM loops from images in src/assets/visual-grid/
    ```

### 3. Enhanced Batch Script (`scripts/generateVisualGridLoops.bat`)
- **Detailed output paths** printed for each file:
  ```
  [PROCESSING] black-mirror...
    Input:  src\assets\visual-grid\black-mirror.jpg
    Output: public\visual-grid\loops\black-mirror.mp4
            public\visual-grid\loops\black-mirror.webm
  [SUCCESS] Generated loops for black-mirror!
    - public\visual-grid\loops\black-mirror.mp4
    - public\visual-grid\loops\black-mirror.webm
  ```
- **Final summary** shows exact directories:
  ```
  INPUT DIRECTORY:  C:\...\devlog-site\src\assets\visual-grid
  OUTPUT DIRECTORY: C:\...\devlog-site\public\visual-grid\loops
  
  Example video URLs:
    /visual-grid/loops/black-mirror.mp4
    /visual-grid/loops/blade-runner.webm
  ```

---

## 📋 Path Mapping

### Data File → Image → Video
```
data/inspiration.json:
  "image": "/img/black-mirror.jpg"
           └──────────┬─────────┘
                      ↓
  Extract filename: "black-mirror"
                      ↓
  Video paths:
    /visual-grid/loops/black-mirror.webm (tried first)
    /visual-grid/loops/black-mirror.mp4  (fallback)
```

### Complete Mapping for All 9 References
| Data Image Path | Extracted Filename | Video Paths |
|----------------|-------------------|-------------|
| `/img/black-mirror.jpg` | `black-mirror` | `/visual-grid/loops/black-mirror.{webm,mp4}` |
| `/img/detroit.jpg` | `detroit` | `/visual-grid/loops/detroit.{webm,mp4}` |
| `/img/stanley-parable.jpg` | `stanley-parable` | `/visual-grid/loops/stanley-parable.{webm,mp4}` |
| `/img/portal.jpg` | `portal` | `/visual-grid/loops/portal.{webm,mp4}` |
| `/img/soma.jpg` | `soma` | `/visual-grid/loops/soma.{webm,mp4}` |
| `/img/control.jpg` | `control` | `/visual-grid/loops/control.{webm,mp4}` |
| `/img/blade-runner.jpg` | `blade-runner` | `/visual-grid/loops/blade-runner.{webm,mp4}` |
| `/img/ex-machina.jpg` | `ex-machina` | `/visual-grid/loops/ex-machina.{webm,mp4}` |
| `/img/cyberpunk.jpg` | `cyberpunk` | `/visual-grid/loops/cyberpunk.{webm,mp4}` |

---

## 🚀 To Generate Videos (REQUIRED)

### Step 1: Run the Generation Script
```bash
npm run visualgrid:gen
```

### What It Does:
1. **Reads from:** `src/assets/visual-grid/*.{jpg,png}`
2. **Writes to:** `public/visual-grid/loops/*.{mp4,webm}`
3. **Generates:** 18 files (9 MP4 + 9 WebM)
4. **Prints:** Detailed paths for each file

### Expected Output:
```
============================================================
Visual Grid Loop Generator
============================================================
Input:  src\assets\visual-grid
Output: public\visual-grid\loops
Duration: 2.8s @ 30fps
Resolution: 1280x720 (16:9)
============================================================

Found 9 image(s) to process.

[PROCESSING] black-mirror...
  Input:  src\assets\visual-grid\black-mirror.jpg
  Output: public\visual-grid\loops\black-mirror.mp4
          public\visual-grid\loops\black-mirror.webm
[SUCCESS] Generated loops for black-mirror!
  - public\visual-grid\loops\black-mirror.mp4
  - public\visual-grid\loops\black-mirror.webm

[PROCESSING] blade-runner...
  Input:  src\assets\visual-grid\blade-runner.jpg
  Output: public\visual-grid\loops\blade-runner.mp4
          public\visual-grid\loops\blade-runner.webm
[SUCCESS] Generated loops for blade-runner!
  - public\visual-grid\loops\blade-runner.mp4
  - public\visual-grid\loops\blade-runner.webm

... (7 more)

============================================================
Generation Complete
============================================================
Processed: 9
Skipped:   0
Errors:    0
Total:     9
============================================================

INPUT DIRECTORY:  C:\Users\admin\Documents\Digital Project\devlog-site\src\assets\visual-grid
OUTPUT DIRECTORY: C:\Users\admin\Documents\Digital Project\devlog-site\public\visual-grid\loops

Generated files will be accessible at:
  /visual-grid/loops/{filename}.mp4
  /visual-grid/loops/{filename}.webm

Example video URLs:
  /visual-grid/loops/black-mirror.mp4
  /visual-grid/loops/blade-runner.webm

Ready to use in Visual Reference Grid!
```

### Step 2: Verify Files Were Created
```bash
Get-ChildItem public\visual-grid\loops
```

You should see 18 files:
```
black-mirror.mp4
black-mirror.webm
blade-runner.mp4
blade-runner.webm
control.mp4
control.webm
cyberpunk.mp4
cyberpunk.webm
detroit.mp4
detroit.webm
ex-machina.mp4
ex-machina.webm
portal.mp4
portal.webm
soma.mp4
soma.webm
stanley-parable.mp4
stanley-parable.webm
```

### Step 3: Test in Browser
```bash
npm run dev
```

Navigate to HOME → Inspiration → Visual Reference Grid

**What to check:**
- ✅ Videos auto-play when scrolling into view
- ✅ No 404 errors in console
- ✅ DEV warning no longer appears (videos found)
- ✅ Static images show with reduced motion enabled

---

## 🐛 Troubleshooting

### Still Getting 404s After Generation?

1. **Verify files exist:**
   ```bash
   Get-ChildItem public\visual-grid\loops | Measure-Object | Select-Object -ExpandProperty Count
   ```
   Should return `18`

2. **Check exact paths in console:**
   - Open browser DevTools → Network tab
   - Filter by "visual-grid"
   - Check the exact URLs being requested
   - Should be: `/visual-grid/loops/black-mirror.webm` etc.

3. **Hard refresh browser:**
   - Ctrl+F5 or Cmd+Shift+R
   - Clears cached 404 responses

4. **Check dev server:**
   - Restart dev server: `npm run dev`
   - Vite should serve files from `public/` at root path

### Script Fails to Generate?

1. **Check FFmpeg:**
   ```bash
   ffmpeg -version
   ```
   If not found: `winget install FFmpeg`

2. **Check input images exist:**
   ```bash
   Get-ChildItem src\assets\visual-grid
   ```
   Should show 9 JPG files

3. **Check permissions:**
   - Ensure write access to `public/` folder

---

## 📁 Directory Structure

```
devlog-site/
├── src/
│   ├── assets/
│   │   └── visual-grid/               📸 INPUT: 9 source images
│   │       ├── black-mirror.jpg       ✅ Ready
│   │       ├── blade-runner.jpg       ✅ Ready
│   │       ├── control.jpg            ✅ Ready
│   │       ├── cyberpunk.jpg          ✅ Ready
│   │       ├── detroit.jpg            ✅ Ready
│   │       ├── ex-machina.jpg         ✅ Ready
│   │       ├── portal.jpg             ✅ Ready
│   │       ├── soma.jpg               ✅ Ready
│   │       └── stanley-parable.jpg    ✅ Ready
│   └── utils/
│       └── slugUtils.js               🆕 Filename extraction utility
├── public/
│   └── visual-grid/
│       └── loops/                      🎥 OUTPUT: Generated videos
│           ├── (empty until generated)
│           └── (run npm script)
└── scripts/
    └── generateVisualGridLoops.bat     ⚙️ Enhanced with detailed logging
```

---

## 📝 Summary

### Script Details:
- **Reads from:** `src/assets/visual-grid/*.{jpg,png}`
- **Writes to:** `public/visual-grid/loops/*.{mp4,webm}`
- **Filename format:** Same as input (e.g., `black-mirror.jpg` → `black-mirror.mp4`)
- **Command:** `npm run visualgrid:gen`

### Component Details:
- **Extracts filename from:** `item.image` in `data/inspiration.json`
- **Example:** `/img/black-mirror.jpg` → `black-mirror`
- **Builds video path:** `/visual-grid/loops/black-mirror.{webm,mp4}`
- **DEV check:** Warns if videos not found (console warning)

### Next Steps:
1. ✅ Run `npm run visualgrid:gen` 
2. ✅ Verify 18 files in `public/visual-grid/loops/`
3. ✅ Run `npm run dev` and test
4. ✅ Check console - should see no warnings

---

**Ready to generate?**

```bash
npm run visualgrid:gen
```

The script will print exact output paths for each file generated. 🎬✨

