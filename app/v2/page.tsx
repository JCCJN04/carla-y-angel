"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────── */
const WEDDING = new Date("2026-11-27T16:00:00");

function getParts() {
  const diff = WEDDING.getTime() - Date.now();
  const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");
  if (diff <= 0) return { days: "00", hours: "00", min: "00", sec: "00" };
  return {
    days:  pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    min:   pad(Math.floor((diff % 3600000) / 60000)),
    sec:   pad(Math.floor((diff % 60000) / 1000)),
  };
}

/* ─────────────────────────────────────────────────────────
   MUSIC PLAYER
───────────────────────────────────────────────────────── */
function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const triedAutoplay = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || triedAutoplay.current) return;
    triedAutoplay.current = true;

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay blocked — play on first interaction
        const unlock = () => {
          audio.play().then(() => setPlaying(true)).catch(() => {});
          document.removeEventListener("click", unlock);
          document.removeEventListener("touchstart", unlock);
        };
        document.addEventListener("click", unlock, { once: true });
        document.addEventListener("touchstart", unlock, { once: true });
      });
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <div className="player-wrap">
      <audio ref={audioRef} loop preload="auto">
        <source src="/carlayangel/cancion.mp3" type="audio/mpeg" />
      </audio>
      <p className="player-label">Nuestra canción</p>
      <div className="player-controls">
        <button onClick={toggle} aria-label="Anterior" className="player-btn player-btn--sm">
          <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
        </button>
        <button onClick={toggle} aria-label={playing ? "Pausar" : "Reproducir"} className="player-btn player-btn--main">
          {playing
            ? <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            : <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          }
        </button>
        <button onClick={toggle} aria-label="Siguiente" className="player-btn player-btn--sm">
          <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-12v12h2V6H8z"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   COUNTDOWN
