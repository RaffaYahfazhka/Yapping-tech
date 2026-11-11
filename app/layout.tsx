import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  DM_Serif_Display,
  Outfit,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Atelier Showcase — Luxury Landing Page Templates",
  description:
    "Tiga landing page premium untuk bisnis lokal: artisanal F&B, luxury florist, dan bespoke catering. Jelajahi design language yang berbeda dalam satu showcase.",
  openGraph: {
    title: "Atelier Showcase — Luxury Landing Page Templates",
    description:
      "Tiga design language, satu showcase. Artisanal F&B, luxury florist, dan bespoke catering.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F2EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${cormorant.variable} ${dmSerif.variable} ${jakarta.variable} ${outfit.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="font-jakarta">{children}</body>
    </html>
  );
}
