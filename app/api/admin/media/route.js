import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import Media from "@/models/Media";
import { saveUploadedFile } from "@/lib/media/storage";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
]);

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const EXT_MAP = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

const ALLOWED_FOLDERS = new Set([
  "blog",
  "services",
  "projects",
  "stories",
  "team",
  "media",
  "og",
  "general",
]);

function normalizeFolder(folder) {
  const value = String(folder || "media")
    .trim()
    .toLowerCase();

  return ALLOWED_FOLDERS.has(value) ? value : "media";
}

function serializeMedia(doc) {
  if (!doc) return null;

  return {
    id: doc._id?.toString(),
    filename: doc.filename || "",
    originalName: doc.originalName || "",
    url: doc.url || "",
    publicId: doc.publicId || "",
    mimeType: doc.mimeType || "",
    size: Number(doc.size) || 0,
    width: Number(doc.width) || 0,
    height: Number(doc.height) || 0,
    alt: doc.alt || "",
    folder: doc.folder || "general",
    uploadedBy: doc.uploadedBy || "",
    createdAt: doc.createdAt || null,
    updatedAt: doc.updatedAt || null,
  };
}

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);

    if (auth instanceof Response) {
      return auth;
    }

    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Math.max(
      1,
      parseInt(searchParams.get("page") || "1", 10)
    );

    /*
     * Support both old and new parameter names so existing
     * callers don't break.
     *
     * New:
     *   perPage
     *   q
     *
     * Backwards compatible:
     *   limit
     *   search
     */
    const requestedPerPage =
      searchParams.get("perPage") ||
      searchParams.get("limit") ||
      "24";

    const perPage = Math.min(
      50,
      Math.max(1, parseInt(requestedPerPage, 10))
    );

    const q =
      searchParams.get("q")?.trim() ||
      searchParams.get("search")?.trim() ||
      "";

    const folder = searchParams.get("folder")?.trim() || "";

    const filter = {};

    if (folder) {
      filter.folder = normalizeFolder(folder);
    }

    if (q) {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { filename: { $regex: escaped, $options: "i" } },
        { originalName: { $regex: escaped, $options: "i" } },
        { alt: { $regex: escaped, $options: "i" } },
      ];
    }

    const [docs, total] = await Promise.all([
      Media.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean(),

      Media.countDocuments(filter),
    ]);

    const items = docs.map(serializeMedia);

    return NextResponse.json({
      success: true,
      items,
      total,
      page,
      perPage,
      totalPages: Math.max(1, Math.ceil(total / perPage)),
    });
  } catch (error) {
    console.error("GET /api/admin/media failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load media",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);

    if (auth instanceof Response) {
      return auth;
    }

    const formData = await req.formData();

    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `File type ${file.type} not allowed. Accepted: JPEG, PNG, WebP, AVIF, SVG.`,
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "File too large. Maximum allowed size is 10MB.",
        },
        {
          status: 400,
        }
      );
    }

    const ext = EXT_MAP[file.type] || "bin";
    const filename = generateUploadFilename(ext);

    const buffer = Buffer.from(await file.arrayBuffer());

    const folder = normalizeFolder(formData.get("folder"));
    const alt = String(formData.get("alt") || "").trim();
    const title = String(formData.get("title") || "").trim();

    /*
     * Save to Cloudinary or local filesystem.
     */
    const result = await saveUploadedFile(buffer, filename, {
      mimeType: file.type,
      folder,
      title,
      alt,
    });

    await connectDB();

    const doc = await Media.create({
      filename,
      originalName: file.name || filename,
      url: result.url,
      publicId: result.publicId || "",
      mimeType: file.type,
      size: file.size,
      width: result.width || 0,
      height: result.height || 0,
      alt,
      folder,
      uploadedBy: auth.name || auth.email || "",
    });

    return NextResponse.json(
      {
        success: true,
        item: serializeMedia(doc.toObject()),
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/admin/media failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload media",
      },
      {
        status: 500,
      }
    );
  }
}

function generateUploadFilename(ext) {
  const safeExt = String(ext || "bin")
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 8);

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${safeExt}`;
}