"use client";

import { useState, useEffect } from "react";

export default function HamburgerMenu() {
  const [navOpen, setNavOpen] = useState(false);
  const [recuerdosOpen, setRecuerdosOpen] = useState(false);

  useEffect(() => {
    const lock = navOpen || recuerdosOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen, recuerdosOpen]);

  useEffect(() => {
    function handler() { setNavOpen(false); setRecuerdosOpen(true); }
    window.addEventListener("open-recuerdos", handler);
    return () => window.removeEventListener("open-recuerdos", handler);
  }, []);

  function openRecuerdos() {
    setNavOpen(false);
    setTimeout(() => setRecuerdosOpen(true), 200);
  }

  return (
    <>
      {/* ── Hamburger button ── */}
      <button
        className="hamburger-btn"
        onClick={() => setNavOpen((v) => !v)}
        aria-label={navOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={navOpen}
      >
        <span className={`hamburger-line ${navOpen ? "hamburger-line--open-1" : ""}`} />
        <span className={`hamburger-line hamburger-line--mid ${navOpen ? "hamburger-line--open-2" : ""}`} />
        <span className={`hamburger-line ${navOpen ? "hamburger-line--open-3" : ""}`} />
      </button>

      {/* ── Nav overlay ── */}
      <div
        className={`nav-overlay ${navOpen ? "nav-overlay--open" : ""}`}
        aria-hidden={!navOpen}
        onClick={() => setNavOpen(false)}
      >
        <nav
          className="nav-panel"
          onClick={(e) => e.stopPropagation()}
          aria-label="Navegación principal"
        >
          <div className="nav-header">
            <span className="nav-script">Carla &amp; Ángel</span>
            <span className="nav-date">27 · XI · 2026</span>
          </div>

          <ul className="nav-links" role="list">
            <li>
              <button className="nav-link nav-link--btn" onClick={openRecuerdos}>
                <span className="nav-link-label">Recuerdos</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* ── Recuerdos panel ── */}
      <div
        className={`recuerdos-panel ${recuerdosOpen ? "recuerdos-panel--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Recuerdos"
        aria-hidden={!recuerdosOpen}
      >
        {/* Close button */}
        <button
          className="recuerdos-close"
          onClick={() => setRecuerdosOpen(false)}
          aria-label="Cerrar recuerdos"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </button>

        <div className="recuerdos-scroll">
          {/* Header */}
          <div className="recuerdos-hero">
            <p className="section-label">Momentos juntos</p>
            <span
              className="hero-script"
              style={{ opacity: 1, fontSize: "clamp(3.5rem, 10vw, 7rem)", display: "block", marginBottom: "1rem" }}
            >
              Recuerdos
            </span>
            <p className="section-body">Cada foto guarda un pedacito de lo que somos.</p>
            <div className="section-ornament" style={{ marginTop: "2rem" }} aria-hidden="true">
              <svg viewBox="0 0 16 16"><path d="M8 1 L15 8 L8 15 L1 8 Z" /></svg>
            </div>
          </div>

          {/* Gallery */}
          <section className="gallery-section" aria-label="Galería de recuerdos" style={{ paddingTop: 0 }}>

            <div className="gallery-row gallery-row--b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-puente-dia-teal-abrazo.jpeg" alt="Abrazo en el puente de día" className="gallery-img gallery-img--3" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-carlsjr-mesa-interior.jpeg" alt="Carla y Ángel en interior" className="gallery-img gallery-img--4" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-puente-estrella-caminando.jpeg" alt="Caminando juntos en el puente" className="gallery-img gallery-img--5" loading="lazy" decoding="async" />
            </div>

            <div className="gallery-row gallery-row--b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-carlsjr-color-tomados.jpeg" alt="Tomados de la mano" className="gallery-img gallery-img--3" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-carlsjr-escalones-noche.jpeg" alt="Escalones de noche" className="gallery-img gallery-img--4" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-carlsjr-rooftop-beso.jpeg" alt="Beso en el rooftop" className="gallery-img gallery-img--5" loading="lazy" decoding="async" />
            </div>

            <div className="gallery-row gallery-row--d">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-escalera-roja.jpeg" alt="Escalera roja" className="gallery-img gallery-img--6" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-puente-noche-teal-beso.jpeg" alt="Beso en el puente de noche" className="gallery-img gallery-img--7" loading="lazy" decoding="async" />
            </div>

            <div className="gallery-row gallery-row--b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-neon-chevron-bailando.jpeg" alt="Bailando bajo luces de neón" className="gallery-img gallery-img--8" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-jack-neon-bailando.jpeg" alt="Bailando con luces Jack" className="gallery-img gallery-img--9" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-carlsjr-bw-caminando.jpeg" alt="Caminando en blanco y negro" className="gallery-img gallery-img--10" loading="lazy" decoding="async" />
            </div>

            <div className="gallery-row gallery-row--c">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-carlsjr-eat-like-you.jpeg" alt="Eat Like You" className="gallery-img gallery-img--11" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-carlsjr-bw-tomados.jpeg" alt="Tomados en blanco y negro" className="gallery-img gallery-img--12" loading="lazy" decoding="async" />
            </div>

            <div className="gallery-row gallery-row--d">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-puente-beso-teal.jpeg" alt="Beso en el puente teal" className="gallery-img gallery-img--16" loading="lazy" decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carlayangel/foto-calle-bw-noche-caminando.jpeg" alt="Caminando de noche en blanco y negro" className="gallery-img gallery-img--17" loading="lazy" decoding="async" />
            </div>

          </section>

          {/* Footer ornament */}
          <div style={{ textAlign: "center", padding: "3rem 1.5rem 5rem" }}>
            <div className="closing-divider" style={{ maxWidth: 320, margin: "0 auto" }}>
              <svg viewBox="0 0 16 16"><path d="M8 1 L15 8 L8 15 L1 8 Z" /></svg>
            </div>
            <span className="closing-names-script" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "var(--text-dark)" }}>
              Carla &amp; Ángel
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
