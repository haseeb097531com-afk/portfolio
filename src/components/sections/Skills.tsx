"use client";

import React, { useEffect, useState } from 'react';
import { 
  Code, Layout, FileJson, Blocks, Triangle, Wind, Server, GitBranch, 
  PenTool, Image as ImageIcon, Brush, Scissors, Clapperboard, 
  Calendar, Clock, BarChart, Sparkles
} from 'lucide-react';
import { siteData } from '@/data/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

const iconMap: Record<string, React.ReactNode> = {
  'code': <Code size={16} />,
  'layout': <Layout size={16} />,
  'file-json': <FileJson size={16} />,
  'blocks': <Blocks size={16} />,
  'triangle': <Triangle size={16} />,
  'wind': <Wind size={16} />,
  'server': <Server size={16} />,
  'git-branch': <GitBranch size={16} />,
  'pen-tool': <PenTool size={16} />,
  'image': <ImageIcon size={16} />,
  'brush': <Brush size={16} />,
  'scissors': <Scissors size={16} />,
  'clapperboard': <Clapperboard size={16} />,
  'calendar': <Calendar size={16} />,
  'clock': <Clock size={16} />,
  'bar-chart': <BarChart size={16} />
};

function Chip({ name, icon }: { name: string, icon: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_0_15px_var(--color-accent-glow)] whitespace-nowrap cursor-default">
      {iconMap[icon] && <span className="text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">{iconMap[icon]}</span>}
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

export function Skills() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const allSkills = siteData.skills.categories.flatMap(cat => cat.items);
  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  // Helper to render multiple copies for the seamless loop
  const renderStrip = (items: typeof allSkills) => (
    <>
      <div className="flex gap-4 px-2">
        {items.map((skill, i) => <Chip key={`orig-${i}`} name={skill.name} icon={skill.icon} />)}
      </div>
      <div className="flex gap-4 px-2">
        {items.map((skill, i) => <Chip key={`dup1-${i}`} name={skill.name} icon={skill.icon} />)}
      </div>
      <div className="flex gap-4 px-2">
        {items.map((skill, i) => <Chip key={`dup2-${i}`} name={skill.name} icon={skill.icon} />)}
      </div>
      <div className="flex gap-4 px-2">
        {items.map((skill, i) => <Chip key={`dup3-${i}`} name={skill.name} icon={skill.icon} />)}
      </div>
    </>
  );

  return (
    <section id="skills" className="section-spacing overflow-hidden">
      <div className="container-max mb-16 lg:mb-24">
        <SectionTitle 
          label={siteData.skills.label}
          title={siteData.skills.heading}
        />
      </div>

      {/* Marquee Section */}
      <div className="w-full relative py-8 mb-16 lg:mb-24 flex flex-col gap-6">
        {/* Faded edges mask */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[var(--color-background)] via-transparent to-[var(--color-background)] w-full h-full" />
        
        {prefersReducedMotion ? (
          <div className="container-max flex flex-wrap gap-4 justify-center relative z-20">
            {allSkills.map((skill, i) => (
              <Chip key={i} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        ) : (
          <>
            {/* Strip 1 */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] relative z-20">
              {renderStrip(row1)}
            </div>
            
            {/* Strip 2 */}
            <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] relative z-20">
              {renderStrip(row2)}
            </div>
          </>
        )}
      </div>

      {/* Categories Grid */}
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteData.skills.categories.map((category, index) => (
            <Reveal key={category.title} delay={0.1 * index}>
              <Card className="h-full flex flex-col gap-8 p-8">
                <h3 className="text-2xl font-heading font-bold text-[var(--color-text)]">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3 mt-auto group-chips">
                  {category.items.map(item => (
                    <Chip key={item.name} name={item.name} icon={item.icon} />
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* AI Note */}
        {siteData.skills.aiNote && (
          <Reveal delay={0.6}>
            <div className="mt-16 flex items-center justify-center gap-2 text-[var(--color-muted)] text-sm font-medium">
              <Sparkles size={16} className="text-[var(--color-accent)] shrink-0" />
              <p className="text-center">{siteData.skills.aiNote}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
