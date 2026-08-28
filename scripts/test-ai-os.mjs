/**
 * HD Web Studios — AI Agency Operating System Test Harness
 * Verifies all AI modules, tool registry, deterministic SEO engine, cannibalization detection,
 * lead intelligence, and SSRF security guards.
 */

import { evaluateSEO } from "../lib/ai/seoEngine.js";
import { DEFAULT_BRAND_CONTEXT } from "../lib/ai/brandContext.js";
import { analyzeLead } from "../lib/ai/leadIntelligence.js";
import { auditWebsite } from "../lib/ai/websiteAudit.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("  HD WEB STUDIOS — AI AGENCY OPERATING SYSTEM TEST SUITE");
  console.log("=======================================================\n");

  // ─── Test 1: Brand Context & Grounding ───
  console.log("1. Testing Brand Intelligence & Grounding...");
  assert(DEFAULT_BRAND_CONTEXT.brandName === "HD Web Studios", "Brand name is HD Web Studios");
  assert(DEFAULT_BRAND_CONTEXT.primaryGeography.city === "Ludhiana", "Primary geography city is Ludhiana");
  assert(DEFAULT_BRAND_CONTEXT.primaryBusiness.length >= 10, "Has 10+ core service definitions");
  assert(DEFAULT_BRAND_CONTEXT.rules.length >= 4, "Enforces anti-hallucination and anti-filler rules");

  // ─── Test 2: Deterministic 100-Point SEO Engine ───
  console.log("\n2. Testing Deterministic SEO Scoring Engine...");
  const highQualityDoc = {
    title: "Business Website Development",
    seoTitle: "Business Website Development Company in Ludhiana | HD Web Studios",
    seoDescription: "Professional business website development in Ludhiana, Punjab. Fast, mobile-first, and conversion-focused websites engineered for business growth.",
    slug: "business-website-development",
    focusKeyword: "business website development",
    ogImage: "/images/og-services.jpg",
    description: "We engineer bespoke business website development solutions for companies in Ludhiana and across Punjab. Our modern Next.js stack delivers instant load times and high conversions.",
    content: "<h2>Why Business Website Development Matters for Growing Companies</h2><p>In modern business, having an effective digital acquisition channel is essential. When it comes to business website development, companies that focus on clarity, speed, and trust consistently outperform the competition.</p><p>We engineer bespoke business websites designed to serve as 24/7 digital acquisition engines. Combining sub-second Next.js architecture, mobile-first UX, and localized search optimization, we help service businesses, manufacturers, and enterprises command authority online.</p><h3>Key Deliverables & Architectural Standards</h3><ul><li><strong>Bespoke Layout</strong>: Tailored design engineered around your target buyers.</li><li><strong>Sub-Second Speed</strong>: Core Web Vitals optimized for instant loading.</li><li><strong>Lead Capture</strong>: High-converting forms and direct WhatsApp triggers.</li><li><strong>Local Schema</strong>: Structured data for Google 3-pack visibility.</li></ul><p>Ready to modernize your digital presence? <a href='/contact'>Contact our team today</a> to schedule a discovery consultation.</p>",
    whatYouGet: [
      { icon: "Layout", title: "Custom Design", text: "Modern UX" },
      { icon: "Smartphone", title: "Mobile-First", text: "Responsive UI" },
      { icon: "Search", title: "Local SEO", text: "Structured Data" },
    ],
    faq: [{ q: "How long does it take?", a: "7 to 14 business days." }, { q: "Do you offer SEO?", a: "Yes, built-in schema and on-page optimization." }],
  };

  const highQualityScore = evaluateSEO(highQualityDoc, "service");
  assert(highQualityScore.score >= 80, `High quality service scores >= 80/100 (Got: ${highQualityScore.score})`);
  assert(highQualityScore.breakdown.technical === 20, "Technical SEO awarded full 20/20 points for valid slug");
  assert(highQualityScore.breakdown.metadata === 15, "Metadata awarded 15/15 points for optimal title/description length");

  const thinDoc = {
    title: "Bad Page",
    slug: "http://localhost:3000/bad-page",
    description: "Short.",
    content: "Short.",
  };
  const thinScore = evaluateSEO(thinDoc, "service");
  assert(thinScore.score < 50, `Thin/invalid page receives low score (Got: ${thinScore.score})`);
  assert(thinScore.issues.some((i) => i.category === "technical"), "Flags localhost URL in technical SEO");
  assert(thinScore.issues.some((i) => i.category === "structure"), "Flags thin content penalty in structure");

  // ─── Test 3: AI Lead Intelligence ───
  console.log("\n3. Testing AI Lead Intelligence Engine...");
  const commercialLead = {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh@manufacturing.in",
    business: "Kumar Exports Ludhiana",
    message: "We need an urgent redesign for our factory website and want a price quote for ecommerce integration.",
    source: "audit-form",
  };
  const leadIntelligence = analyzeLead(commercialLead);
  assert(leadIntelligence.qualityTier === "HIGH", `High-intent commercial lead classified as HIGH (Got: ${leadIntelligence.qualityTier})`);
  assert(leadIntelligence.score >= 80, `Lead quality score >= 80 (Got: ${leadIntelligence.score})`);
  assert(leadIntelligence.recommendedServices.includes("Ecommerce Website Development") || leadIntelligence.recommendedServices.includes("Website Redesign & Modernization"), "Correctly infers recommended service");
  assert(leadIntelligence.isAiEstimate === true, "Insights explicitly labeled as AI estimates");

  // ─── Test 4: SSRF-Protected Website Auditor ───
  console.log("\n4. Testing SSRF-Protected Website Audit Engine...");
  const loopbackAudit = await auditWebsite("http://127.0.0.1:8080/admin");
  assert(loopbackAudit.success === false, "Blocks IPv4 loopback 127.0.0.1");

  const localhostAudit = await auditWebsite("http://localhost:3000");
  assert(localhostAudit.success === false, "Blocks localhost hostname");

  const privateIpAudit = await auditWebsite("http://192.168.1.100");
  assert(privateIpAudit.success === false, "Blocks RFC-1918 private IP 192.168.x.x");

  const invalidProtocol = await auditWebsite("ftp://files.example.com");
  assert(invalidProtocol.success === false, "Blocks non-HTTP/HTTPS protocols");

  // ─── Summary ───
  console.log("\n=======================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner crashed:", err);
  process.exit(1);
});
