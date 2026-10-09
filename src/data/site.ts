export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  tech: string[];
  features: string[];
  role: string;
  year: string;
  status: "live" | "wip" | "archived";
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  featured: boolean;
};

const projectItems: Project[] = [
  {
    slug: "quran-downloader",
    title: "Quran Downloader",
    tagline: "TODO",
    description: "TODO",
    longDescription: "TODO",
    thumbnail: "/images/projects/placeholder.jpg",
    images: [],
    tech: ["TODO"],
    features: ["TODO"],
    role: "TODO",
    year: "TODO",
    status: "wip",
    links: { live: "", github: "" },
    featured: true,
  }
];

export const isProjectVisible = (p: Project) => {
  const fieldsToCheck = [p.title, p.description, p.tagline, p.longDescription, p.role, p.year];
  return !fieldsToCheck.some(field => field.includes("TODO"));
};

export const getVisibleProjects = () => {
  return projectItems
    .filter(isProjectVisible)
    .sort((a, b) => {
      const yearA = parseInt(a.year, 10);
      const yearB = parseInt(b.year, 10);
      if (!isNaN(yearA) && !isNaN(yearB)) return yearB - yearA;
      if (!isNaN(yearA)) return -1;
      if (!isNaN(yearB)) return 1;
      return 0;
    });
};

export type JourneyItem = {
  year: string;
  title: string;
  place: string;
  description: string;
  type: "education" | "course" | "work" | "milestone";
  link?: string;
  confirmed: boolean;
};

const journeyItems: JourneyItem[] = [
  { year: "TODO", title: "Completed Hifz / Quran studies", place: "TODO", description: "", type: "education", confirmed: false },
  { year: "TODO", title: "Started teaching Quran", place: "TODO (masjid / online)", description: "", type: "work", confirmed: false },
  { year: "TODO", title: "Founded Ashjan ul Quran Online Academy", place: "Online", description: "", type: "milestone", confirmed: false },
  { year: "TODO", title: "Started learning web development", place: "Self-taught", description: "", type: "course", confirmed: false }
];

export const getVisibleJourneyItems = (): JourneyItem[] => {
  return journeyItems
    .filter(item => 
      item.confirmed && 
      !item.year.includes("TODO") && 
      !item.title.includes("TODO") && 
      !item.place.includes("TODO")
    )
    .sort((a, b) => {
      const yearA = parseInt(a.year, 10);
      const yearB = parseInt(b.year, 10);
      if (!isNaN(yearA) && !isNaN(yearB)) return yearB - yearA;
      if (!isNaN(yearA)) return -1;
      if (!isNaN(yearB)) return 1;
      return 0;
    });
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  location?: string;
  avatar?: string;
  rating?: number;
  source?: string;
  sourceLink?: string;
  date?: string;
  confirmed: boolean;
  featured: boolean;
};

const testimonialItems: TestimonialItem[] = [
  { quote: "TODO", name: "TODO", role: "", location: "", avatar: "", rating: 0, source: "", sourceLink: "", date: "", confirmed: false, featured: false },
  { quote: "TODO", name: "TODO", role: "Parent", location: "", avatar: "", rating: 5, source: "Google", sourceLink: "", date: "", confirmed: false, featured: false },
  { quote: "TODO", name: "TODO", role: "Client", location: "", avatar: "", rating: 5, source: "", sourceLink: "", date: "", confirmed: false, featured: false }
];

export const getVisibleTestimonials = (): TestimonialItem[] => {
  return testimonialItems
    .filter(item => 
      item.confirmed && 
      !item.quote.includes("TODO") && 
      !item.name.includes("TODO")
    )
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      
      return dateB - dateA;
    });
};

export type SocialLink = {
  label: string;
  url: string;
  icon: string;
};

export type ContactData = {
  label: string;
  heading: string;
  subtext: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  availability?: string;
  socials: SocialLink[];
  form: {
    enabled: boolean;
    actionUrl: string;
    successMsg: string;
    errorMsg: string;
  };
};

const contactData: ContactData = {
  label: "CONTACT",
  heading: "Let's build something",
  subtext: "Open to teaching, collaboration, and freelance work.",
  email: "TODO",
  phone: "TODO",
  whatsapp: "TODO",
  location: "TODO",
  availability: "TODO",
  socials: [
    { label: "GitHub", url: "TODO", icon: "github" },
    { label: "LinkedIn", url: "TODO", icon: "linkedin" }
  ],
  form: {
    enabled: true,
    actionUrl: "/api/contact",
    successMsg: "Thanks — I'll get back to you soon.",
    errorMsg: "Something went wrong. Please try again or email me directly."
  }
};

