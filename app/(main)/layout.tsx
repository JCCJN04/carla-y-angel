import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boda Carla & Ángel — Invitación",
  description: "Te invitamos a celebrar la boda de Carla y Ángel el 27 de noviembre de 2026 en Chiapas, México.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* Fondo verde — position fixed para cubrir viewport sin afectar el scroll */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/carlayangel/fondo-verde.svg"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
      {/* Velo suave verde */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(242, 248, 240, 0.52)",
          zIndex: 6,
          pointerEvents: "none",
        }}
      />

      {/* Contenido — flujo normal de documento para scroll nativo en todos los browsers */}
      <div style={{ position: "relative", zIndex: 7 }}>
        {children}
      </div>
    </div>
  );
}
