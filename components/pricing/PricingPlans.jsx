import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Zap, Smartphone, Search, Database, MessageSquare, BarChart3, Lock, Code2 } from "lucide-react";
import { whatsAppUrl, siteConfig } from "@/config/site";

const DEFAULT_PLANS = [
  {
    name: "Starter Website",
    badge: "Fast Launch",
    price: "₹14,999",
    period: "one-time",
    description: "Ideal for local service businesses, clinics, and professionals needing a high-speed, authoritative online presence.",
    features: [
      "Custom responsive design (up to 5 pages)",
      "Next.js App Router sub-second load speeds",
      "Mobile-first UI & touch-optimized UX",
      "Google Search Console & on-page SEO setup",
      "Spam-protected contact & WhatsApp lead capture",
      "7–10 business days delivery",
      "100% full source code & asset ownership",
    ],
    cta: "Choose Starter",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Business Acquisition",
    badge: "Most Popular",
    price: "₹29,999",
    period: "one-time",
    description: "For growing companies and manufacturers that need active customer acquisition, local SEO dominance, and blog CMS.",
    features: [
      "Complete bespoke website (up to 10+ pages)",
      "Full CMS for blog & service management",
      "LocalBusiness Schema & Google Maps optimization",
      "Conversion-engineered lead capture funnels",
      "GA4 custom event & conversion tracking",
      "Speed optimization for Google Core Web Vitals",
      "30 days post-launch priority support",
    ],
    cta: "Choose Business",
    href: "/contact",
    highlight: true,
  },
  {
    name: "Custom Software & Ecommerce",
    badge: "Tailored Scope",
    price: "Custom Quote",
    period: "milestone-based",
    description: "For D2C ecommerce stores, multi-role web apps, SaaS portals, and custom business management software.",
    features: [
      "Full-stack Next.js, Node.js & MongoDB architecture",
      "Payment gateway integration (Razorpay, UPI, Stripe)",
      "Role-based user permissions & admin controls",
      "Custom database models & automated workflows",
      "Third-party API & webhook integrations",
      "Dedicated staging & production deployment",
      "Comprehensive SLA & technical maintenance",
    ],
    cta: "Request Scoping Call",
    href: "/contact",
    highlight: false,
  },
];

const comparisonMatrix = [
  { feature: "Target Page Count", starter: "Up to 5 Pages", business: "Up to 10+ Pages", custom: "Unlimited Custom Scope" },
  { feature: "Tech Architecture", starter: "Next.js App Router", business: "Next.js App Router", custom: "Full-Stack Next.js + MongoDB" },
  { feature: "Mobile-First UX", starter: "✓ Included", business: "✓ Included", custom: "✓ Bespoke Workflows" },
  { feature: "Core Web Vitals Tuning", starter: "✓ Sub-second", business: "✓ Sub-second (95+)", custom: "✓ Edge Optimized" },
  { feature: "Content Management (CMS)", starter: "Static Markdown", business: "✓ Full Admin CMS", custom: "✓ Multi-Role Admin Panel" },
  { feature: "LocalBusiness Schema", starter: "Basic Schema", business: "✓ Comprehensive JSON-LD", custom: "✓ Custom Schema Types" },
  { feature: "WhatsApp & Form Leads", starter: "✓ Included", business: "✓ Advanced Tracking", custom: "✓ Webhook / CRM Sync" },
  { feature: "Payment Gateway Integration", starter: "—", business: "Optional Add-on", custom: "✓ Razorpay, UPI, Stripe" },
  { feature: "Analytics & Event Tracking", starter: "GA4 Basic", business: "✓ GA4 Funnel Tracking", custom: "✓ Custom Event Telemetry" },
  { feature: "Source Code Ownership", starter: "100% Yours", business: "100% Yours", custom: "100% Yours" },
  { feature: "Typical Delivery Timeline", starter: "7–10 Days", business: "10–14 Days", custom: "3–6 Weeks" },
];

const includedInAll = [
  {
    icon: Zap,
    title: "Sub-Second Performance",
    description: "Engineered with Next.js Server Components, optimized WebP/AVIF images, and code-splitting for maximum speed.",
  },
  {
    icon: ShieldCheck,
    title: "100% IP Code Ownership",
    description: "You own all code, repositories, design assets, and database schemas with zero vendor lock-in or recurring software licenses.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Touch Design",
    description: "Crafted specifically for smartphones and tablets to provide thumb-friendly navigation and effortless readability.",
  },
  {
    icon: Search,
    title: "Technical SEO & Schema",
    description: "Semantic HTML hierarchy, Open Graph social cards, XML sitemaps, and LocalBusiness structured data built-in from day one.",
  },
  {
    icon: MessageSquare,
    title: "Direct WhatsApp Conversion",
    description: "Click-to-chat triggers pre-filled with service context so searchers convert immediately into qualified conversations.",
  },
  {
    icon: Lock,
    title: "Enterprise Grade Security",
    description: "SSL encryption, sanitized form endpoints, spam protection, and zero vulnerable third-party plugins.",
  },
];

