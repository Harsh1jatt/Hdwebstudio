/**
 * HD Web Studios — Service Page Generation Prompts
 *
 * Enforces deep domain differentiation across service types (Web Dev vs Local SEO vs Ads vs MERN vs E-Commerce).
 * Strictly guarantees output adheres to the Service CMS schema.
 */

import { slugify } from "../../slugify.js";

export function buildServicePrompt({
  serviceName,
  targetAudience = "",
  location = "",
  businessGoal = "",
  specialInstructions = "",
  existingServices = [],
  brandMemory,
}) {
  const existingTitles = existingServices.map((s) => `"${s.title}" (${s.category})`).join(", ");

  // Clean the service name for headline grounding
  const cleanTitle = serviceName
    .replace(/^(?:generate|create|build|write|make)\s+(?:a\s+)?(?:new\s+)?/i, "")
    .replace(/\s+page.*$/i, "")
    .replace(/\s+for\s+.*$/i, "")
    .trim() || "Service";

  const defaultSlug = slugify(cleanTitle);

  return `TASK: Generate a complete, high-converting service landing page for "${cleanTitle}" at ${brandMemory.brandName}.

SERVICE PARAMETERS:
- Primary Service Name: ${cleanTitle}
- Target Audience: ${targetAudience || "Local & regional business owners, SMEs, manufacturers, and growing brands"}
- Target Location / Geo: ${location || `${brandMemory.primaryMarket.city}, ${brandMemory.primaryMarket.state}, India & Remote`}
- Core Commercial Goal: ${businessGoal || "Generate qualified customer phone calls, direct WhatsApp inquiries, and commercial discovery appointments"}
- User Brief & Special Instructions: ${specialInstructions || "None provided"}

CMS SERVICE INVENTORY (DO NOT DUPLICATE THEIR MESSAGING):
${existingTitles || "None"}

DOMAIN-SPECIFIC MANDATES:
- If this is Local SEO / Google Business Profile (GBP) / Local Search:
  * Focus deeply on: Google Maps 3-Pack rankings, Google Business Profile optimization & verification, geo-targeted keyword relevance, local citations, customer review acquisition funnels, on-page localized Schema.org markup (LocalBusiness schema), and conversion-optimized local inquiry capture.
  * Explicitly DO NOT discuss generic Next.js code, custom React hooks, or unrelated web architecture unless directly relevant to on-page local SEO speed.
  * Never make false ranking guarantees (e.g. do NOT promise "guaranteed #1 ranking").
- If this is Web Development: Focus on speed, mobile layout, conversion architecture, Next.js tech stack, Core Web Vitals, code ownership.
- If this is Google Ads / Paid Search: Focus on search intent keywords, quality score, negative keyword protection, landing page conversion, conversion tracking, CAC/ROAS.
- If this is Custom Web Applications / MERN: Focus on custom business logic, secure authentication, scalable databases, REST/GraphQL APIs, dashboards, operational automation.
- If this is E-Commerce: Focus on product catalog UX, payment gateway integrations, cart abandonment reduction, mobile checkout, inventory sync.
- If this is Website Maintenance: Focus on uptime monitoring, security patching, daily backups, Core Web Vitals maintenance, direct developer SLA.

CRITICAL ANTI-INSTRUCTION RULES:
1. Under NO circumstances should the "title", "slug", "eyebrow", "tagline", or any other field contain prompt preambles, meta instructions, or raw command text (e.g. NEVER use "Generate a...", "You are the...", "Avoid guaranteed...", "Write naturally...").
2. "title" must be a clean, commercial hero headline (e.g. "Local SEO Services in Ludhiana" or "Google Maps & Local Search Optimization").
3. "slug" must be a clean, URL-safe string (e.g. "local-seo-services" or "local-seo-ludhiana").
4. "eyebrow" must be a short 2-4 word badge (e.g. "Local Search Growth" or "Local SEO Services").
5. Return ONLY a valid JSON object matching the exact schema below. Do NOT return blog or article fields.

REQUIRED JSON SCHEMA:
{
  "slug": "${defaultSlug}",
  "icon": "Globe", // Valid Lucide icon: Globe, TrendingUp, Search, MapPin, Gauge, ShieldCheck, Smartphone, ShoppingBag, Layers, Zap
  "eyebrow": "${cleanTitle}",
  "title": "Clear, engaging commercial hero headline",
  "tagline": "Direct 1-sentence value proposition tailored specifically to ${cleanTitle}",
  "shortDescription": "2-sentence punchy summary for service listing cards and mega menu",
  "description": "Comprehensive 3-4 sentence explanation of the service methodology and business outcome",
  "category": "SEO & Growth | Web Development | Web Applications | E-Commerce | Maintenance",
  "accent": "blue | emerald | purple | orange",
  "order": 0,
  "published": true,
  "heroStats": [
    { "label": "e.g. Setup & Audit", "value": "7–10 Days" },
    { "label": "e.g. Local Signals", "value": "100% Verified" },
    { "label": "e.g. Direct Inquiries", "value": "Call & WhatsApp" }
  ],
  "overview": {
    "heading": "Strategic section heading (specific to ${cleanTitle}, not generic)",
    "paragraphs": [
      "First paragraph: Explains the real business problem local business owners face with ${cleanTitle.toLowerCase()}.",
      "Second paragraph: How ${brandMemory.brandName} engineers the solution to deliver measurable local inquiries and visibility."
    ],
    "highlights": [
      { "icon": "Search", "title": "Specific Highlight 1", "text": "Specific benefit explanation" },
      { "icon": "MapPin", "title": "Specific Highlight 2", "text": "Specific benefit explanation" },
      { "icon": "Smartphone", "title": "Specific Highlight 3", "text": "Specific benefit explanation" }
    ]
  },
  "whatYouGet": [
    { "icon": "Search", "title": "Concrete Deliverable 1", "text": "What is included and why it matters" },
    { "icon": "MapPin", "title": "Concrete Deliverable 2", "text": "What is included and why it matters" },
    { "icon": "Layout", "title": "Concrete Deliverable 3", "text": "What is included and why it matters" },
    { "icon": "Gauge", "title": "Concrete Deliverable 4", "text": "What is included and why it matters" },
    { "icon": "Shield", "title": "Concrete Deliverable 5", "text": "What is included and why it matters" },
    { "icon": "Headphones", "title": "Concrete Deliverable 6", "text": "What is included and why it matters" }
  ],
  "faq": [
    { "q": "Context-specific Question 1?", "a": "Direct, practical answer." },
    { "q": "Context-specific Question 2?", "a": "Direct, practical answer." },
    { "q": "Context-specific Question 3?", "a": "Direct, practical answer." },
    { "q": "Context-specific Question 4?", "a": "Direct, practical answer." }
  ],
  "seoTitle": "High-intent SEO Title under 60 chars | HD Web Studios",
  "seoDescription": "Engaging meta description between 120-155 characters with clear value and location.",
  "ogImage": "/images/og-services.jpg"
}`;
}
