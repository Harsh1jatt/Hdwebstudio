import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  isCloudinaryConfigured,
} from "./cloudinary";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function saveLocally(buffer, filename) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const safeFilename = path.basename(filename);
  const filePath = path.join(UPLOAD_DIR, safeFilename);
  await writeFile(filePath, buffer);

  return {
    url: `/uploads/${safeFilename}`,
    publicId: "",
    width: 0,
    height: 0,
    format: path.extname(safeFilename).replace(".", ""),
  };
}

/**
 * Save an uploaded file.
 * Cloudinary is used when configured.
 * Local filesystem is used as fallback in development or when Cloudinary is not configured.
 */
export async function saveUploadedFile(buffer, filename, opts = {}) {
  if (isCloudinaryConfigured()) {
    try {
      return await uploadToCloudinary(buffer, {
        filename,
        mimeType: opts.mimeType || "application/octet-stream",
        folder: opts.folder || "media",
        title: opts.title || "",
        alt: opts.alt || "",
      });
    } catch (cloudinaryError) {
      console.error("[Storage] Cloudinary upload error:", cloudinaryError.message);

      // In development or preview environments, fallback to local storage if Cloudinary fails
      if (process.env.NODE_ENV !== "production") {
        console.warn("[Storage] Falling back to local filesystem storage for development.");
        return await saveLocally(buffer, filename);
      }

      throw new Error(`Cloudinary upload failed: ${cloudinaryError.message || "Service error"}`);
    }
  }

  // Fallback to local storage
  return await saveLocally(buffer, filename);
}

/**
 * Delete a stored media file.
 */
export async function deleteUploadedFile(url, publicId = "") {
  if (publicId && isCloudinaryConfigured()) {
    try {
      await deleteFromCloudinary(publicId);
      return;
    } catch (err) {
      console.warn("[Storage] Cloudinary delete failed:", err?.message);
    }
  }

  if (url && url.includes("cloudinary.com") && isCloudinaryConfigured()) {
    try {
      const { extractPublicId } = await import("./cloudinary");
      const extractedPublicId = extractPublicId(url);
      if (extractedPublicId) {
        await deleteFromCloudinary(extractedPublicId);
      }
      return;
    } catch (err) {
      console.warn("[Storage] Cloudinary delete by URL failed:", err?.message);
    }
  }

  // Local filesystem deletion
  if (url?.startsWith("/uploads/")) {
    const relativePath = url.replace(/^\/+/, "");
    const filePath = path.join(process.cwd(), "public", relativePath);
    await unlink(filePath).catch(() => {});
  }
}

export { isCloudinaryConfigured };