import React from 'react';
import Image from 'next/image';

type Props = {
  avatar?: string;
  name: string;
};

export function Avatar({ avatar, name }: Props) {
  if (avatar) {
    return (
      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[var(--color-border)]">
        <Image 
          src={avatar} 
          alt={name} 
          fill 
          className="object-cover"
          sizes="40px"
        />
      </div>
    );
  }

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] font-heading font-bold text-sm">
      {initials}
    </div>
  );
}
