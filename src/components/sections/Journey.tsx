import React from 'react';
import { getVisibleJourneyItems, siteData } from '@/data/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { JourneyTimeline } from '@/components/journey/JourneyTimeline';
import { Reveal } from '@/components/ui/Reveal';

export function Journey() {
  const items = getVisibleJourneyItems();
  if (items.length === 0) return null;

  return (
    <section id="journey" className="section-spacing container-max">
      <Reveal>
        <SectionTitle 
          label={siteData.journey.label}
          title={siteData.journey.heading}
          subtext={siteData.journey.subtext}
        />
      </Reveal>
      <Reveal>
        <JourneyTimeline items={items} />
      </Reveal>
    </section>
  );
}
