"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ← swap this path once you hand over the figure
const FIGURE_SRC = "/figure/ask.png";

export default function HashModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isTestimonialsUrl =
      window.location.hash === "#testimonials" ||
      window.location.pathname === "/testimonials";
    if (isTestimonialsUrl) {
      window.scrollTo(0, 0);
      history.replaceState(null, "", "/");
      const t1 = setTimeout(() => history.replaceState(null, "", "/"), 100);
      const t2 = setTimeout(() => history.replaceState(null, "", "/"), 500);
      setOpen(true);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  const goToTestimonials = () => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const takeTour = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="hash-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, background: "rgba(17,24,40,0.6)", backdropFilter: "blur(7px)", zIndex: 500 }}
          />

          {/* Modal wrapper — static centering */}
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 501, width: "min(860px, calc(100vw - 32px))" }}>
            <motion.div
              key="hash-modal"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              style={{ display: "flex", borderRadius: 22, overflow: "hidden", boxShadow: "0 40px 100px rgba(17,24,40,0.28)", minHeight: 420 }}
            >
              {/* ── Left: figure ── */}
              <div
                className="hidden md:block"
                style={{ flex: "0 0 42%", background: "#111828", position: "relative", overflow: "hidden" }}
              >
                {/* Subtle top label */}
                <div style={{ position: "absolute", top: 22, left: 22, zIndex: 2 }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.24em", color: "rgba(200,169,126,0.7)", textTransform: "uppercase" }}>YN PORTFOLIO</span>
                </div>

                {/* Figure image — replace src when ready */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FIGURE_SRC}
                  alt="Figure"
                  style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "82%", objectFit: "contain", objectPosition: "bottom center", display: "block" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />

                {/* Gradient overlay at bottom */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,24,40,0.55) 0%, transparent 55%)", pointerEvents: "none" }} />

                {/* Bottom tag */}
                <div style={{ position: "absolute", bottom: 22, left: 22, zIndex: 2 }}>
                  <div style={{ width: 28, height: 2, background: "#A8264A", borderRadius: 1, marginBottom: 8 }} />
                  <span style={{ fontFamily: "var(--font-garamond)", fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>someone sent you<br />something worth seeing.</span>
                </div>
              </div>

              {/* ── Right: content ── */}
              <div style={{ flex: 1, background: "#faf8f5", padding: "clamp(28px, 5vw, 48px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
                {/* Eyebrow */}
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.26em", color: "#C8A97E", textTransform: "uppercase", margin: "0 0 12px" }}>
                  YOU WERE INVITED
                </p>

                {/* Headline */}
                <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(30px, 5vw, 46px)", color: "#111828", letterSpacing: "0.04em", lineHeight: 1.1, margin: "0 0 14px" }}>
                  THEY WANT YOU<br />TO SEE{" "}
                  <span style={{ color: "#A8264A" }}>WHAT PEOPLE SAY.</span>
                </h2>

                {/* Divider */}
                <div style={{ width: 36, height: 2, background: "rgba(17,24,40,0.12)", borderRadius: 1, margin: "0 0 18px" }} />

                {/* Body */}
                <p style={{ fontFamily: "var(--font-garamond)", fontSize: 15, color: "rgba(17,24,40,0.58)", fontStyle: "italic", lineHeight: 1.65, margin: "0 0 32px" }}>
                  Jump straight to the reviews, or take a full tour of the portfolio from the beginning.
                </p>

                {/* Buttons — side by side */}
                <div style={{ display: "flex", gap: 10 }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={goToTestimonials}
                    data-cursor-hover
                    style={{ flex: 1, fontFamily: "var(--font-bebas)", fontSize: 13, letterSpacing: "0.16em", color: "#fff", background: "#A8264A", border: "none", padding: "13px 10px", borderRadius: 8, cursor: "none", boxShadow: "0 6px 20px rgba(168,38,74,0.28)", whiteSpace: "nowrap" }}
                  >
                    SEE THE REVIEWS
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={takeTour}
                    data-cursor-hover
                    style={{ flex: 1, fontFamily: "var(--font-bebas)", fontSize: 13, letterSpacing: "0.16em", color: "#fff", background: "#111828", border: "none", padding: "13px 10px", borderRadius: 8, cursor: "none", boxShadow: "0 6px 20px rgba(17,24,40,0.22)", whiteSpace: "nowrap" }}
                  >
                    FULL TOUR
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
