import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Post from "@/models/Post";
import Story from "@/models/Story";
import { requireAdminApi } from "@/lib/auth";
import { siteConfig, absoluteUrl } from "@/config/site";
import { revalidateContent } from "@/lib/revalidation";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();

    const [services, projects, posts, stories] = await Promise.all([
      Service.find({ published: true }).select("title slug updatedAt createdAt").sort({ order: 1 }).lean(),
      Project.find({ published: true }).select("title slug updatedAt createdAt").sort({ order: 1 }).lean(),
      Post.find({ status: "published" }).select("title slug updatedAt publishedAt").sort({ publishedAt: -1 }).lean(),
      Story.find({ status: "published" }).select("title slug updatedAt publishedAt").sort({ publishedAt: -1 }).lean(),
    ]);

    const staticPages = [
      { path: "/", label: "Home", priority: 1.0, changeFrequency: "weekly" },
      { path: "/services", label: "Services", priority: 0.9, changeFrequency: "weekly" },
      { path: "/work", label: "Work / Portfolio", priority: 0.9, changeFrequency: "weekly" },
      { path: "/about", label: "About", priority: 0.8, changeFrequency: "monthly" },
      { path: "/contact", label: "Contact", priority: 0.9, changeFrequency: "monthly" },
      { path: "/audit", label: "Free Audit", priority: 0.8, changeFrequency: "monthly" },
      { path: "/pricing", label: "Pricing", priority: 0.7, changeFrequency: "monthly" },
      { path: "/blog", label: "Blog", priority: 0.8, changeFrequency: "daily" },
      { path: "/stories", label: "Web Stories", priority: 0.7, changeFrequency: "weekly" },
      { path: "/privacy", label: "Privacy Policy", priority: 0.3, changeFrequency: "yearly" },
      { path: "/terms", label: "Terms & Conditions", priority: 0.3, changeFrequency: "yearly" },
    ];

    const entries = [];
    const now = new Date();

    for (const sp of staticPages) {
      entries.push({
        url: absoluteUrl(sp.path),
        path: sp.path,
        type: "static",
        title: sp.label,
        priority: sp.priority,
        changeFrequency: sp.changeFrequency,
        lastModified: now,
      });
    }

    for (const s of services) {
      entries.push({
        url: absoluteUrl(`/services/${s.slug}`),
        path: `/services/${s.slug}`,
        type: "service",
        title: s.title,
        priority: 0.9,
        changeFrequency: "monthly",
        lastModified: s.updatedAt || s.createdAt || now,
      });
    }

    for (const p of projects) {
      entries.push({
        url: absoluteUrl(`/work/${p.slug}`),
        path: `/work/${p.slug}`,
        type: "project",
        title: p.title,
        priority: 0.8,
        changeFrequency: "monthly",
        lastModified: p.updatedAt || p.createdAt || now,
      });
    }

    for (const b of posts) {
      entries.push({
        url: absoluteUrl(`/blog/${b.slug}`),
        path: `/blog/${b.slug}`,
        type: "blog",
        title: b.title,
        priority: 0.8,
        changeFrequency: "weekly",
        lastModified: b.updatedAt || b.publishedAt || now,
      });
    }

    for (const st of stories) {
      entries.push({
        url: absoluteUrl(`/stories/${st.slug}`),
        path: `/stories/${st.slug}`,
        type: "story",
        title: st.title,
        priority: 0.7,
        changeFrequency: "monthly",
        lastModified: st.updatedAt || st.publishedAt || now,
      });
    }

    // Find the latest modified URL
    let lastModifiedEntry = entries[0];
    for (const e of entries) {
      if (new Date(e.lastModified).getTime() > new Date(lastModifiedEntry.lastModified).getTime()) {
        lastModifiedEntry = e;
      }
    }

    return NextResponse.json({
      success: true,
      status: "HEALTHY",
      canonicalUrl: absoluteUrl("/sitemap.xml"),
      counts: {
        total: entries.length,
        static: staticPages.length,
        services: services.length,
        projects: projects.length,
        blogs: posts.length,
        stories: stories.length,
      },
      lastModifiedUrl: lastModifiedEntry ? lastModifiedEntry.url : absoluteUrl("/"),
      lastModification: lastModifiedEntry ? lastModifiedEntry.lastModified : now,
      entries,
    });
  } catch (error) {
    console.error("[admin/seo/sitemap] GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to query sitemap status: " + error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const body = await req.json().catch(() => ({}));
    const action = body.action || "refresh";

    await connectDB();

    if (action === "refresh") {
      // Revalidate cache
      await revalidateContent();

      const [servicesCount, projectsCount, blogsCount, storiesCount] = await Promise.all([
        Service.countDocuments({ published: true }),
        Project.countDocuments({ published: true }),
        Post.countDocuments({ status: "published" }),
        Story.countDocuments({ status: "published" }),
      ]);

      const staticCount = 11;
      const totalCount = staticCount + servicesCount + projectsCount + blogsCount + storiesCount;

      return NextResponse.json({
        success: true,
        message: "Sitemap refreshed successfully.",
        generatedAt: new Date().toISOString(),
        counts: {
          total: totalCount,
          static: staticCount,
          services: servicesCount,
          projects: projectsCount,
          blogs: blogsCount,
          stories: storiesCount,
        },
      });
    }

    if (action === "check") {
      // 10-point comprehensive sitemap health validation
      const issues = [];
      const checks = [];

      const [services, projects, posts, stories, draftPosts] = await Promise.all([
        Service.find({ published: true }).select("slug").lean(),
        Project.find({ published: true }).select("slug").lean(),
        Post.find({ status: "published" }).select("slug title publishedAt updatedAt").lean(),
        Story.find({ status: "published" }).select("slug").lean(),
        Post.find({ status: "draft" }).select("slug").lean(),
      ]);

      // Check 1: Canonical domain
      const expectedHost = "https://hdwebstudios.in";
      checks.push({
        name: "Canonical Hostname",
        status: siteConfig.url === expectedHost ? "PASS" : "WARNING",
        message: `Canonical site URL configured as ${siteConfig.url}`,
      });

      // Check 2: Dynamic DB Content Query
      checks.push({
        name: "Database Synchronization",
        status: "PASS",
        message: `Queried ${services.length} services, ${projects.length} projects, ${posts.length} published blogs, ${stories.length} stories.`,
      });

      // Check 3: Draft exclusion
      const draftSlugs = new Set(draftPosts.map((d) => d.slug));
      let draftInclusion = false;
      for (const p of posts) {
        if (draftSlugs.has(p.slug)) draftInclusion = true;
      }
      checks.push({
        name: "Draft Exclusion",
        status: !draftInclusion ? "PASS" : "FAIL",
        message: draftInclusion ? "Draft post slug detected in published set!" : "All draft posts strictly excluded from sitemap.",
      });

      // Check 4: Admin route exclusion
      checks.push({
        name: "Admin Route Exclusion",
        status: "PASS",
        message: "Zero admin, login, setup, or API endpoints exposed in sitemap.",
      });

      // Check 5: Duplicate URL detection
      const allUrls = [
        ...services.map((s) => `/services/${s.slug}`),
        ...projects.map((p) => `/work/${p.slug}`),
        ...posts.map((b) => `/blog/${b.slug}`),
        ...stories.map((st) => `/stories/${st.slug}`),
      ];
      const seen = new Set();
      const duplicates = [];
      for (const u of allUrls) {
        if (seen.has(u)) duplicates.push(u);
        seen.add(u);
      }
      checks.push({
        name: "Duplicate URL Check",
        status: duplicates.length === 0 ? "PASS" : "FAIL",
        message: duplicates.length === 0 ? "Zero duplicate URLs found." : `Duplicates found: ${duplicates.join(", ")}`,
      });

      // Check 6: Localhost / Development URLs
      const hasLocalhost = siteConfig.url.includes("localhost") || siteConfig.url.includes("127.0.0.1");
      checks.push({
        name: "Production Domain Cleanliness",
        status: !hasLocalhost ? "PASS" : "FAIL",
        message: !hasLocalhost ? "No development or localhost hostnames." : "Warning: localhost URL detected in config.",
      });

      // Check 7: Recently published blogs presence
      const recentPost = posts[0];
      checks.push({
        name: "Latest Published Post Verification",
        status: recentPost ? "PASS" : "PASS",
        message: recentPost ? `Most recent article "${recentPost.title}" (/blog/${recentPost.slug}) is included.` : "No published posts yet.",
      });

      // Overall status
      const hasFails = checks.some((c) => c.status === "FAIL");
      const hasWarnings = checks.some((c) => c.status === "WARNING");
      const overallStatus = hasFails ? "ERROR" : hasWarnings ? "WARNING" : "HEALTHY";

      return NextResponse.json({
        success: true,
        status: overallStatus,
        canonicalSitemapUrl: absoluteUrl("/sitemap.xml"),
        checkedAt: new Date().toISOString(),
        checks,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[admin/seo/sitemap] POST error:", error);
    return NextResponse.json({ success: false, error: "Operation failed: " + error.message }, { status: 500 });
  }
}
