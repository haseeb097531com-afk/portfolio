"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteData } from '@/data/site';
import { useMotionSafe } from '@/lib/useMotionSafe';

interface Props {
  children: React.ReactNode;
  id: string;
  index: number;
  label: string;
}

export function SectionCinematic({ children, id, index, label }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useMotionSafe();

  if (!siteData.cinematic.enabled || prefersReducedMotion) {
    return <section id={id}>{children}</section>;
  }

  const paddedIndex = String(index).padStart(2, '0');

  return (
    <section id={id} className="relative" ref={ref}>
      {/* Cinematic separator rule */}
      <div className="container-max w-full flex items-center gap-4 py-8 pointer-events-none opacity-40">
        <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-accent)]">
          // SECTION_{paddedIndex} :: {label}
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--color-border)] to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, clipPath: 'inset(10% 0 0 0)' }}
        animate={isInView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
