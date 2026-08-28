import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Redirect from "@/models/Redirect";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    const { id } = await params;
    await connectDB();
    const body = await req.json();

    const updated = await Redirect.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updated) return NextResponse.json({ success: false, error: "Redirect rule not found" }, { status: 404 });

    return NextResponse.json({ success: true, redirect: updated });
  } catch (err) {
    console.error("[Redirect Detail API] Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    const { id } = await params;
    await connectDB();

    await Redirect.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Redirect Detail API] DELETE Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
