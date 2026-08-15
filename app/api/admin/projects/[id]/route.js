import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { requireAdminApi } from "@/lib/auth";
import { parseProjectPayload } from "@/utils/projectValidation";

function serializeProject(doc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    shortDescription: doc.shortDescription || "",
    description: doc.description || "",
    client: doc.client || "",
    category: doc.category || "",
    industry: doc.industry || "",
    location: doc.location || "",
    projectType: doc.projectType || "client",
    year: doc.year || "",
    challenge: doc.challenge || "",
    solution: doc.solution || "",
    results: doc.results || [],
    features: doc.features || [],
    technologies: doc.technologies || [],
    services: doc.services || [],
    featuredImage: doc.featuredImage || "",
    thumbnail: doc.thumbnail || "",
    gallery: doc.gallery || [],
    demoUrl: doc.demoUrl || "",
    liveUrl: doc.liveUrl || "",
    githubUrl: doc.githubUrl || "",
    caseStudyUrl: doc.caseStudyUrl || "",
    testimonial: doc.testimonial || { quote: "", author: "", role: "" },
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
    published: doc.published,
    order: doc.order ?? 0,
    featured: Boolean(doc.featured),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid project id" }, { status: 400 });
    }

    await connectDB();
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, project: serializeProject(project) });
  } catch (error) {
    console.error("admin project detail error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid project id" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = parseProjectPayload(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    await connectDB();
    const duplicate = await Project.findOne({ slug: parsed.data.slug, _id: { $ne: id } }).lean();
    if (duplicate) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    const project = await Project.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: serializeProject(project) });
  } catch (error) {
    console.error("admin project update error:", error);
    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid project id" }, { status: 400 });
    }

    const body = await req.json();
    const updates = {};

    if (typeof body.published === "boolean") updates.published = body.published;
    if (typeof body.featured === "boolean") updates.featured = body.featured;
    if (body.order !== undefined) {
      const order = Number(body.order);
      if (!Number.isInteger(order) || order < 0) {
        return NextResponse.json(
          { success: false, error: "Order must be a non-negative integer" },
          { status: 400 }
        );
      }
      updates.order = order;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: false, error: "No valid fields to update" }, { status: 400 });
    }

    await connectDB();
    const project = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, project: serializeProject(project) });
  } catch (error) {
    console.error("admin project patch error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid project id" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Project.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("admin project delete error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
