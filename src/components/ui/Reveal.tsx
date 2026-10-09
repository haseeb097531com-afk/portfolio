"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motion';
import { useMotionSafe, getSafeVariant } from '@/lib/useMotionSafe';

interface Props {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
}

export function Reveal({ children, width = 'fit-content', delay = 0 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, VIEWPORT_ONCE);
  const prefersReducedMotion = useMotionSafe();

  const variant = getSafeVariant(fadeUp, prefersReducedMotion);
  
  const customVisible = {
    ...variant.visible,
    transition: {
      ...variant.visible.transition,
      delay
    }
  };

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'visible' }}>
      <motion.div
        variants={{ hidden: variant.hidden, visible: customVisible }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    </div>
  );
}
