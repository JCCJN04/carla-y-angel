import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recuerdos — Carla y Ángel",
};

export default function Recuerdos() {
  return (
    <>
      {/* ══ HEADER ════════════════════════════════════════════════════ */}
      <div className="recuerdos-hero">
        <p className="section-label">Momentos juntos</p>
        <h1
          className="hero-script"
          style={{ opacity: 1, fontSize: "clamp(4rem, 11vw, 8rem)", display: "block" }}
        >
          Recuerdos
        </h1>
        <p className="section-body" style={{ marginTop: "1.5rem" }}>
          Cada foto guarda un pedacito de lo que somos.
        </p>
        <div className="section-ornament" style={{ marginTop: "2rem" }} aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M8 1 L15 8 L8 15 L1 8 Z" />
          </svg>
        </div>
      </div>

      {/* ══ GALERÍA ═══════════════════════════════════════════════════ */}
      <section className="gallery-section" aria-label="Galería de recuerdos">

        {/* Row: 2 cols wide */}
        <div className="gallery-row gallery-row--a">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-puente-dia-teal-abrazo.jpeg"
            alt="Abrazo en el puente de día"
            className="gallery-img gallery-img--1"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-carlsjr-mesa-interior.jpeg"
            alt="Carla y Ángel en interior"
            className="gallery-img gallery-img--2"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Row: 3 cols */}
        <div className="gallery-row gallery-row--b">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-carlsjr-color-tomados.jpeg"
            alt="Carla y Ángel tomados de la mano"
            className="gallery-img gallery-img--3"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-carlsjr-escalones-noche.jpeg"
            alt="Escalones de noche"
            className="gallery-img gallery-img--4"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-carlsjr-rooftop-beso.jpeg"
            alt="Beso en el rooftop"
            className="gallery-img gallery-img--5"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Row: 2 cols equal */}
        <div className="gallery-row gallery-row--d">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-escalera-roja.jpeg"
            alt="Escalera roja"
            className="gallery-img gallery-img--6"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-puente-noche-teal-beso.jpeg"
            alt="Beso en el puente de noche"
            className="gallery-img gallery-img--7"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Row: 3 cols */}
        <div className="gallery-row gallery-row--b">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-neon-chevron-bailando.jpeg"
            alt="Bailando bajo luces de neón"
            className="gallery-img gallery-img--8"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-jack-neon-bailando.jpeg"
            alt="Bailando con luces Jack"
            className="gallery-img gallery-img--9"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-carlsjr-bw-caminando.jpeg"
            alt="Caminando en blanco y negro"
            className="gallery-img gallery-img--10"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Row: 2 cols reverse proportions */}
        <div className="gallery-row gallery-row--c">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-carlsjr-eat-like-you.jpeg"
            alt="Eat Like You"
            className="gallery-img gallery-img--11"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-carlsjr-bw-tomados.jpeg"
            alt="Tomados en blanco y negro"
            className="gallery-img gallery-img--12"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Row: 2 cols equal */}
        <div className="gallery-row gallery-row--d">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-puente-beso-teal.jpeg"
            alt="Beso en el puente teal"
            className="gallery-img gallery-img--16"
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carlayangel/foto-calle-bw-noche-caminando.jpeg"
            alt="Caminando de noche en blanco y negro"
            className="gallery-img gallery-img--17"
            loading="lazy"
            decoding="async"
          />
        </div>

      </section>

      {/* ══ BACK LINK ═════════════════════════════════════════════════ */}
      <div style={{ textAlign: "center", padding: "4rem 1.5rem 6rem" }}>
        <Link
          href="/carlayangel"
          className="venue-link"
          style={{ display: "inline-flex" }}
        >
          ← Volver a la invitación
        </Link>
      </div>
    </>
  );
}
