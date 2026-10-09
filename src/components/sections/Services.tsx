"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { siteData } from '@/data/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function Services() {
  const [openId, setOpenId] = useState<string>(siteData.services.items[0].id);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section id="services" className="section-spacing container-max">
      <div className="mb-16 lg:mb-24">
        <SectionTitle 
          label={siteData.services.label}
          title={siteData.services.heading}
          subtext={siteData.services.subtext}
        />
      </div>

      <div className="flex flex-col border-t border-[var(--color-border)]">
        {siteData.services.items.map((service, index) => {
          const isOpen = openId === service.id;

          return (
            <Reveal key={service.id} delay={0.1 * index} width="100%">
              <div 
                className={`group border-b border-[var(--color-border)] transition-colors duration-500 relative overflow-hidden ${
                  isOpen ? 'bg-[var(--color-surface)]/50' : 'hover:bg-[var(--color-surface)]/30'
                }`}
                onMouseEnter={() => {
                  // On desktop hover, open it if not a touch device
                  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                    setOpenId(service.id);
                  }
                }}
              >
                {/* Background sweep effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <button 
                  onClick={() => toggleOpen(service.id)}
                  className="w-full text-left py-8 md:py-12 px-4 md:px-8 flex items-center justify-between relative z-10 focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`service-content-${service.id}`}
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-4xl md:text-5xl font-heading font-black text-[var(--color-border)] group-hover:text-[var(--color-accent)]/20 transition-colors duration-500">
                      {service.number}
                    </span>
                    <h3 className={`text-2xl md:text-4xl font-heading font-bold transition-all duration-500 ${
                      isOpen ? 'text-[var(--color-accent)] translate-x-2' : 'text-[var(--color-text)] group-hover:text-[var(--color-accent)] group-hover:translate-x-2'
                    }`}>
                      {service.title}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                    isOpen 
                      ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10 rotate-90' 
                      : 'border-[var(--color-border)] text-[var(--color-muted)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] rotate-0'
                  }`}>
                    {isOpen ? <X size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-content-${service.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 px-4 md:px-8 md:pl-[120px] flex flex-col lg:flex-row gap-8 lg:gap-16 items-start relative z-10">
                        <div className="flex-1">
                          <p className="text-body text-[var(--color-muted)] mb-6 text-lg">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-8">
                            {service.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] group-hover:border-[var(--color-accent)]/30 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:items-end lg:min-w-[200px]">
                          <p className="text-sm text-[var(--color-muted)] font-medium tracking-wide uppercase">
                            {siteData.services.pricingNote}
                          </p>
                          <a 
                            href="#contact" 
                            className="text-sm font-semibold text-[var(--color-accent)] hover:brightness-125 transition-colors flex items-center gap-2 group/link"
                          >
                            Get this service
                            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-16 lg:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-[80px] pointer-events-none" />
          <h3 className="text-h3 text-[var(--color-text)] text-center sm:text-left relative z-10">
            {siteData.services.ctaText}
          </h3>
          <Button href="#contact" variant="primary" className="relative z-10 whitespace-nowrap">
            Start a Project
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
