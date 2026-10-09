"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData, getVisibleProjects } from '@/data/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';

export function Projects() {
  const [filter, setFilter] = useState("All");

  const projects = getVisibleProjects();
  if (projects.length === 0) return null;
  
  const allTags = projects.flatMap(p => p.tech);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const sortedTags = Object.keys(tagCounts).sort((a, b) => {
    if (tagCounts[b] !== tagCounts[a]) {
      return tagCounts[b] - tagCounts[a];
    }
    return a.localeCompare(b);
  });
  
  const topTags = ["All", ...sortedTags.slice(0, 4)];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.tech.includes(filter));

  return (
    <section id="projects" className="section-spacing container-max">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
        <SectionTitle 
          label={siteData.projects.label}
          title={siteData.projects.heading}
          subtext={siteData.projects.subtext}
        />

        {projects.length >= 3 && (
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {topTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === tag 
                      ? 'bg-[var(--color-accent)] text-black shadow-[0_0_15px_var(--color-accent-glow)]' 
                      : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              <Reveal delay={index * 0.1} width="100%">
                <ProjectCard project={project} featured={project.featured} />
              </Reveal>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
