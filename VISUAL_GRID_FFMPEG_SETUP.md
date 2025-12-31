# 🎬 Visual Grid - FFmpeg Setup Guide

## Overview

The video loop generator now uses a **local FFmpeg installation** instead of requiring it in your system PATH. This makes it more portable and easier to set up.

---

## ✅ Quick Setup (3 Steps)

### Step 1: Download FFmpeg

**Visit:** https://www.gyan.dev/ffmpeg/builds/

**Download:** `ffmpeg-release-essentials.zip` (~90MB)

### Step 2: Extract and Place

1. Open the downloaded ZIP file
2. Navigate to: `ffmpeg-X.X-essentials_build/bin/`
3. Copy `ffmpeg.exe` 
4. Paste into: `scripts/tools/ffmpeg/` in your project

**Final structure:**
```
devlog-site/
  scripts/
    tools/
      ffmpeg/
        ffmpeg.exe  ← Place here
        README.md
        .gitignore
```

### Step 3: Generate Videos

```bash
npm run visualgrid:gen
```

That's it! The script will use the local FFmpeg automatically.

---

## 🔍 Verify Installation

Check FFmpeg is in the right place:

```bash
# PowerShell
Test-Path scripts\tools\ffmpeg\ffmpeg.exe
```

Should return `True`

Or test FFmpeg directly:

```bash
.\scripts\tools\ffmpeg\ffmpeg.exe -version
```

Should show FFmpeg version info.

---

## 📁 What Changed

### Before (Required PATH)
- ❌ Needed FFmpeg in system PATH
- ❌ Required admin rights
- ❌ Could conflict with other FFmpeg versions
- ❌ Different setup on each machine

### After (Local Installation)
- ✅ Self-contained in project
- ✅ No PATH configuration needed
- ✅ No admin rights required
- ✅ Works on any Windows machine
- ✅ No version conflicts

---

## 🎯 Script Behavior

### What the Script Does Now:

1. **Checks for:** `scripts/tools/ffmpeg/ffmpeg.exe`
2. **If not found:** Prints clear error with download instructions
3. **If found:** Uses it to generate video loops
4. **Always creates:** `public/visual-grid/loops/` before processing

### Error Message (if FFmpeg not found):

```
[ERROR] FFmpeg not found at: scripts\tools\ffmpeg\ffmpeg.exe

Please download FFmpeg and place it at:
  C:\...\devlog-site\scripts\tools\ffmpeg\ffmpeg.exe

Download FFmpeg:
  1. Visit: https://www.gyan.dev/ffmpeg/builds/
  2. Download: ffmpeg-release-essentials.zip
  3. Extract ffmpeg.exe from bin\ folder
  4. Place at: scripts\tools\ffmpeg\ffmpeg.exe

Folder structure should be:
  scripts\
    tools\
      ffmpeg\
        ffmpeg.exe  <-- Place here
```

---

## 💾 File Size & Git

### File Size
`ffmpeg.exe` (essentials): ~90-100 MB

### Git Handling
- ✅ `.gitignore` already configured
- ✅ `ffmpeg.exe` will NOT be committed
- ✅ Only `README.md` and `.gitignore` tracked
- ✅ Each developer downloads their own copy

---

## 🐛 Troubleshooting

### Script says "FFmpeg not found"

**Check path:**
```bash
Get-ChildItem scripts\tools\ffmpeg
```

Should show:
```
ffmpeg.exe   (if placed)
README.md
.gitignore
```

**Verify filename:** Must be exactly `ffmpeg.exe` (not `ffmpeg` or `ffmpeg.exe.exe`)

### "System cannot find the path specified"

- Ensure file is in correct location: `scripts/tools/ffmpeg/ffmpeg.exe`
- Check for typos in filename

### "Missing DLL" errors when running FFmpeg

- Download the **essentials** or **full** build (not static)
- Essentials build includes all necessary DLLs

### Need to update FFmpeg version?

1. Delete old `scripts/tools/ffmpeg/ffmpeg.exe`
2. Download new version from gyan.dev
3. Place new `ffmpeg.exe` in same location
4. Run `npm run visualgrid:gen`

---

## 🌐 Alternative: System-Wide Installation

The script only looks for local FFmpeg now, but if you prefer system-wide:

### Option A: Winget (Windows 11+)
```bash
winget install FFmpeg
```
Then copy `ffmpeg.exe` from `C:\Program Files\FFmpeg\bin\` to `scripts/tools/ffmpeg/`

### Option B: Chocolatey
```bash
choco install ffmpeg
```
Then copy from install location to `scripts/tools/ffmpeg/`

### Option C: Manual Download
Use the quick setup steps above (recommended)

---

## 📚 Full Documentation

- **`scripts/tools/ffmpeg/README.md`** - FFmpeg installation details
- **`VISUAL_GRID_README.md`** - Complete visual grid overview
- **`VISUAL_GRID_404_FIX.md`** - Troubleshooting 404 errors
- **`VISUAL_GRID_QUICKSTART.md`** - Quick start guide

---

## ✅ Complete Setup Checklist

- [ ] Download `ffmpeg-release-essentials.zip`
- [ ] Extract `ffmpeg.exe` from `bin/` folder
- [ ] Place in `scripts/tools/ffmpeg/`
- [ ] Verify with: `Test-Path scripts\tools\ffmpeg\ffmpeg.exe`
- [ ] Run `npm run visualgrid:gen`
- [ ] Verify 18 files in `public/visual-grid/loops/`
- [ ] Test with `npm run dev`

---

## 🎉 Ready!

Once `ffmpeg.exe` is in place:

```bash
npm run visualgrid:gen
```

The script will:
1. ✅ Find local FFmpeg
2. ✅ Create output directory
3. ✅ Process 9 images
4. ✅ Generate 18 video files
5. ✅ Print exact output paths

**No PATH configuration needed!** 🚀

