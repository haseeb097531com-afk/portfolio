import React from 'react';

export function AvailabilityPill({ text }: { text: string }) {
  if (!text) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] mb-8">
      <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
      {text}
    </div>
  );
}
