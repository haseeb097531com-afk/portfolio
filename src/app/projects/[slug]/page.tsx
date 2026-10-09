import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getVisibleProjects } from '@/data/site';
import { ProjectHero } from '@/components/project/ProjectHero';
import { ProjectFeatures } from '@/components/project/ProjectFeatures';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ProjectNav } from '@/components/project/ProjectNav';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export async function generateStaticParams() {
  const projects = getVisibleProjects();
  if (projects.length === 0) return [{ slug: 'placeholder-project' }];
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = getVisibleProjects();
  const project = projects.find(p => p.slug === slug);
  
  if (!project) return notFound();

  return {
    title: `${project.title} | Hafiz Muhammad Haseeb`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnail],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.thumbnail],
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = getVisibleProjects();
  const project = projects.find(p => p.slug === slug);

  if (!project) return notFound();

  const overviewParagraphs = project.longDescription.split('\n\n').filter(p => p.trim() !== '');

  return (
    <main className="min-h-screen pt-32 pb-24">
      <ScrollToTop />
      
      <div className="container-max">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors mb-4"
        >
          ← All projects
        </Link>
        
        <ProjectHero project={project} />

        <div className="mt-16 md:mt-24 max-w-3xl">
          <Reveal>
            <h3 className="text-2xl font-heading font-bold text-[var(--color-text)] mb-8 border-b border-[var(--color-border)] pb-4">
              Overview
            </h3>
            <div className="flex flex-col gap-6 text-lg text-[var(--color-muted)] leading-relaxed font-light">
              {overviewParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <ProjectFeatures features={project.features} />
        
        <ProjectGallery images={project.images} title={project.title} />

        <ProjectNav currentProjectSlug={project.slug} />

        {/* Bottom CTA */}
        <div className="mt-24 pt-12 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/projects"
            className="px-8 py-4 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:border-[var(--color-accent)]/50 transition-colors whitespace-nowrap"
          >
            Back to all projects
          </Link>
          <Link 
            href="/#contact"
            className="px-8 py-4 rounded-full bg-[var(--color-accent)] text-black font-semibold tracking-wide transition-all hover:shadow-[0_0_20px_rgba(10,252,219,0.4)] whitespace-nowrap"
          >
            Hire me
          </Link>
        </div>
      </div>
    </main>
  );
}
