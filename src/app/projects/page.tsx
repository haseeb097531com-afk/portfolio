import React from 'react';
import Link from 'next/link';
import { getVisibleProjects } from '@/data/site';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata = {
  title: 'Projects | Hafiz Muhammad Haseeb',
  description: 'A selection of projects, websites, and applications I have built.',
};

export default function ProjectsIndexPage() {
  const projects = getVisibleProjects();

  return (
    <main className="min-h-screen pt-32 pb-24 container-max">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors mb-8"
      >
        ← Home
      </Link>
      
      <SectionTitle 
        label="PORTFOLIO"
        title="All Projects"
        subtext="Everything I've built and shipped that is ready to show."
      />

      {projects.length === 0 ? (
        <div className="mt-24 text-center flex flex-col items-center">
          <p className="text-xl text-[var(--color-muted)] mb-8">No projects yet.</p>
          <Link 
            href="/"
            className="px-6 py-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:border-[var(--color-accent)]/50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} featured={project.featured} />
          ))}
        </div>
      )}
    </main>
  );
}
