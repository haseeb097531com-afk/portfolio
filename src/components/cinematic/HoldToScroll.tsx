"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '@/data/site';
import { useMotionSafe } from '@/lib/useMotionSafe';

export function HoldToScroll() {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);
  
  const prefersReducedMotion = useMotionSafe();
  const requestRef = useRef<number>();
  const holdStartTime = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!siteData.cinematic.enabled || !siteData.cinematic.holdToFastForward || prefersReducedMotion || isTouch) {
      return;
    }
    setShouldRender(true);
  }, [prefersReducedMotion]);

  const animateScroll = useCallback((time: number) => {
    if (!holdStartTime.current) holdStartTime.current = time;
    const elapsed = time - holdStartTime.current;
    
    // Progress for UI ring (2s to fill)
    const p = Math.min(elapsed / 2000, 1);
    setProgress(p);

    // Speed calculation
    const baseSpeed = 15; // 3x speed roughly
    const speed = p >= 1 ? baseSpeed * 2 : baseSpeed;

    // Use lenis if available, otherwise native
    if ((window as any).lenis) {
      const lenis = (window as any).lenis;
      lenis.scrollTo(lenis.scroll + speed, { immediate: true });
    } else {
      window.scrollBy(0, speed);
    }

    requestRef.current = requestAnimationFrame(animateScroll);
  }, []);

  const handleStart = () => {
    if (!shouldRender) return;
    setIsHolding(true);
    holdStartTime.current = null;
    requestRef.current = requestAnimationFrame(animateScroll);
  };

  const handleStop = () => {
    if (!shouldRender) return;
    setIsHolding(false);
    setProgress(0);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isHolding) handleStop();
      else handleStart();
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleStop);
    return () => window.removeEventListener('mouseup', handleStop);
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <button
        onMouseDown={handleStart}
        onMouseLeave={handleStop}
        onKeyDown={handleKeyDown}
        aria-pressed={isHolding}
        className="relative flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-5 py-2 hover:border-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] group"
      >
        <div className="relative w-4 h-4 rounded-full border border-[var(--color-border)] flex items-center justify-center overflow-hidden">
          {/* Progress Ring equivalent via scale */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-[var(--color-accent)] transform-origin-bottom"
            animate={{ height: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text)] opacity-80 group-hover:opacity-100 transition-opacity">
          {isHolding ? 'RELEASING...' : '[ HOLD TO FAST FORWARD ]'}
        </span>
      </button>
    </div>
  );
}
