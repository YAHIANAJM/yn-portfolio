import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
import { Bebas_Neue, DM_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { MusicProvider } from "@/components/MusicProvider";
import FigureCorner from "@/components/FigureCorner";
import MobileIdleManager from "@/components/MobileIdleManager";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YAHIA NAJM | Personal Portfolio",
  description:
    "Yahia Najm — 22-year-old developer, fashion curator, and founder of Tec Hermanos. Based in Casablanca, Morocco.",
  openGraph: {
    title: "YAHIA NAJM | Personal Portfolio",
    description: "Learning fast. Dressing well.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${bebasNeue.variable} ${dmSans.variable} ${ebGaramond.variable}`}
    >
      {/* Material Symbols for icons (Google hosted) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        precedence="default"
      />
      <body className="antialiased overflow-x-hidden">
        <MobileIdleManager />
        {/* Fixed logo — top left, always visible */}
        <div data-mobile-ui className="mobile-logo" style={{ position: "fixed", top: "12px", left: "10px", zIndex: 60, width: 100, height: 100, borderRadius: "50%", background: "rgba(250,248,245,0.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,169,126,0.25)", boxShadow: "0 2px 12px rgba(17,24,40,0.08)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <Image src="/Simple Monoline Interior Designer Initials Logo-Photoroom.png" alt="YN Logo" width={90} height={90} style={{ objectFit: "contain" }} priority />
        </div>
        {/* Download CV — top right, mobile only */}
        <a href="/cv-yahia-najm.pdf" download data-mobile-ui className="dl-cv-mobile">
          <svg viewBox="0 0 24 24" style={{ width: 10, height: 10, fill: "currentColor" }}><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z"/></svg>
          DOWNLOAD CV
        </a>
        <FigureCorner />
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
