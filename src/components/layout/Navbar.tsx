"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteData } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { useActiveSection } from '@/lib/useActiveSection';
import { useMotionSafe } from '@/lib/useMotionSafe';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useMotionSafe();

  // Extract IDs from nav links (e.g. "#about" -> "about")
  const sectionIds = siteData.navLinks.map(link => link.href.replace('#', ''));
  const activeId = useActiveSection(sectionIds);
  const activeSection = activeId ? `#${activeId}` : '#top';

  const { scrollY } = useScroll();
  
  // Header background opacity based on scroll
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const py = useTransform(scrollY, [0, 80], ["1.5rem", "1rem"]); // py-6 to py-4

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingBottom: py, paddingTop: py }}
        className="fixed top-0 left-0 right-0 z-40 w-full"
      >
        <motion.div 
          className="absolute inset-0 bg-[var(--color-background)] backdrop-blur-md border-b border-[var(--color-border)]"
          style={{ opacity: bgOpacity, borderBottomColor: `rgba(255, 255, 255, ${useTransform(borderOpacity, v => v * 0.08).get()})` }}
        />

        <div className="container-max flex items-center justify-between relative z-10">
          <a
            href="#top"
            className="text-h3 font-heading font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors z-50 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
          >
            HMH
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {siteData.navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded px-1 ${
                      isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      } ${prefersReducedMotion ? 'hidden' : ''}`}
                    />
                  </a>
                );
              })}
            </div>
            <Button href={siteData.cta.link} variant="primary" className="py-2 px-5 text-sm">
              {siteData.cta.label}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors z-50 relative p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {siteData.navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-h2 font-heading font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded px-2 ${
                    activeSection === link.href
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + siteData.navLinks.length * 0.1, duration: 0.5 }}
                className="mt-4"
              >
                <Button href={siteData.cta.link} variant="primary" onClick={() => setMobileMenuOpen(false)}>
                  {siteData.cta.label}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
