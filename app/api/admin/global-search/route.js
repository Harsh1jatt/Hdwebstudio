import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import Post from "@/models/Post";
import Project from "@/models/Project";
import FAQ from "@/models/FAQ";
import Testimonial from "@/models/Testimonial";
import Contact from "@/models/Contact";
import TeamMember from "@/models/TeamMember";

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();
    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim();

    if (!q) {
      return NextResponse.json({ success: true, results: [], total: 0 });
    }

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");

    const [services, posts, projects, faqs, testimonials, leads, team] = await Promise.all([
      Service.find({ $or: [{ title: regex }, { tagline: regex }, { description: regex }, { category: regex }] })
        .select("title slug category published")
        .limit(8)
        .lean(),
      Post.find({ $or: [{ title: regex }, { excerpt: regex }, { category: regex }, { tags: regex }] })
        .select("title slug category status")
        .limit(8)
        .lean(),
      Project.find({ $or: [{ title: regex }, { description: regex }, { client: regex }, { category: regex }] })
        .select("title slug client published")
        .limit(8)
        .lean(),
      FAQ.find({ $or: [{ question: regex }, { answer: regex }, { category: regex }] })
        .select("question category published")
        .limit(6)
        .lean(),
      Testimonial.find({ $or: [{ name: regex }, { company: regex }, { content: regex }] })
        .select("name company rating")
        .limit(6)
        .lean(),
      Contact.find({ $or: [{ name: regex }, { email: regex }, { phone: regex }, { business: regex }, { message: regex }] })
        .select("name business phone status priority")
        .limit(8)
        .lean(),
      TeamMember.find({ $or: [{ name: regex }, { role: regex }, { bio: regex }] })
        .select("name role")
        .limit(5)
        .lean(),
    ]);

    const results = [
      ...services.map((s) => ({ id: s._id.toString(), type: "service", title: s.title, subtitle: `Category: ${s.category || "General"}`, url: `/admin/services/${s._id}`, publicUrl: `/services/${s.slug}`, status: s.published ? "published" : "draft" })),
      ...posts.map((p) => ({ id: p._id.toString(), type: "blog", title: p.title, subtitle: `Category: ${p.category || "General"}`, url: `/admin/blog/${p._id}`, publicUrl: `/blog/${p.slug}`, status: p.status })),
      ...projects.map((pr) => ({ id: pr._id.toString(), type: "project", title: pr.title, subtitle: `Client: ${pr.client || "Confidential"}`, url: `/admin/projects/${pr._id}`, publicUrl: `/work/${pr.slug}`, status: pr.published ? "published" : "draft" })),
      ...faqs.map((f) => ({ id: f._id.toString(), type: "faq", title: f.question, subtitle: `FAQ (${f.category || "General"})`, url: `/admin/faqs/${f._id}` })),
      ...testimonials.map((t) => ({ id: t._id.toString(), type: "testimonial", title: t.name, subtitle: `${t.company || "Client"} (${t.rating}★)`, url: `/admin/testimonials/${t._id}` })),
      ...leads.map((l) => ({ id: l._id.toString(), type: "lead", title: l.name, subtitle: `${l.business || "Individual"} • ${l.phone || ""} • Status: ${l.status}`, url: `/admin/leads/${l._id}` })),
      ...team.map((tm) => ({ id: tm._id.toString(), type: "team", title: tm.name, subtitle: tm.role || "Team Member", url: `/admin/team/${tm._id}` })),
    ];

    return NextResponse.json({
      success: true,
      query: q,
      total: results.length,
      results,
    });
  } catch (error) {
    console.error("[Global Search] Error:", error);
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 });
  }
}
