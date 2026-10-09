"use client";
import React, { useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

export function RotatingBadge({ text }: { text: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <a 
      href="#projects" 
      className="hidden sm:flex relative items-center justify-center w-36 h-36 rounded-full group cursor-pointer"
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        animate={!prefersReducedMotion ? { rotate: 360 } : {}}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--color-text)] opacity-50 group-hover:opacity-100 transition-opacity duration-300">
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text fontSize="9.5" letterSpacing="1.5" className="uppercase font-medium fill-current">
            <textPath href="#circlePath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-black transition-colors z-10 shadow-lg">
        <ArrowDownRight size={24} />
      </div>
    </a>
  );
}
