"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const IDLE_FRAMES = ["/Figure/normal.png", "/Figure/arms.png", "/Figure/lean.png"];
const HOVER_FRAMES = ["/Figure/waving.png"];

export default function FigureCorner() {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isActive = hovered || tapped;

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFrameIndex(0);
    const frames = isActive ? HOVER_FRAMES : IDLE_FRAMES;
    timerRef.current = setInterval(() => {
      setFrameIndex(i => (i + 1) % frames.length);
    }, isActive ? 1500 : 2500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive]);

  const frames = isActive ? HOVER_FRAMES : IDLE_FRAMES;

  const handleClick = () => {
    // only toggle on touch — desktop uses hover
    if (window.matchMedia("(hover: none)").matches) {
      setTapped(t => !t);
    }
  };

  const showBubble = isActive || (!isActive && frameIndex >= 1);
  const bubbleText = tapped && !hovered ? "Hey ! 👋" : hovered ? "Hello ! 👋" : "Why takes too long ?";
  const bubbleColor = isActive ? "#A8264A" : "rgba(17,24,40,0.55)";

  return (
    <div
      className="figure-corner"
      style={{ position: "fixed", bottom: 0, right: -28, zIndex: 50, pointerEvents: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {showBubble && (
        <div className="figure-bubble" style={{
          marginBottom: isMobile ? -42 : -20,
          padding: "5px 9px",
          background: "rgba(250,248,245,0.95)",
          border: "1px solid rgba(200,169,126,0.35)",
          borderRadius: 20,
          boxShadow: "0 2px 10px rgba(17,24,40,0.08)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: bubbleColor,
          whiteSpace: "nowrap",
          transition: "all 0.3s ease",
          backdropFilter: "blur(8px)",
          transform: isActive ? "none" : "translateX(-20px)",
        }}>
          {bubbleText}
        </div>
      )}

      <Image
        key={frames[frameIndex % frames.length]}
        src={frames[frameIndex % frames.length]}
        alt="Figure"
        width={190}
        height={300}
        style={{ objectFit: "contain", objectPosition: "bottom", display: "block", marginBottom: -12 }}
        priority
      />
    </div>
  );
}
