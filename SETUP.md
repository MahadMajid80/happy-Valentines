# 💕 Quick Setup Guide

## 🚀 Getting Started

1. **Install dependencies** (if not already done):
   ```bash
   pnpm install
   ```

2. **Start the development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## ✏️ Personalization Steps

### 1. Change the Name
Edit `app/page.tsx` line 34:
```tsx
<HeroSection girlfriendName="Her Name Here" />
```

### 2. Customize the Love Letter
Edit `components/love-letter-section.tsx` - modify the `defaultLetter` constant or pass a custom `letter` prop.

### 3. Add Your Reasons
Edit `components/why-i-love-you-section.tsx` - customize the `defaultReasons` array with your own reasons.

### 4. Add Your Photos
1. Add photos to `/public/memories/` folder
2. Name them: `memory1.jpg`, `memory2.jpg`, `memory3.jpg`
3. Or update the `memories` array in `components/memory-gallery.tsx` with your image paths

### 5. Add Background Music (Optional)
1. Add a romantic music file to `/public/romantic-music.mp3`
2. The music toggle button will appear automatically

### 6. Customize Surprise Message
Edit `components/surprise-section.tsx` - modify the `defaultSurpriseMessage` constant.

## 🎨 Features Included

✅ Hero section with animated name display  
✅ Love letter with fade-in scroll animation  
✅ Memory gallery with romantic overlays  
✅ "Why I Love You" animated cards  
✅ Surprise section with hidden reveal  
✅ Forever message with floating hearts  
✅ Background music toggle  
✅ Click-to-create heart animations  
✅ Smooth scrolling and parallax effects  
✅ Mobile responsive design  

## 📦 Deploy

### Vercel (Recommended)
```bash
pnpm build
```
Then deploy to Vercel - it's free and easy!

### Other Platforms
The site is a standard Next.js app and can be deployed anywhere that supports Next.js.

---

**Made with ❤️ for your special someone**

