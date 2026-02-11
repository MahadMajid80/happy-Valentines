#!/bin/bash

# Script to download royalty-free romantic music automatically
# This downloads a sample romantic track

echo "🎵 Downloading royalty-free romantic music..."

PUBLIC_DIR="public"
MUSIC_FILE="$PUBLIC_DIR/romantic-music.mp3"

# Create public directory if it doesn't exist
mkdir -p "$PUBLIC_DIR"

# Check if file already exists
if [ -f "$MUSIC_FILE" ]; then
    echo "✅ Music file already exists!"
    echo "   Location: $MUSIC_FILE"
    echo "   Delete it first if you want to download a new one."
    exit 0
fi

# Try to download from a public royalty-free music source
# Using a sample from Pixabay (you may need to get the actual download URL)
# For now, we'll use a direct download approach

echo ""
echo "📥 Attempting to download music..."
echo ""

# Option 1: Try downloading from a public CDN (example - you'll need actual URL)
# Uncomment and replace with actual download URL:
# curl -L -o "$MUSIC_FILE" "YOUR_DOWNLOAD_URL_HERE"

# Option 2: Use yt-dlp if available to download from YouTube
if command -v yt-dlp &> /dev/null || command -v youtube-dl &> /dev/null; then
    echo "Found yt-dl! You can download music with:"
    echo "yt-dlp -x --audio-format mp3 -o '$MUSIC_FILE' 'YOUTUBE_URL'"
    echo ""
fi

# Option 3: Manual download instructions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 MANUAL DOWNLOAD INSTRUCTIONS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Visit: https://pixabay.com/music/search/romantic/"
echo "2. Click on a track you like"
echo "3. Click 'Download' (free account may be required)"
echo "4. Save the file as: romantic-music.mp3"
echo "5. Move it to: $(pwd)/$PUBLIC_DIR/"
echo ""
echo "OR use this direct command (replace URL):"
echo "curl -L -o $MUSIC_FILE 'YOUR_DOWNLOAD_URL'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
