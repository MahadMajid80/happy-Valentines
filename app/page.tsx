"use client";

import { useEffect, useState, useRef } from "react";
import { HeroSection } from "@/components/hero-section";
import { LoveLetterSection } from "@/components/love-letter-section";
import { MemoryGallery } from "@/components/memory-gallery";
import { WhyILoveYouSection } from "@/components/why-i-love-you-section";
import { SurpriseSection } from "@/components/surprise-section";
import { ForeverMessageSection } from "@/components/forever-message-section";
import { LoveTimelineSection } from "@/components/love-timeline-section";
import { RomanticQuotesSection } from "@/components/romantic-quotes-section";
import { PromisesSection } from "@/components/promises-section";
import { Footer } from "@/components/footer";
import { MusicToggle, MusicToggleRef } from "@/components/music-toggle";

export default function Home() {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const musicToggleRef = useRef<MusicToggleRef>(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        // Small delay to ensure audio is ready
        setTimeout(() => {
          musicToggleRef.current?.play();
        }, 100);
      }
    };

    // Listen to multiple events to catch any user interaction
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("wheel", handleInteraction, { passive: true });
    window.addEventListener("mousedown", handleInteraction);
    
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
    };
  }, [hasUserInteracted]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      <MusicToggle ref={musicToggleRef} musicFile="/liosound_Cinematic_main.mp3" />

      <HeroSection girlfriendName="Aleezay jan" />
      <LoveLetterSection />
      <LoveTimelineSection />
      <MemoryGallery />
      <RomanticQuotesSection />
      <WhyILoveYouSection />
      <PromisesSection />
      <SurpriseSection />
      <ForeverMessageSection />
      <Footer aivantaUrl="https://aivanta.com" />
    </main>
  );
}
