import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import Service from "@/models/Service";
import Project from "@/models/Project";
import { requireAdminApi } from "@/lib/auth";
import { siteConfig, absoluteUrl } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { searchParams } = new URL(req.url);
    const slug = (searchParams.get("slug") || "").trim();
    const type = (searchParams.get("type") || "blog").trim();

    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing slug parameter" }, { status: 400 });
    }

    await connectDB();

    let doc = null;
    let path = "";

    if (type === "blog" || type === "post") {
      doc = await Post.findOne({ slug }).lean();
      path = `/blog/${slug}`;
    } else if (type === "service") {
      doc = await Service.findOne({ slug }).lean();
      path = `/services/${slug}`;
    } else if (type === "project") {
      doc = await Project.findOne({ slug }).lean();
      path = `/work/${slug}`;
    }

    if (!doc) {
      return NextResponse.json({
        success: true,
        status: "NOT_FOUND",
        indexingStatus: "NOT_FOUND",
        sitemap: "NOT INCLUDED",
        canonical: absoluteUrl(path),
        robots: "NOINDEX",
        http: 404,
        message: "Content not found in database.",
      });
    }

    const isPublished =
      type === "blog" || type === "post"
        ? doc.status === "published"
        : Boolean(doc.published);

    const canonicalUrl = absoluteUrl(path);
    const gscInspectUrl = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(
      siteConfig.url
    )}&id=${encodeURIComponent(canonicalUrl)}`;

    return NextResponse.json({
      success: true,
      status: isPublished ? "DISCOVERED" : "DRAFT",
      indexingStatus: isPublished ? "DISCOVERED_IN_SITEMAP" : "DRAFT_NOT_INDEXABLE",
      lastChecked: new Date().toISOString(),
      sitemap: isPublished ? "INCLUDED" : "NOT INCLUDED",
      canonical: canonicalUrl,
      robots: isPublished ? "INDEX, FOLLOW" : "NOINDEX (Draft)",
      http: 200,
      lastPublished: doc.publishedAt || doc.createdAt || null,
      lastUpdated: doc.updatedAt || doc.createdAt || null,
      gscInspectUrl,
      notice:
        "Sitemap inclusion aids Google crawler discovery. Google controls indexation timing based on search intent and content uniqueness.",
    });
  } catch (error) {
    console.error("[admin/seo/indexing-status] Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
