# 🎵 How to Add Background Music

## Quick Steps

1. **Find or download a romantic song** (see recommendations below)
2. **Convert it to MP3 format** (if needed)
3. **Rename it to `romantic-music.mp3`**
4. **Place it in the `/public` folder**

That's it! The music toggle button will automatically work.

## File Location

```
/Users/teamincredibles_1/valentines/public/romantic-music.mp3
```

## Recommended Sources for Free Romantic Music

### Royalty-Free Music Sites:
- **Pixabay Music**: https://pixabay.com/music/search/romantic/
- **Free Music Archive**: https://freemusicarchive.org/
- **Incompetech**: https://incompetech.com/music/royalty-free/
- **Bensound**: https://www.bensound.com/royalty-free-music/romantic

### Search Terms:
- "romantic background music"
- "soft piano romantic"
- "love song instrumental"
- "romantic acoustic"

## Supported Formats

The website supports these audio formats:
- ✅ MP3 (recommended)
- ✅ WAV
- ✅ OGG
- ✅ M4A

## File Size Recommendations

- **Recommended**: Under 5MB for faster loading
- **Maximum**: 10MB (larger files may take longer to load)

## Customizing the Music File Name

If you want to use a different filename, edit `app/page.tsx`:

```tsx
<MusicToggle musicFile="/your-music-file.mp3" />
```

## Troubleshooting

### Music doesn't play?
1. Check that the file is in `/public/romantic-music.mp3`
2. Make sure the file format is supported (MP3 recommended)
3. Check browser console for errors
4. Some browsers require user interaction before playing audio

### Music button shows error icon?
- The file might be missing or corrupted
- Check the file path and name
- Try a different audio file

### Music is too loud/quiet?
Edit `components/music-toggle.tsx` and change the volume:
```tsx
audio.volume = 0.3; // Change 0.3 to any value between 0.0 and 1.0
```

## Example: Using YouTube Audio

If you have a YouTube video you want to use:

1. Use a YouTube to MP3 converter (make sure you have rights to use the music)
2. Download the audio
3. Rename to `romantic-music.mp3`
4. Place in `/public` folder

---

**Note**: Make sure you have the rights to use any music you add. For personal use, royalty-free music is recommended.

