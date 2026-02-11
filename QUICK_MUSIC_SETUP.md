# 🎵 Quick Music Setup Guide

## Option 1: Download Music Automatically (Easiest)

Run this command in your terminal:

```bash
cd /Users/teamincredibles_1/valentines
pnpm run download-music
```

This will show you step-by-step instructions.

## Option 2: Manual Download (Recommended)

### Step 1: Visit Pixabay Music
Go to: **https://pixabay.com/music/search/romantic/**

### Step 2: Download a Track
1. Browse the romantic music tracks
2. Click on one you like
3. Click the "Download" button
4. Choose "MP3" format

### Step 3: Save to Project
1. Rename the downloaded file to: `romantic-music.mp3`
2. Move it to: `/Users/teamincredibles_1/valentines/public/romantic-music.mp3`

### Step 4: Done!
Restart your dev server (`pnpm dev`) and the music will work!

## Option 3: Use External Music URL

If you have a direct download URL to a royalty-free music file, you can download it with:

```bash
cd /Users/teamincredibles_1/valentines/public
curl -L -o romantic-music.mp3 "YOUR_DOWNLOAD_URL_HERE"
```

## Recommended Free Sources

1. **Pixabay Music** - https://pixabay.com/music/search/romantic/
   - Free, no attribution required
   - High quality MP3 files

2. **Free Music Archive** - https://freemusicarchive.org/
   - Large collection of free music
   - Various licenses available

3. **Incompetech** - https://incompetech.com/music/royalty-free/
   - Royalty-free music
   - Attribution required

4. **Bensound** - https://www.bensound.com/royalty-free-music/romantic
   - Free with attribution

## File Requirements

- **Format**: MP3 (recommended), WAV, OGG, or M4A
- **Size**: Under 5MB for best performance
- **Location**: `/public/romantic-music.mp3`

## Troubleshooting

**Music button shows error icon?**
- File might be missing or corrupted
- Check the file path: `/public/romantic-music.mp3`
- Try a different audio file

**Music doesn't play?**
- Some browsers require user interaction before playing audio
- Click the music button to start playback
- Check browser console for errors

---

**Need help?** Check `HOW_TO_ADD_MUSIC.md` for detailed instructions.

