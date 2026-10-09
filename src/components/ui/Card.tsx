import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)] hover:border-[var(--color-accent)]/30 ${className}`}>
      {children}
    </div>
  );
}
