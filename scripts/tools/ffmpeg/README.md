# FFmpeg Setup for Visual Grid Generator

## Required File

Place `ffmpeg.exe` in this directory to enable video loop generation.

```
scripts/
  tools/
    ffmpeg/
      ffmpeg.exe  <-- Place here
      README.md   <-- You are here
```

---

## Download FFmpeg

### Option 1: Quick Download (Recommended)

1. **Visit:** https://www.gyan.dev/ffmpeg/builds/
2. **Download:** `ffmpeg-release-essentials.zip` (smaller, ~90MB)
3. **Extract:** Open the ZIP file
4. **Navigate to:** `ffmpeg-X.X-essentials_build/bin/`
5. **Copy:** `ffmpeg.exe` to this directory (`scripts/tools/ffmpeg/`)

### Option 2: Full Build

1. **Visit:** https://www.gyan.dev/ffmpeg/builds/
2. **Download:** `ffmpeg-release-full.zip` (~150MB, includes all codecs)
3. **Extract and copy** `ffmpeg.exe` as above

### Option 3: Official FFmpeg Website

1. **Visit:** https://ffmpeg.org/download.html
2. **Click:** Windows builds
3. **Choose:** gyan.dev or BtbN builds
4. **Download and extract** `ffmpeg.exe`

---

## Verify Installation

After placing `ffmpeg.exe` in this directory, verify it works:

```bash
.\scripts\tools\ffmpeg\ffmpeg.exe -version
```

Should output FFmpeg version information.

---

## Generate Video Loops

Once `ffmpeg.exe` is in place, run:

```bash
npm run visualgrid:gen
```

The script will automatically use the local FFmpeg installation.

---

## Why Local Installation?

- ✅ **No PATH configuration needed**
- ✅ **No admin rights required**
- ✅ **Portable** - works on any machine
- ✅ **Version controlled** - consistent builds
- ✅ **No global installation conflicts**

---

## File Size

`ffmpeg.exe` (essentials build): ~90-100 MB

**Note:** This file is typically NOT committed to git (too large). Each user should download it locally.

---

## Troubleshooting

### "System cannot find the path specified"

- Make sure `ffmpeg.exe` is directly in `scripts/tools/ffmpeg/`
- Check filename is exactly `ffmpeg.exe` (not `ffmpeg` or `ffmpeg.exe.exe`)

### "Not recognized as an internal or external command"

- This error should NOT appear with the updated script
- The script uses the full path to ffmpeg.exe

### "Missing DLL" errors

- Download the **essentials** or **full** build (not static)
- Ensure all files from the `bin/` folder are present

---

## Alternative: System-Wide Installation

If you prefer to install FFmpeg globally (in PATH), the script will still work, but it's not necessary.

**Using winget:**
```bash
winget install FFmpeg
```

**Using Chocolatey:**
```bash
choco install ffmpeg
```

But for portability, the local installation in this directory is recommended.

