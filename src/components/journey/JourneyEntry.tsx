"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { JourneyItem } from '@/data/site';
import { TypeBadge } from './TypeBadge';

type Props = {
  item: JourneyItem;
  side: "left" | "right";
};

export function JourneyEntry({ item, side }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const isLeft = side === "left";
  
  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: prefersReducedMotion ? 0 : (isLeft ? -24 : 24) 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mobileVariants = {
    hidden: { 
      opacity: 0, 
      x: prefersReducedMotion ? 0 : 16 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <li ref={ref} className={`relative flex items-center w-full justify-start md:${isLeft ? 'justify-start' : 'justify-end'}`}>
      
      {/* Glowing Dot */}
      <motion.div 
        aria-hidden="true"
        initial={{ scale: 1 }}
        animate={{ 
          scale: isInView ? (prefersReducedMotion ? 1 : 1.15) : 1,
          boxShadow: isInView 
            ? "0 0 20px var(--color-accent-glow)" 
            : "0 0 0px transparent"
        }}
        transition={{ duration: 0.5 }}
        className="absolute left-6 md:left-1/2 w-4 h-4 bg-[var(--color-surface)] border-2 border-[var(--color-accent)] rounded-full -translate-x-1/2 z-20"
      />

      {/* Content Wrapper for Desktop */}
      <motion.div 
        variants={slideVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`w-full md:w-1/2 px-8 lg:px-12 hidden md:block relative ${isLeft ? 'pr-16 text-right' : 'pl-16 text-left'}`}
      >
        {/* Desktop Watermark Year */}
        <div className={`absolute top-1/2 -translate-y-1/2 text-7xl lg:text-8xl font-heading font-bold text-white/5 pointer-events-none select-none -z-10 ${isLeft ? 'right-0' : 'left-0'}`}>
          {item.year}
        </div>
        
        <div className={`relative z-10 w-full max-w-xl p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
          <div className={`flex flex-wrap items-center gap-3 mb-4 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            {isLeft ? (
              <>
                <span className="text-sm font-mono text-[var(--color-muted)]">{item.year}</span>
                <TypeBadge type={item.type} />
              </>
            ) : (
              <>
                <TypeBadge type={item.type} />
                <span className="text-sm font-mono text-[var(--color-muted)]">{item.year}</span>
              </>
            )}
          </div>
          
          <h4 className="text-xl font-heading font-semibold text-white mb-1">
            {item.title}
          </h4>
          
          <p className="text-sm text-[var(--color-muted)] mb-3">
            {item.place}
          </p>
          
          {item.description && (
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
              {item.description}
            </p>
          )}

          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={`View details for ${item.title}`}
              className={`inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded ${isLeft ? 'justify-end' : 'justify-start'}`}
            >
              View <ExternalLink size={14} />
            </a>
          )}
        </div>
      </motion.div>

      {/* Content Wrapper for Mobile */}
      <motion.div 
        variants={mobileVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full pl-16 pr-4 md:hidden block"
      >
        <div className="relative z-10 w-full p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <TypeBadge type={item.type} />
            <span className="text-sm font-mono text-[var(--color-muted)]">
              {item.year}
            </span>
          </div>
          
          <h4 className="text-xl font-heading font-semibold text-white mb-1">
            {item.title}
          </h4>
          
          <p className="text-sm text-[var(--color-muted)] mb-3">
            {item.place}
          </p>
          
          {item.description && (
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
              {item.description}
            </p>
          )}

          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={`View details for ${item.title}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
            >
              View <ExternalLink size={14} />
            </a>
          )}
        </div>
      </motion.div>

    </li>
  );
}
