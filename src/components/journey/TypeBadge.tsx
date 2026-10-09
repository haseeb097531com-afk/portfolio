import React from 'react';
import { GraduationCap, Briefcase, Medal, BookOpen } from 'lucide-react';
import { JourneyItem } from '@/data/site';

const config = {
  education: { icon: GraduationCap, color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  course: { icon: BookOpen, color: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
  work: { icon: Briefcase, color: "text-[var(--color-accent)] bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20" },
  milestone: { icon: Medal, color: "text-amber-400 bg-amber-400/10 border-amber-400/20" }
};

export function TypeBadge({ type }: { type: JourneyItem['type'] }) {
  const { icon: Icon, color } = config[type] || config.milestone;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${color}`}>
      <Icon size={14} />
      {type}
    </span>
  );
}
