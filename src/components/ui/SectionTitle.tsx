"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe } from '@/lib/useMotionSafe';

type SectionTitleProps = {
  label: string;
  title: string;
  subtext?: string;
  className?: string;
  animateWords?: boolean;
};

export function SectionTitle({ label, title, subtext, className = '', animateWords = false }: SectionTitleProps) {
  const words = title.split(" ");
  const prefersReducedMotion = useMotionSafe();
  
  const container = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  } : {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 * i },
    }),
  };

  const child = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  } : {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] uppercase text-sm">
        {label}
      </span>
      {animateWords && !prefersReducedMotion ? (
        <motion.h2 
          className="text-h2 text-[var(--color-text)] flex flex-wrap"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {words.map((word, index) => (
            <motion.span variants={child} key={index} className="mr-[0.25em]">
              {word}
            </motion.span>
          ))}
        </motion.h2>
      ) : (
        <h2 className="text-h2 text-[var(--color-text)]">
          {title}
        </h2>
      )}
      {subtext && (
        <p className="text-body text-[var(--color-muted)] max-w-2xl leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
}
