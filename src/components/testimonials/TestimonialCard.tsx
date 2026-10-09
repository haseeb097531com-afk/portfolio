import React from 'react';
import { Quote } from 'lucide-react';
import { TestimonialItem } from '@/data/site';
import { Avatar } from './Avatar';
import { StarRating } from './StarRating';
import { SourceBadge } from './SourceBadge';

type Props = {
  item: TestimonialItem;
};

export function TestimonialCard({ item }: Props) {
  const parts = [item.role, item.location].filter(Boolean);
  const subtitle = parts.join(' · ');

  return (
    <article className={`relative flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${item.featured ? 'md:p-10' : ''}`}>
      
      {item.featured && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)]/10 blur-2xl rounded-full -z-10 pointer-events-none" aria-hidden="true" />
      )}

      <Quote size={28} className="text-[var(--color-accent)] opacity-20 mb-4" aria-hidden="true" />
      
      <p className="text-base md:text-lg text-[var(--color-text)] leading-relaxed font-light mb-6 flex-grow">
        "{item.quote}"
      </p>

      {item.rating && item.rating >= 1 && (
        <div className="mb-6">
          <StarRating rating={item.rating} />
        </div>
      )}

      <hr className="border-[var(--color-border)] mb-6" aria-hidden="true" />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Avatar avatar={item.avatar} name={item.name} />
          
          <div className="flex flex-col min-w-0">
            <h4 className="font-semibold text-[var(--color-text)] truncate">
              {item.name}
            </h4>
            {subtitle && (
              <p className="text-xs text-[var(--color-muted)] truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          {item.source && (
            <SourceBadge source={item.source} sourceLink={item.sourceLink} />
          )}
          {item.date && (
            <time className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
              {item.date}
            </time>
          )}
        </div>
      </div>
      
    </article>
  );
}
