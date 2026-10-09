"use client";
import React from "react";
import { Github, Linkedin, Instagram, Youtube, MessageCircle } from "lucide-react";
import { siteData } from "@/data/site";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  instagram: <Instagram size={20} />,
  youtube: <Youtube size={20} />,
  whatsapp: <MessageCircle size={20} />
};

export function SocialLinks({ mobile = false }: { mobile?: boolean }) {
  const activeSocials = siteData.socials.filter(s => s.href !== "#" && s.href !== "");

  if (activeSocials.length === 0) return null;

  return (
    <div className={`flex ${mobile ? 'flex-row flex-wrap justify-center' : 'flex-col'} gap-4`}>
      {activeSocials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_var(--color-accent-glow)] z-10"
          aria-label={social.name}
        >
          {iconMap[social.icon] || <MessageCircle size={20} />}
          
          {/* Tooltip */}
          <span className={`absolute px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[var(--color-border)] z-20
            ${mobile ? '-top-10 left-1/2 -translate-x-1/2' : 'left-16 top-1/2 -translate-y-1/2'}
          `}>
            {social.name}
          </span>
        </a>
      ))}
    </div>
  );
}
