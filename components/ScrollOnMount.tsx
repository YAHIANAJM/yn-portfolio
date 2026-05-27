"use client";

import { useEffect, useRef } from "react";

export default function ScrollOnMount({ section }: { section: string }) {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const el = document.getElementById(section);
    if (!el) return;
    // Wait for layout to settle before scrolling
    const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 120);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
