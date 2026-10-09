"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrev();
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, closeLightbox, goToNext, goToPrev]);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-24">
      <Reveal>
        <h3 className="text-2xl font-heading font-bold text-[var(--color-text)] mb-8 border-b border-[var(--color-border)] pb-4">
          Gallery
        </h3>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((src, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <button
              onClick={() => openLightbox(index)}
              className="w-full relative aspect-video rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] cursor-pointer group"
              aria-label={`View ${title} screenshot ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image viewer`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeLightbox}
            />

            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            <div className="absolute top-6 left-6 md:top-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/50 text-white font-mono text-sm border border-white/10 backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </div>

            <button
              onClick={goToPrev}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] hidden md:flex"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] hidden md:flex"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-40 w-full h-full max-w-[95vw] max-h-[90vh] flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) goToNext();
                else if (swipe > 50) goToPrev();
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[currentIndex]}
                  alt={`${title} screenshot ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="95vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
