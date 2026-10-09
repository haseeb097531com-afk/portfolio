import React from 'react';

export function TechChip({ tag }: { tag: string }) {
  return (
    <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]/50 transition-colors">
      {tag}
    </span>
  );
}
