import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
if (!cloudinary.config().cloud_name) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Folder structure for organized media storage:
 *
 * hd-web-studios/
 * ├── blog/          — Blog post images (named by blog title)
 * ├── services/      — Service page images (named by service title)
 * ├── projects/      — Portfolio/project images (named by project title)
 * ├── stories/       — Web story images (named by story title)
 * ├── team/          — Team member photos
 * ├── media/         — General media library uploads
 * └── og/            — Open Graph / social sharing images
 */

const FOLDERS = {
  blog: "hd-web-studios/blog",
  services: "hd-web-studios/services",
  projects: "hd-web-studios/projects",
  stories: "hd-web-studios/stories",
  team: "hd-web-studios/team",
  media: "hd-web-studios/media",
  og: "hd-web-studios/og",
  general: "hd-web-studios/media",
};

/**
 * Generate a Cloudinary-friendly filename from a title.
 * Replaces spaces with hyphens, removes special chars, lowercases.
 */
function slugifyForCloudinary(title) {
  return (title || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/**
 * Upload a buffer to Cloudinary.
 *
 * @param {Buffer} buffer - The file buffer
 * @param {Object} options
 * @param {string} options.filename - Original filename
 * @param {string} options.mimeType - MIME type of the file
 * @param {string} options.folder - Folder key: blog|services|projects|stories|team|media|og
 * @param {string} options.title - Title-based name (for blog/services/projects/stories)
 * @param {string} options.alt - Alt text for the image
 * @returns {Promise<{url: string, publicId: string, width: number, height: number, format: string}>}
 */
export async function uploadToCloudinary(buffer, { filename, mimeType, folder = "media", title = "", alt = "" }) {
  const folderPath = FOLDERS[folder] || FOLDERS.media;

  // Build a title-based public_id if a title is provided
  let publicId;
  if (title) {
    const slug = slugifyForCloudinary(title);
    // Add a short random suffix to avoid collisions
    const suffix = Math.random().toString(36).slice(2, 6);
    publicId = `${folderPath}/${slug}-${suffix}`;
  } else {
    const ext = (filename || "upload").split(".").pop() || "bin";
    const safeName = (filename || "upload").replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 60);
    const suffix = Date.now().toString(36);
    publicId = `${folderPath}/${safeName}-${suffix}`;
  }

  const resourceType = mimeType?.startsWith("image/") ? "image" : "auto";

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: undefined, // We include folder in publicId
        public_id: publicId,
        resource_type: resourceType,
        format: mimeType?.split("/")[1]?.replace("jpeg", "jpg") || undefined,
        alt: alt || title || "",
        context: alt ? `alt=${alt}` : undefined,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width || 0,
    height: result.height || 0,
    format: result.format || "",
  };
}

/**
 * Delete an image from Cloudinary by its public ID.
 * @param {string} publicId - The Cloudinary public ID (e.g. "hd-web-studios/blog/my-post-abc1")
 */
export async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
}

/**
 * Extract the Cloudinary public_id from a full Cloudinary URL.
 * e.g. "https://res.cloudinary.com/db4boovo6/image/upload/v1234/hd-web-studios/blog/my-post-abc1.jpg"
 * → "hd-web-studios/blog/my-post-abc1"
 */
export function extractPublicId(url) {
  if (!url || !url.includes("cloudinary.com")) return null;
  try {
    const parts = url.split("/upload/")[1];
    if (!parts) return null;
    // Remove version prefix and extension
    const withoutVersion = parts.replace(/^v\d+\//, "");
    return withoutVersion.replace(/\.[^.]+$/, "");
  } catch {
    return null;
  }
}

export default cloudinary;
