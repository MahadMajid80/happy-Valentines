"use client";

import { useCallback, useState } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
}

export const useHeartAnimation = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const createHeart = useCallback((x: number, y: number) => {
    const newHeart: Heart = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
    }, 3000);
  }, []);

  return { hearts, createHeart };
};

export const FloatingHearts = ({ hearts }: { hearts: Heart[] }) => {
  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none animate-float-up z-50"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            fontSize: "2rem",
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
};

