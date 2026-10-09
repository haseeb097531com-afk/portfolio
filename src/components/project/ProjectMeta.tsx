import React from 'react';
import { Project } from '@/data/site';
import { StatusBadge } from './StatusBadge';
import { TechChip } from './TechChip';

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl">
      <div className="flex flex-wrap items-center gap-4 text-[var(--color-muted)] text-sm md:text-base">
        <StatusBadge status={project.status} />
        <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
        <span className="font-medium text-[var(--color-text)]">{project.role}</span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
        <span className="font-mono">{project.year}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <TechChip key={t} tag={t} />
        ))}
      </div>
    </div>
  );
}
