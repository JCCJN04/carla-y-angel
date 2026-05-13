import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Montserrat } from "next/font/google";
import BackgroundImage from "@/components/BackgroundImage";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boda Carla y Angel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${montserrat.variable}`}
      >
        <BackgroundImage />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
