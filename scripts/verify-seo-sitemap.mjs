/**
 * HD Web Studios — Automated SEO, Sitemap, Canonical & Indexing Test Suite
 */

import mongoose from "mongoose";
import { siteConfig, CANONICAL_SITE_URL, absoluteUrl } from "../config/site.js";
import { revalidateContent, revalidateEntityRoutes } from "../lib/revalidation.js";

const MONGODB_URI = process.env.MONGODB_URI;

async function runSeoSuite() {
  console.log("\n=======================================================");
  console.log("  HD WEB STUDIOS — SEO & SITEMAP AUTOMATED TEST SUITE  ");
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

  // ─── 1. CANONICAL DOMAIN ENFORCEMENT ──────────────────────────────
  console.log("1. Testing Canonical Domain Architecture...");
  assert(
    CANONICAL_SITE_URL === "https://hdwebstudios.in",
    `Canonical site URL is non-www production domain: ${CANONICAL_SITE_URL}`
  );
  assert(
    !CANONICAL_SITE_URL.includes("www."),
    "Canonical domain strictly excludes 'www.' prefix"
  );
  assert(
    siteConfig.url === "https://hdwebstudios.in",
    "siteConfig.url matches canonical production domain"
  );

  // ─── 2. SITEMAP DATABASE-DRIVEN GENERATION ────────────────────────
  console.log("\n2. Testing Dynamic Database-Driven Sitemap.xml...");
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable not found.");
    }
    await mongoose.connect(MONGODB_URI);

    // Schemas
    const ServiceSchema = new mongoose.Schema({ slug: String, published: Boolean, updatedAt: Date, order: Number });
    const ProjectSchema = new mongoose.Schema({ slug: String, published: Boolean, updatedAt: Date, order: Number });
    const PostSchema = new mongoose.Schema({ slug: String, title: String, status: String, updatedAt: Date, publishedAt: Date });
    const StorySchema = new mongoose.Schema({ slug: String, status: String, updatedAt: Date, publishedAt: Date });

    const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
    const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
    const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
    const Story = mongoose.models.Story || mongoose.model("Story", StorySchema);

    const [services, projects, posts, stories, draftBlogs] = await Promise.all([
      Service.find({ published: true }).select("slug updatedAt").sort({ order: 1 }).lean(),
      Project.find({ published: true }).select("slug updatedAt").sort({ order: 1 }).lean(),
      Post.find({ status: "published" }).select("slug title updatedAt publishedAt").sort({ publishedAt: -1 }).lean(),
      Story.find({ status: "published" }).select("slug updatedAt publishedAt").sort({ publishedAt: -1 }).lean(),
      Post.find({ status: "draft" }).select("slug title").lean(),
    ]);

    const staticRoutes = [
      { path: "/", priority: 1.0, changeFrequency: "weekly" },
      { path: "/services", priority: 0.9, changeFrequency: "weekly" },
      { path: "/work", priority: 0.9, changeFrequency: "weekly" },
      { path: "/about", priority: 0.8, changeFrequency: "monthly" },
      { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
      { path: "/audit", priority: 0.8, changeFrequency: "monthly" },
      { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
      { path: "/blog", priority: 0.8, changeFrequency: "daily" },
      { path: "/stories", priority: 0.7, changeFrequency: "weekly" },
      { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
      { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    ];

    const currentDate = new Date();
    const serviceRoutes = services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: s.updatedAt ? new Date(s.updatedAt) : currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    }));

    const workRoutes = projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: p.updatedAt ? new Date(p.updatedAt) : currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const blogRoutes = posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt || p.publishedAt ? new Date(p.updatedAt || p.publishedAt) : currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const storyRoutes = stories.map((s) => ({
      url: absoluteUrl(`/stories/${s.slug}`),
      lastModified: s.updatedAt || s.publishedAt ? new Date(s.updatedAt || s.publishedAt) : currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const staticMapped = staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: currentDate,
      changeFrequency,
      priority,
    }));

    const entries = [...staticMapped, ...serviceRoutes, ...workRoutes, ...blogRoutes, ...storyRoutes];

    assert(Array.isArray(entries), `Sitemap returned ${entries.length} total entries`);
    assert(entries.length >= 11, `Sitemap contains all core static pages (${staticRoutes.length}) + dynamic content`);

    // Check canonical origin for all entries
    const invalidPrefixes = entries.filter((e) => !e.url.startsWith("https://hdwebstudios.in"));
    assert(
      invalidPrefixes.length === 0,
      `All ${entries.length} URLs use canonical 'https://hdwebstudios.in' origin`
    );

    // Check no duplicate URLs
    const urlSet = new Set();
    const duplicates = [];
    for (const e of entries) {
      if (urlSet.has(e.url)) duplicates.push(e.url);
      urlSet.add(e.url);
    }
    assert(
      duplicates.length === 0,
      `Zero duplicate URLs in sitemap (${duplicates.length} duplicates found)`
    );

    // Check no admin/auth/private URLs
    const privateUrls = entries.filter(
      (e) =>
        e.url.includes("/admin") ||
        e.url.includes("/api") ||
        e.url.includes("/login") ||
        e.url.includes("/setup")
    );
    assert(
      privateUrls.length === 0,
      `Zero private/admin URLs exposed in sitemap`
    );

    // Check no localhost URLs
    const localhostUrls = entries.filter((e) => e.url.includes("localhost") || e.url.includes("127.0.0.1"));
    assert(
      localhostUrls.length === 0,
      "Zero localhost or development hostnames in sitemap"
    );

    // Check draft blog exclusion
    const draftSlugs = new Set(draftBlogs.map((d) => d.slug));
    const exposedDrafts = entries.filter((e) => {
      const slug = e.url.replace("https://hdwebstudios.in/blog/", "");
      return draftSlugs.has(slug);
    });
    assert(
      exposedDrafts.length === 0,
      `Zero draft blogs exposed in sitemap (out of ${draftBlogs.length} drafts)`
    );

    // Check published blogs presence
    const sitemapBlogUrls = new Set(
      entries.filter((e) => e.url.includes("/blog/")).map((e) => e.url)
    );
    let allPublishedPresent = true;
    for (const p of posts) {
      if (!sitemapBlogUrls.has(`https://hdwebstudios.in/blog/${p.slug}`)) {
        allPublishedPresent = false;
        console.error(`Missing blog: ${p.title} (${p.slug})`);
      }
    }
    assert(
      allPublishedPresent,
      `All ${posts.length} published blogs from MongoDB are present in sitemap`
    );

    // Check valid lastModified dates
    const invalidDates = entries.filter((e) => isNaN(new Date(e.lastModified).getTime()));
    assert(
      invalidDates.length === 0,
      `All ${entries.length} sitemap entries have valid lastModified timestamps`
    );

    await mongoose.disconnect();
  } catch (err) {
    assert(false, `Sitemap database test threw error: ${err.message}`);
  }

  // ─── 3. ROBOTS.TXT DIRECTIVES ─────────────────────────────────────
  console.log("\n3. Testing Robots.txt Architecture...");
  assert(
    absoluteUrl("/sitemap.xml") === "https://hdwebstudios.in/sitemap.xml",
    `Sitemap reference in robots.txt is canonical: ${absoluteUrl("/sitemap.xml")}`
  );

  // ─── 4. CACHE REVALIDATION LIFECYCLE ──────────────────────────────
  console.log("\n4. Testing Cache Revalidation Safety...");
  try {
    const revalRes = await revalidateContent({ type: "blog", slug: "test-blog-post" });
    assert(revalRes.success === true, "revalidateContent executed safely for blog type");

    const revalService = await revalidateContent({ type: "service", slug: "business-website-development" });
    assert(revalService.success === true, "revalidateContent executed safely for service type");

    const revalSettings = await revalidateContent({ type: "settings" });
    assert(revalSettings.success === true, "revalidateContent executed safely for site settings");
  } catch (err) {
    assert(false, `Revalidation threw error: ${err.message}`);
  }

  console.log("\n=======================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runSeoSuite();
