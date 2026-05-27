"use client";

import { useEffect } from "react";

const IDLE_DELAY = 2500;

export default function MobileIdleManager() {
  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) return;

    let timer: ReturnType<typeof setTimeout>;

    const goIdle = () => document.body.classList.add("mobile-ui-idle");

    const wake = () => {
      document.body.classList.remove("mobile-ui-idle");
      clearTimeout(timer);
      timer = setTimeout(goIdle, IDLE_DELAY);
    };

    // Only wake when clicking/tapping one of the 3 UI elements
    const handleClick = (e: Event) => {
      if ((e.target as HTMLElement).closest("[data-mobile-ui]")) wake();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("touchend", handleClick, { passive: true });

    // Start fading after initial delay
    timer = setTimeout(goIdle, IDLE_DELAY);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchend", handleClick);
      document.body.classList.remove("mobile-ui-idle");
    };
  }, []);

  return null;
}
