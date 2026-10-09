import React from 'react';
import { Star } from 'lucide-react';

export function StarRating({ rating }: { rating: number }) {
  if (rating < 1) return null;
  const maxStars = 5;
  const filledStars = Math.min(Math.max(rating, 1), 5);

  return (
    <div 
      className="flex items-center gap-1 text-[var(--color-accent)]" 
      role="img" 
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(maxStars)].map((_, i) => (
        <Star 
          key={i} 
          size={14} 
          className={i < filledStars ? 'fill-[var(--color-accent)]' : 'opacity-30'} 
          aria-hidden="true" 
        />
      ))}
    </div>
  );
}
