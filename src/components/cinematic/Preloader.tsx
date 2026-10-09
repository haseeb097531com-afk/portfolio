"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '@/data/site';

const BOOT_SEQUENCE = [
  "[ ESTABLISHING CONNECTION ]",
  "[ LOADING_ASSETS ... 0% ]",
  "[ LOADING_ASSETS ... 47% ]",
  "[ LOADING_ASSETS ... 100% ]",
  "[ READY ]",
];

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only run if cinematic features and preloader are enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (
      !siteData.cinematic.enabled || 
      !siteData.cinematic.preloader || 
      prefersReducedMotion || 
      hasVisited
    ) {
      setIsVisible(false);
      return;
    }

    setShouldRender(true);
    sessionStorage.setItem('hasVisited', 'true');

    // Simulate boot sequence with hard cap
    const intervals = [200, 400, 700, 1000, 1200];
    const timeouts = intervals.map((time, idx) => {
      return setTimeout(() => setStep(idx), time);
    });

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 1800); // 1.8s hard cap

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[100] bg-[var(--color-background)] flex flex-col justify-center px-8 md:px-24"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-xs md:text-sm text-[var(--color-muted)] flex flex-col gap-2 max-w-md">
            {BOOT_SEQUENCE.slice(0, step + 1).map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
            
            <div className="w-full h-[1px] bg-[var(--color-border)] mt-4 relative overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-[var(--color-accent)]"
                initial={{ width: "0%" }}
                animate={{ width: step >= 3 ? "100%" : `${step * 25}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
