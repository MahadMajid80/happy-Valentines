# 💕 Romantic Valentine's Day Website

A beautiful, romantic Valentine's Day website designed as a love gift. Features smooth animations, floating hearts, romantic sections, and a magical experience.

## ✨ Features

- **Hero Section** - Personalized greeting with animated name display
- **Love Letter** - Heartfelt romantic letter with fade-in animations
- **Memory Gallery** - Photo gallery with romantic overlays and transitions
- **Why I Love You** - Animated cards with reasons
- **Surprise Section** - Hidden message reveal
- **Forever Message** - Closing romantic message with floating hearts
- **Background Music** - Toggle on/off romantic music
- **Heart Animations** - Click anywhere to create floating hearts
- **Smooth Scrolling** - Beautiful parallax and scroll effects
- **Mobile Responsive** - Works perfectly on all devices

## 🚀 Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build

```bash
pnpm build
pnpm start
```

## 🎨 Customization

### Personalize the Content

1. **Girlfriend's Name**: Edit `app/page.tsx` and change the `girlfriendName` prop:
   ```tsx
   <HeroSection girlfriendName="Your Name Here" />
   ```

2. **Love Letter**: Edit `components/love-letter-section.tsx` and modify the `letter` prop or default letter content.

3. **Reasons**: Edit `components/why-i-love-you-section.tsx` and customize the `reasons` array.

4. **Surprise Message**: Edit `components/surprise-section.tsx` and modify the `surpriseMessage` prop.

5. **Memories**: Add your photos to `/public/memories/` folder:
   - `memory1.jpg`
   - `memory2.jpg`
   - `memory3.jpg`
   
   Or update the `memories` array in `components/memory-gallery.tsx` with your image paths.

### Background Music

Add a romantic music file to `/public/romantic-music.mp3` for background music. The music toggle button will appear in the top-right corner.

## 📁 Project Structure

```
valentines/
├── app/
│   ├── page.tsx              # Main page component
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Global styles and animations
├── components/
│   ├── hero-section.tsx      # Hero section with name animation
│   ├── love-letter-section.tsx
│   ├── memory-gallery.tsx
│   ├── why-i-love-you-section.tsx
│   ├── surprise-section.tsx
│   ├── forever-message-section.tsx
│   ├── music-toggle.tsx      # Music player toggle
│   └── heart-animation.tsx   # Heart animation utilities
└── public/
    └── memories/             # Add your photos here
```

## 🎨 Design Features

- Soft pink, red, and pastel color scheme
- Handwritten-style fonts (Dancing Script)
- Smooth animations and transitions
- Floating hearts and sparkles
- Romantic gradients and overlays
- Mobile-first responsive design

## 💝 Share Your Love

Once deployed, share the link with your loved one! The website is fully shareable via a single link.

## 📝 Notes

- The website uses Next.js 16 with App Router
- Styled with Tailwind CSS
- All animations are CSS-based for smooth performance
- Music requires user interaction to play (browser policy)

## 🛠️ Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn UI

---

Made with ❤️ for your special someone
