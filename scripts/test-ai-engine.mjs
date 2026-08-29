/**
 * HD Web Studios — Comprehensive AI Engine Verification Test Script
 */

import connectDB from "../lib/db.js";
import { executeAiTask, extractAndParseJson } from "../lib/ai/engine.js";
import { getBrandMemory, DEFAULT_BRAND_MEMORY } from "../lib/ai/context/brandMemory.js";
import { generateLocalFallback } from "../lib/ai/providers/local.js";

async function runTests() {
  console.log("==================================================");
  console.log("HD WEB STUDIOS — AI ENGINE VERIFICATION SUITE");
  console.log("==================================================\n");

  await connectDB().catch((err) => console.log("DB notice (running with static defaults):", err.message));

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  // ─── Test 1: Brand Memory ───
  console.log("--- 1. Brand Memory & Anti-Cliché Rules ---");
  const brand = await getBrandMemory();
  assert(brand.brandName === "HD Web Studios", "Brand name matches HD Web Studios");
  assert(brand.primaryMarket.city === "Ludhiana", "Primary city matches Ludhiana");
  assert(Array.isArray(brand.bannedClichés) && brand.bannedClichés.length >= 10, "Banned clichés list loaded");

  // ─── Test 2: Local Deterministic Fallback ───
  console.log("\n--- 2. Local Fallback Generator ---");
  const localServiceRes = generateLocalFallback({ contentType: "service", prompt: "Google Ads Management" });
  const localService = JSON.parse(localServiceRes.text);
  assert(localService.title.length > 0, "Local fallback generates service title");
  assert(Array.isArray(localService.whatYouGet) && localService.whatYouGet.length >= 4, "Local fallback has deliverables");
  assert(Array.isArray(localService.faq) && localService.faq.length >= 2, "Local fallback has FAQs");

  const localBlogRes = generateLocalFallback({ contentType: "blog", prompt: "Next.js vs WordPress for Business" });
  const localBlog = JSON.parse(localBlogRes.text);
  assert(localBlog.content.includes("<h2>"), "Local fallback blog includes semantic H2 tags");
  assert(localBlog.seoTitle.length <= 65, "Local fallback blog has SEO title");

  // ─── Test 3: JSON Repair & Parser ───
  console.log("\n--- 3. Defensive JSON Parser ---");
  const rawWithCodeBlock = '```json\n{"title": "Test Service", "slug": "test-service", "features": ["Speed", "SEO",]}\n```';
  const parsed = extractAndParseJson(rawWithCodeBlock);
  assert(parsed.title === "Test Service", "Extracts JSON from markdown code block and repairs trailing commas");

  // ─── Test 4: Service Generation via Central Dispatcher ───
  console.log("\n--- 4. Service Page Generation ---");
  const serviceRes = await executeAiTask({
    task: "generate_service",
    input: {
      serviceName: "Google Ads Campaign Management",
      targetAudience: "Real estate developers & manufacturers in Punjab",
      location: "Ludhiana, Punjab & Pan-India",
      businessGoal: "High-intent buyer leads and negative keyword cost reduction",
    },
  });

  assert(serviceRes.success === true, "generate_service executed successfully", serviceRes.error);
  if (serviceRes.content) {
    const s = serviceRes.content;
    assert(Boolean(s.title && s.tagline && s.description), "Service contains hero title, tagline, description");
    assert(Boolean(s.overview?.heading && s.overview?.paragraphs?.length), "Service contains overview narrative");
    assert(Array.isArray(s.whatYouGet) && s.whatYouGet.length >= 3, "Service contains whatYouGet deliverables array");
    assert(Array.isArray(s.faq) && s.faq.length >= 2, "Service contains FAQ array");
    assert(Boolean(s.seoTitle && s.seoDescription), "Service contains SEO metadata");

    // Check anti-clichés
    const fullText = JSON.stringify(s).toLowerCase();
    const foundBanned = DEFAULT_BRAND_MEMORY.bannedClichés.filter((c) => fullText.includes(c.toLowerCase()));
    assert(foundBanned.length === 0, `No banned clichés in generated service (found: ${foundBanned.join(", ") || "none"})`);
  }

  // ─── Test 4b: Complex Instruction Prompt for Local SEO Services ───
  console.log("\n--- 4b. Local SEO Service with Full User Brief Prompt ---");
  const localSeoPrompt = "Generate a Local SEO Services page for small businesses in Ludhiana. Focus on Google Maps visibility, Google Business Profile optimization, local search, reviews, location relevance and generating enquiries. Avoid guaranteed ranking claims and generic AI/agency language. Write naturally for a business owner.";

  const localSeoRes = await executeAiTask({
    task: "generate_service",
    input: {
      serviceName: localSeoPrompt,
      prompt: localSeoPrompt,
    },
  });

  assert(localSeoRes.success === true, "generate_service with complex brief executed successfully", localSeoRes.error);
  if (localSeoRes.content) {
    const ls = localSeoRes.content;
    assert(ls.title && !ls.title.toLowerCase().startsWith("generate a"), `Service title is clean (got: "${ls.title}")`);
    assert(ls.slug && !ls.slug.includes("generate-a"), `Slug is clean and URL-safe: "${ls.slug}"`);
    assert(ls.category === "SEO & Growth", `Category is accurately categorized as "SEO & Growth" (got: "${ls.category}")`);
    assert(Array.isArray(ls.whatYouGet) && ls.whatYouGet.length >= 4, `whatYouGet contains ${ls.whatYouGet?.length} structured deliverables`);
    assert(Array.isArray(ls.faq) && ls.faq.length >= 3, `faq contains ${ls.faq?.length} structured QA pairs`);
    assert(ls.readingTime === undefined && ls.excerpt === undefined, "Service output strictly does not contain blog schema fields");

    // Validate domain relevance (Google Maps / Local SEO / GBP)
    const lsString = JSON.stringify(ls).toLowerCase();
    const hasLocalKeywords = /maps|google business profile|gbp|local search|citations|ludhiana/i.test(lsString);
    assert(hasLocalKeywords, "Service content discusses Google Maps, GBP, local search, and Ludhiana relevance");
  }

  // ─── Test 5: Blog Outline and Article Generation ───
  console.log("\n--- 5. Blog Generation & Outline-First Flow ---");
  const outlineRes = await executeAiTask({
    task: "generate_blog_outline",
    input: {
      topic: "How Much Does a Business Website Cost in India?",
      focusKeyword: "website cost in india",
    },
  });

  assert(outlineRes.success === true, "generate_blog_outline executed successfully", outlineRes.error);
  assert(Array.isArray(outlineRes.outline?.sections) && outlineRes.outline.sections.length >= 3, "Blog outline contains structured sections");

  const blogFromOutlineRes = await executeAiTask({
    task: "generate_blog_from_outline",
    input: {
      topic: "How Much Does a Business Website Cost in India?",
      outline: outlineRes.outline,
      focusKeyword: "website cost in india",
    },
  });

  assert(blogFromOutlineRes.success === true, "generate_blog_from_outline executed successfully", blogFromOutlineRes.error);
  if (blogFromOutlineRes.content) {
    const b = blogFromOutlineRes.content;
    assert(b.content.includes("<h2>") && b.content.includes("<p>"), "Blog body contains semantic HTML tags (<h2>, <p>)");
    assert(Boolean(b.seoTitle && b.seoDescription), "Blog contains SEO metadata");
  }

  // ─── Test 6: Project / Case Study Factual Generation ───
  console.log("\n--- 6. Case Study Generation (Strict Factuality) ---");
  const projectRes = await executeAiTask({
    task: "generate_project",
    input: {
      projectName: "Next.js Solar Energy Customer Portal",
      client: "SunPower Punjab",
      industry: "Renewable Energy",
      technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    },
  });

  assert(projectRes.success === true, "generate_project executed successfully", projectRes.error);
  if (projectRes.content) {
    const p = projectRes.content;
    assert(Boolean(p.challenge && p.solution), "Project contains challenge and solution narratives");
    assert(Array.isArray(p.features) && p.features.length >= 2, "Project contains features array");
    assert(Array.isArray(p.results) && p.results.length >= 1, "Project contains outcomes array");
  }

  // ─── Test 7: Field-Level Content Improver ───
  console.log("\n--- 7. Content Improver (make_human & rewrite) ---");
  const textToImprove = "In today's fast-paced digital world, we offer cutting-edge seamless solutions to take your business to the next level.";
  const improveRes = await executeAiTask({
    task: "improve_content",
    input: {
      text: textToImprove,
      action: "make_human",
    },
  });

  assert(improveRes.success === true, "improve_content executed successfully", improveRes.error);
  assert(improveRes.improved?.length > 10, "Improvement produced valid text");
  assert(!improveRes.improved.toLowerCase().includes("cutting-edge"), "Improvement removed 'cutting-edge'");

  // ─── Test 8: AI Content Quality Reviewer ───
  console.log("\n--- 8. AI Content Quality Reviewer ---");
  const reviewRes = await executeAiTask({
    task: "review_content",
    input: {
      title: "Ecommerce Web Development",
      content: "We provide bespoke e-commerce platforms designed for fast load times and clean checkout UX.",
      contentType: "service",
    },
  });

  assert(reviewRes.success === true, "review_content executed successfully", reviewRes.error);
  assert(typeof reviewRes.review?.score === "number", `Quality reviewer returned score (${reviewRes.review?.score}/100)`);
  assert(Array.isArray(reviewRes.review?.issues), "Quality reviewer returned itemized issues list");

  // ─── Test 9: SEO Metadata & Keywords ───
  console.log("\n--- 9. SEO & Search Intent Analysis ---");
  const seoRes = await executeAiTask({
    task: "generate_seo",
    input: {
      title: "Business Website Development",
      focusKeyword: "website development ludhiana",
    },
  });

  assert(seoRes.success === true, "generate_seo executed successfully", seoRes.error);
  assert(Boolean(seoRes.seo?.seoTitle && seoRes.seo?.seoDescription), "SEO assistant returned title and meta description");

  console.log("\n==================================================");
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error("Fatal test execution error:", err);
  process.exit(1);
});
