import React from 'react';
import { SocialLink } from '@/data/site';
import { Github, Linkedin, Youtube, Twitter, Facebook, Instagram, Link as LinkIcon } from 'lucide-react';

export function SocialRow({ socials }: { socials: SocialLink[] }) {
  if (!socials || socials.length === 0) return null;

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'youtube': return Youtube;
      case 'x': 
      case 'twitter': return Twitter;
      case 'facebook': return Facebook;
      case 'instagram': return Instagram;
      default: return LinkIcon;
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-[var(--color-border)]">
      {socials.map((social, idx) => {
        const Icon = getIcon(social.icon);
        return (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
