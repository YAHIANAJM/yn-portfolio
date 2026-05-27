"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SECTION_PATHS = ["/", "/about", "/fits", "/beyond", "/agency", "/contact", "/testimonials"];

function sectionPath(id: string) {
  // hero section has no clean slug — fall back to root
  if (id === "hero" || id === "") return "/";
  return `/${id}`;
}

export default function SectionUrlTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!SECTION_PATHS.includes(pathname)) return;

    const sections = Array.from(document.querySelectorAll("main [id]")) as HTMLElement[];
    if (!sections.length) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          visible.set(entry.target.id, entry.intersectionRatio);
        });
        let topId = "";
        let topRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > topRatio) { topRatio = ratio; topId = id; }
        });
        if (topRatio > 0.1) {
          history.replaceState(null, "", sectionPath(topId));
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7] }
    );

    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
