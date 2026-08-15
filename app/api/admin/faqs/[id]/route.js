import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import FAQ from "@/models/FAQ";
import { faqPayloadSchema } from "@/utils/faqValidation";

function isValidId(id) { return mongoose.Types.ObjectId.isValid(id); }

export async function GET(req, { params }) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const doc = await FAQ.findById(id).lean();
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
  const result = faqPayloadSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ success: false, error: "Validation failed", details: result.error.flatten() }, { status: 400 });
  const doc = await FAQ.findByIdAndUpdate(id, result.data, { new: true, runValidators: true }).lean();
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
  if (typeof body.featured === "boolean") allowed.featured = body.featured;
  if (typeof body.order === "number") allowed.order = body.order;
  if (Object.keys(allowed).length === 0) return NextResponse.json({ success: false, error: "No valid fields" }, { status: 400 });
  const doc = await FAQ.findByIdAndUpdate(id, allowed, { new: true }).lean();
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, item: { ...doc, id: doc._id.toString(), _id: undefined } });
}

export async function DELETE(req, { params }) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const doc = await FAQ.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
