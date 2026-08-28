import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Backlink from "@/models/Backlink";

export const dynamic = "force-dynamic";

const SEED_BACKLINK_OPPORTUNITIES = [
  {
    domain: "google.com",
    websiteName: "Google Business Profile",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://business.google.com",
    type: "Local Citation",
    category: "Search & Maps",
    country: "India",
    niche: "Local Business & Tech",
    linkType: "nofollow",
    pricing: "Free",
    status: "Verified",
    authorityScore: "98",
    domainRating: "100",
    trafficEstimate: "Billions",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "Official Google Local Business entity listing",
    opportunityScore: 100,
    isLive: true,
  },
  {
    domain: "bing.com",
    websiteName: "Bing Places for Business",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://www.bingplaces.com",
    type: "Local Citation",
    category: "Search & Maps",
    country: "India",
    niche: "Local Business",
    linkType: "nofollow",
    pricing: "Free",
    status: "Approved",
    authorityScore: "94",
    domainRating: "98",
    trafficEstimate: "High",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "Official Microsoft Bing verified local listing",
    opportunityScore: 95,
  },
  {
    domain: "apple.com",
    websiteName: "Apple Business Connect",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://businessconnect.apple.com",
    type: "Local Citation",
    category: "Maps & Directory",
    country: "India",
    niche: "Local Business",
    linkType: "nofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "99",
    domainRating: "100",
    trafficEstimate: "High",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "Apple Maps native business profile",
    opportunityScore: 95,
  },
  {
    domain: "linkedin.com",
    websiteName: "LinkedIn Company Page",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://www.linkedin.com/company/setup/new/",
    type: "Profile",
    category: "Professional Network",
    country: "Global",
    niche: "Software & Technology",
    linkType: "nofollow",
    pricing: "Free",
    status: "Published",
    authorityScore: "98",
    domainRating: "99",
    trafficEstimate: "High",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "Primary professional entity social proof",
    opportunityScore: 90,
  },
  {
    domain: "github.com",
    websiteName: "GitHub Organization Profile",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://github.com/orgs/new",
    type: "Profile",
    category: "Developer Authority",
    country: "Global",
    niche: "Open Source & Software",
    linkType: "dofollow",
    pricing: "Free",
    status: "Published",
    authorityScore: "96",
    domainRating: "96",
    trafficEstimate: "High",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "Authoritative developer organization anchor",
    opportunityScore: 92,
  },
  {
    domain: "clutch.co",
    websiteName: "Clutch.co Agency Profile",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://clutch.co/get-listed",
    type: "Business Directory",
    category: "Agency Directory",
    country: "Global",
    niche: "B2B Web Development",
    linkType: "dofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "90",
    domainRating: "91",
    trafficEstimate: "High",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "Top global verified B2B agency review directory",
    opportunityScore: 92,
  },
  {
    domain: "goodfirms.co",
    websiteName: "GoodFirms Agency Directory",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://www.goodfirms.co/register",
    type: "Business Directory",
    category: "Agency Directory",
    country: "India / Global",
    niche: "IT & Web Solutions",
    linkType: "nofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "86",
    domainRating: "88",
    trafficEstimate: "Moderate",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "Reputable IT services discovery portal",
    opportunityScore: 85,
  },
  {
    domain: "indiamart.com",
    websiteName: "IndiaMART Business Listing",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://www.indiamart.com",
    type: "Local Citation",
    category: "B2B Marketplace",
    country: "India",
    niche: "Web & Software Services",
    linkType: "nofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "85",
    domainRating: "86",
    trafficEstimate: "High",
    anchorText: "Website Development in Ludhiana",
    safetyScore: "SAFE",
    safetyReason: "Major Indian B2B marketplace citation",
    opportunityScore: 84,
  },
  {
    domain: "justdial.com",
    websiteName: "Justdial Ludhiana",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://www.justdial.com",
    type: "Local Citation",
    category: "Local Directory",
    country: "India",
    niche: "Local Web Services",
    linkType: "nofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "83",
    domainRating: "84",
    trafficEstimate: "High",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "High-volume local Indian business citation",
    opportunityScore: 80,
  },
  {
    domain: "sulekha.com",
    websiteName: "Sulekha Business Directory",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://www.sulekha.com",
    type: "Local Citation",
    category: "Local Directory",
    country: "India",
    niche: "IT & Services",
    linkType: "nofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "80",
    domainRating: "82",
    trafficEstimate: "Moderate",
    anchorText: "HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "Standard Indian local citation",
    opportunityScore: 78,
  },
  {
    domain: "medium.com",
    websiteName: "Medium Publication",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://medium.com",
    type: "Resource Page",
    category: "Content Publishing",
    country: "Global",
    niche: "Web Tech & Architecture",
    linkType: "nofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "95",
    domainRating: "96",
    trafficEstimate: "High",
    anchorText: "HD Web Studios Web Performance",
    safetyScore: "SAFE",
    safetyReason: "Authoritative blogging and article platform",
    opportunityScore: 82,
  },
  {
    domain: "dev.to",
    websiteName: "DEV Community",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://dev.to",
    type: "Resource Page",
    category: "Developer Network",
    country: "Global",
    niche: "Next.js & Software Engineering",
    linkType: "dofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "88",
    domainRating: "89",
    trafficEstimate: "High",
    anchorText: "Harshdeep / HD Web Studios",
    safetyScore: "SAFE",
    safetyReason: "High domain authority developer community",
    opportunityScore: 88,
  },
  {
    domain: "behance.net",
    websiteName: "Behance Portfolio Profile",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "https://www.behance.net",
    type: "Portfolio Platform",
    category: "Design Portfolio",
    country: "Global",
    niche: "UI/UX Design & Branding",
    linkType: "dofollow",
    pricing: "Free",
    status: "Prospect",
    authorityScore: "94",
    domainRating: "95",
    trafficEstimate: "High",
    anchorText: "HD Web Studios UI/UX",
    safetyScore: "SAFE",
    safetyReason: "Adobe official design showcase platform",
    opportunityScore: 86,
  },
];