───────────────────────────────────────────────────────── */
function Countdown() {
  const [parts, setParts] = useState(getParts);
  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: parts.days,  l: "Días" },
    { v: parts.hours, l: "Horas" },
    { v: parts.min,   l: "Minutos" },
    { v: parts.sec,   l: "Segundos" },
  ];

  return (
    <div className="cd-grid">
      {items.map(({ v, l }) => (
        <div key={l} className="cd-item">
          <span className="cd-num">{v}</span>
          <span className="cd-label">{l}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function PageV2() {
  return (
    <>
      <style>{`

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Root ── */
        .v2-root {
          min-height: 100vh;
          background: #f7f5f0;
          font-family: var(--font-montserrat), sans-serif;
          color: #2d2d2d;
          overflow-x: hidden;
        }

        /* ── Decorative top band ── */
        .v2-top-band {
          height: 5px;
          background: linear-gradient(90deg, #a3b18a, #5b6b47, #a3b18a);
        }

        /* ══ HEADER ══════════════════════════════════ */
        .v2-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1.5rem 2rem;
          text-align: center;
        }

        .v2-envelope-wrap {
          position: relative;
          width: 140px;
          height: 100px;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 8px 20px rgba(91,107,71,0.2));
        }

        /* ══ MUSIC PLAYER ══════════════════════════════ */
        .player-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 2.5rem 0.5rem;
          border-top: 1px solid rgba(91,107,71,0.15);
          width: 100%;
          max-width: 360px;
        }
        .player-label {
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #5b6b47;
          font-weight: 500;
          font-family: var(--font-cinzel), serif;
        }
        .player-controls {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .player-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s, opacity 0.15s;
          color: #5b6b47;
        }
        .player-btn:hover { opacity: 0.7; transform: scale(1.1); }
        .player-btn--sm { width: 36px; height: 36px; }
        .player-btn--sm svg { width: 18px; height: 18px; fill: #5b6b47; }
        .player-btn--main {
          width: 52px; height: 52px; border-radius: 50%;
          background: #5b6b47;
          box-shadow: 0 4px 16px rgba(91,107,71,0.35);
        }
        .player-btn--main svg { width: 24px; height: 24px; fill: #fff; }
        .player-btn--main:hover { transform: scale(1.05); opacity: 1; }

        /* ══ MAIN INVITATION CARD ══════════════════════ */
        .v2-main-card {
          margin: 0 auto 2rem;
          max-width: 420px;
          width: calc(100% - 2.5rem);
          background: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.09);
          overflow: hidden;
          position: relative;
        }

        /* Hero photo in card */
        .v2-card-photo {
          width: 100%;
          height: 320px;
          object-fit: cover;
          object-position: center 20%;
          display: block;
        }

        /* Lace border card body */
        .v2-card-body {
          padding: 2rem 1.75rem 2.25rem;
          text-align: center;
          position: relative;
        }
        .v2-card-body::before {
          content: '';
          position: absolute;
          inset: 0.75rem;
          border: 1px dashed rgba(91,107,71,0.25);
          border-radius: 0.25rem;
          pointer-events: none;
        }

        .v2-pre {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7a8f61;
          font-weight: 500;
          margin-bottom: 0.85rem;
        }
        .v2-names {
          font-family: var(--font-pinyon), cursive;
          font-size: clamp(3.2rem, 11vw, 5rem);
          font-weight: 400;
          line-height: 1.0;
          color: #1e1e1e;
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
        }
        .v2-names em {
          font-style: normal;
          color: #5b6b47;
        }
        .v2-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin: 0 auto 1rem;
          width: 80%;
        }
        .v2-divider::before, .v2-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(91,107,71,0.4));
        }
        .v2-divider::after {
          background: linear-gradient(to left, transparent, rgba(91,107,71,0.4));
        }
        .v2-diamond { color: #5b6b47; font-size: 0.5rem; }
        .v2-date-place {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6a6a6a;
          line-height: 2;
          font-weight: 400;
        }

        /* ══ MONOGRAM ══════════════════════════════════ */
        .v2-monogram-wrap {
          display: flex;
          justify-content: center;
          margin: 0.5rem auto 1.5rem;
        }
        .v2-monogram {
          background: #5b6b47;
          border-radius: 999px;
          width: 80px; height: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          box-shadow: 0 8px 28px rgba(91,107,71,0.32);
          position: relative;
        }
        .v2-monogram::before {
          content: '';
          position: absolute;
          inset: 5px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .v2-monogram-letter {
          font-family: var(--font-cormorant), serif;
          font-size: 2rem;
          font-weight: 300;
          color: #fff;
          line-height: 1;
          letter-spacing: 0.04em;
        }

        /* ══ SECTION WRAPPER ══════════════════════════ */
        .v2-section {
          padding: 0 1.25rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ══ CARD ════════════════════════════════════ */
        .v2-card {
          background: #fff;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 420px;
          overflow: hidden;
        }
        .v2-card--olive { background: #5b6b47; }
        .v2-card--cream { background: #f0ede6; }

        .v2-card-pad { padding: 2rem 1.75rem; }

        /* ══ SECTION LABELS ═════════════════════════ */
        .v2-section-label {
          font-size: 0.52rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5b6b47;
          font-weight: 600;
          font-family: var(--font-cinzel), serif;
          text-align: center;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
        }
        .v2-section-label::before, .v2-section-label::after {
          content: '';
          width: 24px; height: 1px;
          background: rgba(91,107,71,0.4);
        }
        .v2-section-label--white { color: rgba(255,255,255,0.8); }
        .v2-section-label--white::before,
        .v2-section-label--white::after { background: rgba(255,255,255,0.3); }

        .v2-section-title {
          font-family: var(--font-cormorant), serif;
          font-size: 1.9rem;
          font-weight: 400;
          color: #1e1e1e;
          text-align: center;
          margin-bottom: 1.5rem;
          letter-spacing: 0.02em;
        }
        .v2-section-title--white { color: #fff; }

        /* ══ EVENT DETAILS ══════════════════════════ */
        .v2-seal-top {
          display: flex;
          justify-content: center;
          margin-top: -22px;
          margin-bottom: 1.5rem;
        }

        .v2-event-block { text-align: center; }
        .v2-event-name {
          font-family: var(--font-cormorant), serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #1e1e1e;
          margin: 0.2rem 0 0.1rem;
        }
        .v2-event-sub {
          font-size: 0.68rem;
          color: #7a7a7a;
          letter-spacing: 0.06em;
          margin-bottom: 0.15rem;
        }
        .v2-event-time {
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5b6b47;
          font-weight: 500;
          margin-bottom: 0.85rem;
        }
        .v2-loc-btn {
          display: inline-block;
          border: 1.5px solid #5b6b47;
          color: #5b6b47;
          background: transparent;
          border-radius: 0.3rem;
          padding: 0.5rem 1.5rem;
          font-family: var(--font-cinzel), serif;
          font-size: 0.56rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .v2-loc-btn:hover { background: #5b6b47; color: #fff; }

        .v2-event-divider {
          height: 1px;
          background: rgba(91,107,71,0.15);
          margin: 1.5rem 1.5rem;
        }

        /* ══ VENUE PHOTOS ═══════════════════════════ */
        .v2-venue-photo {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
          border-radius: 0.3rem;
          margin-bottom: 1rem;
        }

        /* ══ GIFTS ══════════════════════════════════ */
        .v2-gifts-icon { display: flex; justify-content: center; margin-bottom: 1rem; }
        .v2-gifts-text {
          font-size: 0.82rem;
          line-height: 1.85;
          text-align: center;
          color: rgba(255,255,255,0.88);
          font-weight: 300;
        }

        /* ══ DRESS CODE ═════════════════════════════ */
        .v2-dress-subtitle {
          font-family: var(--font-cormorant), serif;
          font-size: 2.8rem;
          font-weight: 300;
          color: #1e1e1e;
          text-align: center;
          line-height: 1;
          letter-spacing: 0.04em;
          margin-bottom: 0.75rem;
        }
        .v2-dress-body {
          font-size: 0.75rem;
          line-height: 1.8;
          color: #5a5a5a;
          text-align: center;
          margin-bottom: 1.25rem;
          font-weight: 300;
        }
        .v2-dress-note {
          font-size: 0.68rem;
          color: #5b6b47;
          font-style: italic;
          display: block;
          margin-top: 0.25rem;
        }
        .v2-swatches {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .v2-swatch-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .v2-swatch {
          width: 40px; height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.14);
        }
        .v2-swatch-name {
          font-size: 0.52rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7a7a7a;
        }

        /* ══ COUNTDOWN ══════════════════════════════ */
        .v2-cd-label {
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a7a7a;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .cd-grid {
          display: flex;
          gap: 0;
          justify-content: center;
        }
        .cd-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1rem;
          position: relative;
        }
        .cd-item + .cd-item::before {
          content: ':';
          position: absolute;
          left: -2px;
          top: 0.2rem;
          font-family: var(--font-cormorant), serif;
          font-size: 2.4rem;
          color: rgba(91,107,71,0.4);
          line-height: 1;
        }
        .cd-num {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(2.2rem, 8vw, 3rem);
          font-weight: 300;
          color: #1e1e1e;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .cd-label {
          font-size: 0.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5b6b47;
          margin-top: 0.35rem;
          font-weight: 500;
        }
        .v2-cd-sub {
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #7a7a7a;
          text-align: center;
          margin-top: 1.25rem;
        }

        /* ══ PHOTO GALLERY STRIP ════════════════════ */
        .v2-gallery {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          width: 100%;
          max-width: 420px;
        }
        .v2-gallery-img {
          width: 100%;
          height: 170px;
          object-fit: cover;
          border-radius: 0.35rem;
          display: block;
        }
        .v2-gallery-img--tall {
          height: 346px;
          grid-row: span 2;
        }

        /* ══ RSVP ═══════════════════════════════════ */
        .v2-rsvp-note {
          font-size: 0.75rem;
          line-height: 1.8;
          color: #5a5a5a;
          text-align: center;
          margin-bottom: 1.5rem;
          font-weight: 300;
        }
        .v2-rsvp-note strong { color: #5b6b47; font-weight: 500; }

        /* ══ CLOSING ════════════════════════════════ */
        .v2-closing {
          padding: 3rem 1.5rem 4rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .v2-closing-script {
          font-family: var(--font-pinyon), cursive;
          font-size: clamp(2.8rem, 10vw, 4rem);
          font-weight: 400;
          color: #1e1e1e;
          line-height: 1.1;
        }
        .v2-closing-body {
          font-size: 0.78rem;
          line-height: 1.9;
          color: #6a6a6a;
          max-width: 280px;
          font-weight: 300;
        }
        .v2-closing-names {
          font-family: var(--font-pinyon), cursive;
          font-size: 2.2rem;
          font-weight: 400;
          color: #5b6b47;
          letter-spacing: 0.04em;
          margin-top: 0.5rem;
        }

        /* ══ FOOTER ═════════════════════════════════ */
        .v2-footer {
          padding: 1rem 1.5rem 2.5rem;
          text-align: center;
          border-top: 1px solid rgba(91,107,71,0.12);
        }
        .v2-footer a {
          font-size: 0.52rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #aaa;
          text-decoration: none;
        }
        .v2-footer a:hover { color: #5b6b47; }

        /* ══ BOTTOM BAND ════════════════════════════ */
        .v2-bottom-band {
          height: 5px;
          background: linear-gradient(90deg, #a3b18a, #5b6b47, #a3b18a);
        }

        /* ── Fade-in animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2-fade { animation: fadeUp 0.7s ease both; }
        .v2-fade-1 { animation-delay: 0.1s; }
        .v2-fade-2 { animation-delay: 0.2s; }
        .v2-fade-3 { animation-delay: 0.3s; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f7f5f0; }
        ::-webkit-scrollbar-thumb { background: rgba(91,107,71,0.3); border-radius: 4px; }
      `}</style>

      <div className="v2-root">
        <div className="v2-top-band" />

        {/* ══ 1. HEADER: SOBRE + MÚSICA ══════════════════ */}
        <header className="v2-header v2-fade v2-fade-1">
          {/* Sobre real del proyecto */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/sobre.png"
            alt="Sobre de invitación"
            style={{
              width: 200,
              height: "auto",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.22))",
              marginBottom: "1rem",
            }}
          />

          {/* Reproductor */}
          <MusicPlayer />
        </header>

        {/* ══ 2. TARJETA PRINCIPAL ════════════════════════ */}
        <section className="v2-section v2-fade v2-fade-2">
          <div className="v2-main-card">
            {/* Foto hero de la pareja */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/carlayangel/foto-luces-abrazo.jpeg"
              alt="Carla y Ángel"
              className="v2-card-photo"
            />
            <div className="v2-card-body">
              <p className="v2-pre">Tenemos el honor de invitarte a la boda de</p>
              <h1 className="v2-names">
                Carla <em>&</em> Ángel
              </h1>
              <div className="v2-divider">
                <span className="v2-diamond">✦</span>
              </div>
              <p className="v2-date-place">
                Viernes · 27 de Noviembre · 2026<br />
                Chiapas, México
              </p>
            </div>
          </div>
        </section>

        {/* ══ 3. MONOGRAMA ═══════════════════════════════ */}
        <div className="v2-monogram-wrap v2-fade v2-fade-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/logo.jpeg"
            alt="Logo Carla & Ángel"
            style={{
              width: 110,
              height: 110,
              objectFit: "contain",
              borderRadius: "50%",
              boxShadow: "0 8px 28px rgba(91,107,71,0.25)",
              display: "block",
            }}
          />
        </div>

        {/* ══ 4. ITINERARIO ══════════════════════════════ */}
        <section className="v2-section">
          <div className="v2-card" style={{ overflow: "visible", background: "transparent", boxShadow: "none" }}>
            <div className="v2-card-pad" style={{ textAlign: "center", paddingBottom: 0 }}>
              <p className="v2-section-label">Programa del día</p>
            </div>
            <div style={{ position: "relative", maxWidth: "36rem", margin: "1.5rem auto 0", padding: "1rem" }}>
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#ebe6dc",
                  padding: "4rem 0.5rem",
                  boxShadow: "0 15px 50px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  borderRadius: "40% 60% 50% 50% / 45% 50% 50% 55%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/carlayangel/itinerario.png"
                  alt="Itinerario del día"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transform: "scale(1.15)",
                    mixBlendMode: "multiply",
                    filter: "grayscale(100%) contrast(150%) brightness(110%)",
                  }}
                  loading="lazy"
                />
              </div>
              {/* Sombra decorativa desfasada */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0.5rem",
                  right: "0.5rem",
                  width: "calc(100% - 3rem)",
                  height: "calc(100% - 3rem)",
                  backgroundColor: "rgba(212, 197, 185, 0.4)",
                  borderRadius: "40% 60% 50% 50% / 45% 50% 50% 55%",
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </section>

        {/* ══ 5. DETALLES DEL EVENTO ═════════════════════ */}
        <section className="v2-section">
          <div className="v2-card">
            <div className="v2-card-pad">
              {/* Ceremonia religiosa */}
              <div className="v2-event-block">
                <p className="v2-section-label">Ceremonia religiosa</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/carlayangel/iglesia.png"
                  alt="Iglesia San José Mirador"
                  className="v2-venue-photo"
                />
                <h2 className="v2-event-name">Iglesia San José Mirador</h2>
                <p className="v2-event-sub">Chiapas, México</p>
                <p className="v2-event-time">Hora: 16:00 hrs</p>
                <a
                  href="https://maps.google.com/?q=Iglesia+San+Jose+Mirador+Chiapas"
                  target="_blank" rel="noopener noreferrer"
                  className="v2-loc-btn"
                  aria-label="Ver Iglesia San José Mirador en Google Maps"
                >
                  Ubicación
                </a>
              </div>

              <div className="v2-event-divider" />

              {/* Recepción */}
              <div className="v2-event-block">
                <p className="v2-section-label">Ceremonia Civil & Recepción</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/carlayangel/salon.png"
                  alt="Salón Glück"
                  className="v2-venue-photo"
                />
                <h2 className="v2-event-name">Salón Glück</h2>
                <p className="v2-event-sub">Chiapas, México</p>
                <p className="v2-event-time">Hora: 18:00 hrs</p>
                <a
                  href="https://maps.google.com/?q=Salon+Gluck+Chiapas"
                  target="_blank" rel="noopener noreferrer"
                  className="v2-loc-btn"
                  aria-label="Ver Salón Glück en Google Maps"
                >
                  Ubicación
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 5. GALERÍA DE FOTOS ════════════════════════ */}
        <section className="v2-section" style={{ paddingBottom: "1rem" }}>
          <div className="v2-gallery">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/carlayangel/foto-calle-bw-beso-inclinado.jpeg"
              alt="Carla y Ángel" className="v2-gallery-img v2-gallery-img--tall" loading="lazy"/>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/carlayangel/foto-puente-estrella-beso.jpeg"
              alt="Carla y Ángel" className="v2-gallery-img" loading="lazy"/>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/carlayangel/foto-calle-bw-periodico.jpeg"
              alt="Carla y Ángel" className="v2-gallery-img" loading="lazy"/>
          </div>
        </section>

        {/* ══ 6. CUENTA REGRESIVA ════════════════════════ */}
        <section className="v2-section" style={{ paddingTop: "1rem" }}>
          <div className="v2-card">
            <div className="v2-card-pad" style={{ textAlign: "center" }}>
              <p className="v2-section-label">Cuenta regresiva</p>
              <div className="v2-cd-label" style={{ marginBottom: "0.25rem" }}>Faltan</div>
              <Countdown />
              <p className="v2-cd-sub">para nuestro gran día</p>
            </div>
          </div>
        </section>

        {/* ══ 7. DRESS CODE ══════════════════════════════ */}
        <section className="v2-section">
          <div className="v2-card">
            <div className="v2-card-pad" style={{ textAlign: "center" }}>
              <p className="v2-section-label">Código de vestimenta</p>
              <div className="v2-dress-subtitle">Formal</div>
              <p className="v2-dress-body">
                Caballeros con traje, damas con vestido largo.
                <em className="v2-dress-note">Color blanco reservado para la novia.</em>
              </p>
              <div className="v2-swatches">
                {[
                  { bg: "#5b6b47", name: "Verde oliva" },
                  { bg: "#c8b89a", name: "Beige" },
                  { bg: "#2a2a2a", name: "Negro" },
                  { bg: "#b8a9a0", name: "Malva" },
                  { bg: "#7a6a5a", name: "Café" },
                ].map(({ bg, name }) => (
                  <div key={name} className="v2-swatch-item">
                    <span className="v2-swatch" style={{ background: bg }} aria-label={name} />
                    <span className="v2-swatch-name">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 8. REGALOS ═════════════════════════════════ */}
        <section className="v2-section">
          <div className="v2-card v2-card--olive">
            <div className="v2-card-pad" style={{ textAlign: "center" }}>
              <div className="v2-gifts-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/carlayangel/logo.jpeg"
                  alt="Logo Carla & Ángel"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                />
              </div>
              <p className="v2-section-label v2-section-label--white">Regalos</p>
              <h2 className="v2-section-title v2-section-title--white" style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>
                Su presencia es el mejor regalo
              </h2>
              <p className="v2-gifts-text">
                Su compañía es lo más importante para nosotros.<br />
                Si desean hacernos un obsequio,<br />
                lo recibiremos con mucho cariño.
              </p>
            </div>
          </div>
        </section>

        {/* ══ 9. RSVP ════════════════════════════════════ */}
        <section className="v2-section">
          <div className="v2-card">
            <div className="v2-card-pad">
              <p className="v2-section-label">Confirmación de asistencia</p>
              <h2 className="v2-section-title">¿Nos acompañas?</h2>
              <p className="v2-rsvp-note">
                Solo necesitamos saber si estarás con nosotros.<br />
                Confirma antes del{" "}
                <strong>1 de noviembre de 2026</strong> — nos ayuda<br />
                a preparar cada detalle con cariño.
              </p>
              {/* Tally embed */}
              <iframe
                data-tally-src="https://tally.so/embed/1ADYGl?hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height={320}
                scrolling="no"
                style={{ display: "block", border: "none" }}
                title="RSVP — Boda Carla & Ángel"
                allow="clipboard-write"
              />
              <Script
                src="https://tally.so/widgets/embed.js"
                strategy="afterInteractive"
                onLoad={() => {
                  // @ts-ignore
                  if (typeof Tally !== "undefined") Tally.loadEmbeds();
                }}
              />
            </div>
          </div>
        </section>

        {/* ══ CIERRE ═════════════════════════════════════ */}
        <div className="v2-closing">
          <h2 className="v2-closing-script">¡Te esperamos!</h2>
          <p className="v2-closing-body">
            Hay días que se recuerdan para siempre.<br />
            Nos da mucho gusto que este sea<br />uno de los tuyos también.
          </p>
          <div className="v2-closing-names">Carla &amp; Ángel</div>
          {/* Small ornament */}
          <svg width="80" height="12" viewBox="0 0 80 12" fill="none" aria-hidden style={{ marginTop: "0.5rem" }}>
            <line x1="0" y1="6" x2="34" y2="6" stroke="rgba(91,107,71,0.3)" strokeWidth="1"/>
            <circle cx="40" cy="6" r="3" fill="rgba(91,107,71,0.45)"/>
            <line x1="46" y1="6" x2="80" y2="6" stroke="rgba(91,107,71,0.3)" strokeWidth="1"/>
          </svg>
        </div>

        {/* ══ FOOTER ══════════════════════════════════════ */}
        <footer className="v2-footer">
          <a href="https://invitacionesdigitalesmty.com.mx/" target="_blank" rel="noopener noreferrer">
            Hecho por invitacionesdigitalesmty.com.mx
          </a>
        </footer>

        <div className="v2-bottom-band" />
      </div>
    </>
  );
}
