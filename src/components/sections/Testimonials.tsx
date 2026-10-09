import React from 'react';
import { getVisibleTestimonials, siteData } from '@/data/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { Reveal } from '@/components/ui/Reveal';

export function Testimonials() {
  const items = getVisibleTestimonials();
  
  if (items.length === 0) return null;

  const featuredItems = items.filter(item => item.featured);
  
  const getGridClasses = () => {
    if (items.length === 1) return 'flex justify-center max-w-4xl mx-auto';
    
    if (featuredItems.length === 1) return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
    
    return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
  };

  return (
    <section id="testimonials" className="section-spacing container-max">
      <Reveal>
        <div className="mb-12 lg:mb-16">
          <SectionTitle 
            label={siteData.testimonials.label}
            title={siteData.testimonials.heading}
            subtext={siteData.testimonials.subtext}
          />
        </div>
      </Reveal>

      <div className={getGridClasses()}>
        {items.map((item, idx) => {
          const isOnlyFeatured = featuredItems.length === 1 && item.featured;
          
          let cardClasses = 'w-full';
          if (items.length > 1) {
             if (isOnlyFeatured) {
               cardClasses += ' md:col-span-2';
             }
          }

          return (
            <div key={idx} className={cardClasses}>
              <Reveal delay={idx * 0.1} width="100%">
                <TestimonialCard item={item} />
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
