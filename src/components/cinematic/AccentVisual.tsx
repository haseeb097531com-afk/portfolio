"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '@/data/site';
import { useMotionSafe } from '@/lib/useMotionSafe';

export function AccentVisual() {
  const [shouldRender, setShouldRender] = useState(false);
  const prefersReducedMotion = useMotionSafe();

  useEffect(() => {
    if (!siteData.cinematic.enabled || !siteData.cinematic.accentVisual) return;
    setShouldRender(true);
  }, []);

  if (!shouldRender) return null;

  const type = siteData.cinematic.accentVisualType;

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center relative pointer-events-none" aria-hidden="true">
      {type === 'cube' && <CssCube prefersReducedMotion={prefersReducedMotion} />}
      {type === 'wireframe' && <SvgWireframe prefersReducedMotion={prefersReducedMotion} />}
      {type === 'particles' && <CanvasParticles prefersReducedMotion={prefersReducedMotion} />}
    </div>
  );
}

function CssCube({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseRot, setMouseRot] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMouseRot({ x: -y * 15, y: x * 15 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="perspective-1000 w-32 h-32 relative">
      <motion.div 
        className="w-full h-full relative preserve-3d"
        animate={prefersReducedMotion ? {} : { rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={prefersReducedMotion ? {} : { transform: `rotateX(${mouseRot.x}deg) rotateY(${mouseRot.y}deg)` }}
      >
        {/* CSS Cube Faces */}
        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, i) => {
          let transform = '';
          if (face === 'front') transform = 'translateZ(64px)';
          if (face === 'back') transform = 'rotateY(180deg) translateZ(64px)';
          if (face === 'right') transform = 'rotateY(90deg) translateZ(64px)';
          if (face === 'left') transform = 'rotateY(-90deg) translateZ(64px)';
          if (face === 'top') transform = 'rotateX(90deg) translateZ(64px)';
          if (face === 'bottom') transform = 'rotateX(-90deg) translateZ(64px)';

          return (
            <div 
              key={i}
              className="absolute inset-0 border border-[var(--color-accent)] opacity-30 bg-[var(--color-accent)]/5"
              style={{ transform, backfaceVisibility: 'visible' }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

function SvgWireframe({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <motion.div 
      className="w-48 h-48 opacity-40 text-[var(--color-accent)]"
      style={{ rotate: prefersReducedMotion ? 0 : rotate }}
      animate={prefersReducedMotion ? {} : { rotateZ: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="50" cy="50" r="40" />
        <ellipse cx="50" cy="50" rx="40" ry="15" />
        <ellipse cx="50" cy="50" rx="15" ry="40" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <line x1="50" y1="10" x2="50" y2="90" />
      </svg>
    </motion.div>
  );
}

function CanvasParticles({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isVisible = false;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 200,
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    let animationId: number;

    const render = () => {
      if (!isVisible || prefersReducedMotion) {
        if (!prefersReducedMotion) animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, 200, 200);
      ctx.fillStyle = '#0AFCDB';
      ctx.strokeStyle = 'rgba(10, 252, 219, 0.15)';
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > 200) p.vx *= -1;
        if (p.y < 0 || p.y > 200) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 40) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      ctx.fillStyle = '#0AFCDB';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      render();
    }

    return () => {
      observer.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} width={200} height={200} className="w-[200px] h-[200px] opacity-70" />;
}
