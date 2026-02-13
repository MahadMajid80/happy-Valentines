"use client";

import { useEffect, useState } from "react";

interface HeroSectionProps {
  girlfriendName?: string;
}

interface FloatingElement {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  fontSize?: number;
}

export const HeroSection = ({ girlfriendName }: HeroSectionProps) => {
  const nameToDisplay = (girlfriendName && typeof girlfriendName === 'string' && girlfriendName.trim()) 
    ? girlfriendName.trim() 
    : "Aleezay jan";
  const [displayedName, setDisplayedName] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [hearts, setHearts] = useState<FloatingElement[]>([]);
  const [sparkles, setSparkles] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const finalName = (girlfriendName && typeof girlfriendName === 'string' && girlfriendName.trim()) 
      ? girlfriendName.trim() 
      : "Aleezay jan";
    
    if (!finalName || finalName.length === 0) {
      setDisplayedName("Aleezay jan");
      return;
    }
    
    const nameArray = Array.from(finalName).filter(char => char !== undefined && char !== null);
    let currentIndex = 0;
    setDisplayedName("");

    const interval = setInterval(() => {
      if (currentIndex < nameArray.length) {
        const char = nameArray[currentIndex];
        if (char && typeof char === 'string') {
          setDisplayedName((prev) => prev + char);
        }
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSubtext(true), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [girlfriendName]);

  useEffect(() => {
    const heartsData: FloatingElement[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      fontSize: Math.random() * 20 + 15,
    }));

    const sparklesData: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 2,
    }));

    setHearts(heartsData);
    setSparkles(sparklesData);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-float"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animationDelay: `${heart.animationDelay}s`,
              fontSize: `${heart.fontSize}px`,
            }}
          >
            ❤️
          </div>
        ))}
        {sparkles.map((sparkle) => (
          <div
            key={`sparkle-${sparkle.id}`}
            className="absolute animate-sparkle text-yellow-300"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.animationDelay}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-handwriting font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 tracking-tight leading-tight">
          Happy Valentine&apos;s Day, <span>{displayedName || nameToDisplay}</span>
          {displayedName && displayedName.length > 0 && displayedName.length < nameToDisplay.length && (
            <span className="animate-pulse ml-1">|</span>
          )}
          <span className="ml-4 animate-heart-beat inline-block">❤️</span>
        </h1>

        {showSubtext && (
          <p className="text-xl md:text-2xl text-white font-handwriting mt-4 animate-fade-in-up">
            This website is made just for you
          </p>
        )}

        <div className="mt-12 animate-bounce">
          <svg
            className="w-8 h-8 mx-auto text-pink-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

