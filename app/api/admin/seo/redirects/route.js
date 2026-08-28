import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Redirect from "@/models/Redirect";

export const dynamic = "force-dynamic";

const SEED_REDIRECTS = [
  {
    source: "/services/create-srvice-for-business-website-development",
    destination: "/services/business-website-development",
    statusCode: 301,
    reason: "Fix misspelled slug to canonical business website development page",
    isActive: true,
  },
  {
    source: "/portfolio",
    destination: "/work",
    statusCode: 301,
    reason: "Canonical portfolio migration to /work",
    isActive: true,
  },
  {
    source: "/portfolio/:slug",
    destination: "/work/:slug",
    statusCode: 301,
    reason: "Canonical case studies URL pattern migration to /work/:slug",
    isActive: true,
  },
];

export function detectChainsAndLoops(redirects = []) {
  const map = new Map();
  redirects.forEach((r) => map.set(r.source, r.destination));

  const chains = [];
  const loops = [];

  for (const r of redirects) {
    const visited = [r.source];
    let curr = r.destination;

    while (curr && map.has(curr)) {
      if (visited.includes(curr)) {
        loops.push({
          source: r.source,
          loopChain: [...visited, curr],
        });
        break;
      }
      visited.push(curr);
      curr = map.get(curr);
    }

    if (visited.length > 2) {
      chains.push({
        source: r.source,
        currentDestination: r.destination,
        finalDestination: visited[visited.length - 1],
        chainLength: visited.length - 1,
        fullPath: visited.join(" → "),
      });
    }
  }

  return { chains, loops };
}

export async function GET(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();

    let count = await Redirect.countDocuments();
    if (count === 0) {
      await Redirect.insertMany(SEED_REDIRECTS);
    }

    const redirects = await Redirect.find().sort({ createdAt: -1 }).lean();
    const { chains, loops } = detectChainsAndLoops(redirects);

    return NextResponse.json({
      success: true,
      redirects,
      chains,
      loops,
      totalCount: redirects.length,
    });
  } catch (err) {
    console.error("[Redirects API] Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();
    const body = await req.json();

    let { source, destination, statusCode = 301, reason = "", isActive = true } = body;

    if (!source || !destination) {
      return NextResponse.json({ success: false, error: "Source and Destination paths are required." }, { status: 400 });
    }

    // Normalize paths
    source = source.trim();
    destination = destination.trim();
    if (!source.startsWith("/") && !source.startsWith("http")) source = `/${source}`;
    if (!destination.startsWith("/") && !destination.startsWith("http")) destination = `/${destination}`;

    if (source === destination) {
      return NextResponse.json({ success: false, error: "Source and Destination cannot be identical." }, { status: 400 });
    }

    // Check for existing source
    const existing = await Redirect.findOne({ source });
    if (existing) {
      return NextResponse.json({ success: false, error: `A redirect rule for source "${source}" already exists.` }, { status: 400 });
    }

    const created = await Redirect.create({
      source,
      destination,
      statusCode: Number(statusCode) || 301,
      reason,
      isActive,
    });

    return NextResponse.json({ success: true, redirect: created });
  } catch (err) {
    console.error("[Redirects API] POST Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
