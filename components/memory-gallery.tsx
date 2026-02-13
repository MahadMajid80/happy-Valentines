"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";

interface Memory {
  id: number | string;
  src: string;
  alt: string;
  caption?: string;
}

interface MemoryGalleryProps {
  memories?: Memory[];
}

export const MemoryGallery = ({ memories: initialMemories }: MemoryGalleryProps) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch memories from API on component mount
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/memories");
        if (response.ok) {
          const data = await response.json();
          if (data.memories && data.memories.length > 0) {
            setMemories(data.memories);
          } else if (initialMemories && initialMemories.length > 0) {
            // Fallback to initial memories if API returns empty
            setMemories(initialMemories);
          }
        } else {
          // Fallback to initial memories on error
          if (initialMemories && initialMemories.length > 0) {
            setMemories(initialMemories);
          }
        }
      } catch (error) {
        console.error("Error fetching memories:", error);
        // Fallback to initial memories on error
        if (initialMemories && initialMemories.length > 0) {
          setMemories(initialMemories);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
  }, [initialMemories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("memory-gallery");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && memories.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % memories.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isVisible, memories.length]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/memories", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.memory) {
          setMemories((prev) => [...prev, data.memory]);
          setCurrentIndex(memories.length); // Show the newly uploaded image
        }
      } else {
        const error = await response.json();
        alert(error.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = async (memoryId: number | string, imageUrl: string) => {
    if (!confirm("Are you sure you want to remove this memory?")) {
      return;
    }

    try {
      const response = await fetch(`/api/memories/${memoryId}?url=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMemories((prev) => prev.filter((m) => m.id !== memoryId));
        if (currentIndex >= memories.length - 1) {
          setCurrentIndex(Math.max(0, memories.length - 2));
        }
      } else {
        const error = await response.json();
        alert(error.error || "Failed to remove image");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      alert("Failed to remove image. Please try again.");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <section
        id="memory-gallery"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative bg-black"
      >
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="memory-gallery"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative bg-black"
    >
      <h2 className="text-4xl md:text-5xl font-handwriting text-rose-600 mb-12 text-center">
        Our Beautiful Memories 💕
      </h2>

      <div className="max-w-4xl w-full">
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full blur-3xl opacity-50"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 group">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onClick={handleImageClick}
              >
                {memories.length > 0 && memories[currentIndex]?.src ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={memories[currentIndex].src}
                      alt={memories[currentIndex].alt}
                      fill
                      className="object-cover"
                      unoptimized={memories[currentIndex].src.startsWith("http")}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                      <div className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-semibold">Click to add more memories</p>
                      </div>
                    </div>
                    {memories.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(memories[currentIndex].id, memories[currentIndex].src);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
                        aria-label="Remove image"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200 cursor-pointer">
                    <div className="text-center p-8">
                      {isUploading ? (
                        <>
                          <Loader2 className="w-12 h-12 mx-auto mb-4 text-rose-600 animate-spin" />
                          <p className="text-rose-600 font-handwriting text-xl">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 mx-auto mb-4 text-rose-600" />
                          <p className="text-rose-600 font-handwriting text-xl mb-2">
                            Click to add your first memory
                          </p>
                          <p className="text-gray-500 text-sm">Upload an image to get started</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 text-4xl animate-heart-beat">💖</div>
            <div className="absolute -bottom-4 -left-4 text-4xl animate-heart-beat" style={{ animationDelay: "0.5s" }}>
              💗
            </div>
          </div>

          {memories.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {memories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-rose-500"
                      : "w-2 bg-pink-300"
                  }`}
                  aria-label={`Go to memory ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
