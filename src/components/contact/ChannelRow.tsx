import React from 'react';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

type Props = {
  type: 'email' | 'phone' | 'whatsapp' | 'location';
  value: string;
};

const config = {
  email: { icon: Mail, label: "Email", href: (val: string) => `mailto:${val}` },
  phone: { icon: Phone, label: "Phone", href: (val: string) => `tel:${val}` },
  whatsapp: { icon: MessageCircle, label: "WhatsApp", href: (val: string) => `https://wa.me/${val}` },
  location: { icon: MapPin, label: "Location", href: null },
};

export function ChannelRow({ type, value }: Props) {
  const { icon: Icon, label, href } = config[type];
  
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/30 transition-colors shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-1">{label}</p>
        <p className="text-base font-medium text-[var(--color-text)] group-hover:underline decoration-[var(--color-accent)]/50 underline-offset-4">
          {value}
        </p>
      </div>
    </div>
  );

  const linkHref = href ? href(value) : null;

  if (linkHref) {
    return (
      <a 
        href={linkHref}
        target={type === 'whatsapp' ? '_blank' : undefined}
        rel={type === 'whatsapp' ? 'noopener noreferrer' : undefined}
        className="block w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg"
      >
        {content}
      </a>
    );
  }

  return <div className="w-fit">{content}</div>;
}
