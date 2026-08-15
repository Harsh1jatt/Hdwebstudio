import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import Media from "@/models/Media";
import {
  saveUploadedFile,
  deleteUploadedFile,
  generateUploadFilename,
} from "@/lib/media/storage";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
]);

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const EXT_MAP = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

export async function GET(req) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get("perPage") || "24", 10)));
  const q = searchParams.get("q") || "";
  const folder = searchParams.get("folder") || "";

  const filter = {};
  if (folder) filter.folder = folder;
  if (q) filter.$text = { $search: q };

  const [docs, total] = await Promise.all([
    Media.find(filter).sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage).lean(),
    Media.countDocuments(filter),
  ]);

  const items = docs.map((d) => ({ ...d, id: d._id.toString(), _id: undefined }));
  return NextResponse.json({ success: true, items, total, page, perPage, totalPages: Math.ceil(total / perPage) });
}

export async function POST(req) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;

  const formData = await req.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ success: false, error: `File type ${file.type} not allowed` }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ success: false, error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = EXT_MAP[file.type] || "bin";
  const filename = generateUploadFilename(ext);

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await saveUploadedFile(buffer, filename);

  await connectDB();
  const folder = formData.get("folder") || "general";
  const alt = formData.get("alt") || "";

  const doc = await Media.create({
    filename,
    originalName: file.name || filename,
    url,
    mimeType: file.type,
    size: file.size,
    alt,
    folder,
    uploadedBy: auth.name || auth.email || "",
  });

  return NextResponse.json({
    success: true,
    item: { ...doc.toObject(), id: doc._id.toString() },
  }, { status: 201 });
}
