// lib/services-data.js
// Static content for service detail pages.
// No backend / CMS wiring here on purpose — swap this for a real data
// source (DB, CMS, MDX) later without touching any component below.

export const services = {
  "business-website-development": {
    slug: "business-website-development",
    icon: "Globe",
    eyebrow: "Business Website Development",
    title: "A Website That Works As Hard As You Do.",
    tagline:
      "Fast, modern, mobile-first websites built to earn trust and turn visitors into enquiries.",
    description:
      "We design and develop professional business websites with clean UX, SEO fundamentals, and clear conversion paths — so the first impression your business makes online is the right one.",
    heroStats: [
      { label: "Avg. launch time", value: "7–14 days" },
      { label: "Mobile-first", value: "100%" },
      { label: "Ownership", value: "Fully yours" },
    ],
    overview: {
      heading: "Built To Represent Your Business Properly.",
      paragraphs: [
        "Most businesses lose enquiries before a phone even rings — a slow, dated, or confusing website quietly turns people away. We build websites that load fast, explain what you do in seconds, and guide visitors toward getting in touch.",
        "Every project starts with your business, not a template. We map out your services, your customers, and the questions they're asking before we design a single screen — so the site earns trust instead of just looking nice.",
      ],
      highlights: [
        { icon: "Zap", title: "Performance First", text: "Optimized assets and clean code for sub-second interactions." },
        { icon: "Smartphone", title: "Mobile-First UX", text: "Designed for the device most of your customers actually use." },
        { icon: "Search", title: "SEO Foundations", text: "Semantic structure and metadata built in from day one." },
      ],
    },
    whatYouGet: [
      { icon: "LayoutTemplate", title: "Custom Design", text: "A layout designed around your brand and customer journey — not a recycled theme." },
      { icon: "Smartphone", title: "Mobile-First Build", text: "Pixel-perfect across phones, tablets, and desktops with zero layout shifts." },
      { icon: "Rocket", title: "Fast Performance", text: "Optimized images, code-splitting, and caching for a snappy experience." },
      { icon: "Search", title: "SEO-Ready Structure", text: "Semantic HTML, metadata, and sitemap set up for search visibility." },
      { icon: "MessageSquare", title: "Clear Conversion Paths", text: "Enquiry forms and CTAs placed where visitors are ready to act." },
      { icon: "ShieldCheck", title: "Secure & Reliable", text: "Modern hosting practices and SSL by default, no shortcuts." },
    ],
    faq: [
      { q: "How long does a business website take?", a: "Most standard business websites are designed, built, and launched within 7–14 days, depending on the number of pages and how quickly content and feedback come back to us." },
      { q: "Will I be able to update the content myself?", a: "Yes. We can set things up so you can update text, images, and basic content yourself, or we can handle updates for you as part of ongoing support." },
      { q: "Do you write the content for the website too?", a: "We can guide the structure and messaging, or work with content you already have. Either way, we make sure it's organized to actually convert visitors." },
      { q: "Is SEO included in the website build?", a: "Technical SEO fundamentals — clean structure, metadata, performance, and mobile usability — are included in every build. Ongoing SEO growth is available as a separate service." },
    ],
  },

  "web-app-development": {
    slug: "web-app-development",
    icon: "Layers",
    eyebrow: "Web App Development",
    title: "Turn Complex Workflows Into Simple Web Experiences.",
    tagline:
      "Custom web applications — portals, dashboards, and booking systems — built around how your business actually works.",
    description:
      "From student portals and examination systems to booking platforms and internal dashboards, we build custom web applications that replace spreadsheets and manual processes with something built for scale.",
    heroStats: [
      { label: "Uptime target", value: "99.9%" },
      { label: "Built for", value: "Real workflows" },
      { label: "Architecture", value: "Scalable" },
    ],
    overview: {
      heading: "Software Built Around Your Business Requirements.",
      paragraphs: [
        "When spreadsheets and manual processes start slowing your business down, a custom web application replaces the chaos with one reliable system — accessible from any modern device, by the people who need it.",
        "We design the data model and user flows around how your team actually works, not the other way around, so adoption is easy and the system keeps paying off as you grow.",
      ],
      highlights: [
        { icon: "Database", title: "Solid Data Foundations", text: "Structured, secure databases built to scale with your usage." },
        { icon: "Lock", title: "Secure Authentication", text: "Role-based access so the right people see the right things." },
        { icon: "TrendingUp", title: "Built To Grow", text: "Architecture that scales as your users and features grow." },
      ],
    },
    whatYouGet: [
      { icon: "LayoutDashboard", title: "Custom Dashboards", text: "Purpose-built interfaces for admins, staff, or customers." },
      { icon: "Lock", title: "User Authentication", text: "Secure sign-in and role-based permissions out of the box." },
      { icon: "Database", title: "Scalable Data Layer", text: "Databases designed to stay fast as records and users grow." },
      { icon: "Workflow", title: "Custom Workflows", text: "Booking, enquiry, or approval flows modeled on how you work." },
      { icon: "Server", title: "Reliable Hosting", text: "Deployed on infrastructure built for uptime and performance." },
      { icon: "LifeBuoy", title: "Ongoing Support", text: "Direct developer support as your requirements evolve." },
    ],
    faq: [
      { q: "What kind of web apps do you build?", a: "Student and examination portals, booking and enquiry systems, customer dashboards, admin panels, and other custom workflows — tailored to what your business actually needs." },
      { q: "Can it replace our spreadsheets and manual process?", a: "Yes — that's usually the exact goal. We map your current process first, then design a system that removes the manual steps without disrupting how your team works." },
      { q: "Is the application secure?", a: "We implement secure authentication, role-based access, and modern security practices as standard, not as an add-on." },
      { q: "Can it grow as our user base grows?", a: "Applications are architected with scalability in mind from the start, so adding users or features later doesn't mean rebuilding the system." },
    ],
  },

  "seo-website-growth": {
    slug: "seo-website-growth",
    icon: "TrendingUp",
    eyebrow: "SEO & Website Growth",
    title: "Get Found Where Your Customers Are Searching.",
    tagline:
      "Technical SEO, on-page optimization, and performance improvements that build lasting search visibility.",
    description:
      "We optimize websites for search engines and real users — technical SEO, on-page structure, local visibility, and performance — so your business shows up when it matters most.",
    heroStats: [
      { label: "Core Web Vitals", value: "Optimized" },
      { label: "Focus", value: "Local & organic" },
      { label: "Approach", value: "Technical + content" },
    ],
    overview: {
      heading: "Visibility Built On A Solid Technical Foundation.",
      paragraphs: [
        "A beautiful website that no one finds isn't doing its job. We start with the technical fundamentals — site speed, structure, metadata, mobile usability — because search engines and visitors both reward the same things.",
        "From there, we improve on-page content and local search signals so your business shows up for the searches that actually lead to enquiries, not just traffic.",
      ],
      highlights: [
        { icon: "Gauge", title: "Core Web Vitals", text: "Speed and stability improvements that search engines rank for." },
        { icon: "MapPin", title: "Local Visibility", text: "Structured for the searches nearby customers actually make." },
        { icon: "FileSearch", title: "On-Page Optimization", text: "Content and metadata structured for relevance and clarity." },
      ],
    },
    whatYouGet: [
      { icon: "Gauge", title: "Technical SEO Audit", text: "A full review of what's currently holding your site back." },
      { icon: "FileSearch", title: "On-Page Optimization", text: "Metadata, headings, and content structure tuned for search." },
      { icon: "MapPin", title: "Local Search Setup", text: "Improved visibility for nearby, high-intent searches." },
      { icon: "BarChart3", title: "Analytics & Tracking", text: "Google Analytics and Search Console set up properly." },
      { icon: "Zap", title: "Performance Tuning", text: "Faster load times that improve rankings and experience." },
      { icon: "FileText", title: "Content Structure", text: "Pages organized around what your customers are searching for." },
    ],
    faq: [
      { q: "How long until we see SEO results?", a: "Technical improvements can show up quickly, but meaningful ranking movement typically takes a few months as search engines re-crawl and re-evaluate your site." },
      { q: "Do you guarantee first-page rankings?", a: "No one honestly can — search engines don't offer guarantees. What we do guarantee is a stronger technical foundation and a clear, honest view of your progress." },
      { q: "Is this a one-time service or ongoing?", a: "It works both ways. Some businesses need a one-time technical cleanup, others benefit from ongoing optimization as content and competition evolve." },
      { q: "Do you work with websites you didn't build?", a: "Yes — we regularly audit and improve existing websites, regardless of who originally built them." },
    ],
  },

  "website-maintenance-support": {
    slug: "website-maintenance-support",
    icon: "ShieldCheck",
    eyebrow: "Website Maintenance & Support",
    title: "Keep Your Website Secure, Updated, and Fast.",
    tagline:
      "Ongoing maintenance and direct developer support so your website keeps performing after launch.",
    description:
      "Launching a website isn't the finish line. We provide ongoing maintenance and support — updates, fixes, performance checks, and technical assistance — so your website keeps working as your business grows.",
    heroStats: [
      { label: "Response", value: "Direct & fast" },
      { label: "Coverage", value: "Updates & fixes" },
      { label: "Relationship", value: "Ongoing" },
    ],
    overview: {
      heading: "Support That Doesn't Disappear After Launch.",
      paragraphs: [
        "Websites need small updates, occasional fixes, and periodic performance checks to keep working well. Without that, even a great launch slowly turns into a liability.",
        "You get direct access to the person who understands your website — not a ticket queue — for updates, content changes, bug fixes, and technical guidance whenever you need it.",
      ],
      highlights: [
        { icon: "RefreshCcw", title: "Regular Updates", text: "Content changes and improvements handled promptly." },
        { icon: "ShieldCheck", title: "Security Monitoring", text: "Keeping your website protected against common threats." },
        { icon: "Wrench", title: "Fast Fixes", text: "Bugs and issues resolved without long back-and-forth." },
      ],
    },
    whatYouGet: [
      { icon: "RefreshCcw", title: "Content Updates", text: "Text, image, and page changes handled as you need them." },
      { icon: "ShieldCheck", title: "Security Monitoring", text: "Ongoing checks to keep your website protected." },
      { icon: "Wrench", title: "Bug Fixes", text: "Issues diagnosed and resolved without long delays." },
      { icon: "Gauge", title: "Performance Checks", text: "Periodic reviews to keep load times and stability strong." },
      { icon: "Database", title: "Backups", text: "Regular backups so your data is never at risk." },
      { icon: "MessageSquare", title: "Direct Support", text: "Talk directly to the developer, not a support queue." },
    ],
    faq: [
      { q: "What's included in ongoing maintenance?", a: "Content updates, security monitoring, performance checks, backups, and bug fixes — the day-to-day upkeep that keeps a website reliable." },
      { q: "What if something breaks urgently?", a: "You reach out directly and we prioritize urgent issues — no ticket queues or account managers in between." },
      { q: "Can you maintain a website you didn't build?", a: "In most cases, yes. We review the existing codebase first to make sure ongoing support can be provided properly." },
      { q: "Is this a monthly plan?", a: "Support can be arranged as an ongoing monthly plan or as needed, depending on how your business prefers to work." },
    ],
  },
};

