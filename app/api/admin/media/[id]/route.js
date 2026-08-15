import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import Media from "@/models/Media";
import { deleteUploadedFile } from "@/lib/media/storage";

function isValidId(id) { return mongoose.Types.ObjectId.isValid(id); }

export async function GET(req, { params }) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const doc = await Media.findById(id).lean();
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
  if (typeof body.alt === "string") allowed.alt = body.alt;
  if (typeof body.folder === "string") allowed.folder = body.folder;
  if (Object.keys(allowed).length === 0) return NextResponse.json({ success: false, error: "No valid fields" }, { status: 400 });
  const doc = await Media.findByIdAndUpdate(id, allowed, { new: true }).lean();
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, item: { ...doc, id: doc._id.toString(), _id: undefined } });
}

export async function DELETE(req, { params }) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  const { id } = await params;
  if (!isValidId(id)) return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
  await connectDB();
  const doc = await Media.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  try {
    await deleteUploadedFile(doc.url);
  } catch {
    /* file may already be gone */
  }

  return NextResponse.json({ success: true });
}
