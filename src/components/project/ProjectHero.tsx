import React from 'react';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectMeta } from './ProjectMeta';

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-12 mt-12 md:mt-24">
      <Reveal>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[var(--color-text)] leading-tight max-w-4xl">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-muted)] font-light max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <ProjectMeta project={project} />
      </Reveal>

      <Reveal delay={0.3}>
        <div className="flex flex-wrap items-center gap-4 pt-6">
          {project.links.live && (
            <a 
              href={project.links.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)] text-black font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,252,219,0.4)]"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
          {project.links.demo && (
            <a 
              href={project.links.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)] text-black font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,252,219,0.4)]"
            >
              <ExternalLink size={18} /> Watch Demo
            </a>
          )}
          {project.links.github && (
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-[var(--color-accent)]/50 text-[var(--color-accent)] font-semibold tracking-wide transition-all duration-300 hover:bg-[var(--color-accent)]/10 hover:shadow-[0_0_15px_rgba(10,252,219,0.2)]"
            >
              <Github size={18} /> View Code
            </a>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="relative w-full aspect-[16/10] md:aspect-[2/1] mt-8 rounded-2xl md:rounded-[2rem] overflow-hidden border border-[var(--color-border)] shadow-2xl bg-[var(--color-surface)]">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={`${project.title} Hero Image`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] flex items-center justify-center p-6">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <span className="text-5xl md:text-9xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-text)] to-[var(--color-muted)] opacity-20">
                {project.title.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
