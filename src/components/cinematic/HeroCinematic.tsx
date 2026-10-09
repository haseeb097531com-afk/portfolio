"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { siteData } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { useMotionSafe } from '@/lib/useMotionSafe';

const SPLIT_TEXT_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.8 },
  },
};

const SPLIT_TEXT_CHILD = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroCinematic() {
  const prefersReducedMotion = useMotionSafe();
  const { scrollY } = useScroll();

  // Scroll-linked motion
  const heroY = useTransform(scrollY, [0, 800], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.3]);
  const bgParallax = useTransform(scrollY, [0, 800], [0, 100]);
  const hintOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const firstName = siteData.hero.name.split(' ').slice(0, 2).join(' ').split('');
  const lastName = siteData.hero.name.split(' ').slice(2).join(' ').split('');

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[var(--color-background)]">
        {/* Animated Gradient Orbs */}
        {!prefersReducedMotion && (
          <>
            <motion.div 
              className="absolute top-1/4 -right-1/4 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[var(--color-accent)] opacity-[0.08] blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[80px]"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 40, 0],
                y: [0, -40, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
            />
          </>
        )}
        {prefersReducedMotion && (
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[100px]" />
        )}
        
        {/* CSS Parallax Grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            y: bgParallax,
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-background)]" />
      </div>

      <motion.div 
        className="container-max relative z-10 w-full"
        style={{ y: prefersReducedMotion ? 0 : heroY, opacity: prefersReducedMotion ? 1 : heroOpacity }}
      >
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[var(--color-accent)] font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6"
          >
            // {siteData.hero.eyebrow}
          </motion.div>
          
          <motion.h1 
            className="font-heading text-hero leading-[1.05] mb-6 flex flex-col uppercase tracking-tight"
            variants={prefersReducedMotion ? {} : SPLIT_TEXT_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden flex justify-center">
              {firstName.map((char, i) => (
                <motion.span key={i} variants={SPLIT_TEXT_CHILD} className={char === ' ' ? 'w-[0.25em]' : ''}>
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-muted)]">
              {lastName.map((char, i) => (
                <motion.span key={i} variants={SPLIT_TEXT_CHILD} className={char === ' ' ? 'w-[0.25em]' : ''}>
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-mono text-xs md:text-sm text-[var(--color-muted)] mb-8 tracking-widest"
          >
            // {siteData.hero.roles.join(' · ').toUpperCase()}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-body text-[var(--color-muted)] max-w-xl mx-auto mb-12 leading-relaxed"
          >
            {siteData.hero.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button href={siteData.hero.primaryCta.href} variant="primary" data-cursor="hover" data-cursor-label="HIRE">
              {siteData.hero.primaryCta.label}
            </Button>
            <Button href={siteData.hero.secondaryCta.href} variant="ghost" data-cursor="hover" data-cursor-label="VIEW">
              {siteData.hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: hintOpacity }}
      >
        <motion.div 
          className="font-mono text-[10px] text-[var(--color-muted)] tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          SCROLL
        </motion.div>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
        />
      </motion.div>
    </section>
  );
}
