import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boda Carla & Ángel — Invitación",
  description: "Te invitamos a celebrar la boda de Carla y Ángel el 27 de noviembre de 2026 en Chiapas, México.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#f9f8f6",
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 5,
      }}
    >
      <div style={{ minHeight: "100%", background: "#f9f8f6" }}>
        {children}
      </div>
    </div>
  );
}
