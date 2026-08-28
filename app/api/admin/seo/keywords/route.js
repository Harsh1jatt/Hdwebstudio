import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Keyword from "@/models/Keyword";

export const dynamic = "force-dynamic";

const SEED_KEYWORDS = [
  {
    keyword: "website development company in ludhiana",
    searchIntent: "Transactional",
    cluster: "Local Web Services",
    stage: "BOFU (Decision)",
    assignedPageUrl: "/services/business-website-development",
    targetLanguage: "en",
    geoTarget: "Ludhiana",
    localModifiers: ["in ludhiana", "ludhiana punjab", "near me"],
    semanticEntities: ["web design company", "next.js agency", "software development"],
    priority: "HIGH",
    rankingPosition: 1,
    status: "Published",
  },
  {
    keyword: "web designer in ludhiana",
    searchIntent: "Commercial",
    cluster: "Local Web Services",
    stage: "MOFU (Evaluation)",
    assignedPageUrl: "/services/business-website-development",
    targetLanguage: "en",
    geoTarget: "Ludhiana",
    localModifiers: ["ludhiana", "punjab"],
    semanticEntities: ["responsive web design", "ui/ux design", "custom website"],
    priority: "HIGH",
    rankingPosition: 2,
    status: "Published",
  },
  {
    keyword: "ecommerce website development ludhiana",
    searchIntent: "Commercial",
    cluster: "Ecommerce",
    stage: "BOFU (Decision)",
    assignedPageUrl: "/services/ecommerce-website-development",
    targetLanguage: "en",
    geoTarget: "Ludhiana",
    localModifiers: ["ludhiana", "punjab", "india"],
    semanticEntities: ["online store development", "razorpay integration", "upi checkout"],
    priority: "HIGH",
    rankingPosition: 1,
    status: "Published",
  },
  {
    keyword: "custom web application development punjab",
    searchIntent: "Commercial",
    cluster: "Custom Software",
    stage: "BOFU (Decision)",
    assignedPageUrl: "/services/custom-web-application-development",
    targetLanguage: "en",
    geoTarget: "Punjab",
    localModifiers: ["punjab", "india"],
    semanticEntities: ["mern stack development", "saas portal", "mongodb database"],
    priority: "HIGH",
    rankingPosition: 3,
    status: "Published",
  },
  {
    keyword: "local seo services ludhiana",
    searchIntent: "Transactional",
    cluster: "Local SEO & Growth",
    stage: "BOFU (Decision)",
    assignedPageUrl: "/services/local-seo-google-business-optimization",
    targetLanguage: "en",
    geoTarget: "Ludhiana",
    localModifiers: ["ludhiana", "punjab"],
    semanticEntities: ["google maps ranking", "google business profile", "local 3-pack"],
    priority: "HIGH",
    rankingPosition: 1,
    status: "Published",
  },
  {
    keyword: "website redesign company in ludhiana",
    searchIntent: "Commercial",
    cluster: "Website Redesign",
    stage: "MOFU (Evaluation)",
    assignedPageUrl: "/services/website-redesign-modernization",
    targetLanguage: "en",
    geoTarget: "Ludhiana",
    localModifiers: ["ludhiana"],
    semanticEntities: ["website modernization", "core web vitals fix", "mobile responsive redesign"],
    priority: "HIGH",
    rankingPosition: 2,
    status: "Published",
  },
  {
    keyword: "website development cost in india",
    searchIntent: "Informational",
    cluster: "Pricing & Scoping",
    stage: "TOFU (Awareness)",
    assignedPageUrl: "/pricing",
    targetLanguage: "en",
    geoTarget: "National",
    localModifiers: ["in india", "punjab"],
    semanticEntities: ["website pricing packages", "cost of business website", "ecommerce pricing"],
    priority: "MEDIUM",
    rankingPosition: 4,
    status: "Published",
  },
  {
    keyword: "how to improve core web vitals nextjs",
    searchIntent: "Informational",
    cluster: "Next.js & Performance",
    stage: "TOFU (Awareness)",
    assignedPageUrl: "/blog",
    targetLanguage: "en",
    geoTarget: "Global",
    localModifiers: [],
    semanticEntities: ["lcp optimization", "cls layout shifts", "server components"],
    priority: "MEDIUM",
    rankingPosition: 8,
    status: "Published",
  },
];

export async function GET(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();

    let count = await Keyword.countDocuments();
    if (count === 0) {
      await Keyword.insertMany(SEED_KEYWORDS);
    }

    const { searchParams } = new URL(req.url);
    const intent = searchParams.get("intent");
    const cluster = searchParams.get("cluster");
    const search = searchParams.get("search");

    const query = {};
    if (intent && intent !== "all") query.searchIntent = intent;
    if (cluster && cluster !== "all") query.cluster = cluster;
    if (search) {
      query.$or = [
        { keyword: { $regex: search, $options: "i" } },
        { cluster: { $regex: search, $options: "i" } },
        { geoTarget: { $regex: search, $options: "i" } },
      ];
    }

    const keywords = await Keyword.find(query).sort({ priority: 1, createdAt: -1 }).lean();

    const distinctClusters = await Keyword.distinct("cluster");

    return NextResponse.json({
      success: true,
      keywords,
      clusters: distinctClusters,
      totalCount: await Keyword.countDocuments(),
    });
  } catch (err) {
    console.error("[Keywords API] Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();
    const body = await req.json();

    if (!body.keyword || !body.cluster) {
      return NextResponse.json({ success: false, error: "Keyword and Cluster are required." }, { status: 400 });
    }

    const created = await Keyword.create(body);
    return NextResponse.json({ success: true, keyword: created });
  } catch (err) {
    console.error("[Keywords API] POST Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
