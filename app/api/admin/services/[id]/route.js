import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { requireAdminApi } from "@/lib/auth";
import { parseServicePayload } from "@/utils/serviceValidation";

function serializeService(doc) {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    icon: doc.icon,
    eyebrow: doc.eyebrow,
    title: doc.title,
    tagline: doc.tagline,
    shortDescription: doc.shortDescription || "",
    description: doc.description,
    category: doc.category || "",
    accent: doc.accent,
    order: doc.order ?? 0,
    published: doc.published,
    heroStats: doc.heroStats || [],
    overview: doc.overview,
    whatYouGet: doc.whatYouGet || [],
    faq: doc.faq || [],
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
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
      return NextResponse.json(
        { success: false, error: "Invalid service id" },
        { status: 400 }
      );
    }

    await connectDB();
    const service = await Service.findById(id).lean();

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service: serializeService(service),
    });
  } catch (error) {
    console.error("admin service detail error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid service id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = parseServicePayload(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors.map((e) => e.message).join(", "),
        },
        { status: 400 }
      );
    }

    await connectDB();

    const duplicate = await Service.findOne({
      slug: parsed.data.slug,
      _id: { $ne: id },
    }).lean();

    if (duplicate) {
      return NextResponse.json(
        { success: false, error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    const service = await Service.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service: serializeService(service),
    });
  } catch (error) {
    console.error("admin service update error:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid service id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const updates = {};

    if (typeof body.published === "boolean") {
      updates.published = body.published;
    }

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
      return NextResponse.json(
        { success: false, error: "No valid fields to update" },
        { status: 400 }
      );
    }

    await connectDB();

    const service = await Service.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service: serializeService(service),
    });
  } catch (error) {
    console.error("admin service patch error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid service id" },
        { status: 400 }
      );
    }

    await connectDB();
    const deleted = await Service.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("admin service delete error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
