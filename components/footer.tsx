"use client";

interface FooterProps {
  aivantaUrl?: string;
}

export const Footer = ({ aivantaUrl = "https://aivanta.com" }: FooterProps) => {
  return (
    <footer className="w-full py-8 px-4 bg-black border-t border-pink-500/20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-pink-400 font-handwriting text-lg md:text-xl">
            Made with ❤️ for you
          </div>
          <div className="text-gray-500 text-sm md:text-base">
            Created by{" "}
            <a
              href={aivantaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 font-semibold font-premium hover:text-pink-300 transition-colors duration-300 underline decoration-pink-500/50 hover:decoration-pink-400"
            >
              AIVANTA
            </a>
          </div>
          <div className="text-gray-600 text-xs md:text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