export const getVisibleContactChannels = () => {
  const { email, phone, whatsapp, location, availability } = contactData;
  const isVisible = (val?: string) => val && !val.includes("TODO");
  
  return {
    email: isVisible(email) ? email : undefined,
    phone: isVisible(phone) ? phone : undefined,
    whatsapp: isVisible(whatsapp) ? whatsapp : undefined,
    location: isVisible(location) ? location : undefined,
    availability: isVisible(availability) ? availability : undefined,
  };
};

export const getVisibleSocials = () => {
  return contactData.socials.filter(s => s.label && s.url && s.icon && !s.url.includes("TODO"));
};

export const hasContactContent = () => {
  const channels = getVisibleContactChannels();
  const hasChannels = Object.values(channels).some(v => v !== undefined);
  const hasSocials = getVisibleSocials().length > 0;
  return contactData.form.enabled || hasChannels || hasSocials;
};

export const siteData = {
  cinematic: {
    enabled: true,
    preloader: true,
    customCursor: true,
    smoothScroll: true,
    hudReadouts: true,
    heroSplitText: true,
    holdToFastForward: true,
    accentVisual: true,
    accentVisualType: "cube" as "cube" | "wireframe" | "particles",
  },
  name: "Hafiz Muhammad Haseeb",
  mission: "Teaching the Book of Allah, one student at a time — and building the tools that make learning reach further.",
  navLinks: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    ...(getVisibleProjects().length > 0 ? [{ label: "Projects", href: "#projects" }] : []),
    { label: "Academy", href: "#academy" },
    ...(getVisibleJourneyItems().length > 0 ? [{ label: "Journey", href: "#journey" }] : []),
    ...(getVisibleTestimonials().length > 0 ? [{ label: "Testimonials", href: "#testimonials" }] : []),
    ...(hasContactContent() ? [{ label: "Contact", href: "#contact" }] : []),
  ],
  cta: {
    label: "Hire Me",
    link: "mailto:your-email@example.com", // TODO
  },
  hero: {
    eyebrow: "ASSALAMU ALAIKUM, I'M",
    name: "Hafiz Muhammad Haseeb",
    roles: [
      "Full Stack Developer",
      "Designer",
      "Video Editor",
      "Social Media Manager"
    ],
    tagline: "Quran teacher by calling, builder by craft.",
    description: "I help hearts memorize, and hands create.",
    primaryCta: { label: "Hire Me", href: "mailto:TODO@email.com" },
    secondaryCta: { label: "View My Work", href: "#projects" },
    whatsapp: { label: "WhatsApp", href: "https://wa.me/TODO" },
    photo: "/images/me.webp", // TODO: user will add real photo
    location: "Pakistan"
  },
  stats: [
    { label: "Years Experience", value: 0, suffix: "+" },   // TODO real
    { label: "Projects Completed", value: 0, suffix: "+" },  // TODO real
    { label: "Students Taught", value: 0, suffix: "+" },     // TODO real
  ],
  socials: [
    { name: "GitHub", href: "#", icon: "github" },
    { name: "LinkedIn", href: "#", icon: "linkedin" },
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "YouTube", href: "#", icon: "youtube" },
    { name: "WhatsApp", href: "#", icon: "whatsapp" },
  ],  // TODO real links
  badgeText: "• Full Stack Developer • Designer • Video Editor • Quran Academy ",
  about: {
    label: "ABOUT",
    heading: "Developer, designer and teacher: building things that matter.",
    paragraphs: [
      "I'm Hafiz Muhammad Haseeb, a full stack developer and designer passionate about creating seamless digital experiences. With a strong foundation in both front-end aesthetics and back-end logic, I bridge the gap between design and engineering.",
      "My work spans web development, UI/UX design, video editing, and social media management. I believe that a great product is not just about writing clean code—it's about telling a compelling story and engaging users at every touchpoint.",
      "Beyond technology, I run the Ashjan ul Quran Online Academy, where I combine modern digital tools with traditional teachings to spread Islamic knowledge globally. My goal is to make a meaningful impact, both on screen and off."
    ],
    highlights: [
      {
        title: "Full Stack Development",
        text: "Modern, fast websites and web apps, from interface to backend.",
        icon: "code"
      },
      {
        title: "Design",
        text: "Clean, memorable visual design for brands and interfaces.",
        icon: "palette"
      },
      {
        title: "Video Editing",
        text: "Edits that hold attention and tell the story.",
        icon: "video"
      },
      {
        title: "Social Media Management",
        text: "Content and growth strategy that builds an audience.",
        icon: "smartphone"
      }
    ],
    facts: [
      { label: "Location", value: "Pakistan" },
      { label: "Languages", value: "Urdu, English" },
      { label: "Available for", value: "Freelance & Projects" }
    ]
  },
  services: {
    label: "SERVICES",
    heading: "What I can do for you",
    subtext: "From idea to launch, I handle the whole creative and technical side.",
    items: [
      {
        id: "fullstack",
        number: "01",
        title: "Full Stack Development",
        description: "Fast, responsive websites and web apps built end to end.",
        tags: ["Next.js", "React", "Node.js", "Databases", "APIs"],
        icon: "code"
      },
      {
        id: "design",
        number: "02",
        title: "Graphic & UI Design",
        description: "Clean visuals that make your brand look professional.",
        tags: ["Logos", "Social Posts", "Thumbnails", "UI Design"],
        icon: "palette"
      },
      {
        id: "video",
        number: "03",
        title: "Video Editing",
        description: "Edits that keep viewers watching until the end.",
        tags: ["Reels & Shorts", "YouTube", "Promos", "Motion Graphics"],
        icon: "video"
      },
      {
        id: "social",
        number: "04",
        title: "Social Media Management",
        description: "Consistent content and growth for your accounts.",
        tags: ["Content Planning", "Posting", "Branding", "Growth"],
        icon: "smartphone"
      }
    ],
    pricingNote: "Contact for quote",
    ctaText: "Have a project in mind? Let's talk."
  },
  skills: {
    label: "SKILLS",
    heading: "Tools I work with",
    categories: [
      {
        title: "Development",
        items: [
          { name: "HTML", icon: "code" },
          { name: "CSS", icon: "layout" },
          { name: "JavaScript", icon: "file-json" },
          { name: "React", icon: "blocks" },
          { name: "Next.js", icon: "triangle" },
          { name: "Tailwind CSS", icon: "wind" },
          { name: "Node.js", icon: "server" },
          { name: "Git & GitHub", icon: "git-branch" }
        ]
      },
      {
        title: "Design",
        items: [
          { name: "Figma", icon: "pen-tool" },
          { name: "Photoshop", icon: "image" },
          { name: "Canva", icon: "brush" }
        ]
      },
      {
        title: "Video & Motion",
        items: [
          { name: "CapCut", icon: "scissors" },
          { name: "Premiere Pro", icon: "clapperboard" }
        ]
      },
      {
        title: "Social Media",
        items: [
          { name: "Content Planning", icon: "calendar" },
          { name: "Scheduling", icon: "clock" },
          { name: "Analytics", icon: "bar-chart" }
        ]
      }
    ],
    aiNote: "I also use AI-assisted tools (like Antigravity and Kilo Code) to build faster."
  },
  academy: {
    label: "FEATURED",
    name: "Ashjan ul Quran Online Academy",
    heading: "Learn the Quran online, from anywhere.",
    description: "Where sacred knowledge meets modern tools — learn Quran online, taught with patience, supported by technology.",
    courses: [
      { title: "Noorani Qaida", text: "Foundation of correct Arabic reading." },
      { title: "Nazra Quran", text: "Fluent recitation with the basic rules." },
      { title: "Tajweed", text: "Perfect your pronunciation and rules." },
      { title: "Hifz", text: "Guided Quran memorization." }
    ],
    features: [
      "One-to-one live classes",
      "Qualified teachers",
      "Flexible timings",
      "Separate batches for brothers and sisters",
      "Progress tracking"
    ],
    stats: [
      { label: "Students", value: 0, suffix: "+" },
      { label: "Years", value: 0, suffix: "+" }
    ],
    cta: { label: "Book a Free Trial", href: "#" },
    secondaryCta: { label: "Visit Academy", href: "#" }
  },
  projects: {
    label: "PROJECTS",
    heading: "Selected work",
    subtext: "A few things I've built and shipped.",
    items: projectItems
  },
  journey: {
    label: "JOURNEY",
    heading: "Credentials & milestones",
    subtext: "The path that shaped how I teach and build.",
    items: journeyItems
  },
  testimonials: {
    label: "TESTIMONIALS",
    heading: "What people say",
    subtext: "Words from students, parents, and collaborators.",
    items: testimonialItems
  },
  contact: contactData
};
