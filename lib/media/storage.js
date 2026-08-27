import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinary";

const UPLOAD_DIR = path.join(
  process.cwd(),
  "public",
  "uploads"
);

function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Save an uploaded file.
 *
 * Cloudinary is used when configured.
 * Local filesystem is used as fallback.
 */
export async function saveUploadedFile(
  buffer,
  filename,
  opts = {}
) {
  if (isCloudinaryConfigured()) {
    return uploadToCloudinary(buffer, {
      filename,
      mimeType:
        opts.mimeType || "application/octet-stream",
      folder: opts.folder || "media",
      title: opts.title || "",
      alt: opts.alt || "",
    });
  }

  /*
   * Local fallback.
   *
   * Note:
   * Vercel's filesystem is ephemeral, so Cloudinary should
   * be configured for production.
   */
  await mkdir(UPLOAD_DIR, {
    recursive: true,
  });

  const safeFilename = path.basename(filename);

  const filePath = path.join(
    UPLOAD_DIR,
    safeFilename
  );

  await writeFile(filePath, buffer);

  return {
    url: `/uploads/${safeFilename}`,
    publicId: "",
    width: 0,
    height: 0,
    format: "",
  };
}

/**
 * Delete a stored media file.
 *
 * For Cloudinary:
 * publicId is preferred.
 *
 * For local storage:
 * URL is used.
 */
export async function deleteUploadedFile(
  url,
  publicId = ""
) {
  /*
   * Prefer the stored Cloudinary public ID.
   *
   * This is much more reliable than extracting it from
   * the URL.
   */
  if (publicId && isCloudinaryConfigured()) {
    await deleteFromCloudinary(publicId);
    return;
  }

  /*
   * Backwards compatibility for older records that may not
   * have a publicId stored.
   */
  if (
    url &&
    url.includes("cloudinary.com") &&
    isCloudinaryConfigured()
  ) {
    const { extractPublicId } = await import(
      "./cloudinary"
    );

    const extractedPublicId =
      extractPublicId(url);

    if (extractedPublicId) {
      await deleteFromCloudinary(
        extractedPublicId
      );
    }

    return;
  }

  /*
   * Local filesystem deletion.
   */
  if (url?.startsWith("/uploads/")) {
    const relativePath = url.replace(
      /^\/+/,
      ""
    );

    const filePath = path.join(
      process.cwd(),
      "public",
      relativePath
    );

    await unlink(filePath).catch(() => {});
  }
}

export { isCloudinaryConfigured };