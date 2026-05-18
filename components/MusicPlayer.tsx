"use client";

import { useState, useEffect, useRef } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt autoplay on first user interaction
    const initAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener("click", initAudio);
    };
    window.addEventListener("click", initAudio, { once: true });
    return () => window.removeEventListener("click", initAudio);
  }, [isPlaying]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((err) => console.log("Autoplay blocked", err));
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} id="bg-music" loop>
        <source src="/carlayangel/cancion.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        className="music-btn"
        aria-label="Reproducir música"
      >
        {!isPlaying ? (
          <svg viewBox="0 0 24 24" className="music-icon-play">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="music-icon-pause">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </button>
    </>
  );
}
