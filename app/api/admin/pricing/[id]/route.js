import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import PricingPlan from "@/models/PricingPlan";
import { pricingPayloadSchema } from "@/utils/pricingValidation";

function isValidId(id) { return mongoose.Types.ObjectId.isValid(id); }

export async function GET(req, { params }) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const doc = await PricingPlan.findById(id).lean();
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, item: { ...doc, id: doc._id.toString(), _id: undefined } });
}

export async function PUT(req, { params }) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const body = await req.json();
  const result = pricingPayloadSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ success: false, error: "Validation failed", details: result.error.flatten() }, { status: 400 });

  const dup = await PricingPlan.findOne({ slug: result.data.slug, _id: { $ne: id } });
  if (dup) return NextResponse.json({ success: false, error: "Slug already in use" }, { status: 409 });

  const doc = await PricingPlan.findByIdAndUpdate(id, result.data, { new: true, runValidators: true }).lean();
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, item: { ...doc, id: doc._id.toString(), _id: undefined } });
}

export async function PATCH(req, { params }) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const body = await req.json();
  const allowed = {};
  if (typeof body.published === "boolean") allowed.published = body.published;
  if (typeof body.highlighted === "boolean") allowed.highlighted = body.highlighted;
  if (typeof body.order === "number") allowed.order = body.order;
  if (Object.keys(allowed).length === 0) return NextResponse.json({ success: false, error: "No valid fields" }, { status: 400 });
  const doc = await PricingPlan.findByIdAndUpdate(id, allowed, { new: true }).lean();
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, item: { ...doc, id: doc._id.toString(), _id: undefined } });
}

export async function DELETE(req, { params }) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const doc = await PricingPlan.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
