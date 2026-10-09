"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/site';

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group block h-full ${featured ? 'md:col-span-2' : ''}`}
    >
      <Link 
        href={`/projects/${project.slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(10,252,219,0.15)] hover:border-[var(--color-accent)]/50 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
          className={`relative overflow-hidden bg-[var(--color-background)] w-full aspect-[16/10]`}
        >
          {!imageError && project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] flex items-center justify-center p-6">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <span className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-text)] to-[var(--color-muted)] opacity-20">
                {project.title.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-1" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-4 gap-4">
            <h3 className="text-2xl font-heading font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
              {project.title}
            </h3>
            <span className="text-sm font-mono text-[var(--color-muted)] border border-[var(--color-border)] px-2 py-1 rounded shrink-0">
              {project.year}
            </span>
          </div>

          <p className="text-[var(--color-muted)] text-body line-clamp-2 mb-6 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t: string) => (
              <span key={t} className="text-xs font-medium px-2.5 py-1 rounded bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mt-auto pt-4 border-t border-[var(--color-border)]/50">
            View project 
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
