import {
  uploadToCloudinary,
  deleteFromCloudinary,
  isCloudinaryConfigured,
  extractPublicId,
} from "./cloudinary";

/**
 * Save an uploaded file directly to Cloudinary.
 *
 * No local filesystem fallback is used.
 * This is safe for Vercel/serverless deployments.
 */
export async function saveUploadedFile(buffer, filename, opts = {}) {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  try {
    return await uploadToCloudinary(buffer, {
      filename,
      mimeType: opts.mimeType || "application/octet-stream",
      folder: opts.folder || "media",
      title: opts.title || "",
      alt: opts.alt || "",
    });
  } catch (error) {
    console.error(
      "[Storage] Cloudinary upload error:",
      error?.message || error
    );

    throw new Error(
      `Cloudinary upload failed: ${
        error?.message || "Service error"
      }`
    );
  }
}

/**
 * Delete a stored media file from Cloudinary.
 *
 * Local filesystem deletion has intentionally been removed.
 */
export async function deleteUploadedFile(url, publicId = "") {
  if (!isCloudinaryConfigured()) {
    console.warn(
      "[Storage] Cloudinary is not configured. Cannot delete media."
    );
    return;
  }

  try {
    let cloudinaryPublicId = publicId;

    // If publicId wasn't stored, try extracting it from the URL.
    if (!cloudinaryPublicId && url?.includes("cloudinary.com")) {
      cloudinaryPublicId = extractPublicId(url);
    }

    if (!cloudinaryPublicId) {
      console.warn(
        "[Storage] No Cloudinary public ID found for deletion."
      );
      return;
    }

    await deleteFromCloudinary(cloudinaryPublicId);
  } catch (error) {
    console.error(
      "[Storage] Cloudinary delete failed:",
      error?.message || error
    );

    throw error;
  }
}

export { isCloudinaryConfigured };