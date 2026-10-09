"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mouse, ChevronDown } from 'lucide-react';
import { siteData } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { StatCounter } from '@/components/ui/StatCounter';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { SocialLinks } from '@/components/ui/SocialLinks';

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.src = siteData.hero.photo;
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteData.hero.roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
  };

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-background)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] repeat" />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/10 blur-[120px] rounded-full pointer-events-none"
          animate={{ x: `calc(-50% + ${mousePosition.x * 20}px)`, y: `calc(-50% + ${mousePosition.y * 20}px)` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Fixed Social Links for Desktop */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-30">
        <SocialLinks />
      </div>

      <div className="container-max relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-12 lg:py-24">
        {/* Left Content */}
        <motion.div 
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:pl-16 xl:pl-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-[var(--color-accent)] font-semibold tracking-widest text-xs md:text-sm uppercase mb-4 md:mb-6">
            {siteData.hero.eyebrow}
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="text-hero leading-[1.1] mb-4 md:mb-6 flex flex-col">
            <span className="block">{siteData.hero.name.split(' ').slice(0, 2).join(' ')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-muted)]">
              {siteData.hero.name.split(' ').slice(2).join(' ')}
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="h-8 md:h-10 mb-6 md:mb-8 flex items-center justify-center lg:justify-start overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
                transition={{ duration: 0.5 }}
                className="text-h3 text-[var(--color-muted)]"
              >
                {siteData.hero.roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.p variants={itemVariants} className="text-body font-medium text-[var(--color-text)] mb-4 max-w-2xl">
            {siteData.hero.tagline}
          </motion.p>
          
          <motion.p variants={itemVariants} className="text-body text-[var(--color-muted)] mb-8 md:mb-12 max-w-xl">
            {siteData.hero.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 lg:mb-14">
            <div className="flex gap-4">
              <Button href={siteData.hero.primaryCta.href} variant="primary">
                {siteData.hero.primaryCta.label}
              </Button>
              <Button href={siteData.hero.secondaryCta.href} variant="outline">
                {siteData.hero.secondaryCta.label}
              </Button>
            </div>
            <div className="sm:ml-2">
              <Button href={siteData.hero.whatsapp.href} variant="ghost" className="gap-2">
                <MessageCircle size={18} />
                {siteData.hero.whatsapp.label}
              </Button>
            </div>
          </motion.div>

          {/* Social Links Mobile */}
          <motion.div variants={itemVariants} className="lg:hidden mb-12">
            <SocialLinks mobile={true} />
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start gap-6 sm:gap-10 border-t border-[var(--color-border)] pt-8 w-full max-w-2xl">
            {siteData.stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
                {i < siteData.stats.length - 1 && siteData.stats[i + 1].value > 0 && (
                  <div className="w-[1px] bg-[var(--color-border)] min-h-[40px]" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Photo */}
        <motion.div 
          className="flex-1 w-full max-w-[280px] md:max-w-[360px] lg:max-w-[460px] mx-auto lg:mx-0 relative mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="relative aspect-square w-full"
            animate={{ x: mousePosition.x * -15, y: mousePosition.y * -15 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <div className="absolute inset-0 bg-[var(--color-accent)]/20 blur-3xl rounded-full" />
            
            <motion.div 
              className="relative w-full h-full rounded-[2rem] overflow-hidden border border-[var(--color-border)] shadow-2xl bg-[var(--color-surface)]"
              animate={prefersReducedMotion ? {} : { y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              {imageExists ? (
                <img 
                  src={siteData.hero.photo} 
                  alt={siteData.hero.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface)] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent -z-10" />
                  <span className="text-6xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-text)] to-[var(--color-muted)]">
                    HMH
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Rotating Badge */}
          <div className="absolute -bottom-8 -left-8 z-20">
            <RotatingBadge text={siteData.badgeText} />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a 
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Mouse size={24} />
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
