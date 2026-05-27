"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMusic } from "./MusicProvider";

const navLinks = [
  { href: "/about",   section: "about",   label: "Work"    },
  { href: "/fits",    section: "fits",    label: "Style"   },
  { href: "/beyond",  section: "beyond",  label: "Stack"   },
  { href: "/agency",  section: "agency",  label: "Agency"  },
  { href: "/contact", section: "contact", label: "Contact" },
];

const SECTION_PATHS = ["/", "/about", "/fits", "/beyond", "/agency", "/contact", "/testimonials"];

function PrevIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="19,20 9,12 19,4" />
      <rect x="5" y="4" width="3" height="16" rx="0.5" />
    </svg>
  );
}
function NextIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,4 15,12 5,20" />
      <rect x="16" y="4" width="3" height="16" rx="0.5" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function MusicPill() {
  const { playing, blocked, trackTitle, toggle, next, prev } = useMusic();

  return (
    <div
      className={`hidden md:flex items-center gap-0 border rounded-full h-9 overflow-hidden transition-colors duration-300 ${
        playing ? "border-warm-gold/60 bg-deep-navy/5" : "border-on-surface-variant/20 bg-transparent"
      }`}
    >
      {/* Prev */}
      <button
        onClick={prev}
        className="flex items-center justify-center w-8 h-full text-on-surface-variant hover:text-warm-gold transition-colors duration-200 px-2"
        aria-label="Previous track"
      >
        <PrevIcon />
      </button>

      {/* Play / Pause */}
      <button
        onClick={toggle}
        className={`flex items-center justify-center w-8 h-full transition-colors duration-200 ${
          playing ? "text-warm-gold" : blocked ? "text-dark-cherry" : "text-on-surface-variant hover:text-deep-navy"
        }`}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Song name */}
      <div className="flex items-center gap-1.5 px-3 border-l border-warm-gold/20 h-full">
        {/* Animated equaliser bars when playing */}
        {playing && (
          <span className="flex items-end gap-[2px] h-3">
            {[1, 2, 3].map((b) => (
              <span
                key={b}
                className="w-[2px] bg-warm-gold rounded-full"
                style={{
                  height: `${b * 4}px`,
                  animation: `eq-bar ${0.4 + b * 0.15}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </span>
        )}
        <span
          className={`text-[10px] tracking-[0.15em] uppercase font-bold transition-colors duration-300 ${
            playing ? "text-deep-navy" : "text-on-surface-variant/60"
          }`}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {trackTitle}
        </span>
      </div>

      {/* Next */}
      <button
        onClick={next}
        className="flex items-center justify-center w-8 h-full text-on-surface-variant hover:text-warm-gold transition-colors duration-200 px-2"
        aria-label="Next track"
      >
        <NextIcon />
      </button>
    </div>
  );
}

export default function Header({ floating = false }: { floating?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHome = SECTION_PATHS.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = navLinks.map(l => l.section);
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isHome]);

  return (
    <>
      <style>{`
        @keyframes eq-bar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.4); }
        }
      `}</style>

      {/* ── Desktop header ── */}
      <header
        className={
          floating
            ? `hidden md:block fixed z-50 transition-all duration-500 bg-paper-white/92 backdrop-blur-md border border-warm-gold/25 shadow-sm`
            : `hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled ? "bg-paper-white/95 backdrop-blur-md shadow-sm" : "bg-paper-white/90 backdrop-blur-md"
              } border-b border-warm-gold/20`
        }
        style={
          floating
            ? { top: "15px", left: "50%", transform: "translateX(-50%)", width: "min(1100px, calc(100vw - 48px))", borderRadius: "16px" }
            : undefined
        }
      >
        <nav className={`flex justify-between items-center w-full px-margin-desktop ${floating ? "py-3" : "py-5"}`}>
          <div className="flex items-center gap-8">
            {navLinks.map(({ href, section, label }) => {
              const isActive = isHome && activeSection === section;
              return (
                <Link key={href} href={href}
                  className="relative tracking-[0.2em] uppercase text-[12px] font-bold text-on-surface-variant hover:text-deep-navy transition-colors duration-300 flex flex-col items-center gap-1"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {label}
                  <span style={{ display: "block", height: 2, width: isActive ? "100%" : 0, background: "#A8264A", borderRadius: 1, transition: "width 0.3s ease" }} />
                </Link>
              );
            })}
          </div>
          <MusicPill />
        </nav>
      </header>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-paper-white/95 backdrop-blur-md border-t border-warm-gold/25 flex justify-around items-center py-3 px-2">
        {navLinks.map(({ href, section, label }) => {
          const isActive = isHome && activeSection === section;
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1">
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: isActive ? "#A8264A" : "rgba(17,24,40,0.45)", transition: "color 0.3s" }}>
                {label.toUpperCase()}
              </span>
              <span style={{ width: isActive ? 16 : 0, height: 2, background: "#A8264A", borderRadius: 1, transition: "width 0.3s ease" }} />
            </Link>
          );
        })}
      </nav>
    </>
  );
}