export const serviceList = Object.values(services);

export function getService(slug) {
  return services[slug] ?? null;
}

export function getAllServiceSlugs() {
  return Object.keys(services);
}

/** Accent colors keyed by service slug for listing/homepage cards. */
export const serviceAccentBySlug = {
  "business-website-development": "blue",
  "web-app-development": "emerald",
  "seo-website-growth": "purple",
  "website-maintenance-support": "orange",
};

// Shared content reused across every service page — process, tech stack,
// industries, why-choose-us, and testimonials read the same across the
// business, so they live here once instead of being duplicated per slug.

export const techStack = [
  { name: "Next.js", icon: "Triangle" },
  { name: "React", icon: "Atom" },
  { name: "Node.js", icon: "Hexagon" },
  { name: "MongoDB", icon: "Leaf" },
  { name: "Express", icon: "Server" },
  { name: "Tailwind CSS", icon: "Wind" },
  { name: "TypeScript", icon: "FileCode2" },
  { name: "Firebase", icon: "Flame" },
];

export const process = [
  { icon: "Compass", title: "Discovery", text: "Understanding your business, audience, and goals." },
  { icon: "ClipboardList", title: "Planning", text: "Mapping the structure, content, and technical approach." },
  { icon: "PenTool", title: "UI Design", text: "Designing a user experience around real customer journeys." },
  { icon: "Code2", title: "Development", text: "Building with clean, modern, maintainable code." },
  { icon: "TestTube2", title: "Testing", text: "Reviewing performance, responsiveness, and edge cases." },
  { icon: "Rocket", title: "Launch", text: "Deploying your project with everything checked and ready." },
  { icon: "LifeBuoy", title: "Support", text: "Staying available for updates and improvements after launch." },
];

