import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please provide MONGODB_URI via .env.local");
  process.exit(1);
}

const ServiceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    eyebrow: { type: String, default: "" },
    overview: { type: mongoose.Schema.Types.Mixed, default: {} },
    category: { type: String, default: "Web Development" },
    whatYouGet: { type: Array, default: [] },
    faq: { type: Array, default: [] },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const CORE_SERVICES = [
  {
    slug: "business-website-development",
    title: "Business Website Development",
    eyebrow: "Business Acquisition Systems",
    tagline: "High-performance business websites engineered to generate qualified inquiries and build brand trust.",
    shortDescription: "Custom business websites for companies in Ludhiana, Punjab, and across India looking to convert visitors into loyal clients.",
    description: "We engineer bespoke business websites designed to serve as 24/7 digital acquisition engines. Combining sub-second Next.js architecture, mobile-first UX, and localized search optimization, we help service businesses, manufacturers, and enterprises command authority online.",
    category: "Web Development",
    order: 1,
    published: true,
    whatYouGet: [
      { icon: "Layout", title: "Bespoke Brand Design", text: "Custom layout reflecting your unique brand identity and value proposition" },
      { icon: "Smartphone", title: "Mobile-First UX", text: "Optimized for frictionless browsing across all smartphone screen sizes" },
      { icon: "Search", title: "Local SEO & Schema", text: "Rich Schema.org structured data and on-page technical optimization" },
      { icon: "Gauge", title: "Core Web Vitals Speed", text: "Engineered with modern Next.js stack for instant page loads" },
      { icon: "Shield", title: "Secure Form Capture", text: "Spam-filtered lead capture forms directly integrated with WhatsApp" },
      { icon: "Headphones", title: "Post-Launch Support", text: "Dedicated technical assistance to ensure continuous uptime" },
    ],
    faq: [
      { q: "How long does it take to launch a business website?", a: "Standard business websites are delivered within 7 to 14 business days from kickoff." },
      { q: "Will my website rank on Google in Ludhiana and Punjab?", a: "Every website includes local SEO structure, Schema markup, and localized metadata to maximize search engine discovery." },
      { q: "Can I manage content and inquiries easily?", a: "Yes. You receive access to an intuitive admin portal to review leads and manage updates." },
    ],
    seoTitle: "Business Website Development Company in Ludhiana | HD Web Studios",
    seoDescription: "Professional business website development in Ludhiana, Punjab. Fast, mobile-first, and conversion-focused websites engineered for business growth.",
  },
  {
    slug: "website-redesign-modernization",
    title: "Website Redesign & Modernization",
    eyebrow: "Digital Transformation",
    tagline: "Transform outdated, slow websites into modern, high-converting digital assets.",
    shortDescription: "Complete website redesign services to improve conversion rates, mobile usability, and Google search rankings.",
    description: "If your current website is slow, difficult to navigate on mobile, or failing to generate leads, our website redesign service rebuilds your foundation. We preserve your existing SEO equity while upgrading to a cutting-edge modern stack with modern design aesthetics.",
    category: "Web Development",
    order: 2,
    published: true,
    whatYouGet: [
      { icon: "RefreshCw", title: "Complete UI/UX Refresh", text: "Modern, professional interface aligned with current web design standards" },
      { icon: "Zap", title: "Speed Optimization", text: "Dramatic performance improvement with Next.js App Router" },
      { icon: "Search", title: "SEO Migration Protection", text: "301 redirect mapping and URL preserving to protect Google rankings" },
      { icon: "Smartphone", title: "Mobile Usability Fix", text: "Eliminate mobile layout bugs and improve touch interactions" },
      { icon: "MousePointerClick", title: "Conversion Optimization", text: "Strategic CTA placement to increase lead conversion rates" },
    ],
    faq: [
      { q: "Will I lose my existing Google search rankings during redesign?", a: "No. We implement strict 301 redirect mappings and URL structure matching to preserve your existing search equity." },
      { q: "How do you handle content migration?", a: "We audit, transfer, and format all existing text, images, and case studies into the new architecture." },
    ],
    seoTitle: "Website Redesign Services in Ludhiana, Punjab | HD Web Studios",
    seoDescription: "Upgrade your outdated website with HD Web Studios. Modern UI/UX, faster load speeds, and improved lead conversions without losing SEO rankings.",
  },
  {
    slug: "ecommerce-website-development",
    title: "Ecommerce Website Development",
    eyebrow: "Online Stores & D2C",
    tagline: "Scalable online stores and D2C ecommerce platforms built for seamless checkout and high sales.",
    shortDescription: "Custom ecommerce stores featuring high-speed product catalogs, secure payment gateway integrations, and mobile checkout.",
    description: "Launch and scale your online store with high-performance ecommerce development. We build lightning-fast product catalogs, multi-currency payment gateway integrations (Razorpay, Stripe, UPI), automated inventory controls, and friction-free mobile checkout funnels.",
    category: "E-Commerce",
    order: 3,
    published: true,
    whatYouGet: [
      { icon: "ShoppingBag", title: "Custom Product Catalog", text: "Categorized, searchable inventory with variant filters and high-res galleries" },
      { icon: "CreditCard", title: "Indian & Global Gateways", text: "Seamless integration with UPI, Razorpay, Cashfree, Stripe, and Net Banking" },
      { icon: "Smartphone", title: "1-Click Mobile Checkout", text: "Frictionless checkout experience optimized for high conversion" },
      { icon: "Shield", title: "Secure Order Management", text: "End-to-end encryption with real-time order tracking notifications" },
    ],
    faq: [
      { q: "Which payment gateways do you integrate for Indian businesses?", a: "We integrate Razorpay, Cashfree, Paytm, PhonePe, Stripe, and direct UPI gateways." },
      { q: "Can I manage products and inventory myself?", a: "Yes. An administrative portal allows you to add products, adjust pricing, and track orders effortlessly." },
    ],
    seoTitle: "Ecommerce Website Development in Ludhiana | HD Web Studios",
    seoDescription: "High-speed ecommerce website development for D2C brands and retailers. Razorpay, UPI integration, and friction-free mobile checkout.",
  },
  {
    slug: "custom-web-application-development",
    title: "Custom Web Application Development",
    eyebrow: "Full-Stack Software",
    tagline: "Scalable web applications, customer portals, and internal business tools built on Next.js and MERN stack.",
    shortDescription: "Bespoke SaaS applications, customer portals, and workflow automation platforms tailored to your business operations.",
    description: "When off-the-shelf software doesn't fit your operational workflow, we build custom full-stack web applications. From multi-role client portals to SaaS platforms and automated ERPs, we deliver robust solutions using React, Next.js, Node.js, and MongoDB.",
    category: "Web Applications",
    order: 4,
    published: true,
    whatYouGet: [
      { icon: "Code", title: "Full-Stack Architecture", text: "Next.js, Node.js, and MongoDB engineered for horizontal scalability" },
      { icon: "Lock", title: "Role-Based Access Control", text: "Granular permissions for admins, managers, clients, and staff" },
      { icon: "Database", title: "Custom Database Schemas", text: "Optimized indexing and secure relational/document models" },
      { icon: "Server", title: "API Integrations", text: "Third-party CRM, WhatsApp API, accounting, and payment integrations" },
    ],
    faq: [
      { q: "What tech stack do you use for custom software?", a: "We primarily build on Next.js, React, Node.js, Express, MongoDB, and Tailwind CSS." },
      { q: "Do I own 100% of the code and intellectual property?", a: "Yes. You retain complete ownership of all source code, database architectures, and assets." },
    ],
    seoTitle: "Custom Web Application Development in Ludhiana | MERN & Next.js",
    seoDescription: "Custom web app development company in Ludhiana. Full-stack MERN, SaaS portals, and scalable cloud software solutions by HD Web Studios.",
  },
  {
    slug: "business-management-software",
    title: "Business Management Software",
    eyebrow: "Operational Systems",
    tagline: "Custom internal software to automate workflows, manage inventory, track staff, and simplify billing.",
    shortDescription: "Tailored business management software designed for Indian manufacturers, trading firms, and service enterprises.",
    description: "Replace messy spreadsheets and rigid off-the-shelf software with a custom business management platform engineered for your exact operational workflow. We build multi-user systems for inventory tracking, invoicing, vendor management, and real-time operational reporting.",
    category: "Web Applications",
    order: 5,
    published: true,
    whatYouGet: [
      { icon: "Database", title: "Centralized Database", text: "Single source of truth for clients, inventory, orders, and vendors" },
      { icon: "Users", title: "Role-Based Permissions", text: "Custom access levels for management, staff, accountants, and field teams" },
      { icon: "FileText", title: "GST Invoicing & Reports", text: "Automated GST-compliant invoice generation and tax summaries" },
      { icon: "ShieldCheck", title: "Data Security & Backups", text: "Encrypted data storage with automated daily cloud backups" },
    ],
    faq: [
      { q: "How is custom software better than off-the-shelf tools?", a: "Off-the-shelf tools charge monthly per-user fees and force your business into their rigid format. Custom software is built around your workflow and owned entirely by you." },
      { q: "Can this software work on mobile devices and tablets?", a: "Yes. All our management applications are fully responsive web applications accessible on mobile phones, tablets, and desktops." },
    ],
    seoTitle: "Custom Business Management Software Development | HD Web Studios",
    seoDescription: "Custom business management software for manufacturers and trading companies in Punjab. Automate inventory, invoicing, and operations.",
  },
  {
    slug: "institute-management-software",
    title: "Institute Management Software",
    eyebrow: "Education Technology",
    tagline: "Comprehensive digital management systems for schools, coaching institutes, colleges, and training centers.",
    shortDescription: "Custom institute management portals for student admissions, fee tracking, attendance, and exam management.",
    description: "Streamline administration for educational institutions. Our institute management software simplifies student admissions, automated fee receipt generation, SMS/WhatsApp notifications to parents, teacher scheduling, and online student performance reporting.",
    category: "Web Applications",
    order: 6,
    published: true,
    whatYouGet: [
      { icon: "GraduationCap", title: "Student Admission & Records", text: "Digital enrollment forms, batch assignments, and student profile tracking" },
      { icon: "CreditCard", title: "Fee Collection & Receipts", text: "Automated fee installment reminders, online payments, and GST receipts" },
      { icon: "Calendar", title: "Attendance & Scheduling", text: "Daily attendance logs with instant WhatsApp/SMS notification triggers" },
      { icon: "Award", title: "Exam & Report Cards", text: "Digital grading system with downloadable PDF progress reports" },
    ],
    faq: [
      { q: "Can parents access student records and pay fees online?", a: "Yes. We provide parent portals with integrated payment gateways (UPI, Razorpay) for fee payments." },
      { q: "Can this system handle multiple branches or campuses?", a: "Yes. Multi-campus hierarchy allows head office administration alongside branch-specific staff permissions." },
    ],
    seoTitle: "Institute Management Software Development | School & Coaching Portals",
    seoDescription: "Custom institute management software for schools, coaching centers, and colleges in Punjab. Admissions, fee tracking, and student portals.",
  },
  {
    slug: "lead-generation-digital-growth",
    title: "Lead Generation & Digital Growth",
    eyebrow: "Customer Acquisition",
    tagline: "High-converting sales funnels, localized landing pages, and search optimization to drive continuous inquiries.",
    shortDescription: "End-to-end digital acquisition systems that turn search visitors and ad traffic into qualified customer inquiries.",
    description: "Building a website is only step one. Our digital growth systems combine fast-loading dedicated landing pages, Google conversion tracking, WhatsApp chat triggers, and on-page CRO (Conversion Rate Optimization) to turn existing website visitors into paying customers.",
    category: "SEO & Growth",
    order: 7,
    published: true,
    whatYouGet: [
      { icon: "TrendingUp", title: "High-Conversion Landing Pages", text: "Frictionless, single-goal pages engineered for maximum inquiry capture" },
      { icon: "Target", title: "Conversion Tracking & GA4", text: "Precise event tracking on form submissions, phone calls, and WhatsApp clicks" },
      { icon: "MessageSquare", title: "WhatsApp Lead Capture", text: "Pre-filled chat triggers connecting buyers directly with your sales team" },
      { icon: "SearchCheck", title: "Search Engine Funnels", text: "Organic search alignment targeting commercial high-intent search keywords" },
    ],
    faq: [
      { q: "How do you measure conversion rate improvements?", a: "We configure Google Analytics 4 and Google Tag Manager to track every phone call, WhatsApp trigger, and form completion." },
      { q: "Do we need running ads for this to work?", a: "No. While it enhances paid advertising ROI, it also dramatically improves lead generation from existing organic search traffic." },
    ],
    seoTitle: "Lead Generation & Digital Growth Services | HD Web Studios",
    seoDescription: "Turn website traffic into qualified inquiries. Conversion-focused landing pages, WhatsApp funnels, and local growth systems by HD Web Studios.",
  },
  {
    slug: "local-seo-google-business-optimization",
    title: "Local SEO & Google Business Profile",
    eyebrow: "Local Search Domination",
    tagline: "Dominate Google Maps and local search results to capture high-intent customers in your region.",
    shortDescription: "Local SEO services in Ludhiana and Punjab designed to position your business in Google's Local 3-Pack and organic search.",
    description: "Capture nearby buyers searching for your services. We optimize your Google Business Profile, structure localized geo-targeted landing pages, build authoritative local citations, and implement LocalBusiness Schema markup to ensure you dominate regional search results.",
    category: "SEO & Growth",
    order: 8,
    published: true,
    whatYouGet: [
      { icon: "MapPin", title: "Google Business Optimization", text: "Complete profile verification, category targeting, and keyword optimization" },
      { icon: "Search", title: "Local Schema Markup", text: "Geo-coordinates, postal addresses, and service area structured data" },
      { icon: "FileText", title: "Geo-Targeted Content", text: "Location-specific landing pages targeting high-intent local keywords" },
      { icon: "Award", title: "Review Acquisition Strategy", text: "Frictionless review generation funnels to build local social proof" },
    ],
    faq: [
      { q: "How long does it take to see results from Local SEO?", a: "Local search improvements typically manifest within 30 to 60 days of profile optimization and citation building." },
      { q: "Do you guarantee #1 ranking on Google Maps?", a: "No ethical agency guarantees #1 rankings, as Google algorithms fluctuate. We implement verified white-hat local SEO practices that maximize ranking probability." },
    ],
    seoTitle: "Local SEO Company in Ludhiana | Google Business Profile Experts",
    seoDescription: "Dominate Google Maps in Ludhiana & Punjab with HD Web Studios. Expert Local SEO, Google Business Profile optimization, and local citation building.",
  },
  {
    slug: "website-maintenance-security-support",
    title: "Website Maintenance & Support",
    eyebrow: "Peace of Mind",
    tagline: "Proactive security patching, daily backups, speed monitoring, and on-demand technical support.",
    shortDescription: "Keep your website secure, fast, and always online with our comprehensive website maintenance and monitoring plans.",
    description: "Your website is a critical business asset that requires ongoing care. Our maintenance services provide daily cloud backups, uptime monitoring, security updates, SSL management, and on-demand content edits so you can focus entirely on growing your business.",
    category: "Maintenance",
    order: 9,
    published: true,
    whatYouGet: [
      { icon: "ShieldCheck", title: "Security & Vulnerability Patching", text: "Routine package audits and protection against cyber threats" },
      { icon: "Clock", title: "24/7 Uptime Monitoring", text: "Automated alerts with immediate incident response" },
      { icon: "Database", title: "Automated Cloud Backups", text: "Daily database and asset snapshots stored securely offsite" },
      { icon: "Headphones", title: "On-Demand Content Updates", text: "Quick turnaround for text changes, image swaps, and banner updates" },
    ],
    faq: [
      { q: "What does website maintenance cover?", a: "Maintenance covers security patches, uptime monitoring, cloud backups, bug fixes, and minor content updates." },
      { q: "What happens if my site experiences downtime?", a: "Our monitoring alerts us immediately, allowing our team to investigate and restore operations promptly." },
    ],
    seoTitle: "Website Maintenance & Support Services in Ludhiana | HD Web Studios",
    seoDescription: "Reliable website maintenance and support in Ludhiana, Punjab. 24/7 uptime monitoring, security patching, and fast technical support.",
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  for (const service of CORE_SERVICES) {
    const existing = await Service.findOne({ slug: service.slug });
    if (existing) {
      console.log(`Updating service: "${service.title}" (${service.slug})`);
      Object.assign(existing, service);
      await existing.save();
    } else {
      console.log(`Creating service: "${service.title}" (${service.slug})`);
      await Service.create(service);
    }
  }

  console.log("Core services seeded and updated successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
