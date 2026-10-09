"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { siteData } from '@/data/site';
import { useMotionSafe } from '@/lib/useMotionSafe';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const prefersReducedMotion = useMotionSafe();

  useEffect(() => {
    // Check flags, motion preference, and if it's a touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!siteData.cinematic.enabled || !siteData.cinematic.customCursor || prefersReducedMotion || isTouch) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Interactive elements
      const isInteractive = target.closest('a, button, [data-cursor="hover"]');
      // Inputs
      const isInput = target.closest('input, textarea, select');
      // Text elements
      const isTextNode = target.closest('p, h1, h2, h3, h4, h5, h6, span');

      if (isInput) {
        setIsVisible(false);
        setIsHovering(false);
        setIsText(false);
        return;
      }

      setIsVisible(true);

      if (isInteractive) {
        setIsHovering(true);
        setIsText(false);
        const label = (isInteractive as HTMLElement).getAttribute('data-cursor-label');
        setHoverLabel(label || null);
      } else if (isTextNode && !target.closest('a, button')) {
        setIsHovering(false);
        setIsText(true);
        setHoverLabel(null);
      } else {
        setIsHovering(false);
        setIsText(false);
        setHoverLabel(null);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block" aria-hidden="true">
      {/* Tiny solid dot */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-1 bg-[var(--color-accent)] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isText || isHovering ? 0 : 1,
        }}
      />
      
      {/* Ring / Hover state / Text state */}
      <motion.div
        className="absolute top-0 left-0 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          width: isHovering ? 48 : isText ? 4 : 16,
          height: isHovering ? 48 : isText ? 24 : 16,
          backgroundColor: isHovering ? 'rgba(10, 252, 219, 0.1)' : isText ? 'var(--color-accent)' : 'transparent',
          border: isText ? 'none' : '1px solid var(--color-accent)',
          borderRadius: isText ? '2px' : '9999px',
          opacity: isText ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isHovering && hoverLabel && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[8px] text-[var(--color-accent)] tracking-widest uppercase"
          >
            {hoverLabel}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
