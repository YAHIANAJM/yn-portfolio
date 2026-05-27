"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top = `${ring.current.y}px`;
      rafId.current = requestAnimationFrame(animate);
    };

    const addHover = () => document.body.classList.add("cursor-hover");
    const removeHover = () => document.body.classList.remove("cursor-hover");

    document.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(animate);

    const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
    targets.forEach((el) => {
      el.addEventListener("mouseover", addHover);
      el.addEventListener("mouseout", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
      targets.forEach((el) => {
        el.removeEventListener("mouseover", addHover);
        el.removeEventListener("mouseout", removeHover);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
