"use client";

import { useState, useEffect, useRef } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // El navegador bloqueó el autoplay
        });
      }
    };

    // Intentar reproducir al montar el componente (como el sobre ya se abrió, cuenta como interacción en algunos navegadores)
    tryPlay();

    const initAudio = () => {
      tryPlay();
      window.removeEventListener("click", initAudio);
      window.removeEventListener("touchstart", initAudio);
    };
    
    window.addEventListener("click", initAudio, { once: true });
    window.addEventListener("touchstart", initAudio, { once: true });
    
    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("touchstart", initAudio);
    };
  }, [isPlaying]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.log("Audio play failed:", err);
            setIsPlaying(false);
          });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} id="bg-music" loop preload="auto">
        <source src="/carlayangel/cancion.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        className="music-btn"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
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