const pricingFaqs = [
  {
    q: "Are there any hidden recurring fees or monthly software licenses?",
    a: "No. Unlike agencies building on template builders with recurring plugin subscriptions, our custom Next.js websites have zero mandatory monthly licensing overhead. You only pay for your domain and standard cloud hosting.",
  },
  {
    q: "Do I own the complete website source code and database?",
    a: "Yes, 100%. Upon project milestone completion and full payment, you receive complete GitHub repository ownership, database credentials, and production deployment control with zero vendor lock-in.",
  },
  {
    q: "What is your payment milestone structure?",
    a: "Our standard payment structure is 50% advance upon project kickoff and requirement finalization, and 50% upon final staging review, QA approval, and live deployment.",
  },
  {
    q: "How long does a Starter or Business website take to launch?",
    a: "Starter websites typically launch within 7 to 10 business days. Comprehensive Business Acquisition websites with custom CMS take 10 to 14 business days.",
  },
  {
    q: "Can I upgrade my package or add new features later?",
    a: "Yes. Our modular Next.js architecture allows you to easily add ecommerce capabilities, custom portals, new service landing pages, or automated workflows at any time.",
  },
  {
    q: "How do you ensure our website ranks locally in Ludhiana and Punjab?",
    a: "We implement comprehensive on-page SEO, localized meta tags, clean URL slugs, LocalBusiness Schema JSON-LD markup with geo-coordinates, and high-speed Core Web Vitals optimization.",
  },
];

export default function PricingPlans({ plans = [] }) {
  const displayPlans = plans.length >= 3 ? plans : DEFAULT_PLANS;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative border-b border-slate-100 bg-slate-50/50 py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles size={13} className="text-blue-600" />
            Transparent Investment
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg max-w-2xl mx-auto">
            Clear packages with zero hidden fees. Every project includes 100% full source code ownership, sub-second Next.js performance, and direct developer communication.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {displayPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition-all duration-300 ${
                  plan.highlight
                    ? "border-blue-600 ring-2 ring-blue-600/10 shadow-lg bg-white"
                    : "border-slate-200/80 bg-slate-50/30 hover:bg-white hover:border-slate-300"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    {plan.badge || "Recommended"}
                  </span>
                )}

                <div>
                  {!plan.highlight && plan.badge && (
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {plan.badge}
                    </span>
                  )}
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    {plan.name}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 border-y border-slate-100 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-xs text-slate-400">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-3">
                    {(plan.features || []).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-700">
                        <Check size={16} className="mt-0.5 shrink-0 text-blue-600" />
                        <span>{typeof feat === "string" ? feat : feat.name || feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <Link
                    href={plan.href || "/contact"}
                    className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                      plan.highlight
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                        : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {plan.cta || "Get Started"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Scope Note */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <ShieldCheck size={16} className="text-blue-600" />
              Custom Project Scoping
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              Custom web applications, ERPs, examination portals, and large ecommerce platforms are scoped individually based on database requirements, integration points, and user roles. Contact us for a fixed milestone estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Package Deliverables Comparison
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Compare features and deliverables across our standard packages to find the right fit for your business.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left border-collapse bg-white rounded-2xl border border-slate-200 shadow-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-950">Feature / Deliverable</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-700">Starter Website</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50/50">Business Acquisition</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-700">Custom Software</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {comparisonMatrix.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}>
                    <td className="py-3.5 px-6 font-semibold text-slate-950">{row.feature}</td>
                    <td className="py-3.5 px-6 text-slate-600">{row.starter}</td>
                    <td className="py-3.5 px-6 font-medium text-blue-900 bg-blue-50/30">{row.business}</td>
                    <td className="py-3.5 px-6 text-slate-600">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's Included in Every Build */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Engineering Standards Included in Every Build
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              We never compromise on fundamental quality. Every project we engineer adheres to strict production benchmarks.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {includedInAll.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROI Calculator / Business Case */}
      <section className="border-t border-slate-100 bg-slate-900 py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-white">
            A Website That Pays for Itself
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            A high-performance business website is not a marketing expense — it is an active sales asset. When your website ranks for commercial queries and provides frictionless WhatsApp triggers, the return on investment is immediate.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 text-left">
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Step 1: Traffic</span>
              <p className="mt-2 text-xl font-extrabold text-white">+500 Local Visitors</p>
              <p className="mt-1 text-xs text-slate-400">Targeted searchers looking for services in Ludhiana & Punjab.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 2: Conversion</span>
              <p className="mt-2 text-xl font-extrabold text-white">15–25 Qualified Inquiries</p>
              <p className="mt-1 text-xs text-slate-400">High-converting WhatsApp triggers and spam-filtered forms.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Step 3: Revenue</span>
              <p className="mt-2 text-xl font-extrabold text-white">3–6 New Clients</p>
              <p className="mt-1 text-xs text-slate-400">Consistently generating multiple times your initial investment.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Request Custom Estimate
            </Link>
            <a
              href={whatsAppUrl("Hi Harshdeep, I'm reviewing the pricing packages on hdwebstudios.in and would like to discuss my project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
            >
              <MessageSquare size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Frequently Asked Questions About Pricing
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Clear answers to the questions our clients ask most often.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {pricingFaqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="text-base font-bold text-slate-950">{faq.q}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
