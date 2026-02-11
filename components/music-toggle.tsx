"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicToggleProps {
  musicFile?: string;
  useExternalMusic?: boolean;
}

export const MusicToggle = ({ 
  musicFile = "/romantic-music.mp3",
  useExternalMusic = false 
}: MusicToggleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Use external royalty-free music if enabled, otherwise use local file
    const audioSource = useExternalMusic 
      ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Example - replace with actual royalty-free URL
      : musicFile;
    
    const audio = new Audio(audioSource);
    audio.loop = true;
    audio.volume = 0.3;

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
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
};