export const whyChooseUs = [
  { icon: "UserCheck", title: "Built By A Developer, Not A Sales Team", text: "Direct communication with the person actually building your project." },
  { icon: "Gauge", title: "Performance Comes First", text: "Clean code and optimized assets for a fast, smooth experience." },
  { icon: "Smartphone", title: "Designed For Every Screen", text: "Responsive experiences that work well on any device." },
  { icon: "Search", title: "SEO-Ready From The Start", text: "Semantic structure and metadata built in, not bolted on later." },
  { icon: "KeyRound", title: "You Own Your Digital Assets", text: "Your domain, content, and data belong to you — no lock-in." },
  { icon: "LifeBuoy", title: "Support Beyond Launch", text: "We stay available for updates, fixes, and improvements." },
];

export const industries = [
  { icon: "Stethoscope", name: "Clinics & Healthcare" },
  { icon: "GraduationCap", name: "Coaching & Education" },
  { icon: "Factory", name: "Manufacturing" },
  { icon: "Building2", name: "Local Service Businesses" },
  { icon: "ShoppingBag", name: "E-commerce" },
  { icon: "UtensilsCrossed", name: "Restaurants & Hospitality" },
  { icon: "Briefcase", name: "Professional Services" },
  { icon: "Sun", name: "Solar & Energy" },
];

export const trustStats = [
  { icon: "Users", value: 3, suffix: "+", label: "Happy Clients" },
  { icon: "FolderCheck", value: 3, suffix: "+", label: "Projects Completed" },
  { icon: "CalendarClock", value: 2, suffix: "+", label: "Years of Experience" },
  { icon: "LifeBuoy", value: 24, suffix: "/7", label: "Support Available" },
  { icon: "Smile", value: 100, suffix: "%", label: "Client Satisfaction" },
];
