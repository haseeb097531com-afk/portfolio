"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Video, Smartphone } from 'lucide-react';
import { siteData } from '@/data/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { AccentVisual } from '@/components/cinematic/AccentVisual';

const iconMap: Record<string, React.ReactNode> = {
  code: <Code size={24} />,
  palette: <Palette size={24} />,
  video: <Video size={24} />,
  smartphone: <Smartphone size={24} />
};

export function About() {
  const [imageExists, setImageExists] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.src = siteData.hero.photo;
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
  }, []);

  return (
    <section id="about" className="section-spacing container-max relative">
      {/* Animated Accent Line next to heading */}
      <motion.div 
        className="absolute left-6 lg:left-8 top-32 w-[2px] bg-[var(--color-accent)] hidden md:block"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 100, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />

      <div className="md:pl-10 mb-16 lg:mb-24">
        <SectionTitle 
          label={siteData.about.label}
          title={siteData.about.heading}
          animateWords={true}
          className="max-w-3xl"
        />
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-24">
        {/* Left: Portrait Card */}
        <div className="w-full lg:w-5/12 xl:w-1/3 order-1 lg:order-none">
          <Reveal delay={0.2} width="100%">
            <div className="relative aspect-[4/5] w-full max-w-[400px] mx-auto lg:mx-0 rounded-2xl p-1 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-surface)] shadow-[0_0_30px_var(--color-accent-glow)]">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-[var(--color-surface)] relative">
                {imageExists ? (
                  <img 
                    src={siteData.hero.photo} 
                    alt={siteData.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface)]">
                    <span className="text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-text)] to-[var(--color-muted)] opacity-50">
                      HMH
                    </span>
                  </div>
                )}
                
                {/* Floating "Open to work" Label */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-6 md:bottom-10 bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-2 rounded-full flex items-center gap-3 shadow-xl backdrop-blur-md">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-sm font-medium tracking-wide">Open to work</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Paragraphs and Facts */}
        <div className="w-full lg:w-7/12 xl:w-2/3 flex flex-col gap-8 order-2 lg:order-none relative">
          
          <div className="absolute -top-20 -right-10 w-48 h-48 opacity-50 pointer-events-none md:pointer-events-auto z-0 hidden lg:block">
            <AccentVisual />
          </div>

          <Reveal delay={0.4}>
            <div className="flex flex-col gap-6 text-body text-[var(--color-muted)] leading-relaxed relative z-10">
              {siteData.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--color-border)] mt-4 relative z-10">
              {siteData.about.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold">
                    {fact.label}
                  </span>
                  <span className="text-[var(--color-text)] font-medium">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Expertise Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteData.about.highlights.map((item, i) => (
          <Reveal key={item.title} delay={0.2 + (i * 0.1)}>
            <Card className="h-full flex flex-col group relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] mb-6 group-hover:scale-110 transition-transform duration-300">
                {iconMap[item.icon]}
              </div>
              <h3 className="text-xl font-heading font-bold text-[var(--color-text)] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">
                {item.text}
              </p>
              
              <div className="absolute -bottom-4 -right-2 text-7xl font-heading font-black text-[var(--color-text)] opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] group-hover:-translate-y-2 transition-all duration-500">
                0{i + 1}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      {siteData.mission && (
        <Reveal delay={0.6}>
          <div className="mt-24 text-center px-4 max-w-4xl mx-auto">
            <span className="text-4xl text-[var(--color-accent)] font-serif leading-none block mb-4">"</span>
            <p className="text-xl md:text-3xl text-[var(--color-muted)] font-heading italic font-light leading-relaxed">
              {siteData.mission}
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}
