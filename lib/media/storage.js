import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from "./cloudinary";

/**
 * Hybrid media storage:
 * - Uses Cloudinary when CLOUDINARY_CLOUD_NAME is set
 * - Falls back to local filesystem (ephemeral on Vercel)
 */

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function isCloudinaryConfigured() {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME);
}

/**
 * Save a file to storage.
 * @param {Buffer} buffer
 * @param {Object} opts - { filename, mimeType, folder, title, alt }
 * @returns {Promise<{ url: string, publicId?: string, width?: number, height?: number, format?: string }>}
 */
export async function saveUploadedFile(buffer, filename, opts = {}) {
  if (isCloudinaryConfigured()) {
    return uploadToCloudinary(buffer, {
      filename,
      mimeType: opts.mimeType || "application/octet-stream",
      folder: opts.folder || "media",
      title: opts.title || "",
      alt: opts.alt || "",
    });
  }

  // Fallback: local filesystem
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, filename);
  await writeFile(filePath, buffer);
  return { url: `/uploads/${filename}` };
}

/**
 * Delete a file from storage.
 * @param {string} url - The file URL (Cloudinary URL or /uploads/ path)
 */
export async function deleteUploadedFile(url) {
  if (!url) return;

  if (url.includes("cloudinary.com")) {
    const publicId = extractPublicId(url);
    if (publicId) await deleteFromCloudinary(publicId);
    return;
  }

  // Fallback: local filesystem
  if (url.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", url);
    await unlink(filePath).catch(() => {});
  }
}

/**
 * Generate a unique local filename.
 */
export function generateUploadFilename(ext) {
  const safeExt = String(ext || "bin").replace(/[^a-z0-9]/gi, "").slice(0, 8);
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
}

export { isCloudinaryConfigured };
