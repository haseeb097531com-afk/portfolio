import React from 'react';
import { siteData, hasContactContent, getVisibleContactChannels, getVisibleSocials } from '@/data/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { ChannelRow } from '@/components/contact/ChannelRow';
import { SocialRow } from '@/components/contact/SocialRow';
import { AvailabilityPill } from '@/components/contact/AvailabilityPill';

export function Contact() {
  if (!hasContactContent()) return null;

  const { contact } = siteData;
  const channels = getVisibleContactChannels();
  const socials = getVisibleSocials();

  return (
    <section id="contact" className="section-spacing container-max">
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <SectionTitle 
              label={contact.label}
              title={contact.heading}
              subtext={contact.subtext}
            />
            
            {channels.availability && (
              <AvailabilityPill text={channels.availability} />
            )}

            <div className="flex flex-col gap-6 mt-8">
              {channels.email && (
                <ChannelRow type="email" value={channels.email} />
              )}
              {channels.phone && (
                <ChannelRow type="phone" value={channels.phone} />
              )}
              {channels.whatsapp && (
                <ChannelRow type="whatsapp" value={channels.whatsapp} />
              )}
              {channels.location && (
                <ChannelRow type="location" value={channels.location} />
              )}
            </div>

            <SocialRow socials={socials} />
          </div>

          {/* Right Column (Form) */}
          <div className="w-full">
            <ContactForm />
          </div>

        </div>
      </Reveal>
    </section>
  );
}
