import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Academy } from "@/components/sections/Academy";
import { Journey } from "@/components/sections/Journey";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

import { siteData } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { HeroCinematic } from "@/components/cinematic/HeroCinematic";
import { SectionCinematic } from "@/components/cinematic/SectionCinematic";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Academy } from "@/components/sections/Academy";
import { Journey } from "@/components/sections/Journey";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const isCinematic = siteData.cinematic.enabled;

  return (
    <main>
      {isCinematic && siteData.cinematic.heroSplitText ? <HeroCinematic /> : <Hero />}
      
      <SectionCinematic id="about" index={1} label="ABOUT_ME">
        <About />
      </SectionCinematic>

      <SectionCinematic id="services" index={2} label="SERVICES">
        <Services />
      </SectionCinematic>

      <SectionCinematic id="skills" index={3} label="SKILLS">
        <Skills />
      </SectionCinematic>

      <SectionCinematic id="projects" index={4} label="PROJECTS">
        <Projects />
      </SectionCinematic>

      <SectionCinematic id="academy" index={5} label="ACADEMY">
        <Academy />
      </SectionCinematic>

      <SectionCinematic id="journey" index={6} label="JOURNEY">
        <Journey />
      </SectionCinematic>

      <SectionCinematic id="testimonials" index={7} label="TESTIMONIALS">
        <Testimonials />
      </SectionCinematic>

      <SectionCinematic id="contact" index={8} label="CONTACT">
        <Contact />
      </SectionCinematic>
    </main>
  );
}
