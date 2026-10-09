"use client";
import { useEffect, useState } from 'react';

/**
 * Hook to return whether the user prefers reduced motion.
 * Returns false during SSR to match hydration, then updates on mount.
 */
export function useMotionSafe() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Returns a variant that collapses to a simple opacity fade if reduced motion is preferred.
 */
export function getSafeVariant(variant: any, prefersReducedMotion: boolean) {
  if (!prefersReducedMotion) return variant;

  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  };
}
