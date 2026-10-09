import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Project, getVisibleProjects } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';

export function ProjectNav({ currentProjectSlug }: { currentProjectSlug: string }) {
  const projects = getVisibleProjects();
  if (projects.length <= 1) return null;

  const currentIndex = projects.findIndex(p => p.slug === currentProjectSlug);
  if (currentIndex === -1) return null;

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  return (
    <div className="mt-32 pt-16 border-t border-[var(--color-border)]">
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Link href={`/projects/${prevProject.slug}`} className="group flex flex-col items-start gap-3 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/50 transition-all">
            <span className="text-sm font-semibold text-[var(--color-muted)] tracking-widest uppercase flex items-center gap-2">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Previous
            </span>
            <div>
              <h4 className="text-xl font-heading font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {prevProject.title}
              </h4>
              <p className="text-sm text-[var(--color-muted)] line-clamp-1 mt-1">
                {prevProject.tagline}
              </p>
            </div>
          </Link>

          <Link href={`/projects/${nextProject.slug}`} className="group flex flex-col items-end text-right gap-3 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/50 transition-all">
            <span className="text-sm font-semibold text-[var(--color-muted)] tracking-widest uppercase flex items-center gap-2">
              Next
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div>
              <h4 className="text-xl font-heading font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {nextProject.title}
              </h4>
              <p className="text-sm text-[var(--color-muted)] line-clamp-1 mt-1">
                {nextProject.tagline}
              </p>
            </div>
          </Link>

        </div>
      </Reveal>
    </div>
  );
}
