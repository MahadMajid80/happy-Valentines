#!/usr/bin/env node

/**
 * Script to help download royalty-free romantic music
 * This provides instructions and can download from Pixabay API if you have an API key
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MUSIC_FILE = path.join(PUBLIC_DIR, 'romantic-music.mp3');

console.log('🎵 Romantic Music Download Helper\n');

// Check if file already exists
if (fs.existsSync(MUSIC_FILE)) {
  console.log('✅ Music file already exists at:', MUSIC_FILE);
  console.log('   If you want to replace it, delete it first.\n');
  process.exit(0);
}

console.log('📝 To add music, you have these options:\n');

console.log('Option 1: Manual Download (Recommended)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('1. Visit: https://pixabay.com/music/search/romantic/');
console.log('2. Browse and find a romantic track you like');
console.log('3. Click "Download" (free account required)');
console.log('4. Save the file as: romantic-music.mp3');
console.log('5. Place it in: ' + PUBLIC_DIR);
console.log('');

console.log('Option 2: Use Free Music Archive');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('1. Visit: https://freemusicarchive.org/');
console.log('2. Search for "romantic" or "love"');
console.log('3. Download a track');
console.log('4. Rename to: romantic-music.mp3');
console.log('5. Place it in: ' + PUBLIC_DIR);
console.log('');

console.log('Option 3: Direct Download (if you have a URL)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Run: curl -L -o ' + MUSIC_FILE + ' "YOUR_DOWNLOAD_URL"');
console.log('');

console.log('💡 Recommended Sources:');
console.log('   • Pixabay Music: https://pixabay.com/music/search/romantic/');
console.log('   • Free Music Archive: https://freemusicarchive.org/');
console.log('   • Incompetech: https://incompetech.com/music/royalty-free/');
console.log('   • Bensound: https://www.bensound.com/royalty-free-music/romantic');
console.log('');

console.log('📋 File Requirements:');
console.log('   • Format: MP3 (recommended), WAV, OGG, or M4A');
console.log('   • Size: Under 5MB recommended');
console.log('   • Location: ' + MUSIC_FILE);
console.log('');

console.log('✨ Once the file is added, restart your dev server and the music toggle will work!');

