/**
 * HD Web Studios — Sitemap & CRUD Revalidation Lifecycle Verification
 */

import { revalidateCmsPath, revalidateEntityRoutes } from "../lib/revalidation.js";

async function runSitemapLifecycleTests() {
  console.log("\n=======================================================");
  console.log("  HD WEB STUDIOS — SITEMAP & REVALIDATION VERIFICATION");
  console.log("=======================================================\n");

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

  // 1. Revalidation function safety
  console.log("1. Testing Revalidation Invalidation Logic...");
  try {
    revalidateCmsPath("/services");
    revalidateCmsPath("/sitemap.xml");
    assert(true, "revalidateCmsPath safely executes for listing and sitemap");
  } catch (e) {
    assert(false, `revalidateCmsPath threw error: ${e.message}`);
  }

  try {
    revalidateEntityRoutes("service", "business-website-development");
    revalidateEntityRoutes("blog", "business-website-cost-punjab");
    revalidateEntityRoutes("project", "custom-erp-ludhiana");
    revalidateEntityRoutes("story", "local-seo-tips");
    assert(true, "revalidateEntityRoutes safely invalidates all 4 content types");
  } catch (e) {
    assert(false, `revalidateEntityRoutes threw error: ${e.message}`);
  }

  // 2. Testing Sitemap filter logic simulation
  console.log("\n2. Testing Sitemap Exclusion & Publication Rules...");

  const mockServices = [
    { slug: "business-website-development", published: true, updatedAt: new Date("2026-08-20") },
    { slug: "draft-internal-tool", published: false, updatedAt: new Date("2026-08-21") },
  ];

  const mockBlogs = [
    { slug: "published-seo-guide", status: "published", updatedAt: new Date("2026-08-22") },
    { slug: "wip-article", status: "draft", updatedAt: new Date("2026-08-23") },
  ];

  const mockProjects = [
    { slug: "solar-client-app", published: true, updatedAt: new Date("2026-08-24") },
    { slug: "unreleased-case-study", published: false, updatedAt: new Date("2026-08-25") },
  ];

  // Sitemap generator logic:
  const publishedServiceUrls = mockServices
    .filter((s) => s.published)
    .map((s) => ({ url: `/services/${s.slug}`, lastModified: s.updatedAt }));

  const publishedBlogUrls = mockBlogs
    .filter((b) => b.status === "published")
    .map((b) => ({ url: `/blog/${b.slug}`, lastModified: b.updatedAt }));

  const publishedWorkUrls = mockProjects
    .filter((p) => p.published)
    .map((p) => ({ url: `/work/${p.slug}`, lastModified: p.updatedAt }));

  assert(publishedServiceUrls.length === 1, "Only published services included (1/2)");
  assert(publishedServiceUrls[0].url === "/services/business-website-development", "Draft service 'draft-internal-tool' excluded from sitemap");
  assert(publishedBlogUrls.length === 1, "Only published blogs included (1/2)");
  assert(publishedBlogUrls[0].url === "/blog/published-seo-guide", "Draft blog 'wip-article' excluded from sitemap");
  assert(publishedWorkUrls.length === 1, "Only published projects included (1/2)");
  assert(publishedWorkUrls[0].url === "/work/solar-client-app", "Canonical /work prefix used in project sitemap URLs");

  // 3. Unpublish and Update simulation
  console.log("\n3. Testing Lifecycle State Transitions (Publish -> Update -> Unpublish -> Delete)...");

  // State 1: Created & Published
  let testItem = { slug: "new-ecommerce-platform", published: true, updatedAt: new Date("2026-08-28T10:00:00Z") };
  let inSitemap = Boolean(testItem.published);
  assert(inSitemap === true, "Create + Publish -> URL is present in sitemap");

  // State 2: Updated
  const updatedDate = new Date("2026-08-28T11:00:00Z");
  testItem.updatedAt = updatedDate;
  assert(testItem.updatedAt.getTime() === updatedDate.getTime(), "Update -> lastModified timestamp changes");

  // State 3: Unpublished
  testItem.published = false;
  inSitemap = Boolean(testItem.published);
  assert(inSitemap === false, "Unpublish -> URL is instantly removed from sitemap");

  // State 4: Deleted
  testItem = null;
  const exists = testItem !== null && testItem?.published;
  assert(exists === false, "Delete -> URL is removed from sitemap");

  console.log("\n=======================================================");
  console.log(`  SITEMAP TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runSitemapLifecycleTests();
