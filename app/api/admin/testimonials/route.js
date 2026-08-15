import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import Testimonial from "@/models/Testimonial";
import { testimonialPayloadSchema } from "@/utils/testimonialValidation";

export async function GET(req) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;

  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get("perPage") || "20", 10)));
  const q = searchParams.get("q") || "";
  const published = searchParams.get("published");
  const featured = searchParams.get("featured");
  const sort = searchParams.get("sort") || "order";

  const filter = {};
  if (published === "true") filter.published = true;
  else if (published === "false") filter.published = false;
  if (featured === "true") filter.featured = true;
  else if (featured === "false") filter.featured = false;
  if (q) filter.$text = { $search: q };

  const sortMap = { order: { order: 1, createdAt: -1 }, newest: { createdAt: -1 }, oldest: { createdAt: 1 } };
  const sortObj = sortMap[sort] || sortMap.order;

  const [docs, total] = await Promise.all([
    Testimonial.find(filter).sort(sortObj).skip((page - 1) * perPage).limit(perPage).lean(),
    Testimonial.countDocuments(filter),
  ]);

  const items = docs.map((d) => ({ ...d, id: d._id.toString(), _id: undefined }));

  return NextResponse.json({ success: true, items, total, page, perPage, totalPages: Math.ceil(total / perPage) });
}

export async function POST(req) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;

  await connectDB();
  const body = await req.json();
  const result = testimonialPayloadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ success: false, error: "Validation failed", details: result.error.flatten() }, { status: 400 });
  }

  const doc = await Testimonial.create(result.data);
  return NextResponse.json({ success: true, item: { ...doc.toObject(), id: doc._id.toString() } }, { status: 201 });
}
