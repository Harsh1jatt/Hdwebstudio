import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

/**
 * Local filesystem media storage.
 *
 * PRODUCTION NOTE: Files saved to public/uploads/ persist only on the
 * server's local disk. On serverless platforms (e.g. Vercel), this storage
 * is ephemeral — uploads will not survive redeployments.
 *
 * For production CDN storage, implement a provider adapter (Cloudinary, S3)
 * behind these functions without changing the Media API contract.
 */

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveUploadedFile(buffer, filename) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, filename);
  await writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function deleteUploadedFile(url) {
  if (!url || !url.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", url);
  await unlink(filePath).catch(() => {});
}

export function generateUploadFilename(ext) {
  const safeExt = String(ext || "bin").replace(/[^a-z0-9]/gi, "").slice(0, 8);
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
}
