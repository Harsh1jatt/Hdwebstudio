/**
 * Content Gap & Semantic Completeness Engine
 * Analyzes pages against expected commercial/informational entities and recommends missing coverage.
 */

const TOPICAL_ENTITIES_BY_CATEGORY = {
  "web-development": [
    { term: "responsive design", label: "Mobile-First Responsive Design", importance: "critical" },
    { term: "core web vitals", label: "Core Web Vitals Performance", importance: "critical" },
    { term: "schema markup", label: "Schema.org Structured Data", importance: "high" },
    { term: "ssl certificate", label: "HTTPS & Security Architecture", importance: "high" },
    { term: "conversion optimization", label: "Lead Capture & CRO Funnels", importance: "high" },
    { term: "cms", label: "Admin CMS Management", importance: "medium" },
    { term: "ludhiana", label: "Local Ludhiana / Punjab Authority", importance: "high" },
    { term: "process", label: "Clear Development Timeline / Process", importance: "high" },
    { term: "pricing", label: "Transparent Scoping Guidance", importance: "medium" },
    { term: "faq", label: "Direct Answer FAQs", importance: "high" },
  ],
  "ecommerce": [
    { term: "razorpay", label: "Indian Payment Gateways (Razorpay / UPI)", importance: "critical" },
    { term: "mobile checkout", label: "Single-Click Mobile Checkout", importance: "critical" },
    { term: "product catalog", label: "Searchable Variant Catalog", importance: "high" },
    { term: "gst invoice", label: "Automated GST Compliant Invoicing", importance: "high" },
    { term: "inventory", label: "Stock & Inventory Management", importance: "high" },
    { term: "order tracking", label: "WhatsApp / SMS Order Notifications", importance: "medium" },
  ],
  "seo": [
    { term: "google business profile", label: "Google Business Profile Optimization", importance: "critical" },
    { term: "local 3-pack", label: "Google Maps Local 3-Pack Rankings", importance: "critical" },
    { term: "nap consistency", label: "NAP Consistency & Citations", importance: "high" },
    { term: "localbusiness schema", label: "LocalBusiness Schema JSON-LD", importance: "high" },
    { term: "search console", label: "Google Search Console & Analytics", importance: "high" },
  ],
  "software": [
    { term: "role-based access", label: "Role-Based Permissions (RBAC)", importance: "critical" },
    { term: "database schema", label: "Scalable MongoDB / Relational Data Model", importance: "high" },
    { term: "api integration", label: "Third-Party REST / Webhook APIs", importance: "high" },
    { term: "excel export", label: "Custom PDF / Excel Data Reporting", importance: "medium" },
  ],
};

export function analyzeContentGaps({ content = "", category = "web-development", title = "" }) {
  const lowerContent = (content + " " + title).toLowerCase();
  const normalizedCategory = category.toLowerCase().includes("ecom")
    ? "ecommerce"
    : category.toLowerCase().includes("seo") || category.toLowerCase().includes("growth")
    ? "seo"
    : category.toLowerCase().includes("soft") || category.toLowerCase().includes("app")
    ? "software"
    : "web-development";

  const entities = TOPICAL_ENTITIES_BY_CATEGORY[normalizedCategory] || TOPICAL_ENTITIES_BY_CATEGORY["web-development"];

  const covered = [];
  const missing = [];

  for (const entity of entities) {
    if (lowerContent.includes(entity.term.toLowerCase())) {
      covered.push(entity);
    } else {
      missing.push(entity);
    }
  }

  const coverageScore = Math.round((covered.length / entities.length) * 100);

  return {
    category: normalizedCategory,
    coverageScore,
    totalEntities: entities.length,
    coveredCount: covered.length,
    missingCount: missing.length,
    covered,
    missing,
    recommendations: missing.map((m) => `Add section or explanation covering "${m.label}" to improve topical completeness.`),
  };
}
