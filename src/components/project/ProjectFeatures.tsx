import React from 'react';
import { Project } from '@/data/site';
import { CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function ProjectFeatures({ features }: { features: Project['features'] }) {
  if (!features || features.length === 0) return null;

  return (
    <div className="mt-24">
      <Reveal>
        <h3 className="text-2xl font-heading font-bold text-[var(--color-text)] mb-8 border-b border-[var(--color-border)] pb-4">
          Key Features
        </h3>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <div className="flex items-start gap-4 bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors h-full">
              <CheckCircle2 className="text-[var(--color-accent)] shrink-0 mt-0.5" size={20} />
              <p className="text-[var(--color-text)] text-sm md:text-base leading-relaxed">
                {feature}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
