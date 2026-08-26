import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Story from "@/models/Story";
import { analyzeSeo } from "@/lib/seo/seoHelper";

function stripHtml(html = "") {
  return String(html).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function extractHeadings(html = "") {
  const re = /<h([1-6])[^>]*>/gi;
  const levels = [];
  let match;
  while ((match = re.exec(html))) {
    levels.push(parseInt(match[1], 10));
  }
  return levels;
}

function countImagesMissingAlt(html = "") {
  const re = /<img[^>]*>/gi;
  let count = 0;
  let match;
  while ((match = re.exec(html))) {
    const alt = match[0].match(/alt=["']([^"']*)["']/i);
    if (!alt || !alt[1].trim()) count++;
  }
  return count;
}

function countImages(html = "") {
  return (html.match(/<img[^>]*>/gi) || []).length;
}

function countLinks(html = "", type = "internal") {
  const re = /<a[^>]*href=["']([^"']*)["'][^>]*>/gi;
  let count = 0;
  let match;
  while ((match = re.exec(html))) {
    const href = match[1];
    if (type === "internal" && href.startsWith("/") && !href.startsWith("//")) count++;
    if (type === "external" && href.startsWith("http") && !href.includes("hdwebstudios")) count++;
  }
  return count;
}

function analyzePost(post) {
  const content = post.content || "";
  const headings = extractHeadings(content);
  const result = analyzeSeo({
    title: post.title,
    seoTitle: post.seoTitle,
    slug: post.slug,
    seoDescription: post.seoDescription,
    excerpt: post.excerpt,
    content,
    contentFormat: post.contentFormat || "html",
    focusKeyword: post.focusKeyword,
    featuredImage: post.featuredImage,
    featuredImageAlt: post.featuredImageAlt,
    canonicalUrl: "",
    ogImage: post.ogImage,
    internalLinks: countLinks(content, "internal"),
    externalLinks: countLinks(content, "external"),
    imagesMissingAlt: countImagesMissingAlt(content),
    totalImages: countImages(content),
    headings,
  });

  return {
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    status: post.status,
    type: "blog",
    score: result.score,
    issues: result.signals.filter((s) => s.status !== "good"),
  };
}

function analyzeService(service) {
  const content = service.description || service.shortDescription || "";
  const result = analyzeSeo({
    title: service.title || service.name,
    seoTitle: service.seoTitle,
    slug: service.slug,
    seoDescription: service.seoDescription,
    excerpt: service.shortDescription,
    content,
    contentFormat: "html",
    focusKeyword: service.focusKeyword || "",
    featuredImage: service.heroImage || service.image || "",
    featuredImageAlt: service.heroImageAlt || "",
    ogImage: service.ogImage,
    headings: extractHeadings(content),
  });

  return {
    id: service._id.toString(),
    title: service.title || service.name,
    slug: service.slug,
    status: service.status || "published",
    type: "service",
    score: result.score,
    issues: result.signals.filter((s) => s.status !== "good"),
  };
}

function analyzeProject(project) {
  const content = project.description || project.shortDescription || project.challenge || "";
  const result = analyzeSeo({
    title: project.title,
    seoTitle: project.seoTitle,
    slug: project.slug,
    seoDescription: project.seoDescription,
    excerpt: project.shortDescription,
    content,
    contentFormat: "html",
    focusKeyword: project.focusKeyword || "",
    featuredImage: project.featuredImage || project.thumbnail || "",
    featuredImageAlt: project.featuredImageAlt || "",
    ogImage: project.ogImage,
    headings: extractHeadings(content),
  });

  return {
    id: project._id.toString(),
    title: project.title,
    slug: project.slug,
    status: project.status || "published",
    type: "project",
    score: result.score,
    issues: result.signals.filter((s) => s.status !== "good"),
  };
}

function analyzeStory(story) {
  const result = analyzeSeo({
    title: story.title,
    seoTitle: story.seoTitle,
    slug: story.slug,
    seoDescription: story.seoDescription,
    excerpt: story.description,
    content: story.description,
    contentFormat: "html",
    focusKeyword: "",
    featuredImage: story.posterImage || "",
    featuredImageAlt: story.posterImageAlt || "",
    ogImage: story.ogImage,
    canonicalUrl: story.canonicalUrl || "",
    headings: [],
  });

  return {
    id: story._id.toString(),
    title: story.title,
    slug: story.slug,
    status: story.status,
    type: "story",
    score: result.score,
    issues: result.signals.filter((s) => s.status !== "good"),
  };
}

export async function GET(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();

    const [posts, services, projects, stories] = await Promise.all([
      Post.find({ status: "published" }).lean(),
      Service.find().lean(),
      Project.find().lean(),
      Story.find({ status: "published" }).lean(),
    ]);

    const content = [
      ...posts.map(analyzePost),
      ...services.map(analyzeService),
      ...projects.map(analyzeProject),
      ...stories.map(analyzeStory),
    ];

    // Calculate overall stats
    let totalPassed = 0;
    let totalWarnings = 0;
    let totalCritical = 0;
    const allIssues = [];

    for (const item of content) {
      for (const issue of item.issues) {
        if (issue.status === "problem") {
          totalCritical++;
          allIssues.push({
            ...issue,
            fixUrl: `/admin/${item.type === "blog" ? "blog" : item.type === "service" ? "services" : item.type === "project" ? "projects" : "stories"}/${item.id}`,
            contentType: item.type,
            contentTitle: item.title,
          });
        } else {
          totalWarnings++;
          allIssues.push({
            ...issue,
            fixUrl: `/admin/${item.type === "blog" ? "blog" : item.type === "service" ? "services" : item.type === "project" ? "projects" : "stories"}/${item.id}`,
            contentType: item.type,
            contentTitle: item.title,
          });
        }
      }
      totalPassed += Math.max(0, 13 - item.issues.length); // 13 checks per item
    }

    const avgScore = content.length > 0
      ? Math.round(content.reduce((sum, c) => sum + c.score, 0) / content.length)
      : 100;

    // Sort issues: critical first, then warnings
    allIssues.sort((a, b) => (a.status === "problem" ? -1 : 1));

    return NextResponse.json({
      success: true,
      overall: {
        score: avgScore,
        critical: totalCritical,
        warnings: totalWarnings,
        passed: totalPassed,
        totalItems: content.length,
      },
      content: content.sort((a, b) => a.score - b.score),
      issues: allIssues.slice(0, 50), // Limit to top 50 issues
    });
  } catch (error) {
    console.error("seo-scan error", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
