"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check } from 'lucide-react';
import { siteData } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { StatCounter } from '@/components/ui/StatCounter';

export function Academy() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const academy = siteData.academy;
  const showPrimaryCta = academy.cta.href && academy.cta.href !== "#";
  const showSecondaryCta = academy.secondaryCta.href && academy.secondaryCta.href !== "#";

  return (
    <section id="academy" className="section-spacing container-max py-12 md:py-24">
      <div className="relative w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-gradient-to-br from-[#022c22] to-[#064e3b] border border-emerald-900 shadow-2xl p-6 md:p-12 lg:p-16">
        
        {/* Background Islamic Pattern (SVG) */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Slow Drifting Glow */}
        <motion.div 
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full"
          animate={prefersReducedMotion ? {} : { 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wider text-xs md:text-sm uppercase mb-6 md:mb-8 backdrop-blur-sm">
              {academy.label}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              {academy.name}
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h3 className="text-xl md:text-2xl text-emerald-200 font-medium mb-6">
              {academy.heading}
            </h3>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-emerald-100/70 max-w-2xl mx-auto text-base md:text-lg mb-16">
              {academy.description}
            </p>
          </Reveal>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16 lg:mb-24 text-left">
            {academy.courses.map((course, idx) => (
              <Reveal key={course.title} delay={0.4 + (idx * 0.1)} width="100%">
                <Card className="h-full bg-emerald-950/40 border-emerald-800/50 hover:border-emerald-500/50 hover:bg-emerald-900/40 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen size={24} />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-emerald-50 mb-3">
                    {course.title}
                  </h4>
                  <p className="text-sm text-emerald-200/70 leading-relaxed">
                    {course.text}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-16 lg:gap-8 border-t border-emerald-800/50 pt-16 mb-16">
            
            {/* Features Checklist */}
            <div className="flex-1 w-full text-left">
              <Reveal delay={0.5}>
                <h4 className="text-2xl font-heading font-bold text-emerald-50 mb-8 text-center lg:text-left">
                  Why join us?
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-x-8">
                  {academy.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Check size={14} />
                      </div>
                      <span className="text-emerald-100/90 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Stats */}
            <div className="w-full lg:w-auto">
              <Reveal delay={0.7}>
                <div className="flex justify-center lg:justify-end gap-10 lg:pl-16 lg:border-l border-emerald-800/50 h-full items-center">
                  {academy.stats.map((stat, i) => (
                    <React.Fragment key={stat.label}>
                      <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
                      {i < academy.stats.length - 1 && academy.stats[i + 1].value > 0 && (
                        <div className="w-[1px] h-16 bg-emerald-800/50 hidden sm:block" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Buttons */}
          <Reveal delay={0.9}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {showPrimaryCta && (
                <a 
                  href={academy.cta.href}
                  className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] whitespace-nowrap"
                >
                  {academy.cta.label}
                </a>
              )}
              {showSecondaryCta && (
                <a 
                  href={academy.secondaryCta.href}
                  className="px-8 py-4 rounded-full bg-transparent border border-emerald-500/50 hover:bg-emerald-900/50 text-emerald-300 font-semibold tracking-wide transition-all duration-300 whitespace-nowrap"
                >
                  {academy.secondaryCta.label}
                </a>
              )}
            </div>
          </Reveal>
          
        </div>
      </div>
    </section>
  );
}
