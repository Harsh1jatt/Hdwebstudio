import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { scanPageLinks } from "@/lib/seo/brokenLinks";
import { analyzeContentGaps } from "@/lib/seo/contentGaps";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    const body = await req.json();
    const { url = "", html = "", title = "", category = "web-development" } = body;

    let targetHtml = html;
    let targetTitle = title;
    let targetUrl = url;

    // If a URL was provided, fetch the live page
    if (url && !html) {
      const fullUrl = url.startsWith("http") ? url : `https://hdwebstudios.in${url.startsWith("/") ? url : `/${url}`}`;
      targetUrl = fullUrl;
      const res = await fetch(fullUrl, { headers: { "User-Agent": "HDWS-SEO-Inspector/1.0" } });
      if (!res.ok) {
        return NextResponse.json({ success: false, error: `Failed to fetch URL: HTTP ${res.status}` }, { status: 400 });
      }
      targetHtml = await res.text();
    }

    if (!targetHtml) {
      return NextResponse.json({ success: false, error: "Please provide either a URL or HTML content to test." }, { status: 400 });
    }

    // Extract Metadata from HTML
    const titleMatch = targetHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
    const metaDescMatch = targetHtml.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const canonicalMatch = targetHtml.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const robotsMatch = targetHtml.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);

    const extractedTitle = targetTitle || titleMatch?.[1] || "";
    const extractedMeta = metaDescMatch?.[1] || "";
    const extractedCanonical = canonicalMatch?.[1] || "";
    const extractedRobots = robotsMatch?.[1] || "index, follow";

    // Extract Structured Data JSON-LD
    const jsonLdMatches = [...targetHtml.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    const schemasFound = [];
    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        if (parsed["@graph"]) {
          schemasFound.push(...parsed["@graph"].map((g) => g["@type"]));
        } else if (parsed["@type"]) {
          schemasFound.push(parsed["@type"]);
        }
      } catch {
        /* ignore parsing issues */
      }
    }

    // Scan Headings
    const h1s = [...targetHtml.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
    const h2s = [...targetHtml.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
    const h3s = [...targetHtml.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());

    // Scan Links & Broken links
    const linkScan = await scanPageLinks(targetHtml, "https://hdwebstudios.in");

    // Scan Images & Alt Text
    const imgMatches = [...targetHtml.matchAll(/<img[^>]+>/gi)];
    const totalImages = imgMatches.length;
    let missingAlt = 0;
    for (const img of imgMatches) {
      if (!img[0].includes("alt=") || img[0].includes('alt=""') || img[0].includes("alt=''")) {
        missingAlt++;
      }
    }

    // Word Count
    const plainText = targetHtml.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;

    // Content Gaps
    const gaps = analyzeContentGaps({ content: plainText, category, title: extractedTitle });

    // Deterministic Score Calculation
    let score = 100;
    const checks = [];

    // 1. Title
    if (!extractedTitle) {
      score -= 20;
      checks.push({ status: "fail", label: "Title Tag", message: "Missing title tag." });
    } else if (extractedTitle.length < 30 || extractedTitle.length > 65) {
      score -= 5;
      checks.push({ status: "warn", label: "Title Length", message: `Title length is ${extractedTitle.length} characters (aim for 45–60).` });
    } else {
      checks.push({ status: "pass", label: "Title Tag", message: `Optimal title length (${extractedTitle.length} chars).` });
    }

    // 2. Meta description
    if (!extractedMeta) {
      score -= 15;
      checks.push({ status: "fail", label: "Meta Description", message: "Missing meta description." });
    } else if (extractedMeta.length < 90 || extractedMeta.length > 165) {
      score -= 5;
      checks.push({ status: "warn", label: "Meta Length", message: `Meta description is ${extractedMeta.length} characters (aim for 120–155).` });
    } else {
      checks.push({ status: "pass", label: "Meta Description", message: `Optimal meta length (${extractedMeta.length} chars).` });
    }

    // 3. Headings
    if (h1s.length === 1) {
      checks.push({ status: "pass", label: "H1 Tag", message: `Single H1 found: "${h1s[0]}".` });
    } else if (h1s.length === 0) {
      score -= 10;
      checks.push({ status: "fail", label: "H1 Tag", message: "No H1 heading found." });
    } else {
      score -= 8;
      checks.push({ status: "warn", label: "Multiple H1s", message: `Found ${h1s.length} H1 headings. Limit to 1 per page.` });
    }

    // 4. Content Depth
    if (wordCount < 100) {
      score -= 20;
      checks.push({ status: "fail", label: "Content Depth", message: `Thin content (${wordCount} words).` });
    } else if (wordCount < 400) {
      score -= 5;
      checks.push({ status: "warn", label: "Content Depth", message: `Brief content (${wordCount} words).` });
    } else {
      checks.push({ status: "pass", label: "Content Depth", message: `Good depth (${wordCount} words).` });
    }

    // 5. Schema
    if (schemasFound.length > 0) {
      checks.push({ status: "pass", label: "Structured Data", message: `Schema types: ${schemasFound.join(", ")}.` });
    } else {
      score -= 10;
      checks.push({ status: "warn", label: "Structured Data", message: "No Schema.org JSON-LD found." });
    }

    // 6. Links
    if (linkScan.broken.length > 0) {
      score -= 10;
      checks.push({ status: "fail", label: "Broken Links", message: `Found ${linkScan.broken.length} broken links.` });
    } else {
      checks.push({ status: "pass", label: "Link Health", message: `All ${linkScan.total} links scanned returned valid status.` });
    }

    // 7. Image Alt
    if (missingAlt > 0) {
      score -= 5;
      checks.push({ status: "warn", label: "Image Alt", message: `${missingAlt} of ${totalImages} images missing alt text.` });
    } else if (totalImages > 0) {
      checks.push({ status: "pass", label: "Image Alt", message: `All ${totalImages} images have valid alt text.` });
    }

    const finalScore = Math.max(0, Math.min(100, score));

    return NextResponse.json({
      success: true,
      url: targetUrl,
      score: finalScore,
      grade: finalScore >= 90 ? "Excellent" : finalScore >= 75 ? "Good" : finalScore >= 55 ? "Needs Work" : "Critical",
      meta: {
        title: extractedTitle,
        description: extractedMeta,
        canonical: extractedCanonical,
        robots: extractedRobots,
        wordCount,
        h1s,
        h2Count: h2s.length,
        h3Count: h3s.length,
        totalImages,
        missingAlt,
        schemasFound,
      },
      linkScan,
      gaps,
      checks,
    });
  } catch (err) {
    console.error("[SEO Diagnostic Audit API] Error:", err);
    return NextResponse.json({ success: false, error: "Audit inspection failed: " + err.message }, { status: 500 });
  }
}
