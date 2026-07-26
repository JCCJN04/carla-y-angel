"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import GSAPAnimations from "@/components/GSAPAnimations";
import WeatherSection from "@/components/WeatherSection";

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
          <div className="cd-divline" />
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
  const [showIntro, setShowIntro] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (showIntro) {
      document.documentElement.classList.add("intro-open");
    } else {
      document.documentElement.classList.remove("intro-open");
    }
    return () => { document.documentElement.classList.remove("intro-open"); };
  }, [showIntro]);

  const handleOpen = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => setShowIntro(false), 950);
  };

  return (
    <>

      {/* ══ ENVELOPE INTRO ══════════════════════════════ */}
      {showIntro && (
        <div
          className={`env-screen${isExiting ? " env-screen--exit" : ""}`}
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div aria-hidden="true" className="env-bg" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/carlayangel/fondo.svg" alt="" loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="env-bg-veil" style={{ position: "absolute", inset: 0, background: "rgba(250, 244, 235, .52)" }} />
          </div>
          <div className="env-content" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "2rem 1.5rem", textAlign: "center" }}>
            <div className="env-title" style={{ color: "inherit" }}>
              <h1 className="env-names" style={{ fontFamily: "var(--font-pinyon), cursive", fontSize: "clamp(3.4rem, 9.5vw, 6.5rem)", color: "#28211C", lineHeight: 1, fontWeight: 400 }}>
                Carla <span className="env-amp" style={{ color: "#8B6248" }}>&amp;</span> Ángel
              </h1>
            </div>
            <div className="env-img-wrap" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              {/* Resplandor suave — igual que v1 */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-1rem",
                  backgroundColor: "rgba(210, 160, 160, 0.3)",
                  borderRadius: "2rem",
                  filter: "blur(35px)",
                  transform: "scale(1.15)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              {/* Sombra base inferior */}
              <div
                style={{
                  position: "absolute",
                  left: "3rem",
                  right: "3rem",
                  bottom: "-0.5rem",
                  height: "2.5rem",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  filter: "blur(20px)",
                  borderRadius: "50%",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/carlayangel/sobre%20(1).png"
                alt="Sobre de invitación"
                className={`env-img${isExiting ? " env-img--exit" : ""}`}
                onClick={handleOpen}
                onKeyDown={(e) => e.key === "Enter" && handleOpen()}
                role="button"
                tabIndex={0}
                style={{
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.45))",
                  position: "relative",
                  zIndex: 10,
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
            <div className="env-hint" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p className="env-instruction" style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "clamp(.88rem, 1.9vw, 1.05rem)", color: "#4E4540", letterSpacing: ".04em", lineHeight: 1.55, transform: "rotate(-9deg)" }}>
                Toca el sobre para<br />abrir tu invitación
              </p>
            </div>
          </div>
        </div>
      )}

      {!showIntro && <div className="v2-root">
        <GSAPAnimations />
        <div className="v2-top-band" />

        {/* ══ 1. HEADER: SOBRE + MÚSICA ══════════════════ */}
        <header className="v2-header v2-fade v2-fade-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/sobre2.png"
            alt="Sobre de invitación"
            style={{
              width: 200,
              height: "auto",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.22))",
              marginBottom: "1rem",
            }}
          />
          <MusicPlayer />
        </header>

        {/* ══ 2. HERO: NOMBRES + FOTO ARCO ═══════════════ */}
        <section className="v2-section v2-fade v2-fade-2" style={{ paddingBottom: "0.5rem" }}>
          {/* Nombres arriba */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <p className="v2-pre">Tenemos el honor de invitarte a la boda de</p>
            <h1 className="v2-names">
              Carla <em>&</em> Ángel
            </h1>
            <div className="v2-divider">
              <span className="v2-diamond">✦</span>
            </div>
            <p className="v2-date-place">
              Viernes · 27 de Noviembre · 2026
            </p>
          </div>

          {/* Foto arco sin fondo blanco */}
          <div style={{ position: "relative", width: "100%", maxWidth: "340px", padding: "0 1rem" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-0.5rem 0.5rem",
                border: "1px solid rgba(74,74,56,0.3)",
                borderRadius: "10rem 10rem 1rem 1rem",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/carlayangel/foto-calle-bw-noche-caminando.jpeg"
              alt="Carla y Ángel"
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "4/5",
                objectFit: "cover",
                borderRadius: "10rem 10rem 1rem 1rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                display: "block",
                position: "relative",
                zIndex: 1,
              }}
            />
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
              boxShadow: "0 8px 28px rgba(74,74,56,0.25)",
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
            <div style={{ position: "relative", maxWidth: "320px", margin: "1.5rem auto 0" }}>
              {/* drop-shadow en wrapper — clip-path recorta box-shadow si va en el mismo elemento */}
              <div style={{ filter: "drop-shadow(0 15px 50px rgba(0,0,0,0.15))" }}>
                <div
                  style={{
                    position: "relative",
                    backgroundColor: "#ebe6dc",
                    /* Sin padding: imagen llena el oval directamente */
                    clipPath: "ellipse(49% 50% at 50% 50%)",
                    WebkitClipPath: "ellipse(49% 50% at 50% 50%)",
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
                      mixBlendMode: "multiply",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
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
                <p className="v2-event-time">Hora: 4:00 pm</p>
                <a
                  href="https://maps.google.com/?q=Iglesia+San+Jose+Mirador+Chiapas"
                  target="_blank" rel="noopener noreferrer"
                  className="v2-loc-btn"
                  aria-label="Ver Iglesia San José Mirador en Google Maps"
                >
                  Ver Ubicación
                </a>
              </div>

              <div className="v2-event-divider" />

              {/* Ceremonia Civil */}
              <div className="v2-event-block">
                <p className="v2-section-label">Ceremonia Civil</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/carlayangel/salon.png"
                  alt="Salón Gluck"
                  className="v2-venue-photo"
                />
                <h2 className="v2-event-name">Salón Gluck</h2>
                <p className="v2-event-sub">Tuxtla Gutiérrez, Chiapas</p>
                <p className="v2-event-time">Hora: 7:00 pm</p>
                <a
                  href="https://maps.google.com/?q=Salon+Gluck+Chiapas"
                  target="_blank" rel="noopener noreferrer"
                  className="v2-loc-btn"
                  aria-label="Ver Salón Gluck en Google Maps"
                >
                  Ver Ubicación
                </a>
              </div>

            </div>
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/codigo-vestimenta.jpeg"
            alt="Código de vestimenta - Formal"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "1rem",
            }}
            loading="lazy"
          />
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
              {/* Liverpool logo */}
              <a
                href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51455376"
                target="_blank"
                rel="noopener noreferrer"
                className="v2-liverpool-wrap"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/carlayangel/liverpool-logo.png"
                  alt="Liverpool"
                  style={{ width: 90, height: "auto", objectFit: "contain", display: "block", filter: "brightness(0) invert(1)", transition: "opacity 0.2s" }}
                />
                <span className="v2-liverpool-caption">Ver mesa de regalos</span>
              </a>
            </div>
          </div>
        </section>

        {/* ══ 9. RSVP ════════════════════════════════════ */}
        <section className="v2-section">
          <div className="v2-card" style={{ overflow: "visible" }}>
            <div className="v2-card-pad">
              <p className="v2-section-label">Confirmación de asistencia</p>
              <h2 className="v2-section-title">¿Nos acompañas?</h2>
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
          <svg width="80" height="12" viewBox="0 0 80 12" fill="none" aria-hidden style={{ marginTop: "0.5rem" }}>
            <line x1="0" y1="6" x2="34" y2="6" stroke="rgba(74,74,56,0.3)" strokeWidth="1"/>
            <circle cx="40" cy="6" r="3" fill="rgba(74,74,56,0.45)"/>
            <line x1="46" y1="6" x2="80" y2="6" stroke="rgba(74,74,56,0.3)" strokeWidth="1"/>
          </svg>
        </div>

        {/* ══ GALERÍA DE FOTOS (PAREJA) ══════════════════ */}
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

        {/* ══ CLIMA ══════════════════════════════════════ */}
        <WeatherSection />

        {/* ══ UBICACIÓN ══════════════════════════════════ */}
        <section className="v2-section">
          <div className="v2-card">
            <div className="v2-card-pad" style={{ textAlign: "center" }}>
              <p className="v2-section-label">Ubicación</p>
              <p className="v2-date-place" style={{ marginTop: "0.5rem" }}>
                Tuxtla Gutiérrez, Chiapas
              </p>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════ */}
        <footer className="v2-footer">
          <a href="https://invitacionesdigitalesmty.com.mx/" target="_blank" rel="noopener noreferrer">
            Hecho por invitacionesdigitalesmty.com.mx
          </a>
        </footer>

        <div className="v2-bottom-band" />
      </div>}
    </>
  );
}
