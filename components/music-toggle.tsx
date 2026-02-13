"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicToggleProps {
  musicFile?: string;
  useExternalMusic?: boolean;
}

export interface MusicToggleRef {
  play: () => void;
}

export const MusicToggle = forwardRef<MusicToggleRef, MusicToggleProps>(({ 
  musicFile = "/romantic-music.mp3",
  useExternalMusic = false 
}, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current && !hasError) {
        // Try to play even if still loading
        const attemptPlay = () => {
          if (audioRef.current) {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch((error) => {
              console.log("Audio play failed:", error);
            });
          }
        };
        
        if (audioRef.current.readyState >= 2) {
          // Audio is ready
          attemptPlay();
        } else {
          // Wait for audio to be ready
          audioRef.current.addEventListener("canplay", attemptPlay, { once: true });
        }
      }
    }
  }));

  useEffect(() => {
    // Use external royalty-free music if enabled, otherwise use local file
    const audioSource = useExternalMusic 
      ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Example - replace with actual royalty-free URL
      : musicFile;
    
    const audio = new Audio(audioSource);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const attemptAutoplay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
        setHasError(false);
      }).catch((error) => {
        // Autoplay blocked - will play on user interaction
        setIsLoading(false);
        setHasError(false);
      });
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
      attemptAutoplay();
    };

    const handleLoadedData = () => {
      attemptAutoplay();
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadeddata", handleLoadedData);

    // Try to play immediately
    audioRef.current = audio;
    attemptAutoplay();

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadeddata", handleLoadedData);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicFile, useExternalMusic]);

  const toggleMusic = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed:", error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  if (hasError) {
    return (
      <div className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg" title="Add music file to /public/romantic-music.mp3">
        <Music className="w-6 h-6 text-pink-300" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleMusic}
      disabled={isLoading}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      title={isLoading ? "Loading music..." : isPlaying ? "Pause music" : "Play music"}
    >
      {isLoading ? (
        <Music className="w-6 h-6 text-pink-400 animate-pulse" />
      ) : isPlaying ? (
        <Volume2 className="w-6 h-6 text-pink-600" />
      ) : (
        <VolumeX className="w-6 h-6 text-pink-600" />
      )}
    </button>
  );
});

