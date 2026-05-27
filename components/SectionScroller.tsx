"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SectionScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const slug = pathname.replace(/^\//, "");
    if (!slug) return;
    const el = document.getElementById(slug);
    if (!el) return;
    // Small delay so the page finishes rendering before scrolling
    const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
