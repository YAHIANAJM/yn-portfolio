"use client";

import { motion } from "framer-motion";

export default function RotatingBadge({ textColor = "#C8A97E", centerColor = "#C8A97E" }: { textColor?: string; centerColor?: string }) {
  return (
    <div className="relative w-20 h-20 md:w-28 md:h-28">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fill={textColor} fontSize="8" letterSpacing="2.5" fontFamily="DM Sans, sans-serif" fontWeight="700">
          <textPath href="#badge-circle">
            YAHIA NAJM · DEVELOPER · CASABLANCA ·&nbsp;
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span style={{ fontFamily: "var(--font-bebas)", fontSize: "20px", letterSpacing: "3px", color: centerColor }}>
          YN
        </span>
      </div>
    </div>
  );
}
