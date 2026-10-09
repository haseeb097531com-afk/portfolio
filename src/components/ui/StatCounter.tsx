"use client";
import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!nodeRef.current) return;
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: "easeOut",
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [value, inView]);

  if (value === 0) return null;

  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-[100px]">
      <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-accent)] mb-1 flex items-baseline justify-center lg:justify-start">
        <span ref={nodeRef}>0</span>
        {suffix}
      </div>
      <p className="text-xs md:text-sm text-[var(--color-muted)] uppercase tracking-wider font-medium">
        {label}
      </p>
    </div>
  );
}
