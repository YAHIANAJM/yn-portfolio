"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const heroPanels = [
  { src: "/outfits/outfit-8.jpg",       phone: "/outfits/phone/outfit-8.jpg",   alt: "Outfit look 1" },
  { src: "/outfits/outfit-4.jpg",       phone: "/outfits/phone/outfit-4.jpg",   alt: "Outfit look 2" },
  { src: "/outfits/outfit-17.jpg",      phone: "/outfits/phone/outfit-17.jpg",  alt: "Outfit look 3" },
  { src: "/outfits/outfit-5.jpg",       phone: "/outfits/phone/outfit-5.jpg",   alt: "Outfit look 4" },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-start md:items-center justify-center bg-vintage-cream relative overflow-hidden">

      {/* ── Mobile: stacked vertically ── */}
      <div className="md:hidden absolute top-[16px] bottom-[70px] left-[12px] right-[12px] flex flex-col overflow-hidden rounded-2xl">
        {heroPanels.map((panel, i) => (
          <div key={i} className="relative flex-1">
            <Image
              src={panel.phone}
              alt={panel.alt}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            {i < heroPanels.length - 1 && (
              <div className="absolute left-0 right-0 bottom-0 h-px bg-cherry-glow/60 z-10" />
            )}
          </div>
        ))}
        {/* Mobile overlays */}
        <div className="absolute inset-0 bg-deep-navy/40 rounded-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-transparent to-transparent rounded-2xl pointer-events-none" />
      </div>

      {/* ── Desktop: side by side ── */}
      <div className="hidden md:flex absolute top-[120px] bottom-[40px] left-[120px] right-[120px] overflow-hidden rounded-2xl">
        {heroPanels.map((panel, i) => (
          <div key={i} className="relative overflow-hidden flex-1">
            <Image
              src={panel.src}
              alt={panel.alt}
              fill
              className="object-cover object-top"
              priority={i < 2}
              sizes="25vw"
              style={i === 3 ? { objectPosition: "80% top" } : undefined}
            />
            {i < heroPanels.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-cherry-glow/60 z-10" />
            )}
          </div>
        ))}
      </div>

      {/* Desktop overlays */}
      <div className="hidden md:block absolute top-[120px] bottom-[40px] left-[120px] right-[120px] bg-deep-navy/40 z-10 rounded-2xl" />
      <div className="hidden md:block absolute top-[120px] bottom-[40px] left-[120px] right-[120px] bg-gradient-to-t from-deep-navy/90 via-transparent to-transparent z-10 rounded-2xl" />

      {/* Content */}
      <ScrollReveal className="relative z-20 w-full px-6 md:px-margin-desktop flex flex-col md:flex-row items-end justify-between pt-52 md:pt-0">
        <div className="mb-8 md:mb-0 text-center md:text-left md:-ml-8" style={{ transform: "translateY(-40px)" }}>
          <h1
            className="text-[58px] sm:text-[72px] md:text-[120px] leading-none tracking-[-0.02em] uppercase"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            <span style={{ color: "#A8264A" }}>YA</span><span className="text-paper-white">HIA NAJM</span>
          </h1>
          <p className="text-[20px] md:text-[28px] leading-[1.4] text-warm-gold mt-3 italic" style={{ fontFamily: "var(--font-garamond)" }}>
            Learning fast. Dressing well.
          </p>
        </div>
        {/* Desktop right-side info */}
        <div className="hidden md:flex flex-col items-end gap-2 text-paper-white/90 tracking-[0.15em] uppercase text-[16px] font-bold"
          style={{ fontFamily: "var(--font-dm-sans)", transform: "translateY(-100px)" }}>
          <span>CASABLANCA, MORO<span style={{ color: "#A8264A" }}>CCO</span></span>
          <span>22 YEARS OLD</span>
          <span className="text-warm-gold">BUILDER · DRESSER · DREAMER</span>
        </div>
      </ScrollReveal>

      {/* Mobile bottom-left info */}
      <div className="md:hidden absolute z-30 flex flex-col items-start gap-1 px-6" style={{ top: "58vh", left: 0 }}>
        <span className="text-paper-white/90 tracking-[0.15em] uppercase text-[13px] font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>
          CASABLANCA, MORO<span style={{ color: "#A8264A" }}>CCO</span>
        </span>
        <span className="text-paper-white/90 tracking-[0.15em] uppercase text-[13px] font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>
          22 YEARS OLD
        </span>
        <span className="text-warm-gold tracking-[0.15em] uppercase text-[13px] font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>
          BUILDER · DRESSER · DREAMER
        </span>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
        <span
          className="text-paper-white/40 tracking-[0.2em] uppercase text-[9px]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          SCROLL
        </span>
        <div className="w-px h-6 bg-warm-gold/40" />
      </div>
    </section>
  );
}
