import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Story from "@/models/Story";
import { evaluateSEO } from "@/lib/ai/seoEngine";

function mapToScanItem(doc, type) {
  const evalResult = evaluateSEO(doc, type);
  const fixUrl = `/admin/${type === "blog" ? "blog" : type === "service" ? "services" : type === "project" ? "projects" : "stories"}/${doc._id}`;

  const mappedIssues = [
    ...evalResult.issues.map((i) => ({
      name: i.category,
      label: i.message,
      status: i.severity === "critical" ? "problem" : "warning",
      detail: i.message,
      fixUrl,
      contentType: type,
      contentTitle: doc.title || doc.name,
    })),
    ...evalResult.suggestions.map((s) => ({
      name: s.category,
      label: s.message,
      status: "warning",
      detail: s.message,
      fixUrl,
      contentType: type,
      contentTitle: doc.title || doc.name,
    })),
  ];

  return {
    id: doc._id.toString(),
    title: doc.title || doc.name,
    slug: doc.slug,
    status: doc.published !== undefined ? (doc.published ? "published" : "draft") : doc.status || "published",
    type,
    score: evalResult.score,
    grade: evalResult.grade,
    breakdown: evalResult.breakdown,
    metrics: evalResult.metrics,
    issues: mappedIssues,
  };
}

export async function GET(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();

    const [posts, services, projects, stories] = await Promise.all([
      Post.find().lean(),
      Service.find().lean(),
      Project.find().lean(),
      Story.find().lean(),
    ]);

    const content = [
      ...services.map((s) => mapToScanItem(s, "service")),
      ...posts.map((p) => mapToScanItem(p, "blog")),
      ...projects.map((pr) => mapToScanItem(pr, "project")),
      ...stories.map((st) => mapToScanItem(st, "story")),
    ];

    let totalCritical = 0;
    let totalWarnings = 0;
    let totalPassed = 0;
    const allIssues = [];

    for (const item of content) {
      for (const issue of item.issues) {
        if (issue.status === "problem") totalCritical++;
        else totalWarnings++;
        allIssues.push(issue);
      }
      totalPassed += Math.max(0, 10 - item.issues.length);
    }

    const avgScore = content.length > 0
      ? Math.round(content.reduce((sum, c) => sum + c.score, 0) / content.length)
      : 100;

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
      issues: allIssues.slice(0, 50),
    });
  } catch (error) {
    console.error("[SEO Scan API] Error:", error);
    return NextResponse.json({ success: false, error: "SEO scan failed" }, { status: 500 });
  }
}
