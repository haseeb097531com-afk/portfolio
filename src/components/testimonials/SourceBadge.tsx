import React from 'react';

type Props = {
  source: string;
  sourceLink?: string;
};

export function SourceBadge({ source, sourceLink }: Props) {
  if (!source) return null;

  const content = (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)]">
      {source}
    </span>
  );

  if (sourceLink) {
    return (
      <a 
        href={sourceLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label={`View review on ${source}`}
        className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-full block"
      >
        {content}
      </a>
    );
  }

  return content;
}
