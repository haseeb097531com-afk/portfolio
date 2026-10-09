"use client";

import React from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function DesignTestPage() {
  return (
    <div className="min-h-screen relative pt-32">
      {/* Test content block */}
      <div className="container-max flex flex-col gap-32 pb-32">
        <section id="about" className="min-h-[100vh] flex flex-col justify-center gap-8">
          <SectionTitle 
            label="About Section" 
            title="Who Am I" 
            subtext="Testing the active link highlighting and smooth scroll." 
          />
          <div className="h-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
            <p className="text-body text-[var(--color-muted)]">Content for about section...</p>
          </div>
        </section>

        <section id="services" className="min-h-[100vh] flex flex-col justify-center gap-8">
          <SectionTitle 
            label="Services Section" 
            title="What I Do" 
          />
          <div className="h-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
            <p className="text-body text-[var(--color-muted)]">Content for services section...</p>
          </div>
        </section>

        <section id="projects" className="min-h-[100vh] flex flex-col justify-center gap-8">
          <SectionTitle 
            label="Projects Section" 
            title="My Work" 
          />
          <div className="h-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
            <p className="text-body text-[var(--color-muted)]">Content for projects section...</p>
          </div>
        </section>

        <section id="academy" className="min-h-[100vh] flex flex-col justify-center gap-8">
          <SectionTitle 
            label="Academy Section" 
            title="Learn With Me" 
          />
          <div className="h-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
            <p className="text-body text-[var(--color-muted)]">Content for academy section...</p>
          </div>
        </section>

        <section id="contact" className="min-h-[100vh] flex flex-col justify-center gap-8">
          <SectionTitle 
            label="Contact Section" 
            title="Get In Touch" 
          />
          <div className="h-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
            <p className="text-body text-[var(--color-muted)]">Content for contact section...</p>
          </div>
        </section>
      </div>
    </div>
  );
}
