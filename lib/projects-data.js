// lib/projects-data.js
// Production case studies data for HD Web Studios

export const projects = [
  {
    title: "RareTech Automation",
    slug: "raretech",
    shortDescription:
      "Full-stack Next.js and MERN industrial automation portal designed for machine telemetry, spare parts cataloging, and B2B inquiry routing.",
    description:
      "RareTech Automation is a specialized industrial technology company providing custom PLC automation and CNC retrofitting across Punjab and Northern India. We engineered a modern web platform featuring categorized equipment catalogs, technical specification PDF downloads, and direct WhatsApp RFQ (Request for Quote) routing that reduced sales cycle friction by over 40%.",
    client: "RareTech Automation Ltd.",
    category: "Web Application & B2B Portal",
    industry: "Industrial Manufacturing",
    location: "Ludhiana, Punjab",
    projectType: "Full-Stack Web App",
    year: "2025",
    challenge:
      "RareTech operated on a legacy static website with zero mobile responsiveness and no mechanism for engineers and plant managers to quickly browse machine specifications or request urgent spare part quotes from factory floors. Inquiries were routinely missed due to cumbersome desktop-only contact forms.",
    solution:
      "We rebuilt RareTech's digital infrastructure using Next.js App Router and Tailwind CSS. We designed a searchable parts directory with instant filtering by controller type and voltage, integrated direct WhatsApp quote triggers pre-filled with part numbers, and implemented LocalBusiness and Product Schema for Google Search visibility.",
    results: [
      "Sub-second page load speeds across mobile 4G/5G networks",
      "Direct WhatsApp RFQ quote routing with pre-filled part numbers",
      "Strong localized search visibility for industrial automation in Punjab",
      "100% green Core Web Vitals across mobile and desktop audits",
    ],
    features: [
      "Searchable industrial parts catalog with multi-parameter filtering",
      "One-click WhatsApp RFQ routing with dynamic product payload generation",
      "Downloadable technical specification sheets and user manuals",
      "Mobile-first responsive interface optimized for factory floor usage",
      "LocalBusiness and Organization JSON-LD structured data implementation",
      "Custom admin dashboard for inventory updates and inquiry monitoring",
    ],
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Cloudinary"],
    services: ["Business Website Development", "Custom Web Application Development", "Local SEO & Google Business Profile"],
    featuredImage: "/projects/raretech.jpg",
    thumbnail: "/projects/raretech.jpg",
    gallery: ["/projects/raretech.jpg"],
    liveUrl: "https://raretech.in",
    seoTitle: "RareTech Automation Case Study | HD Web Studios",
    seoDescription:
      "How HD Web Studios engineered a high-speed B2B industrial portal with WhatsApp RFQ routing for RareTech Automation in Ludhiana.",
    published: true,
    order: 1,
    featured: true,
  },
  {
    title: "Vastu Divine Consulting",
    slug: "vastudivine",
    shortDescription:
      "Consultancy platform and appointment booking system for an established architectural and Vedic Vastu practice in Ludhiana.",
    description:
      "Vastu Divine Consulting is a Vedic architectural consultancy serving clients across Punjab, Delhi NCR, and international NRI communities. We designed a tranquil, high-trust digital platform with interactive consultation package selectors, automated client intake questionnaires, and direct WhatsApp appointment booking.",
    client: "Vastu Divine Consultancy",
    category: "Consultancy & Lead System",
    industry: "Professional Services",
    location: "Ludhiana, Punjab & Global",
    projectType: "Lead Acquisition Platform",
    year: "2025",
    challenge:
      "Vastu Divine relied heavily on manual phone scheduling and word-of-mouth referrals. Prospective international and residential clients found it difficult to understand consultation tiers, view verified past architectural case studies, or schedule site evaluation calls across time zones.",
    solution:
      "We engineered a serene, authoritative web experience with clear service tier breakdowns (Residential, Commercial, Industrial Vastu). We integrated an interactive step-by-step intake questionnaire where clients upload floor plans, automated appointment scheduling, and localized SEO landing pages for key regions across Punjab and the NRI diaspora.",
    results: [
      "Streamlined online booking workflow eliminating manual client scheduling friction",
      "Structured consultation package breakdowns with transparent upfront scope",
      "Top-tier Google Maps Local 3-Pack placement across Ludhiana and Punjab",
      "100% mobile-friendly responsive booking and questionnaire interface",
    ],
    features: [
      "Interactive consultation tier explorer with upfront pricing transparency",
      "Secure floor plan upload and intake questionnaire workflow",
      "Automated WhatsApp confirmation and calendar invite dispatch",
      "Vedic architecture case study gallery with before/after spatial diagrams",
      "Comprehensive LocalBusiness and Service Schema markup",
      "Integrated client review and video testimonial showcase",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "MongoDB", "Cloudinary"],
    services: ["Business Website Development", "Local SEO & Google Business Profile", "Website Maintenance & Support"],
    featuredImage: "/projects/vastudivine.jpg",
    thumbnail: "/projects/vastudivine.jpg",
    gallery: ["/projects/vastudivine.jpg"],
    liveUrl: "https://vastudivine.com",
    seoTitle: "Vastu Divine Case Study | HD Web Studios",
    seoDescription:
      "How HD Web Studios built a high-trust digital consultation and booking platform for Vastu Divine in Ludhiana, Punjab.",
    published: true,
    order: 2,
    featured: true,
  },
  {
    title: "JMD Solar Clean Energy",
    slug: "jmdsolar",
    shortDescription:
      "Commercial solar rooftop engineering website with solar savings calculator, subsidy guide, and localized lead capture funnels.",
    description:
      "JMD Solar is a renewable clean energy EPC contractor executing commercial, industrial, and residential solar rooftop installations in Punjab. We developed a conversion-optimized website equipped with an interactive solar ROI calculator, government subsidy guides (PM Surya Ghar Yojana), and high-intent inquiry routing.",
    client: "JMD Solar Energy Systems",
    category: "Clean Energy & EPC",
    industry: "Solar & Clean Tech",
    location: "Punjab, India",
    projectType: "Corporate & Calculator Portal",
    year: "2024",
    challenge:
      "Potential solar buyers in Ludhiana and Punjab lacked clear information on system capacity requirements, estimated payback periods, and government subsidy benefits. The client was receiving low-quality inquiries that required extensive manual qualification.",
    solution:
      "We built an interactive Solar Savings Calculator that estimates unit savings, recommended kilowatt capacity, and payback periods based on average monthly electricity bills. High-intent calculations trigger instant WhatsApp quote requests with pre-calculated system specifications.",
    results: [
      "Custom interactive ROI calculator pre-qualifying client solar capacity",
      "Sub-second page rendering on mobile devices with zero cumulative layout shift",
      "High-intent commercial inquiry capture routed directly to engineering sales",
      "Structured LocalBusiness and FAQPage Schema for rich search snippets",
    ],
    features: [
      "Custom interactive Solar ROI and payback period calculator",
      "Government PM Surya Ghar subsidy guide and documentation checklist",
      "Commercial and industrial solar project photo gallery with kilowatt ratings",
      "Direct WhatsApp and email lead capture with calculation parameters",
      "LocalBusiness and FAQPage structured data markup",
      "Responsive, clean UI designed for industrial facility owners and homeowners",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Lucide React", "Node.js", "MongoDB"],
    services: ["Business Website Development", "Custom Web Application Development", "Local SEO & Google Business Profile"],
    featuredImage: "/projects/jmdsolar.png",
    thumbnail: "/projects/jmdsolar.png",
    gallery: ["/projects/jmdsolar.png"],
    liveUrl: "https://jmdsolar.in",
    seoTitle: "JMD Solar Clean Energy Case Study | HD Web Studios",
    seoDescription:
      "Explore how HD Web Studios engineered a high-converting solar EPC website with interactive ROI calculator for JMD Solar in Punjab.",
    published: true,
    order: 3,
    featured: true,
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
