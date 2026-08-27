import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import Media from "@/models/Media";
import { deleteUploadedFile } from "@/lib/media/storage";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
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

export async function GET(req, { params }) {
  try {
    const auth = await requireAdminApi(req);

    if (auth instanceof Response) {
      return auth;
    }

    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid media ID",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const doc = await Media.findById(id).lean();

    if (!doc) {
      return NextResponse.json(
        {
          success: false,
          error: "Media not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      item: serializeMedia(doc),
    });
  } catch (error) {
    console.error("GET /api/admin/media/[id] failed:", error);

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

export async function PATCH(req, { params }) {
  try {
    const auth = await requireAdminApi(req);

    if (auth instanceof Response) {
      return auth;
    }

    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid media ID",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const body = await req.json();

    const allowed = {};

    if (typeof body.alt === "string") {
      allowed.alt = body.alt.trim();
    }

    if (typeof body.folder === "string") {
      allowed.folder = body.folder.trim();
    }

    if (Object.keys(allowed).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No valid fields provided",
        },
        {
          status: 400,
        }
      );
    }

    const doc = await Media.findByIdAndUpdate(
      id,
      {
        $set: allowed,
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!doc) {
      return NextResponse.json(
        {
          success: false,
          error: "Media not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      item: serializeMedia(doc),
    });
  } catch (error) {
    console.error("PATCH /api/admin/media/[id] failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update media",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await requireAdminApi(req);

    if (auth instanceof Response) {
      return auth;
    }

    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid media ID",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    /*
     * Find first instead of findByIdAndDelete immediately.
     * We need the publicId/url for storage cleanup.
     */
    const doc = await Media.findById(id);

    if (!doc) {
      return NextResponse.json(
        {
          success: false,
          error: "Media not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Delete physical file first.
     *
     * publicId is preferred for Cloudinary because it is already
     * stored in MongoDB and is more reliable than parsing the URL.
     *
     * If storage deletion fails, we still don't want the request
     * to crash because the database record can be removed separately.
     */
    try {
      await deleteUploadedFile(doc.url, doc.publicId);
    } catch (storageError) {
      console.error(
        "Media storage cleanup failed:",
        storageError
      );
    }

    await Media.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      id,
    });
  } catch (error) {
    console.error("DELETE /api/admin/media/[id] failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete media",
      },
      {
        status: 500,
      }
    );
  }
}