"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";

/* ── Info label ── */
function InfoLabel({ tag, value, align = "left" }: { tag: string; value: string; align?: "left" | "right" }) {
  return (
    <div className={`flex flex-col gap-0.5 ${align === "right" ? "items-end" : "items-start"}`}>
      <span
        className="text-deep-navy/50 tracking-[0.22em] uppercase text-[10px] font-bold"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {tag}
      </span>
      <span
        className="text-deep-navy tracking-[0.08em] uppercase text-[22px] md:text-[28px]"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        {value}
      </span>
    </div>
  );
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function FullPotentialPage() {
  const [faded, setFaded] = useState(false);
  const [slide, setSlide] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const SLIDE_COUNT = 5;
  const goTo = (i: number) => { setSlideDir(i > slide ? 1 : -1); setSlide(i); };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setFaded(true), 4000);
    return () => clearTimeout(t);
  }, []);


  return (
    <div
      className="bg-vintage-cream w-screen h-screen overflow-hidden flex flex-col fp-root"
      style={{ cursor: "none" }}
    >
      <style>{`.fp-root * { cursor: none !important; }`}</style>
      <CustomCursor />
      <Header floating />

      <div className="relative flex-1 overflow-hidden">

        {/* ── Navy backdrop — shifted 150px right of center ── */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1, x: faded ? -500 : 0 }}
          transition={faded ? { duration: 1.4, ease } : { duration: 1.3, ease, delay: 0.1 }}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            zIndex: 5,
            originY: 0,
            left: isMobile ? "50%" : "calc(50% + 80px)",
            transform: "translateX(-50%)",
            width: isMobile ? "100%" : "clamp(280px, 36vw, 520px)",
            background: "#111828",
          }}
        />

        {/* ── Cherry static rings — right half only, centered on navy box ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 6, display: isMobile ? "none" : undefined, clipPath: "polygon(calc(50% + 80px) 0, 100% 0, 100% 100%, calc(50% + 80px) 100%)" }}
        >
          {[
            { size: 600,  opacity: 0.42 },
            { size: 780,  opacity: 0.32 },
            { size: 960,  opacity: 0.24 },
            { size: 1140, opacity: 0.17 },
            { size: 1320, opacity: 0.11 },
            { size: 1500, opacity: 0.06 },
          ].map(({ size, opacity }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.15 }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width:  size,
                height: size,
                top: "50%",
                left: "calc(50% + 80px)",
                transform: "translate(-50%, -50%)",
                border: `1px solid rgba(168, 38, 74, ${opacity})`,
              }}
            />
          ))}
        </div>

        {/* ── Cherry accent line left ── */}
        <motion.div
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.5 }}
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-cherry-glow/50 pointer-events-none"
          style={{ zIndex: 15, originY: 0 }}
        />
        {/* ── Cherry accent line right ── */}
        <motion.div
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.5 }}
          className="absolute right-0 top-0 bottom-0 w-0.5 bg-cherry-glow/50 pointer-events-none"
          style={{ zIndex: 15, originY: 0 }}
        />

        {/* ── Cream corner blocks — top left / bottom right ── */}
        <div className="absolute top-0 left-0 w-[28vw] h-[30vh] pointer-events-none" style={{ zIndex: 4, background: "linear-gradient(135deg, #F2EDE4 40%, transparent 100%)" }} />
        <div className="absolute bottom-0 right-0 w-[28vw] h-[30vh] pointer-events-none" style={{ zIndex: 4, background: "linear-gradient(315deg, #F2EDE4 40%, transparent 100%)" }} />

        {/* ── Cherry top stripe ── */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.4 }}
          className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{ zIndex: 16, originX: 0, background: "linear-gradient(90deg, #A8264A, #5C1A2E 60%, transparent)" }}
        />

        {/* ── Portrait ── */}
        {/* Static wrapper handles positioning so framer-motion transform doesn't override centering */}
        <div
          className="absolute"
          style={{
            zIndex: 20,
            width: isMobile ? "clamp(260px, 80vw, 340px)" : "clamp(260px, 33vw, 490px)",
            height: isMobile ? "clamp(380px, 70vh, 520px)" : "clamp(400px, 80vh, 740px)",
            left: isMobile ? "50%" : "calc(50% - 300px)",
            top: "50%",
            marginLeft: isMobile ? "calc(0px - clamp(130px, 40vw, 170px))" : undefined,
            marginTop: isMobile ? "calc(0px - clamp(190px, 35vh, 260px))" : "calc(0px - clamp(200px, 40vh, 370px))",
          }}
        >
          <motion.div
            initial={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, scale: 0.92 }}
            animate={isMobile
              ? { opacity: faded ? 0 : 1, y: faded ? -80 : 0 }
              : { opacity: 1, scale: 1, x: faded ? -500 : 0 }
            }
            transition={isMobile
              ? { duration: faded ? 1.2 : 0.9, ease, delay: faded ? 0 : 0.2 }
              : (faded ? { duration: 1.4, ease } : { duration: 1.1, ease, delay: 0.35 })
            }
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            {/* Gold offset frame */}
            <div
              className="absolute border border-warm-gold/50"
              style={{
                inset: 0, transform: "translate(9px, 9px)",
                borderRadius: "60% 40% 55% 45% / 40% 50% 60% 50%",
                zIndex: -1,
              }}
            />
            {/* Image */}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ borderRadius: "60% 40% 55% 45% / 40% 50% 60% 50%" }}
            >
              <Image src="/outfits/outfit-4.jpg" alt="Yahia Najm" fill className="object-cover object-top" priority />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 40px 10px rgba(17,24,40,0.5)", borderRadius: "inherit" }}
              />
            </div>
            {/* Soft warm glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "60% 40% 55% 45% / 40% 50% 60% 50%",
                boxShadow: "0 0 80px 12px rgba(200,169,126,0.15)",
              }}
            />
          </motion.div>
        </div>

        {/* ── Mobile intro text (name + tagline) — shown only on mobile during intro ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: faded ? 0 : 1, y: faded ? 40 : 0 }}
            transition={{ duration: faded ? 1.2 : 0.8, ease, delay: faded ? 0 : 0.5 }}
            style={{ position: "absolute", zIndex: 35, bottom: "clamp(60px, 12vh, 100px)", left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
          >
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", color: "#C8A97E", textTransform: "uppercase" }}>A MESSAGE FOR YOU</span>
            <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(44px, 12vw, 64px)", color: "#A8264A", lineHeight: 0.95, letterSpacing: "-0.01em", textAlign: "center" }}>
              YAHIA <span style={{ color: "#F2EDE4" }}>NAJM</span>
            </h1>
            <p style={{ fontFamily: "var(--font-garamond)", fontSize: 14, color: "#C8A97E", fontStyle: "italic" }}>Learning fast. Dressing well.</p>
          </motion.div>
        )}

        {/* ── Gold horizontal rule — behind portrait ── */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.7 }}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ zIndex: 8, top: "50%", originX: 0.5, background: "linear-gradient(90deg, transparent, #C8A97E 30%, #C8A97E 70%, transparent)" }}
        />


        {/* ── Info labels — left ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: faded ? 0 : 1, x: 0 }}
          transition={{ duration: faded ? 1.5 : 0.9, ease, delay: faded ? 0 : 0.8 }}
          className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-6"
          style={{ zIndex: 35, display: isMobile ? "none" : undefined }}
        >
          <InfoLabel tag="FIRST NAME" value="YAHIA" />
          <div className="pl-6"><InfoLabel tag="LAST NAME" value="NAJM" /></div>
          <div className="w-px h-8 bg-dark-cherry/30 ml-1" />
          <div className="pl-6"><InfoLabel tag="BASED IN" value="CASABLANCA" /></div>
          <InfoLabel tag="AGE"        value="22" />
        </motion.div>

        {/* ── Info labels — right ── */}
        {/* ── Info labels — right (empty, kept for structure) ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: faded ? 0 : 1, x: 0 }}
          transition={{ duration: faded ? 1.5 : 0.9, ease, delay: faded ? 0 : 1.0 }}
          className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-6 items-end"
          style={{ zIndex: 35 }}
        >
        </motion.div>

        {/* ── "A MESSAGE FOR YOU" label — independent position ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: faded ? 0 : 1, y: 0 }}
          transition={{ duration: faded ? 1.5 : 0.8, ease, delay: faded ? 0 : 1.0 }}
          className="absolute"
          style={{ zIndex: 35, display: isMobile ? "none" : undefined, left: "calc(50% + 180px)", transform: "translateX(-50%)", top: "150px" }}
        >
          <span
            className="text-warm-gold tracking-[0.25em] uppercase text-[9px] font-bold"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            A MESSAGE FOR YOU
          </span>
        </motion.div>

        {/* ── Heading + body ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: faded ? 0 : 1, y: 0 }}
          transition={{ duration: faded ? 1.5 : 0.8, ease, delay: faded ? 0 : 1.1 }}
          className="absolute flex flex-col gap-3"
          style={{
            zIndex: 35,
            display: isMobile ? "none" : undefined,
            left: "calc(50% + 240px)",
            transform: "translateX(-50%)",
            top: "220px",
            width: "clamp(240px, 32vw, 460px)",
          }}
        >
          <p
            className="text-paper-white leading-none tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(24px, 3.2vw, 48px)" }}
          >
            GETTING HERE{" "}
            <span className="text-cherry-glow">MEANS SOMETHING.</span>
          </p>
          <p
            className="text-paper-white/55 leading-[1.55] italic"
            style={{ fontFamily: "var(--font-garamond)", fontSize: "clamp(12px, 1.1vw, 15px)" }}
          >
            You found this. That tells me you&apos;re serious. So am I.
          </p>
        </motion.div>

        {/* ── Bottom block: ROLE + AGENCY then EMAIL + BORN ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: faded ? 0 : 1, y: 0 }}
          transition={{ duration: faded ? 1.5 : 0.9, ease, delay: faded ? 0 : 1.2 }}
          className="absolute flex flex-col gap-4"
          style={{
            zIndex: 35,
            display: isMobile ? "none" : undefined,
            left: "calc(50% + 240px)",
            transform: "translateX(-50%)",
            bottom: "clamp(90px, 16vh, 170px)",
          }}
        >
          <div className="flex flex-row gap-8 items-end">
            <div className="flex flex-col gap-0.5">
              <span className="text-paper-white/30 tracking-[0.22em] uppercase text-[8px] font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>ROLE</span>
              <span className="text-paper-white tracking-[0.06em] uppercase text-[14px] md:text-[16px]" style={{ fontFamily: "var(--font-bebas)" }}>DEVELOPER</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-paper-white/30 tracking-[0.22em] uppercase text-[8px] font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>AGENCY</span>
              <span className="text-paper-white tracking-[0.06em] uppercase text-[14px] md:text-[16px]" style={{ fontFamily: "var(--font-bebas)" }}>TEC HERMANOS</span>
            </div>
          </div>
          <div className="w-full h-px bg-warm-gold/20" />
          <div className="flex flex-col gap-0.5">
            <span className="text-paper-white/30 tracking-[0.22em] uppercase text-[8px] font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>EMAIL</span>
            <span className="tracking-[0.06em] uppercase text-[14px] md:text-[16px]" style={{ fontFamily: "var(--font-bebas)" }}>
              <span style={{ color: "#F2EDE4" }}>YAHYA</span><span className="text-paper-white">DEV33@GMAIL.COM</span>
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-paper-white/30 tracking-[0.22em] uppercase text-[8px] font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>BORN</span>
            <span className="text-paper-white tracking-[0.06em] uppercase text-[14px] md:text-[16px]" style={{ fontFamily: "var(--font-bebas)" }}>2003</span>
          </div>
        </motion.div>

        {/* ── Career card slider — appears after image slides left ── */}
        {/* Desktop: outer container handles centering via transform (no conflict with framer y) */}
        {/* Mobile: flex centering wrapper */}
        <div style={isMobile ? {
          position: "absolute", zIndex: 36,
          top: "14%", bottom: "18%", left: 0, right: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        } : {
          position: "absolute", zIndex: 36,
          left: "64%", top: "50%",
          marginLeft: "calc(0px - min(470px, (100vw - 40px) / 2))",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20, pointerEvents: "none" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: faded ? 1 : 0, y: faded ? 0 : 40 }}
          transition={faded ? { duration: 1.2, ease, delay: 0.6 } : { duration: 0.3 }}
          style={{
            pointerEvents: "auto",
            width: isMobile ? "calc(100vw - 40px)" : "min(940px, calc(100vw - 40px))",
            height: isMobile ? "min(500px, calc(100vh - 130px))" : "min(580px, calc(100vh - 140px))",
            border: "1px solid rgba(17,24,40,0.1)",
            borderRadius: 10,
            overflow: "hidden",
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 24px 70px rgba(17,24,40,0.12)",
          }}
        >
          {/* ── Card top bar ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: isMobile ? "10px 12px" : "12px 20px 12px 52px", borderBottom: "1px solid rgba(17,24,40,0.07)" }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: isMobile ? 9 : 11, letterSpacing: "0.18em", color: "rgba(17,24,40,0.5)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {["FULL STACK DEVELOPER · CASABLANCA", "EXPÉRIENCE PROFESSIONNELLE", "FORMATION & CERTIFICATIONS", "COMPÉTENCES TECHNIQUES", "CENTRES D'INTÉRÊT & PERSONNALITÉ"][slide]}
            </span>
            {!isMobile && (
              <a href="/cv-yahia-najm.pdf" download data-cursor-hover
                style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#ffffff", background: "#A8264A", padding: "8px 16px", borderRadius: 4, textDecoration: "none", flexShrink: 0, transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#5C1A2E")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A8264A")}
              >
                <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, fill: "currentColor" }}><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z"/></svg>
                DOWNLOAD CV
              </a>
            )}
          </div>

          {/* Slides area */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {/* Scroll fade — top */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28, background: "linear-gradient(to bottom, #ffffff, transparent)", zIndex: 2, pointerEvents: "none" }} />
            {/* Scroll fade — bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 28, background: "linear-gradient(to top, #ffffff, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <AnimatePresence mode="wait" custom={slideDir}>
              <motion.div
                key={slide}
                custom={slideDir}
                initial={{ x: slideDir * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDir * -60, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                style={{ position: "absolute", inset: 0, overflowY: "auto", scrollbarWidth: "none", padding: isMobile ? "14px 16px 16px" : "18px 40px 18px", display: "flex", flexDirection: "column", gap: isMobile ? 7 : 8 }}
              >

                {/* ── Slide 0: Profile ── */}
                {slide === 0 && (<>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: isMobile ? 5 : 0 }}>
                    <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: isMobile ? "clamp(52px, 14vw, 70px)" : "clamp(60px, 6.5vw, 100px)", color: "#111828", lineHeight: 0.95, margin: 0, flexShrink: 0 }}>
                      YAHIA<br /><span style={{ color: "#A8264A" }}>NAJM.</span>
                    </h2>
                    <div style={{ display: "flex", gap: isMobile ? 14 : 28, paddingBottom: 8, marginRight: isMobile ? -4 : 0 }}>
                      {[{ n: "3+", label: "YEARS EXP" }, { n: "10+", label: "PROJECTS" }, { n: "22", label: "YEARS OLD" }].map(({ n, label }) => (
                        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ fontFamily: "var(--font-bebas)", fontSize: isMobile ? 28 : 42, color: "#A8264A", lineHeight: 1 }}>{n}</span>
                          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: isMobile ? 8 : 11, letterSpacing: "0.2em", color: "rgba(17,24,40,0.32)", fontWeight: 700 }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-garamond)", fontSize: isMobile ? 15 : 17, color: "rgba(17,24,40,0.52)", lineHeight: 1.6, fontStyle: "italic", maxWidth: 600 }}>
                    Ambitionné de devenir Senior Developer, je souhaite évoluer dans des environnements stimulants où je peux contribuer à des projets ambitieux et innovants — en créant des solutions numériques modernes et performantes.
                  </p>
                  {isMobile ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 2 }}>
                      <div style={{ display: "flex", gap: 32 }}>
                        {[{ label: "PHONE", val: "+212 7 22 82 21 19" }, { label: "EMAIL", val: "yahyadev33@gmail.com" }].map(({ label, val }) => (
                          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.22em", color: "rgba(17,24,40,0.35)", fontWeight: 700 }}>{label}</span>
                            <span style={{ fontFamily: "var(--font-bebas)", fontSize: 16, color: "#111828", letterSpacing: "0.06em" }}>{val}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.22em", color: "rgba(17,24,40,0.35)", fontWeight: 700 }}>GITHUB</span>
                        <span style={{ fontFamily: "var(--font-bebas)", fontSize: 16, color: "#111828", letterSpacing: "0.06em" }}>YAHIANAJM</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 40, paddingTop: 6 }}>
                      {[
                        { label: "PHONE", val: "+212 7 22 82 21 19" },
                        { label: "EMAIL", val: "yahyadev33@gmail.com" },
                        { label: "GITHUB", val: "YAHIANAJM" },
                      ].map(({ label, val }) => (
                        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.22em", color: "rgba(17,24,40,0.35)", fontWeight: 700 }}>{label}</span>
                          <span style={{ fontFamily: "var(--font-bebas)", fontSize: 18, color: "#111828", letterSpacing: "0.06em" }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: isMobile ? 7 : 10, marginTop: isMobile ? 10 : 20, paddingTop: 4 }}>
                    {["FRANÇAIS", "ENGLISH", "ARABIC (NATIVE)"].map(l => (
                      <span key={l} style={{ fontFamily: "var(--font-dm-sans)", fontSize: isMobile ? 11 : 12, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(17,24,40,0.5)", border: "1px solid rgba(17,24,40,0.12)", padding: isMobile ? "6px 11px" : "7px 16px", borderRadius: 2 }}>{l}</span>
                    ))}
                  </div>
                </>)}

                {/* ── Slide 1: Experience ── */}
                {slide === 1 && (<>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    {[
                      {
                        period: "JUL 2025 → PRESENT",
                        role: "Développeur Web (Stagiaire)",
                        company: "Ark-X Talent Solutions",
                        detail: "Apprentissage du MERN Stack + Next.js. Réalisation de projets pratiques : Blog App (Passport.js) et Weather Tracking App avec API externe.",
                        stack: "TypeScript · React.js · Next.js · Node.js · Express · MongoDB · Passport.js",
                      },
                      {
                        period: "MAI 2025 → PRESENT",
                        role: "Développeur Full-Stack (Freelance)",
                        company: "Indépendant",
                        detail: "ATLAS Chat Application · I9AMATI (gestion de syndic) · Application de gestion des tâches avec chat intégré.",
                        stack: "React.js · Node.js · Express.js · PHP · MySQL · MongoDB · Flutter · Socket.io",
                      },
                      {
                        period: "AOÛT 2024 → 2025",
                        role: "Développeur Full-Stack (Stage 3 mois)",
                        company: "Client privé",
                        detail: "Plateforme de gestion d'événements avec authentification, notifications et gestion des participants. Architecture modulaire et réutilisable.",
                        stack: "React.js · Laravel · MySQL · GitHub",
                      },
                    ].map(({ period, role, company, detail, stack }, i) => (
                      <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid rgba(17,24,40,0.07)", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 4 : 22 }}>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "#A8264A", fontWeight: 700, letterSpacing: "0.07em", minWidth: isMobile ? undefined : 130, paddingTop: 4, lineHeight: 1.5 }}>{period}</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          <span style={{ fontFamily: "var(--font-bebas)", fontSize: isMobile ? 15 : 22, color: "#111828", letterSpacing: "0.04em", lineHeight: 1.1 }}>{role} — <span style={{ color: "#A8264A" }}>{company}</span></span>
                          <span style={{ fontFamily: "var(--font-garamond)", fontSize: 13, color: "rgba(17,24,40,0.55)", lineHeight: 1.55, fontStyle: "italic" }}>{detail}</span>
                          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "rgba(17,24,40,0.38)", letterSpacing: "0.07em", fontWeight: 700 }}>{stack}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>)}

                {/* ── Slide 2: Education ── */}
                {slide === 2 && (<>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <div style={{ padding: "14px 0", borderBottom: "1px solid rgba(17,24,40,0.07)", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 4 : 22 }}>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "#A8264A", fontWeight: 700, letterSpacing: "0.08em", minWidth: isMobile ? undefined : 105, paddingTop: 4, lineHeight: 1.4 }}>2023 → 2025</span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={{ fontFamily: "var(--font-bebas)", fontSize: isMobile ? 15 : 22, color: "#111828", letterSpacing: "0.04em", lineHeight: 1.15 }}>Technicien Spécialisé — Développement Informatique</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(17,24,40,0.48)", lineHeight: 1.4 }}>Ecole Miage, Casablanca</span>
                      </div>
                    </div>
                    <div style={{ padding: "14px 0", borderBottom: "1px solid rgba(17,24,40,0.07)", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 4 : 22 }}>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "#A8264A", fontWeight: 700, letterSpacing: "0.08em", minWidth: isMobile ? undefined : 105, paddingTop: 4, lineHeight: 1.4 }}>2021 → 2023</span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={{ fontFamily: "var(--font-bebas)", fontSize: isMobile ? 15 : 22, color: "#111828", letterSpacing: "0.04em", lineHeight: 1.15 }}>Technicien Spécialisé — Diagnostic & Électrique Embarquée</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(17,24,40,0.48)", lineHeight: 1.4 }}>OFPPT — Centre de Recherche et d'Engineering de l'Automobile, Casablanca</span>
                      </div>
                    </div>
                    <div style={{ padding: "14px 0", borderBottom: "1px solid rgba(17,24,40,0.07)", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 4 : 22 }}>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "#A8264A", fontWeight: 700, letterSpacing: "0.08em", minWidth: isMobile ? undefined : 105, paddingTop: 4, lineHeight: 1.4 }}>JUIN 2021</span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={{ fontFamily: "var(--font-bebas)", fontSize: isMobile ? 15 : 22, color: "#111828", letterSpacing: "0.04em", lineHeight: 1.15 }}>Baccalauréat — Sciences de la Vie et de la Terre</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(17,24,40,0.48)", lineHeight: 1.4 }}>Lycée Abdelkrim El Khattabi, Casablanca</span>
                      </div>
                    </div>
                    <div style={{ padding: "14px 0" }}>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.22em", color: "rgba(17,24,40,0.35)", fontWeight: 700 }}>CERTIFICATIONS 2025</span>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(17,24,40,0.52)", lineHeight: 1.65, marginTop: 8 }}>
                        .Net / Blazor · JavaScript · MongoDB · React.js · Node.js · Express.js · Git · GitHub<br />
                        <span style={{ color: "#A8264A", fontWeight: 700 }}>Coursera</span> — IBM, Microsoft, Scrimba &nbsp;·&nbsp; <span style={{ color: "#A8264A", fontWeight: 700 }}>Ark-X Academy</span>
                      </p>
                    </div>
                  </div>
                </>)}

                {/* ── Slide 3: Technical Skills ── */}
                {slide === 3 && (<>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    {[
                      { cat: "LANGAGES", items: ["JavaScript ES6+", "TypeScript", "PHP", "HTML5", "CSS3", "Python", ".NET / Blazor"] },
                      { cat: "FRAMEWORKS", items: ["React.js", "Next.js", "Redux", "React Router", "Laravel", "Node.js", "Express", "Tailwind CSS", "Bootstrap"] },
                      { cat: "BASES DE DONNÉES", items: ["MySQL", "MongoDB"] },
                      { cat: "OUTILS", items: ["Git", "GitHub", "VS Code", "Jira", "Notion", "Figma", "Canva", "Postman"] },
                    ].map(({ cat, items }) => (
                      <div key={cat} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 6 : 20, alignItems: "flex-start" }}>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.16em", color: "rgba(17,24,40,0.38)", fontWeight: 700, minWidth: isMobile ? undefined : 110, paddingTop: isMobile ? 0 : 7 }}>{cat}</span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                          {items.map(s => (
                            <span key={s} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: "0.08em", fontWeight: 700, color: "rgba(17,24,40,0.65)", border: "1px solid rgba(17,24,40,0.14)", padding: "5px 13px", borderRadius: 3 }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 1, background: "rgba(17,24,40,0.07)" }} />
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingBottom: 4 }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.16em", color: "rgba(17,24,40,0.38)", fontWeight: 700, paddingTop: 6, marginRight: 4 }}>SOFT SKILLS</span>
                    {["Travail en équipe & Agile", "Résolution de problèmes", "Autonomie", "Gestion du temps", "Organisation"].map(s => (
                      <span key={s} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: "0.07em", color: "#A8264A", border: "1px solid rgba(168,38,74,0.25)", padding: "5px 13px", borderRadius: 3 }}>{s}</span>
                    ))}
                  </div>
                </>)}

                {/* ── Slide 4: Interests ── */}
                {slide === 4 && (<>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    {[
                      { cat: "SPORT", items: ["Bodybuilding", "Calisthenics", "Kickboxing"] },
                      { cat: "ARTS & CRÉATIVITÉ", items: ["Origami", "Design", "Pixel Art"] },
                      { cat: "MODE", items: ["Casual", "Old Money", "Style Italien"] },
                      { cat: "LECTURE", items: ["Développement personnel", "Science", "Philosophie", "Livres sur la vie"] },
                    ].map(({ cat, items }) => (
                      <div key={cat} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 6 : 24, alignItems: isMobile ? "flex-start" : "center", padding: "16px 0", borderBottom: "1px solid rgba(17,24,40,0.07)" }}>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: "0.16em", color: "rgba(17,24,40,0.38)", fontWeight: 700, minWidth: isMobile ? undefined : 160 }}>{cat}</span>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {items.map(s => (
                            <span key={s} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, letterSpacing: "0.07em", fontWeight: 700, color: "#111828", border: "1px solid rgba(17,24,40,0.13)", padding: "7px 16px", borderRadius: 3 }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-garamond)", fontSize: 17, color: "rgba(17,24,40,0.42)", lineHeight: 1.7, fontStyle: "italic", marginTop: 10 }}>
                    &ldquo;Construction and style are the same pursuit — both are about building something that lasts.&rdquo;
                  </p>
                </>)}

              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>

        {/* ── Back link — bottom left ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: faded ? 0 : 1 }}
          transition={{ delay: faded ? 0 : 1.4, duration: faded ? 1.5 : 0.6 }}
          className="absolute bottom-5 left-5 md:left-10"
          style={{ zIndex: 40, display: isMobile ? "none" : undefined }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-deep-navy/40 hover:text-dark-cherry transition-colors duration-300 tracking-[0.2em] uppercase text-[9px] font-bold"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <span className="material-symbols-outlined text-[13px]">arrow_back</span>
            BACK
          </Link>
        </motion.div>

        {/* ── Nav bar — 20px below card, appears with card ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: faded ? 1 : 0, y: faded ? 0 : 10 }}
          transition={faded ? { duration: 1.2, ease, delay: 0.8 } : { duration: 0.3 }}
          style={{ pointerEvents: faded ? "auto" : "none", display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", border: "1px solid rgba(17,24,40,0.1)", borderRadius: 8, padding: "8px 16px", boxShadow: "0 4px 20px rgba(17,24,40,0.08)" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === slide ? 20 : 7, height: 7, borderRadius: 4, background: i === slide ? "#A8264A" : "rgba(17,24,40,0.18)", border: "none", padding: 0, transition: "all 0.3s ease", cursor: "none" }} />
            ))}
          </div>
          <div style={{ width: 1, height: 18, background: "rgba(17,24,40,0.1)" }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => goTo((slide - 1 + SLIDE_COUNT) % SLIDE_COUNT)} style={{ background: "#A8264A", border: "none", borderRadius: 4, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, cursor: "none" }}>‹</button>
            <button onClick={() => goTo((slide + 1) % SLIDE_COUNT)} style={{ background: "#A8264A", border: "none", borderRadius: 4, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, cursor: "none" }}>›</button>
          </div>
        </motion.div>

        </div>
        </div>


      </div>
    </div>
  );
}
