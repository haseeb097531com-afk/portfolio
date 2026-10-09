"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { JourneyItem } from '@/data/site';
import { JourneyEntry } from './JourneyEntry';

export function JourneyTimeline({ items }: { items: JourneyItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative mt-16 lg:mt-24" ref={ref}>
      {/* Timeline Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-border)] -translate-x-1/2 overflow-hidden" aria-hidden="true">
        <motion.div 
          className="w-full bg-[var(--color-accent)] origin-top"
          style={{ 
            scaleY: prefersReducedMotion ? 1 : scaleY, 
            height: "100%" 
          }}
        />
      </div>

      <ol className="flex flex-col gap-12 md:gap-24 relative z-10">
        {items.map((item, idx) => {
          const side = idx % 2 === 0 ? "left" : "right";
          return <JourneyEntry key={idx} item={item} side={side} />;
        })}
      </ol>
    </div>
  );
}