export async function GET(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();

    let count = await Backlink.countDocuments();
    if (count === 0) {
      await Backlink.insertMany(SEED_BACKLINK_OPPORTUNITIES);
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const query = {};
    if (status && status !== "all") query.status = status;
    if (type && type !== "all") query.type = type;
    if (search) {
      query.$or = [
        { websiteName: { $regex: search, $options: "i" } },
        { domain: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const backlinks = await Backlink.find(query).sort({ opportunityScore: -1, createdAt: -1 }).lean();

    const stats = {
      total: await Backlink.countDocuments(),
      verified: await Backlink.countDocuments({ status: "Verified" }),
      published: await Backlink.countDocuments({ status: { $in: ["Published", "Verified"] } }),
      prospects: await Backlink.countDocuments({ status: "Prospect" }),
    };

    return NextResponse.json({ success: true, backlinks, stats });
  } catch (err) {
    console.error("[Backlinks API] Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();
    const body = await req.json();

    if (!body.domain || !body.websiteName) {
      return NextResponse.json({ success: false, error: "Domain and Website Name are required." }, { status: 400 });
    }

    // Safety Algorithm Check
    const lowDomain = body.domain.toLowerCase();
    let safetyScore = "SAFE";
    let safetyReason = "Reputable business authority source";

    const suspiciousKeywords = ["pbn", "casino", "gambling", "adult", "free-links", "link-farm", "buy-backlinks"];
    if (suspiciousKeywords.some((kw) => lowDomain.includes(kw) || (body.notes || "").toLowerCase().includes(kw))) {
      safetyScore = "AVOID";
      safetyReason = "Domain or note indicates potential link farm / manipulative network risk.";
    } else if (body.pricing === "Paid" && body.linkType === "dofollow") {
      safetyScore = "REVIEW";
      safetyReason = "Paid dofollow link must be carefully monitored to avoid Google link scheme violations.";
    }

    const created = await Backlink.create({
      ...body,
      safetyScore,
      safetyReason,
      targetUrl: body.targetUrl || "https://hdwebstudios.in",
    });

    return NextResponse.json({ success: true, backlink: created });
  } catch (err) {
    console.error("[Backlinks API] POST Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
