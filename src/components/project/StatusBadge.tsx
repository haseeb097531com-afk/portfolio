import React from 'react';
import { Project } from '@/data/site';

export function StatusBadge({ status }: { status: Project['status'] }) {
  const config = {
    live: { color: "bg-teal-500", label: "Live" },
    wip: { color: "bg-amber-500", label: "Work in Progress" },
    archived: { color: "bg-gray-500", label: "Archived" }
  };

  const { color, label } = config[status] || config.wip;

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)]">
      <span className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
      {label}
    </span>
  );
}
